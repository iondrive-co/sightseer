import { Link } from "@remix-run/react";
import { useState } from "react";

export default function Sidebar() {
  const [content, setContent] = useState('');
  
  return (
    <div className="sidebar">
      <Link to="/rendering" className="text-xl text-blue-600 underline cursor-pointer">
        Rendering
      </Link>
      <Link to="/links" className="text-xl text-blue-600 underline cursor-pointer">
        Links
      </Link>
    </div>
  );
}
