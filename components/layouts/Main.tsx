import Head from "next/head";
import { Inter } from "@next/font/google";
import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import { Select, MenuItem, TextField, IconButton } from "@mui/material";

const Options = [
  { link: "general", name: "General" },
  { link: "interviewer", name: "Interviewer" },
  { link: "codex", name: "Coding" },
  { link: "image", name: "Image" },
];

type Message = {
  IsBot: boolean;
  ID: string;
  Text: string;
};
type LayoutProps = {
  children?: React.ReactNode;
};
const inter = Inter({ subsets: ["latin"] });
const Messages: Message[] = [];

export const Layout = ({ children }: LayoutProps) => {
  // const [Model, setModel] = useState(Options[0].link);

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

  const ChangeModel = (e: any) => {
    // setMessages([]);
    ChangePage(e.target.value);
  };
  const ChangePage = (Model: string) => {
    document.location.href = `/${Model.toLowerCase()}`;
  };
  return (
    <>
      <Head>
        <title>Loso-Sidekick</title>
        <meta name="description" content="Your Personal Sidekick" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/JLlogo.svg" />
      </Head>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <main className="h-full w-full grid grid-rows-[auto_1fr_auto]">
          <nav>
            <Select id="SelectModel" value={Options[0].link} onChange={ChangeModel}>
              {Options.map((opt, i) => (
                <MenuItem value={opt.link} key={i}>
                  {opt.name}
                </MenuItem>
              ))}
            </Select>
          </nav>
          {children}
        </main>
      </ThemeProvider>
    </>
  );
};
export default Layout;
