import Link from "next/link";
const Options = [
  { link: "general", name: "General" },
  { link: "codex", name: "Coding" },
  { link: "image", name: "Image" },
];
type DashboardLayoutProps = {
  children?: React.ReactNode;
};
export const Layout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <nav>
        <ul className="flex gap-8">
          {Options.map((opt, i) => (
            <li key={i.toString()}>
              <Link href={opt.link}>{opt.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
