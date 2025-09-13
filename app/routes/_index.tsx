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
                    <p className="email">Contact: c@iondrive.co</p>
                    <div className="descriptions">
                        <p>&lt;--Intelligence Dampening Sphere</p>
                        <p>&lt;--Worldbuilding ideas</p>
                        <p>&lt;--How and why this site exists</p>
                        <p>&lt;--Cooking things</p>
                        <p>&lt;--Very short movie and game reviews</p>
                        <p>&lt;--Simple Hohmann transfer simulation using three.js</p>
                        <p>&lt;--Edit images in your browser without them leaving your device</p>
                    </div>
                </div>
            </div>
        </div>
    );
}