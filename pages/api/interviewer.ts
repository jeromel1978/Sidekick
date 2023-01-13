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
const OpenAIConf = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

const OpenAI = new OpenAIApi(OpenAIConf);
const Schema = `
{
  "id": "new",
  "Advisor1": string,
  "Advisor2": string,
  "Type": "client" | "prospect",
	"Member":[
		"CNumber": number,
		"ClientDate": date
		"PersonDetails" : {
			"Prefix": string,
			"FirstName": string,
			"MiddleName": string,
			"LastName": string,
			"Nickname": string,
			"Suffix": string,
			"DoB": date,
			"DoD": date,
			"Gender": string,
			"Marital": string,
			"Anniversary":date,
			"Addresses":[
			],
			"PhoneNumber":[
				"Type": string,
				"Country": number,
				"Area": number,
				"Phone": number
			],
			"EMailAddresses":[
				"Address": string
			],
			"Occupation": string,
			"QuickNote": string,
			"PersonalID":[
				{
					"Type":string,
					"Number":string
				}
			],
			"CEM": {
				"POA": String
				"POAID": String
				"InsDisc": boolean,
				"Paperless": boolean,
				"FutureVault": boolean,
				"MyPortfolio": boolean,
				"TaxClient": boolean,
				"T1013": boolean,
				"LOE": boolean
			}
		}
	]
}
`;

const FullPrompt = (Data: string) => `
Populate the following schema

"""
${Schema}
"""

using the following data

"""
${Data}
"""
`;
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const Prompt = req.body.prompt;
    const OpenAIParameters = {
      model: "text-davinci-003",
      prompt: FullPrompt(Prompt),
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
      user: "jerome",
    };
    const Response = await OpenAI.createCompletion(OpenAIParameters);
    res.status(200).send({ ok: true, bot: Response.data.choices[0].text as string });
  } catch (err: any) {
    res.status(err.response.status).send({ ok: false, error: err.response.statusText });
  }
};

export default handler;
