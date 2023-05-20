import client from "@lib/server/client";
import withHandler from "@lib/server/withHandler";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, name } = req.body;

  if (!email || !name) {
    res.status(400).json({ ok: false });
    return;
  }

  try {
    const createdUser = await client?.user.create({
      data: {
        email,
        name,
      },
    });

    res.status(201).json({ ok: true, createdUser });
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });
