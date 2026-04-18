import { useMemo } from "react";

function parseMarkdown(md: string): string {
  let html = md;

  // Code blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre><code class="language-${lang || ""}">${code.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim()}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Tables
  html = html.replace(/^\|(.+)\|\s*\n\|[-|\s]+\|\s*\n((?:\|.+\|\s*\n?)*)/gm, (_, headerRow, bodyRows) => {
    const headers = headerRow.split("|").map((h: string) => h.trim()).filter(Boolean);
    const rows = bodyRows.trim().split("\n").map((row: string) =>
      row.split("|").map((c: string) => c.trim()).filter(Boolean)
    );
    return `<table><thead><tr>${headers.map((h: string) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map((r: string[]) => `<tr>${r.map((c: string) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  });

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Bold and italic
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Lists
  html = html.replace(/^- (.+)$/gm, "<li>$1</li>");
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, "<ul>$1</ul>");

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, "<blockquote><p>$1</p></blockquote>");

  // Paragraphs (lines that don't start with HTML tags)
  html = html.replace(/^(?!<[a-z])((?!^\s*$).+)$/gm, (match) => {
    if (match.startsWith("<")) return match;
    return `<p>${match}</p>`;
  });

  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, "");

  return html;
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
    // Add IDs to headings for TOC linking
    processed = processed.replace(/<h([123])>(.+?)<\/h[123]>/g, (_, level, text) => {
      const id = text.replace(/<[^>]+>/g, "").toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
      return `<h${level} id="${id}">${text}</h${level}>`;
    });
    return processed;
  }, [content]);

  return <div className="prose-blog" dangerouslySetInnerHTML={{ __html: html }} />;
}
