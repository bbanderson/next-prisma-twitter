import { NextApiRequest, NextApiResponse } from "next";

interface withHandlerPropType {
  method: "GET" | "POST";
  handler(req: NextApiRequest, res: NextApiResponse): Promise<void>;
}
const withHandler = ({ method, handler }: withHandlerPropType) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== method) {
      res.status(405).end();
      return;
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
