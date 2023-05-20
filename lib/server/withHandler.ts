import { NextApiRequest, NextApiResponse } from "next";

interface withHandlerPropType {
  method: "GET" | "POST";
  handler(req: NextApiRequest, res: NextApiResponse): Promise<void>;
  isPrivate?: boolean;
}
const withHandler = ({
  method,
  handler,
  isPrivate = false,
}: withHandlerPropType) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== method) {
      res.status(405).end();
      return;
    }

    if (isPrivate && !req.session.user) {
      res.status(401).json({ ok: false, message: "로그인이 필요합니다." });
    }

    try {
      await handler(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  };
};

export default withHandler;
