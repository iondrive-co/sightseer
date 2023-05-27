import { json } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import Sidebar from "../components/Sidebar";

export const loader = async () => {
  return json({
    links: [
      {
        slug: "demo-link",
        title: "Demo Link",
      },
    ],
  });
};

export default function Links() {
  const { links } = useLoaderData<typeof loader>();

  return (
    <div className="app">
      <Sidebar />
      <main>
        <h1>links</h1>
        <ul>
          {links.map((link) => (
            <li key={link.slug}>
              <Link
                to={link.slug}
                className="text-blue-600 underline"
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}