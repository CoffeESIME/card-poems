import { dimensions, type Design } from "./model";
import { fontFamilies } from "./fonts";
import { wrapPoem, paginateLines } from "./text";
export function readingInset(d: Design) {
  const clearance = {
    broadside: 165,
    assembly: 160,
    petition: 150,
    shift: 160,
    shuttle: 150,
    hammock: 160,
    longtable: 155,
    fleshandthorn: 180,
    excess: 190,
    anatomy: 190,
    lastsun: 200,
    ashcity: 200,
    judgment: 190,
    epitaph: 190,
    obituary: 165,
    bureaucracy: 170,
    classified: 165,
    littlefarce: 195,
    falseglory: 190,
    moonwindow: 190,
    ruins: 190,
    well: 190,
    veil: 190,
    emptychair: 180,
    ellipsis: 155,
    rosette: 190,
    cypress: 190,
    cranes: 190,
    rain: 190,
    dahlia: 190,
    agave: 190,
    pebble: 180,
    ripple: 180,
    ginkgo: 190,
    fern: 190,
    reeds: 190,
    moonwater: 190,
    glacier: 190,
    ridge: 190,
    exlibris: 190,
    correspondence: 190,
    compass: 190,
    footpath: 190,
    blueflower: 170,
    homeland: 190,
    threshold: 180,
    innernight: 180,
    waiting: 180,
    lastvoice: 110,
    stars: 105,
    manuscript: 170,
    infinite: 85,
    silence: 90,
    waves: 110,
    ink: 100,
    marigold: 150,
    papel: 140,
    memory: 118,
    enso: 162,
    sand: 110,
    lotus: 180,
    herbarium: 165,
    willow: 170,
    meadow: 175,
    river: 155,
    balance: 170,
    clouds: 160,
    alpine: 220,
    mist: 220,
    contours: 130,
    renaissance: 130,
    salon: 155,
    encyclopedia: 125,
    walking: 170,
    fieldnotes: 165,
    woodland: 190,
  }[d.template];
  return Math.min(330, Math.max(155, d.margin + clearance) + d.innerMargin);
}

export function layoutText(d: Design) {
  const [w, h] = dimensions[d.format];
  const baseInset = readingInset(d);
  const inset = Math.max(80, Math.min(420, baseInset + d.verticalSpace));
  const horizontalInset = Math.max(
    80,
    Math.min(
      420,
      (d.template === "alpine" || d.template === "mist"
        ? Math.max(195, baseInset - 55)
        : baseInset) + d.horizontalSpace,
    ),
  );
  const readWidth = w - horizontalInset * 2,
    readHeight = h - inset * 2;
  const family = fontFamilies[d.font];
  const ctx =
    typeof document !== "undefined"
      ? document.createElement("canvas").getContext("2d")
      : null;
  const hasJP = /[\u3040-\u30ff\u3400-\u9fff]/.test(
    d.poem + d.title + d.author,
  );
  const hasArabic = /[\u0600-\u08ff]/.test(d.poem + d.title + d.author);
  const contentFamily = !["japanese", "arabic"].includes(d.font)
    ? hasJP
      ? fontFamilies.japanese
      : hasArabic
        ? fontFamilies.arabic
        : family
    : family;
  let size = d.fontSize;
  const measure = (fontSize: number, bold = d.bold, italic = d.italic) => {
    if (ctx)
      ctx.font = `${italic ? "italic" : "normal"} ${bold ? 600 : 400} ${fontSize}px "${contentFamily}"`;
    return (text: string) =>
      (ctx?.measureText(text).width ?? [...text].length * fontSize * 0.55) +
      Math.max(0, [...text].length - 1) * d.letterSpacing;
  };

  const authorText = d.author.trim();
  const authorLines =
    authorText && d.authorPosition !== "hidden"
      ? wrapPoem(
          /^[—–-]/u.test(authorText) ? authorText : `— ${authorText}`,
          readWidth,
          measure(d.authorSize, d.authorBold, d.authorItalic),
        )
      : [];
  const authorLeading = d.authorSize * 1.35;
  const authorHeight = authorLines.length
    ? d.authorSize + (authorLines.length - 1) * authorLeading
    : 0;
  const overhead =
    (d.title ? d.titleSize + d.titleGap : 0) +
    (authorLines.length ? authorHeight + d.authorGap : 0);

  let lines = wrapPoem(d.poem, readWidth, measure(size));
  if (d.pagination === "single") {
    while (
      lines.length * size * d.lineHeight + overhead > readHeight &&
      size > 10
    ) {
      size -= 1;
      lines = wrapPoem(d.poem, readWidth, measure(size));
    }
  }
  const capacity = Math.max(
    1,
    Math.floor((readHeight - overhead) / (size * d.lineHeight)),
  );
  const pages =
    d.pagination === "single" ? [lines] : paginateLines(lines, capacity);
  return {
    inset,
    horizontalInset,
    readWidth,
    readHeight,
    contentFamily,
    overhead,
    authorLines,
    authorLeading,
    authorHeight,
    size,
    measure,
    pages,
  };
}
