import client from "@lib/server/client";
import withHandler from "@lib/server/withHandler";
import withSession from "@lib/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    const foundPost = await client.post.findUnique({
      where: {
        id: +id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        LikedPost: {
          select: {
            id: true,
          },
        },
        _count: {
          select: {
            LikedPost: true,
            Comment: true,
          },
        },
      },
    });
    if (!foundPost) {
      res.status(404).json({ ok: false, message: "존재하지 않는 글입니다." });
      return;
    }
    res.status(200).json({ ok: true, post: { ...foundPost } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error });
  }
}

export default withSession(withHandler({ methods: ["GET"], handler }));
