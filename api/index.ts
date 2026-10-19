import app from "../server/app";

// Disable Vercel's default body parsing and declare externalResolver so Express handles requests natively
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default function handler(req: any, res: any) {
  return app(req, res);
}

export { app };
