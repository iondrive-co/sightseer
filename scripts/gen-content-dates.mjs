// Derives a "first added" date per content item from git history and writes
// app/data/content-dates.json. Run locally (full git history) via `npm run
// gen-dates` whenever content is added; the output is committed so builds stay
// deterministic and don't depend on Cloudflare's shallow clone.
//
// Keys come from importing the real data modules (authoritative), so this stays
// correct regardless of source formatting. Requires Node's TS type-stripping
// (Node >= 22.6 with --experimental-strip-types, on by default in >= 23.6).
import { execFileSync } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";

const SOURCES = [
  {
    kind: "exobase",
    file: "app/components/exobase/ExobaseData.ts",
    load: async () => [...(await import("../app/components/exobase/ExobaseData.ts")).pageData.keys()],
    quote: "'",
  },
  {
    kind: "recipes",
    file: "app/components/RecipesData.ts",
    load: async () => (await import("../app/components/RecipesData.ts")).recipes.map((r) => r.id),
    quote: "'",
  },
  {
    kind: "holons",
    file: "app/components/HolonsData.ts",
    load: async () => (await import("../app/components/HolonsData.ts")).stories.map((s) => s.id),
    quote: '"',
  },
];

// Oldest commit whose diff changed the count of `needle` ≈ when the item was added.
function addedDate(file, needle) {
  try {
    const out = execFileSync(
      "git",
      ["log", "--reverse", "--format=%cI", `-S${needle}`, "--", file],
      { encoding: "utf8" }
    );
    const first = out.split("\n").find(Boolean);
    return first ? first.slice(0, 10) : null;
  } catch {
    return null;
  }
}

const result = {};
for (const src of SOURCES) {
  const keys = [...new Set(await src.load())].filter(Boolean);
  result[src.kind] = {};
  for (const key of keys) {
    const date = addedDate(src.file, `${src.quote}${key}${src.quote}`);
    if (date) result[src.kind][key] = date;
  }
  console.log(`${src.kind}: ${Object.keys(result[src.kind]).length}/${keys.length} dated`);
}

mkdirSync("app/data", { recursive: true });
writeFileSync("app/data/content-dates.json", JSON.stringify(result, null, 2) + "\n");
console.log("wrote app/data/content-dates.json");
