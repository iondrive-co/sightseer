import "../styles/styles.css";
import "../styles/index.css";
import Sidebar from "../components/Sidebar";
import {V2_MetaFunction} from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Iondrive" },
  ];
};

export default function Index() {
  return (
    <div className="app">
      <Sidebar />
        <div className="index-content">
            <p className="email">c@iondrive.co</p>
            <div className="descriptions">
                <p>&lt;--Edit images in your browser without them leaving your device</p>
                <p>&lt;--Intelligence Dampening Sphere</p>
                <p>&lt;--Very short movie and game reviews</p>
            </div>
        </div>
    </div>
  );
}