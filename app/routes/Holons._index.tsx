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
                    {stories.map(story => (
                        <details key={story.id} id={story.id} className="holons-story">
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
                                    <p key={i}>{paragraph.split('\n').map((line, j) => (
                                        <span key={j}>
                                            {j > 0 && /^["'“‘]/.test(line.trimStart()) ? <br /> : j > 0 ? ' ' : null}
                                            {line.trim()}
                                        </span>
                                    ))}</p>
                                ))}
                            </div>
                        </details>
                    ))}
                </div>
            </main>
        </div>
    );
}
