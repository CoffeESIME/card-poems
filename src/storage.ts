import { validPhoto } from "./photo";
import {
  freshDesign,
  templates,
  type Design,
  type Palette,
  type TemplateId,
} from "./model";
export type Preset = {
  id: string;
  name: string;
  template: TemplateId;
  palette: Palette;
};
export const keys = {
  draft: "folio:draft:v1",
  designs: "folio:designs:v1",
  presets: "folio:presets:v1",
};
export function readLocal<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}
export function hydrateDesign(value: unknown): Design {
  const base = freshDesign();
  if (!value || typeof value !== "object") return base;
  const data = value as Partial<Design>;
  if (
    !templates.some((t) => t.id === data.template) ||
    typeof data.poem !== "string"
  )
    return base;
  return {
    ...base,
    ...data,
    backgroundMode: data.backgroundMode === "photo" ? "photo" : "frame",
    photo: validPhoto(data.photo) ? data.photo : null,
    palette: { ...base.palette, ...data.palette },
    layers: { ...base.layers, ...data.layers },
  };
}
export function writeLocal(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
