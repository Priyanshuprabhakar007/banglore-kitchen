import app from "./server/app";
import { createServer as createViteServer } from "vite";
import path from "path";
import express from "express";

async function startServer() {
  try {
    const PORT = Number(process.env.PORT) || 3000;

    // Vite middleware for local development
    if (process.env.NODE_ENV !== "production") {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } else {
      const distPath = path.join(process.cwd(), "dist");
      app.use(express.static(distPath));
      app.get("*", (_req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    }

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log("Environment Status:", {
        hasAccountSid: !!process.env.TWILIO_ACCOUNT_SID,
        hasAuthToken: !!process.env.TWILIO_AUTH_TOKEN,
        hasVerifyServiceSid: !!process.env.TWILIO_VERIFY_SERVICE_SID,
        hasPlainServiceSid: !!process.env.TWILIO_SERVICE_SID,
        hasR2Config: !!(
          process.env.CLOUDFLARE_R2_ACCOUNT_ID &&
          process.env.CLOUDFLARE_R2_ACCESS_KEY_ID
        ),
      });
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

startServer();
