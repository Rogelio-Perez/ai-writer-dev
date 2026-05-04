import { useMemo } from "react";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function parseInline(text: string) {
  let html = escapeHtml(text);
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  return html;
}

function isTableDivider(line: string) {
  const trimmed = line.trim();
  return /^\|?(?:\s*:?-{3,}:?\s*\|)+\s*:?-{3,}:?\s*\|?$/.test(trimmed);
}

function splitTableRow(row: string) {
  return row
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function renderTable(lines: string[], startIndex: number) {
  const headerCells = splitTableRow(lines[startIndex]);
  let currentIndex = startIndex + 2;
  const bodyRows: string[][] = [];

  while (currentIndex < lines.length && /^\|.*\|$/.test(lines[currentIndex].trim())) {
    bodyRows.push(splitTableRow(lines[currentIndex]));
    currentIndex += 1;
  }

  const head = `<thead><tr>${headerCells.map((cell) => `<th>${parseInline(cell)}</th>`).join("")}</tr></thead>`;
  const body = `<tbody>${bodyRows
    .map((row) => `<tr>${row.map((cell) => `<td>${parseInline(cell)}</td>`).join("")}</tr>`)
    .join("")}</tbody>`;

  return {
    html: `<table>${head}${body}</table>`,
    nextIndex: currentIndex,
  };
}

function parseMarkdown(md: string): string {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const blocks: string[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    const codeFence = trimmed.match(/^```(\w+)?$/);
    if (codeFence) {
      const lang = codeFence[1] || "";
      const codeLines: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }
      if (index < lines.length) index += 1;
      blocks.push(`<pre><code class="language-${lang}">${escapeHtml(codeLines.join("\n").trim())}</code></pre>`);
      continue;
    }

    if (/^\|.*\|$/.test(trimmed) && index + 1 < lines.length && isTableDivider(lines[index + 1])) {
      const table = renderTable(lines, index);
      blocks.push(table.html);
      index = table.nextIndex;
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      blocks.push(`<h${level}>${parseInline(heading[2].trim())}</h${level}>`);
      index += 1;
      continue;
    }

    if (trimmed.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith("> ")) {
        quoteLines.push(parseInline(lines[index].trim().slice(2)));
        index += 1;
      }
      blocks.push(`<blockquote>${quoteLines.map((quoteLine) => `<p>${quoteLine}</p>`).join("")}</blockquote>`);
      continue;
    }

    if (/^- /.test(trimmed)) {
      const listItems: string[] = [];
      while (index < lines.length && /^- /.test(lines[index].trim())) {
        listItems.push(`<li>${parseInline(lines[index].trim().slice(2))}</li>`);
        index += 1;
      }
      blocks.push(`<ul>${listItems.join("")}</ul>`);
      continue;
    }

    const paragraphLines: string[] = [];
    while (index < lines.length) {
      const paragraphLine = lines[index];
      const paragraphTrimmed = paragraphLine.trim();

      if (!paragraphTrimmed) break;
      if (paragraphTrimmed.startsWith("```")) break;
      if (/^(#{1,3})\s+/.test(paragraphLine)) break;
      if (paragraphTrimmed.startsWith("> ")) break;
      if (/^- /.test(paragraphTrimmed)) break;
      if (/^\|.*\|$/.test(paragraphTrimmed) && index + 1 < lines.length && isTableDivider(lines[index + 1])) break;

      paragraphLines.push(paragraphTrimmed);
      index += 1;
    }

    blocks.push(`<p>${parseInline(paragraphLines.join(" "))}</p>`);
  }

  return blocks.join("\n");
}

export function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = [];
  const regex = /^(#{1,3}) (.+)$/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const text = match[2];
    const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
    headings.push({ id, text, level: match[1].length });
  }
  return headings;
}

export default function MarkdownRenderer({ content }: { content: string }) {
  const html = useMemo(() => {
    let processed = parseMarkdown(content);
    processed = processed.replace(/<h([123])>(.+?)<\/h[123]>/g, (_, level, text) => {
      const id = text.replace(/<[^>]+>/g, "").toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
      return `<h${level} id="${id}">${text}</h${level}>`;
    });
    return processed;
  }, [content]);

  return <div className="prose-blog" dangerouslySetInnerHTML={{ __html: html }} />;
}
