import express from "express";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import twilio from "twilio";
import cors from "cors";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Load environment variables for local/standalone execution
dotenv.config();
if (fs.existsSync(".env.local")) {
  dotenv.config({ path: ".env.local", override: true });
}

function getTwilio() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  if (!accountSid || !authToken) {
    throw new Error("TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN are required");
  }
  return twilio(accountSid, authToken);
}

const app = express();

// Allowed Origins for CORS
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      if (origin.endsWith(".vercel.app")) return callback(null, true);
      if (process.env.ALLOWED_ORIGIN && origin === process.env.ALLOWED_ORIGIN) return callback(null, true);
      return callback(null, true);
    },
    credentials: true,
  })
);
app.options("*", cors());

// Defensive check for serverless environments where body might be pre-parsed
app.use((req: any, _res, next) => {
  if (req.body !== undefined && req.body !== null && !req._body) {
    req._body = true;
  }
  next();
});

// JSON parser for application/json payloads
app.use(express.json());

// Serve static uploads if directory exists (for local development)
const uploadsDir = path.join(process.cwd(), "public", "uploads");
app.use("/uploads", express.static(uploadsDir));

// Rate Limiting Store
interface RateLimitRecord {
  count: number;
  resetAt: number;
}
const rateLimitStore = new Map<string, RateLimitRecord>();

export function getClientIp(req: express.Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }
  return req.socket.remoteAddress || "127.0.0.1";
}

export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (record.count >= maxRequests) {
    const retryAfterSeconds = Math.ceil((record.resetAt - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  record.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

export const ALLOWED_UPLOAD_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".svg",
  ".pdf",
]);

// Define core API Router
const apiRouter = express.Router();

// -------------------------------------------------------------
// Health Check
// -------------------------------------------------------------
apiRouter.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "The Bangalore Kitchen backend is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// -------------------------------------------------------------
// Menu Image Lookup API Endpoint
// -------------------------------------------------------------
apiRouter.post("/admin/menu/find-image", async (req, res) => {
  try {
    const { productName } = req.body || {};
    if (!productName || typeof productName !== "string") {
      return res.status(400).json({ success: false, error: "productName is required" });
    }

    const sanitizedName = productName.trim().substring(0, 120);

    return res.status(200).json({
      success: true,
      query: sanitizedName,
      imageUrl: null,
      source: "Neutral Placeholder",
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || "Internal server error" });
  }
});

// -------------------------------------------------------------
// Storage Presign URL (Cloudflare R2 Direct Upload)
// -------------------------------------------------------------
apiRouter.post("/storage/presign", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "Authentication required for storage operations.",
      });
    }

    const clientIp = getClientIp(req);
    const limitCheck = checkRateLimit(`storage-presign:${clientIp}`, 20, 10 * 60 * 1000);
    if (!limitCheck.allowed) {
      return res.status(429).json({
        success: false,
        error: `Too many upload requests. Please wait ${limitCheck.retryAfterSeconds} seconds before trying again.`,
      });
    }

    const { path: rawPath, contentType = "application/octet-stream" } = req.body || {};

    if (!rawPath || typeof rawPath !== "string") {
      return res.status(400).json({ success: false, error: "Missing path parameter." });
    }

    const uploadPath = rawPath
      .replace(/\\/g, "/")
      .replace(/^(\.\.\/)+/, "")
      .replace(/^\/+/, "");

    const ext = path.extname(uploadPath).toLowerCase();
    if (ext && !ALLOWED_UPLOAD_EXTENSIONS.has(ext)) {
      return res.status(400).json({
        success: false,
        error: `Unsupported file extension: ${ext}. Allowed extensions: ${Array.from(ALLOWED_UPLOAD_EXTENSIONS).join(", ")}`,
      });
    }

    const r2AccountId = (process.env.CLOUDFLARE_R2_ACCOUNT_ID || "").trim();
    const r2AccessKeyId = (process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || "").trim();
    const r2SecretAccessKey = (process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || "").trim();
    const r2BucketName = (process.env.CLOUDFLARE_R2_BUCKET_NAME || "").trim();
    const r2PublicDomain = (process.env.CLOUDFLARE_R2_PUBLIC_DOMAIN || "").trim();

    if (r2AccountId && r2AccessKeyId && r2SecretAccessKey && r2BucketName) {
      const s3Client = new S3Client({
        region: "auto",
        endpoint: `https://${r2AccountId}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId: r2AccessKeyId,
          secretAccessKey: r2SecretAccessKey,
        },
      });

      const command = new PutObjectCommand({
        Bucket: r2BucketName,
        Key: uploadPath,
        ContentType: contentType,
      });

      const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
      const cleanDomain = r2PublicDomain
        ? r2PublicDomain.replace(/\/$/, "")
        : `https://${r2BucketName}.${r2AccountId}.r2.cloudflarestorage.com`;
      const downloadURL = `${cleanDomain}/${uploadPath}`;

      return res.status(200).json({ success: true, presignedUrl, url: downloadURL });
    }

    return res.status(400).json({
      success: false,
      error: "Cloudflare R2 is not properly configured. Please configure R2 environment variables.",
    });
  } catch (error: any) {
    console.error("Presign error:", error);
    return res.status(500).json({ success: false, error: error.message || "Failed to generate presigned URL" });
  }
});

