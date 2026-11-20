import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  analyzePixels,
  backgroundRange,
  suggestPhotoStyle,
  textOutline,
} from "./photo";
import { Composition } from "./Composition";
import { freshDesign } from "./model";
import { hydrateDesign } from "./storage";

describe("photo backgrounds", () => {
  it("selects the most frequent color group, weighting visible pixels", () => {
    const tones = analyzePixels(
      Uint8ClampedArray.from([
        200, 50, 30, 255, 202, 52, 28, 255, 0, 0, 0, 0, 15, 20, 50, 255,
      ]),
    );
    expect(tones.dominant).toBe("#c9331d");
    expect(() => analyzePixels(new Uint8ClampedArray(4))).toThrow(
      "transparente",
    );
  });
  it.each(["#e9e2bd", "#172e38", "#ff0000", "#00ff00"])(
    "suggests readable inks over a mixed image with dominant color %s",
    (dominant) => {
      const tones = { dominant, low: "#000000", high: "#ffffff" };
      const { colors, opacity } = suggestPhotoStyle(tones);
      const range = backgroundRange(tones, opacity);
      expect(new Set(Object.values(colors)).size).toBe(3);
      for (const color of Object.values(colors)) {
        expect(textOutline(color, range)).toBeUndefined();
        expect(textOutline(color, backgroundRange(tones, 100))).toBeDefined();
      }
    },
  );
  it("restores the photograph and role colors and switches back to the stored frame", () => {
    const tones = { dominant: "#de8030", low: "#201000", high: "#ffeedd" };
    const photo = {
      name: "Patio",
      src: "data:image/webp;base64,AAAA",
      ...tones,
      ...suggestPhotoStyle(tones),
    };
    const design = hydrateDesign({
      ...freshDesign(),
      backgroundMode: "photo",
      photo,
      title: "Patio",
    });
    const svg = renderToStaticMarkup(<Composition design={design} />);
    expect(svg).toContain(photo.src);
    for (const color of Object.values(photo.colors))
      expect(svg).toContain(`fill="${color}"`);
    expect(
      renderToStaticMarkup(
        <Composition design={{ ...design, backgroundMode: "frame" }} />,
      ),
    ).not.toContain("<image");
    expect(
      hydrateDesign({
        ...design,
        photo: { ...photo, src: "https://example.com/image.png" },
      }).photo,
    ).toBeNull();
  });
});
