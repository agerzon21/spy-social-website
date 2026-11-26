import type { PressStrings } from '../strings'

/** Spanish (es): neutral Latin American, «tú» like the app; the app's words (src/help/locales/es.ts). */
const es: PressStrings = {
  eyebrow: 'Kit de prensa',
  title: 'Prensa',
  lede: 'Para periodistas y creadores: qué es SpySocial, los datos clave, y logotipos y capturas para usar en tu cobertura.',
  email: 'Escribe al equipo',
  toAssets: 'Logotipos y capturas',
  about: {
    eyebrow: 'En un párrafo',
    title: 'Sobre SpySocial',
    short: (_day, out) =>
      `SpySocial es un juego de fiesta gratuito de faroles y deducción para 3 a 21 jugadores, cada uno con su propio teléfono o tablet. Todos conocen el secreto menos los espías. En Spy Talk el secreto es un lugar, y los jugadores se turnan para hacer y responder preguntas. En Spy Sketch es una palabra, y los jugadores se turnan para dibujarla en una misma pizarra mientras los espías disimulan. Después, la mesa vota. La versión 2.2 ${out ? 'salió' : 'sale'} en iPhone, iPad y Android, con Spy Sketch, mesas de Jugar en línea, un tutorial guiado, Noches de Juegos, amigos, intercambios y 10 idiomas. No hay anuncios, y lo único que se vende es una membresía opcional.`,
    moreTitle: 'La versión larga',
    sections: [
      {
        title: 'Dos juegos',
        text: 'En Spy Talk el secreto es un lugar. Los jugadores se turnan para hacer y responder preguntas, escritas o dictadas con el micrófono. Si eres demasiado vago, pareces un espía; si eres demasiado obvio, los espías descubren dónde están. En Spy Sketch el secreto es una palabra, que se dibuja por turnos en una misma pizarra mientras los espías también dibujan e intentan que no los atrapen. Los dos se juegan en Clásico o en Espía Mafia, donde los espías se conocen y comparten un chat secreto. Los locales ganan si expulsan con su voto a todos los espías. Los espías ganan si adivinan el secreto o si siguen ocultos hasta que se acaba el tiempo.',
      },
      {
        title: 'Formas de jugar',
        text: 'Las salas privadas admiten hasta 21 personas con sus propias reglas y paquetes, y los amigos entran con un código QR, un enlace de invitación o el código de la sala. Jugar en línea te sienta en una mesa de 4 u 8, donde los desconocidos se ven como colores de agente, como el Agente Turquesa, no por su nombre. La Noche de Juegos es un evento en línea programado, con títulos que solo se consiguen esa noche. Los jugadores nuevos empiezan con un tutorial guiado de unos tres minutos y luego juegan partidas de práctica contra agentes de IA, calificadas de la A a la F.',
      },
      {
        title: '10 idiomas',
        text: 'Inglés, español, ruso, francés, portugués de Brasil, indonesio, hindi, bengalí, árabe y chino simplificado. En una misma mesa, cada jugador ve el juego en su propio idioma, y el chat se traduce automáticamente.',
      },
      {
        title: 'Se gana jugando',
        text: 'Los jugadores crean un agente de cine negro y ganan XP, títulos, marcos y celebraciones jugando. Las intercepciones, expedientes sellados que se ganan jugando, se abren y dan un objeto al azar, y las probabilidades se muestran antes de abrir una. Se pueden intercambiar objetos con amigos, y los adultos pueden comerciar en el Mercado Negro con Intel, la moneda propia del juego, que solo se gana jugando. El dinero real nunca compra objetos, intercepciones ni Intel, y nada de eso tiene valor en efectivo. Los coleccionables no son NFT, tokens ni criptomonedas.',
      },
      {
        title: 'Gratis, con una sola cosa a la venta',
        text: 'No hay anuncios. Spy Talk, Spy Sketch, la Noche de Juegos, las intercepciones, los intercambios y el Mercado Negro son gratis. Lo único que se vende es una membresía opcional: la membresía mensual o anual, o la de por vida (un solo pago). Desbloquea todos los paquetes premium para todos en las salas que organiza el miembro o en su mesa de Jugar en línea, y añade el creador de paquetes, un 50 % más de XP y mesas solo para miembros. No se venden paquetes sueltos ni lotes, y las intercepciones y la Intel nunca se venden.',
      },
    ],
  },
  facts: {
    eyebrow: 'De un vistazo',
    title: 'Ficha técnica',
    labels: {
      name: 'Nombre',
      developer: 'Desarrollador',
      genre: 'Género',
      platforms: 'Plataformas',
      players: 'Jugadores',
      release: 'Lanzamiento',
      price: 'Precio',
      membership: 'Membresía',
      languages: 'Idiomas',
      age: 'Edad',
      website: 'Sitio web',
      stores: 'Descárgalo',
      community: 'Comunidad',
      press: 'Contacto de prensa',
    },
    developer: 'SpySocial LLC, Pensilvania, EE. UU.',
    genre: 'Juego de fiesta de deducción social',
    platforms: 'iPhone, iPad y teléfonos y tablets Android. Los jugadores de iPhone y Android juegan juntos.',
    players: 'De 3 a 21 en una sala privada. Jugar en línea: mesas de 4 u 8.',
    release: (_day, out) =>
      out
        ? `La versión 2.2 ya está disponible, como actualización gratuita en App Store y Google Play.`
        : `La versión 2.2 llega pronto. SpySocial ya está en App Store y Google Play, y la 2.2 es una actualización gratuita.`,
    price: 'Gratis para descargar y jugar. Sin anuncios.',
    membership: (month, year, life) =>
      `Opcional, y lo único que se vende: la membresía mensual a ${month} al mes o la anual a ${year} al año (se renuevan hasta cancelarlas), o la membresía de por vida a ${life}, en un solo pago. Precios de EE. UU.; varían según el país. No se venden paquetes sueltos ni lotes.`,
    languages:
      'Inglés, español, ruso, francés, portugués de Brasil, indonesio, hindi, bengalí, árabe, chino simplificado. Todos menos los tres primeros aparecen como Beta en la app.',
    age: '13 años o más',
    press: '<email/>, con «Prensa» en el asunto',
  },
  assets: {
    eyebrow: 'Descargas',
    title: 'Logotipos y capturas',
    sub: 'Úsalos en artículos y videos sobre SpySocial.',
    logoInk: 'Logotipo para fondos claros',
    logoCream: 'Logotipo para fondos oscuros',
    icon: 'Ícono de la app',
    banner: 'Banner',
    shotsTitle: 'Capturas',
    shotsSub: 'De la ficha de la 2.2 en las tiendas, con los textos en el idioma de esta página. Elige otro idioma arriba para ver sus capturas.',
    file: (what, format) => `${what}, ${format}`,
  },
  safety: {
    eyebrow: 'Para familias y plataformas',
    title: 'Seguridad',
    points: [
      'SpySocial es para personas de 13 años en adelante.',
      'Los jugadores solo chatean dentro de una sala o un grupo, con las personas que están en él. No hay mensajes directos.',
      'Los filtros del chat bloquean insultos y amenazas. En cualquier sala con un jugador menor de 18 años, los enlaces, los correos, los números de teléfono y las redes sociales se bloquean para todos.',
      'En las mesas de Jugar en línea, los desconocidos ven un color de agente, no un nombre.',
      'Se puede reportar a cualquier jugador, mensaje, dibujo o paquete, y bloquear a cualquiera. Una persona lee cada reporte en menos de 24 horas, y los que tratan de la seguridad infantil o de un jugador menor de 18 años van primero.',
    ],
  },
  contact: {
    title: 'Contacto de prensa',
    text: 'Entrevistas, acceso para reseñas o preguntas sobre jugar SpySocial en tu canal: escribe a <email/> con «Prensa» en el asunto.',
  },
}

export default es
