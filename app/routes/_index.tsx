import "~/styles/tailwind.css";
import Sidebar from "../components/Sidebar";
import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Iondrive" },
  ];
};

export default function Index() {
    return (
        <div className="app">
            <Sidebar />
            <main id="main-content" className="index-content">
                <div>
                    <h1 className="sr-only">Iondrive</h1>
                    <p className="email">Contact: <a href="mailto:c@iondrive.co">c@iondrive.co</a></p>
                    <dl className="descriptions">
                        <div className="description-pair"><dt className="sr-only">Chad</dt><dd>&lt;--Mobile coding agent</dd></div>
                        <div className="description-pair"><dt className="sr-only">Exobase</dt><dd>&lt;--Intelligence Dampening Sphere</dd></div>
                        <div className="description-pair"><dt className="sr-only">Links</dt><dd>&lt;--Worldbuilding ideas</dd></div>
                        <div className="description-pair"><dt className="sr-only">Holons</dt><dd>&lt;--Stories from the exobase</dd></div>
                        <div className="description-pair"><dt className="sr-only">Meta</dt><dd>&lt;--How and why this site exists</dd></div>
                        <div className="description-pair"><dt className="sr-only">Recipes</dt><dd>&lt;--Cooking things for mixed meat+vegan family</dd></div>
                        <div className="description-pair"><dt className="sr-only">Reviews</dt><dd>&lt;--Very short movie and game reviews</dd></div>
                        <div className="description-pair"><dt className="sr-only">Solar</dt><dd>&lt;--Hohmann sim using three.js</dd></div>
                        <div className="description-pair"><dt className="sr-only">Winnow</dt><dd>&lt;--Web version of <a href="https://github.com/iondrive-co/winnow" style={{ color: "blue" }}>winnow</a> for in-browser image editing</dd></div>
                    </dl>
                </div>
            </main>
        </div>
    );
}
