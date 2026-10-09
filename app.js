/* Chirimbolo · app.js
   Tres láminas al día, las mismas para todos. Sin servidor: el reto sale de la fecha
   (hora de Madrid) y la partida se guarda en localStorage. El contenido está en data/dias.js. */
'use strict';

/** Día nº 1 del juego (fecha de Madrid). Cambiarlo cambia la numeración y el reto de cada día. */
const INICIO = { anio: 2026, mes: 10, dia: 7 };
const CLAVE = 'chirimbolo:v1';
const PARTIDAS = 3;
const NIVELES = ['Fácil', 'Media', 'Difícil'];
const MS_DIA = 86400000;

const ESTADISTICAS_INICIALES = { dias: 0, partidas: 0, aciertos: 0, racha: 0, mejorRacha: 0, ultimoDia: 0 };

const LLAMA =
  '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 .8c.4 3 4.6 4.6 4.6 9A4.6 4.6 0 0 1 3.4 9.9c0-2 1.2-3.3 1.9-4.6.6 1 .9 1.9.9 3C7.5 6.7 8.4 4 8 .8z"/></svg>';

const app = document.getElementById('app');
const aviso = document.getElementById('aviso');
const reglas = document.getElementById('reglas');

const parametros = new URLSearchParams(location.search);
/** Modo prueba: ?dia=3 muestra el reto del día 3 sin tocar la partida guardada. */
const diaPrueba = /^\d+$/.test(parametros.get('dia') || '') ? Math.max(1, Number(parametros.get('dia'))) : 0;
/** En modo prueba las respuestas solo viven en memoria (se pierden al recargar). */
let respuestasPrueba = [];

let guardado = cargar();
let diaMostrado = 0;
/** Partida en pantalla (0, 1, 2) o PARTIDAS para el resumen. */
let vista = 0;

/* ---------- Almacenamiento ---------- */

function cargar() {
  try {
    const crudo = localStorage.getItem(CLAVE);
    if (crudo) return JSON.parse(crudo);
  } catch (e) {
    // Sin almacenamiento (modo privado, etc.): se juega igual, sin memoria.
  }
  return { estadisticas: { ...ESTADISTICAS_INICIALES }, partida: null, reglasVistas: false };
}

function guardar() {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(guardado));
  } catch (e) {
    // Ídem.
  }
}

// Solo en local (Mac o móvil en la misma red): ?reiniciar borra la partida y la racha.
if (/^(localhost|127\.|10\.|192\.168\.)/.test(location.hostname) && parametros.has('reiniciar')) {
  try { localStorage.removeItem(CLAVE); } catch (e) { /* nada que borrar */ }
  guardado = cargar();
  history.replaceState(null, '', location.pathname);
}

/* ---------- Fechas (hora de Madrid) ---------- */

const RELOJ_MADRID = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Madrid',
  year: 'numeric', month: 'numeric', day: 'numeric',
  hour: 'numeric', minute: 'numeric', second: 'numeric', hourCycle: 'h23',
});

function ahoraEnMadrid(momento = new Date()) {
  const p = {};
  for (const { type, value } of RELOJ_MADRID.formatToParts(momento)) p[type] = Number(value);
  return p;
}

/** Número del reto de hoy (nº 1 el día de INICIO). */
function numeroDeHoy() {
  const m = ahoraEnMadrid();
  const hoy = Date.UTC(m.year, m.month - 1, m.day);
  const inicio = Date.UTC(INICIO.anio, INICIO.mes - 1, INICIO.dia);
  return Math.max(1, Math.round((hoy - inicio) / MS_DIA) + 1);
}

