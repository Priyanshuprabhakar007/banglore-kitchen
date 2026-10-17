import app from "../server/app";

// Export the Express app handler for Vercel Serverless Function runtime.
// Ensures that Express handles the complete request/response lifecycle without premature termination.
export default function handler(req: any, res: any) {
  if (res.writableEnded) return;

  return new Promise<void>((resolve, reject) => {
    res.on("finish", () => resolve());
    res.on("close", () => resolve());
    res.on("error", (err: any) => reject(err));
    app(req, res, (err: any) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

export { app };
