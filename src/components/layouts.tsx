import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import logoDark from "../assets/logo-dark.png";
import { ModeToggle } from "./mode-toggle";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <div className="bg-secondary h-16 border-b border-s-zinc-200 fixed w-full z-10 top-0 flex">
        <div className="container flex items-center justify-between">
          <Link to="/">
            <img
              className="block dark:hidden"
              src={logo}
              alt="logo"
              height={45}
              width={130}
            />
            <img
              className="hidden dark:block"
              src={logoDark}
              alt="logo"
              height={45}
              width={130}
            />
          </Link>
          <ModeToggle />
        </div>
      </div>
      <div className="h-[90vh] w-screen flex flex-col justify-center items-center">
        <div className="bg-secondary p-10 rounded-md">{children}</div>
      </div>
    </>
  );
}