// -------------------------------------------------------------
// Storage Upload Proxy (Direct binary stream upload)
// -------------------------------------------------------------
apiRouter.post(
  "/storage/upload",
  express.raw({
    type: ["image/jpeg", "image/png", "image/webp", "image/*", "application/octet-stream"],
    limit: "15mb",
  }),
  async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          error: "Authentication required for storage operations.",
        });
      }

      const clientIp = getClientIp(req);
      const limitCheck = checkRateLimit(`storage-upload:${clientIp}`, 20, 10 * 60 * 1000);
      if (!limitCheck.allowed) {
        return res.status(429).json({
          success: false,
          error: `Too many upload requests. Please wait ${limitCheck.retryAfterSeconds} seconds before trying again.`,
        });
      }

      const bucket = req.query.bucket as string;
      const rawPath = req.query.path as string;
      const contentType = (req.headers["content-type"] as string) || "image/jpeg";

      if (!rawPath) {
        return res.status(400).json({ success: false, error: "Missing path parameter." });
      }

      const uploadPath = rawPath
        .replace(/\\/g, "/")
        .replace(/^(\.\.\/)+/, "")
        .replace(/^\/+/, "");

      const ext = path.extname(uploadPath).toLowerCase();
      if (ext && !ALLOWED_UPLOAD_EXTENSIONS.has(ext)) {
        return res.status(400).json({
          success: false,
          error: `Unsupported file extension: ${ext}. Allowed extensions: ${Array.from(ALLOWED_UPLOAD_EXTENSIONS).join(", ")}`,
        });
      }

      let fileBuffer: Buffer | null = null;
      if (Buffer.isBuffer(req.body)) {
        fileBuffer = req.body;
      } else if (req.body instanceof Uint8Array) {
        fileBuffer = Buffer.from(req.body);
      } else if (typeof req.body === "string") {
        fileBuffer = Buffer.from(req.body, "binary");
      }

      if (!fileBuffer || fileBuffer.length === 0) {
        return res.status(400).json({
          success: false,
          error: "No file data received or invalid format.",
        });
      }

      const r2AccountId = (process.env.CLOUDFLARE_R2_ACCOUNT_ID || "").trim();
      const r2AccessKeyId = (process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || "").trim();
      const r2SecretAccessKey = (process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || "").trim();
      const r2BucketName = (process.env.CLOUDFLARE_R2_BUCKET_NAME || "").trim();
      const r2PublicDomain = (process.env.CLOUDFLARE_R2_PUBLIC_DOMAIN || "").trim();

      if (r2AccountId && r2AccessKeyId && r2SecretAccessKey && r2BucketName) {
        try {
          const s3Client = new S3Client({
            region: "auto",
            endpoint: `https://${r2AccountId}.r2.cloudflarestorage.com`,
            credentials: {
              accessKeyId: r2AccessKeyId,
              secretAccessKey: r2SecretAccessKey,
            },
          });

          const command = new PutObjectCommand({
            Bucket: r2BucketName,
            Key: uploadPath,
            ContentType: contentType,
            Body: fileBuffer,
          });

          await s3Client.send(command);

          const cleanDomain = r2PublicDomain
            ? r2PublicDomain.replace(/\/$/, "")
            : `https://${r2BucketName}.${r2AccountId}.r2.cloudflarestorage.com`;
          const downloadURL = `${cleanDomain}/${uploadPath}`;

          return res.status(200).json({ success: true, url: downloadURL });
        } catch (r2Error: any) {
          console.error("Cloudflare R2 upload failed:", r2Error);
          return res.status(500).json({
            success: false,
            error: `Cloudflare R2 Upload Failed: ${r2Error.message || r2Error}`,
          });
        }
      }

      const saveLocallyAndRespond = () => {
        try {
          const isServerless = process.env.VERCEL === "1" || !!process.env.AWS_LAMBDA_FUNCTION_NAME;
          if (isServerless) {
            return res.status(500).json({
              success: false,
              error: "Upload failed: Cloudflare R2 or Firebase Storage credentials must be configured on Vercel.",
            });
          }

          if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
          }
          const safeName = path.basename(uploadPath).replace(/[^a-zA-Z0-9.\-_]/g, "");
          const fileName = `${Date.now()}_${safeName || "image.jpg"}`;
          const filePath = path.join(uploadsDir, fileName);
          fs.writeFileSync(filePath, fileBuffer!);
          const localUrl = `/uploads/${fileName}`;
          return res.status(200).json({ success: true, url: localUrl });
        } catch (diskErr: any) {
          console.error("Local disk upload fallback failed:", diskErr);
          return res.status(500).json({ success: false, error: diskErr.message || "Upload failed" });
        }
      };

      if (!bucket) {
        return saveLocallyAndRespond();
      }

      const url = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o?uploadType=media&name=${encodeURIComponent(uploadPath)}`;
      const headers: Record<string, string> = {
        "Content-Type": contentType,
      };
      if (req.headers.authorization) {
        headers["Authorization"] = req.headers.authorization;
      }

      try {
        const response = await fetch(url, {
          method: "POST",
          headers,
          body: fileBuffer,
        });

        if (!response.ok) {
          const errText = await response.text();
          console.error(`Firebase Storage returned ${response.status}:`, errText);
          return saveLocallyAndRespond();
        }

        const data = await response.json();
        const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(data.name)}?alt=media&token=${data.downloadTokens}`;
        return res.status(200).json({ success: true, url: downloadURL });
      } catch (fbErr) {
        console.error("Firebase Storage fetch error, attempting local disk fallback:", fbErr);
        return saveLocallyAndRespond();
      }
    } catch (error: any) {
      console.error("Server upload proxy error:", error);
      return res.status(500).json({ success: false, error: error.message || "Upload failed" });
    }
  }
);

