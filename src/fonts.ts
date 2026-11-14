import baskerville400 from "@fontsource/libre-baskerville/latin-400.css?inline";
import baskerville400Italic from "@fontsource/libre-baskerville/latin-400-italic.css?inline";
import baskerville700 from "@fontsource/libre-baskerville/latin-700.css?inline";
import baskerville700Italic from "@fontsource/libre-baskerville/latin-700-italic.css?inline";
import lora400 from "@fontsource/lora/latin-400.css?inline";
import lora400Italic from "@fontsource/lora/latin-400-italic.css?inline";
import lora600 from "@fontsource/lora/latin-600.css?inline";
import lora600Italic from "@fontsource/lora/latin-600-italic.css?inline";
import dm400 from "@fontsource/dm-sans/latin-400.css?inline";
import dm400Italic from "@fontsource/dm-sans/latin-400-italic.css?inline";
import dm600 from "@fontsource/dm-sans/latin-600.css?inline";
import dm600Italic from "@fontsource/dm-sans/latin-600-italic.css?inline";
import serif from "@fontsource/cormorant-garamond/latin-400.css?inline";
import italic from "@fontsource/cormorant-garamond/latin-400-italic.css?inline";
import bold from "@fontsource/cormorant-garamond/latin-600.css?inline";
import sans from "@fontsource/dm-sans/latin-400.css?inline";
import japanese from "@fontsource/noto-serif-jp/400.css?inline";
import arabic from "@fontsource/noto-naskh-arabic/400.css?inline";
export const fontCSS = [
  serif,
  italic,
  bold,
  sans,
  japanese,
  arabic,
  baskerville400,
  baskerville400Italic,
  baskerville700,
  baskerville700Italic,
  lora400,
  lora400Italic,
  lora600,
  lora600Italic,
  dm400,
  dm400Italic,
  dm600,
  dm600Italic,
].join("\n");
export const fontFamilies = {
  serif: "Cormorant Garamond",
  sans: "DM Sans",
  baskerville: "Libre Baskerville",
  lora: "Lora",
  japanese: "Noto Serif JP",
  arabic: "Noto Naskh Arabic",
};
export function supportsText(range: string, text: string) {
  if (!range) return true;
  return range.split(",").some((part) => {
    const [low, high] = part.trim().replace(/^U\+/i, "").split("-");
    const start = parseInt(low.replace(/\?/g, "0"), 16);
    const end = parseInt((high ?? low).replace(/\?/g, "F"), 16);
    return [...text].some(
      (c) => c.codePointAt(0)! >= start && c.codePointAt(0)! <= end,
    );
  });
}
const embedded = new Map<string, Promise<string>>();
export async function embedFonts(
  family: string,
  content: string,
): Promise<string> {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(fontCSS);
  const rules = [...sheet.cssRules]
    .filter((rule): rule is CSSFontFaceRule => rule instanceof CSSFontFaceRule)
    .filter(
      (rule) =>
        rule.style.fontFamily.replace(/["']/g, "") === family &&
        supportsText(rule.style.getPropertyValue("unicode-range"), content),
    );
  return (
    await Promise.all(
      rules.map(async (rule) => {
        // WOFF2 is sufficient for the modern browsers supported by the editor.
        // Keep one embedded representation rather than duplicating every font.
        const exportedRule = rule.cssText.replace(
          /src:\s*([^;]+);/,
          (_match, src: string) => `src: ${src.split(/,\s*url\(/)[0]};`,
        );
        let css = exportedRule;
        for (const match of css.matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
          const url = match[1];
          if (!embedded.has(url))
            embedded.set(
              url,
              (async () => {
                const response = await fetch(url);
                if (!response.ok)
                  throw new Error("No se pudo cargar la tipografía.");
                const blob = await response.blob();
                return new Promise<string>((resolve, reject) => {
                  const reader = new FileReader();
                  reader.onload = () => resolve(String(reader.result));
                  reader.onerror = reject;
                  reader.readAsDataURL(blob);
                });
              })(),
            );
          css = css.replace(match[0], `url("${await embedded.get(url)}")`);
        }
        return css;
      }),
    )
  ).join("\n");
}
