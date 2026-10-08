/* Chirimbolo · data/dias.js
   El contenido del juego: un día por elemento de DIAS, con tres partidas de menos a más difícil.

   Cada partida:
     palabra     La respuesta correcta, tal como aparece en el DLE.
     genero      «m.» o «f.», como en la ficha del diccionario.
     campo       Qué se ve en la lámina (sale al pie: «El zapato»).
     falsas      Tres distractores reales del mismo campo. Que no sean sinónimos de la respuesta.
     definicion  Definición breve, fiel al DLE.
     curiosidad  Etimología, uso, refrán…
     dibujo      Trazos SVG sobre un lienzo de 240 × 180. Tinta sin relleno por defecto;
                 class="f" rellena de crema oscuro, class="t" de tinta, class="fino" traza más fino
                 y class="oculto" dibuja a trazos (lo que no se ve).
     senal       [x, y] del punto rojo: la parte por la que se pregunta.
     rotulo      [x, y] del otro extremo de la línea de llamada (hacia un margen libre).

   El día n del juego usa DIAS[(n - 1) % DIAS.length]. Para añadir días, agrégalos al final
   y no reordenes los anteriores: cambiarías los retos de días ya jugados. */

const ZAPATO = `
  <path class="f" d="M22 140 L60 140 L62 156 L24 156 Z"/>
  <path d="M60 140 L216 140 Q226 140 226 132 L226 130 Q226 142 214 146 L62 146"/>
  <path d="M24 140 L22 92 C22 78 30 70 44 70 C62 72 80 80 96 78 L100 56 C102 48 116 48 118 56 L134 96 C168 104 200 112 218 122 C228 128 226 140 216 140 L60 140"/>
  <path class="fino" d="M26 98 C42 102 54 112 58 140"/>
  <path class="fino" d="M96 78 C110 96 126 104 138 102"/>
  <path class="fino" d="M190 114 C184 122 184 132 190 140"/>
  <circle class="fino" cx="104" cy="82" r="2.6"/><circle class="fino" cx="114" cy="87" r="2.6"/>
  <circle class="fino" cx="124" cy="92" r="2.6"/><circle class="fino" cx="133" cy="97" r="2.6"/>
  <path class="fino" d="M104 82 L124 92 M114 87 L133 97 M104 82 L114 87 M124 92 L133 97"/>
  <path class="fino" d="M104 82 C96 70 84 66 76 72 M104 82 C100 92 92 100 84 98"/>
  <path class="fino oculto" d="M30 136 L212 136"/>`;

const VILANO_CABEZA =
  'M125 74.9L161.8 78.6M161.8 78.6l8.5 -3.1M161.8 78.6l8.9 -1.1M161.8 78.6l9 0.9M161.8 78.6l8.5 2.8M161.8 78.6l7.7 4.7M124.3 77.4L158.6 91.3M158.6 91.3l9 -0.6M158.6 91.3l8.9 1.5M158.6 91.3l8.3 3.4M158.6 91.3l7.4 5.1M158.6 91.3l6 6.7M123 79.6L152 102.6M152 102.6l8.8 2M152 102.6l8.1 3.9M152 102.6l7 5.6M152 102.6l5.7 7M152 102.6l3.9 8.1M121.2 81.4L142.5 111.6M142.5 111.6l7.9 4.4M142.5 111.6l6.7 6M142.5 111.6l5.2 7.4M142.5 111.6l3.5 8.3M142.5 111.6l1.5 8.9M118.9 82.5L130.8 117.5M130.8 117.5l6.3 6.4M130.8 117.5l4.7 7.7M130.8 117.5l2.9 8.5M130.8 117.5l1 8.9M130.8 117.5l-1.1 8.9M116.4 83L118 120M118 120l4.3 7.9M118 120l2.3 8.7M118 120l0.4 9M118 120l-1.6 8.9M118 120l-3.6 8.3M113.8 82.7L104.9 118.7M104.9 118.7l1.9 8.8M104.9 118.7l-0.2 9M104.9 118.7l-2.2 8.7M104.9 118.7l-4 8.1M104.9 118.7l-5.7 6.9M111.5 81.8L92.8 113.7M92.8 113.7l-0.7 9M92.8 113.7l-2.7 8.6M92.8 113.7l-4.5 7.8M92.8 113.7l-6.1 6.6M92.8 113.7l-7.5 5M109.5 80.2L82.6 105.6M82.6 105.6l-3.2 8.4M82.6 105.6l-5 7.5M82.6 105.6l-6.5 6.2M82.6 105.6l-7.7 4.6M82.6 105.6l-8.6 2.7M108 78.1L75 94.9M75 94.9l-5.4 7.2M75 94.9l-6.9 5.7M75 94.9l-8 4.1M75 94.9l-8.7 2.2M75 94.9l-9 0.2M107.2 75.7L70.8 82.5M70.8 82.5l-7.2 5.3M70.8 82.5l-8.3 3.6M70.8 82.5l-8.8 1.7M70.8 82.5l-9 -0.3M70.8 82.5l-8.7 -2.4M107 73.1L70.2 69.4M70.2 69.4l-8.5 3.1M70.2 69.4l-8.9 1.1M70.2 69.4l-9 -0.9M70.2 69.4l-8.5 -2.8M70.2 69.4l-7.7 -4.7M107.7 70.6L73.4 56.7M73.4 56.7l-9 0.6M73.4 56.7l-8.9 -1.5M73.4 56.7l-8.3 -3.4M73.4 56.7l-7.4 -5.1M73.4 56.7l-6 -6.7M109 68.4L80 45.4M80 45.4l-8.8 -2M80 45.4l-8.1 -3.9M80 45.4l-7 -5.6M80 45.4l-5.7 -7M80 45.4l-3.9 -8.1M110.8 66.6L89.5 36.4M89.5 36.4l-7.9 -4.4M89.5 36.4l-6.7 -6M89.5 36.4l-5.2 -7.4M89.5 36.4l-3.5 -8.3M89.5 36.4l-1.5 -8.9M113.1 65.5L101.2 30.5M101.2 30.5l-6.3 -6.4M101.2 30.5l-4.7 -7.7M101.2 30.5l-2.9 -8.5M101.2 30.5l-1 -8.9M101.2 30.5l1.1 -8.9M115.6 65L114 28M114 28l-4.3 -7.9M114 28l-2.3 -8.7M114 28l-0.4 -9M114 28l1.6 -8.9M114 28l3.6 -8.3M118.2 65.3L127.1 29.3M127.1 29.3l-1.9 -8.8M127.1 29.3l0.2 -9M127.1 29.3l2.2 -8.7M127.1 29.3l4 -8.1M127.1 29.3l5.7 -6.9M124 69.9L157 53.1M157 53.1l5.4 -7.2M157 53.1l6.9 -5.7M157 53.1l8 -4.1M157 53.1l8.7 -2.2M157 53.1l9 -0.2M124.8 72.3L161.2 65.5M161.2 65.5l7.2 -5.3M161.2 65.5l8.3 -3.6M161.2 65.5l8.8 -1.7M161.2 65.5l9 0.3M161.2 65.5l8.7 2.4';

const CANDELERO = `
  <path class="f" d="M80 170 C80 156 160 156 160 170 Z"/>
  <path d="M114 158 L114 104 M126 158 L126 104"/>
  <ellipse class="fondo" cx="120" cy="132" rx="10" ry="4"/>
  <ellipse class="f" cx="120" cy="100" rx="36" ry="6"/>
  <path class="fondo" d="M111 98 L111 88 L129 88 L129 98"/>
  <rect class="fondo" x="112" y="38" width="16" height="50"/>
  <path class="fino" d="M112 46 C116 50 118 44 122 48"/>
  <path class="fino" d="M120 4 C130 16 130 26 120 31 C110 26 110 16 120 4 Z"/>
  <path class="t" d="M118.8 30 L121.2 30 L121.2 38 L118.8 38 Z"/>`;

const OREJA = `
  <path class="fino" d="M70 14 C64 70 66 130 86 176"/>
  <path class="fondo" d="M100 46 C112 18 162 14 178 48 C192 78 180 106 168 120 C156 134 152 148 148 158 C142 172 124 174 116 164 C108 154 108 142 112 134 C102 122 96 100 100 46 Z"/>
  <path class="fino" d="M108 52 C120 32 156 30 166 54 C174 74 166 96 156 108"/>
  <path class="fino" d="M152 58 C158 78 152 98 140 110 C132 118 130 126 134 134"/>
  <path class="fino" d="M152 58 C142 54 128 56 120 64"/>
  <path class="f" d="M116 82 C122 72 136 74 142 84 C146 96 140 114 128 120 C118 124 110 110 112 98 Z"/>
  <path class="fondo" d="M104 92 C96 94 96 112 106 116 C110 110 110 98 104 92 Z"/>
  <ellipse class="t" cx="114" cy="104" rx="3" ry="5"/>
  <path class="fino" d="M126 134 C134 136 140 132 142 124"/>`;

const ESCALERA = `
  <path class="fino" d="M8 164 L232 164"/>
  <path class="f" d="M50 164 L50 136 L90 136 L90 108 L130 108 L130 80 L170 80 L170 52 L232 52 L232 164 Z"/>
  <path d="M10 164 L50 164 L50 136 L90 136 L90 108 L130 108 L130 80 L170 80 L170 52 L232 52"/>
  <rect class="fondo" x="44" y="132" width="16" height="7" rx="3"/>
  <rect class="fondo" x="84" y="104" width="16" height="7" rx="3"/>
  <rect class="fondo" x="124" y="76" width="16" height="7" rx="3"/>
  <rect class="fondo" x="164" y="48" width="16" height="7" rx="3"/>
  <path class="fino" d="M30 104 L206 16"/>
  <path class="fino" d="M70 136 L70 84 M110 108 L110 64 M150 80 L150 44 M190 52 L190 24"/>`;

const TONEL = `
  <path class="fino" d="M64 140 L56 172 M64 140 L74 172 M176 140 L168 172 M176 140 L186 172"/>
  <path class="fondo" d="M44 60 C90 50 150 50 196 60 L196 132 C150 142 90 142 44 132 C36 112 36 80 44 60 Z"/>
  <path class="fino" d="M43 78 C90 70 150 70 196 78 M41 96 C90 92 150 92 198 96 M43 114 C90 118 150 118 196 114"/>
  <path d="M66 56 C60 80 60 112 66 136 M174 55 C180 80 180 112 174 137"/>
  <path d="M84 54 C80 80 80 112 84 139"/>
  <ellipse class="f" cx="196" cy="96" rx="12" ry="36"/>
  <path class="fino" d="M196 62 L196 130 M188 70 L188 122 M204 70 L204 122"/>
  <ellipse class="t" cx="120" cy="44" rx="7" ry="2.5"/>
  <path class="t" d="M115 44 L125 44 L124 52 L116 52 Z"/>`;

const GALLO = `
  <path class="fino" d="M76 104 C54 82 44 54 58 30 M74 110 C46 96 28 70 30 42 M76 118 C48 118 24 102 16 80 M80 124 C58 132 36 128 22 114"/>
  <path class="fondo" d="M76 108 C72 88 88 74 108 78 C120 64 118 52 114 44 C110 32 118 22 130 24 C140 26 144 36 142 46 L154 52 L142 56 C138 66 136 76 142 86 C152 102 150 126 130 138 C110 148 86 142 76 126 Z"/>
  <path class="f" d="M116 30 C112 16 120 14 124 22 C124 10 134 12 132 22 C138 12 146 18 140 30 C134 26 124 26 116 30 Z"/>
  <path class="f" d="M140 56 C144 66 138 72 132 66 C130 60 134 56 140 56 Z"/>
  <circle class="t" cx="133" cy="37" r="1.8"/>
  <path class="fino" d="M96 100 C104 112 116 116 128 112 M92 112 C102 124 116 128 130 122"/>
  <path d="M102 140 L100 166 M118 138 L120 166"/>
  <path d="M90 168 L100 166 L110 169 M110 169 L120 166 L130 169"/>
  <path class="t" d="M100.5 156 L92 154 L100.2 151 Z"/>`;

const COLUMNA = `
  <path class="f" d="M54 10 L186 10 L186 26 L54 26 Z"/>
  <path class="fino" d="M54 18 L186 18"/>
  <rect class="fondo" x="80" y="26" width="80" height="11"/>
  <path class="fondo" d="M88 37 L152 37 C150 48 142 53 134 55 L106 55 C98 53 90 48 88 37 Z"/>
  <path class="fino" d="M105 59 L135 59"/>
  <path class="fondo" d="M105 55 L135 55 L139 150 L101 150 Z"/>
  <path class="fino" d="M112 63 L110 148 M120 63 L120 148 M128 63 L130 148"/>
  <rect class="fondo" x="95" y="150" width="50" height="8" rx="4"/>
  <rect class="f" x="88" y="158" width="64" height="12"/>
  <path class="fino" d="M20 170 L220 170"/>`;

const BICICLETA = `
  <circle cx="60" cy="118" r="40"/><circle class="fino" cx="60" cy="118" r="35"/>
  <circle cx="182" cy="118" r="40"/><circle class="fino" cx="182" cy="118" r="35"/>
  <path class="fino" d="M60 118 L60 80 M60 118 L87 91 M60 118 L95 118 M60 118 L87 145 M60 118 L60 153 M60 118 L33 145 M60 118 L25 118 M60 118 L33 91"/>
  <path class="fino" d="M182 118 L182 80 M182 118 L209 91 M182 118 L217 118 M182 118 L207 143 M182 118 L182 153 M182 118 L157 143 M182 118 L147 118 M182 118 L155 91"/>
  <circle class="f" cx="60" cy="118" r="6"/><circle class="f" cx="182" cy="118" r="6"/>
  <path d="M60 118 L118 124 L100 66 L60 118 M100 66 L160 66 L118 124 M160 66 L182 118 M156 54 L160 66"/>
  <path d="M146 50 L166 50 M156 54 C160 46 170 44 176 46"/>
  <path class="f" d="M86 58 L114 58 L110 64 L92 64 Z"/>
  <path d="M100 64 L100 66"/>
  <circle class="fondo" cx="118" cy="124" r="12"/>
  <path class="mango" d="M118 124 L134 150"/>
  <path class="t" d="M126 148 L144 148 L144 154 L126 154 Z"/>`;

const TEJADO = `
  <path class="fino" d="M6 172 L234 172"/>
  <rect class="fondo" x="36" y="98" width="168" height="74"/>
  <rect class="f" x="58" y="116" width="26" height="30"/><path class="fino" d="M71 116 L71 146 M58 131 L84 131"/>
  <rect class="f" x="156" y="116" width="26" height="30"/><path class="fino" d="M169 116 L169 146 M156 131 L182 131"/>
  <path class="f" d="M108 172 L108 124 C108 116 132 116 132 124 L132 172"/>
  <path class="fondo" d="M14 94 L58 40 L182 40 L226 94 Z"/>
  <path class="fino" d="M38 94 L66 44 M62 94 L80 44 M86 94 L94 44 M110 94 L108 44 M134 94 L122 44 M158 94 L136 44 M182 94 L150 44 M206 94 L164 44"/>
  <path d="M56 40 C60 34 66 34 70 40 C74 34 80 34 84 40 C88 34 94 34 98 40 C102 34 108 34 112 40 C116 34 122 34 126 40 C130 34 136 34 140 40 C144 34 150 34 154 40 C158 34 164 34 168 40 C172 34 178 34 182 40"/>
  <path d="M14 94 L226 94"/>
  <path class="f" d="M20 94 a6 6 0 0 1 12 0 Z M44 94 a6 6 0 0 1 12 0 Z M68 94 a6 6 0 0 1 12 0 Z M92 94 a6 6 0 0 1 12 0 Z M116 94 a6 6 0 0 1 12 0 Z M140 94 a6 6 0 0 1 12 0 Z M164 94 a6 6 0 0 1 12 0 Z M188 94 a6 6 0 0 1 12 0 Z M212 94 a6 6 0 0 1 12 0 Z"/>
  <path class="fino" d="M32 94 a6 6 0 0 0 12 0 M56 94 a6 6 0 0 0 12 0 M80 94 a6 6 0 0 0 12 0 M104 94 a6 6 0 0 0 12 0 M128 94 a6 6 0 0 0 12 0 M152 94 a6 6 0 0 0 12 0 M176 94 a6 6 0 0 0 12 0 M200 94 a6 6 0 0 0 12 0"/>`;