// -------------------------------------------------------------
// Twilio OTP Routes
// -------------------------------------------------------------
apiRouter.post("/auth/send-otp", async (req, res) => {
  try {
    const { phoneNumber } = req.body || {};
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID || process.env.TWILIO_SERVICE_SID;

    if (!phoneNumber || typeof phoneNumber !== "string") {
      return res.status(400).json({ success: false, error: "Phone number is required." });
    }

    const cleanPhone = phoneNumber.trim();
    const e164Regex = /^\+[1-9]\d{7,14}$/;
    if (!e164Regex.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        error: "Valid phone number in international format (+[country code][number]) is required.",
      });
    }

    const clientIp = getClientIp(req);
    const rateLimit = checkRateLimit(`send-otp:${clientIp}:${cleanPhone}`, 5, 10 * 60 * 1000);
    if (!rateLimit.allowed) {
      return res.status(429).json({
        success: false,
        error: `Too many OTP requests. Please wait ${rateLimit.retryAfterSeconds} seconds before requesting again.`,
      });
    }

    if (!accountSid || !authToken || !serviceSid) {
      return res.status(500).json({
        success: false,
        error: "Twilio is not fully configured. Please set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_SERVICE_SID in environment variables.",
      });
    }

    const client = getTwilio();
    const verification = await client.verify.v2
      .services(serviceSid)
      .verifications.create({ to: cleanPhone, channel: "sms" });

    return res.status(200).json({ success: true, status: verification.status });
  } catch (error: any) {
    console.error("Twilio Send OTP Error:", error);
    let message = error.message || "Failed to send verification code.";
    if (error.code === 20003) {
      message = "Twilio Authentication Failed (Code 20003). Please check your Account SID and Auth Token.";
    } else if (error.code === 20404) {
      message = "Twilio Service SID not found (Code 20404). Please ensure the Verify Service exists in this account.";
    }
    return res.status(error.status || 500).json({ success: false, error: message });
  }
});

apiRouter.post("/auth/verify-otp", async (req, res) => {
  try {
    const { phoneNumber, code } = req.body || {};
    const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID || process.env.TWILIO_SERVICE_SID;

    if (!phoneNumber || !code) {
      return res.status(400).json({
        success: false,
        error: "Phone number and code are required.",
      });
    }

    const cleanPhone = String(phoneNumber).trim();
    const cleanCode = String(code).trim();

    const e164Regex = /^\+[1-9]\d{7,14}$/;
    if (!e164Regex.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        error: "Valid phone number in international format (+[country code][number]) is required.",
      });
    }

    if (!/^\d{4,8}$/.test(cleanCode)) {
      return res.status(400).json({
        success: false,
        error: "Invalid verification code format. Must be 4 to 8 digits.",
      });
    }

    const clientIp = getClientIp(req);
    const rateLimit = checkRateLimit(`verify-otp:${clientIp}:${cleanPhone}`, 5, 10 * 60 * 1000);
    if (!rateLimit.allowed) {
      return res.status(429).json({
        success: false,
        error: `Too many verification attempts. Please wait ${rateLimit.retryAfterSeconds} seconds before trying again.`,
      });
    }

    if (!serviceSid) {
      return res.status(500).json({
        success: false,
        error: "TWILIO_VERIFY_SERVICE_SID is not configured.",
      });
    }

    const client = getTwilio();
    const verificationCheck = await client.verify.v2
      .services(serviceSid)
      .verificationChecks.create({ to: cleanPhone, code: cleanCode });

    if (verificationCheck.status === "approved") {
      return res.status(200).json({ success: true, status: "approved" });
    } else {
      return res.status(401).json({ success: false, error: "Invalid verification code." });
    }
  } catch (error: any) {
    console.error("Error verifying OTP:", error);
    return res.status(error.status || 500).json({ success: false, error: error.message || "Verification failed." });
  }
});

// Mount the API Router on both "/api" and "/"
app.use("/api", apiRouter);
app.use("/", apiRouter);

// Global Error Handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Unhandled API Error:", err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal Server Error",
  });
});

export default app;
