export default function handler(_req: any, res: any) {
  res.status(200).json({
    success: true,
    message: "The Bangalore Kitchen backend is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "production",
  });
}
