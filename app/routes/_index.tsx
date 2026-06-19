import "~/styles/tailwind.css";
import Sidebar from "../components/Sidebar";
import type { MetaFunction } from "react-router";
import { seo, SITE_URL, SITE_NAME } from "~/utils/seo";

export const meta: MetaFunction = () =>
    seo({
        path: "/",
        jsonLd: [
            {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: SITE_NAME,
                url: SITE_URL,
                description:
                    "Creative writing, opinions, projects, and links — a personal site by Miles.",
            },
            {
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Miles",
                url: SITE_URL,
                email: "c@iondrive.co",
            },
        ],
    });

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
                    <div className="portfolio-divider" role="separator" />
                    <h2 className="portfolio-title">Game Portfolio</h2>
                    <p className="portfolio-subtext">Each of these opens in a new browser window</p>
                    <dl className="descriptions">
                        <div className="description-pair"><dt className="sr-only">Paradise</dt><dd>&lt;--Work in progress: European arrival in the Americas</dd></div>
                    </dl>
                </div>
            </main>
        </div>
    );
}
