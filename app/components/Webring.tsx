import { useState } from "react";

type RingLink = { label: string; href: string };
type Ring = { id: string; name: string; home: string; links: RingLink[] };
type WebringProps = { compact?: boolean };

// Add additional webrings here; arrows will let you cycle between them.
const rings: Ring[] = [
  {
    id: "meta-ring",
    name: "Meta Ring",
    home: "https://meta-ring.hedy.dev/",
    links: [
      { label: "← Previous", href: "https://meta-ring.hedy.dev/previous" },
      { label: "Random", href: "https://meta-ring.hedy.dev/random" },
      { label: "Next →", href: "https://meta-ring.hedy.dev/next" },
    ],
  },
];

export default function Webring({ compact = false }: WebringProps) {
  const [ringIndex, setRingIndex] = useState(0);
  const current = rings[ringIndex];
  const hasMultiple = rings.length > 1;

  const goPrev = () => {
    if (!hasMultiple) return;
    setRingIndex((prev) => (prev - 1 + rings.length) % rings.length);
  };

  const goNext = () => {
    if (!hasMultiple) return;
    setRingIndex((prev) => (prev + 1) % rings.length);
  };

  return (
    <div
      className={`webring${compact ? " webring-compact" : ""}`}
      role="navigation"
      aria-label={`${current.name} navigation`}
    >
      <div className="webring-shell">
        <button
          type="button"
          className="webring-arrow"
          onClick={goPrev}
          aria-label="Previous webring"
          aria-disabled={!hasMultiple}
          disabled={!hasMultiple}
        >
          &lt;
        </button>

        <div className="webring-box">
          <div className="webring-text">
            {compact ? (
              <>
                <a className="webring-link" href={current.home}>
                  {current.name}
                </a>
                :
              </>
            ) : (
              <>
                This site is part of the{" "}
                <a className="webring-link" href={current.home}>
                  {current.name}
                </a>
                :
              </>
            )}
          </div>
          <div className="webring-links">
            {current.links.map((link) => (
              <a className="webring-link" href={link.href} key={link.href}>
                [{link.label}]
              </a>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="webring-arrow"
          onClick={goNext}
          aria-label="Next webring"
          aria-disabled={!hasMultiple}
          disabled={!hasMultiple}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
