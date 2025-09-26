import type { MetaFunction } from "@remix-run/cloudflare";
import Sidebar from "../components/Sidebar";
import '~/styles/tailwind.css';

export const meta: MetaFunction = () => {
    return [
        { title: "Meta" },
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
                    <p className="mb-4">I created this space in the original spirit of the world wide web, for me and many others a hopeful
                        experience with a decentralized network of personal expression. Before LLMs were a thing every design decision was a
                        personal choice, and this collection of creative writing, opinions, projects, and links to the work of others are some of mine.</p>
                    <h2 className="text-2xl font-semibold mb-4">Colophon</h2>
                    <p className="mb-4">This site lives on the edge — Cloudflare Pages - which is free as in beer for me, and means faster
                        response times for you, regardless of where you are in the world. This site gets a 93/100 rating on PageSpeed insights, with most
                        of the delay coming from useful cloudflare features like obfuscating my email address for automated scanners. </p>
                    <p className="mb-4">
                        It might surprise you to learn that this is a static site, in that it loads everything from the server once, as even the entire
                        exobase is just a few hundred KB of text. This is committed into github so I have a versioned history of everything I write, and
                        automatically deployed from there via wrangler. </p>
                    <p className="mb-4">
                        Although very convenient, I have mixed feelings about Cloudflare being the gatekeeper and tracker of usage for this site
                        and may well move to self hosting once it is a bit more stable. I am not a web developer, but I have found the Remix framework
                        easy to work with, and tailwind css to be simple enough to create layouts which (mostly) adapt gracefully from phone to
                        desktop. And I do use LLMs for help with various technical issues, since after all I am only human.</p>
                    <footer className="border-t pt-8 mt-12">
                        <p className="text-sm text-gray-600">
                            Miles, {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    );
}