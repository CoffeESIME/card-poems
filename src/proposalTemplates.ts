import type { Palette, Tradition } from "./model";

export const proposalTemplates = [
  // ── Guerra y testimonio (4) ──────────────────────────────────────────────
  {
    id: "p_sewnletter",
    tradition: "war",
    name: "Bolsillo cosido",
    subtitle: "Testimonio · costura y doblez",
    description:
      "Costuras de paño militar a lo largo de los márgenes, un sobre doblado que asoma por la solapa y una huella de tinta seca en el borde. Diseñado para testimonios y cartas guardadas.",
    palette: {
      name: "Paño de campaña",
      paper: "#ebe3d1",
      ornament: "#3b4638",
      detail: "#8f2e30",
      ink: "#262922",
    },
  },
  {
    id: "p_ravinerifle",
    tradition: "war",
    name: "Grabado de la sierra",
    subtitle: "Revolución · linograbado",
    description:
      "Marco tallado a gubia inspirado en la gráfica popular mexicana: sol carmesí tras el filo de la sierra, estrías de cielo y crestas de tierra al pie.",
    palette: {
      name: "Almagre y carbón",
      paper: "#efe1c2",
      ornament: "#27221e",
      detail: "#a63326",
      ink: "#231d19",
    },
  },
  {
    id: "p_tinbowl",
    tradition: "war",
    name: "Alambrada y estaño",
    subtitle: "Cautiverio · dignidad",
    description:
      "Barrotes sobrios en los flancos, una línea tensa de alambre en lo alto y un cuenco humilde con vapor sereno en la base. Contraste austero para textos de resistencia interior.",
    palette: {
      name: "Pizarra y estaño",
      paper: "#1f2529",
      ornament: "#cfd0c2",
      detail: "#c96f5b",
      ink: "#f3ede0",
    },
  },
  {
    id: "p_redactedfile",
    tradition: "war",
    name: "Archivo desclasificado",
    subtitle: "Memoria · expediente",
    description:
      "Carpeta de archivo con perforaciones laterales, franjas negras de censura en la cabecera y sello circular desgastado al pie para la memoria que exige nombres.",
    palette: {
      name: "Archivo y lacre",
      paper: "#e3e4dc",
      ornament: "#2f3b40",
      detail: "#9c3232",
      ink: "#222b2f",
    },
  },

  // ── Revuelta y derechos (4) ──────────────────────────────────────────────
  {
    id: "p_broadside",
    tradition: "revolt",
    name: "Pliego de esquina",
    subtitle: "Cartel · imprenta viva",
    description:
      "Composición tipográfica de cartel callejero con bloques esquineros, filetes de prensa y cuñas constructivistas que enmarcan proclamas, máximas y versos públicos.",
    palette: {
      name: "Prensa bermellón",
      paper: "#f3e6cc",
      ornament: "#26231f",
      detail: "#ba3a27",
      ink: "#241f1b",
    },
  },
  {
    id: "p_assembly",
    tradition: "revolt",
    name: "Voces en la plaza",
    subtitle: "Asamblea · coro cívico",
    description:
      "Una manta desplegada en lo alto y gradas semicirculares al pie que convergen hacia la palabra común. Pensado para poemas corales y textos de encuentro.",
    palette: {
      name: "Noche de plaza",
      paper: "#252a38",
      ornament: "#e6be82",
      detail: "#e37f66",
      ink: "#fbf2e0",
    },
  },
  {
    id: "p_cancionero",
    tradition: "revolt",
    name: "Hoja volante",
    subtitle: "Corrido · tipografía popular",
    description:
      "Orla de imprenta popular con rombos tipográficos, esquinas festoneadas y florón carmín al estilo de los cancioneros y hojas sueltas del siglo XIX y XX.",
    palette: {
      name: "Cancionero antiguo",
      paper: "#f4ead6",
      ornament: "#3c2d25",
      detail: "#a8382e",
      ink: "#2c221d",
    },
  },
  {
    id: "p_doleances",
    tradition: "revolt",
    name: "Pliego de peticiones",
    subtitle: "Derechos · acta cosida",
    description:
      "Cuaderno cosido al lomo con filetes de escribanía, líneas de firma y sello de lacre con cintas al pie para demandas, memoriales y declaraciones.",
    palette: {
      name: "Tinta de escribanía",
      paper: "#ece9dc",
      ornament: "#2f4966",
      detail: "#9c4435",
      ink: "#243342",
    },
  },

  // ── Obreros y máquinas (3) ───────────────────────────────────────────────
  {
    id: "p_shift",
    tradition: "labor",
    name: "Tarjeta de relevo",
    subtitle: "Fábrica · cambio de turno",
    description:
      "Esquina achaflanada de tarjeta de fichar, perforaciones de horario en los costados, perfil serrado de naves industriales y cremallera rítmica al pie.",
    palette: {
      name: "Plano y overol",
      paper: "#e4ebe8",
      ornament: "#2c4b5c",
      detail: "#b04f2d",
      ink: "#1f333e",
    },
  },
  {
    id: "p_shuttle",
    tradition: "labor",
    name: "Urdimbre y trama",
    subtitle: "Telar · ritmo textil",
    description:
      "Orillos tejidos a izquierda y derecha, una lanzadera suspendida sobre hilos tensos y una greca textil en la base. Compás artesanal sobre azul añil.",
    palette: {
      name: "Añil de telar",
      paper: "#1e323d",
      ornament: "#e0ca9d",
      detail: "#e08a63",
      ink: "#f8efdc",
    },
  },
  {
    id: "p_press",
    tradition: "labor",
    name: "Caja de tipos",
    subtitle: "Imprenta · oficio de plomo",
    description:
      "Rama tipográfica con cuñas en las esquinas, graduación de picas en los márgenes y divisores de componedor que honran el oficio manual de imprimir palabras.",
    palette: {
      name: "Plomo y rubrica",
      paper: "#f0e9db",
      ornament: "#333532",
      detail: "#a84231",
      ink: "#252724",
    },
  },

  // ── Descanso y gozo (3) ──────────────────────────────────────────────────
  {
    id: "p_hammock",
    tradition: "leisure",
    name: "Siesta en el patio",
    subtitle: "Descanso · tarde quieta",
    description:
      "Arcos suaves de corredor, sol tibio entre ondas de brisa y una hamaca tejida con flecos en el margen inferior. Espacio abierto para la calma merecida.",
    palette: {
      name: "Cal y terraza",
      paper: "#f2f2e1",
      ornament: "#39685d",
      detail: "#c47342",
      ink: "#274139",
    },
  },
  {
    id: "p_longtable",
    tradition: "leisure",
    name: "Sobremesa larga",
    subtitle: "Fiesta · mesa compartida",
    description:
      "Borde de mantel pespunteado, guirnalda festiva en curva superior y gajos de fruta sobre la línea de la mesa. Calidez luminosa para versos de celebración.",
    palette: {
      name: "Mantel y sandía",
      paper: "#f9ebd8",
      ornament: "#2f6351",
      detail: "#c2424d",
      ink: "#422b25",
    },
  },
  {
    id: "p_courtyard",
    tradition: "leisure",
    name: "Azulejo de sombra",
    subtitle: "Ocio · jardín interior",
    description:
      "Esquinas de mayólica con estrellas florales y arcos rebajados que evocan la frescura de un patio con fuente a mediodía.",
    palette: {
      name: "Talavera y ocre",
      paper: "#f3efe4",
      ornament: "#2a5170",
      detail: "#c48b3b",
      ink: "#21394d",
    },
  },

  // ── Visceral y apocalíptica (4) ──────────────────────────────────────────
  {
    id: "p_thorn",
    tradition: "dark",
    name: "Zarza y sutura",
    subtitle: "Cuerpo · herida y belleza",
    description:
      "Tallos espinosos entrelazados en los flancos, una sutura delicada en lo alto y una gota carmesí flanqueada por zarzas en la base.",
    palette: {
      name: "Grana y pergamino",
      paper: "#ece0d8",
      ornament: "#6b282d",
      detail: "#a6322b",
      ink: "#331c1f",
    },
  },
  {
    id: "p_vanitas",
    tradition: "dark",
    name: "Vanitas quebrada",
    subtitle: "Decadencia · barroco oscuro",
    description:
      "Cartela barroca de bronce antiguo hendida por una grieta fina y un candelero cuya vela se consume en un hilo de humo sobre fondo borgoña.",
    palette: {
      name: "Terciopelo y bronce",
      paper: "#24171e",
      ornament: "#c7a778",
      detail: "#d4806a",
      ink: "#f4eadb",
    },
  },
  {
    id: "p_anatomy",
    tradition: "dark",
    name: "Lámina anatómica",
    subtitle: "Vesalio · fragilidad",
    description:
      "Plancha de tratado anatómico con escalas laterales, costillar grabado en línea fina y compás de medición en la base.",
    palette: {
      name: "Vitela y sanguina",
      paper: "#e8e1cf",
      ornament: "#4d4a40",
      detail: "#944138",
      ink: "#2d2c25",
    },
  },
  {
    id: "p_eclipse",
    tradition: "dark",
    name: "Corona del fin",
    subtitle: "Apocalipsis · último sol",
    description:
      "Eclipse solar total con corona concéntrica de rayos grabados sobre cielo de obsidiana y un horizonte resquebrajado al pie.",
    palette: {
      name: "Obsidiana y cobre",
      paper: "#1c1e21",
      ornament: "#cfa574",
      detail: "#d97343",
      ink: "#f2eadc",
    },
  },

  // ── Ironía y sátira (4) ──────────────────────────────────────────────────
  {
    id: "p_epitaph",
    tradition: "satire",
    name: "Lápida de mármol",
    subtitle: "Epitafio · solemnidad dudosa",
    description:
      "Estela de piedra con molduras escalonadas, arco biselado, grieta diagonal y una flor pequeña que desarma toda gravedad excesiva.",
    palette: {
      name: "Caliza y liquen",
      paper: "#e8e4da",
      ornament: "#54544c",
      detail: "#8f7a56",
      ink: "#2b2c27",
    },
  },
  {
    id: "p_obituary",
    tradition: "satire",
    name: "Esquela de primera",
    subtitle: "Luto editorial · humor negro",
    description:
      "Orla fúnebre decimonónica de filete grueso, esquinas cóncavas con rosetas, moño formal y remate tipográfico para despedidas mordaces.",
    palette: {
      name: "Luto tipográfico",
      paper: "#f2ede1",
      ornament: "#2b2926",
      detail: "#856b58",
      ink: "#24221f",
    },
  },
  {
    id: "p_dossier",
    tradition: "satire",
    name: "Trámite aprobado",
    subtitle: "Burocracia · sátira oficial",
    description:
      "Formulario oficial con pestaña de carpeta, casillas de verificación y un sello inclinado de goma roja listo para archivar cualquier absurdo.",
    palette: {
      name: "Manila y sello rojo",
      paper: "#ece1c8",
      ornament: "#525242",
      detail: "#a63d30",
      ink: "#333227",
    },
  },
  {
    id: "p_proscenium",
    tradition: "satire",
    name: "Pequeño teatro",
    subtitle: "Farsa · telón y comedia",
    description:
      "Embocadura de teatro con bambalina festoneada, cortinajes recogidos con borlas, candilejas al pie y dos máscaras neoclásicas para la ironía fina.",
    palette: {
      name: "Granate y candileja",
      paper: "#f2e5d9",
      ornament: "#7d343a",
      detail: "#b58943",
      ink: "#3d2125",
    },
  },

  // ── Romanticismo (3) ─────────────────────────────────────────────────────
  {
    id: "p_lancet",
    tradition: "romantic",
    name: "Ventanal de luna",
    subtitle: "Anhelo · arco ojival",
    description:
      "Ventana gótica ojival que abraza toda la composición con tracería de cuadrifolio, creciente lunar y estrellas discretas en lo alto.",
    palette: {
      name: "Azul de vigilia",
      paper: "#1b273d",
      ornament: "#a8c0d9",
      detail: "#cfa968",
      ink: "#f4eee0",
    },
  },
  {
    id: "p_blueflower",
    tradition: "romantic",
    name: "La flor nocturna",
    subtitle: "Novalis · lo inalcanzable",
    description:
      "Líneas botánicas sinuosas en las esquinas, creciente dorado y una flor azul de cinco pétalos abiertos bajo el cielo nocturno.",
    palette: {
      name: "Prusia y oro pálido",
      paper: "#182438",
      ornament: "#93b3d6",
      detail: "#d4b572",
      ink: "#f2ece0",
    },
  },
  {
    id: "p_ruins",
    tradition: "romantic",
    name: "Columnas e hiedra",
    subtitle: "Nostalgia · ruina viva",
    description:
      "Pilastras clásicas estriadas con capiteles erosionados y guías de hiedra que ascienden sobre el mármol tibio.",
    palette: {
      name: "Travertino y hiedra",
      paper: "#efe5d3",
      ornament: "#6b6251",
      detail: "#9c563b",
      ink: "#383127",
    },
  },

  // ── Misticismo (3) ───────────────────────────────────────────────────────
  {
    id: "p_astrolabe",
    tradition: "mystic",
    name: "Astrolabio interior",
    subtitle: "Contemplación · cielo oculto",
    description:
      "Anillos armilares, graduaciones cardinales y un eclipse dorado sobre tinta ciruela profunda para textos de introspección y misterio.",
    palette: {
      name: "Ciruela y latón",
      paper: "#282230",
      ornament: "#c8b08a",
      detail: "#e6d2aa",
      ink: "#f4ece0",
    },
  },
  {
    id: "p_sanctuary",
    tradition: "mystic",
    name: "Pórtico de luz",
    subtitle: "Revelación · geometría sagrada",
    description:
      "Triple arco concéntrico con vesica piscis luminosa en la clave y gradas ascendentes al pie sobre papel de cal y oro.",
    palette: {
      name: "Cal y dorado",
      paper: "#f2ece0",
      ornament: "#8c744c",
      detail: "#ad643d",
      ink: "#3b3328",
    },
  },
  {
    id: "p_veil",
    tradition: "mystic",
    name: "Tras el velo",
    subtitle: "Silencio · lo secreto",
    description:
      "Pliegues de lino que se apartan simétricamente alrededor de una estrella de ocho puntas y borlas finas en la base.",
    palette: {
      name: "Lino y sombra",
      paper: "#f1e8e2",
      ornament: "#84665c",
      detail: "#b38847",
      ink: "#42302c",
    },
  },

  // ── Espera y vacío (3) ───────────────────────────────────────────────────
  {
    id: "p_windowlight",
    tradition: "absence",
    name: "Luz sobre el suelo",
    subtitle: "Espera · habitación vacía",
    description:
      "Minimalismo arquitectónico: un marco casi invisible y el trapecio oblicuo de una ventana proyectado sobre el suelo silencioso.",
    palette: {
      name: "Yeso y penumbra",
      paper: "#e9e6de",
      ornament: "#6d6b62",
      detail: "#9c856b",
      ink: "#30302b",
    },
  },
  {
    id: "p_cadence",
    tradition: "absence",
    name: "Pausa y silencio",
    subtitle: "Fragmento · mínima huella",
    description:
      "Filetes interrumpidos con precisión editorial, tres puntos de suspensión y líneas de respiración que se atenúan hacia el borde.",
    palette: {
      name: "Carbón y tiza",
      paper: "#262624",
      ornament: "#bdb7a8",
      detail: "#d4bd98",
      ink: "#f2ece0",
    },
  },
  {
    id: "p_wintertree",
    tradition: "absence",
    name: "Rama de invierno",
    subtitle: "Persistencia · paisaje quieto",
    description:
      "Un árbol desnudo dibujado con sobriedad caligráfica sobre un horizonte abierto, equilibrado por una luna diminuta en el cielo vacío.",
    palette: {
      name: "Ceniza clara",
      paper: "#ebe7de",
      ornament: "#5d5b53",
      detail: "#9e8669",
      ink: "#31302b",
    },
  },

  // ── Francesa · Máximas (3) ───────────────────────────────────────────────
  {
    id: "p_aldine",
    tradition: "french",
    name: "Edición Aldina · s. XVI",
    subtitle: "Montaigne · portada humanista",
    description:
      "Portada renacentista de triple filete, florones esquineros de imprenta, cabecera arabesca simétrica y colofón grabado para ensayos y máximas.",
    palette: {
      name: "Rubrica veneciana",
      paper: "#f2e7cf",
      ornament: "#6b3124",
      detail: "#a38348",
      ink: "#31231d",
    },
  },
  {
    id: "p_salon",
    tradition: "french",
    name: "Salón de máximas · s. XVII",
    subtitle: "Pascal & La Rochefoucauld",
    description:
      "Esquinas cóncavas con volutas de salón, doble filete interior, cartela ovalada en la cabecera y remate de rocalla al pie.",
    palette: {
      name: "Nogal y Versalles",
      paper: "#f5f0e3",
      ornament: "#594637",
      detail: "#ad8647",
      ink: "#2d2520",
    },
  },
  {
    id: "p_enlightenment",
    tradition: "french",
    name: "Lámina ilustrada · s. XVIII",
    subtitle: "Enciclopedia · rigor y claridad",
    description:
      "Borde neoclásico de grabado en cobre con rosetas esquineras, medallón geométrico en la cabecera y doble filete de precisión al pie.",
    palette: {
      name: "Azul enciclopedia",
      paper: "#edf0f2",
      ornament: "#314d5e",
      detail: "#9c7e52",
      ink: "#223642",
    },
  },

  // ── Caminantes (3) ───────────────────────────────────────────────────────
  {
    id: "p_cartography",
    tradition: "wanderer",
    name: "Carta de ruta",
    subtitle: "Viaje · rumbos y escalas",
    description:
      "Borde cartográfico de meridianos alternos, rosas de los vientos en las esquinas y un sendero discontinuo sobre escala gráfica al pie.",
    palette: {
      name: "Mapa y sepia",
      paper: "#f0e7d4",
      ornament: "#665c3e",
      detail: "#a85c38",
      ink: "#3a3626",
    },
  },
  {
    id: "p_naturalist",
    tradition: "wanderer",
    name: "Cuaderno de campo",
    subtitle: "Thoreau · observación",
    description:
      "Lámina de naturalista con esquineros de montaje, escala milimetrada lateral, ramitas prensadas y cartela de registro al pie.",
    palette: {
      name: "Musgo y cuaderno",
      paper: "#ecece0",
      ornament: "#435c3d",
      detail: "#9e7e47",
      ink: "#2b3b27",
    },
  },
  {
    id: "p_canopy",
    tradition: "wanderer",
    name: "Claro del bosque",
    subtitle: "Emerson · luz entre ramas",
    description:
      "Copas orgánicas en capas de profundidad al pie, troncos sutiles en los márgenes y un sol dorado que filtra rayos por el claro superior.",
    palette: {
      name: "Pino y resolana",
      paper: "#1d362e",
      ornament: "#bcc497",
      detail: "#d6b26e",
      ink: "#f4ede0",
    },
  },

  // ── Persa (3) ────────────────────────────────────────────────────────────
  {
    id: "p_girih",
    tradition: "persian",
    name: "Cúpula de Girih",
    subtitle: "Geometría · estrellas entrelazadas",
    description:
      "Cenefa iluminada de lacería geométrica en oro, rosetones shamsa en las cuatro esquinas y remates apuntados en el eje central.",
    palette: {
      name: "Noche de Samarcanda",
      paper: "#102a30",
      ornament: "#c9a259",
      detail: "#e3cfa0",
      ink: "#f6efde",
    },
  },
  {
    id: "p_ispahan",
    tradition: "persian",
    name: "Arco de Ispahán",
    subtitle: "Manuscrito · mihrab y jardín",
    description:
      "Arco persa lobulado que envuelve el poema, enjutas con follaje entrelazado, medallón superior y dos cipreses simétricos en la base.",
    palette: {
      name: "Jade y azafrán",
      paper: "#eceee1",
      ornament: "#355447",
      detail: "#b88a44",
      ink: "#23382e",
    },
  },
  {
    id: "p_lacquer",
    tradition: "persian",
    name: "Encuadernación real",
    subtitle: "Lapislázuli · oro y cenefa",
    description:
      "Inspirado en las cubiertas safávidas: cenefa trenzada, esquinas lobuladas de filigrana y medallones toranj enlazados en oro sobre lapislázuli.",
    palette: {
      name: "Lapislázuli real",
      paper: "#1b2f47",
      ornament: "#cca966",
      detail: "#e5d8b8",
      ink: "#f5eedf",
    },
  },

  // ── Japonesa (3) ─────────────────────────────────────────────────────────
  {
    id: "p_seigaiha",
    tradition: "japanese",
    name: "Olas y kintsugi",
    subtitle: "Ukiyo-e · índigo y laca",
    description:
      "Bandas limpias de olas seigaiha en los extremos, filete índigo con uniones finas en las esquinas y sello hanko bermellón en el pie.",
    palette: {
      name: "Aizome y bermellón",
      paper: "#f2eee2",
      ornament: "#223d57",
      detail: "#b04434",
      ink: "#1f3548",
    },
  },
  {
    id: "p_byobu",
    tradition: "japanese",
    name: "Biombo de grullas",
    subtitle: "Byōbu · nubes y vuelo",
    description:
      "Franjas de niebla dorada suyari-gasumi propias de los biombos clásicos, un sol bermellón sereno y dos grullas estilizadas cruzando el papel.",
    palette: {
      name: "Biombo y cinabrio",
      paper: "#f4ecda",
      ornament: "#3d423c",
      detail: "#b34a39",
      ink: "#2b302b",
    },
  },
  {
    id: "p_bamboo",
    tradition: "japanese",
    name: "Tinta y bambú",
    subtitle: "Sumi-e · calma del pincel",
    description:
      "Cañas articuladas de bambú en el margen izquierdo con hojas de trazo limpio, luna tenue de aguada y sello rojo al pie.",
    palette: {
      name: "Washi y sumi",
      paper: "#f4f0e2",
      ornament: "#2d3430",
      detail: "#aa4236",
      ink: "#262c28",
    },
  },

  // ── Mexicana (3) ─────────────────────────────────────────────────────────
  {
    id: "p_cempasuchil",
    tradition: "mexican",
    name: "Altar de cempasúchil",
    subtitle: "Ofrenda · pétalos y memoria",
    description:
      "Rosetas densas de cempasúchil en las cuatro esquinas unidas por guías vegetales y pétalos sueltos que acompañan la memoria.",
    palette: {
      name: "Copal y cempasúchil",
      paper: "#f5ead7",
      ornament: "#c26a27",
      detail: "#2e5440",
      ink: "#422f22",
    },
  },
  {
    id: "p_papelpicado",
    tradition: "mexican",
    name: "Papel picado de gala",
    subtitle: "Fiesta · calado tradicional",
    description:
      "Marco calado con cenefa geométrica perforada, orilla festoneada en picos y rosetones simétricos inspirados en el arte popular mexicano.",
    palette: {
      name: "Bugambilia y crema",
      paper: "#f7ecda",
      ornament: "#7a325c",
      detail: "#c2486b",
      ink: "#4a243b",
    },
  },
  {
    id: "p_xilografia",
    tradition: "mexican",
    name: "Xilografía popular",
    subtitle: "Grabado · sol y follaje",
    description:
      "Borde grabado en alto contraste con achurados diagonales, soles radiantes en las esquinas y viñetas de xilografía en cabecera y pie.",
    palette: {
      name: "Tinta de grabado",
      paper: "#ede2cb",
      ornament: "#2e2e27",
      detail: "#9e4e2e",
      ink: "#262721",
    },
  },

  // ── Zen (3) ──────────────────────────────────────────────────────────────
  {
    id: "p_enso",
    tradition: "zen",
    name: "Ensō en washi",
    subtitle: "Vacío · trazo único",
    description:
      "Círculo ensō abierto de grosor orgánico con vetas de pincel seco rodeando el texto, acompañado de un pequeño sello de contemplación.",
    palette: {
      name: "Piedra y tinta",
      paper: "#f0ece1",
      ornament: "#3d423a",
      detail: "#a8764b",
      ink: "#2d332c",
    },
  },
  {
    id: "p_karesansui",
    tradition: "zen",
    name: "Jardín seco",
    subtitle: "Karesansui · grava y piedra",
    description:
      "Surcos de grava rastrillada en ondas concéntricas alrededor de tres piedras serenas que dejan un amplio claro central para el poema.",
    palette: {
      name: "Grava de Kioto",
      paper: "#eee9dd",
      ornament: "#787565",
      detail: "#495248",
      ink: "#333830",
    },
  },
  {
    id: "p_lotus",
    tradition: "zen",
    name: "Loto en quietud",
    subtitle: "Alba · agua y silencio",
    description:
      "Flor de loto en pétalos finos emergiendo sobre ondas serenas de agua, bajo un halo lunar y un marco lineal casi ingrávido.",
    palette: {
      name: "Alba de loto",
      paper: "#f4ece6",
      ornament: "#8c6269",
      detail: "#8c8554",
      ink: "#4a3a3e",
    },
  },

  // ── Naturaleza (3) ───────────────────────────────────────────────────────
  {
    id: "p_botanical",
    tradition: "nature",
    name: "Lámina botánica",
    subtitle: "Herbario · estudio de flora",
    description:
      "Plancha botánica de colección con doble filete ingletado, frondas de helecho y hojas de ginkgo delicadamente nervadas en esquinas opuestas.",
    palette: {
      name: "Pino de herbario",
      paper: "#edf0e4",
      ornament: "#38573e",
      detail: "#9e8249",
      ink: "#273d2c",
    },
  },
  {
    id: "p_willow",
    tradition: "nature",
    name: "Cortina de sauce",
    subtitle: "Ribera · brisa sobre el agua",
    description:
      "Ramas colgantes de sauce que caen suavemente desde el ángulo superior hacia ondas tranquilas de agua y una hoja a la deriva.",
    palette: {
      name: "Ribera de jade",
      paper: "#e9f0e4",
      ornament: "#3a665c",
      detail: "#a67f4c",
      ink: "#26423b",
    },
  },
  {
    id: "p_meadow",
    tradition: "nature",
    name: "Pradera al alba",
    subtitle: "Estaciones · flora silvestre",
    description:
      "Espigas, umbelas, amapolas y hierbas silvestres dibujadas en línea fina a lo largo de la base, con motas de luz en la parte superior.",
    palette: {
      name: "Miel de pradera",
      paper: "#f5eedc",
      ornament: "#586942",
      detail: "#b5853b",
      ink: "#3a452d",
    },
  },

  // ── Taoísta (3) ──────────────────────────────────────────────────────────
  {
    id: "p_watercourse",
    tradition: "tao",
    name: "El curso sereno",
    subtitle: "Wu wei · fluir sin fuerza",
    description:
      "Corrientes de agua en trazos sedosos a lo largo de los costados, remolinos suaves, luna alta y una hoja que sigue el cauce.",
    palette: {
      name: "Jade y corriente",
      paper: "#e8efe6",
      ornament: "#39635a",
      detail: "#a6814e",
      ink: "#26423c",
    },
  },
  {
    id: "p_harmony",
    tradition: "tao",
    name: "Círculo de opuestos",
    subtitle: "Yin y yang · equilibrio",
    description:
      "Arcos complementarios en cabecera y pie, taijitu grabado con marcas cardinales y un balance silencioso entre lleno y vacío.",
    palette: {
      name: "Tinta y celadón",
      paper: "#f1efe3",
      ornament: "#2b4440",
      detail: "#a6864f",
      ink: "#253b37",
    },
  },
  {
    id: "p_ruyi",
    tradition: "tao",
    name: "Nubes auspiciosas",
    subtitle: "Xiangyun · cielo abierto",
    description:
      "Nubes tradicionales en espiral ruyi desplegadas en las esquinas, cintas de viento y grecas discretas que dejan respirar el centro.",
    palette: {
      name: "Celadón de nube",
      paper: "#eef2e9",
      ornament: "#567569",
      detail: "#a88e60",
      ink: "#344d43",
    },
  },

  // ── Montaña (3) ──────────────────────────────────────────────────────────
  {
    id: "p_topography",
    tradition: "mountain",
    name: "Mapa topográfico",
    subtitle: "Relieve · curvas de nivel",
    description:
      "Curvas de nivel concéntricas en las esquinas, graduaciones cartográficas, sendero punteado de ascenso y vértice geodésico al pie.",
    palette: {
      name: "Relieve de otoño",
      paper: "#f0ead9",
      ornament: "#6d6e4f",
      detail: "#a65f3c",
      ink: "#3c4030",
    },
  },
  {
    id: "p_shanshui",
    tradition: "mountain",
    name: "Cumbres en bruma",
    subtitle: "Shan-shui · niebla y tinta",
    description:
      "Cordilleras superpuestas en veladuras de tinta, franjas luminosas de neblina, un pino solitario en la ladera y luna pálida en lo alto.",
    palette: {
      name: "Bruma de montaña",
      paper: "#eaeee6",
      ornament: "#476359",
      detail: "#a38354",
      ink: "#2b4039",
    },
  },
  {
    id: "p_glacier",
    tradition: "mountain",
    name: "Arista glacial",
    subtitle: "Alta cumbre · hielo y estrella",
    description:
      "Picos facetados con sombreado grabado de nieve y roca al pie, cristal hexagonal en el cenit y escuadras limpias de altitud.",
    palette: {
      name: "Hielo de altura",
      paper: "#e8f0f3",
      ornament: "#47697d",
      detail: "#9c8568",
      ink: "#294252",
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

export type ProposalTemplateId = (typeof proposalTemplates)[number]["id"];

export const proposalClearance: Record<ProposalTemplateId, number> = {
  p_sewnletter: 145,
  p_ravinerifle: 165,
  p_tinbowl: 155,
  p_redactedfile: 155,
  p_broadside: 145,
  p_assembly: 155,
  p_cancionero: 140,
  p_doleances: 145,
  p_shift: 150,
  p_shuttle: 145,
  p_press: 135,
  p_hammock: 155,
  p_longtable: 150,
  p_courtyard: 145,
  p_thorn: 150,
  p_vanitas: 165,
  p_anatomy: 165,
  p_eclipse: 175,
  p_epitaph: 165,
  p_obituary: 150,
  p_dossier: 155,
  p_proscenium: 175,
  p_lancet: 175,
  p_blueflower: 155,
  p_ruins: 160,
  p_astrolabe: 165,
  p_sanctuary: 165,
  p_veil: 155,
  p_windowlight: 145,
  p_cadence: 120,
  p_wintertree: 150,
  p_aldine: 140,
  p_salon: 155,
  p_enlightenment: 135,
  p_cartography: 145,
  p_naturalist: 150,
  p_canopy: 175,
  p_girih: 145,
  p_ispahan: 160,
  p_lacquer: 150,
  p_seigaiha: 145,
  p_byobu: 150,
  p_bamboo: 145,
  p_cempasuchil: 150,
  p_papelpicado: 150,
  p_xilografia: 145,
  p_enso: 162,
  p_karesansui: 150,
  p_lotus: 165,
  p_botanical: 150,
  p_willow: 160,
  p_meadow: 165,
  p_watercourse: 150,
  p_harmony: 160,
  p_ruyi: 150,
  p_topography: 140,
  p_shanshui: 185,
  p_glacier: 165,
};
