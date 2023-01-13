import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import React, { useState } from "react";
import ChatMessage from "../components/ChatMessage";
import Logo from "../public/JLlogo.svg";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import { Send as SendIcon, UnfoldMore as UnfoldMoreIcon, UnfoldLess as UnfoldLessIcon, Mic } from "@mui/icons-material";
import { Select, MenuItem, TextField, IconButton } from "@mui/material";
import Layout from "../components/layouts/Main";

type Message = {
  IsBot: boolean;
  ID: string;
  Text: string;
};
const inter = Inter({ subsets: ["latin"] });
const Messages: Message[] = [];

export default function Home() {
  const [VocalResult, setVocalResult] = useState("");
  const [Messages, setMessages] = useState([] as Message[]);
  const [Prompt, setPrompt] = useState("");
  const Model = "general";

  const PrefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const Theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: PrefersDarkMode ? "dark" : "light",
        },
      }),
    [PrefersDarkMode]
  );

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
    setTimeout(() => {
      ScrollDown();
    }, 100);
    Input.value = "";
    Input.focus();
  };
  const CheckKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === "Enter" && !e.shiftKey) Send(undefined as any);
  };
  const ScrollDown = () => {
    const MessageContainer = document.querySelector("#Messages") as HTMLDivElement;
    MessageContainer.scrollTo(0, MessageContainer.scrollHeight);
  };
  const ResultScrollDown = () => {
    setTimeout(() => {
      ScrollDown();
    }, 300);
  };
  return (
    <Layout>
      <div id="Messages" className="messages w-fill flex flex-col grow max-w-full overflow-y-auto">
        {Messages.map((Message: Message) => (
          <ChatMessage
            IsBot={Message.IsBot}
            key={Message.ID}
            ID={Message.ID}
            Text={Message.Text}
            Model={Model}
            onReplied={ResultScrollDown}
          />
        ))}
      </div>
      <form className="w-fill flex grow-0 max-w-full gap-1">
        <TextField
          id="InputText"
          color="primary"
          className="flex grow text-current"
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          label="Message"
          variant="outlined"
          multiline
          maxRows={5}
        ></TextField>
        <IconButton onClick={Send} className="flex grow-0 " title="Send">
          <SendIcon />
        </IconButton>
      </form>
    </Layout>
  );
}
