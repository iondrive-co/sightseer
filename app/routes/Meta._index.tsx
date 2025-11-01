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
                    <p className="mb-4">The world wide web of the late 90s and early 00s was fun because there was less
                        structure. SEO, recommendation systems, and LLMs are designed to give you the minimal viable
                        content, but sometimes its good to have a bit of roughage. This collection of creative
                        writing, opinions, projects, and links to the work of others are my contribution to that.
                    </p>
                    <p className="mb-4">The Exobase especially is a place for me to scout ahead with some `lol what
                        happens if` ideas about the future and see if they work. Someone who never writes will struggle
                        to have fully formed ideas about anything nontrivial. I have noticed a tendency in a lot of
                        the sci-fi I read and watch where the medium term future gets hand-waved away as a dystopia or
                        simplified to some Unified Earth, when the reality is likely to be a lot more interesting.
                    </p>
                    <h2 className="text-2xl font-semibold mb-4">Colophon</h2>
                    <p className="mb-4">This site lives on the edge — Cloudflare Pages - which is free as in beer for
                        me, and means faster response times for you regardless of where you are in the world. This site
                        gets a 93/100 rating on PageSpeed insights, with most of the delay coming from useful cloudflare
                        features like obfuscating my email address for automated scanners.
                    </p>
                    <p className="mb-4">
                        This is actually a static site, in that it loads everything from the server once, as even the
                        entire Exobase is just a few hundred KB of text. This is committed into github so I have a
                        versioned history of everything I write, and automatically deployed from there via wrangler.
                    </p>
                    <p className="mb-4">
                        Although very convenient, I have mixed feelings about Cloudflare being the gatekeeper and
                        tracker of usage for this site and may well move to self hosting once it is a bit more stable.
                        I am not a web developer, but I have found the Remix framework easy to work with, and tailwind
                        css to be simple enough to create layouts which (mostly) adapt gracefully from phone to desktop.
                        And I do use LLMs for help with various technical issues, since after all I am only human.
                    </p>
                    <footer className="border-t pt-8 mt-12">
                        <p className="text-sm text-gray-600">
                            Miles, {new Date().toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    );
}