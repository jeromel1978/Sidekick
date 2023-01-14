import React, { useState } from "react";
import ChatMessage from "../components/ChatMessage";
import { Send as SendIcon } from "@mui/icons-material";
import Layout from "../components/layouts/Main";
import { Select, MenuItem, TextField, IconButton } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";

type Message = {
  IsBot: boolean;
  ID: string;
  Text: string;
  Prompt: string;
};

export default function ConvertSchema() {
  const [Messages, setMessages] = useState([] as Message[]);
  const [Prompt, setPrompt] = useState("");
  const [Schema, setSchema] = useState("HUB-Household");
  const Model = "convertschema";

  const Options = [
    { name: "Hub - Household", link: "HUB-Household" },
    { name: "Hub - Person", link: "HUB-Person" },
    { name: "ACPI", link: "ACPI" },
    { name: "Conquest", link: "Conquest" },
  ];
  const UniqueID = () => {
    return `id-${Date.now()}-${Math.random().toString(16)}`;
  };
  const Send = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!!e) e.preventDefault();
    if (!Prompt) return;
    const FullPrompt = JSON.stringify({
      to: Schema,
      from: Prompt,
    });
    setMessages([...Messages, { IsBot: false, ID: UniqueID(), Text: Prompt, Prompt: FullPrompt }]);
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
  const ChangeSchema = (e: SelectChangeEvent) => {
    console.log(e.target.value);
    // const SelectSchema = document.querySelector("#SelectSchema") as Element;
    // console.log(SelectSchema.innerHTML);
    setSchema(e.target.value ?? "");
  };
  return (
    <Layout Model={Model}>
      <div className="flex flex-column">
        <div>
          <Select id="SelectSchema" value={Schema ?? Options[0].link} onChange={ChangeSchema}>
            {Options.map((opt, i) => (
              <MenuItem value={opt.link} key={i}>
                {opt.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div id="Messages" className="messages w-fill flex flex-col grow max-w-full overflow-y-auto">
          {Messages.map((Message: Message) => (
            <ChatMessage
              IsBot={Message.IsBot}
              key={Message.ID}
              ID={Message.ID}
              Text={Message.Text}
              Prompt={Message.Prompt}
              Model={Model}
              onReplied={ResultScrollDown}
            />
          ))}
        </div>
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
