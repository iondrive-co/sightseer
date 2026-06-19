// Generates public/og-image.png (1200×630) — the default social-share card.
// Run via `npm run gen-og`. Tweak the SVG below to restyle.
import sharp from "sharp";

const W = 1200;
const H = 630;

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="#0d1117"/>
  <rect x="0" y="0" width="${W}" height="12" fill="#388bfd"/>
  <rect x="0" y="${H - 12}" width="${W}" height="12" fill="#388bfd"/>
  <text x="90" y="285" font-family="monospace" font-size="128" font-weight="bold" fill="#e6edf3">iondrive</text>
  <text x="94" y="365" font-family="monospace" font-size="40" fill="#8b949e">creative writing / worldbuilding / projects</text>
  <text x="90" y="545" font-family="monospace" font-size="32" fill="#388bfd">&gt; iondrive.co</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile("public/og-image.png");
console.log("wrote public/og-image.png");
