import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const chunkDir = join(root, "lilah-chunks");
const outDir = join(root, "..", "public", "art");
mkdirSync(outDir, { recursive: true });

const names = [
  "lilah-banner",
  "lilah-01",
  "lilah-02",
  "lilah-03",
  "lilah-04",
  "lilah-05",
];

for (const name of names) {
  const parts = readdirSync(chunkDir)
    .filter((f) => f.startsWith(`${name}-`) && f.endsWith(".txt"))
    .sort();
  if (!parts.length) continue;
  const svg = parts.map((f) => readFileSync(join(chunkDir, f), "utf8")).join("");
  writeFileSync(join(outDir, `${name}.svg`), svg);
  console.log("assembled", name, svg.length, "from", parts.length, "chunks");
}
