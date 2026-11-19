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
] as const satisfies ReadonlyArray<{
  id: string;
  tradition: Tradition;
  name: string;
  subtitle: string;
  description: string;
  palette: Palette;
}>;

export type CollectiveTemplateId = (typeof collectiveTemplates)[number]["id"];
