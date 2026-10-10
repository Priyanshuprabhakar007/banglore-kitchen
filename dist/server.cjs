var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_vite = require("vite");
var import_path = __toESM(require("path"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_twilio = __toESM(require("twilio"), 1);
var import_cors = __toESM(require("cors"), 1);
var import_client_s3 = require("@aws-sdk/client-s3");
var import_s3_request_presigner = require("@aws-sdk/s3-request-presigner");
import_dotenv.default.config();
if (import_fs.default.existsSync(".env.local")) {
  import_dotenv.default.config({ path: ".env.local", override: true });
}
function getTwilio() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  if (!accountSid || !authToken) {
    throw new Error("TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN are required");
  }
  return (0, import_twilio.default)(accountSid, authToken);
}
async function startServer() {
  try {
    const app = (0, import_express.default)();
    const PORT = Number(process.env.PORT) || 3e3;
    app.use((0, import_cors.default)());
    app.options("*", (0, import_cors.default)());
    app.use(import_express.default.json());
    app.use("/uploads", import_express.default.static(import_path.default.join(process.cwd(), "public", "uploads")));
    app.use((req, res, next) => {
      console.log(`[SERVER] ${req.method} ${req.path}`);
      next();
    });
    app.get("/health", (req, res) => {
      res.status(200).json({ success: true, message: "The Bangalore Kitchen backend is running" });
    });
    app.get("/api/health", (req, res) => {
      res.status(200).json({ success: true, message: "Backend is running" });
    });
    app.post("/api/admin/menu/find-image", async (req, res) => {
      try {
        const { productName } = req.body;
        if (!productName) {
          return res.status(400).json({ success: false, error: "productName is required" });
        }
        const nameLower = productName.toLowerCase();
        let imageUrl = "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800";
        if (nameLower.includes("dosa") || nameLower.includes("uttapam")) {
          imageUrl = "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=800";
        } else if (nameLower.includes("idli") || nameLower.includes("vada")) {
          imageUrl = "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800";
        } else if (nameLower.includes("biryani")) {
          imageUrl = "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800";
        } else if (nameLower.includes("chicken") || nameLower.includes("mutton") || nameLower.includes("lamb")) {
          imageUrl = "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=800";
        } else if (nameLower.includes("paneer")) {
          imageUrl = "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=800";
        } else if (nameLower.includes("coffee") || nameLower.includes("tea") || nameLower.includes("chai")) {
          imageUrl = "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800";
        } else if (nameLower.includes("lassi") || nameLower.includes("milk") || nameLower.includes("soda")) {
          imageUrl = "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=800";
        } else if (nameLower.includes("halwa") || nameLower.includes("jamun") || nameLower.includes("rasmalai") || nameLower.includes("ice cream")) {
          imageUrl = "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&q=80&w=800";
        } else if (nameLower.includes("naan") || nameLower.includes("roti") || nameLower.includes("paratha") || nameLower.includes("chapati")) {
          imageUrl = "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800";
        }
        return res.status(200).json({
          success: true,
          imageUrl,
          source: "Unsplash High Quality Food License"
        });
      } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
      }
    });
    app.post("/api/storage/presign", async (req, res) => {
      try {
        const uploadPath = req.body.path;
        const contentType = req.body.contentType || "application/octet-stream";
        if (!uploadPath) {
          return res.status(400).json({ success: false, error: "Missing path parameter." });
        }
        const r2AccountId = (req.headers["x-r2-account-id"] || process.env.CLOUDFLARE_R2_ACCOUNT_ID || "").trim();
        const r2AccessKeyId = (req.headers["x-r2-access-key-id"] || process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || "").trim();
        const r2SecretAccessKey = (req.headers["x-r2-secret-access-key"] || process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || "").trim();
        const r2BucketName = (req.headers["x-r2-bucket-name"] || process.env.CLOUDFLARE_R2_BUCKET_NAME || "").trim();
        const r2PublicDomain = (req.headers["x-r2-public-domain"] || process.env.CLOUDFLARE_R2_PUBLIC_DOMAIN || "").trim();
        if (r2AccountId && r2AccessKeyId && r2SecretAccessKey && r2BucketName) {
          const s3Client = new import_client_s3.S3Client({
            region: "auto",
            endpoint: `https://${r2AccountId}.r2.cloudflarestorage.com`,
            credentials: {
              accessKeyId: r2AccessKeyId,
              secretAccessKey: r2SecretAccessKey
            }
          });
          const command = new import_client_s3.PutObjectCommand({
            Bucket: r2BucketName,
            Key: uploadPath.replace(/^\/+/, ""),
            ContentType: contentType
          });
          const presignedUrl = await (0, import_s3_request_presigner.getSignedUrl)(s3Client, command, { expiresIn: 3600 });
          const cleanDomain = r2PublicDomain ? r2PublicDomain.replace(/\/$/, "") : `https://${r2BucketName}.${r2AccountId}.r2.cloudflarestorage.com`;
          const downloadURL = `${cleanDomain}/${uploadPath}`;
          return res.status(200).json({ success: true, presignedUrl, url: downloadURL });
        }
        return res.status(400).json({ success: false, error: "Cloudflare R2 is not properly configured." });
      } catch (error) {
        console.error("Presign error:", error);
        res.status(500).json({ success: false, error: error.message });
      }
    });
    app.post(
      "/api/storage/upload",
      import_express.default.raw({
        type: ["image/jpeg", "image/png", "image/webp", "image/*"],
        limit: "15mb"
      }),
      async (req, res) => {
        try {
          const bucket = req.query.bucket;
          const uploadPath = req.query.path;
          const contentType = req.headers["content-type"] || "image/jpeg";
          if (!uploadPath) {
            return res.status(400).json({ success: false, error: "Missing path parameter." });
          }
          if (!req.body || !Buffer.isBuffer(req.body)) {
            return res.status(400).json({
              success: false,
              error: "No file data received or invalid format."
            });
          }
          const r2AccountId = (req.headers["x-r2-account-id"] || process.env.CLOUDFLARE_R2_ACCOUNT_ID || "").trim();
          const r2AccessKeyId = (req.headers["x-r2-access-key-id"] || process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || "").trim();
          const r2SecretAccessKey = (req.headers["x-r2-secret-access-key"] || process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || "").trim();
          const r2BucketName = (req.headers["x-r2-bucket-name"] || process.env.CLOUDFLARE_R2_BUCKET_NAME || "").trim();
          const r2PublicDomain = (req.headers["x-r2-public-domain"] || process.env.CLOUDFLARE_R2_PUBLIC_DOMAIN || "").trim();
          if (r2AccountId && r2AccessKeyId && r2SecretAccessKey && r2BucketName) {
            console.log(`[SERVER] Uploading to Cloudflare R2: ${uploadPath}`);
            try {
              const s3Client = new import_client_s3.S3Client({
                region: "auto",
                endpoint: `https://${r2AccountId}.r2.cloudflarestorage.com`,
                credentials: {
                  accessKeyId: r2AccessKeyId,
                  secretAccessKey: r2SecretAccessKey
                }
              });
              const command = new import_client_s3.PutObjectCommand({
                Bucket: r2BucketName,
                Key: uploadPath.replace(/^\/+/, ""),
                ContentType: contentType,
                Body: req.body
              });
              await s3Client.send(command);
              const cleanDomain = r2PublicDomain ? r2PublicDomain.replace(/\/$/, "") : `https://${r2BucketName}.${r2AccountId}.r2.cloudflarestorage.com`;
              const downloadURL = `${cleanDomain}/${uploadPath}`;
              return res.status(200).json({ success: true, url: downloadURL });
            } catch (r2Error) {
              console.error(`[SERVER] Cloudflare R2 upload failed. Error details:`, r2Error);
              return res.status(500).json({ success: false, error: `Cloudflare R2 Upload Failed: ${r2Error.message || r2Error}` });
            }
          }
          const saveLocallyAndRespond = () => {
            try {
              const uploadsDir = import_path.default.join(process.cwd(), "public", "uploads");
              if (!import_fs.default.existsSync(uploadsDir)) {
                import_fs.default.mkdirSync(uploadsDir, { recursive: true });
              }
              const safeName = import_path.default.basename(uploadPath).replace(/[^a-zA-Z0-9.\-_]/g, "");
              const fileName = `${Date.now()}_${safeName || "image.jpg"}`;
              const filePath = import_path.default.join(uploadsDir, fileName);
              import_fs.default.writeFileSync(filePath, req.body);
              const localUrl = `/uploads/${fileName}`;
              console.log(`[SERVER] Upload fallback saved file locally: ${filePath}`);
              return res.status(200).json({ success: true, url: localUrl });
            } catch (diskErr) {
              console.error("[SERVER] Local disk upload fallback failed:", diskErr);
              return res.status(500).json({ success: false, error: diskErr.message || "Upload failed" });
            }
          };
          if (!bucket) {
            return saveLocallyAndRespond();
          }
          const url = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o?uploadType=media&name=${encodeURIComponent(uploadPath)}`;
          console.log(`[SERVER] Uploading to Firebase Storage: ${url}`);
          const headers = {
            "Content-Type": contentType
          };
          if (req.headers.authorization) {
            headers["Authorization"] = req.headers.authorization;
          }
          try {
            const response = await fetch(url, {
              method: "POST",
              headers,
              body: req.body
            });
            if (!response.ok) {
              const errText = await response.text();
              console.error(
                `Firebase Storage returned ${response.status}:`,
                errText
              );
              return saveLocallyAndRespond();
            }
            const data = await response.json();
            const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(data.name)}?alt=media&token=${data.downloadTokens}`;
            res.status(200).json({ success: true, url: downloadURL });
          } catch (fbErr) {
            console.error("Firebase Storage fetch error, attempting local disk fallback:", fbErr);
            return saveLocallyAndRespond();
          }
        } catch (error) {
          console.error("Server upload proxy error:", error);
          res.status(500).json({ success: false, error: error.message });
        }
      }
    );
    app.post("/api/auth/send-otp", async (req, res) => {
      try {
        console.log("OTP Send API hit:", req.body);
        const { phoneNumber } = req.body;
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID || process.env.TWILIO_SERVICE_SID;
        console.log("Twilio Environment Status:", {
          hasAccountSid: !!accountSid,
          hasAuthToken: !!authToken,
          hasServiceSid: !!serviceSid,
          usingVerifySid: !!process.env.TWILIO_VERIFY_SERVICE_SID
        });
        if (!phoneNumber) {
          return res.status(400).json({ success: false, error: "Phone number is required." });
        }
        if (!accountSid || !authToken || !serviceSid) {
          return res.status(500).json({
            success: false,
            error: "Twilio is not fully configured. Please set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_SERVICE_SID in environment variables."
          });
        }
        const client = getTwilio();
        const maskedServiceSid = serviceSid.substring(0, 4) + "..." + serviceSid.substring(serviceSid.length - 4);
        console.log(
          `Attempting to send OTP using Service SID: ${maskedServiceSid} to ${phoneNumber}`
        );
        const verification = await client.verify.v2.services(serviceSid).verifications.create({ to: phoneNumber, channel: "sms" });
        res.status(200).json({ success: true, status: verification.status });
      } catch (error) {
        console.error("Twilio Send OTP Error Details:", {
          status: error.status,
          code: error.code,
          message: error.message
        });
        let message = error.message;
        if (error.code === 20003) {
          message = "Twilio Authentication Failed (Code 20003). Please check your Account SID and Auth Token in Settings.";
        } else if (error.code === 20404) {
          const sid = process.env.TWILIO_VERIFY_SERVICE_SID || process.env.TWILIO_SERVICE_SID || "";
          message = `Twilio Service SID not found (Code 20404). Please ensure the Service (VA...) exists in this account. (Using: ${sid.substring(0, 4)}...)`;
        }
        res.status(error.status || 500).json({ success: false, error: message });
      }
    });
    app.post("/api/auth/verify-otp", async (req, res) => {
      try {
        console.log("OTP Verify API hit:", req.body);
        const { phoneNumber, code } = req.body;
        const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID || process.env.TWILIO_SERVICE_SID;
        if (!phoneNumber || !code) {
          return res.status(400).json({
            success: false,
            error: "Phone number and code are required."
          });
        }
        if (!serviceSid) {
          return res.status(500).json({
            success: false,
            error: "TWILIO_VERIFY_SERVICE_SID is not configured"
          });
        }
        const client = getTwilio();
        const verificationCheck = await client.verify.v2.services(serviceSid).verificationChecks.create({ to: phoneNumber, code });
        if (verificationCheck.status === "approved") {
          res.status(200).json({ success: true });
        } else {
          res.status(401).json({ success: false, error: "Invalid verification code" });
        }
      } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(error.status || 500).json({ success: false, error: error.message });
      }
    });
    if (process.env.NODE_ENV !== "production") {
      const vite = await (0, import_vite.createServer)({
        server: { middlewareMode: true },
        appType: "spa"
      });
      app.use(vite.middlewares);
    } else {
      const distPath = import_path.default.join(process.cwd(), "dist");
      app.use(import_express.default.static(distPath));
      app.get("*", (req, res) => {
        res.sendFile(import_path.default.join(distPath, "index.html"));
      });
    }
    app.use(
      (err, req, res, next) => {
        console.error("Unhandled Server Error:", err);
        res.status(err.status || 500).json({
          error: err.message || "Internal Server Error",
          success: false
        });
      }
    );
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log("Environment Debug:", {
        hasAccountSid: !!process.env.TWILIO_ACCOUNT_SID,
        hasAuthToken: !!process.env.TWILIO_AUTH_TOKEN,
        hasVerifyServiceSid: !!process.env.TWILIO_VERIFY_SERVICE_SID,
        hasPlainServiceSid: !!process.env.TWILIO_SERVICE_SID
      });
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}
startServer();
//# sourceMappingURL=server.cjs.map
