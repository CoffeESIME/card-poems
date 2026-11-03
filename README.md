# Folio · Taller de poesía visual

Editor local para componer poemas con 21 marcos vectoriales en siete colecciones: Persa, Japonesa, Mexicana, Zen, Naturaleza, Taoísta y Montaña. React + TypeScript + Vite. Sin cuentas, backend, imágenes remotas ni servicios obligatorios durante el uso.

## Iniciar

Requiere Node.js 22 o posterior y npm. La primera instalación descarga las dependencias y las fuentes de npm.

```powershell
npm install
npm run dev
```

Abre la dirección que imprime Vite, normalmente <http://127.0.0.1:5173/>. Mantén la terminal abierta mientras utilizas el editor. Usa siempre el mismo navegador y dirección para recuperar tus diseños.

```powershell
npm test          # Pruebas del motor y del texto
npm run build    # Comprobar TypeScript y generar dist/
npm run preview  # Servir la compilación de producción
```

`dist/` puede servirse desde cualquier servidor estático. No abras `index.html` directamente con `file://`: las fuentes y los módulos necesitan HTTP. Una vez instaladas las dependencias, el editor funciona sin conexión a servicios externos; todos los recursos se sirven localmente.

## Uso

1. Elige un estilo o tradición y uno de sus tres marcos. El poema se conserva al cambiar de marco.
2. Escribe el poema, título y autoría. Se conservan versos y estrofas; los versos demasiado anchos se dividen según el ancho real de la fuente.
3. Ajusta tipografía, alineación, interlineado, espacio entre letras y posición. La dirección se detecta automáticamente o puede fijarse en los ajustes avanzados.
4. En **Ornamento**, cambia los cuatro colores, grosor, márgenes, escala, densidad, opacidad, posición y visibilidad de las capas. **Restablecer** recupera los ajustes del marco y conserva el poema.
5. Selecciona cuadrado 1080 × 1080, historia 1080 × 1920 o retrato 1080 × 1350. Las guías del formato historia incluyen una zona segura orientativa para Reels y TikTok.
6. **Exportar** descarga PNG, SVG o JPEG. Las guías nunca aparecen en la exportación. El SVG incluye las fuentes necesarias y conserva el texto como texto vectorial editable.
7. **Guardar composición** añade el diseño a **Mis composiciones**, donde puedes nombrarlo, duplicarlo y volver a editarlo. **Guardar marco y paleta** crea un preset personal.

El borrador se guarda automáticamente. La biblioteca y los presets usan `localStorage`, con claves versionadas `folio:*:v1`. Borrar los datos del navegador borra estos diseños. Exporta las imágenes que quieras conservar fuera del navegador. No hay sincronización entre dispositivos.

Los textos muy largos se reducen automáticamente para caber. Si aun así superan el área de lectura, el editor avisa y detiene la exportación para evitar un poema recortado. Las guías sociales son orientativas: las interfaces de las plataformas pueden variar.

## Biblioteca ornamental

| Tradición  | Marcos                                                          |
| ---------- | --------------------------------------------------------------- |
| Persa      | Jardín de estrellas · Manuscrito persa · Geometría infinita     |
| Japonesa   | Silencio · Olas eternas · Papel y tinta                         |
| Mexicana   | Cempasúchil · Papel picado · Grabado de la memoria              |
| Zen        | Círculo del instante · Jardín de grava · Loto al alba           |
| Naturaleza | Herbario · Sauce junto al agua · Pradera de luz                 |
| Taoísta    | El curso del agua · La quietud de los opuestos · Nubes errantes |
| Montaña    | Cordillera · Valle de niebla · Senderos de altura               |

Los diseños usan estrellas de 8, 10 y 12 puntas, repeticiones seigaiha, tramas asanoha y shippo, curvas vegetales, flores radiales, recortes, rayados y ruido vectorial de papel. La ampliación añade círculos de tinta, surcos de grava, lotos, helechos con nervaduras, hojas de sauce, flores silvestres, cauces, taijitu, nubes, cumbres, capas de niebla y curvas de nivel generadas matemáticamente. Las dimensiones del lienzo recomponen las repeticiones y posiciones; no se estiran los ornamentos.

## Estructura

- `src/model.ts`: tipos, 21 plantillas, diez paletas generales, formatos y poemas originales de demostración.
- `src/Composition.tsx`: motor SVG, geometría, capas y disposición del texto. Es el mismo componente en vista previa, miniaturas, biblioteca y exportación.
- `src/LandscapeFrames.tsx`: las doce composiciones nuevas y sus motivos botánicos, paisajes y geometría contemplativa, organizados en las mismas tres capas decorativas.
- `src/text.ts`: división de versos con conservación de estrofas y caracteres Unicode.
- `src/fonts.ts`: fuentes locales y selección de subconjuntos Unicode para incrustación.
- `src/export.ts`: serialización SVG, fuentes incrustadas y rasterización a resolución nativa.
- `src/storage.ts`: persistencia y recuperación del borrador.
- `src/App.tsx`: interacción del editor y biblioteca local.
- `src/style.css`: diseño editorial, estados accesibles y adaptación a móvil.
- `src/engine.test.tsx`: pruebas de geometría, referencias SVG, formatos, Unicode y conservación del poema.
- `src/qa-gallery.tsx`: entrada de revisión visual; no se incluye en el build de producción. Durante desarrollo, `/.qa/index.html` muestra los 21 marcos en cuadrado y vertical; `/.qa/index.html?landscapes` muestra únicamente los doce nuevos.
- `docs/`: capturas de revisión y notas de validación.

Para incorporar otro marco, añade su identificador y metadatos en `model.ts`, su espacio de lectura en `readingInset` y su composición en `LandscapeFrames.tsx` (o en el motor original, `Composition.tsx`). Cada caso entrega tres capas: `pattern`, `frame` y `ornaments`. El resto del editor y los exportadores lo admiten sin modificaciones. Los motivos usan coordenadas locales y las dimensiones del formato para mantener sus proporciones. Los contadores y la numeración de la galería se calculan desde los metadatos.

## Tipografías y licencias

Cormorant Garamond, DM Sans, Noto Serif JP y Noto Naskh Arabic se distribuyen localmente mediante Fontsource, bajo sus licencias SIL Open Font License. Los paquetes originales incluyen sus archivos `LICENSE`; consulta `THIRD_PARTY_NOTICES.md`. Los iconos son de Lucide (ISC). Los marcos son geometría creada para este proyecto; no utilizan imágenes externas.

La verificación visual se realizó con Chromium integrado. La representación de fuentes y filtros en lectores SVG distintos puede variar; el PNG conserva el resultado rasterizado del navegador.
