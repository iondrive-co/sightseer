import "../styles/styles.css";
import Sidebar from "../components/Sidebar";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Demo App" },
    { name: "description", content: "Welcome" },
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