import { NextApiRequest, NextApiResponse } from "next";

type MethodType = "GET" | "POST";
interface withHandlerPropType {
  methods: MethodType[];
  handler(req: NextApiRequest, res: NextApiResponse): Promise<void>;
  isPrivate?: boolean;
}
const withHandler = ({
  methods,
  handler,
  isPrivate = true,
}: withHandlerPropType) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (
      req.method &&
      !methods.includes(req.method.toUpperCase() as MethodType)
    ) {
      res.status(405).end();
      return;
    }

    if (isPrivate) {
      if (!req.session?.user) {
        res.status(401).json({ ok: false, message: "로그인이 필요합니다." });
        return;
      }
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