const VID = `
  <path class="mango" d="M6 30 C60 22 120 36 234 24"/>
  <path class="fondo" d="M70 34 C58 40 44 50 50 64 C38 70 42 88 58 86 C60 100 78 102 84 90 C94 98 110 92 106 78 C118 72 116 56 102 56 C104 44 92 34 78 38 Z"/>
  <path class="fino" d="M74 34 L78 88 M76 50 L56 70 M77 62 L100 70 M76 50 L96 46"/>
  <path d="M150 32 L150 52"/>
  <circle class="fondo" cx="150" cy="108" r="7.5"/>
  <circle class="fondo" cx="143" cy="96" r="7.5"/><circle class="fondo" cx="157" cy="96" r="7.5"/>
  <circle class="fondo" cx="136" cy="84" r="7.5"/><circle class="fondo" cx="150" cy="84" r="7.5"/><circle class="fondo" cx="164" cy="84" r="7.5"/>
  <circle class="fondo" cx="129" cy="72" r="7.5"/><circle class="fondo" cx="143" cy="72" r="7.5"/><circle class="fondo" cx="157" cy="72" r="7.5"/><circle class="fondo" cx="171" cy="72" r="7.5"/>
  <circle class="fondo" cx="136" cy="60" r="7.5"/><circle class="fondo" cx="150" cy="58" r="7.5"/><circle class="fondo" cx="164" cy="60" r="7.5"/>
  <path d="M198 27 C206 40 218 44 218 58 C218 70 202 70 202 60 C202 52 212 52 212 60"/>
  <path class="fino" d="M206 30 C214 34 222 30 222 22 C222 16 214 16 215 22"/>`;

const GUITARRA = `
  <path class="fondo" d="M6 64 C6 36 54 34 70 54 C84 44 100 62 100 90 C100 118 84 136 70 126 C54 146 6 144 6 116 Z"/>
  <circle class="t" cx="56" cy="90" r="13"/>
  <rect class="f" x="18" y="80" width="8" height="20" rx="2"/>
  <rect class="fondo" x="96" y="80" width="110" height="20"/>
  <path class="fino" d="M112 80 L112 100 M127 80 L127 100 M141 80 L141 100 M154 80 L154 100 M166 80 L166 100 M177 80 L177 100 M187 80 L187 100 M196 80 L196 100"/>
  <path class="f" d="M206 74 L234 66 L234 114 L206 106 Z"/>
  <rect class="t" x="204" y="79" width="3.5" height="22"/>
  <path class="fino" d="M22 85 L234 85 M22 90 L234 90 M22 95 L234 95"/>
  <path d="M213 72 L213 64 M221 70 L221 62 M229 68 L229 60 M213 108 L213 116 M221 110 L221 118 M229 112 L229 120"/>
  <ellipse class="fondo" cx="213" cy="60" rx="4" ry="5"/><ellipse class="fondo" cx="221" cy="58" rx="4" ry="5"/><ellipse class="fondo" cx="229" cy="56" rx="4" ry="5"/>
  <ellipse class="fondo" cx="213" cy="120" rx="4" ry="5"/><ellipse class="fondo" cx="221" cy="122" rx="4" ry="5"/><ellipse class="fondo" cx="229" cy="124" rx="4" ry="5"/>`;

const CABALLO = `
  <path class="f" d="M56 84 C40 92 32 114 36 144 C44 126 48 108 58 96 Z"/>
  <path class="fino" d="M88 124 L96 150 L96 164 M150 124 L142 150 L144 164"/>
  <path class="fondo" d="M56 86 C58 70 90 66 120 70 L148 68 C158 52 174 36 188 28 L194 16 L200 26 C210 30 220 40 226 52 C228 60 222 64 214 60 L200 54 C192 62 184 76 178 94 C180 108 174 118 166 122 L162 150 L164 164 L154 164 L152 148 L150 124 C130 128 106 128 90 124 L84 150 L86 164 L76 164 L74 148 L70 120 C60 114 54 100 56 86 Z"/>
  <path class="f" d="M148 68 C158 52 174 36 188 28 L184 42 C174 50 164 60 156 74 Z"/>
  <path class="fino" d="M156 64 C150 70 146 76 146 82 M164 54 C158 60 154 66 152 72 M172 46 C166 52 162 58 160 64 M180 38 C174 44 170 50 168 56"/>
  <circle class="t" cx="206" cy="36" r="2"/>
  <path class="fino" d="M218 54 C220 50 224 50 224 54"/>
  <path class="t" d="M154 164 L165 164 L166 170 L153 170 Z M76 164 L87 164 L88 170 L75 170 Z"/>
  <path class="fino" d="M153 150 C146 152 144 158 148 164 M152 154 C147 157 146 162 149 166 M75 150 C69 152 67 158 71 164 M75 154 C70 157 69 162 72 166"/>`;

const SOMBRERO = `
  <path class="fondo" d="M64 112 C60 76 70 42 92 34 C106 42 134 42 148 34 C170 42 180 76 176 112 Z"/>
  <path class="fino" d="M92 34 C104 50 136 50 148 34 M120 46 L120 60"/>
  <path class="f" d="M65 96 C100 102 140 102 175 96 L176 112 C140 118 100 118 64 112 Z"/>
  <path class="fino" d="M150 100 L160 92 L162 110 Z"/>
  <path class="fondo" d="M10 118 C30 104 64 110 64 112 C100 120 140 120 176 112 C176 110 210 104 230 118 C206 136 34 136 10 118 Z"/>
  <path class="fino" d="M30 120 C80 130 160 130 210 120"/>`;

const LLAVE = `
  <circle class="fondo" cx="52" cy="90" r="27"/>
  <circle class="fondo" cx="52" cy="90" r="15"/>
  <path class="fino" d="M52 63 C60 74 60 106 52 117 M52 63 C44 74 44 106 52 117"/>
  <rect class="f" x="78" y="80" width="9" height="20" rx="2"/>
  <rect class="fondo" x="87" y="84" width="106" height="12"/>
  <rect class="f" x="104" y="82" width="6" height="16" rx="1"/>
  <path class="fondo" d="M150 96 L193 96 L193 140 L182 140 L182 128 L173 128 L173 140 L162 140 L162 120 L150 120 Z"/>
  <path class="fino" d="M156 104 L188 104"/>`;

const ARCO = `
  <path class="fino" d="M6 170 L234 170"/>
  <path class="fondo" d="M10 30 L230 30 L230 170 L170 170 L170 90 A78.1 78.1 0 0 0 70 90 L70 170 L10 170 Z"/>
  <path class="fino" d="M10 50 L46 50 M194 50 L230 50 M10 110 L70 110 M170 110 L230 110 M10 140 L70 140 M170 140 L230 140 M40 110 L40 140 M200 110 L200 140 M28 50 L28 30 M212 50 L212 30 M30 140 L30 170 M210 140 L210 170"/>
  <path d="M44 96 L70 96 L70 90 L54.6 71.6 L44 71.6 Z M196 96 L170 96 L170 90 L185.4 71.6 L196 71.6 Z"/>
  <path d="M54.6 71.6 A102.1 102.1 0 0 1 185.4 71.6"/>
  <path d="M82.8 81.3 L71.4 60.2 M97.1 75.3 L90 52.4 M142.9 75.3 L150 52.4 M157.2 81.3 L168.6 60.2"/>
  <path class="f" d="M112.3 72.3 L109.9 48.4 A102.1 102.1 0 0 1 130.1 48.4 L127.7 72.3 A78.1 78.1 0 0 0 112.3 72.3 Z"/>`;

const BARBO = `
  <path class="fondo" d="M34 96 L8 66 L16 96 L8 128 Z"/>
  <path class="f" d="M98 70 L114 38 L144 66 Z"/>
  <path class="fino" d="M106 66 L114 42 M118 66 L118 42 M130 66 L122 44"/>
  <path class="fondo" d="M30 96 C62 62 142 58 196 80 C206 84 212 90 214 96 C206 104 196 108 186 110 C140 128 70 130 30 100 Z"/>
  <path class="f" d="M84 118 L76 140 L104 122 Z M150 112 L146 136 L168 116 Z"/>
  <path d="M170 72 C160 84 160 100 172 112"/>
  <path class="fino" d="M178 76 C172 86 172 98 180 106"/>
  <path class="fino" d="M40 98 C80 92 130 92 170 94"/>
  <path class="fino" d="M60 84 a7 7 0 0 1 10 6 M76 80 a7 7 0 0 1 10 6 M92 78 a7 7 0 0 1 10 6 M108 77 a7 7 0 0 1 10 6 M124 77 a7 7 0 0 1 10 6 M140 78 a7 7 0 0 1 10 6 M68 104 a7 7 0 0 1 10 6 M84 104 a7 7 0 0 1 10 6 M100 104 a7 7 0 0 1 10 6 M116 104 a7 7 0 0 1 10 6 M132 104 a7 7 0 0 1 10 6"/>
  <circle class="fondo" cx="194" cy="86" r="5"/><circle class="t" cx="195" cy="86" r="2"/>
  <path d="M206 102 C208 114 202 122 194 126 M200 106 C198 116 192 122 184 124 M212 94 C222 92 228 98 228 106"/>`;

const HOJA = `
  <path class="fondo" d="M84 128 C70 80 118 28 214 24 C206 100 146 140 84 128 Z"/>
  <path d="M84 128 C120 100 160 66 210 28"/>
  <path class="fino" d="M104 112 C100 96 102 84 108 72 M124 96 C120 80 124 66 132 54 M146 80 C144 66 148 52 158 40 M168 62 C168 52 172 42 180 34 M104 112 C120 116 134 116 146 112 M124 96 C140 102 156 102 168 96 M146 80 C162 84 176 82 188 76"/>
  <path class="mango" d="M86 126 L40 170"/>`;

const VELERO = `
  <path d="M120 106 L120 10"/>
  <path class="f" d="M108 34 L132 34 L128 41 L112 41 Z"/>
  <path class="t" d="M120 10 L138 14 L120 18 Z"/>
  <path class="fondo" d="M116 46 L116 100 L38 100 C58 82 88 62 116 46 Z"/>
  <path class="fondo" d="M124 26 L234 88 L128 98 Z"/>
  <path class="mango" d="M210 100 L238 84"/>
  <path class="fondo" d="M26 104 L208 104 L224 96 C218 116 200 132 176 136 L62 136 C46 132 34 120 26 104 Z"/>
  <path class="fino" d="M34 114 L212 114"/>
  <path class="f" d="M84 136 L172 136 L162 152 L96 152 Z"/>
  <path class="fino" d="M120 40 L60 100 M120 40 L180 104"/>`;

const ANCLA = `
  <circle cx="120" cy="18" r="10"/>
  <rect class="f" x="78" y="36" width="84" height="8" rx="3"/>
  <circle class="t" cx="78" cy="40" r="4.5"/><circle class="t" cx="162" cy="40" r="4.5"/>
  <rect class="fondo" x="114" y="28" width="12" height="118"/>
  <path class="mango" d="M120 144 C96 152 70 142 58 116 M120 144 C144 152 170 142 182 116"/>
  <path class="t" d="M50 122 L42 98 L68 112 Z M190 122 L198 98 L172 112 Z"/>
  <path class="t" d="M114 146 L126 146 L120 156 Z"/>`;

const ESPADA = `
  <circle class="f" cx="22" cy="90" r="9"/>
  <path class="fondo" d="M30 84 C42 82 58 82 70 84 L70 96 C58 98 42 98 30 96 Z"/>
  <path class="fino" d="M36 84 L40 96 M44 84 L48 96 M52 84 L56 96 M60 84 L64 96"/>
  <path class="fondo" d="M70 86 L80 86 L80 94 L70 94 Z"/>
  <path class="f" d="M74 86 C74 70 70 58 62 50 C70 52 80 64 80 86 Z M74 94 C74 110 70 122 62 130 C70 128 80 116 80 94 Z"/>
  <path class="fondo" d="M80 84 L216 86 L234 90 L216 94 L80 96 Z"/>
  <path class="fino" d="M86 90 L214 90"/>`;

const HACHA = `
  <path class="fondo" d="M113 56 L127 56 L132 174 L110 174 Z"/>
  <path class="fino" d="M118 70 L116 168 M124 70 L126 168"/>
  <path class="fondo" d="M110 28 L52 12 C40 36 38 64 46 90 L110 60 Z"/>
  <path class="fino" d="M58 20 C50 42 50 66 56 82"/>
  <rect class="fondo" x="108" y="24" width="24" height="38" rx="3"/>
  <path class="fondo" d="M132 32 L166 34 L166 54 L132 56 Z"/>
  <path class="f" d="M162 34 L168 34 L168 54 L162 54 Z"/>`;

