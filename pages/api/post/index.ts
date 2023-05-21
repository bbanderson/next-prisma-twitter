import client from "@lib/server/client";
import withHandler from "@lib/server/withHandler";
import withSession from "@lib/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const posts = await client.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        LikedPost: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            LikedPost: true,
            Comment: true,
          },
        },
      },
      orderBy: [
        {
          createdAt: "desc",
        },
        {
          user: {
            name: "asc",
          },
        },
      ],
    });
    res.status(200).json({ ok: true, posts });
    return;
  }
  if (req.method === "POST") {
    const { post } = req.body;
    try {
      const newPost = await client.post.create({
        data: {
          userId: req.session.user.id,
          text: post,
        },
      });
      res.status(201).json({ ok: true, ...newPost });
    } catch (error) {
      console.error(error);
      res.status(500).json({ ok: false, error });
    }
  }
}

export default withSession(withHandler({ methods: ["GET", "POST"], handler }));
