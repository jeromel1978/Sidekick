import React, { useState } from "react";
import ChatMessage from "../components/ChatMessage";

import { TextField, IconButton } from "@mui/material";
import Layout from "../components/layouts/Main";
import { Send as SendIcon } from "@mui/icons-material";

type Message = {
  IsBot: boolean;
  ID: string;
  Text: string;
};

export default function Home() {
  const [Messages, setMessages] = useState([] as Message[]);
  const [Prompt, setPrompt] = useState("");
  const Model = "general";

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
    <Layout Model={Model}>
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
