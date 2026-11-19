import type { Palette, Tradition } from "./model";

export const collectiveTemplates = [
  {
    id: "broadside",
    tradition: "revolt",
    name: "Que circule la palabra",
    subtitle: "Revolución en tinta fresca",
    description:
      "Pliegos recién impresos pasan de mano en mano. Escribe el verso que te gustaría encontrar pegado en la pared de tu calle.",
    palette: {
      name: "Bermellón de imprenta",
      paper: "#f4e4c6",
      ornament: "#332f2a",
      detail: "#b4402c",
      ink: "#302922",
    },
  },
  {
    id: "assembly",
    tradition: "revolt",
    name: "La plaza toma la voz",
    subtitle: "Revuelta y asamblea",
    description:
      "Una manta ondula sobre un semicírculo de bancos. ¿Qué diría la plaza si cada persona aportara un verso?",
    palette: {
      name: "Manta y adoquín",
      paper: "#303340",
      ornament: "#e9bf84",
      detail: "#ed907a",
      ink: "#fff0d8",
    },
  },
  {
    id: "petition",
    tradition: "revolt",
    name: "Al pie de la demanda",
    subtitle: "Derechos de puño y letra",
    description:
      "Un pliego doblado recoge firmas en tintas distintas. Nombra un derecho y deja que la última línea sea el sitio de quien falta por firmar.",
    palette: {
      name: "Papel de acta",
      paper: "#ece9d8",
      ornament: "#385d53",
      detail: "#944a3e",
      ink: "#293d37",
    },
  },
  {
    id: "shift",
    tradition: "labor",
    name: "El relevo",
    subtitle: "Voces del turno obrero",
    description:
      "Una tarjeta de fichar y un tejado de fábrica marcan el cambio de turno. Dale la palabra a quien sale o a quien acaba de entrar.",
    palette: {
      name: "Azul de overol",
      paper: "#dfE7e5",
      ornament: "#385769",
      detail: "#a14d31",
      ink: "#263d49",
    },
  },
  {
    id: "shuttle",
    tradition: "labor",
    name: "Canta la lanzadera",
    subtitle: "Ritmo de telar",
    description:
      "Una lanzadera lleva el hilo entre los dientes del telar. Prueba un verso que siga el compás de la máquina y otro que lo interrumpa.",
    palette: {
      name: "Añil y cobre",
      paper: "#253b46",
      ornament: "#dec596",
      detail: "#ec9776",
      ink: "#faf0db",
    },
  },
  {
    id: "hammock",
    tradition: "leisure",
    name: "La tarde sin silbato",
    subtitle: "El derecho a la siesta",
    description:
      "Una hamaca se comba entre dos nudos bajo un sol quieto. Cuenta qué hace tu cuerpo con una hora que por fin le pertenece.",
    palette: {
      name: "Sombra de patio",
      paper: "#eef0dc",
      ornament: "#427267",
      detail: "#be7848",
      ink: "#2d4940",
    },
  },
  {
    id: "longtable",
    tradition: "leisure",
    name: "Que alcance la mesa",
    subtitle: "Gozo y sobremesa",
    description:
      "Una guirnalda de recortes y unas tajadas de sandía enmarcan la sobremesa. Empieza por el sabor que le guardarías a quien viene de camino.",
    palette: {
      name: "Sandía con sal",
      paper: "#fae6d2",
      ornament: "#38705c",
      detail: "#c54c55",
      ink: "#51332c",
    },
  },
  {
    id: "cancionero",
    tradition: "revolt",
    name: "Hoja de corrido",
    subtitle: "Revolución mexicana · cancionero",
    description:
      "Papel crema, tinta negra y una viñeta roja, como en la página de Carabina 30-30. Dedica una copla a quien partió y otra a quien se quedó para contar la historia.",
    palette: {
      name: "Carmín de cancionero",
      paper: "#f2e8d6",
      ornament: "#44362e",
      detail: "#a54137",
      ink: "#322b27",
    },
  },
  {
    id: "mojonera",
    tradition: "revolt",
    name: "Donde estaba la mojonera",
    subtitle: "Revolución mexicana · despojo de tierras",
    description:
      "Un plano de parcelas y un lindero cortan los surcos. Cuenta la violencia del despojo desde la voz de alguien que todavía recuerda el nombre de cada pedazo de tierra.",
    palette: {
      name: "Tierra de temporal",
      paper: "#e8dfc7",
      ornament: "#60533b",
      detail: "#995836",
      ink: "#393529",
    },
  },
  {
    id: "petrograd",
    tradition: "revolt",
    name: "La fila del pan",
    subtitle: "Revolución rusa · Petrogrado, 1917",
    description:
      "Una hogaza sobre tinta oscura y unas pisadas en la nieve recuerdan a las mujeres que salieron a pedir pan en Petrogrado. Empieza en la fila, justo cuando una mujer le guarda el sitio a otra.",
    palette: {
      name: "Nieve y centeno",
      paper: "#27363e",
      ornament: "#d9ddd5",
      detail: "#e7a56d",
      ink: "#faf1df",
    },
  },
  {
    id: "doleances",
    tradition: "revolt",
    name: "Cuaderno de agravios",
    subtitle: "Revolución francesa · Francia, 1789",
    description:
      "Un cuaderno cosido y tres monedas evocan las quejas por el reparto desigual de los impuestos en 1789. Haz las cuentas de una casa pobre. ¿Qué petición dejaría esa familia por escrito?",
    palette: {
      name: "Azul de escribanía",
      paper: "#e8e6dc",
      ornament: "#415775",
      detail: "#9e5842",
      ink: "#303849",
    },
  },
] as const satisfies ReadonlyArray<{
  id: string;
  tradition: Tradition;
  name: string;
  subtitle: string;
  description: string;
  palette: Palette;
}>;

export type CollectiveTemplateId = (typeof collectiveTemplates)[number]["id"];
