import {Link} from "@remix-run/react";
import {useState} from "react";

export default function Sidebar() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [content, setContent] = useState('');
  
  return (
    <div className="sidebar">
        <Link to="/">
            <img src="/favicon.ico" alt="Home" />
        </Link>
      <Link to="/Editor" className="text-xl underline cursor-pointer">
        Editor
      </Link>
      <Link to="/exobase/Exobase" className="text-xl underline cursor-pointer">
        Exobase
      </Link>
      <Link to="/Reviews" className="text-xl underline cursor-pointer">
        Reviews
      </Link>
    </div>
  );
}
