import type { Palette } from "./model";

export const warTemplates = [
  {
    id: "sewnletter",
    tradition: "war",
    name: "La carta en el forro",
    subtitle: "Mujeres en el frente · testimonio",
    description:
      "Una carta asoma por la costura de un uniforme. La sangre seca alcanzó el doblez. A partir de La guerra no tiene rostro de mujer, escribe lo que una mujer del frente contaría al descoser ese bolsillo.",
    palette: {
      name: "Paño y sangre seca",
      paper: "#e6decc",
      ornament: "#4b5041",
      detail: "#8b3436",
      ink: "#302f29",
    },
  },
  {
    id: "ravinerifle",
    tradition: "war",
    name: "Lo que quedó en la cañada",
    subtitle: "Revolución mexicana · grabado",
    description:
      "El sol rojo corta el filo de la sierra. Abajo quedan un fusil y una calavera con tierra entre los dientes. Con Los de abajo como punto de partida, cuenta quién vuelve por ese camino cuando ya pasó la tropa.",
    palette: {
      name: "Carbón y almagre",
      paper: "#e8cfaa",
      ornament: "#3a302b",
      detail: "#a1392d",
      ink: "#302824",
    },
  },
  {
    id: "tinbowl",
    tradition: "war",
    name: "El cuenco de hojalata",
    subtitle: "Cautiverio · hambre y dignidad",
    description:
      "Una cuchara hace equilibrio en el borde de un cuenco abollado. Sobre la página oscura cruza la alambrada. En diálogo con El hombre en busca de sentido, escribe sobre el gesto de acercarle ese cuenco a otra persona.",
    palette: {
      name: "Hollín y estaño",
      paper: "#282e32",
      ornament: "#c6c6b4",
      detail: "#cf7969",
      ink: "#f1eadd",
    },
  },
  {
    id: "redactedfile",
    tradition: "war",
    name: "El nombre bajo la tachadura",
    subtitle: "Unidad 731 · memoria y responsabilidad",
    description:
      "Una mano deja su huella sobre un expediente tachado. Imagina a quien recibe una disculpa por los crímenes de la Unidad 731. ¿Qué nombre necesita oír antes de que se cierre la carpeta?",
    palette: {
      name: "Carpeta y lacre oscuro",
      paper: "#dcded6",
      ornament: "#38454a",
      detail: "#943b3b",
      ink: "#293238",
    },
  },
] as const satisfies ReadonlyArray<{
  id: string;
  tradition: "war";
  name: string;
  subtitle: string;
  description: string;
  palette: Palette;
}>;

export type WarTemplateId = (typeof warTemplates)[number]["id"];
