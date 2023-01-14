import Image from "next/image";
import { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";

type ComponentProps = {
  IsBot: boolean;
  ID: string;
  Text: string;
  Prompt?: string;
  Model: string;
  onReplied: Function;
};
export default function Home({ IsBot, ID, Text, Prompt, Model, onReplied }: ComponentProps) {
  const [Initial, setInitial] = useState(true);
  const [Out, setOut] = useState("" as any);
  const [Error, setError] = useState("");
  let LoadInterval: string | number | NodeJS.Timer | undefined;
  let IntervalCount: number = 0;
  const Loading = () => {
    IntervalCount = (IntervalCount + 1) % 4;
    return ".".repeat(IntervalCount);
  };

  const Loader = () => {
    if (!Text) return;
    setInitial(false);
    console.log(Model);
    fetch(`/api/${Model}`, {
      method: "post",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: Prompt ?? Text,
      }),
    }).then(async (res: Response) => {
      if (res.ok) {
        clearInterval(LoadInterval);
        const ResObj = await res.json();
        if (Model !== "image") setOut(ResObj.bot.trim());
        if (Model === "image") {
          setOut(ResObj.bot);
        }
      } else {
        const ResObj = await res.json();
        clearInterval(LoadInterval);
        setOut("");
        setOut(ResObj.error);
        console.log("Server Error", ResObj);
        // console.error(ResObj)
        setError(ResObj.bot);
      }
      onReplied();
    });
    LoadInterval = setInterval(() => {
      setOut(Loading());
    }, 300);
  };
  if (!Out && Initial) Loader();
  //   const Format = `message flex flex-row${!!IsBot ? "" : "-reverse"}`;
  const FormatReq = `message flex flex-row-reverse`;
  const FormatRes = `message flex flex-row ${Model === "image" ? `w-3/4 max-w-lg` : ``}`;
  const IconReq = `/person_black_24dp.svg`;
  const IconRes = `/JLlogo.svg`;
  const FormatOutput = (Out: string) => {
    if (Model === "image" && Out.substring(0, 1) !== "." && !!Out)
      return <Image src={`data:image/png;base64, ${Out}`} alt="Result" width={0} height={0} className="w-fit"></Image>;
    // if (Model === "interviewer" && Out.substring(0, 1) !== "." && !!Out) Out = JSON.stringify(JSON.parse(Out));
    // if (Model === "interviewer" && Out.substring(0, 1) !== "." && !!Out) console.log(Out);
    return Out;
  };
  return (
    <>
      <div className={FormatReq}>
        <div>
          <Image src={IconReq} alt="Icon" width={24} height={24} className="w-8 min-w-[2rem]" />
        </div>
        <div className="MessageText bg-slate-500 bg-opacity-20 whitespace-pre-wrap m-2 px-2 py-1 rounded-md min-h-[2rem]">
          {Text}
        </div>
      </div>
      <div className={FormatRes}>
        <div>
          <Image src={IconRes} alt="Icon" width={24} height={24} className="w-8 min-w-[2rem]" />
        </div>
        <div className="MessageText bg-slate-500 bg-opacity-25 whitespace-pre-wrap m-2 px-2 py-1 rounded-md min-w-[2rem] min-h-[2rem]">
          {FormatOutput(Out)}
          {Error}
        </div>
      </div>
    </>
  );
}
