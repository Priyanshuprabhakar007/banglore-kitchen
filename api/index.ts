import app from "../server/app";

// Disable Vercel's default body parsing so that Express raw and json parsers work uniformly
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
