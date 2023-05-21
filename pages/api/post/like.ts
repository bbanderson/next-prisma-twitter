import client from "@lib/server/client";
import withHandler from "@lib/server/withHandler";
import withSession from "@lib/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { postId } = req.body;
  try {
    const alreadyExists = await client.likedPost.findFirst({
      where: {
        postId,
        userId: req.session.user.id,
      },
    });
    if (alreadyExists) {
      await client.likedPost.delete({
        where: {
          id: alreadyExists.id,
        },
      });
    } else {
      await client.likedPost.create({
        data: {
          user: {
            connect: {
              id: req.session.user.id,
            },
          },
          post: {
            connect: {
              id: postId,
            },
          },
        },
      });
    }
    res.status(200).json({ ok: true, postId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error });
  }
}

export default withSession(withHandler({ methods: ["POST"], handler }));
