import client from "@lib/server/client";
import withHandler from "@lib/server/withHandler";
import withSession from "@lib/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userSessionId = req.session?.user?.id;
    if (!userSessionId) {
      return res.status(401).json({ ok: false });
    }
    const foundUser = await client.user.findUnique({
      where: { id: userSessionId },
    });

    if (foundUser) {
      res.status(200).json({
        ok: true,
        userSessionData: { ...foundUser },
      });
    } else {
      res.status(401).json({
        ok: true,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error });
  }
}

export default withSession(
  withHandler({ methods: ["GET"], handler, isPrivate: false })
);
