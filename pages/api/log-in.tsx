import client from "@lib/server/client";
import withHandler from "@lib/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ ok: false, message: "이메일이 입력되지 않았습니다." });
  }
  try {
    const foundUser = await client.user.findUnique({ where: { email } });
    if (!foundUser) {
      return res
        .status(404)
        .json({ ok: false, message: "이메일을 확인해 주세요." });
    }

    req.session.user.id = foundUser.id;
    await req.session.save();
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error });
  }
}

export default withHandler({ method: "POST", handler });
