import { useEffect, useState } from "react";

type RingLink = { label: string; href: string };
type Ring = { id: string; name: string; home: string; links: RingLink[] };
type WebringProps = { compact?: boolean };

type WaywardPortal = {
  hub: { name: string; url: string };
  prev: { name: string; url: string };
  next: { name: string; url: string };
};

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

function normalizeHost(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function useWaywardWebring() {
  const [portal, setPortal] = useState<WaywardPortal | null>(null);

  useEffect(() => {
    fetch("https://waywardweb.org/ring.json")
      .then((r) => r.json() as Promise<{ name: string; url: string; members: { name: string; url: string }[] }>)
      .then((data) => {
        const here = normalizeHost(window.location.href);
        const idx = data.members.findIndex(
          (m) => normalizeHost(m.url) === here
        );
        const len = data.members.length;
        const prev = data.members[idx === -1 ? len - 1 : (idx - 1 + len) % len];
        const next = data.members[idx === -1 ? 0 : (idx + 1) % len];
        setPortal({ hub: { name: data.name, url: data.url }, prev, next });
      })
      .catch((err) => console.error("Failed to fetch Wayward Webring:", err));
  }, []);

  return portal;
}

export default function Webring({ compact = false }: WebringProps) {
  const wayward = useWaywardWebring();

  return (
    <div
      className={`webring${compact ? " webring-compact" : ""}`}
      role="navigation"
      aria-label="Webring navigation"
    >
      <div className="webring-shell">
        {wayward && (
          <div className="webring-box">
            <div className="webring-text">
              {compact ? (
                <>
                  <a className="webring-link" href={wayward.hub.url}>
                    {wayward.hub.name}
                  </a>
                  :
                </>
              ) : (
                <>
                  This site is part of the{" "}
                  <a className="webring-link" href={wayward.hub.url}>
                    {wayward.hub.name}
                  </a>
                  :
                </>
              )}
            </div>
            <div className="webring-links">
              <a className="webring-link" href={wayward.prev.url}>
                [← {wayward.prev.name}]
              </a>
              <a className="webring-link" href={wayward.next.url}>
                [{wayward.next.name} →]
              </a>
            </div>
          </div>
        )}

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
