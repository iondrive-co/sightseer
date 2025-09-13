import Sidebar from "../components/Sidebar";
import '~/styles/tailwind.css';

export default function Meta() {
    return (
        <div className="main-container">
            <Sidebar />
            <div className="article-container">
                <h2 className="text-2xl font-semibold mb-4">Why?</h2>
                <p className="mb-4">I created this space in the original spirit of the world wide web, which was for me and many others
a hopeful and positive experience with a decentralized network of personal expression. Before LLMs were a thing, every
line of code, every design decision was a personal choice, and in a small way became a digital representation of the
creator. This collection of creative writing, opinions, projects, and links to the work of others, helps me recapture a
little of that magic. </p>

                        <h2 className="text-2xl font-semibold mb-4">Colophon</h2>
<p className="mb-4">This site lives on the edge — Cloudflare Pages - which is free and means faster response times
regardless of where you are in the world. It might surprise you to learn that this is a static site, in that it loads
everything from the server once. For example the entire exobase is just text, commited into github so I have a versioned
history of everything I write, which is automatically deployed via wrangler. I am not a web developer, but I have found
tailwind to be simple enough to use and create a layout which (mostly) adapts gracefully from phone to desktop. And I
do use LLMs for help with various technical issues, since after all I am only human.</p>
                    <footer className="border-t pt-8 mt-12">
                        <p className="text-sm text-gray-600">
                            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                    </footer>
            </div>
        </div>
    );
}