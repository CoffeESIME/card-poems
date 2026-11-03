export type Tradition =
  | "persian"
  | "japanese"
  | "mexican"
  | "zen"
  | "nature"
  | "tao"
  | "mountain";
export type TemplateId =
  | "stars"
  | "manuscript"
  | "infinite"
  | "silence"
  | "waves"
  | "ink"
  | "marigold"
  | "papel"
  | "memory"
  | "enso"
  | "sand"
  | "lotus"
  | "herbarium"
  | "willow"
  | "meadow"
  | "river"
  | "balance"
  | "clouds"
  | "alpine"
  | "mist"
  | "contours";
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
  {
    id: "zen",
    label: "Zen",
    region: "Vacío, piedra & contemplación",
    mark: "◯",
  },
  {
    id: "nature",
    label: "Naturaleza",
    region: "Hojas, agua & estaciones",
    mark: "❧",
  },
  {
    id: "tao",
    label: "Taoísta",
    region: "Equilibrio & el curso del agua",
    mark: "☯",
  },
  {
    id: "mountain",
    label: "Montaña",
    region: "Cumbres, niebla & senderos",
    mark: "△",
  },
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
  {
    name: "Piedra y arena",
    paper: "#ede8dc",
    ornament: "#555950",
    detail: "#b38a62",
    ink: "#383f37",
  },
  {
    name: "Bosque de helechos",
    paper: "#e9ebdf",
    ornament: "#49624b",
    detail: "#a78b51",
    ink: "#304536",
  },
  {
    name: "Agua de jade",
    paper: "#e6eddf",
    ornament: "#4b756b",
    detail: "#ab8350",
    ink: "#304d46",
  },
  {
    name: "Cumbres azules",
    paper: "#e9edf0",
    ornament: "#4c6678",
    detail: "#ae8b64",
    ink: "#2c4354",
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
  {
    id: "enso",
    tradition: "zen",
    name: "Círculo del instante",
    subtitle: "La forma de lo incompleto",
    description:
      "Un ensō abierto, trazado en capas de tinta, rodea el espacio donde descansa el poema.",
    palette: palettes[6],
  },
  {
    id: "sand",
    tradition: "zen",
    name: "Jardín de grava",
    subtitle: "El silencio entre las piedras",
    description:
      "Surcos concéntricos, tres piedras y un espacio despejado inspirado en los jardines secos.",
    palette: {
      ...palettes[6],
      name: "Arena serena",
      ornament: "#8c866e",
      detail: "#53594f",
    },
  },
  {
    id: "lotus",
    tradition: "zen",
    name: "Loto al alba",
    subtitle: "Florecer en la quietud",
    description:
      "Un loto de líneas delicadas se abre sobre el agua, bajo la luz de una luna tenue.",
    palette: {
      name: "Rosa de loto",
      paper: "#f2e9e3",
      ornament: "#956d73",
      detail: "#9a925f",
      ink: "#58474c",
    },
  },
  {
    id: "herbarium",
    tradition: "nature",
    name: "Herbario",
    subtitle: "La memoria de una hoja",
    description:
      "Frondas de helecho y nervaduras botánicas enmarcan una página de cuaderno de campo.",
    palette: palettes[7],
  },
  {
    id: "willow",
    tradition: "nature",
    name: "Sauce junto al agua",
    subtitle: "Donde se inclina el viento",
    description:
      "Una cortina ligera de hojas de sauce y reflejos de agua dejan el centro abierto a tus versos.",
    palette: palettes[8],
  },
  {
    id: "meadow",
    tradition: "nature",
    name: "Pradera de luz",
    subtitle: "Lo pequeño también florece",
    description:
      "Flores silvestres, espigas y semillas dibujadas a línea nacen al pie de la composición.",
    palette: {
      name: "Miel de verano",
      paper: "#f4eddb",
      ornament: "#6c7851",
      detail: "#b28a45",
      ink: "#48513b",
    },
  },
  {
    id: "river",
    tradition: "tao",
    name: "El curso del agua",
    subtitle: "Seguir sin forzar",
    description:
      "Un cauce sinuoso acompaña el borde de la página; pequeñas ondas sugieren un movimiento continuo.",
    palette: palettes[8],
  },
  {
    id: "balance",
    tradition: "tao",
    name: "La quietud de los opuestos",
    subtitle: "Dos fuerzas, un mismo círculo",
    description:
      "Un pequeño taijitu y dos arcos complementarios componen un equilibrio de tinta y vacío.",
    palette: {
      name: "Tinta y jade",
      paper: "#f0eee1",
      ornament: "#354d49",
      detail: "#a98a57",
      ink: "#304541",
    },
  },
  {
    id: "clouds",
    tradition: "tao",
    name: "Nubes errantes",
    subtitle: "El cielo no retiene nada",
    description:
      "Volutas de nubes y hilos de aire recorren los extremos, como un paisaje que apenas empieza.",
    palette: {
      name: "Celadón del cielo",
      paper: "#edf0e6",
      ornament: "#6d887c",
      detail: "#ae9870",
      ink: "#415a50",
    },
  },
  {
    id: "alpine",
    tradition: "mountain",
    name: "Cordillera",
    subtitle: "El horizonte que nos llama",
    description:
      "Cumbres angulares, pequeñas laderas nevadas y un cielo de estrellas en una página de explorador.",
    palette: palettes[9],
  },
  {
    id: "mist",
    tradition: "mountain",
    name: "Valle de niebla",
    subtitle: "La distancia se vuelve calma",
    description:
      "Laderas superpuestas en transparencias suaves se pierden bajo una luna pálida.",
    palette: {
      name: "Bruma de pino",
      paper: "#e9eade",
      ornament: "#5f7b70",
      detail: "#a68a5d",
      ink: "#364e45",
    },
  },
  {
    id: "contours",
    tradition: "mountain",
    name: "Senderos de altura",
    subtitle: "La poesía del relieve",
    description:
      "Curvas de nivel trazadas una a una, un pequeño rumbo y el rastro discontinuo de un sendero.",
    palette: {
      name: "Mapa de otoño",
      paper: "#eee7d5",
      ornament: "#858363",
      detail: "#a46c48",
      ink: "#4c503d",
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
