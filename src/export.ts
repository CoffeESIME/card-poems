import { embedFonts } from "./fonts";
import { dimensions, type Design } from "./model";
export async function compositionBlob(
  svg: SVGSVGElement,
  design: Design,
  format: "svg" | "png" | "jpeg",
) {
  await document.fonts.ready;
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.removeAttribute("id");
  clone.querySelectorAll("[data-guide]").forEach((el) => el.remove());
  // The export target is rendered without editor guides.
  const family = svg.getAttribute("data-font-family") || "Cormorant Garamond";
  const style = document.createElementNS("http://www.w3.org/2000/svg", "style");
  style.textContent = await embedFonts(
    family,
    design.poem + design.title + design.author,
  );
  clone.prepend(style);
  const blob = new Blob([new XMLSerializer().serializeToString(clone)], {
    type: "image/svg+xml;charset=utf-8",
  });
  if (format === "svg") return blob;
  const url = URL.createObjectURL(blob);
  try {
    const image = new Image();
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () =>
        reject(new Error("No se pudo renderizar la composición."));
      image.src = url;
    });
    const canvas = document.createElement("canvas");
    [canvas.width, canvas.height] = dimensions[design.format];
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("El navegador no admite la exportación.");
    ctx.drawImage(image, 0, 0);
    return await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(
        (result) =>
          result
            ? resolve(result)
            : reject(new Error("No se pudo crear la imagen.")),
        format === "jpeg" ? "image/jpeg" : "image/png",
        0.96,
      ),
    );
  } finally {
    URL.revokeObjectURL(url);
  }
}
export function download(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob),
    link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}
