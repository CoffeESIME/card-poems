export type Tradition = "persian" | "japanese" | "mexican";
export type TemplateId =
  | "stars"
  | "manuscript"
  | "infinite"
  | "silence"
  | "waves"
  | "ink"
  | "marigold"
  | "papel"
  | "memory";
export type Palette = {
  name: string;
  paper: string;
  ornament: string;
  detail: string;
  ink: string;
};
export type Design = {
  id: string;
  name: string;
  template: TemplateId;
  format: "square" | "story" | "portrait";
  poem: string;
  title: string;
  author: string;
  font: "serif" | "japanese" | "arabic";
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  align: "left" | "center" | "right";
  italic: boolean;
  bold: boolean;
  position: number;
  authorPosition: "below" | "bottom" | "hidden";
  direction: "auto" | "ltr" | "rtl";
  palette: Palette;
  thickness: number;
  margin: number;
  innerMargin: number;
  patternScale: number;
  opacity: number;
  density: number;
  decoration: "all" | "top" | "bottom";
  layers: {
    texture: boolean;
    pattern: boolean;
    frame: boolean;
    ornaments: boolean;
  };
};
export type Template = {
  id: TemplateId;
  tradition: Tradition;
  name: string;
  subtitle: string;
  description: string;
  palette: Palette;
};
export const traditions: {
  id: Tradition;
  label: string;
  region: string;
  mark: string;
}[] = [
  {
    id: "persian",
    label: "Persa",
    region: "Geometría & manuscritos",
    mark: "✳",
  },
  {
    id: "japanese",
    label: "Japonesa",
    region: "Papel, tinta & silencio",
    mark: "◒",
  },
  { id: "mexican", label: "Mexicana", region: "Flores & memoria", mark: "✿" },
];
export const palettes: Palette[] = [
  {
    name: "Noche dorada",
    paper: "#142f35",
    ornament: "#ba9859",
    detail: "#d4bf8c",
    ink: "#f4ecd9",
  },
  {
    name: "Papel de arroz",
    paper: "#f3efdf",
    ornament: "#343d39",
    detail: "#aa493d",
    ink: "#333b35",
  },
  {
    name: "Jardín de jade",
    paper: "#e8eadc",
    ornament: "#476356",
    detail: "#b58e55",
    ink: "#2b4135",
  },
  {
    name: "Índigo y marfil",
    paper: "#f0eddf",
    ornament: "#29435c",
    detail: "#aa5040",
    ink: "#253e51",
  },
  {
    name: "Flor de tierra",
    paper: "#f3e8d6",
    ornament: "#ad6534",
    detail: "#365543",
    ink: "#49382c",
  },
  {
    name: "Fiesta de papel",
    paper: "#f6e9d4",
    ornament: "#713e67",
    detail: "#ba5b72",
    ink: "#57334d",
  },
];
export const templates: Template[] = [
  {
    id: "stars",
    tradition: "persian",
    name: "Jardín de estrellas",
    subtitle: "Geometría celeste",
    description:
      "Estrellas entrelazadas y filigrana dorada, como un jardín bajo el cielo nocturno.",
    palette: palettes[0],
  },
  {
    id: "manuscript",
    tradition: "persian",
    name: "Manuscrito persa",
    subtitle: "El arte de la página",
    description:
      "Arabescos vegetales, medallones y esquinas iluminadas alrededor de tus palabras.",
    palette: palettes[2],
  },
  {
    id: "infinite",
    tradition: "persian",
    name: "Geometría infinita",
    subtitle: "Un ritmo sin principio",
    description:
      "Una trama de estrellas de doce puntas que se disuelve para dar espacio al poema.",
    palette: { ...palettes[2], paper: "#f0eee1" },
  },
  {
    id: "silence",
    tradition: "japanese",
    name: "Silencio",
    subtitle: "La belleza del vacío",
    description:
      "Una rama, un pequeño sol y todo el espacio que necesita un haiku.",
    palette: palettes[1],
  },
  {
    id: "waves",
    tradition: "japanese",
    name: "Olas eternas",
    subtitle: "El mar en un instante",
    description:
      "Arcos seigaiha repetidos con precisión, entre índigo y papel de arroz.",
    palette: palettes[3],
  },
  {
    id: "ink",
    tradition: "japanese",
    name: "Papel y tinta",
    subtitle: "El gesto del pincel",
    description:
      "Bordes de tinta, una hoja de bambú y la irregularidad serena del papel.",
    palette: palettes[1],
  },
  {
    id: "marigold",
    tradition: "mexican",
    name: "Cempasúchil",
    subtitle: "Flores para recordar",
    description:
      "Pétalos de cempasúchil y pequeñas guías vegetales que abrazan la memoria.",
    palette: palettes[4],
  },
  {
    id: "papel",
    tradition: "mexican",
    name: "Papel picado",
    subtitle: "La luz entre los recortes",
    description:
      "Flores perforadas, simetrías y orillas festoneadas inspiradas en el papel recortado.",
    palette: palettes[5],
  },
  {
    id: "memory",
    tradition: "mexican",
    name: "Grabado de la memoria",
    subtitle: "La huella de lo que queda",
    description:
      "Rayados de xilografía, hojas y soles sobre el tono del papel antiguo.",
    palette: {
      name: "Tinta antigua",
      paper: "#eae0c9",
      ornament: "#45463c",
      detail: "#98613e",
      ink: "#363a31",
    },
  },
];
export const examples = [
  {
    label: "Un jardín · cuatro versos",
    poem: "La noche guarda un jardín\nque no conoce el invierno.\nCada estrella es una flor;\ncada silencio, un comienzo.",
    author: "Versos de este taller",
  },
  {
    label: "La rama · haiku",
    poem: "La rama quieta.\nEn la sombra de una hoja\ndescansa el viento.",
    author: "Versos de este taller",
  },
  {
    label: "La memoria · seis versos",
    poem: "Dejo una flor junto al agua,\nun poco de luz en la mesa.\nLo que se fue no se apaga:\ncambia de casa en la tierra.\nY en el rumor de las hojas\nvuelve a llamarnos la ausencia.",
    author: "Versos de este taller",
  },
  {
    label: "日本語 · tres versos",
    poem: "静かな庭に\nひとひらの葉が落ちる\n風は眠った",
    author: "この工房の詩",
  },
  {
    label: "فارسی · dos versos",
    poem: "در باغِ شب، ستاره آرام می‌روید\nو باد، نامِ برگ‌ها را می‌خواند",
    author: "سرودهٔ این کارگاه",
  },
];
export const dimensions = {
  square: [1080, 1080],
  story: [1080, 1920],
  portrait: [1080, 1350],
} as const;
export function freshDesign(template: TemplateId = "stars"): Design {
  return {
    id: crypto.randomUUID(),
    name: "Un jardín en la noche",
    template,
    format: "square",
    ...examples[0],
    title: "",
    font: "serif",
    fontSize: 47,
    lineHeight: 1.6,
    letterSpacing: 0,
    align: "center",
    italic: false,
    bold: false,
    position: 50,
    authorPosition: "below",
    direction: "auto",
    palette: { ...templates.find((t) => t.id === template)!.palette },
    thickness: 1,
    margin: 38,
    innerMargin: 40,
    patternScale: 1,
    opacity: 1,
    density: 1,
    decoration: "all",
    layers: { texture: true, pattern: true, frame: true, ornaments: true },
  };
}
export function changeTemplate(design: Design, template: Template): Design {
  return {
    ...design,
    template: template.id,
    palette: { ...template.palette },
    thickness: 1,
    margin: 38,
    innerMargin: 40,
    patternScale: 1,
    opacity: 1,
    density: 1,
    decoration: "all",
    layers: { ...freshDesign().layers },
  };
}
