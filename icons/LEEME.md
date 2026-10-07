# Chirimbolo · logo

Colores: fondo `#f3ebdc` · etiqueta `#a8322a` · cordel `#16202c` · letra `#f3ebdc`.
La C y el rótulo están convertidos en trazados (IM Fell English), así que los SVG no dependen de ninguna fuente.

## Archivos

| Archivo | Uso |
|---|---|
| `chirimbolo.svg` | Icono principal, esquinas redondeadas (favicon SVG y tarjeta en Almanaque) |
| `chirimbolo-cuadrado.svg` | Icono a sangre, sin esquinas (iOS ya las redondea) |
| `chirimbolo-maskable.svg` | Versión con margen de seguridad para Android |
| `chirimbolo-marca.svg` / `.png` | Icono con el nombre debajo, como en Gentilicio |
| `icon-512.png`, `icon-192.png` | Iconos del manifest de la PWA |
| `icon-maskable-512.png` | Icono maskable del manifest |
| `apple-touch-icon.png` | Icono de 180 px para iPhone |
| `favicon.ico`, `favicon-32.png` | Favicon para navegadores |

## Prompt para Claude Code

> En el repositorio de Chirimbolo, copia los archivos de esta carpeta en `icons/` (y `favicon.ico` en la raíz). Enlázalos en el `<head>` de `index.html` y en `manifest.webmanifest` como se indica en LEEME.md, con `theme_color` y `background_color` en `#f3ebdc`. Después añade Chirimbolo a la portada de Almanaque usando `icons/chirimbolo.svg`, con el mismo formato que el resto de juegos.

## `<head>`

```html
<link rel="icon" href="favicon.ico" sizes="any">
<link rel="icon" href="icons/chirimbolo.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
<link rel="manifest" href="manifest.webmanifest">
<meta name="theme-color" content="#f3ebdc">
```

## `manifest.webmanifest` (fragmento)

```json
"icons": [
  { "src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
  { "src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
  { "src": "icons/icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
],
"theme_color": "#f3ebdc",
"background_color": "#f3ebdc"
```
