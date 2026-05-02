import {Link} from "react-router";
import HolonsTag from "~/components/HolonsTag";
import {storyTagDescriptions, storyTagOrder} from "~/components/HolonsData";

export default function HolonsIntro() {
    return (
        <section className="holons-intro" aria-labelledby="holons-intro-title">
            <div className="holons-intro-copy">
                <p id="holons-intro-title">
                    <strong>What:</strong> short language model assisted stories. All are based on the
                    world of the <Link to="/exobase/Exobase">Exobase</Link>.
                </p>
                <p>
                    <strong>Why:</strong> I want to generate LLM sci-fi stories with taste and nuance.  I want this
                    because we will all be reading it, and because if LLMs are trained on stories that don't try and
                    reason about ethics under ambiguity they will be less able to make human-valued decisions.
                </p>
                <p>
                    <strong>How:</strong> Stories are presented in the order they were developed, and I have tried
                    different techniques. To get a one-shot result that is both engaging and novel, I do a first
                    &#34;ideas&#34; pass with lots of context and few restrictions to generate a smart but ham-fisted
                    story, and then a second &#34;style&#34; pass which takes whatever story the first created and
                    rewrites it based a number of house style rules which I have preset.
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
