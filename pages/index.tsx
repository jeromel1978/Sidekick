import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import React, { useState } from "react";
import ChatMessage from "../components/ChatMessage";
import Logo from "../public/JLlogo.svg";
import SendIcon from "@mui/icons-material/Send";

type Message = {
  IsBot: boolean;
  ID: string;
  Text: string;
};
const inter = Inter({ subsets: ["latin"] });
const Messages: Message[] = [];

export default function Home() {
  const [Messages, setMessages] = useState([] as Message[]);
  const [Prompt, setPrompt] = useState("");
  // const Form = document.querySelector("form");
  // const MessageContainer = document.querySelector(".messages");
  let LoadInterval;
  let IntervalCount: number = 0;
  const Loading = () => {
    IntervalCount = (IntervalCount + 1) % 4;
    return ".".repeat(IntervalCount);
  };
  const Loader = (El: HTMLElement | null) => {
    if (!El) return;
    El.textContent = "";
    LoadInterval = setInterval(() => {
      El.textContent = Loading();
    }, 300);
  };
  const UniqueID = () => {
    return `id-${Date.now()}-${Math.random().toString(16)}`;
  };
  const Send = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!!e) e.preventDefault();
    if (!Prompt) return;
    setMessages([...Messages, { IsBot: false, ID: UniqueID(), Text: Prompt }]);
    const Input = document.querySelector("#InputText") as HTMLTextAreaElement;
    Input.value = "";
    Input.focus();
    // Loader(document.querySelector(".messages")?.lastElementChild as HTMLElement);
  };
  const CheckKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === "Enter" && !e.shiftKey) Send(undefined as any);
  };
  return (
    <>
      <Head>
        <title>Loso-Sidekick</title>
        <meta name="description" content="Your Personal Sidekick" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/JLlogo.svg" />
      </Head>
      <main className="h-screen w-screen grid grid-rows-[1fr_auto]">
        <div className="messages w-fill flex flex-col grow max-w-full overflow-y-auto">
          {Messages.map((Message: Message) => (
            <ChatMessage IsBot={Message.IsBot} key={Message.ID} ID={Message.ID} Text={Message.Text} />
          ))}
        </div>
        <form className="w-fill flex grow-0 max-w-full">
          <textarea
            rows={1}
            cols={1}
            placeholder="Type a Message..."
            id="InputText"
            className="flex grow"
            onKeyUp={CheckKey}
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
          ></textarea>
          <button type="submit" onClick={Send} className="flex grow-0" title="Send">
            <SendIcon></SendIcon>
          </button>
        </form>
      </main>
    </>
  );
}
