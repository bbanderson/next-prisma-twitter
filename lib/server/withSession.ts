import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";

const cookieOptions = {
  cookieName: process.env.COOKIE_NAME ?? "",
  password: process.env.COOKIE_PASSWORD ?? "",
};

declare module "iron-session" {
  interface IronSessionData {
    user: {
      id: number;
    };
  }
}

interface withSessionPropType {
  handler(req: NextApiRequest, res: NextApiResponse): Promise<void>;
}
export default function withSession({ handler }: withSessionPropType) {
  return withIronSessionApiRoute(handler, cookieOptions);
}
