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
        "Line1": string,
        "Line2": string,
        "City": string,
        "Province": string,
        "Country": string,
        "PostalCode": string
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
			"Note": string,
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
Populate the following exact schema in valid JSON syntax, remove comments from the results

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
    let OpenAIParameters = {
      model: "text-davinci-003",
      prompt: FullPrompt(Prompt),
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      user: "jerome",
    };
    const ResInitial = await OpenAI.createCompletion(OpenAIParameters);
    OpenAIParameters.prompt = `
    remove all comments from the following JSON schema
    """
    ${ResInitial.data.choices[0].text}
    """
    `;
    const ResFinal = await OpenAI.createCompletion(OpenAIParameters);
    res.status(200).send({ ok: true, bot: ResFinal.data.choices[0].text as string });
  } catch (err: any) {
    res.status(err.response.status).send({ ok: false, error: err.response.statusText });
  }
};

export default handler;
