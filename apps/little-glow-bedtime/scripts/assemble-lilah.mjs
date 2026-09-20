import { existsSync, readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const chunkDir = join(root, "lilah-chunks");
const outDir = join(root, "..", "public", "art");
mkdirSync(outDir, { recursive: true });
if (!existsSync(chunkDir)) {
  console.log("no lilah-chunks dir, skip assemble");
  process.exit(0);
}

const names = [
  "lilah-banner",
  "lilah-01",
  "lilah-02",
  "lilah-03",
  "lilah-04",
  "lilah-05",
];

for (const name of names) {
  const single = join(chunkDir, `${name}.b64`);
  let b64 = "";
  if (existsSync(single)) {
    b64 = readFileSync(single, "utf8").trim();
  } else {
    const parts = readdirSync(chunkDir)
      .filter((f) => f.startsWith(`${name}-`) && f.endsWith(".txt"))
      .sort();
    if (!parts.length) continue;
    b64 = parts.map((f) => readFileSync(join(chunkDir, f), "utf8").trim()).join("");
  }
  const buf = Buffer.from(b64, "base64");
  writeFileSync(join(outDir, `${name}.jpg`), buf);
  console.log("assembled", name + ".jpg", buf.length);
}
