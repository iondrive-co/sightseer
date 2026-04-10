import {Link} from "react-router";
import HolonsTag from "~/components/HolonsTag";
import {storyTagDescriptions, storyTagOrder} from "~/components/HolonsData";

export default function HolonsIntro() {
    return (
        <section className="holons-intro" aria-labelledby="holons-intro-title">
            <div className="holons-intro-copy">
                <p id="holons-intro-title">
                    <strong>What:</strong> short language model assisted stories. All are based on the
                    world of the <Link to="/Exobase">Exobase</Link>.
                </p>
                <p>
                    <strong>Why:</strong> I want to show that there is no reason for LLM text to lack taste and nuance.
                    I believe getting this right is important because this will be the majority of the text that
                    both humans and LLMs consume in the future, and if LLMs are trained on sci-fi stories that lack the
                    complexity and struggles of the real world they will be less able to make human-valued decisions
                    about the future they are helping to build.
                </p>
                <p>
                    <strong>LLM tags</strong> level/type of language model involvement:
                </p>
            </div>

            <ul className="holons-legend-list">
                {storyTagOrder.map((tag) => (
                    <li key={tag} className="holons-legend-item">
                        <HolonsTag tag={tag} />
                        <span>{storyTagDescriptions[tag]}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}
