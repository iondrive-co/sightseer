import { Link } from "@remix-run/react";
import { useState } from "react";
import "../styles/styles.css";
import Content from "../components/Content";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Demo App" },
    { name: "description", content: "Welcome" },
  ];
};

export default function Index() {
  const [content, setContent] = useState('');
  return (
    <div className="app">
      <div className="sidebar">
        <button 
          onClick={() => setContent(<Content />)}
          className="text-xl text-blue-600 underline cursor-pointer toc-style"
        >
          References
        </button>
        <Link to="/links" className="text-xl text-blue-600 underline cursor-pointer">
          Links
        </Link>
      </div>
      <div className="main-content">
        <p>{content}</p>
      </div>
    </div>
  );
}