import Parser from "rss-parser";

const parser = new Parser({
  timeout: 10000,
  headers: {
    "User-Agent": "news-bot/1.0"
  }
});

export async function fetchRSS(url) {
  try {
    return await parser.parseURL(url);
  } catch (e) {
    console.error(`RSS fetch failed: ${url}`, e.message);
    return null;
  }
}

