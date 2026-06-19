import {useEffect} from "react";
import type {LoaderFunction, MetaFunction} from "react-router";
import {useLoaderData, useLocation} from "react-router";
import type {Story} from "~/components/HolonsData";
import {stories} from "~/components/HolonsData";
import HolonsIntro from "~/components/HolonsIntro";
import HolonsTag from "~/components/HolonsTag";
import Sidebar from "~/components/Sidebar";
import {seo} from "~/utils/seo";
import '~/styles/tailwind.css';
import '~/styles/holons.css';

export const meta: MetaFunction = () => seo({
    title: "Holons",
    description: "Short stories set in the medium-term future",
    path: "/Holons",
});

export const loader: LoaderFunction = async () => {
    return stories;
};

export default function Holons() {
    const stories: Story[] = useLoaderData();
    const location = useLocation();

    useEffect(() => {
        const storyId = decodeURIComponent(location.hash.replace(/^#/, ""));

        if (!storyId) {
            return;
        }

        const element = document.getElementById(storyId);

        if (!(element instanceof HTMLDetailsElement)) {
            return;
        }

        element.open = true;
        requestAnimationFrame(() => {
            element.scrollIntoView({block: "start"});
        });
    }, [location.hash]);

    return (
        <div className="app">
            <Sidebar />
            <main id="main-content" className="main-container">
                <h1 className="sr-only">Holons</h1>
                <HolonsIntro />
                <div className="holons-list">
                    {stories.map((story, index) => (
                        <details
                            key={story.id}
                            id={story.id}
                            className={`holons-story${index === stories.length - 1 ? " holons-story--last" : ""}`}
                        >
                            <summary>
                                <span className="holons-summary-main">
                                    <span className="holons-name">{story.name}</span>
                                    <span className="holons-tags" aria-label={`LLM contributions: ${story.tags.join(", ")}`}>
                                        {story.tags.map(tag => (
                                            <HolonsTag key={tag} tag={tag} />
                                        ))}
                                    </span>
                                </span>
                                <a
                                    href={`#${story.id}`}
                                    className="holons-permalink"
                                    aria-label={`Permalink to ${story.name}`}
                                    title="Permalink"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        const details = event.currentTarget.closest("details");

                                        if (details instanceof HTMLDetailsElement) {
                                            details.open = true;
                                        }
                                    }}
                                >
                                    #
                                </a>
                            </summary>
                            <div className="holons-content">
                                {story.content.split(/\n\s*\n/).filter(s => s.trim()).map((paragraph, i) => (
                                    paragraph.trim() === '---' ? (
                                        <div key={i} className="holons-separator" aria-hidden="true">
                                            <svg viewBox="0 0 64 40" width="36" height="22" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <ellipse cx="10" cy="22" rx="6" ry="5" stroke="none" />
                                                <circle cx="7" cy="20.5" r="1" fill="#fff" stroke="none" />
                                                <ellipse cx="36" cy="22" rx="18" ry="11" stroke="none" />
                                                <rect x="22" y="30" width="6" height="6" rx="2" stroke="none" />
                                                <rect x="44" y="30" width="6" height="6" rx="2" stroke="none" />
                                                <rect x="22" y="9" width="6" height="5" rx="2" stroke="none" />
                                                <rect x="44" y="9" width="6" height="5" rx="2" stroke="none" />
                                                <path d="M36 13 L31 18 L36 22 L41 18 Z M24 22 L28 26 L32 22 M48 22 L44 26 L40 22 M36 22 L36 31" stroke="currentColor" strokeWidth="1.2" fill="none" opacity=".55" />
                                            </svg>
                                        </div>
                                    ) : (
                                        <p key={i}>{paragraph.split('\n').map((line, j) => (
                                            <span key={j}>
                                                {j > 0 && /^["'“‘]/.test(line.trimStart()) ? <br /> : j > 0 ? ' ' : null}
                                                {line.trim()}
                                            </span>
                                        ))}</p>
                                    )
                                ))}
                            </div>
                        </details>
                    ))}
                </div>
            </main>
        </div>
    );
}
