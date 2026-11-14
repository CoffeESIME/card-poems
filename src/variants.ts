import type { Template } from "./model";

export type VariantId =
  | "moonwindow"
  | "ruins"
  | "well"
  | "veil"
  | "emptychair"
  | "ellipsis"
  | "rosette"
  | "cypress"
  | "cranes"
  | "rain"
  | "dahlia"
  | "agave"
  | "pebble"
  | "ripple"
  | "ginkgo"
  | "fern"
  | "reeds"
  | "moonwater"
  | "glacier"
  | "ridge"
  | "exlibris"
  | "correspondence"
  | "compass"
  | "footpath";

export const variantTemplates: Template[] = [
  {
    id: "moonwindow",
    tradition: "romantic",
    name: "Ventana a la luna",
    subtitle: "La distancia iluminada",
    description:
      "Un ventanal ojival y una luna suspendida: el interior se abre al paisaje nocturno.",
    palette: {
      name: "Azul de ventana",
      paper: "#e4e7e7",
      ornament: "#526978",
      detail: "#a1815c",
      ink: "#303f4a",
    },
  },
  {
    id: "ruins",
    tradition: "romantic",
    name: "Lo que permanece",
    subtitle: "Ruinas & hiedra",
    description:
      "Columnas fragmentadas y hojas que vuelven a crecer. Una página para la memoria y el paso del tiempo.",
    palette: {
      name: "Piedra de otoño",
      paper: "#ece2cf",
      ornament: "#7b725e",
      detail: "#925b43",
      ink: "#423a30",
    },
  },
  {
    id: "well",
    tradition: "mystic",
    name: "El pozo de la luz",
    subtitle: "Mirar hacia dentro",
    description:
      "Círculos elípticos descienden hacia un centro luminoso, entre líneas de una arquitectura imaginaria.",
    palette: {
      name: "Bronce interior",
      paper: "#293b3a",
      ornament: "#b5aa83",
      detail: "#e0c599",
      ink: "#eee8d8",
    },
  },
  {
    id: "veil",
    tradition: "mystic",
    name: "Detrás del velo",
    subtitle: "Lo visible & lo secreto",
    description:
      "Pliegues simétricos se apartan alrededor de una estrella pequeña. Un umbral de tela y silencio.",
    palette: {
      name: "Lino de luz",
      paper: "#eee5df",
      ornament: "#93766c",
      detail: "#ad874c",
      ink: "#4c3835",
    },
  },
  {
    id: "emptychair",
    tradition: "absence",
    name: "La silla vacía",
    subtitle: "Alguien estuvo aquí",
    description:
      "Una silla pequeña sobre una línea de suelo, con amplio espacio para una voz ausente.",
    palette: {
      name: "Polvo de escenario",
      paper: "#dedcd5",
      ornament: "#777168",
      detail: "#9d826a",
      ink: "#393630",
    },
  },
  {
    id: "ellipsis",
    tradition: "absence",
    name: "Después de la pausa",
    subtitle: "Continuar, apenas",
    description:
      "Tres puntos y dos líneas que no llegan a encontrarse. Una composición casi desnuda para fragmentos breves.",
    palette: {
      name: "Carbón y hueso",
      paper: "#343431",
      ornament: "#b0ab9e",
      detail: "#d0b99c",
      ink: "#f0eade",
    },
  },
  {
    id: "rosette",
    tradition: "persian",
    name: "Rosa de los vientos",
    subtitle: "Geometría entrelazada",
    description:
      "Rosetones de ocho pétalos y una orilla de rombos trazan un pequeño firmamento geométrico.",
    palette: {
      name: "Lapislázuli",
      paper: "#263d52",
      ornament: "#c3a670",
      detail: "#ded0aa",
      ink: "#f2e9d6",
    },
  },
  {
    id: "cypress",
    tradition: "persian",
    name: "El jardín del ciprés",
    subtitle: "La vida que asciende",
    description:
      "Dos cipreses estilizados, una fuente y arcos finos evocan un jardín de manuscrito.",
    palette: {
      name: "Jardín de azafrán",
      paper: "#eee5ce",
      ornament: "#4c6b59",
      detail: "#b28443",
      ink: "#334a3e",
    },
  },
  {
    id: "cranes",
    tradition: "japanese",
    name: "El vuelo de las grullas",
    subtitle: "Dos gestos en el cielo",
    description:
      "Alas dibujadas con unas pocas líneas cruzan un sol pálido sobre papel cálido.",
    palette: {
      name: "Tinta y bermellón",
      paper: "#f0e9d9",
      ornament: "#505650",
      detail: "#ae5745",
      ink: "#333d36",
    },
  },
  {
    id: "rain",
    tradition: "japanese",
    name: "Lluvia en el alero",
    subtitle: "El ritmo de una tarde",
    description:
      "Un alero oblicuo, lluvia fina y un pequeño abanico. El poema conserva su espacio seco en el centro.",
    palette: {
      name: "Lluvia de índigo",
      paper: "#e2e8e6",
      ornament: "#58717c",
      detail: "#9d6d59",
      ink: "#344c56",
    },
  },
  {
    id: "dahlia",
    tradition: "mexican",
    name: "Dalia de papel",
    subtitle: "Pétalos & simetrías",
    description:
      "Una dalia de pétalos puntiagudos y filetes recortados celebran la forma de una flor.",
    palette: {
      name: "Grana y crema",
      paper: "#f0e1d0",
      ornament: "#9b4d59",
      detail: "#bc7e43",
      ink: "#59373c",
    },
  },
  {
    id: "agave",
    tradition: "mexican",
    name: "El canto del maguey",
    subtitle: "Tierra abierta",
    description:
      "Pencas de agave, un sol rayado y pequeños escalones de grabado sobre papel de tierra.",
    palette: {
      name: "Maguey y barro",
      paper: "#e7dfc9",
      ornament: "#577064",
      detail: "#ad6547",
      ink: "#374c41",
    },
  },
  {
    id: "pebble",
    tradition: "zen",
    name: "Una sola piedra",
    subtitle: "El peso de la quietud",
    description:
      "Una piedra asimétrica descansa sobre su sombra. Apenas unas líneas acompañan la página.",
    palette: {
      name: "Piedra blanca",
      paper: "#ebe7dd",
      ornament: "#73766b",
      detail: "#a08c71",
      ink: "#3f443a",
    },
  },
  {
    id: "ripple",
    tradition: "zen",
    name: "Después de la gota",
    subtitle: "Un instante se expande",
    description:
      "Una gota suspendida y ondas elípticas que se abren en el margen inferior.",
    palette: {
      name: "Agua quieta",
      paper: "#e2e9e5",
      ornament: "#628078",
      detail: "#a08762",
      ink: "#344f48",
    },
  },
  {
    id: "ginkgo",
    tradition: "nature",
    name: "Otoño de ginkgo",
    subtitle: "Hojas como abanicos",
    description:
      "Hojas de ginkgo con nervaduras abiertas y semillas dispersas enmarcan versos de otoño.",
    palette: {
      name: "Oro vegetal",
      paper: "#eee7cf",
      ornament: "#8c8146",
      detail: "#ad6d43",
      ink: "#4a482d",
    },
  },
  {
    id: "fern",
    tradition: "nature",
    name: "El brote secreto",
    subtitle: "Formas que despiertan",
    description:
      "Un helecho joven se desenrolla entre frondas pequeñas, como una página que empieza a escribirse.",
    palette: {
      name: "Musgo húmedo",
      paper: "#dde5d9",
      ornament: "#587255",
      detail: "#9b8055",
      ink: "#324b34",
    },
  },
  {
    id: "reeds",
    tradition: "tao",
    name: "Juncos en el viento",
    subtitle: "Ceder sin romperse",
    description:
      "Tallos inclinados y líneas de aire: una composición que sigue la dirección del viento.",
    palette: {
      name: "Junco de otoño",
      paper: "#eae7d6",
      ornament: "#7a805b",
      detail: "#a67c4d",
      ink: "#484f35",
    },
  },
  {
    id: "moonwater",
    tradition: "tao",
    name: "La luna en el agua",
    subtitle: "Una forma, otro reflejo",
    description:
      "Una luna circular y su reflejo fragmentado dialogan desde los dos extremos de la página.",
    palette: {
      name: "Noche de agua",
      paper: "#2d454a",
      ornament: "#a9beb6",
      detail: "#d0ba8b",
      ink: "#f1ebdb",
    },
  },
  {
    id: "glacier",
    tradition: "mountain",
    name: "Memoria del hielo",
    subtitle: "El azul de la distancia",
    description:
      "Facetas de hielo, grietas y un pequeño cristal trazan un paisaje de aristas silenciosas.",
    palette: {
      name: "Azul glaciar",
      paper: "#e5edef",
      ornament: "#668797",
      detail: "#9d8d79",
      ink: "#365362",
    },
  },
  {
    id: "ridge",
    tradition: "mountain",
    name: "La última cumbre",
    subtitle: "Donde termina el sendero",
    description:
      "Una cresta quebrada se recorta bajo un sol y un cielo de líneas cortas.",
    palette: {
      name: "Cobre de altura",
      paper: "#eae0d1",
      ornament: "#78695d",
      detail: "#b2704f",
      ink: "#463b34",
    },
  },
  {
    id: "exlibris",
    tradition: "french",
    name: "Biblioteca privada",
    subtitle: "Un pequeño ex libris",
    description:
      "Un libro abierto, una cartela y finas reglas de imprenta para máximas y pensamientos.",
    palette: {
      name: "Burdeos de biblioteca",
      paper: "#eee5d4",
      ornament: "#79474a",
      detail: "#a18656",
      ink: "#483034",
    },
  },
  {
    id: "correspondence",
    tradition: "french",
    name: "Carta sin fecha",
    subtitle: "El arte de la confidencia",
    description:
      "Una pluma, un sello y líneas de carta interrumpidas. Para fragmentos íntimos y reflexiones.",
    palette: {
      name: "Papel de carta",
      paper: "#e9e5dc",
      ornament: "#5f6c74",
      detail: "#a16f59",
      ink: "#39464e",
    },
  },
  {
    id: "compass",
    tradition: "wanderer",
    name: "Rumbo abierto",
    subtitle: "Salir sin destino",
    description:
      "Una brújula de cuatro puntas y un trayecto discontinuo acompañan la escritura del viaje.",
    palette: {
      name: "Cuero y mapa",
      paper: "#e9dfc8",
      ornament: "#7d7654",
      detail: "#a76443",
      ink: "#47442e",
    },
  },
  {
    id: "footpath",
    tradition: "wanderer",
    name: "Entre dos orillas",
    subtitle: "El paseo continúa",
    description:
      "Un pequeño puente, un curso de agua y huellas de camino abren espacio para una pausa.",
    palette: {
      name: "Orilla de salvia",
      paper: "#e4e8da",
      ornament: "#61745c",
      detail: "#a48a60",
      ink: "#3d5037",
    },
  },
];
