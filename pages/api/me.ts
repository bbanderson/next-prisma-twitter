import client from "@lib/server/client";
import withHandler from "@lib/server/withHandler";
import withSession from "@lib/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userSessionId = req.session.user.id;
  try {
    const foundUser = await client.user.findUnique({
      where: { id: userSessionId },
    });

    res.status(200).json({
      ok: true,
      userSessionData: foundUser ? { ...foundUser } : undefined,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error });
  }
}

export default withSession(withHandler({ methods: ["GET", "POST"], handler }));
