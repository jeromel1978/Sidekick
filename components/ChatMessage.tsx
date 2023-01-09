import Image from "next/image";
import { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";

type ComponentProps = {
  IsBot: boolean;
  ID: string;
  Text: string;
};
export default function Home({ IsBot, ID, Text }: ComponentProps) {
  const [Initial, setInitial] = useState(true);
  const [Out, setOut] = useState("");
  let LoadInterval: string | number | NodeJS.Timer | undefined;
  let IntervalCount: number = 0;
  const Loading = () => {
    IntervalCount = (IntervalCount + 1) % 4;
    return ".".repeat(IntervalCount);
  };

  const Loader = () => {
    if (!Text) return;
    setInitial(false);
    // console.log(Text);
    fetch("/api/codex", {
      method: "post",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        prompt: Text,
      }),
    }).then(async (res: Response) => {
      if (res.ok) {
        clearInterval(LoadInterval);
        const ResObj = await res.json();
        // console.log(ResObj);
        //   console.log(ResObj.bot);
        setOut(ResObj.bot);
      } else {
        // console.log(res);
        const ResObj = await res.json();
        // console.log(ResObj);
        clearInterval(LoadInterval);
        setOut(ResObj.error.message);
      }
    });
    LoadInterval = setInterval(() => {
      setOut(Loading());
    }, 300);
  };
  if (!Out && Initial) Loader();
  //   const Format = `message flex flex-row${!!IsBot ? "" : "-reverse"}`;
  const FormatReq = `message flex flex-row`;
  const FormatRes = `message flex flex-row-reverse`;
  const IconReq = `/person_black_24dp.svg`;
  const IconRes = `/JLlogo.svg`;
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
          {Out}
        </div>
      </div>
    </>
  );
}
