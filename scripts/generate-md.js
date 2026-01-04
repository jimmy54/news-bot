export function generateMarkdown(date, data) {
  let md = `# 🧠 科研 & 技术热点日报\n\n日期：${date}\n\n`;

  for (const block of data) {
    if (block.items.length === 0) continue;
    
    md += `## 🔥 ${block.category}\n\n`;
    for (const item of block.items.slice(0, 5)) {
      md += `- **${item.title}**  \n`;
      md += `  来源：${item.source}  \n`;
      md += `  链接：${item.link}\n\n`;
    }
  }

  md += "---\n_自动生成 · GitHub Actions_\n";
  return md;
}

