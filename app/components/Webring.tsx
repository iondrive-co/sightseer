type RingLink = { label: string; href: string };
type Ring = { id: string; name: string; home: string; links: RingLink[] };
type WebringProps = { compact?: boolean };

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

  return (
    <div
      className={`webring${compact ? " webring-compact" : ""}`}
      role="navigation"
      aria-label="Webring navigation"
    >
      <div className="webring-shell">
        {rings.map((ring) => (
          <div className="webring-box" key={ring.id}>
            <div className="webring-text">
              {compact ? (
                <>
                  <a className="webring-link" href={ring.home}>
                    {ring.name}
                  </a>
                  :
                </>
              ) : (
                <>
                  This site is part of the{" "}
                  <a className="webring-link" href={ring.home}>
                    {ring.name}
                  </a>
                  :
                </>
              )}
            </div>
            <div className="webring-links">
              {ring.links.map((link) => (
                <a className="webring-link" href={link.href} key={link.href}>
                  [{link.label}]
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
