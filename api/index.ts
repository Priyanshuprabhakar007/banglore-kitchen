export default async function handler(req: any, res: any) {
  try {
    const mod = await import("../server/app");
    const app = mod.default || mod;
    return app(req, res);
  } catch (err: any) {
    return res.status(500).json({
      error: "SERVER_APP_CRASH",
      message: err?.message,
      name: err?.name,
      code: err?.code,
      stack: err?.stack,
    });
  }
}
