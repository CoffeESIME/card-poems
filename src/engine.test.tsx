import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { Composition, readingInset, starPoints } from "./Composition";
import {
  changeTemplate,
  dimensions,
  freshDesign,
  templates,
  traditions,
} from "./model";
import { layoutText } from "./layout";
import { hydrateDesign } from "./storage";
import { zipImages } from "./zip";
import { paginateLines, wrapPoem } from "./text";
import { supportsText } from "./fonts";

describe("ornamental library", () => {
  it("renders all 27 designs in every format with resolved SVG references", () => {
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
    expect(distinct.size).toBe(27);
  });
  it("exposes nine complete collections with stable unique template IDs", () => {
    expect(new Set(templates.map((t) => t.id)).size).toBe(27);
    expect(traditions).toHaveLength(9);
    for (const tradition of traditions)
      expect(
        templates.filter((t) => t.tradition === tradition.id),
      ).toHaveLength(3);
  });
  it("keeps new ornaments valid at both extremes of their customization controls", () => {
    for (const t of templates)
      for (const decoration of ["all", "top", "bottom"] as const)
        for (const factor of [0.5, 2]) {
          const design = {
            ...freshDesign(t.id),
            format: "story" as const,
            density: factor,
            patternScale: factor,
            decoration,
            margin: factor === 0.5 ? 16 : 90,
            innerMargin: 100,
          };
          const markup = renderToStaticMarkup(<Composition design={design} />);
          expect(markup).not.toMatch(/NaN|Infinity|undefined/);
          expect(markup).toContain('viewBox="0 0 1080 1920"');
        }
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

describe("multi-plate text", () => {
  it("preserves every wrapped line and stanza across boundaries", () => {
    const lines = [
      "Une pensée.",
      "",
      "Un chemin",
      "sans fin",
      "",
      "Dernière ligne.",
    ];
    const pages = paginateLines(lines, 3);
    expect(pages.flat()).toEqual(lines);
    expect(pages.every((page) => page.length <= 3)).toBe(true);
    expect(paginateLines([], 3)).toEqual([[""]]);
  });
  it("keeps a short maxim on one plate and splits tall poems without shrinking", () => {
    const d = { ...freshDesign("salon"), poem: "Une pensée.", author: "" };
    expect(layoutText(d).pages).toHaveLength(1);
    const long = {
      ...d,
      poem: Array.from({ length: 40 }, (_, i) => `Vers ${i}`).join("\n"),
    };
    const layout = layoutText(long);
    expect(layout.pages.length).toBeGreaterThan(1);
    expect(layout.size).toBe(d.fontSize);
    expect(layout.pages.flat().join("\n")).toBe(long.poem);
    expect(layoutText({ ...long, pagination: "single" }).pages).toHaveLength(1);
  });
  it("renders every page without overflow in all templates and formats", () => {
    for (const t of templates)
      for (const format of ["square", "story", "portrait"] as const) {
        const d = {
          ...freshDesign(t.id),
          format,
          title: "Réflexions",
          poem: "Un camino, una hoja, una pausa. ".repeat(45),
        };
        const layout = layoutText(d);
        expect(layout.pages.length).toBeGreaterThan(1);
        for (let page = 0; page < layout.pages.length; page++) {
          const html = renderToStaticMarkup(
            <Composition design={d} page={page} />,
          );
          expect(html).toContain('data-overflow="false"');
          expect(html).toContain(`${page + 1} / ${layout.pages.length}`);
        }
      }
  });
  it("hydrates older drafts with automatic pagination", () => {
    const { pagination, ...old } = freshDesign();
    expect(hydrateDesign(old).pagination).toBe("auto");
  });
  it("packages named images with valid offsets and standard CRC-32", async () => {
    const zip = await zipImages([
      { name: "lámina-01.svg", blob: new Blob(["123456789"]) },
      { name: "lámina-02.png", blob: new Blob([new Uint8Array([1, 2, 3])]) },
    ]);
    const bytes = new Uint8Array(await zip.arrayBuffer()),
      view = new DataView(bytes.buffer);
    expect(view.getUint32(0, true)).toBe(0x04034b50);
    expect(view.getUint32(14, true)).toBe(0xcbf43926);
    const end = bytes.length - 22;
    expect(view.getUint32(end, true)).toBe(0x06054b50);
    expect(view.getUint16(end + 10, true)).toBe(2);
    const central = view.getUint32(end + 16, true);
    expect(view.getUint32(central, true)).toBe(0x02014b50);
    const nameLength = view.getUint16(26, true);
    expect(new TextDecoder().decode(bytes.slice(30, 30 + nameLength))).toBe(
      "lámina-01.svg",
    );
    const second = central + 46 + nameLength;
    const secondOffset = view.getUint32(second + 42, true);
    expect(view.getUint32(secondOffset, true)).toBe(0x04034b50);
    expect(view.getUint32(end + 12, true)).toBe(end - central);
  });
});
