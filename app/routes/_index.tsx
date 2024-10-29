import "~/styles/tailwind.css";
import Sidebar from "../components/Sidebar";
import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [
    { title: "Iondrive" },
  ];
};

export default function Index() {
    return (
        <div className="app">
            <Sidebar />
            <div className="index-content">
                <div>
                    <p className="email">c@iondrive.co</p>
                    <div className="descriptions">
                        <p>&lt;--Edit images in your browser without them leaving your device</p>
                        <p>&lt;--Intelligence Dampening Sphere</p>
                        <p>&lt;--Very short movie and game reviews</p>
                    </div>
                </div>
            </div>
        </div>
    );
}