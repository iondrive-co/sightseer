import type { LinksFunction } from "react-router";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";

import '~/styles/tailwind.css';
import Webring from "~/components/Webring";

export const links: LinksFunction = () => [];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Creative writing, opinions, projects, and links — a personal site by Miles." />
        <title>Iondrive</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const location = useLocation();
  const pathname = location.pathname.replace(/\/+$/, "") || "/";
  const normalized = pathname.toLowerCase();
  const showWebring = pathname === "/" || normalized === "/meta";
  const isHome = pathname === "/";

  return (
    <>
      <Outlet />
      {showWebring && <Webring compact={isHome} />}
    </>
  );
}
