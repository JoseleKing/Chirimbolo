# Chirimbolo

¿Cómo se llama esta cosa? Juego diario de palabras precisas del español: cada día hay tres
láminas, las mismas para todos, con una parte señalada por un punto rojo. Hay que elegir su
nombre entre cuatro palabras, con un solo intento. Forma parte de la colección de
[Almanaque](https://joseleking.github.io/Almanaque/).

Es una web estática (HTML, CSS y JavaScript, sin frameworks ni compilación), lista para
GitHub Pages e instalable como aplicación (PWA).

## Reglas

- Tres láminas al día, de menos a más difícil: **fácil**, **media** y **difícil**.
- Al responder aparece la ficha de diccionario: definición breve y una curiosidad.
- El reto cambia a medianoche, hora de Madrid. El día nº 1 es el 7 de octubre de 2026
  (`INICIO` en `app.js`).
- La racha cuenta los días seguidos en que se juegan las tres láminas, se acierte o no.
- Resultado para compartir: `Chirimbolo nº 4 ▰▰▱ 2/3 aciertos` y el enlace (▰ acierto, ▱ fallo).

## Archivos

| Archivo | Contenido |
| --- | --- |
| `index.html` | Estructura de la página, portada y «Cómo se juega» |
| `styles.css` | Estética de lámina de diccionario (con modo oscuro; la lámina sigue en crema) |
| `app.js` | Lógica: reto del día, opciones, ficha, racha, compartir, cuenta atrás |
| `data/dias.js` | El contenido: palabras, definiciones, curiosidades y dibujos SVG |
| `manifest.webmanifest`, `sw.js` | Instalación como aplicación y uso sin conexión |
| `volver-almanaque.js` | Enlace de vuelta a Almanaque (copia de `Almanaque/para-los-juegos/`) |
| `favicon.ico`, `icons/` | Logo (ver `icons/LEEME.md`) |

## Probar en local

```sh
python3 -m http.server 8000
```

y abrir <http://localhost:8000>. Desde el móvil, en la misma red, usa la IP del Mac
(por ejemplo `http://192.168.1.20:8000`).

- `?dia=3` abre el reto del día 3 en **modo prueba**: las respuestas no se guardan ni cuentan
  para la racha, y las flechas ‹ › pasan de un día a otro.
- `?reiniciar` (solo en local) borra la partida, la racha y el aviso de instrucciones.

## Añadir días

Edita solo `data/dias.js`: cada día es una lista de tres partidas (fácil, media, difícil). Los
campos están explicados al principio del archivo. Los dibujos se trazan sobre un lienzo de
240 × 180; `senal` es dónde va el punto rojo y `rotulo`, dónde acaba la línea de llamada.

Antes de añadir una palabra, compruébala en el [DLE](https://dle.rae.es) y evita distractores
que sean sinónimos de la respuesta (por ejemplo, *jarrete* para *corva*).

**El orden importa.** El día *n* usa el día `(n − 1) % DIAS.length` del archivo; al acabarse, el
ciclo vuelve a empezar. Una vez publicado, añade los días nuevos al final y no reordenes ni
borres los anteriores.

Después de cambiar archivos, sube `VERSION` en `sw.js` para que los móviles con la app
instalada reciban la versión nueva.

## Publicar en GitHub Pages

1. Sube el repositorio a GitHub (`JoseleKing/Chirimbolo`).
2. En **Settings → Pages**, elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`.
3. En un par de minutos estará en <https://joseleking.github.io/Chirimbolo/>.

## Créditos

Definiciones redactadas a partir del *Diccionario de la lengua española* (RAE).
Tipografías: IM Fell English (Igino Marini) y EB Garamond, de Google Fonts (OFL).
