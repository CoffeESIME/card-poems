type RGB = [number, number, number];
export type TextColors = { title: string; poem: string; author: string };
export type PhotoBackground = {
  src: string;
  name: string;
  dominant: string;
  low: string;
  high: string;
  colors: TextColors;
  opacity: number;
};

const hex = (rgb: RGB) =>
  "#" + rgb.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
const rgb = (color: string): RGB =>
  [1, 3, 5].map((i) => parseInt(color.slice(i, i + 2), 16)) as RGB;
const mix = (a: RGB, b: RGB, fraction: number): RGB =>
  a.map((v, i) => v + (b[i] - v) * fraction) as RGB;

function luminance(color: RGB) {
  const linear = color.map((channel) => {
    const v = channel / 255;
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

export function analyzePixels(pixels: Uint8ClampedArray) {
  const weights = new Float64Array(4096);
  const sums = new Float64Array(4096 * 3);
  const low: RGB = [255, 255, 255],
    high: RGB = [0, 0, 0];
  let winner = 0;
  for (let i = 0; i < pixels.length; i += 4) {
    const alpha = pixels[i + 3];
    if (!alpha) continue;
    const bin =
      ((pixels[i] >> 4) << 8) |
      ((pixels[i + 1] >> 4) << 4) |
      (pixels[i + 2] >> 4);
    weights[bin] += alpha;
    for (let c = 0; c < 3; c++) {
      const v = pixels[i + c];
      sums[bin * 3 + c] += alpha * v;
      low[c] = Math.min(low[c], v);
      high[c] = Math.max(high[c], v);
    }
    if (weights[bin] > weights[winner]) winner = bin;
  }
  if (!weights[winner])
    throw new Error("La imagen es totalmente transparente. Elige otra imagen.");
  const dominant = [0, 1, 2].map(
    (c) => sums[winner * 3 + c] / weights[winner],
  ) as RGB;
  return { dominant: hex(dominant), low: hex(low), high: hex(high) };
}

type ImageTones = Pick<PhotoBackground, "dominant" | "low" | "high">;
export function validPhoto(value: unknown): value is PhotoBackground {
  if (!value || typeof value !== "object") return false;
  const p = value as Partial<PhotoBackground>;
  return (
    typeof p.src === "string" &&
    /^data:image\/(?:webp|png|jpeg);base64,/.test(p.src) &&
    typeof p.name === "string" &&
    typeof p.opacity === "number" &&
    p.opacity >= 0 &&
    p.opacity <= 100 &&
    [
      p.dominant,
      p.low,
      p.high,
      p.colors?.title,
      p.colors?.poem,
      p.colors?.author,
    ].every((c) => typeof c === "string" && /^#[0-9a-f]{6}$/i.test(c))
  );
}
export function photoPaper(dominant: string) {
  const hue = rgb(dominant);
  return hex(
    mix(hue, luminance(hue) > 0.22 ? [255, 255, 255] : [0, 0, 0], 0.92),
  );
}

// Bounding each channel also covers crops, transparent pixels and mixtures of hues.
export function backgroundRange(tones: ImageTones, opacity: number) {
  const base = rgb(photoPaper(tones.dominant));
  const l = luminance(base);
  return [
    Math.min(l, luminance(mix(base, rgb(tones.low), opacity / 100))),
    Math.max(l, luminance(mix(base, rgb(tones.high), opacity / 100))),
  ] as const;
}

function contrast(color: string, [low, high]: readonly [number, number]) {
  const l = luminance(rgb(color));
  if (l < low) return (low + 0.05) / (l + 0.05);
  if (l > high) return (l + 0.05) / (high + 0.05);
  return 1;
}

export function textOutline(color: string, range: readonly [number, number]) {
  if (contrast(color, range) >= 4.5) return undefined;
  return luminance(rgb(color)) > 0.179 ? "#000000" : "#ffffff";
}

export function suggestPhotoStyle(tones: ImageTones) {
  const hue = rgb(tones.dominant);
  const lightPaper = luminance(hue) > 0.22;
  const neutral: RGB = lightPaper ? [0, 0, 0] : [255, 255, 255];
  const colors = {
    title: hex(mix(hue, neutral, lightPaper ? 0.69 : 0.8)),
    poem: hex(mix(hue, neutral, lightPaper ? 0.9 : 0.97)),
    author: hex(mix(hue, lightPaper ? [53, 58, 64] : [203, 210, 218], 0.91)),
  };
  let opacity = 85;
  while (
    opacity > 0 &&
    Object.values(colors).some(
      (c) => contrast(c, backgroundRange(tones, opacity)) < 4.7,
    )
  )
    opacity -= 5;
  return { colors, opacity };
}

export async function importPhoto(file: File): Promise<PhotoBackground> {
  if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
    throw new Error("Elige una imagen JPG, PNG o WebP.");
  }
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.src = url;
    await image.decode();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) throw new Error("El navegador no pudo procesar la imagen.");
    // Keep local drafts, saved copies and self-contained exports compact.
    let scale = Math.min(
      1,
      1920 / Math.max(image.naturalWidth, image.naturalHeight),
    );
    let src: string;
    do {
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      src = canvas.toDataURL("image/webp", 0.83);
      scale *= 0.78;
    } while (src.length > 480_000);
    if (!src.startsWith("data:image/"))
      throw new Error("No se pudo preparar la imagen.");
    const tones = analyzePixels(
      ctx.getImageData(0, 0, canvas.width, canvas.height).data,
    );
    return { src, name: file.name, ...tones, ...suggestPhotoStyle(tones) };
  } finally {
    URL.revokeObjectURL(url);
  }
}
