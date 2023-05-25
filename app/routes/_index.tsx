import type { V2_MetaFunction } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Demo App" },
    { name: "description", content: "Welcome to Ion Drive" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div className="mx-auto mt-16 max-w-7xl text-center">
        <Link
          to="/links"
          className="text-xl text-blue-600 underline"
        >
          Links
        </Link>
      </div>
    </div>
  );
}