/** Tiempo hasta la medianoche de Madrid, también los días de cambio de hora (23 o 25 horas). */
function cuentaAtras() {
  const ahora = Date.now();
  const m = ahoraEnMadrid(new Date(ahora));
  let s = 86400 - (m.hour * 3600 + m.minute * 60 + m.second);
  // Se mira qué hora marcará Madrid al cabo de s segundos y se corrige la diferencia.
  const luego = ahoraEnMadrid(new Date(ahora + s * 1000));
  const pasado = luego.hour * 3600 + luego.minute * 60 + luego.second;
  s = Math.max(0, luego.day === m.day ? s + 86400 - pasado : s - pasado);
  const dos = (n) => String(n).padStart(2, '0');
  return `${dos(Math.floor(s / 3600))}:${dos(Math.floor(s / 60) % 60)}:${dos(s % 60)}`;
}

/* ---------- Reto del día ---------- */

/** Pasado el último día de data/dias.js, el ciclo vuelve a empezar. */
function retoDelDia(numero) {
  return DIAS[(numero - 1) % DIAS.length];
}

/** Generador pseudoaleatorio determinista (mulberry32): todos ven las opciones en el mismo orden. */
function aleatorio(semilla) {
  let a = semilla >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function opcionesDe(numero, indice, p) {
  const rnd = aleatorio(numero * 7919 + indice * 104729);
  const opciones = [p.palabra, ...p.falsas];
  for (let i = opciones.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [opciones[i], opciones[j]] = [opciones[j], opciones[i]];
  }
  return opciones;
}

function respuestasDe(numero) {
  if (diaPrueba) return respuestasPrueba;
  return guardado.partida && guardado.partida.dia === numero ? guardado.partida.respuestas : [];
}

function aciertosDe(reto, respuestas) {
  return respuestas.map((r, i) => r === reto[i].palabra);
}

/* ---------- Estadísticas ---------- */

/** La racha cuenta los días seguidos en que se juegan las tres partidas, se acierte o no. */
function registrarDia(e, dia, aciertos) {
  if (e.ultimoDia === dia) return e;
  const racha = e.ultimoDia === dia - 1 ? e.racha + 1 : 1;
  return {
    dias: e.dias + 1,
    partidas: e.partidas + aciertos.length,
    aciertos: e.aciertos + aciertos.filter(Boolean).length,
    racha,
    mejorRacha: Math.max(e.mejorRacha, racha),
    ultimoDia: dia,
  };
}

/** Si se salta un día, la racha se pierde. */
function rachaVigente(e, hoy) {
  return e.ultimoDia >= hoy - 1 ? e.racha : 0;
}

/* ---------- Almanaque ---------- */

/** Con las tres partidas de hoy jugadas, la mano ☜ marca Chirimbolo como «Hecho» en Almanaque,
    y su hoja muestra los aciertos del día y la racha. */
function avisarAlmanaque(numero, reto, respuestas) {
  if (!window.almanaqueHecho) return;
  const aciertos = aciertosDe(reto, respuestas);
  window.almanaqueHecho({
    aciertos: aciertos.filter(Boolean).length,
    total: aciertos.length,
    racha: rachaVigente(guardado.estadisticas, numero),
  });
}

/* ---------- Interfaz ---------- */

function esc(texto) {
  return String(texto).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

function numeroActual() {
  return diaPrueba || numeroDeHoy();
}

function render() {
  const numero = numeroActual();
  if (numero !== diaMostrado) {
    diaMostrado = numero;
    vista = Math.min(respuestasDe(numero).length, PARTIDAS);
  }
  const reto = retoDelDia(numero);
  const respuestas = respuestasDe(numero);
  const terminado = respuestas.length === PARTIDAS;
  if (terminado && !diaPrueba) avisarAlmanaque(numero, reto, respuestas);

  document.getElementById('numero').textContent = `nº ${numero}`;
  document.getElementById('racha').innerHTML = diaPrueba
    ? 'prueba'
    : `${LLAMA}<span class="visualmente-oculto">Racha: </span>${rachaVigente(guardado.estadisticas, numero)}`;

  app.innerHTML = `
    ${diaPrueba ? avisoPrueba(numero) : ''}
    ${progreso(reto, respuestas)}
    ${vista < PARTIDAS ? partida(numero, vista, reto[vista], respuestas[vista]) : resumen(numero, reto, respuestas)}
  `;

  app.querySelectorAll('.opcion').forEach((b) =>
    b.addEventListener('click', () => responder(numero, vista, b.dataset.valor)),
  );
  const seguir = app.querySelector('#seguir');
  if (seguir) {
    seguir.addEventListener('click', () => {
      vista++;
      render();
      scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  const aciertos = aciertosDe(reto, respuestas);
  const compartirBoton = app.querySelector('#compartir');
  if (compartirBoton) compartirBoton.addEventListener('click', () => compartir(numero, aciertos));
  const copiarBoton = app.querySelector('#copiar');
  if (copiarBoton) copiarBoton.addEventListener('click', () => copiar(numero, aciertos));
}

function avisoPrueba(numero) {
  const total = DIAS.length;
  const enlace = (n, texto, etiqueta) =>
    `<a href="?dia=${n}" aria-label="${etiqueta}" ${n < 1 ? 'aria-disabled="true" tabindex="-1"' : ''}>${texto}</a>`;
  return `
    <p class="prueba">
      ${enlace(numero - 1, '‹', 'Día anterior')}
      <span>Modo prueba · día ${numero} (contenido ${((numero - 1) % total) + 1} de ${total})</span>
      ${enlace(numero + 1, '›', 'Día siguiente')}
    </p>`;
}

function progreso(reto, respuestas) {
  const aciertos = aciertosDe(reto, respuestas);
  const pasos = NIVELES.map((nombre, i) => {
    const estado = i < aciertos.length ? (aciertos[i] ? 'bien' : 'mal') : '';
    const texto = i < aciertos.length ? (aciertos[i] ? ', acertada' : ', fallada') : '';
    return `<li class="${estado} ${i === vista ? 'actual' : ''}" ${i === vista ? 'aria-current="step"' : ''}>${nombre}<span class="visualmente-oculto">${texto}</span></li>`;
  }).join('');
  return `<ol class="progreso" aria-label="Partidas del día">${pasos}</ol>`;
}

/** La ilustración con su punto rojo y la línea de llamada, como en un diccionario ilustrado. */
function lamina(indice, p) {
  const [x, y] = p.senal;
  const [rx, ry] = p.rotulo;
  return `
    <figure class="lamina">
      <svg viewBox="0 0 240 180" role="img" aria-label="Lámina: ${esc(p.campo)}. Un punto rojo señala la parte por la que se pregunta.">
        <g class="trazo">${p.dibujo}</g>
        <g class="llamada">
          <line x1="${x}" y1="${y}" x2="${rx}" y2="${ry}"/>
          <circle class="remate" cx="${rx}" cy="${ry}" r="2"/>
          <circle class="halo" cx="${x}" cy="${y}" r="6"/>
          <circle class="punto" cx="${x}" cy="${y}" r="4.6"/>
        </g>
      </svg>
      <figcaption><span>Lám. ${['i', 'ii', 'iii'][indice]}</span> · ${esc(p.campo)}</figcaption>
    </figure>`;
}

function partida(numero, indice, p, respuesta) {
  const jugada = respuesta !== undefined;
  const opciones = opcionesDe(numero, indice, p)
    .map((op) => {
      let estado = '';
      let senal = '';
      if (jugada) {
        if (op === p.palabra) {
          estado = 'correcta';
          senal = '✓ Correcta';
        } else if (op === respuesta) {
          estado = 'fallada';
          senal = '✗ Tu respuesta';
        } else {
          estado = 'apagada';
        }
      }
      return `<button class="opcion ${estado}" type="button" data-valor="${esc(op)}" ${jugada ? 'disabled' : ''}>
          <span class="palabra">${esc(op)}</span>${senal ? `<span class="senal">${senal}</span>` : ''}
        </button>`;
    })
    .join('');

  return `
    <section class="reto">
      ${lamina(indice, p)}
      <h2 class="enunciado">¿Cómo se llama esto?</h2>
      <div class="opciones">${opciones}</div>
    </section>
    ${jugada ? revelacion(p, respuesta === p.palabra, indice === PARTIDAS - 1) : ''}
  `;
}

function revelacion(p, acierto, ultima) {
  return `
    <section class="revelacion">
      <p class="veredicto ${acierto ? 'bien' : 'mal'}">
        ${acierto ? '¡Exacto! Tiene nombre.' : `No: se llama ${esc(p.palabra)}.`}
      </p>
      ${ficha(p)}
    </section>
    <button id="seguir" class="boton" type="button">${ultima ? 'Ver resultado' : 'Siguiente lámina'}</button>
  `;
}

/** Ficha de diccionario: lema, género, definición y curiosidad. */
function ficha(p) {
  return `
    <article class="ficha">
      <p class="entrada"><span class="lema">${esc(p.palabra)}</span><span class="genero">${esc(p.genero)}</span></p>
      <p class="definicion">${esc(p.definicion)}</p>
      <p class="curiosidad"><strong>Curiosidad.</strong> ${esc(p.curiosidad)}</p>
      <p class="fuente"><a href="https://dle.rae.es/${encodeURIComponent(p.palabra)}" target="_blank" rel="noopener">Ver en el DLE</a></p>
    </article>
  `;
}

/* ---------- Resumen ---------- */

function resumen(numero, reto, respuestas) {
  const aciertos = aciertosDe(reto, respuestas);
  const total = aciertos.filter(Boolean).length;
  const e = guardado.estadisticas;
  const porcentaje = e.partidas ? Math.round((e.aciertos / e.partidas) * 100) : 0;
  const lista = reto
    .map(
      (p, i) => `
        <li>
          <details>
            <summary>
              <span class="marca ${aciertos[i] ? 'bien' : 'mal'}" aria-label="${aciertos[i] ? 'Acierto' : 'Fallo'}">${aciertos[i] ? '✓' : '✗'}</span>
              <span class="lema">${esc(p.palabra)}</span>
              <span class="campo">${esc(p.campo)}</span>
            </summary>
            <div class="detalle">${ficha(p)}</div>
          </details>
        </li>`,
    )
    .join('');
  const casillas = aciertos.map((a) => `<span class="${a ? 'bien' : ''}"></span>`).join('');
  const puedeCompartir = typeof navigator.share === 'function';

  return `
    <section class="resumen">
      <h2>${total} de ${PARTIDAS}</h2>
      <div class="casillas" aria-hidden="true">${casillas}</div>
      <ol class="lista-resumen">${lista}</ol>
      <p class="nota">Toca una palabra para repasar su ficha.</p>
    </section>

    ${
      diaPrueba
        ? ''
        : `<section class="estadisticas" aria-label="Estadísticas">
            <div><strong>${e.dias}</strong><span>días</span></div>
            <div><strong>${porcentaje}%</strong><span>aciertos</span></div>
            <div><strong>${rachaVigente(e, numero)}</strong><span>racha</span></div>
            <div><strong>${e.mejorRacha}</strong><span>mejor racha</span></div>
          </section>`
    }

    <p class="vista-previa" aria-label="Resultado para compartir">${esc(lineaResultado(numero, aciertos))}</p>
    ${puedeCompartir ? '<button id="compartir" class="boton" type="button">Compartir</button>' : ''}
    <button id="copiar" class="boton ${puedeCompartir ? 'boton-secundario' : ''}" type="button">Copiar resultado</button>
    <a class="boton boton-almanaque" data-almanaque-volver hidden href="https://joseleking.github.io/Almanaque/">☜ Regresar al Almanaque</a>
    <p class="siguiente">Nuevas láminas en <time id="cuenta">${cuentaAtras()}</time></p>
  `;
}

/* ---------- Acciones ---------- */

function responder(numero, indice, valor) {
  const respuestas = respuestasDe(numero);
  if (respuestas.length !== indice) return;
  const nuevas = [...respuestas, valor];
  if (diaPrueba) {
    respuestasPrueba = nuevas;
  } else {
    let estadisticas = guardado.estadisticas;
    if (nuevas.length === PARTIDAS) {
      estadisticas = registrarDia(estadisticas, numero, aciertosDe(retoDelDia(numero), nuevas));
    }
    guardado = { ...guardado, estadisticas, partida: { dia: numero, respuestas: nuevas } };
    guardar();
  }
  render();
  const revelada = app.querySelector('.revelacion');
  if (revelada) revelada.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/** «Chirimbolo nº 4 · 🟥🟥⬜»: rojo, acierto; blanco, fallo. */
// Una marca por lámina: ▰ acertada, ▱ fallada. «Chirimbolo nº 7 ▰▱▰ 2/3 aciertos» y el enlace.
function lineaResultado(numero, aciertos) {
  const marcas = aciertos.map((a) => (a ? '▰' : '▱')).join('');
  return `Chirimbolo nº ${numero} ${marcas} ${aciertos.filter(Boolean).length}/${aciertos.length} aciertos`;
}

function textoCompartir(numero, aciertos) {
  return `${lineaResultado(numero, aciertos)}\njoseleking.github.io/Chirimbolo`;
}

async function compartir(numero, aciertos) {
  try {
    await navigator.share({ text: textoCompartir(numero, aciertos) });
  } catch (err) {
    if (err && err.name === 'AbortError') return;
    copiar(numero, aciertos);
  }
}

async function copiar(numero, aciertos) {
  try {
    await navigator.clipboard.writeText(textoCompartir(numero, aciertos));
    mostrarAviso('Resultado copiado');
  } catch (err) {
    mostrarAviso('No se pudo copiar');
  }
}

function mostrarAviso(texto) {
  aviso.textContent = texto;
  aviso.classList.add('visible');
  setTimeout(() => aviso.classList.remove('visible'), 2000);
}

/* ---------- Reglas ---------- */

reglas.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => reglas.close()));
reglas.addEventListener('click', (ev) => {
  if (ev.target === reglas) reglas.close();
});
document.getElementById('ayuda').addEventListener('click', () => reglas.showModal());

function reglasPrimeraVez() {
  if (guardado.reglasVistas) return;
  reglas.showModal();
  guardado = { ...guardado, reglasVistas: true };
  guardar();
}

/* ---------- Arranque ---------- */

/**
 * La portada con el logo se ve al menos 1,5 s desde que se abre la página (y 1,4 s desde que se
 * pinta, por si tarda la primera visita) y luego se desvanece. `despues` corre poco después de
 * empezar el fundido.
 */
function retirarPortada(despues) {
  const portada = document.getElementById('portada');
  if (!portada) return despues?.();
  const pintada = performance.getEntriesByName('first-contentful-paint')[0]?.startTime ?? performance.now();
  setTimeout(() => {
    portada.classList.add('oculta');
    setTimeout(() => portada.remove(), 500);
    if (despues) setTimeout(despues, 350);
  }, Math.max(0, 1500 - performance.now(), 1400 - (performance.now() - pintada)));
}

function iniciar() {
  if (typeof DIAS === 'undefined' || !DIAS.length) {
    app.innerHTML = '<p class="error">No se han podido cargar las láminas. Prueba a recargar la página.</p>';
    retirarPortada();
    return;
  }

  render();
  retirarPortada(reglasPrimeraVez);

  // Cada segundo: la cuenta atrás y, a medianoche de Madrid, el reto nuevo.
  setInterval(() => {
    if (!diaPrueba && numeroDeHoy() !== diaMostrado) return render();
    const cuenta = document.getElementById('cuenta');
    if (cuenta) cuenta.textContent = cuentaAtras();
  }, 1000);
}

iniciar();

if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  navigator.serviceWorker.register('sw.js');
}
