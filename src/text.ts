export type Measure = (text: string) => number;
// Keep wrapped lines intact, including empty lines and deliberate verse breaks.
// Prefer a stanza or sentence boundary in the latter half of a page.
export function paginateLines(lines: string[], capacity: number): string[][] {
  const limit = Math.max(1, Math.floor(capacity));
  const pages: string[][] = [];
  for (let start = 0; start < lines.length; ) {
    let end = Math.min(start + limit, lines.length);
    if (end < lines.length) {
      for (let i = end; i > start + limit / 2; i--) {
        if (
          !lines[i - 1].trim() ||
          /[.!?…。！？][»”’"']?$/.test(lines[i - 1])
        ) {
          end = i;
          break;
        }
      }
    }
    pages.push(lines.slice(start, end));
    start = end;
  }
  return pages.length ? pages : [[""]];
}
export function wrapPoem(
  poem: string,
  maxWidth: number,
  measure: Measure,
): string[] {
  return poem
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .flatMap((line) => {
      if (!line) return [""];
      const chunks = line.match(/\S+\s*|\s+/gu) ?? [line];
      const result: string[] = [];
      let current = "";
      for (const chunk of chunks) {
        if (measure(current + chunk.trimEnd()) <= maxWidth) {
          current += chunk;
          continue;
        }
        if (current.trimEnd()) {
          result.push(current.trimEnd());
          current = "";
        }
        for (const char of chunk) {
          if (current && measure(current + char) > maxWidth) {
            result.push(current.trimEnd());
            current = "";
          }
          current += char;
        }
      }
      if (current.trimEnd()) result.push(current.trimEnd());
      return result.length ? result : [""];
    });
}
