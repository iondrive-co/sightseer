import { Link } from "@remix-run/react";
import { useState } from "react";
import "../styles/styles.css";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Demo App" },
    { name: "description", content: "Welcome" },
  ];
};

export default function Index() {
  const [content, setContent] = useState(''); // Initialize state
  return (
    <div className="app">
      <div className="sidebar">
        <Link to="/links" className="text-xl text-blue-600 underline">
          Links
        </Link>
        <button 
          onClick={() => setContent('These are some references.')}
          className="text-xl text-blue-600 underline cursor-pointer"
        >
          References
        </button>
      </div>
      <div className="main-content">
        {/* main content will change based on state */}
        <p>{content}</p>
      </div>
    </div>
  );
}