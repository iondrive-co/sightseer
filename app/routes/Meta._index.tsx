import type { MetaFunction } from "@remix-run/cloudflare";
import Sidebar from "../components/Sidebar";
import '~/styles/tailwind.css';

export const meta: MetaFunction = () => {
    return [
        { title: "Meta | Colophon" },
        { name: "description", content: "About this site" },
    ];
};

export default function Meta() {
    return (
        <div className="app">
            <Sidebar />
            <div className="main-container">
                <div className="max-w-4xl mx-auto px-8 py-12">
                    <h2 className="text-2xl font-semibold mb-4">About</h2>
                    <p className="mb-4">I created this space in the original spirit of the world wide web, which was for me and many others
                        a hopeful and positive experience with a decentralized network of personal expression. Before LLMs were a thing every
                        design decision was a personal choice, and this collection of creative writing, opinions, projects, and links to the
                        work of others are some of mine.</p>

                    <h2 className="text-2xl font-semibold mb-4">Colophon</h2>
                    <p className="mb-4">This site lives on the edge — Cloudflare Pages - which is free as in beer for me, and means faster
                        response times for you regardless of where you are in the world. It might surprise you to learn that this is a static
                        site, in that it loads everything from the server once. For example the entire exobase is just a few hundred KB of text,
                        commited into github so I have a versioned history of everything I write. This is automatically deployed via wrangler,
                        which is very convenient, although I have mixed feelings about Cloudflare being the gatekeeper and tracker of usage for
                        this site and may well move to self hosting once it is a bit more stable. I am not a web developer, but I have found the
                        tailwind css framework to be simple enough to use and create a layout which (mostly) adapts gracefully from phone to
                        desktop. And I do use LLMs for help with various technical issues, since after all I am only human.</p>

                    <footer className="border-t pt-8 mt-12">
                        <p className="text-sm text-gray-600">
                            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    );
}