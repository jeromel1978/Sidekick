import * as dotenv from "dotenv";
import type { NextApiRequest, NextApiResponse } from "next";
// import type { Configuration} from 'openai'

type Data = {
  ok: boolean;
  bot?: string;
  error?: any;
};

dotenv.config();

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const Prompt = req.body.prompt;
    const Config = {
      method: "post",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
      }),
      body: JSON.stringify({
        prompt: req.body.prompt,
        n: 1,
        size: "1024x1024",
        response_format: "b64_json",
        user: "jerome",
      }),
    };
    const Response: any = await fetch(process.env.OPENAI_IMAGE_API as string, Config);
    const Body = await Response.json();
    if (!Body.error) res.status(200).send({ ok: true, bot: Body.data[0].b64_json as string });
    if (Body.error) res.status(500).send({ ok: false, bot: Body.error.message });
  } catch (err: any) {
    res.status(500).send(err.code);
  }
};

export default handler;
