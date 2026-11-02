export type Measure = (text: string) => number;
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
