import "../styles/styles.css";
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
      <div className="main-content">
        <p>{/* ... */}</p>
      </div>
    </div>
  );
}