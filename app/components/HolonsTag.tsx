import type {StoryTag} from "~/components/HolonsData";

type HolonsTagProps = {
    tag: StoryTag;
};

export default function HolonsTag({tag}: HolonsTagProps) {
    return <span className={`holons-tag holons-tag--${tag}`}>{tag}</span>;
}
