import {useEffect} from "react";
import type {LoaderFunction} from "react-router";
import {useLoaderData, useLocation} from "react-router";
import type {Story} from "~/components/HolonsData";
import {stories} from "~/components/HolonsData";
import HolonsIntro from "~/components/HolonsIntro";
import HolonsTag from "~/components/HolonsTag";
import Sidebar from "~/components/Sidebar";
import '~/styles/tailwind.css';
import '~/styles/holons.css';

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
                                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <ellipse cx="12" cy="13" rx="7" ry="5" />
                                                <path d="M12 8.5c-.4-1.4.4-2.7 1.6-3 1.2-.3 2.4.5 2.4 1.7 0 1-.9 1.8-2 1.8-.8 0-1.6-.2-2-.5z" />
                                                <circle cx="15.2" cy="6.8" r=".5" fill="#fff" />
                                                <rect x="4" y="14" width="2" height="3" rx="1" />
                                                <rect x="18" y="14" width="2" height="3" rx="1" />
                                                <rect x="7" y="16.5" width="2" height="2.5" rx="1" />
                                                <rect x="15" y="16.5" width="2" height="2.5" rx="1" />
                                                <path d="M5 12c.6-2.2 2.2-4 4-4.5M19 12c-.6-2.2-2.2-4-4-4.5" stroke="currentColor" strokeWidth=".6" fill="none" opacity=".4" />
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
