# Validación del MVP

- `npm test`: nueve pruebas aprobadas. Renderizado de los 21 marcos en los tres formatos; todas las referencias SVG resueltas; siete colecciones completas e identificadores únicos; valores extremos de escala, densidad, márgenes y distribución de los nuevos motivos; geometría radial; espacio de lectura mínimo; conservación de texto al cambiar plantilla; estrofas, acentos, japonés, persa y caracteres fuera del plano básico; selección de subconjuntos de fuentes.
- `npm run build`: comprobación estricta de TypeScript y compilación de producción.
- Revisión visual de los nueve marcos en 1:1 y 9:16: `frame-library.jpg`.
- Ampliación: revisión de los doce nuevos marcos en 1:1 y 9:16, en `new-horizons.jpg`. Colecciones Zen, Naturaleza, Taoísta y Montaña.
- Las siete colecciones quedan visibles y dentro del ancho de una pantalla de 390 px, sin desbordamiento horizontal; captura en `expanded-mobile.jpg`.
- Descarga PNG real de Cordillera a 1080 × 1920 y revisión de la imagen. Descarga SVG de Senderos de altura a 1080 × 1080: XML válido, fuente incrustada, máscara de curvas de nivel y poema completo.
- Navegación real por el editor, selección de tradición, cambio de formato, edición inmediata de poema y autoría, capas, grosor, presets y restablecimiento.
- PNG descargado y abierto a 1080 × 1080; PNG japonés a 1080 × 1920; JPEG persa a 1080 × 1350. Texto y ornamentos visibles, fuentes correctas y escritura persa de derecha a izquierda.
- SVG descargado a 1080 × 1920: XML válido, fuentes incrustadas como datos, texto japonés conservado y ausencia de guías sociales.
- Guardado, duplicación y recuperación tras recargar el navegador.
- Vista móvil a 390 × 844: sin desbordamiento horizontal ni controles ocultos; captura completa en `mobile-preview.jpg`.
- Consola del navegador sin errores ni advertencias en la sesión final.

Las capturas corresponden a datos de demostración. El almacenamiento pertenece a cada origen del navegador; `localhost` y `127.0.0.1` mantienen bibliotecas independientes.
