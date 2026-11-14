import { dimensions, type Design } from "./model";

function filenameWords(text: string) {
  const words = text
    .normalize("NFC")
    .replace(/[^\p{L}\p{N}\p{M}]+/gu, " ")
    .trim()
    .split(/\s+/u)
    .filter(Boolean);
  let result = "";
  for (const word of words.slice(0, 10)) {
    const next = result ? `${result}-${word}` : word;
    if ([...next].length > 64) {
      if (!result) result = [...word].slice(0, 64).join("");
      break;
    }
    result = next;
  }
  return result;
}

/** One identity per export, shared by the archive and all its plates. */
export function createExportNames(
  design: Design,
  format: "png" | "svg" | "jpeg",
) {
  const subject =
    [design.title, design.poem, design.name].map(filenameWords).find(Boolean) ||
    "composicion";
  const now = new Date();
  const pad = (n: number, length = 2) => String(n).padStart(length, "0");
  // Use the browser's local time, as in the user's download folder.
  const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const time = `${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}-${pad(now.getMilliseconds(), 3)}`;
  const unique = crypto.randomUUID().replaceAll("-", "").slice(0, 12);
  const [width, height] = dimensions[design.format];
  // A fixed prefix also makes Windows reserved words (CON, NUL, etc.) safe.
  const base = `folio-${subject}-${date}_${time}-${unique}-${width}x${height}`;
  const extension = format === "jpeg" ? "jpg" : format;
  return {
    image: (page: number, total: number) =>
      `${base}${total > 1 ? `-lamina-${pad(page + 1, Math.max(2, String(total).length))}` : ""}.${extension}`,
    archive: `${base}-${extension}-laminas.zip`,
  };
}
