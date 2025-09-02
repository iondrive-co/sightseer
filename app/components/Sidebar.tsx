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
      <Link to="/exobase/Exobase" className="text-xl underline cursor-pointer">
        Exobase
      </Link>
      <Link to="/Links" className="text-xl underline cursor-pointer">
        Links
      </Link>
      <Link to="/Recipes" className="text-xl underline cursor-pointer">
          Recipes
      </Link>
      <Link to="/Reviews" className="text-xl underline cursor-pointer">
        Reviews
      </Link>
      <Link to="/Solar" className="text-xl underline cursor-pointer">
        Solar
      </Link>
      <Link to="/Tools" className="text-xl underline cursor-pointer">
         Tools
      </Link>
    </div>
  );
}
