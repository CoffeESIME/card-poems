import type { Template } from "./model";

export type DarkTemplateId =
  | "fleshandthorn"
  | "excess"
  | "anatomy"
  | "lastsun"
  | "ashcity"
  | "judgment";

export const darkTemplates: Template[] = [
  {
    id: "fleshandthorn",
    tradition: "dark",
    name: "Carne y espina",
    subtitle: "La herida como escritura",
    description:
      "Una incisión carmesí, suturas y espinas en los márgenes. Para poemas de cuerpo, deseo y mortalidad.",
    palette: {
      name: "Carne y granate",
      paper: "#e9d9cf",
      ornament: "#783d40",
      detail: "#a64439",
      ink: "#3c2528",
    },
  },
  {
    id: "excess",
    tradition: "dark",
    name: "El gabinete del exceso",
    subtitle: "Decadencia & transgresión",
    description:
      "Una cartela barroca quebrada, volutas y una vela consumida sobre vino oscuro. La opulencia al borde de su ruina.",
    palette: {
      name: "Vino y oro viejo",
      paper: "#35252c",
      ornament: "#c2a37c",
      detail: "#d38b77",
      ink: "#f1e5d5",
    },
  },
  {
    id: "anatomy",
    tradition: "dark",
    name: "Anatomía del vacío",
    subtitle: "Lo que queda del cuerpo",
    description:
      "Un costillar abierto y marcas de lámina anatómica sobre papel hueso. Un espacio desnudo para la fragilidad, la ausencia y el humor más oscuro.",
    palette: {
      name: "Hueso y grafito",
      paper: "#e6e0d1",
      ornament: "#68665a",
      detail: "#9b5348",
      ink: "#36382f",
    },
  },
  {
    id: "lastsun",
    tradition: "dark",
    name: "El último sol",
    subtitle: "Un cielo sin mañana",
    description:
      "Un sol eclipsado, rayos partidos y una tierra hendida. Para visiones del fin, profecías y paisajes sin consuelo.",
    palette: {
      name: "Cobre del eclipse",
      paper: "#292b2c",
      ornament: "#c9a17b",
      detail: "#d67f54",
      ink: "#efe6d5",
    },
  },
  {
    id: "ashcity",
    tradition: "dark",
    name: "Ciudad de ceniza",
    subtitle: "La ruina de lo humano",
    description:
      "Fachadas rotas, ventanas vacías y ceniza que cae desde un cielo de humo. Una ciudad abandonada al pie del poema.",
    palette: {
      name: "Ceniza industrial",
      paper: "#dcded7",
      ornament: "#59615c",
      detail: "#965c48",
      ink: "#303b36",
    },
  },
  {
    id: "judgment",
    tradition: "dark",
    name: "Después del juicio",
    subtitle: "Ni respuesta ni absolución",
    description:
      "Una balanza vencida, un sello fracturado y líneas de sentencia interrumpidas. Para aforismos crueles, ironías finales y poemas de condena.",
    palette: {
      name: "Pergamino quemado",
      paper: "#ded0b6",
      ornament: "#635044",
      detail: "#9a4637",
      ink: "#3e302a",
    },
  },
];
