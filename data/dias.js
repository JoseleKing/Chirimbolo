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
];
