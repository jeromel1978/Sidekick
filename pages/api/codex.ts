import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import type { NextApiRequest, NextApiResponse } from "next";
// import type { Configuration} from 'openai'

type Data = {
  ok: boolean;
  bot?: string;
  error?: any;
};

dotenv.config();
console.log(`OPEN_AI_KEY`, process.env.OPEN_AI_KEY);
const OpenAIConf = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

const OpenAI = new OpenAIApi(OpenAIConf);
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const Prompt = req.body.prompt;
    // const Prompt = "Hello";
    const OpenAIParameters = {
      model: "text-davinci-003",
      prompt: Prompt,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    };
    const Response = await OpenAI.createCompletion(OpenAIParameters);
    res.status(200).send({ ok: true, bot: Response.data.choices[0].text as string });
  } catch (err) {
    console.error(err);
    res.status(500).send({ ok: false, error: err });
  }
};

export default handler;
