import {Link} from "@remix-run/react";
import {useState} from "react";

export default function Sidebar() {
  const [content, setContent] = useState('');
  
  return (
    <div className="sidebar">
      <Link to="/Editor" className="text-xl text-blue-600 underline cursor-pointer">
        Editor
      </Link>
      <Link to="/exobase/Exobase" className="text-xl text-blue-600 underline cursor-pointer">
        Exobase
      </Link>
      <Link to="/Movies" className="text-xl text-blue-600 underline cursor-pointer">
        Movies
      </Link>
    </div>
  );
}
