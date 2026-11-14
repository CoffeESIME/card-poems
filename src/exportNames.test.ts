import { afterEach, describe, expect, it, vi } from "vitest";
import { freshDesign } from "./model";
import { createExportNames } from "./exportNames";

afterEach(() => vi.useRealTimers());

describe("export filenames", () => {
  it("prefers the visible title, then content, then the library name", () => {
    const d = {
      ...freshDesign(),
      title: "Aquí yace la razón",
      poem: "No tenía prisa.\nLlegó de todos modos.",
      name: "Borrador viejo",
    };
    expect(createExportNames(d, "png").image(0, 1)).toMatch(
      /^folio-Aquí-yace-la-razón-/,
    );
    expect(createExportNames({ ...d, title: "?!" }, "svg").image(0, 1)).toMatch(
      /^folio-No-tenía-prisa-Llegó-de-todos-modos-/,
    );
    expect(
      createExportNames({ ...d, title: "", poem: "" }, "png").image(0, 1),
    ).toMatch(/^folio-Borrador-viejo-/);
    expect(
      createExportNames({ ...d, title: "", poem: "", name: "" }, "png").image(
        0,
        1,
      ),
    ).toMatch(/^folio-composicion-/);
  });

  it("avoids collisions even for repeated exports in the same millisecond", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 10, 13, 20, 30, 15, 123));
    const d = freshDesign();
    const first = createExportNames(d, "png").image(0, 1);
    const second = createExportNames(d, "png").image(0, 1);
    expect(first).toContain("2026-11-13_20-30-15-123");
    expect(first).not.toBe(second);
  });

  it("keeps one series identity, original page numbers and sortable padding", () => {
    const names = createExportNames(
      { ...freshDesign(), format: "story" },
      "jpeg",
    );
    const first = names.image(0, 120);
    const last = names.image(119, 120);
    expect(first).toMatch(/-1080x1920-lamina-001\.jpg$/);
    expect(last).toBe(first.replace("lamina-001", "lamina-120"));
    expect(names.archive).toBe(
      first.replace("-lamina-001.jpg", "-jpg-laminas.zip"),
    );
    expect(names.image(6, 12)).toMatch(/-lamina-07\.jpg$/);
    expect(names.image(0, 1)).not.toContain("lamina");
  });

  it("bounds length and removes filesystem punctuation without losing Unicode", () => {
    for (const title of [
      "CON",
      '../NUL:<a>\\b|c?*"\u0000',
      "静かな庭",
      "در باغ",
      "a".repeat(300),
      "palabra ".repeat(100),
    ]) {
      const file = createExportNames({ ...freshDesign(), title }, "svg").image(
        0,
        1,
      );
      expect(file).not.toMatch(/[<>:"/\\|?*\u0000-\u001f]/);
      expect([...file].length).toBeLessThan(140);
      expect(file).toMatch(/^folio-.+\.svg$/);
    }
    expect(
      createExportNames({ ...freshDesign(), title: "静かな庭" }, "svg").image(
        0,
        1,
      ),
    ).toContain("静かな庭");
    expect(
      createExportNames({ ...freshDesign(), title: "Cafe\u0301" }, "png").image(
        0,
        1,
      ),
    ).toContain("Café");
  });
});
