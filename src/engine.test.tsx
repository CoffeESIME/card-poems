import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { Composition, readingInset, starPoints } from "./Composition";
import { changeTemplate, dimensions, freshDesign, templates } from "./model";
import { wrapPoem } from "./text";
import { supportsText } from "./fonts";

describe("ornamental library", () => {
  it("renders all nine designs in every format with resolved SVG references", () => {
    const distinct = new Set();
    for (const template of templates)
      for (const format of ["square", "story", "portrait"] as const) {
        const d = { ...freshDesign(template.id), format };
        const markup = renderToStaticMarkup(<Composition design={d} />);
        expect(markup).toContain(
          `viewBox="0 0 ${dimensions[format].join(" ")}"`,
        );
        expect(markup).not.toMatch(/NaN|Infinity|undefined/);
        const ids = [...markup.matchAll(/\sid="([^"]+)"/g)].map(
          (match) => match[1],
        );
        for (const ref of markup.matchAll(/url\(#([^\)]+)\)/g))
          expect(ids).toContain(ref[1]);
        if (format === "square")
          distinct.add(markup.replace(/f_R_[^"\s)]+/g, "ID"));
      }
    expect(distinct.size).toBe(9);
  });
  it("retains a usable reading area at maximum margins", () => {
    for (const t of templates) {
      const inset = readingInset({
        ...freshDesign(t.id),
        margin: 90,
        innerMargin: 100,
      });
      expect(1080 - inset * 2).toBeGreaterThan(400);
    }
  });
  it("keeps text and format when selecting another frame", () => {
    const original = {
      ...freshDesign(),
      poem: "Una hoja\n\n静かな庭\nدر باغ",
      title: "Jardín",
      format: "story" as const,
    };
    for (const t of templates) {
      const changed = changeTemplate(original, t);
      expect(changed.poem).toBe(original.poem);
      expect(changed.title).toBe(original.title);
      expect(changed.format).toBe("story");
    }
  });
  it("builds regular stars with the requested number of vertices", () => {
    for (const points of [8, 10, 12]) {
      const coords = starPoints(0, 0, 50, 20, points)
        .split(" ")
        .map((p) => p.split(",").map(Number));
      expect(coords.length).toBe(points * 2);
      coords.forEach(([x, y], i) =>
        expect(Math.hypot(x, y)).toBeCloseTo(i % 2 ? 20 : 50),
      );
    }
  });
});
describe("poem and font layout", () => {
  const measure = (text: string) => [...text].length * 10;
  it("preserves stanzas, accents, line breaks and empty lines", () => {
    expect(wrapPoem("Un jardín\r\n\r\nQué luz.\n", 500, measure)).toEqual([
      "Un jardín",
      "",
      "Qué luz.",
      "",
    ]);
  });
  it("wraps long words and Japanese without dropping Unicode characters", () => {
    for (const poem of [
      "quietudsinfin",
      "静かな庭にひとひらの葉が落ちる",
      "آراممی‌روید",
      "🌿🌸🌿🌸🌿",
    ]) {
      const lines = wrapPoem(poem, 40, measure);
      expect(lines.join("")).toBe(poem);
      expect(lines.every((l) => measure(l) <= 40)).toBe(true);
    }
  });
  it("selects only the font subsets that contain the exported text", () => {
    expect(supportsText("U+0000-00FF", "jardín")).toBe(true);
    expect(supportsText("U+3040-309F", "jardín")).toBe(false);
    expect(supportsText("U+30??", "カ")).toBe(true);
    expect(supportsText("U+0600-06FF, U+200C-200D", "باغ")).toBe(true);
  });
});