const DIAS = [
  /* ---------- Día 1 ---------- */
  [
    {
      palabra: 'herrete',
      genero: 'm.',
      campo: 'El cordón',
      falsas: ['ojete', 'lazada', 'vira'],
      definicion: 'Remate, generalmente de metal o plástico, que se pone en la punta de cordones y cintas para que entren con facilidad por los ojetes.',
      curiosidad: 'Viene de «hierro» y antes se hacían de metal, a veces de oro o con piedras. En las traducciones españolas de «Los tres mosqueteros», D’Artagnan corre a Londres a recuperar los herretes de diamantes de la reina.',
      dibujo: `
        <path class="f" d="M4 28 L48 20 L54 84 L8 92 Z"/>
        <circle cx="26" cy="38" r="5.5" class="fondo"/><circle cx="29" cy="68" r="5.5" class="fondo"/>
        <path class="cordon" d="M26 38 C70 26 66 122 118 114 C134 112 144 112 156 112"/>
        <path class="cordon" d="M29 68 C40 100 30 140 12 170"/>
        <path class="f" d="M156 106.5 L188 107.5 Q194 112 188 116.5 L156 117.5 Z"/>
        <path class="fino" d="M162 107 L162 117 M182 107.5 L182 116.5"/>`,
      senal: [174, 112],
      rotulo: [208, 156],
    },
    {
      palabra: 'ojal',
      genero: 'm.',
      campo: 'La camisa',
      falsas: ['ojete', 'presilla', 'jareta'],
      definicion: 'Hendidura, normalmente reforzada en sus bordes, por la que se pasa un botón para abrocharlo.',
      curiosidad: 'El de la solapa de la chaqueta suele no tener botón: es un recuerdo de cuando las solapas se cerraban sobre el cuello. Hoy sirve para lucir una insignia o la proverbial «flor en el ojal».',
      dibujo: `
        <path d="M20 48 L72 14 L120 34 L168 14 L220 48 L226 180 M14 180 L20 48"/>
        <path d="M72 14 L84 6 L120 18 L156 6 L168 14"/>
        <path class="f" d="M72 14 L120 34 L104 50 Z M168 14 L120 34 L136 50 Z"/>
        <path d="M110 40 L110 180 M132 40 L132 180"/>
        <path class="fino oculto" d="M114 44 L114 180 M128 44 L128 180"/>
        <rect x="117.5" y="58" width="7" height="22" rx="3.5" class="fondo"/>
        <path class="fino" d="M121 61 L121 77"/>
        <circle cx="121" cy="112" r="7"/><circle class="fino" cx="121" cy="150" r="7"/>
        <path class="fino" d="M118.5 110.5 h0.1 M123.5 110.5 h0.1 M118.5 113.5 h0.1 M123.5 113.5 h0.1"/>
        <path class="fino" d="M150 80 L192 80 L190 120 L170 128 L152 120 Z"/>
        <path class="fino oculto" d="M154 86 L188 86"/>`,
      senal: [121, 69],
      rotulo: [62, 118],
    },
    {
      palabra: 'virgulilla',
      genero: 'f.',
      campo: 'La letra eñe',
      falsas: ['cedilla', 'diéresis', 'calderón'],
      definicion: 'Signo ortográfico en forma de coma, rasguillo o trazo, como la rayita que lleva encima la ñ (también se llama tilde).',
      curiosidad: 'La ñ nació en los escritorios medievales: para ahorrar pergamino, los copistas escribían «nn» con una n pequeñita encima de la otra. Con el tiempo, la n de arriba se quedó en esta rayita ondulada.',
      dibujo: `
        <path class="letra" d="M86 86 L86 160 M86 104 C100 82 150 76 152 108 L152 160"/>
        <path class="serifa" d="M70 160 L102 160 M136 160 L168 160 M72 88 L86 82"/>
        <path class="letra" d="M84 58 C94 42 108 58 120 56 C132 54 140 44 152 46"/>`,
      senal: [118, 56],
      rotulo: [196, 26],
    },
  ],

  /* ---------- Día 2 ---------- */
  [
    {
      palabra: 'lúnula',
      genero: 'f.',
      campo: 'La uña',
      falsas: ['cutícula', 'padrastro', 'yema'],
      definicion: 'Espacio blanquecino en forma de media luna que hay en la raíz de las uñas.',
      curiosidad: 'Del latín «lunula», ‘lunita’. Las niñas romanas llevaban colgado un amuleto con forma de media luna que también se llamaba lunula. En el DLE tiene un sinónimo: «luneta».',
      dibujo: `
        <path d="M76 180 L76 74 C76 26 164 26 164 74 L164 180"/>
        <path class="fondo" d="M92 124 L92 70 C92 42 148 42 148 70 L148 124 C136 132 104 132 92 124 Z"/>
        <path class="f" d="M100 125 C106 104 134 104 140 125 C128 130 112 130 100 125 Z"/>
        <path class="fino" d="M92 126 C104 136 136 136 148 126"/>
        <path class="fino" d="M98 48 C110 40 130 40 142 48"/>
        <path class="fino" d="M100 160 C112 156 128 156 140 160 M104 168 C114 165 126 165 136 168"/>`,
      senal: [120, 116],
      rotulo: [200, 150],
    },
    {
      palabra: 'comisura',
      genero: 'f.',
      campo: 'La boca',
      falsas: ['hoyuelo', 'bezo', 'bigotera'],
      definicion: 'Punto de unión de ciertas partes del cuerpo que se juntan, como los labios o los párpados.',
      curiosidad: 'Del latín «commissura», ‘juntura’. Los ojos también tienen comisuras: a la de fuera se la llama coloquialmente «rabillo del ojo».',
      dibujo: `
        <path d="M100 16 C104 36 98 46 92 50 C96 58 110 58 114 54 C118 58 122 58 126 54 C130 58 144 58 148 50 C142 46 136 36 140 16"/>
        <path class="fino" d="M114 58 L112 76 M126 58 L128 76"/>
        <path d="M54 96 C80 74 104 70 120 80 C136 70 160 74 186 96"/>
        <path class="f" d="M54 96 C90 132 150 132 186 96 C150 104 90 104 54 96 Z"/>
        <path d="M54 96 C90 104 150 104 186 96"/>
        <path class="fino" d="M86 162 C102 174 138 174 154 162"/>
        <path class="fino" d="M44 100 C40 92 42 86 46 84"/>`,
      senal: [54, 96],
      rotulo: [18, 150],
    },
    {
      palabra: 'corva',
      genero: 'f.',
      campo: 'La pierna',
      falsas: ['pantorrilla', 'choquezuela', 'espinilla'],
      definicion: 'Parte de la pierna opuesta a la rodilla, por donde se dobla y encorva.',
      curiosidad: 'Es el femenino de «corvo», ‘curvado’, de la misma familia que «curva»: es justo el sitio por donde la pierna se curva. En el DLE tiene un sinónimo: «jarrete».',
      dibujo: `
        <path class="f" d="M72 0 L128 0 L131 26 L73 30 Z"/>
        <path class="fino oculto" d="M73 24 L130 20"/>
        <path d="M74 0 C74 40 82 70 94 92 C82 104 74 122 84 150 C92 168 100 176 104 180"/>
        <path d="M128 0 C132 40 138 70 142 90 C146 100 140 108 136 116 C132 140 128 160 128 180"/>
        <path class="fino" d="M94 92 C100 92 106 94 110 98"/>
        <path class="fino" d="M138 84 C134 90 134 98 138 104"/>`,
      senal: [94, 92],
      rotulo: [30, 64],
    },
  ],

  /* ---------- Día 3 ---------- */
  [
    {
      palabra: 'alféizar',
      genero: 'm.',
      campo: 'La ventana',
      falsas: ['dintel', 'antepecho', 'batiente'],
      definicion: 'Vuelta que hace la pared en el hueco de una ventana o puerta, dejando a la vista el grosor del muro; sobre todo, la repisa de abajo, donde se ponen las macetas.',
      curiosidad: 'Es una de tantas palabras de la casa heredadas del árabe, como «azotea», «alcoba» o «zaguán». El DLE admite también la forma sin tilde, «alfeizar».',
      dibujo: `
        <path class="fino" d="M0 30 L60 30 M180 30 L240 30 M0 70 L60 70 M180 70 L240 70 M0 110 L60 110 M180 110 L240 110 M0 150 L240 150 M30 30 L30 70 M210 70 L210 110 M30 110 L30 150"/>
        <rect x="64" y="14" width="112" height="116" class="fondo"/>
        <path class="f" d="M64 14 L176 14 L166 24 L74 24 Z M64 14 L74 24 L74 124 L64 130 Z M176 14 L166 24 L166 124 L176 130 Z"/>
        <rect x="80" y="28" width="80" height="94"/>
        <path class="fino" d="M120 28 L120 122 M80 74 L160 74"/>
        <path class="fondo" d="M56 130 L184 130 L194 142 L46 142 Z"/>
        <rect x="46" y="142" width="148" height="9" class="f"/>
        <path class="f" d="M90 112 L110 112 L107 130 L93 130 Z"/>
        <path class="fino" d="M100 112 C96 100 88 96 82 98 M100 112 C104 98 114 94 120 96 M100 112 L100 92"/>`,
      senal: [150, 136],
      rotulo: [214, 172],
    },
    {
      palabra: 'jamba',
      genero: 'f.',
      campo: 'La puerta',
      falsas: ['dintel', 'umbral', 'montante'],
      definicion: 'Cada una de las dos piezas que, puestas verticalmente a los lados de una puerta o ventana, sostienen el dintel o el arco.',
      curiosidad: 'Viene del francés «jambe», ‘pierna’: las jambas son las piernas sobre las que se apoya la puerta, y el dintel, lo que cargan encima.',
      dibujo: `
        <path d="M0 176 L240 176"/>
        <rect x="54" y="8" width="132" height="18" class="f"/>
        <rect x="58" y="26" width="16" height="150" class="f"/>
        <rect x="166" y="26" width="16" height="150" class="f"/>
        <rect x="74" y="26" width="92" height="150" class="fondo"/>
        <rect class="fino" x="84" y="38" width="72" height="54"/>
        <rect class="fino" x="84" y="104" width="72" height="62"/>
        <circle cx="152" cy="100" r="4"/>`,
      senal: [174, 82],
      rotulo: [218, 50],
    },
    {
      palabra: 'mirilla',
      genero: 'f.',
      campo: 'La puerta',
      falsas: ['aldaba', 'picaporte', 'bocallave'],
      definicion: 'Pequeña abertura, a menudo con una lente, que hay en la puerta de entrada para ver quién llama sin abrir.',
      curiosidad: 'Es el diminutivo de «mira». En muchas casas antiguas la mirilla era un ventanillo con rejilla que se abría desde dentro; hoy basta una lente del tamaño de un garbanzo.',
      dibujo: `
        <path d="M0 176 L240 176"/>
        <rect x="62" y="6" width="116" height="170" class="fondo"/>
        <rect class="fino" x="74" y="76" width="92" height="40"/>
        <rect class="fino" x="74" y="126" width="92" height="40"/>
        <circle cx="120" cy="40" r="6"/><circle class="t" cx="120" cy="40" r="2"/>
        <circle cx="164" cy="96" r="5"/>
        <path class="fino" d="M162 112 a2.4 2.4 0 1 1 4 0 L166 118 L162 118 Z"/>
        <path d="M120 60 C108 60 108 78 120 78 C132 78 132 60 120 60"/>
        <circle class="t" cx="120" cy="58" r="2.5"/>`,
      senal: [120, 40],
      rotulo: [202, 18],
    },
  ],

  /* ---------- Día 4 ---------- */
  [
    {
      palabra: 'lomo',
      genero: 'm.',
      campo: 'El libro',
      falsas: ['corte', 'cubierta', 'canto'],
      definicion: 'Parte del libro opuesta al corte de las hojas, por donde se cosen los pliegos y donde suele ir el título.',
      curiosidad: 'La etiqueta que se pega en el lomo con el título o la signatura se llama «tejuelo». En España los títulos del lomo suelen leerse de abajo arriba; en los libros en inglés, de arriba abajo.',
      dibujo: `
        <path class="f" d="M62 22 L88 30 L88 170 L62 162 Z"/>
        <path class="fondo" d="M88 30 L178 18 L178 158 L88 170 Z"/>
        <path class="fondo" d="M62 22 L152 10 L178 18 L88 30 Z"/>
        <path class="fino" d="M70 21 L158 10 M78 24 L166 13"/>
        <path class="fino" d="M62 48 L88 56 M62 136 L88 144"/>
        <path class="fino" d="M66 80 L84 85.5 L84 112 L66 106.5 Z"/>
        <path class="fino" d="M102 58 L164 50 M110 70 L156 64"/>`,
      senal: [75, 128],
      rotulo: [24, 150],
    },
    {
      palabra: 'guarda',
      genero: 'f.',
      campo: 'El libro abierto',
      falsas: ['portadilla', 'colofón', 'solapa'],
      definicion: 'Cada una de las hojas, en blanco o de color, que el encuadernador pone al principio y al final del libro, pegadas a las tapas.',
      curiosidad: 'Se usa sobre todo en plural: las guardas. Durante siglos se hicieron de papel jaspeado, también llamado «papel de aguas», que imitaba las vetas del mármol.',
      dibujo: `
        <path d="M14 38 L118 32 L118 162 L14 168 Z"/>
        <path class="f" d="M20 42 L116 36 L116 158 L20 164 Z"/>
        <path class="fino" d="M28 60 C44 50 56 72 72 62 C88 52 98 70 110 60 M28 84 C44 74 56 96 72 86 C88 76 98 94 110 84 M28 108 C44 98 56 120 72 110 C88 100 98 118 110 108 M28 132 C44 122 56 144 72 134 C88 124 98 142 110 132"/>
        <path class="fondo" d="M122 32 L226 38 L226 168 L122 162 Z"/>
        <path d="M118 32 L122 32 L122 162 L118 162"/>
        <path class="fino" d="M146 66 L202 69 M156 78 L192 80 M150 130 L198 132"/>`,
      senal: [64, 98],
      rotulo: [34, 16],
    },
    {
      palabra: 'cabezada',
      genero: 'f.',
      campo: 'El libro, visto desde arriba',
      falsas: ['nervio', 'cajo', 'tejuelo'],
      definicion: 'Cordoncillo con que se cosen los extremos del lomo de un libro; hoy suele ser una tirita de tela de colores, de adorno, que asoma arriba y abajo.',
      curiosidad: 'Para verla hay que mirar el libro por arriba: es esa franja a rayas que asoma entre el lomo y las hojas. La palabra viene de «cabeza», que en encuadernación es el borde superior del libro.',
      dibujo: `
        <path d="M34 48 L214 48 L214 56 L34 56 M34 132 L214 132 L214 124 L34 124"/>
        <path d="M34 48 C6 60 6 120 34 132"/>
        <path class="fondo" d="M42 60 L206 60 L206 120 L42 120 Z"/>
        <path class="fino" d="M48 66 L206 66 M48 72 L206 72 M48 78 L206 78 M48 84 L206 84 M48 90 L206 90 M48 96 L206 96 M48 102 L206 102 M48 108 L206 108 M48 114 L206 114"/>
        <path class="f" d="M34 58 C22 70 22 110 34 122 C44 110 44 70 34 58 Z"/>
        <path class="fino" d="M29 66 L38 64 M27 74 L40 72 M26 82 L41 80 M26 90 L42 90 M26 98 L41 100 M27 106 L40 108 M29 114 L38 116"/>`,
      senal: [33, 90],
      rotulo: [64, 160],
    },
  ],

  /* ---------- Día 5 ---------- */
  [
    {
      palabra: 'gollete',
      genero: 'm.',
      campo: 'La botella',
      falsas: ['marbete', 'precinto', 'tapón'],
      definicion: 'Cuello estrecho que tienen algunas vasijas, como garrafas o botellas.',
      curiosidad: 'Quien «está hasta el gollete» está harto o lleno hasta arriba, como una botella hasta el cuello. Comparte origen con «gola» y «gollería».',
      dibujo: `
        <path class="fondo" d="M92 172 L92 86 C92 66 110 60 112 42 L112 18 L128 18 L128 42 C130 60 148 66 148 86 L148 172 Q120 178 92 172 Z"/>
        <rect x="113" y="6" width="14" height="12" class="f"/>
        <path class="fino" d="M112 26 L128 26"/>
        <rect class="fino" x="98" y="112" width="44" height="38"/>
        <path class="fino" d="M106 124 L134 124 M110 134 L130 134"/>`,
      senal: [128, 32],
      rotulo: [190, 26],
    },
    {
      palabra: 'casquillo',
      genero: 'm.',
      campo: 'La bombilla',
      falsas: ['filamento', 'ampolla', 'culote'],
      definicion: 'Parte metálica de la bombilla que la sujeta al portalámparas y la conecta al circuito eléctrico.',
      curiosidad: 'Es el diminutivo de «casco». El de rosca más común se llama E27: la E es de Edison y el 27, los milímetros que mide de ancho. También se llama casquillo la vaina de metal de un cartucho.',
      dibujo: `
        <path class="fondo" d="M106 112 C82 96 66 70 76 48 C86 24 154 24 164 48 C174 70 158 96 134 112 Z"/>
        <path class="fino" d="M112 112 L112 74 M128 112 L128 74 M112 74 L116 66 L120 74 L124 66 L128 74"/>
        <rect x="104" y="112" width="32" height="38" class="f"/>
        <path class="fino" d="M104 118 L136 122 M104 126 L136 130 M104 134 L136 138 M104 142 L136 146"/>
        <path class="t" d="M110 150 L130 150 L124 160 L116 160 Z"/>`,
      senal: [136, 128],
      rotulo: [192, 150],
    },
    {
      palabra: 'espiga',
      genero: 'f.',
      campo: 'El cuchillo (mango en corte)',
      falsas: ['recazo', 'cachas', 'remache'],
      definicion: 'Parte de una herramienta o de otro objeto, adelgazada para introducirla en el mango.',
      curiosidad: 'En los buenos cuchillos la espiga recorre el mango entero y se ve como una franja de acero entre las dos cachas. Es la misma palabra que la espiga del trigo, por su forma alargada y fina.',
      dibujo: `
        <path class="fondo" d="M16 92 Q60 86 122 86 L122 108 Q70 112 16 92 Z"/>
        <path class="fino" d="M28 92 Q70 92 118 96"/>
        <rect x="122" y="82" width="98" height="30" rx="8" class="f"/>
        <rect class="fino oculto fondo" x="122" y="92" width="88" height="10"/>
        <circle class="fino fondo" cx="148" cy="97" r="3"/><circle class="fino fondo" cx="180" cy="97" r="3"/>`,
      senal: [200, 97],
      rotulo: [206, 150],
    },
  ],

  /* ---------- Día 6 ---------- */
  [
    {
      palabra: 'nudillo',
      genero: 'm.',
      campo: 'La mano',
      falsas: ['falange', 'yema', 'metacarpo'],
      definicion: 'Parte exterior de cualquiera de las junturas de los dedos, donde se unen sus huesos.',
      curiosidad: 'Es el diminutivo de «nudo»: los dedos, como una caña, tienen nudos. Por eso se «llama con los nudillos» a la puerta.',
      dibujo: `
        <path class="fondo" d="M60 72 C60 50 90 50 90 60 C90 46 120 46 120 58 C120 46 150 46 150 58 C150 48 180 50 180 72 L180 120 C180 136 168 142 160 142 L80 142 C68 142 60 134 60 120 Z"/>
        <path class="fino" d="M90 64 L90 104 M120 62 L120 104 M150 62 L150 104"/>
        <path d="M60 112 C80 98 120 100 138 116 C130 124 110 126 92 122"/>
        <path class="fino" d="M70 64 C74 58 80 58 84 62 M100 58 C104 52 110 52 114 56 M128 56 C132 50 140 50 144 56 M158 60 C162 56 170 58 172 64"/>
        <path d="M84 142 L88 180 M160 142 L156 180"/>`,
      senal: [135, 52],
      rotulo: [196, 20],
    },
    {
      palabra: 'empeine',
      genero: 'm.',
      campo: 'El pie',
      falsas: ['planta', 'tobillo', 'talón'],
      definicion: 'Parte superior del pie, entre la caña de la pierna y el comienzo de los dedos.',
      curiosidad: 'El DLE recoge más de un empeine: además del del pie, la parte baja del vientre entre las ingles y una enfermedad de la piel. Y en el fútbol, el disparo «con el empeine» es el más potente.',
      dibujo: `
        <path class="fondo" d="M50 0 L52 100 C50 120 36 130 34 140 C32 148 36 152 46 152 L198 152 C214 152 220 140 206 132 C180 118 140 108 110 88 C96 78 90 60 88 0"/>
        <path class="fino" d="M70 96 C74 90 82 90 84 98"/>
        <path class="fino" d="M196 132 C192 140 192 146 196 152 M186 128 C182 136 182 144 186 152"/>
        <path class="fino" d="M60 152 C90 146 150 146 180 152"/>`,
      senal: [158, 112],
      rotulo: [184, 46],
    },
    {
      palabra: 'entrecejo',
      genero: 'm.',
      campo: 'La cara',
      falsas: ['sien', 'pómulo', 'párpado'],
      definicion: 'Espacio que hay entre las cejas.',
      curiosidad: 'Como ahí se forman las arrugas cuando nos enfadamos, «entrecejo» también significa ‘ceño’: quien frunce el entrecejo pone mala cara.',
      dibujo: `
        <path class="fondo" d="M120 8 C64 8 52 66 60 108 C68 148 100 172 120 172 C140 172 172 148 180 108 C188 66 176 8 120 8 Z"/>
        <path d="M78 70 C88 62 102 62 110 68 M130 68 C138 62 152 62 162 70"/>
        <path class="fino" d="M82 86 C90 80 102 80 108 86 C102 90 90 90 82 86 Z M132 86 C138 80 150 80 158 86 C150 90 138 90 132 86 Z"/>
        <circle class="t" cx="95" cy="85.5" r="2.6"/><circle class="t" cx="145" cy="85.5" r="2.6"/>
        <path class="fino" d="M120 76 L114 114 C118 118 122 118 128 114"/>
        <path class="fino" d="M100 138 C112 144 128 144 140 138"/>
        <path class="fino" d="M58 92 C48 90 48 112 60 116 M182 92 C192 90 192 112 180 116"/>`,
      senal: [120, 68],
      rotulo: [200, 26],
    },
  ],

  /* ---------- Día 7 ---------- */
  [
    {
      palabra: 'lengüeta',
      genero: 'f.',
      campo: 'El zapato',
      falsas: ['puntera', 'vira', 'ojete'],
      definicion: 'Tira de piel que tienen los zapatos por debajo de los cordones.',
      curiosidad: 'Es el diminutivo de «lengua», por la forma. También se llama lengüeta la laminilla que vibra en la boquilla del clarinete o del oboe.',
      dibujo: ZAPATO,
      senal: [109, 56],
      rotulo: [72, 18],
    },
    {
      palabra: 'pala',
      genero: 'f.',
      campo: 'El zapato',
      falsas: ['suela', 'caña', 'tapa'],
      definicion: 'Parte superior del calzado, que abraza el pie por encima, por delante de los cordones.',
      curiosidad: 'Tiene dos sinónimos que casi nadie usa: «empella» y «capellada». La caña, en cambio, es la parte que sube por la pierna en botas y botines.',
      dibujo: ZAPATO,
      senal: [164, 116],
      rotulo: [200, 70],
    },
    {
      palabra: 'contrafuerte',
      genero: 'm.',
      campo: 'El zapato',
      falsas: ['tacón', 'vira', 'pala'],
      definicion: 'Pieza de cuero con que se refuerza el calzado por la parte del talón.',
      curiosidad: 'La misma palabra nombra el pilar que se adosa a un muro para reforzarlo, como en las catedrales, y la cadena de montañas que sale de una cordillera principal.',
      dibujo: ZAPATO,
      senal: [38, 116],
      rotulo: [14, 40],
    },
  ],

  /* ---------- Día 8 ---------- */
  [
    {
      palabra: 'dobladillo',
      genero: 'm.',
      campo: 'El pantalón',
      falsas: ['vivo', 'festón', 'entretela'],
      definicion: 'Pliegue que se hace como remate en el borde de la ropa, doblándola dos veces hacia dentro y cosiéndola.',
      curiosidad: 'Al acortar un pantalón se «coge el bajo», que no es otra cosa que rehacer el dobladillo. Si se dobla una sola vez y por fuera, ya no es dobladillo: es una vuelta.',
      dibujo: `
        <path class="fondo" d="M74 0 L62 150 L178 150 L166 0"/>
        <path class="fino" d="M120 0 L120 130"/>
        <path class="f" d="M63.6 130 L176.4 130 L178 150 L62 150 Z"/>
        <path class="fino oculto" d="M66 136 L174 136"/>
        <path class="fino" d="M62 150 L58 158 L182 158 L178 150"/>`,
      senal: [96, 142],
      rotulo: [34, 176],
    },
    {
      palabra: 'pespunte',
      genero: 'm.',
      campo: 'El bolsillo del vaquero',
      falsas: ['hilván', 'zurcido', 'sobrehilado'],
      definicion: 'Costura de puntadas seguidas, que se hace volviendo la aguja hacia atrás después de cada puntada.',
      curiosidad: 'El hilván es provisional y se quita; el pespunte se queda. En los vaqueros se hace con hilo de otro color precisamente para lucirlo.',
      dibujo: `
        <path class="fondo" d="M60 28 L180 28 L176 128 L120 158 L64 128 Z"/>
        <path class="oculto" d="M60 36 L180 36 M68 42 L172 42 L168 122 L120 148 L72 122 Z"/>
        <path class="oculto fino" d="M84 70 C100 92 112 92 120 76 C128 92 140 92 156 70"/>`,
      senal: [170, 82],
      rotulo: [218, 58],
    },
    {
      palabra: 'canesú',
      genero: 'm.',
      campo: 'La camisa, vista por detrás',
      falsas: ['pechera', 'sisa', 'puño'],
      definicion: 'Pieza superior de la camisa o la blusa, a la que se cosen el cuello, las mangas y el resto de la prenda.',
      curiosidad: 'Viene del francés «canezou». Su plural es «canesús» (también vale «canesúes»). En las camisas de vestir suele llevar debajo un pliegue para dar holgura a la espalda.',
      dibujo: `
        <path class="fondo" d="M95 20 C110 28 130 28 145 20 L200 34 L232 120 L210 128 L196 92 L196 176 L44 176 L44 92 L30 128 L8 120 L40 34 Z"/>
        <path d="M95 20 C100 10 140 10 145 20"/>
        <path class="f" d="M95 20 C110 28 130 28 145 20 L200 34 L198 64 C150 72 90 72 42 64 L40 34 Z"/>
        <path class="fino" d="M40 34 L46 92 M200 34 L194 92"/>
        <path class="fino" d="M112 70 L112 92 M128 70 L128 92"/>`,
      senal: [160, 50],
      rotulo: [212, 14],
    },
  ],

  /* ---------- Día 9 ---------- */
  [
    {
      palabra: 'rabillo',
      genero: 'm.',
      campo: 'Las cerezas',
      falsas: ['hueso', 'pulpa', 'piel'],
      definicion: 'Pecíolo de una hoja o pedúnculo de una flor o de un fruto: el palito que los une a la rama.',
      curiosidad: 'Se mira «con el rabillo del ojo», porque también se llama así la prolongación del ángulo exterior del ojo. Y las cerezas, por el rabillo, salen enredadas unas con otras.',
      dibujo: `
        <path d="M90 106 C100 60 130 40 140 26 M150 116 C150 80 145 50 140 26"/>
        <path class="fondo" d="M140 26 C160 10 190 14 202 24 C180 36 160 36 140 26 Z"/>
        <path class="fino" d="M144 26 C160 22 180 22 196 24"/>
        <circle cx="90" cy="132" r="26" class="f"/><circle cx="150" cy="142" r="26" class="f"/>
        <path class="fino" d="M76 122 C78 116 82 113 86 112 M136 132 C138 126 142 123 146 122"/>`,
      senal: [147, 66],
      rotulo: [204, 92],
    },
    {
      palabra: 'cáliz',
      genero: 'm.',
      campo: 'La flor',
      falsas: ['corola', 'estambre', 'pistilo'],
      definicion: 'Cubierta externa de la flor, formada por los sépalos, casi siempre verdes y recios.',
      curiosidad: 'Del latín «calix», ‘copa’, como el cáliz de misa: los sépalos sostienen la flor igual que una copa. Lo de dentro, los pétalos, forma la corola.',
      dibujo: `
        <path d="M120 180 L120 112"/>
        <path class="fondo" d="M120 112 C98 112 86 108 80 120 C90 110 106 104 120 112 Z"/>
        <path class="fondo" d="M92 92 C80 60 90 30 120 18 C150 30 160 60 148 92 C136 102 104 102 92 92 Z"/>
        <path class="fino" d="M120 18 C112 50 112 80 120 98 M104 34 C102 60 106 82 112 98 M136 34 C138 60 134 82 128 98"/>
        <path class="f" d="M120 114 C104 112 90 104 84 86 C98 92 110 96 120 100 C130 96 142 92 156 86 C150 104 136 112 120 114 Z"/>
        <path class="fino" d="M120 114 L120 96 M104 106 C110 100 114 98 120 98"/>
        <path class="fondo" d="M120 150 C136 136 158 136 172 144 C156 154 138 156 120 150 Z"/>`,
      senal: [148, 96],
      rotulo: [204, 118],
    },
    {
      palabra: 'vilano',
      genero: 'm.',
      campo: 'El diente de león',
      falsas: ['aquenio', 'involucro', 'receptáculo'],
      definicion: 'Penacho de pelos o filamentos que corona el fruto de muchas plantas compuestas y le sirve para volar con el viento.',
      curiosidad: 'Cada «paracaídas» del diente de león es un vilano con su semilla colgando. El DLE llama también vilano a la flor del cardo.',
      dibujo: `
        <path d="M118 180 C116 150 114 130 116 84"/>
        <path class="fino" d="${VILANO_CABEZA}"/>
        <circle class="t" cx="116" cy="74" r="7"/>
        <path class="fino" d="M192 42l-8.5 -12.4M192 42l-3.7 -14.5M192 42l1.5 -14.9M192 42l6.5 -13.5M192 42l10.8 -10.5M192 42l13.7 -6.1"/>
        <path class="fino" d="M192 42 L186 70"/>
        <path class="t" d="M184 70 L188 70 L186 82 Z"/>`,
      senal: [194, 30],
      rotulo: [222, 92],
    },
  ],

  /* ---------- Día 10 ---------- */
  [
    {
      palabra: 'alcayata',
      genero: 'f.',
      campo: 'El cuadro, visto de lado',
      falsas: ['armella', 'clavija', 'taco'],
      definicion: 'Clavo con la punta doblada en ángulo recto, que se clava en la pared para colgar cosas. Es lo mismo que una escarpia.',
      curiosidad: 'En Paraguay y Venezuela, las alcayatas son también las piezas de hierro que se empotran en la pared para colgar la hamaca.',
      dibujo: `
        <path class="f" d="M0 0 L60 0 L60 180 L0 180 Z"/>
        <path class="fino" d="M0 20 L20 0 M0 50 L50 0 M0 80 L60 20 M0 110 L60 50 M0 140 L60 80 M0 170 L60 110 M10 180 L60 130 M40 180 L60 160"/>
        <path class="oculto" d="M34 56 L60 56"/>
        <path class="clavo" d="M60 56 L108 56 L108 36"/>
        <path class="fino" d="M104 58 L80 92"/>
        <path class="fondo" d="M62 96 L86 92 L80 178 L62 178 Z"/>`,
      senal: [108, 42],
      rotulo: [178, 24],
    },
    {
      palabra: 'contera',
      genero: 'f.',
      campo: 'El paraguas',
      falsas: ['varilla', 'puño', 'mástil'],
      definicion: 'Pieza, normalmente de metal, que se pone en la punta de un bastón, un paraguas o la vaina de una espada, en el extremo opuesto al puño.',
      curiosidad: 'De ahí la expresión «por contera», que significa ‘para remate, por si fuera poco’: «Llegó tarde y, por contera, sin el regalo».',
      dibujo: `
        <g transform="rotate(18 120 90)">
          <path class="mango" d="M120 40 L120 22 C120 8 96 8 96 22 C96 28 100 30 102 28"/>
          <path class="fondo" d="M120 44 C100 66 102 120 120 152 C138 120 140 66 120 44 Z"/>
          <path class="fino" d="M120 44 L112 140 M120 44 L128 140 M120 44 L120 152"/>
          <path class="fino" d="M106 96 L134 96"/>
          <path class="t" d="M117 152 L123 152 L122 172 L118 172 Z"/>
        </g>`,
      senal: [97, 160],
      rotulo: [40, 160],
    },
    {
      palabra: 'virola',
      genero: 'f.',
      campo: 'El formón',
      falsas: ['espiga', 'cabo', 'bisel'],
      definicion: 'Abrazadera de metal que se pone de remate o refuerzo en el extremo de algo, como el mango de una herramienta o de una navaja, para que no se raje.',
      curiosidad: 'Viene del francés «virole». En el DLE la virola es también la contera de un bastón o un paraguas: la pieza de la partida anterior.',
      dibujo: `
        <path class="fondo" d="M14 98 L30 86 L118 86 L118 98 Z"/>
        <path class="fino" d="M30 86 L30 98"/>
        <path class="f" d="M118 83 L134 81 L134 103 L118 101 Z"/>
        <path class="fino" d="M122 82.5 L122 101.5 M130 81.5 L130 102.5"/>
        <path class="fondo" d="M134 80 C154 72 200 72 214 80 C222 86 222 98 214 104 C200 112 154 112 134 104 Z"/>
        <path class="fino" d="M146 88 C170 84 192 86 208 90 M150 98 C172 100 190 100 206 96"/>`,
      senal: [126, 92],
      rotulo: [150, 36],
    },
  ],
  /* ---------- Día 11 ---------- */
  [
    {
      palabra: 'visera',
      genero: 'f.',
      campo: 'La gorra',
      falsas: ['ala', 'copa', 'botón'],
      definicion: 'Ala pequeña que tienen en la parte delantera las gorras, los quepis y otras prendas semejantes, para resguardar la vista.',
      curiosidad: 'Antes de las gorras, la visera era la pieza móvil del yelmo que protegía la cara, con rendijas para ver. Hoy también se llama así a la que se lleva sola, sin copa, para el sol.',
      dibujo: `
        <path class="fondo" d="M46 124 C44 76 84 44 128 44 C170 44 196 74 196 124 Z"/>
        <path class="fino" d="M128 46 C116 70 110 98 112 124 M128 46 C146 70 156 98 158 124 M128 46 C100 62 80 92 74 124"/>
        <circle class="t" cx="128" cy="44" r="4.5"/>
        <path d="M44 124 L198 124"/>
        <path class="f" d="M150 124 L194 124 C212 124 230 128 236 136 C220 142 190 140 150 130 Z"/>`,
      senal: [214, 132],
      rotulo: [196, 168],
    },
    {
      palabra: 'pabilo',
      genero: 'm.',
      campo: 'La vela',
      falsas: ['pavesa', 'cabo', 'palmatoria'],
      definicion: 'Mecha o cordón que está en el centro de la vela o de la antorcha y que se enciende.',
      curiosidad: 'También se escribe «pábilo». «Despabilar» era quitar la parte ya quemada del pabilo para que la vela alumbrase mejor; de ahí «espabilar», avivar el ingenio.',
      dibujo: CANDELERO,
      senal: [120, 35],
      rotulo: [176, 24],
    },
    {
      palabra: 'arandela',
      genero: 'f.',
      campo: 'El candelero',
      falsas: ['mechero', 'pavesa', 'palmatoria'],
      definicion: 'Platillo de metal o vidrio que se pone en el candelero, alrededor de la vela, para recoger lo que se derrama de ella.',
      curiosidad: 'Viene del francés «rondelle», de «rond», redondo. Por la forma, se llama igual la pieza en forma de anillo que se pone entre una tuerca y lo que aprieta.',
      dibujo: CANDELERO,
      senal: [150, 100],
      rotulo: [200, 132],
    },
  ],
  /* ---------- Día 12 ---------- */
  [
    {
      palabra: 'lóbulo',
      genero: 'm.',
      campo: 'La oreja',
      falsas: ['trago', 'hélice', 'concha'],
      definicion: 'Parte inferior, carnosa y redondeada, de la oreja.',
      curiosidad: 'Es la única parte de la oreja sin cartílago: por eso es blanda y por eso es donde se suelen poner los pendientes.',
      dibujo: OREJA,
      senal: [130, 160],
      rotulo: [190, 162],
    },
    {
      palabra: 'hélice',
      genero: 'f.',
      campo: 'La oreja',
      falsas: ['lóbulo', 'trago', 'concha'],
      definicion: 'Parte más externa y periférica del pabellón de la oreja: el reborde que la recorre por arriba y por detrás.',
      curiosidad: 'Es la misma palabra que la del barco o el avión: viene del griego «hélix», espiral, por la forma enroscada de ese borde.',
      dibujo: OREJA,
      senal: [176, 56],
      rotulo: [218, 28],
    },
    {
      palabra: 'trago',
      genero: 'm.',
      campo: 'La oreja',
      falsas: ['lóbulo', 'hélice', 'concha'],
      definicion: 'Prominencia de la oreja, situada delante del conducto auditivo.',
      curiosidad: 'No tiene nada que ver con beber: viene del griego «trágos», macho cabrío, porque con los años le salen unos pelillos que recuerdan la barba de la cabra.',
      dibujo: OREJA,
      senal: [104, 104],
      rotulo: [36, 92],
    },
  ],
  /* ---------- Día 13 ---------- */
  [
    {
      palabra: 'peldaño',
      genero: 'm.',
      campo: 'La escalera',
      falsas: ['zanca', 'rellano', 'pasamanos'],
      definicion: 'Cada una de las partes de un tramo de escalera que sirven para apoyar el pie al subir o bajar por ella.',
      curiosidad: '«Peldaño» y «escalón» son sinónimos. En cambio, el rellano o descansillo es el tramo llano donde se interrumpe la escalera.',
      dibujo: ESCALERA,
      senal: [110, 122],
      rotulo: [60, 172],
    },
    {
      palabra: 'contrahuella',
      genero: 'f.',
      campo: 'La escalera',
      falsas: ['huella', 'zanca', 'mamperlán'],
      definicion: 'Plano vertical del escalón o peldaño.',
      curiosidad: 'Su pareja es la huella, la parte horizontal que se pisa. Una vieja regla dice que la escalera es cómoda si dos contrahuellas y una huella suman unos 63 centímetros, lo que mide un paso.',
      dibujo: ESCALERA,
      senal: [130, 96],
      rotulo: [196, 120],
    },
    {
      palabra: 'mamperlán',
      genero: 'm.',
      campo: 'La escalera',
      falsas: ['huella', 'contrahuella', 'zanca'],
      definicion: 'Listón de madera con que se guarnece el borde de los peldaños en las escaleras de fábrica.',
      curiosidad: 'Protege la arista del escalón, que es lo que más se desgasta y se rompe. Hoy a menudo es una pieza de metal o de goma con estrías, para que no resbale el pie.',
      dibujo: ESCALERA,
      senal: [92, 107],
      rotulo: [140, 150],
    },
  ],
  /* ---------- Día 14 ---------- */
  [
    {
      palabra: 'badajo',
      genero: 'm.',
      campo: 'La campana',
      falsas: ['yugo', 'asa', 'mazo'],
      definicion: 'Pieza metálica, generalmente en forma de pera, que pende en lo interior de las campanas y con la cual se golpean estas para hacerlas sonar.',
      curiosidad: 'Por la imagen de algo que no para de golpear, «badajo» se dice también de la persona habladora y necia.',
      dibujo: `
        <rect class="f" x="88" y="12" width="64" height="12" rx="2"/>
        <path d="M110 24 L110 32 M130 24 L130 32"/>
        <path class="fondo" d="M120 30 C96 30 88 50 86 80 C84 110 78 126 58 140 L182 140 C162 126 156 110 154 80 C152 50 144 30 120 30 Z"/>
        <path d="M56 140 C56 150 184 150 184 140"/>
        <path class="fino" d="M90 96 C110 100 130 100 150 96 M92 108 C112 112 128 112 148 108"/>
        <path class="fino oculto" d="M120 36 L120 140"/>
        <path d="M120 144 L120 150"/>
        <ellipse class="t" cx="120" cy="158" rx="7" ry="9"/>`,
      senal: [120, 158],
      rotulo: [182, 172],
    },
    {
      palabra: 'cazoleta',
      genero: 'f.',
      campo: 'La pipa',
      falsas: ['boquilla', 'caña', 'atacador'],
      definicion: 'Receptáculo pequeño de la pipa de fumar, donde se pone el tabaco.',
      curiosidad: 'Es diminutivo de «cazuela». También se llama cazoleta la guarnición en forma de cuenco que protege la mano en algunas espadas.',
      dibujo: `
        <path class="fino" d="M66 56 C56 44 74 36 66 22 M80 54 C90 42 76 32 86 18"/>
        <path class="fondo" d="M46 66 L94 66 C96 106 90 132 72 136 C54 136 44 112 46 66 Z"/>
        <ellipse class="f" cx="70" cy="66" rx="24" ry="5"/>
        <path class="fondo" d="M90 108 C120 108 160 100 198 88 L202 100 C162 114 122 122 86 124 Z"/>
        <path class="t" d="M198 88 L230 80 L232 88 L202 100 Z"/>
        <path class="fino" d="M196 89 L200 100"/>`,
      senal: [70, 104],
      rotulo: [24, 160],
    },
    {
      palabra: 'bitoque',
      genero: 'm.',
      campo: 'El tonel',
      falsas: ['canilla', 'duela', 'fleje'],
      definicion: 'Tarugo de madera con que se cierra el agujero de los toneles.',
      curiosidad: 'Se hace de una madera que se hincha con la humedad, para que ajuste bien y el vino no se airee ni se escape.',
      dibujo: TONEL,
      senal: [120, 46],
      rotulo: [168, 18],
    },
  ],
  /* ---------- Día 15 ---------- */
  [
    {
      palabra: 'cresta',
      genero: 'f.',
      campo: 'El gallo',
      falsas: ['barba', 'buche', 'espolón'],
      definicion: 'Carnosidad roja que tienen sobre la cabeza el gallo y otras aves.',
      curiosidad: '«Alzar la cresta» es mostrarse soberbio o desafiante, como el gallo cuando se encara con otro.',
      dibujo: GALLO,
      senal: [128, 18],
      rotulo: [184, 14],
    },
    {
      palabra: 'espolón',
      genero: 'm.',
      campo: 'El gallo',
      falsas: ['tarso', 'barba', 'obispillo'],
      definicion: 'Apófisis ósea en forma de cornezuelo que tienen en el tarso varias aves gallináceas.',
      curiosidad: 'Los gallos lo usan como arma en sus peleas. Por parecido, también se llama espolón la punta de la proa de las antiguas naves de guerra, con la que embestían.',
      dibujo: GALLO,
      senal: [95, 154],
      rotulo: [40, 170],
    },
    {
      palabra: 'obispillo',
      genero: 'm.',
      campo: 'El gallo',
      falsas: ['buche', 'molleja', 'espolón'],
      definicion: 'Rabadilla de las aves: la punta carnosa del final del espinazo, donde nacen las plumas de la cola.',
      curiosidad: 'Se suele explicar por su forma, que en el ave desplumada recuerda la mitra de un obispo. En inglés pasa algo parecido: lo llaman «la nariz del párroco».',
      dibujo: GALLO,
      senal: [80, 100],
      rotulo: [24, 150],
    },
  ],
  /* ---------- Día 16 ---------- */
  [
    {
      palabra: 'capitel',
      genero: 'm.',
      campo: 'La columna',
      falsas: ['basa', 'fuste', 'friso'],
      definicion: 'Parte superior de la columna y de la pilastra, que las corona con forma y ornamentación distintas según el estilo arquitectónico.',
      curiosidad: 'Viene del latín «capitellum», cabecita. Por el capitel se distinguen a primera vista los órdenes clásicos: el dórico es liso, el jónico lleva volutas y el corintio, hojas de acanto.',
      dibujo: COLUMNA,
      senal: [120, 46],
      rotulo: [196, 60],
    },
    {
      palabra: 'fuste',
      genero: 'm.',
      campo: 'La columna',
      falsas: ['basa', 'capitel', 'plinto'],
      definicion: 'Parte de la columna que media entre el capitel y la basa.',
      curiosidad: 'Las estrías verticales que lo recorren se llaman acanaladuras. «De fuste» significa además de importancia: «un político de fuste».',
      dibujo: COLUMNA,
      senal: [120, 104],
      rotulo: [184, 120],
    },
    {
      palabra: 'ábaco',
      genero: 'm.',
      campo: 'La columna',
      falsas: ['equino', 'plinto', 'arquitrabe'],
      definicion: 'Parte superior, en forma de tablero, que corona el capitel.',
      curiosidad: 'Es la misma palabra que el tablero de bolas para contar: en latín y en griego, «abacus» era cualquier tabla plana.',
      dibujo: COLUMNA,
      senal: [150, 31],
      rotulo: [206, 48],
    },
  ],
  /* ---------- Día 17 ---------- */
  [
    {
      palabra: 'manecilla',
      genero: 'f.',
      campo: 'El despertador',
      falsas: ['esfera', 'bisel', 'péndola'],
      definicion: 'Saetilla que en el reloj y en otros instrumentos sirve para señalar las horas, los minutos o los grados.',
      curiosidad: 'Es diminutivo de «mano»: la que señala. Por su forma también se las llama agujas o saetas.',
      dibujo: `
        <path class="f" d="M64 40 A26 26 0 0 1 102 22 Z M176 40 A26 26 0 0 0 138 22 Z"/>
        <path d="M86 34 L78 28 M154 34 L162 28"/>
        <circle class="fondo" cx="120" cy="96" r="62"/>
        <circle class="fino" cx="120" cy="96" r="54"/>
        <path class="fino" d="M120 46 L120 54 M120 138 L120 146 M70 96 L78 96 M162 96 L170 96 M145 53 L141 60 M95 139 L99 132 M163 71 L156 75 M77 121 L84 117 M163 121 L156 117 M77 71 L84 75 M145 139 L141 132 M95 53 L99 60"/>
        <path class="mango" d="M120 96 L150 80"/>
        <path d="M120 96 L104 52"/>
        <circle class="t" cx="120" cy="96" r="4"/>
        <path d="M84 150 L72 168 M156 150 L168 168"/>`,
      senal: [140, 85],
      rotulo: [208, 128],
    },
    {
      palabra: 'pitorro',
      genero: 'm.',
      campo: 'El botijo',
      falsas: ['boca', 'asa', 'panza'],
      definicion: 'Tubo de los botijos y porrones, con un agujero pequeño por donde sale el líquido para beber.',
      curiosidad: 'El botijo enfría el agua porque su barro, sin vidriar, deja que rezume un poco: al evaporarse en la superficie, se lleva el calor del agua que queda dentro.',
      dibujo: `
        <path class="fondo" d="M120 50 C170 50 196 82 196 112 C196 146 164 166 120 166 C76 166 44 146 44 112 C44 82 70 50 120 50 Z"/>
        <path class="fino" d="M52 128 C90 140 150 140 188 128"/>
        <path class="fondo" d="M86 60 C84 2 156 2 154 60 L144 58 C146 16 94 16 96 58 Z"/>
        <path class="fondo" d="M146 62 L176 22 L184 28 L160 68 Z"/>
        <path class="fondo" d="M66 66 L56 48 L80 40 L86 60 Z"/>
        <ellipse class="f" cx="68" cy="44" rx="13" ry="5" transform="rotate(-18 68 44)"/>`,
      senal: [174, 30],
      rotulo: [218, 70],
    },
    {
      palabra: 'leontina',
      genero: 'f.',
      campo: 'El reloj de bolsillo',
      falsas: ['tapa', 'esfera', 'bisel'],
      definicion: 'Cinta o cadena colgante de reloj de bolsillo.',
      curiosidad: 'Se enganchaba a un ojal del chaleco para no perder el reloj si se salía del bolsillo. De ella solía colgar un dije o la llavecita con que se le daba cuerda.',
      dibujo: `
        <circle class="fondo" cx="70" cy="104" r="46"/>
        <circle class="fino" cx="70" cy="104" r="39"/>
        <path class="fino" d="M70 70 L70 76 M70 132 L70 138 M36 104 L42 104 M98 104 L104 104"/>
        <path d="M70 104 L70 80 M70 104 L88 112"/>
        <rect class="f" x="63" y="48" width="14" height="10" rx="3"/>
        <circle cx="70" cy="40" r="8"/>
        <ellipse class="fino" cx="84.1" cy="46.2" rx="4.6" ry="2.2" transform="rotate(44 84.1 46.2)"/>
        <ellipse class="fino" cx="92.2" cy="53.8" rx="4.6" ry="1.1" transform="rotate(39 92.2 53.8)"/>
        <ellipse class="fino" cx="100.4" cy="60.1" rx="4.6" ry="2.2" transform="rotate(34 100.4 60.1)"/>
        <ellipse class="fino" cx="108.5" cy="65.2" rx="4.6" ry="1.1" transform="rotate(27 108.5 65.2)"/>
        <ellipse class="fino" cx="116.7" cy="69.0" rx="4.6" ry="2.2" transform="rotate(20 116.7 69.0)"/>
        <ellipse class="fino" cx="124.8" cy="71.6" rx="4.6" ry="1.1" transform="rotate(12 124.8 71.6)"/>
        <ellipse class="fino" cx="133.0" cy="73.0" rx="4.6" ry="2.2" transform="rotate(4 133.0 73.0)"/>
        <ellipse class="fino" cx="141.2" cy="73.2" rx="4.6" ry="1.1" transform="rotate(-5 141.2 73.2)"/>
        <ellipse class="fino" cx="149.3" cy="72.1" rx="4.6" ry="2.2" transform="rotate(-13 149.3 72.1)"/>
        <ellipse class="fino" cx="157.5" cy="69.8" rx="4.6" ry="1.1" transform="rotate(-21 157.5 69.8)"/>
        <ellipse class="fino" cx="165.6" cy="66.2" rx="4.6" ry="2.2" transform="rotate(-28 165.6 66.2)"/>
        <ellipse class="fino" cx="173.8" cy="61.5" rx="4.6" ry="1.1" transform="rotate(-35 173.8 61.5)"/>
        <ellipse class="fino" cx="181.9" cy="55.5" rx="4.6" ry="2.2" transform="rotate(-40 181.9 55.5)"/>
        <path class="mango" d="M188 38 L188 64"/>`,
      senal: [133, 67],
      rotulo: [176, 128],
    },
  ],
  /* ---------- Día 18 ---------- */
  [
    {
      palabra: 'patilla',
      genero: 'f.',
      campo: 'Las gafas',
      falsas: ['puente', 'montura', 'lente'],
      definicion: 'Cada una de las dos varillas articuladas que sujetan las gafas detrás de las orejas.',
      curiosidad: 'Las primeras gafas no tenían patillas: se sostenían con la mano o se pinzaban en la nariz, como los quevedos, que deben su nombre a Francisco de Quevedo, retratado con ellos.',
      dibujo: `
        <path class="fondo" d="M30 70 C30 54 86 54 96 70 C100 92 90 112 62 112 C36 112 28 92 30 70 Z"/>
        <path class="fondo" d="M124 70 C134 54 190 54 190 70 C192 92 184 112 158 112 C130 112 120 92 124 70 Z"/>
        <path class="fino" d="M40 66 C58 62 74 64 84 70 M134 70 C146 64 166 62 180 66"/>
        <path d="M96 70 C104 62 116 62 124 70"/>
        <path d="M190 66 L198 64 L232 104 C234 110 228 116 222 112"/>
        <path d="M30 66 L22 64 L10 92"/>`,
      senal: [214, 86],
      rotulo: [196, 150],
    },
    {
      palabra: 'bocamanga',
      genero: 'f.',
      campo: 'La chaqueta',
      falsas: ['solapa', 'hombrera', 'sisa'],
      definicion: 'Parte de la manga que está más cerca de la muñeca, y especialmente por lo interior o el forro.',
      curiosidad: 'Los botones de las bocamangas son casi siempre de adorno. Se cuenta que Napoleón mandó coserlos para que sus soldados no se limpiaran la nariz con la manga.',
      dibujo: `
        <path class="fondo" d="M74 18 L120 34 L166 18 L200 30 L222 150 L196 156 L178 70 L178 176 L62 176 L62 70 L44 156 L18 150 L40 30 Z"/>
        <path class="f" d="M74 18 L104 30 L112 92 L92 60 L100 50 Z M166 18 L136 30 L128 92 L148 60 L140 50 Z"/>
        <path d="M120 34 L120 176"/>
        <circle class="fino" cx="124" cy="112" r="3"/><circle class="fino" cx="124" cy="140" r="3"/>
        <path class="f" d="M196 156 L222 150 L226 168 L198 172 Z M44 156 L18 150 L14 168 L42 172 Z"/>
        <circle class="fino" cx="206" cy="162" r="2"/><circle class="fino" cx="214" cy="160" r="2"/>
        <path class="fino" d="M78 130 L104 130 M136 130 L162 130"/>`,
      senal: [212, 166],
      rotulo: [218, 112],
    },
    {
      palabra: 'sisa',
      genero: 'f.',
      campo: 'El chaleco',
      falsas: ['escote', 'canesú', 'pinza'],
      definicion: 'Corte curvo que se hace en las prendas de vestir a la altura del sobaco, por donde se cose la manga o, si no la lleva, por donde se saca el brazo.',
      curiosidad: '«Sisa» es también lo que se queda quien hace la compra por otro, cobrando de más: de ahí el verbo «sisar».',
      dibujo: `
        <path class="fondo" d="M80 14 L120 60 L160 14 L176 18 C172 50 182 70 196 78 L196 164 L134 172 L120 152 L106 172 L44 164 L44 78 C58 70 68 50 64 18 Z"/>
        <path d="M120 60 L120 152"/>
        <circle class="fino" cx="126" cy="80" r="3"/><circle class="fino" cx="126" cy="102" r="3"/><circle class="fino" cx="126" cy="124" r="3"/>
        <path class="fino" d="M64 120 L92 116 M148 116 L176 120"/>
        <path class="fino oculto" d="M68 22 C70 50 60 68 48 76 M172 22 C170 50 180 68 192 76"/>`,
      senal: [182, 58],
      rotulo: [226, 30],
    },
  ],
  /* ---------- Día 19 ---------- */
  [
    {
      palabra: 'radio',
      genero: 'm.',
      campo: 'La bicicleta',
      falsas: ['llanta', 'cubo', 'horquilla'],
      definicion: 'Cada una de las varillas que unen el cubo de una rueda con la llanta.',
      curiosidad: 'Es la misma palabra que la del círculo: viene del latín «radius», rayo. Por eso a los radios de una rueda también se les llama rayos.',
      dibujo: BICICLETA,
      senal: [196, 132],
      rotulo: [222, 170],
    },
    {
      palabra: 'cubo',
      genero: 'm.',
      campo: 'La bicicleta',
      falsas: ['llanta', 'biela', 'piñón'],
      definicion: 'Pieza central de la rueda, en la que se encajan los radios y por la que pasa el eje.',
      curiosidad: 'En las bicicletas se le suele llamar «buje», aunque para el DLE el buje es más bien el casquillo que lo forra por dentro. «Cubo» viene del latín «cupa», cuba.',
      dibujo: BICICLETA,
      senal: [60, 118],
      rotulo: [18, 170],
    },
    {
      palabra: 'biela',
      genero: 'f.',
      campo: 'La bicicleta',
      falsas: ['pedal', 'piñón', 'plato'],
      definicion: 'Barra que transforma un movimiento de vaivén en otro de rotación; en la bicicleta, cada una de las dos que unen los pedales con el eje del plato.',
      curiosidad: 'Viene del francés «bielle». Es la misma pieza que en el motor de un coche une el pistón con el cigüeñal: allí, en vez de la pierna, empuja la explosión.',
      dibujo: BICICLETA,
      senal: [127, 139],
      rotulo: [104, 174],
    },
  ],
  /* ---------- Día 20 ---------- */
  [
    {
      palabra: 'alero',
      genero: 'm.',
      campo: 'El tejado',
      falsas: ['canalón', 'caballete', 'buhardilla'],
      definicion: 'Parte inferior del tejado, que sale fuera de la pared y sirve para desviar de ella el agua de la lluvia.',
      curiosidad: '«Estar en el alero» significa estar en una situación insegura, a punto de decidirse para bien o para mal.',
      dibujo: TEJADO,
      senal: [24, 90],
      rotulo: [16, 136],
    },
    {
      palabra: 'caballete',
      genero: 'm.',
      campo: 'El tejado',
      falsas: ['alero', 'cobija', 'canalón'],
      definicion: 'Línea horizontal y más elevada de un tejado, de la cual arrancan dos vertientes.',
      curiosidad: 'Se llama igual el bastidor en que el pintor apoya el cuadro y la parte más alta de la nariz, entre la frente y la punta.',
      dibujo: TEJADO,
      senal: [140, 37],
      rotulo: [200, 14],
    },
    {
      palabra: 'cobija',
      genero: 'f.',
      campo: 'El tejado',
      falsas: ['canal', 'alero', 'caballete'],
      definicion: 'Teja que se pone con la parte cóncava hacia abajo, abrazando dos canales del tejado.',
      curiosidad: 'En el tejado de teja árabe se alternan dos hileras: las canales, boca arriba, por donde corre el agua, y las cobijas, boca abajo, que tapan sus juntas. En América, «cobija» es también la manta.',
      dibujo: TEJADO,
      senal: [122, 91],
      rotulo: [84, 152],
    },
  ],
  /* ---------- Día 21 ---------- */
  [
    {
      palabra: 'racimo',
      genero: 'm.',
      campo: 'La vid',
      falsas: ['sarmiento', 'pámpano', 'cepa'],
      definicion: 'Porción de uvas unidas por sus pedúnculos a un tallo común que cuelga del sarmiento.',
      curiosidad: 'Viene del latín «racemus». Por parecido se dice también «un racimo de casas» o «un racimo de gente».',
      dibujo: VID,
      senal: [150, 84],
      rotulo: [112, 150],
    },
    {
      palabra: 'zarcillo',
      genero: 'm.',
      campo: 'La vid',
      falsas: ['sarmiento', 'pámpano', 'yema'],
      definicion: 'Cada uno de los órganos largos, delgados y volubles que tienen ciertas plantas, como la vid, y que les sirven para asirse a los tallos u otros objetos cercanos.',
      curiosidad: 'También se llaman zarcillos los pendientes en forma de aro, por la misma figura enroscada.',
      dibujo: VID,
      senal: [217, 52],
      rotulo: [214, 120],
    },
    {
      palabra: 'escobajo',
      genero: 'm.',
      campo: 'El racimo, ya comido',
      falsas: ['hollejo', 'pepita', 'orujo'],
      definicion: 'Raspa que queda del racimo después de quitarle las uvas.',
      curiosidad: 'También se llama raspa o raspón. Al hacer vino se suele separar de la uva antes de prensarla, en el despalillado, porque da un sabor áspero.',
      dibujo: `
        <path class="mango" d="M120 10 L120 34"/>
        <path d="M120 34 C118 70 120 110 122 150"/>
        <path d="M120 46 C104 50 92 56 80 64 M120 46 C136 50 148 56 160 64 M119 64 C104 70 94 78 86 88 M119 64 C134 70 146 78 154 88 M119 84 C106 90 98 98 94 108 M119 84 C132 90 140 98 144 108 M120 104 C110 110 104 118 102 126 M120 104 C130 110 136 118 138 126 M121 124 C114 130 112 136 112 142 M121 124 C128 130 130 136 130 142"/>
        <path class="fino" d="M80 64 L74 60 M80 64 L76 70 M160 64 L166 60 M160 64 L164 70 M86 88 L80 86 M86 88 L84 94 M154 88 L160 86 M154 88 L156 94 M94 108 L88 108 M144 108 L150 108 M102 126 L98 130 M138 126 L142 130"/>
        <circle class="f" cx="73" cy="66" r="7"/>
        <circle class="f" cx="158" cy="94" r="7"/>`,
      senal: [120, 76],
      rotulo: [196, 40],
    },
  ],
  /* ---------- Día 22 ---------- */
  [
    {
      palabra: 'clavija',
      genero: 'f.',
      campo: 'La guitarra',
      falsas: ['traste', 'puente', 'boca'],
      definicion: 'Pieza de madera o de metal que, en los instrumentos de cuerda, sirve para tensar las cuerdas y afinarlas.',
      curiosidad: 'Viene del latín «clavicula», llavecita. «Apretarle a alguien las clavijas» es presionarlo, como quien tensa una cuerda.',
      dibujo: GUITARRA,
      senal: [221, 58],
      rotulo: [176, 26],
    },
    {
      palabra: 'traste',
      genero: 'm.',
      campo: 'La guitarra',
      falsas: ['clavija', 'puente', 'boca'],
      definicion: 'Cada uno de los resaltes colocados a trechos en el mástil de la guitarra y de otros instrumentos semejantes, que marcan dónde oprimir la cuerda para cada nota.',
      curiosidad: 'Cada traste sube un semitono. Están cada vez más juntos según se acercan al cuerpo de la guitarra, porque para subir un semitono hay que acortar la cuerda siempre en la misma proporción.',
      dibujo: GUITARRA,
      senal: [154, 100],
      rotulo: [164, 150],
    },
    {
      palabra: 'voluta',
      genero: 'f.',
      campo: 'El violín',
      falsas: ['clavijero', 'mástil', 'alma'],
      definicion: 'Adorno en forma de espiral o caracol; en el violín y los instrumentos de su familia, el que remata el clavijero.',
      curiosidad: 'Es la misma palabra que el adorno de los capiteles jónicos: del latín «voluta», enrollada. En el violín no suena: es pura tradición.',
      dibujo: `
        <path class="fondo" d="M14 160 L124 92 L136 108 L28 174 Z"/>
        <path class="t" d="M20 160 L116 100 L122 108 L26 168 Z"/>
        <path class="fondo" d="M122 92 L170 60 L186 78 L136 108 Z"/>
        <path class="t" d="M134 96 L170 72 L178 80 L140 104 Z"/>
        <path d="M140 84 L130 70 M156 74 L146 60 M150 112 L160 124 M166 102 L176 114"/>
        <ellipse class="f" cx="127" cy="65" rx="6" ry="9" transform="rotate(-34 127 65)"/>
        <ellipse class="f" cx="143" cy="55" rx="6" ry="9" transform="rotate(-34 143 55)"/>
        <ellipse class="f" cx="163" cy="129" rx="6" ry="9" transform="rotate(-34 163 129)"/>
        <ellipse class="f" cx="179" cy="119" rx="6" ry="9" transform="rotate(-34 179 119)"/>
        <circle class="fondo" cx="198" cy="44" r="25"/>
        <path d="M181.0 61.0 L180.3 60.1 L179.7 59.3 L179.0 58.4 L178.4 57.5 L177.9 56.6 L177.4 55.6 L176.9 54.6 L176.5 53.6 L176.2 52.6 L175.9 51.6 L175.6 50.6 L175.4 49.6 L175.2 48.5 L175.1 47.5 L175.0 46.4 L175.0 45.4 L175.0 44.3 L175.1 43.3 L175.2 42.2 L175.4 41.2 L175.6 40.2 L175.8 39.2 L176.1 38.2 L176.5 37.2 L176.8 36.3 L177.3 35.4 L177.7 34.5 L178.2 33.6 L178.8 32.7 L179.4 31.9 L180.0 31.1 L180.6 30.3 L181.3 29.6 L182.0 28.9 L182.8 28.2 L183.5 27.6 L184.3 27.0 L185.2 26.4 L186.0 25.9 L186.9 25.5 L187.7 25.0 L188.6 24.6 L189.5 24.3 L190.5 24.0 L191.4 23.7 L192.4 23.5 L193.3 23.3 L194.3 23.2 L195.2 23.1 L196.2 23.0 L197.1 23.0 L198.1 23.1 L199.0 23.2 L200.0 23.3 L200.9 23.5 L201.8 23.7 L202.7 23.9 L203.6 24.2 L204.5 24.5 L205.3 24.9 L206.2 25.3 L207.0 25.8 L207.8 26.2 L208.5 26.7 L209.3 27.3 L210.0 27.9 L210.7 28.5 L211.3 29.1 L211.9 29.8 L212.5 30.5 L213.1 31.2 L213.6 31.9 L214.1 32.7 L214.5 33.4 L214.9 34.2 L215.3 35.0 L215.6 35.8 L215.9 36.7 L216.2 37.5 L216.4 38.4 L216.6 39.2 L216.7 40.1 L216.8 40.9 L216.9 41.8 L216.9 42.7 L216.9 43.5 L216.8 44.4 L216.7 45.2 L216.6 46.1 L216.4 46.9 L216.2 47.7 L216.0 48.6 L215.7 49.3 L215.4 50.1 L215.0 50.9 L214.7 51.6 L214.2 52.3 L213.8 53.0 L213.3 53.7 L212.8 54.4 L212.3 55.0 L211.7 55.6 L211.1 56.2 L210.5 56.7 L209.9 57.2 L209.2 57.7 L208.6 58.1 L207.9 58.6 L207.2 58.9 L206.5 59.3 L205.7 59.6 L205.0 59.9 L204.3 60.1 L203.5 60.3 L202.7 60.5 L202.0 60.7 L201.2 60.8 L200.4 60.8 L199.7 60.9 L198.9 60.9 L198.1 60.8 L197.4 60.8 L196.6 60.7 L195.9 60.5 L195.1 60.3 L194.4 60.1 L193.7 59.9 L193.0 59.6 L192.3 59.3 L191.6 59.0 L191.0 58.6 L190.4 58.3 L189.7 57.8 L189.2 57.4 L188.6 56.9 L188.1 56.5 L187.5 56.0 L187.0 55.4 L186.6 54.9 L186.1 54.3 L185.7 53.7 L185.4 53.1 L185.0 52.5 L184.7 51.9 L184.4 51.2 L184.1 50.6 L183.9 49.9 L183.7 49.3 L183.5 48.6 L183.4 47.9 L183.3 47.2 L183.2 46.6 L183.2 45.9 L183.2 45.2 L183.2 44.5 L183.2 43.8 L183.3 43.2 L183.4 42.5 L183.6 41.9 L183.7 41.2 L183.9 40.6 L184.2 40.0 L184.4 39.4 L184.7 38.8 L185.0 38.2 L185.3 37.7 L185.7 37.1 L186.1 36.6 L186.5 36.1 L186.9 35.6 L187.3 35.2 L187.8 34.7 L188.2 34.3 L188.7 33.9 L189.2 33.6 L189.8 33.2 L190.3 32.9 L190.8 32.6 L191.4 32.3 L191.9 32.1 L192.5 31.9 L193.1 31.7 L193.7 31.6 L194.3 31.4 L194.8 31.3 L195.4 31.3 L196.0 31.2 L196.6 31.2 L197.2 31.2 L197.8 31.3 L198.4 31.3 L198.9 31.4 L199.5 31.5 L200.0 31.7 L200.6 31.8 L201.1 32.0 L201.6 32.2 L202.2 32.5 L202.7 32.7 L203.1 33.0 L203.6 33.3 L204.1 33.6 L204.5 33.9 L204.9 34.3 L205.3 34.7 L205.7 35.0 L206.0 35.4 L206.4 35.9 L206.7 36.3 L207.0 36.7 L207.3 37.2 L207.5 37.6 L207.7 38.1 L207.9 38.6 L208.1 39.1 L208.3 39.5 L208.4 40.0 L208.5 40.5 L208.6 41.0 L208.7 41.5 L208.7 42.0 L208.8 42.5 L208.7 43.0 L208.7 43.5 L208.7 44.0 L208.6 44.5 L208.5 45.0 L208.4 45.4 L208.3 45.9 L208.1 46.3 L207.9 46.8 L207.7 47.2 L207.5 47.6 L207.3 48.0 L207.1 48.4 L206.8 48.8 L206.5 49.2 L206.2 49.5 L205.9 49.8 L205.6 50.2 L205.3 50.5 L204.9 50.7 L204.6 51.0 L204.2 51.3 L203.8 51.5 L203.5 51.7 L203.1 51.9 L202.7 52.0 L202.3 52.2 L201.9 52.3 L201.5 52.4 L201.1 52.5 L200.7 52.6 L200.3 52.7 L199.9 52.7 L199.4 52.7 L199.0 52.7 L198.6 52.7 L198.2 52.7 L197.8 52.6 L197.5 52.5 L197.1 52.4 L196.7 52.3 L196.3 52.2 L196.0 52.1 L195.6 51.9 L195.3 51.7 L195.0 51.5 L194.7 51.3 L194.4 51.1 L194.1 50.9 L193.8 50.7 L193.5 50.4 L193.3 50.2 L193.0 49.9 L192.8 49.6 L192.6 49.4 L192.4 49.1 L192.2 48.8 L192.1 48.5 L191.9 48.2 L191.8 47.8 L191.7 47.5 L191.6 47.2 L191.5 46.9 L191.4 46.6 L191.4 46.3 L191.3 45.9 L191.3 45.6 L191.3 45.3 L191.3 45.0 L191.3 44.7 L191.4 44.4 L191.4 44.1 L191.5 43.8 L191.6 43.5 L191.6 43.2 L191.7 42.9 L191.9 42.6 L192.0 42.4 L192.1 42.1 L192.3 41.9 L192.4 41.7 L192.6 41.4 L192.8 41.2 L192.9 41.0 L193.1 40.8 L193.3 40.6 L193.5 40.5 L193.7 40.3 L194.0 40.2 L194.2 40.0 L194.4 39.9 L194.6 39.8 L194.9 39.7 L195.1 39.6 L195.3 39.5 L195.6 39.4 L195.8 39.4 L196.0 39.4 L196.3 39.3 L196.5 39.3 L196.7 39.3 L197.0 39.3 L197.2 39.3 L197.4 39.3 L197.6 39.4 L197.8 39.4 L198.0 39.5 L198.2 39.5 L198.4 39.6 L198.6 39.7 L198.8 39.8 L199.0 39.9 L199.1 40.0 L199.3 40.1 L199.5 40.2 L199.6 40.4 L199.7 40.5 L199.9 40.6 L200.0 40.8 L200.1 40.9 L200.2 41.0 L200.3 41.2 L200.4 41.3 L200.5 41.5 L200.5 41.7 L200.6 41.8 L200.6 42.0 L200.7 42.1 L200.7 42.3 L200.7 42.4 L200.8 42.6 L200.8 42.7 L200.8 42.9 L200.8 43.0 L200.7 43.2 L200.7 43.3 L200.7 43.4 L200.6 43.6"/>
        <circle class="t" cx="198.0" cy="44" r="2.5"/>`,
      senal: [216, 30],
      rotulo: [228, 92],
    },
  ],
  /* ---------- Día 23 ---------- */
  [
    {
      palabra: 'crin',
      genero: 'f.',
      campo: 'El caballo',
      falsas: ['cruz', 'testuz', 'cerneja'],
      definicion: 'Conjunto de cerdas que tienen algunos animales, como el caballo, en la parte superior del cuello.',
      curiosidad: 'Viene del latín «crinis», cabello. Se usa sobre todo en plural: «las crines». La del león macho se llama más bien melena.',
      dibujo: CABALLO,
      senal: [176, 42],
      rotulo: [214, 96],
    },
    {
      palabra: 'cruz',
      genero: 'f.',
      campo: 'El caballo',
      falsas: ['grupa', 'ijada', 'crin'],
      definicion: 'En los cuadrúpedos, parte más alta del lomo, donde se cruzan los huesos de las extremidades anteriores con el espinazo.',
      curiosidad: 'La alzada de un caballo, es decir, su altura, se mide desde el suelo hasta la cruz, y no hasta la cabeza, que el animal sube y baja.',
      dibujo: CABALLO,
      senal: [140, 68],
      rotulo: [112, 26],
    },
    {
      palabra: 'cerneja',
      genero: 'f.',
      campo: 'El caballo',
      falsas: ['casco', 'menudillo', 'cuartilla'],
      definicion: 'Mechón de pelo que tienen las caballerías detrás del menudillo.',
      curiosidad: 'En algunas razas de tiro, como el shire o el frisón, son largas y vistosas, y ayudan a que el agua y el barro escurran lejos del casco.',
      dibujo: CABALLO,
      senal: [148, 157],
      rotulo: [196, 150],
    },
  ],
  /* ---------- Día 24 ---------- */
  [
    {
      palabra: 'tirador',
      genero: 'm.',
      campo: 'La cómoda',
      falsas: ['bisagra', 'corredera', 'bocallave'],
      definicion: 'Asidero del que se tira para abrir o cerrar una puerta, un cajón, etc.',
      curiosidad: 'También se llama tirador el tirachinas, y en Argentina y Uruguay, el cinturón ancho del gaucho.',
      dibujo: `
        <path class="fondo" d="M36 30 L204 30 L204 160 L36 160 Z"/>
        <path class="f" d="M28 22 L212 22 L212 30 L28 30 Z"/>
        <path d="M44 38 L196 38 L196 74 L44 74 Z M44 80 L196 80 L196 116 L44 116 Z M44 122 L196 122 L196 156 L44 156 Z"/>
        <path d="M44 160 L44 170 M196 160 L196 170"/>
        <path class="mango" d="M104 56 C108 50 132 50 136 56 M104 98 C108 92 132 92 136 98 M104 139 C108 133 132 133 136 139"/>
        <circle class="fino" cx="120" cy="66" r="2"/><circle class="fino" cx="120" cy="108" r="2"/><circle class="fino" cx="120" cy="148" r="2"/>`,
      senal: [120, 94],
      rotulo: [214, 112],
    },
    {
      palabra: 'duela',
      genero: 'f.',
      campo: 'El tonel',
      falsas: ['fleje', 'canilla', 'bitoque'],
      definicion: 'Cada una de las tablas que forman las paredes curvas de las cubas, pipas, barriles, etc.',
      curiosidad: 'Para curvarlas, el tonelero las calienta al fuego mientras las ciñe con los aros. Ese tostado del roble es parte del sabor de los vinos de crianza.',
      dibujo: TONEL,
      senal: [126, 86],
      rotulo: [140, 166],
    },
    {
      palabra: 'macillo',
      genero: 'm.',
      campo: 'El piano, por dentro',
      falsas: ['apagador', 'tecla', 'clavija'],
      definicion: 'Pieza del piano, a modo de mazo, con mango delgado y cabeza forrada de fieltro, que golpea la cuerda correspondiente.',
      curiosidad: 'Gracias a él el piano es, en rigor, un instrumento de percusión: la cuerda no se pulsa, como en el clave, sino que se golpea.',
      dibujo: `
        <path d="M8 34 L232 34"/><path class="fino" d="M8 28 L232 28"/>
        <path class="f" d="M160 36 L184 36 L184 50 L160 50 Z"/>
        <path class="fino" d="M172 50 L172 112"/>
        <path class="mango" d="M110 60 L110 130"/>
        <path class="f" d="M98 52 C98 40 122 40 122 52 L122 64 L98 64 Z"/>
        <path class="fino" d="M98 52 C104 47 116 47 122 52"/>
        <circle class="fondo" cx="110" cy="134" r="6"/>
        <path class="fondo" d="M14 148 L226 148 L226 160 L14 160 Z"/>
        <path class="t" d="M150 160 L162 160 L156 172 Z"/>
        <path d="M110 140 L112 148 M172 112 L176 148"/>
        <path class="fondo" d="M8 142 L40 142 L40 162 L8 162 Z"/>`,
      senal: [110, 46],
      rotulo: [44, 70],
    },
  ],
  /* ---------- Día 25 ---------- */
  [
    {
      palabra: 'ala',
      genero: 'f.',
      campo: 'El sombrero',
      falsas: ['copa', 'cinta', 'badana'],
      definicion: 'Parte inferior del sombrero, que rodea la copa y sobresale de ella.',
      curiosidad: 'Es la misma palabra que la del ave. Por parecido tienen también ala el sombrero, la nariz o un edificio, y el tejado tiene alero.',
      dibujo: SOMBRERO,
      senal: [208, 120],
      rotulo: [206, 164],
    },
    {
      palabra: 'copa',
      genero: 'f.',
      campo: 'El sombrero',
      falsas: ['ala', 'cinta', 'badana'],
      definicion: 'Parte hueca del sombrero, en que entra la cabeza.',
      curiosidad: 'El sombrero de copa, o chistera, debe su nombre a lo alta y cilíndrica que es la suya.',
      dibujo: SOMBRERO,
      senal: [104, 72],
      rotulo: [36, 40],
    },
    {
      palabra: 'badana',
      genero: 'f.',
      campo: 'El sombrero, por dentro',
      falsas: ['cinta', 'forro', 'copa'],
      definicion: 'Tira de cuero o de otro material que se cose al borde interior de la copa del sombrero para que el sudor no lo manche.',
      curiosidad: 'En principio, badana es la piel fina de carnero u oveja curtida. «Zurrarle a alguien la badana» es darle una paliza.',
      dibujo: `
        <ellipse class="fondo" cx="120" cy="96" rx="108" ry="46"/>
        <ellipse class="fino" cx="120" cy="96" rx="96" ry="39"/>
        <ellipse class="fondo" cx="120" cy="96" rx="58" ry="27"/>
        <ellipse class="t" cx="120" cy="98" rx="48" ry="20"/>
        <ellipse class="fino oculto" cx="120" cy="96" rx="53" ry="23.5"/>
        <path class="fino" d="M112 70 L120 76 L128 70 M120 76 L120 70"/>`,
      senal: [172, 102],
      rotulo: [214, 156],
    },
  ],
  /* ---------- Día 26 ---------- */
  [
    {
      palabra: 'ojo',
      genero: 'm.',
      campo: 'La llave',
      falsas: ['tija', 'paletón', 'guarda'],
      definicion: 'Anillo de la llave, por el que se coge para hacerla girar.',
      curiosidad: 'Es una de las muchas acepciones de «ojo»: también lo tienen la aguja, el hacha o el puente, y en general cualquier abertura que atraviesa algo de parte a parte.',
      dibujo: LLAVE,
      senal: [52, 63],
      rotulo: [34, 22],
    },
    {
      palabra: 'tija',
      genero: 'f.',
      campo: 'La llave',
      falsas: ['ojo', 'paletón', 'guarda'],
      definicion: 'Astil o caña de la llave, entre el ojo y el paletón.',
      curiosidad: 'Es palabra del oficio de cerrajero, poco conocida fuera de él: casi todo el mundo la llama simplemente la caña de la llave.',
      dibujo: LLAVE,
      senal: [130, 90],
      rotulo: [120, 40],
    },
    {
      palabra: 'paletón',
      genero: 'm.',
      campo: 'La llave',
      falsas: ['ojo', 'tija', 'guarda'],
      definicion: 'Parte de la llave en que se forman los dientes y las guardas.',
      curiosidad: 'Sus muescas tienen que salvar las guardas, unos salientes del interior de la cerradura: solo gira la llave cuyo dibujo encaja con ellas.',
      dibujo: LLAVE,
      senal: [178, 112],
      rotulo: [214, 160],
    },
  ],
  /* ---------- Día 27 ---------- */
  [
    {
      palabra: 'clave',
      genero: 'f.',
      campo: 'El arco',
      falsas: ['dovela', 'salmer', 'imposta'],
      definicion: 'Piedra con que se cierra el arco o la bóveda.',
      curiosidad: 'Como sin ella el arco se viene abajo, «clave» significa también lo decisivo: «la pieza clave», «un momento clave».',
      dibujo: ARCO,
      senal: [120, 60],
      rotulo: [150, 14],
    },
    {
      palabra: 'dovela',
      genero: 'f.',
      campo: 'El arco',
      falsas: ['clave', 'salmer', 'sillar'],
      definicion: 'Piedra labrada en forma de cuña para formar arcos o bóvedas.',
      curiosidad: 'Cada dovela empuja a sus vecinas hacia los lados. Por eso un arco no se sostiene hasta que se pone la clave, y mientras se construye se apoya en una cimbra de madera.',
      dibujo: ARCO,
      senal: [85, 67],
      rotulo: [40, 14],
    },
    {
      palabra: 'salmer',
      genero: 'm.',
      campo: 'El arco',
      falsas: ['clave', 'dovela', 'imposta'],
      definicion: 'Piedra del machón o muro, cortada en plano inclinado, de donde arranca un arco adintelado o escarzano.',
      curiosidad: 'El arco escarzano es el que dibuja menos de media circunferencia. Como no arranca en vertical, necesita esa piedra inclinada que recoja su empuje.',
      dibujo: ARCO,
      senal: [184, 84],
      rotulo: [214, 130],
    },
  ],
  /* ---------- Día 28 ---------- */
  [
    {
      palabra: 'aleta',
      genero: 'f.',
      campo: 'El barbo',
      falsas: ['escama', 'agalla', 'espina'],
      definicion: 'Cada una de las membranas externas, sostenidas por radios, que tienen los peces y otros animales acuáticos para nadar.',
      curiosidad: 'Por parecido también se llaman aletas los rebordes de la nariz, a los lados de los orificios, y las que se calzan los buceadores.',
      dibujo: BARBO,
      senal: [118, 52],
      rotulo: [64, 24],
    },
    {
      palabra: 'opérculo',
      genero: 'm.',
      campo: 'El barbo',
      falsas: ['agalla', 'aleta', 'escama'],
      definicion: 'Pieza, generalmente ósea, que en muchos peces cubre y protege las branquias.',
      curiosidad: 'Viene del latín «operculum», tapadera. También se llama así la tapa con que algunos caracoles cierran la boca de su concha.',
      dibujo: BARBO,
      senal: [167, 92],
      rotulo: [178, 150],
    },
    {
      palabra: 'barbillón',
      genero: 'm.',
      campo: 'El barbo',
      falsas: ['opérculo', 'agalla', 'aleta'],
      definicion: 'Cada uno de los apéndices carnosos y sensoriales que tienen algunos peces alrededor de la boca.',
      curiosidad: 'El barbo debe su nombre a los suyos, como si llevara barba: viene del latín «barbus». También los tienen el siluro o el bacalao.',
      dibujo: BARBO,
      senal: [200, 120],
      rotulo: [226, 156],
    },
  ],
  /* ---------- Día 29 ---------- */
  [
    {
      palabra: 'tocón',
      genero: 'm.',
      campo: 'El árbol talado',
      falsas: ['cepellón', 'corteza', 'albura'],
      definicion: 'Parte del tronco de un árbol que queda unida a la raíz cuando lo cortan por el pie.',
      curiosidad: 'Contando los anillos de su corte se sabe la edad del árbol: cada anillo es un año de crecimiento, más ancho si el año fue lluvioso.',
      dibujo: `
        <path class="fino" d="M6 158 L234 158"/>
        <path d="M70 140 C54 150 40 156 22 160 M80 146 C72 156 66 162 60 168 M164 146 C172 156 180 162 190 166 M170 140 C186 148 200 154 220 158"/>
        <path class="fondo" d="M72 150 C70 124 74 100 72 84 L168 84 C166 100 170 124 168 150 C140 158 100 158 72 150 Z"/>
        <path class="fino" d="M86 96 L84 146 M100 98 L102 150 M140 98 L138 152 M154 96 L156 146"/>
        <ellipse class="f" cx="120" cy="84" rx="48" ry="14"/>
        <ellipse class="fino" cx="120" cy="84" rx="36" ry="10"/><ellipse class="fino" cx="122" cy="84" rx="24" ry="6.5"/><ellipse class="fino" cx="123" cy="84" rx="12" ry="3"/>
        <path class="fino" d="M186 150 C188 130 196 120 206 116 M196 124 C204 126 210 122 212 116"/>`,
      senal: [92, 122],
      rotulo: [36, 104],
    },
    {
      palabra: 'peciolo',
      genero: 'm.',
      campo: 'La hoja',
      falsas: ['nervio', 'limbo', 'estípula'],
      definicion: 'Pezón que sostiene la hoja.',
      curiosidad: 'También se escribe «pecíolo». Viene del latín «petiolus», piececito: es el pie de la hoja.',
      dibujo: HOJA,
      senal: [62, 149],
      rotulo: [110, 168],
    },
    {
      palabra: 'limbo',
      genero: 'm.',
      campo: 'La hoja',
      falsas: ['nervio', 'peciolo', 'estípula'],
      definicion: 'Lámina o parte ensanchada de las hojas.',
      curiosidad: 'Viene del latín «limbus», borde u orla. El limbo al que, según la tradición, iban las almas de los niños sin bautizar es la misma palabra: un lugar en el borde.',
      dibujo: HOJA,
      senal: [152, 104],
      rotulo: [196, 150],
    },
  ],
  /* ---------- Día 30 ---------- */
  [
    {
      palabra: 'quilla',
      genero: 'f.',
      campo: 'El velero',
      falsas: ['borda', 'popa', 'timón'],
      definicion: 'Pieza de madera o de hierro que va de popa a proa por la parte inferior del barco y en la que se asienta todo su armazón.',
      curiosidad: 'Es la columna vertebral del barco: «poner la quilla» marca el comienzo de su construcción. En las aves, la quilla es la cresta del esternón donde se sujetan los músculos del vuelo.',
      dibujo: VELERO,
      senal: [130, 145],
      rotulo: [190, 168],
    },
    {
      palabra: 'bauprés',
      genero: 'm.',
      campo: 'El velero',
      falsas: ['botavara', 'verga', 'mástil'],
      definicion: 'Palo grueso, horizontal o algo inclinado, que sale de la proa de los barcos y sirve para sujetar los foques.',
      curiosidad: 'Viene del neerlandés antiguo, como tantas palabras de la vela. En inglés se dice «bowsprit», de la misma raíz.',
      dibujo: VELERO,
      senal: [229, 89],
      rotulo: [222, 140],
    },
    {
      palabra: 'cofa',
      genero: 'f.',
      campo: 'El velero',
      falsas: ['verga', 'obenque', 'botavara'],
      definicion: 'Meseta colocada horizontalmente en lo alto de un palo de barco, para facilitar la maniobra de las velas altas y servir de puesto de vigía.',
      curiosidad: 'Era el puesto del vigía, el marinero que desde lo alto del palo otea el horizonte en busca de tierra, de otros barcos o de arrecifes.',
      dibujo: VELERO,
      senal: [120, 37],
      rotulo: [56, 22],
    },
  ],
  /* ---------- Día 31 ---------- */
  [
    {
      palabra: 'caña',
      genero: 'f.',
      campo: 'El ancla',
      falsas: ['cepo', 'arganeo', 'brazo'],
      definicion: 'Parte del ancla comprendida entre la cruz y el arganeo.',
      curiosidad: 'En lo alto lleva atravesado el cepo, que obliga al ancla a tumbarse de manera que una de las uñas se clave en el fondo.',
      dibujo: ANCLA,
      senal: [120, 96],
      rotulo: [180, 70],
    },
    {
      palabra: 'uña',
      genero: 'f.',
      campo: 'El ancla',
      falsas: ['cepo', 'arganeo', 'cruz'],
      definicion: 'Punta triangular en que acaba cada uno de los brazos del ancla.',
      curiosidad: 'Es la parte que se clava en el fondo y agarra. Cuando no prende y el ancla se arrastra, los marinos dicen que «garra».',
      dibujo: ANCLA,
      senal: [52, 110],
      rotulo: [24, 160],
    },
    {
      palabra: 'arganeo',
      genero: 'm.',
      campo: 'El ancla',
      falsas: ['cepo', 'caña', 'uña'],
      definicion: 'Argolla en el extremo superior de la caña del ancla, a la que se sujeta la cadena o el cabo.',
      curiosidad: 'El ancla, con su arganeo, su cepo y sus dos uñas, es el emblema de la marina en medio mundo, y también un antiguo símbolo cristiano de la esperanza.',
      dibujo: ANCLA,
      senal: [129, 13],
      rotulo: [190, 20],
    },
  ],
  /* ---------- Día 32 ---------- */
  [
    {
      palabra: 'empuñadura',
      genero: 'f.',
      campo: 'La espada',
      falsas: ['recazo', 'vaina', 'contera'],
      definicion: 'Guarnición y puño de la espada, por donde se coge.',
      curiosidad: 'Viene de «empuñar», tomar por el puño. Por extensión también tienen empuñadura los bastones, los paraguas o las herramientas.',
      dibujo: ESPADA,
      senal: [50, 90],
      rotulo: [40, 150],
    },
    {
      palabra: 'pomo',
      genero: 'm.',
      campo: 'La espada',
      falsas: ['recazo', 'gavilán', 'cazoleta'],
      definicion: 'Extremo de la guarnición de la espada, que está encima del puño y sirve para tenerla unida y firme con la hoja.',
      curiosidad: 'Además de cerrar la empuñadura, hace de contrapeso de la hoja: con un buen pomo la espada se maneja con menos esfuerzo.',
      dibujo: ESPADA,
      senal: [20, 90],
      rotulo: [24, 40],
    },
    {
      palabra: 'gavilán',
      genero: 'm.',
      campo: 'La espada',
      falsas: ['recazo', 'pomo', 'cazoleta'],
      definicion: 'Cada uno de los dos hierros que salen de la guarnición de la espada, forman la cruz y sirven para defender la mano de los golpes del contrario.',
      curiosidad: 'Comparte nombre con el ave rapaz. Los dos gavilanes, cruzados con la hoja, forman la cruz de la espada, sobre la que juraban los caballeros.',
      dibujo: ESPADA,
      senal: [70, 60],
      rotulo: [130, 30],
    },
  ],
  /* ---------- Día 33 ---------- */
  [
    {
      palabra: 'postigo',
      genero: 'm.',
      campo: 'La ventana',
      falsas: ['alféizar', 'dintel', 'jamba'],
      definicion: 'Puertecilla de madera que se pone en la parte exterior o interior de una ventana para cerrarla y quitar la luz.',
      curiosidad: 'En origen el postigo era una puerta falsa o trasera, o una puerta chica abierta en otra mayor, como las de los portones de las iglesias.',
      dibujo: `
        <path class="fino" d="M6 20 L234 20 M6 168 L234 168"/>
        <rect class="fondo" x="80" y="36" width="80" height="104"/>
        <rect x="88" y="44" width="64" height="88"/>
        <path class="fino" d="M120 44 L120 132 M88 88 L152 88"/>
        <path class="fondo" d="M80 36 L36 30 L36 146 L80 140 Z M160 36 L204 30 L204 146 L160 140 Z"/>
        <path class="fino" d="M42 44 L76 48 M42 56 L76 59 M42 68 L76 70 M42 80 L76 81 M42 92 L76 92 M42 104 L76 103 M42 116 L76 114 M42 128 L76 125"/>
        <path class="fino" d="M198 44 L164 48 M198 56 L164 59 M198 68 L164 70 M198 80 L164 81 M198 92 L164 92 M198 104 L164 103 M198 116 L164 114 M198 128 L164 125"/>
        <path class="f" d="M70 140 L170 140 L174 150 L66 150 Z"/>`,
      senal: [58, 88],
      rotulo: [20, 120],
    },
    {
      palabra: 'parteluz',
      genero: 'm.',
      campo: 'La ventana',
      falsas: ['jamba', 'alféizar', 'dintel'],
      definicion: 'Columna delgada que divide en dos el hueco de una ventana o de una puerta.',
      curiosidad: 'A la ventana así dividida, con sus dos arquillos, se la llama ajimez, palabra de origen árabe muy presente en la arquitectura mudéjar.',
      dibujo: `
        <path class="fondo" d="M20 14 L220 14 L220 170 L20 170 Z"/>
        <path class="fino" d="M20 44 L64 44 M176 44 L220 44 M20 100 L64 100 M176 100 L220 100 M20 140 L64 140 M176 140 L220 140 M42 14 L42 44 M198 14 L198 44 M42 100 L42 140 M198 100 L198 140"/>
        <path class="f" d="M68 150 L68 74 A24 24 0 0 1 116 74 L116 150 Z M124 150 L124 74 A24 24 0 0 1 172 74 L172 150 Z"/>
        <path d="M64 150 L64 74 A28 28 0 0 1 120 74 A28 28 0 0 1 176 74 L176 150"/>
        <rect class="fondo" x="116" y="80" width="8" height="66"/>
        <path class="fondo" d="M112 72 L128 72 L125 80 L115 80 Z"/>
        <rect class="fondo" x="113" y="146" width="14" height="5"/>
        <path class="f" d="M58 150 L182 150 L186 158 L54 158 Z"/>`,
      senal: [120, 112],
      rotulo: [190, 92],
    },
    {
      palabra: 'falleba',
      genero: 'f.',
      campo: 'La ventana',
      falsas: ['pestillo', 'bisagra', 'cerrojo'],
      definicion: 'Varilla de hierro acodillada en sus extremos que, al girarla con un manubrio, cierra las ventanas o puertas de dos hojas, asegurando una con otra o con el marco.',
      curiosidad: 'Al girar el manubrio, los extremos acodados de la varilla se enganchan arriba y abajo en el marco, de modo que la ventana queda cerrada por tres puntos.',
      dibujo: `
        <rect class="f" x="54" y="14" width="132" height="156"/>
        <rect class="fondo" x="62" y="22" width="58" height="140"/><rect class="fondo" x="120" y="22" width="58" height="140"/>
        <rect x="70" y="30" width="42" height="56"/><rect x="70" y="98" width="42" height="56"/>
        <rect x="128" y="30" width="42" height="56"/><rect x="128" y="98" width="42" height="56"/>
        <path class="mango" d="M124 26 L124 158"/>
        <path d="M124 26 L130 22 M124 158 L130 162"/>
        <path class="fino" d="M120 40 L129 40 M120 140 L129 140 M120 70 L129 70 M120 116 L129 116"/>
        <path class="mango" d="M124 92 L110 110"/>
        <circle class="t" cx="109" cy="111" r="4"/>`,
      senal: [124, 54],
      rotulo: [200, 34],
    },
  ],
  /* ---------- Día 34 ---------- */
  [
    {
      palabra: 'filo',
      genero: 'm.',
      campo: 'El hacha',
      falsas: ['astil', 'cotillo', 'ojo'],
      definicion: 'Arista o borde agudo de un instrumento cortante.',
      curiosidad: '«Estar en el filo de la navaja» es estar en una situación muy delicada. Y un argumento «de doble filo» es el que puede volverse contra quien lo usa.',
      dibujo: HACHA,
      senal: [43, 52],
      rotulo: [24, 140],
    },
    {
      palabra: 'astil',
      genero: 'm.',
      campo: 'El hacha',
      falsas: ['filo', 'cotillo', 'ojo'],
      definicion: 'Mango, ordinariamente de madera, que tienen las hachas, azadas, picos y otros instrumentos semejantes.',
      curiosidad: 'También se llama astil la varilla de la saeta y la barra de la balanza de cuyos extremos cuelgan los platillos.',
      dibujo: HACHA,
      senal: [121, 120],
      rotulo: [180, 140],
    },
    {
      palabra: 'cotillo',
      genero: 'm.',
      campo: 'El hacha',
      falsas: ['filo', 'astil', 'ojo'],
      definicion: 'Parte del hacha, del martillo y de otras herramientas, opuesta al filo o a la boca, que sirve para golpear.',
      curiosidad: 'Con el cotillo del hacha se pueden clavar cuñas y estacas sin necesidad de cargar con un martillo.',
      dibujo: HACHA,
      senal: [158, 44],
      rotulo: [206, 88],
    },
  ],
  /* ---------- Día 35 ---------- */
  [
    {
      palabra: 'lagrimal',
      genero: 'm.',
      campo: 'El ojo',
      falsas: ['párpado', 'ceja', 'pestaña'],
      definicion: 'Extremidad del ojo próxima a la nariz.',
      curiosidad: 'Por ahí desaguan las lágrimas hacia la nariz: por eso, cuando se llora, hay que sonarse.',
      dibujo: `
        <path class="fino" d="M30 44 C70 20 160 18 206 46"/>
        <path class="fondo" d="M36 96 C70 52 160 44 210 90 C164 136 72 140 36 96 Z"/>
        <path class="fino" d="M48 80 C80 52 152 46 196 76"/>
        <circle class="f" cx="124" cy="92" r="30"/>
        <circle class="t" cx="124" cy="92" r="12"/>
        <circle class="fondo" cx="130" cy="86" r="3.5"/>
        <path class="fino" d="M104 78 L96 82 M144 78 L152 82 M110 70 L104 74 M138 70 L144 74"/>
        <path class="f" d="M36 96 C42 90 48 90 52 96 C48 102 42 102 36 96 Z"/>
        <path class="fino" d="M76 66 L72 56 M96 58 L94 46 M120 54 L120 42 M144 56 L148 44 M168 62 L174 52 M188 72 L196 64"/>
        <path class="fino" d="M70 124 C110 140 160 134 200 104"/>`,
      senal: [44, 96],
      rotulo: [22, 150],
    },
    {
      palabra: 'pulpejo',
      genero: 'm.',
      campo: 'La mano',
      falsas: ['muñeca', 'yema', 'nudillo'],
      definicion: 'Parte carnosa y mollar de la palma de la mano, de donde sale el dedo pulgar.',
      curiosidad: 'También se llama pulpejo la parte blanda de la oreja o de los dedos y, en las caballerías, la parte blanda del casco, junto a los talones.',
      dibujo: `
        <path class="fondo" d="M92 176 L90 140 C80 128 70 110 56 94 C48 84 56 76 66 82 C76 88 84 100 92 106 L94 40 C94 30 108 30 108 40 L110 92 L112 24 C112 14 126 14 126 24 L128 90 L132 30 C132 20 146 20 146 30 L146 94 L152 50 C152 40 166 40 166 50 L162 120 C160 140 152 156 150 176 Z"/>
        <path class="fino" d="M100 136 C108 150 130 156 148 150"/>
        <path class="fino" d="M98 110 C112 108 136 110 158 104 M104 122 C118 118 138 120 154 116"/>
        <path class="fino" d="M94 106 C96 124 98 136 104 150"/>
        <path class="fino" d="M101 44 L101 52 M119 30 L119 38 M139 36 L139 44 M159 56 L159 64"/>`,
      senal: [104, 130],
      rotulo: [40, 150],
    },
    {
      palabra: 'sangradura',
      genero: 'f.',
      campo: 'El brazo',
      falsas: ['codo', 'molledo', 'antebrazo'],
      definicion: 'Parte interior del brazo, opuesta al codo.',
      curiosidad: 'Se llama así porque era donde barberos y cirujanos hacían las sangrías: las venas se ven y se alcanzan con facilidad, como hoy en los análisis de sangre.',
      dibujo: `
        <path class="fondo" d="M6 60 C40 54 80 60 112 72 C140 80 166 82 184 82 L198 80 C204 70 214 66 220 72 C216 76 210 80 208 84 L232 84 C238 84 238 90 232 90 L210 92 L234 94 C240 95 239 101 233 101 L210 100 L230 104 C235 106 233 111 228 110 L204 106 L184 104 C160 106 140 110 116 114 C80 122 40 120 6 116 Z"/>
        <path class="fino" d="M106 92 C112 89 122 89 128 94"/>
        <path class="fino" d="M132 99 C150 97 168 96 182 95 M140 104 C156 102 170 101 182 100"/>
        <path class="fino" d="M30 88 C56 86 80 88 98 92"/>
        <path class="fino" d="M184 84 C186 92 186 98 184 104"/>`,
      senal: [117, 92],
      rotulo: [96, 152],
    },
  ],
];
