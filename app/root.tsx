import type { LinksFunction, MetaFunction } from "react-router";
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
import { seo } from "~/utils/seo";

export const links: LinksFunction = () => [];

// Site-wide default metadata. Leaf routes export their own `meta` which
// replaces this; it applies to any route that doesn't (e.g. error states).
export const meta: MetaFunction = () => seo();

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
