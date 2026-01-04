import fs from "fs";
import path from "path";
import dayjs from "dayjs";
import { SOURCES } from "./sources.js";
import { fetchRSS } from "./fetch-rss.js";
import { generateMarkdown } from "./generate-md.js";

const today = dayjs().format("YYYY-MM-DD");

console.log(`Fetching news for ${today}...`);

const results = [];

for (const block of SOURCES) {
  const items = [];

  for (const src of block.sources) {
    console.log(`Fetching ${src.name}...`);
    const feed = await fetchRSS(src.url);
    if (!feed) continue;

    feed.items.slice(0, 3).forEach((i) => {
      items.push({
        title: i.title,
        link: i.link,
        source: src.name
      });
    });
  }

  results.push({
    category: block.category,
    items
  });
}

const md = generateMarkdown(today, results);
const dailyDir = path.join(process.cwd(), "daily");

// Ensure daily directory exists
if (!fs.existsSync(dailyDir)) {
  fs.mkdirSync(dailyDir, { recursive: true });
}

const out = path.join(dailyDir, `${today}.md`);
fs.writeFileSync(out, md, "utf-8");

console.log(`✓ Generated ${out}`);

