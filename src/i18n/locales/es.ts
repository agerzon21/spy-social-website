import type { Strings } from './en'

/** Spanish (es): neutral Latin American, «tú» like the app; the app's words (Crear sala, «Jugar en línea», Buscar partida, Ajustes, Reportar, anfitrión, noche de juegos), UI labels quoted «así». */
const es: Strings = {
  meta: {
    siteName: 'SpySocial',
    defaultTitle: 'SpySocial — El juego de fiesta del engaño social',
    description:
      'Encuentra al espía o engaña a todos. Juego de fiesta multijugador gratis y en tiempo real para 3–21 jugadores. Disponible en iOS y Google Play.',
    titles: {
      /** The Beta 2 playtester page (/beta). */
      beta: 'Beta 2: juega SpySocial antes del lanzamiento',
      /** The transparency page (/transparency), live with LIVE.transparencyPage. */
      /** The collectibles ledger (/ledger), live with LIVE.mintedCollectibles. */
      ledger: "Registro de coleccionables",
      /** The Archive (archive.spysocial.app: /, /uniques, /u/<item>/<serial>), live with LIVE.mintedCollectibles. */
      archive: "El Archivo",
      /** The Market (market.spysocial.app and its pages), live with LIVE.marketSite: the Black Market's prices. */
      market: "Precios del Mercado Negro",
      transparency: "Informe de transparencia",
      /** The Game Night rules page (/game-night-rules), live with LIVE.gameNightRules. */
      gameNightRules: "Reglas de la Noche de Juego",
      faq: "Ayuda y preguntas frecuentes",
      contact: 'Contacto',
      rules: 'Normas de la comunidad',
      safety: 'Seguridad',
      privacy: 'Política de privacidad',
      terms: 'Términos de servicio',
      childSafety: 'Estándares de seguridad infantil',
      whatsNew: 'Novedades',
      roadmap: 'Hoja de ruta',
      deleteAccount: 'Eliminar tu cuenta',
      join: 'Unirse a una partida',
      joinEvent: 'Noche de Juegos pública',
      resetPassword: 'Restablecer contraseña',
      /** /reset-password once passwords are gone (LIVE.passwordless; set by the page's own Helmet). */
      resetPasswordCode: "Inicia sesión con un código",
      confirmSuccess: 'Correo confirmado',
      notFound: 'Página no encontrada',
    },
    descriptions: {
      beta: 'Únete a una prueba de juego en grupo, en vivo y de 1 hora, de SpySocial, un juego gratis de deducción social para fiestas: jueves 12 de noviembre de 2026, de 7 a 8 p. m., hora del Este de EE. UU. Solo mayores de 18, en iPhone o Android. Los testers se quedan con el Pin beta y más.',
      ledger: "El registro público de cada coleccionable de SpySocial: cada copia y su número. Cualquiera puede comprobarlo.",
      archive: "Cada Único de SpySocial registrado: su imagen, número, atributos, cómo se acuñó y cada venta, sin nombrar a ningún jugador.",
      market: "Lo que vale cada objeto de SpySocial en el Mercado Negro: precios según las operaciones de los jugadores, lo que más sube y baja y lo más comerciado, sin nombrar a ningún jugador.",
      transparency: "Cada mes, cuánta Intel se ganó, gastó y corrigió en SpySocial, cada incidente y cada cambio de reglas, sin nombrar a ningún jugador.",
      gameNightRules: "Las reglas de la Noche de Juego semanal de SpySocial: cuándo es, quién puede participar, cómo conseguir los títulos de la noche y el título extra del desarrollador.",
      faq: "Ayuda de SpySocial: cómo jugar Spy Talk y Spy Sketch, Jugar en línea, salas privadas y Noche de Juegos, amigos, intercambios, el Mercado Negro, intercepciones, Intel, membresía, tu cuenta, seguridad y solución de problemas.",
      contact: 'Contacta al equipo de SpySocial: escríbenos a support@spysocial.app para pedir ayuda con la app, tu cuenta o cualquier otra cosa.',
      rules: 'Las normas de la comunidad de SpySocial: sé amable, farolea sin hacer trampa, mantén tus datos en privado y qué pasa cuando alguien rompe las normas.',
      safety: 'Seguridad en SpySocial para jugadores de 13 a 17 años y para madres, padres y tutores: cómo salir, bloquear y reportar, y dónde pedir ayuda.',
      privacy: 'Cómo SpySocial recopila, usa y protege tus datos personales, quién los recibe, cuánto tiempo los guardamos y cuáles son tus derechos de privacidad.',
      terms: 'Los términos para usar SpySocial: quién puede jugar, tu cuenta y tu contenido, las salas públicas, las normas de la comunidad, la moderación y las apelaciones.',
      childSafety: 'Los estándares de SpySocial contra el abuso y la explotación sexual infantil: qué prohibimos, cómo reportar un problema, qué hacemos y nuestro contacto de seguridad infantil.',
      whatsNew: 'Notas de versión de SpySocial: funciones nuevas, correcciones y mejoras de cada versión de la app.',
      roadmap:
        'Lo que viene a SpySocial: todo lo de la versión 2.2, de «Jugar en línea» y Spy Sketch a la traducción automática del chat, y lo que planeamos después: partidas competitivas, temporadas y torneos.',
      deleteAccount: 'Cómo eliminar tu cuenta de SpySocial y sus datos, en la app o por correo, y qué se conserva durante un tiempo.',
    },
  },

  language: {
    button: (name: string) => `Idioma: ${name}. Cambiar idioma`,
    menu: 'Idioma',
  },

  header: {
    home: 'Inicio de SpySocial',
    skip: 'Saltar al contenido',
    nav: 'Sitio',
    join: 'Unirse a una sala',
    joinShort: 'Unirse',
    shop: 'Tienda',
    toLight: 'Cambiar a modo claro',
    toDark: 'Cambiar a modo oscuro',
  },

  footer: {

    /** The link to the Market (LIVE.marketSite). */

    market: "Precios del Mercado Negro",
    /** The link to the transparency page (LIVE.transparencyPage). */
    transparency: "Transparencia",
    /** The link to the Game Night rules, once they're live (LIVE.gameNightRules). */
    gameNightRules: "Reglas de la Noche de Juego",
    /** The link to the /beta playtest page, shown only until sign-ups close. */
    beta: "Prueba Beta 2",
    tagline: 'El juego de fiesta del engaño social.',
    play: 'Jugar',
    legal: 'Legal y seguridad',
    browser: 'Juega en tu navegador',
    whatsNew: 'Novedades',
    roadmap: 'Hoja de ruta',
    rules: 'Normas',
    support: 'Ayuda',
    contact: 'Contacto',
    shop: 'Tienda',
    privacy: 'Privacidad',
    terms: 'Términos',
    childSafety: 'Seguridad infantil',
    safety: 'Seguridad',
    deleteAccount: 'Eliminar cuenta',
    rights: (year: number, holder = 'SpySocial') => `© ${year} ${holder}. Todos los derechos reservados`,
    follow: 'Sigue a SpySocial',
    on: (network: string) => `SpySocial en ${network}`,
    discordHandle: 'Servidor de SpySocial',
  },

  notice: {
    englishOnly: 'Esta página solo está disponible en inglés. Rige la versión en inglés.',
    translated: 'Esta página es una traducción. Si difiere de la versión en inglés, rige la versión en inglés.',
    readEnglish: 'Leer en inglés',
    englishSections:
      'Las dos secciones siguientes forman parte de nuestra Política de privacidad y solo están disponibles en inglés. Rige la versión en inglés.',
  },

  common: {
    lastUpdated: (date: string) => `Última actualización: ${date}`,
    goHome: 'Ir al inicio',
    close: 'Cerrar',
    openInApp: 'Abrir en SpySocial',
    appStore: 'Descárgalo en el App Store',
    googlePlay: 'Disponible en Google Play',
    noAppIos: '¿No tienes la app? Descárgala',
    noAppAndroid: '¿No tienes la app? Consíguela',
    playInBrowser: 'Juega en tu navegador',
  },

  badges: {
    appStoreSmall: 'Descárgalo en el',
    appStoreName: 'App Store',
    appStoreAfter: '',
    appStoreLabel: 'Descárgalo en el App Store',
    playSmall: 'DISPONIBLE EN',
    playName: 'Google Play',
    playAfter: '',
    playLabel: 'Disponible en Google Play',
  },

  home: {
    hero: {
      eyebrow: 'El juego de fiesta del engaño social',
      title: 'Desconfía de todos',
      titleMark: '.',
      lede: '<b>Encuentra al espía, o engáñalos a todos.</b> Uno de tus amigos es el espía. Todos los demás conocen la ubicación secreta. Haz preguntas o dibuja pistas, y vota antes de que el espía descubra dónde están.',
      facts: ['De 3 a 21 jugadores', 'Multijugador en tiempo real', 'Gratis'],
      browser: 'Juega en tu navegador',
      joinCode: 'Únete con un código de sala',
    },
    creatorShort: {
      eyebrow: 'Creador destacado',
      title: (creator: string) => `Mira a ${creator} jugar Spy Sketch`,
      credit: (creator: string) => `Vídeo de <link>${creator}</link>`,
      cta: 'Juega gratis en tu navegador',
      play: (creator: string) => `Reproducir el vídeo de ${creator}`,
      consent: 'Al darle a reproducir, el vídeo se carga desde YouTube, que puede usar cookies. <link>Política de privacidad</link>',
    },
    lineup: {
      group: 'Una rueda de cinco agentes. Toca uno para acusarlo.',
      accuse: (n: number) => `Acusar al sospechoso ${n}`,
      wasSpy: (n: number) => `El sospechoso ${n} era el espía`,
      isLocal: (n: number) => `El sospechoso ${n} es un Local`,
      stampSpy: '¡Espía!',
      stampLocal: 'Local',
      tap: 'Toca a un sospechoso para acusarlo',
      eggFound: '¡Ojo de lince! Encontraste al espía al primer intento.',
      eggWhere: 'Tu código para un título secreto en la app (Cuenta > Ajustes > Introducir un código):',
    },
    how: {
      eyebrow: 'Cómo se juega',
      title: 'Sálvate hablando. O dibujando.',
      sub: 'Dos juegos, una regla: todos en la mesa conocen el secreto, menos el espía.',
      talk: {
        secret: 'El secreto es una ubicación',
        name: 'Spy Talk',
        text: 'Por turnos, cada uno hace una pregunta y responde otra. Si eres muy vago, pareces el espía. Si eres muy obvio, el espía descubre dónde están.',
        alt: 'Spy Talk: cada jugador hace una pregunta y otro jugador la responde',
      },
      sketch: {
        secret: 'El secreto es una palabra',
        name: 'Spy Sketch',
        text: 'Por turnos, la dibujan en una sola pizarra compartida. El espía dibuja sin saber qué es y espera que nadie se dé cuenta.',
        alt: 'Spy Sketch: los jugadores se turnan para dibujar la palabra secreta mientras el espía finge',
      },
    },
    round: {
      eyebrow: 'Una ronda',
      title: 'Cuatro tiempos',
      steps: [
        {
          title: 'La tarjeta',
          text: 'Ves el secreto, o una tarjeta que solo dice Espía.',
          alt: 'Revelación de roles: la tarjeta del espía dice Espía, así que tiene que descubrir dónde están todos',
        },
        { title: 'Las preguntas', text: 'Demuestra que lo sabes sin delatarlo.', alt: 'La tarjeta de pregunta a mitad de la ronda' },
        { title: 'La votación', text: 'Pide una votación contra quien suene raro.', alt: 'Votación: todos votan por el jugador que creen que es el espía' },
        {
          title: 'La apuesta',
          text: 'El espía puede arriesgarse a adivinar el secreto. Si acierta, gana; si falla, queda fuera.',
          alt: 'El espía elige la ubicación de la lista para ganar la ronda',
        },
      ],
      win: 'Los Locales ganan si expulsan a todos los espías. Los espías ganan si adivinan el secreto o si siguen ocultos hasta el final.',
    },
    who: {
      eyebrow: 'Con quién juegas',
      titleOnline: 'Tu gente. O extraños.',
      titleCrew: 'Trae a tu gente.',
      sub: 'Cada uno juega en su propio teléfono o tablet, alrededor de una mesa o en una llamada.',
      privateTitle: 'Sala privada',
      privateText: 'Hasta 21 jugadores. Tus amigos se unen con un código QR, un enlace de invitación o el código de sala. Tú eliges el modo y las reglas.',
      howJoin: [
        '<b>Escanea</b> el código QR en la pantalla del anfitrión',
        '<b>Toca</b> el enlace de invitación que te envíen',
        '<b>Escribe</b> el código de sala aquí o en la app',
      ],
      onlineTitle: 'Jugar en línea',
      onlineText: '«Buscar partida» te sienta en una mesa de 4 u 8. Los extraños nunca ven tu nombre, solo tu color de agente. También hay noches de juegos programadas.',
      agentsLabel: 'Colores de agente',
      agents: {
        Teal: 'Agente Turquesa',
        Coral: 'Agente Coral',
        Rose: 'Agente Fucsia',
        Lime: 'Agente Lima',
        Yellow: 'Agente Amarillo',
        Lilac: 'Agente Lila',
        Blue: 'Agente Azul',
        Mint: 'Agente Menta',
      },
      needsAccount: '«Jugar en línea» requiere una cuenta gratuita.',
    },
    joinForm: {
      label: 'Código de sala',
      button: 'Unirse',
      note: 'El código en la pantalla del anfitrión, de 4 a 8 letras y números.',
    },
    langs: {
      eyebrow: 'Diez idiomas',
      title: 'Misma mesa. Tu idioma.',
      sub: 'Cada jugador ve el juego en su propio idioma, incluido el secreto.',
      listLabel: 'Idiomas',
      chatAlt: 'Traducción del chat: un mensaje en español en el chat de la sala, mostrado en inglés',
      chatAuto: 'El chat también: un mensaje en otro idioma se traduce al tuyo en cuanto llega.',
      chatTap: 'El chat también: toca «Traducir» en cualquier mensaje para leerlo en el tuyo.',
      trioLabel: 'Una tarjeta de rol en tres idiomas',
      cardAlts: [
        'Revelación de roles: la tarjeta de un Local muestra la ubicación secreta, Teatro',
        'Tarjeta de rol en español: Teatro',
        'Tarjeta de rol en ruso: Театр',
      ],
    },
    safety: {
      title: 'Desde los 13 años',
      text: (o: { messages: boolean; drawings: boolean }) =>
        `Reporta o bloquea a cualquier jugador${
          o.messages && o.drawings
            ? ', o reporta un mensaje o un dibujo'
            : o.messages
              ? ', o reporta un mensaje'
              : o.drawings
                ? ', o reporta un dibujo'
                : ''
        }. En las salas con un jugador menor de 18 años se bloquean para todos los enlaces, los correos, los números de teléfono y las redes sociales, y los reportes que involucran a un jugador menor de 18 años se leen primero.`,
      rules: 'Normas de la comunidad',
      childSafety: 'Seguridad infantil',
      safety: 'Seguridad',
      privacy: 'Privacidad',
    },
    shop: {
      eyebrow: 'La tienda',
      title: 'Ponte la coartada',
      text: "La sudadera TRUST NO ONE., la camiseta I'm Not the Spy y más. Impresas y enviadas por nuestro socio de la tienda.",
      cta: 'Visitar la tienda',
      hoodieAlt: 'El estampado trasero de la sudadera: NO CONFÍES EN NADIE. con la cabeza del espía asomándose por arriba',
      teeAlt: 'El estampado trasero de la camiseta: (EL ESPÍA ERA YO 😂)',
    },
    final: {
      title: 'Tu mesa te espera',
      text: 'Gratis y sin anuncios.',
      /** Shown once the released app sells memberships (LIVE.purchases). The only things sold are memberships. */
      purchases: 'Membresías opcionales si quieres más lugares y palabras.',
    },
  },

  rules: {
    title: 'Normas de la comunidad',
    intro: (o: { onePool: boolean; photos: boolean }) =>
      `Las salas públicas${o.onePool ? ' (las mesas de «Jugar en línea» y nuestras noches de juegos)' : ''} te ponen a jugar con gente que no conoces. Estas normas hacen que sea divertido para todos. Se aplican a los nombres,${o.photos ? ' las fotos,' : ''} el chat, los dibujos y tu forma de jugar, en salas públicas y privadas, y forman parte de nuestros <link>Términos de servicio</link>.`,
    kind: {
      title: '1. Sé amable',
      hate: 'Nada de odio ni acoso: ni insultos dirigidos a un jugador, ni términos ofensivos, ni ataques a la identidad de nadie.',
      sexual: (photos: boolean) => `Nada de contenido sexual en el chat, los nombres${photos ? ', las fotos' : ''} ni los dibujos.`,
      threats: 'Nada de amenazas, ni nada que anime a alguien a hacerse daño.',
      selfHarm:
        'Nada que anime, promueva o dé instrucciones sobre el suicidio, las autolesiones, los trastornos alimentarios o los retos peligrosos. Esto vale para todos, en todas las salas.',
    },
    bluff: {
      title: '2. Farolea, no hagas trampa',
      lying: 'Mentir y farolear son el juego. Nunca son motivo para reportar a nadie.',
      cheating: 'Revelar la palabra o la ubicación, o ponerse de acuerdo con otros jugadores fuera del juego, es hacer trampa.',
      leaving: 'Salir de partidas a propósito, quedarse inactivo o retrasar una ronda la arruina para el resto de la sala.',
      online: (onePool: boolean) =>
        `En «Jugar en línea», no presentarte al inicio o salir de una partida ya empezada te da una pausa corta de ${onePool ? '«Jugar en línea»' : 'las partidas públicas'} (5 minutos, más si sigues saliendo).`,
    },
    privacy: {
      title: '3. Mantenlo en privado',
      personal: 'No compartas nombres reales, direcciones, números de teléfono ni usuarios de redes sociales, ni tuyos ni de nadie.',
      spam: 'Nada de anuncios, spam ni enlaces en las salas públicas.',
      minors:
        'En cualquier sala o grupo con un jugador menor de 18 años o que no nos haya dicho su edad se bloquean para todos los enlaces, los correos, los números de teléfono, las redes sociales y otros datos personales (una dirección, dónde vive alguien, un colegio, un nombre real). En las mesas de «Jugar en línea» y en las noches de juegos siempre están bloqueados.',
    },
    reports: {
      title: '4. Una persona lee los reportes',
      text: (o: { messages: boolean; drawings: boolean }) =>
        `Mantén pulsado a un jugador para reportarlo o bloquearlo.${
          o.messages ? ' Mantén pulsado un mensaje, una pregunta o una respuesta para reportarlo: el reporte lo incluye junto con el chat de alrededor.' : ''
        }${o.drawings ? ' También puedes reportar un dibujo.' : ''} Una persona lee cada reporte en menos de 24 horas. El chat público se guarda 14 días para poder revisar los reportes; el jugador que reportas no sabe quién lo envió.`,
    },
    /** Section 5, once members can make packs (LIVE.customPacks); `community`: LIVE.communityPacks. */
    packs: {
      title: '5. Paquetes personalizados',
      intro: 'Los paquetes que crean los miembros también siguen estas normas: el nombre, la descripción y cada entrada.',
      rules: [
        'Nada de lo que estas normas prohíben en otros lugares: nada de odio, contenido sexual ni amenazas, y nada que no sea apropiado para jugadores de 13 años en adelante.',
        'Nada de información personal ni de personas reales que conozcas: ni compañeros de clase, ni profesores, ni vecinos, ni direcciones, números de teléfono, escuelas o usuarios de redes sociales.',
        'Nada de anuncios, enlaces ni spam, y solo trabajo propio.',
      ],
      community:
        'Paquetes de la comunidad: una persona de nuestro equipo lee cada paquete antes de que nadie más pueda verlo. Si un paquete rompe estas normas, podemos rechazarlo, retirarlo de Paquetes de la comunidad o impedir que esa cuenta comparta paquetes. Cualquier jugador puede reportar un paquete de la comunidad, y una persona lee cada reporte en menos de 24 horas.',
      swearing:
        'Palabrotas: se permiten en los paquetes que juegas en tus propias salas privadas, nunca en los Paquetes de la comunidad, porque los usan jugadores menores de 18 años. Si un título lleva una (el de una película, por ejemplo), los Paquetes de la comunidad la muestran censurada: su primera letra y luego asteriscos (S***). Las palabrotas fuertes no se permiten allí en absoluto.',
    },
    child: {
      title: 'Seguridad infantil',
      text: 'Nunca permitimos contenido sexual que involucre a menores de 18 años, ni que alguien intente manipular, sexualizar o explotar a un niño. Lo eliminamos, bloqueamos las cuentas involucradas y lo reportamos al National Center for Missing & Exploited Children (NCMEC), como exige la ley. Si ves algo así, escribe a <email/> con «Child safety» en el asunto, y reporta al jugador en la app si compartiste sala con esa persona. También puedes reportarlo directamente a la <link>CyberTipline</link> del NCMEC (1-800-843-5678). Si un niño está en peligro inmediato, llama primero al número de emergencias local. Nuestros <link2>Estándares de seguridad infantil</link2> dan más detalles.',
      subject: 'Child safety',
    },
    breaking: {
      title: 'Qué pasa cuando alguien rompe las normas',
      text: 'Normalmente, primero una advertencia. Los problemas repetidos o graves llevan a un silencio en el chat (de 1 hora a 7 días), una pausa de las salas públicas y las Noches de Juegos (de 1 a 30 días) o un bloqueo de la cuenta. Compartir información personal de otra persona, o cualquier cosa que sexualice a un niño, puede significar un bloqueo inmediato. Cada aviso en la app dice qué está limitado, por qué y hasta cuándo, con un ID como S-207.',
      drawings:
        'Los dibujos en salas públicas y Noches de Juegos pueden revisarse automáticamente en cualquier momento, y los dibujos reportados también se revisan. Si un dibujo tuyo rompe estas normas, tu cuenta puede quedar pausada o bloqueada de las salas públicas y las Noches de Juegos, sin importar cuánto tiempo lleves jugando. En una sala pública, un turno que rompe estas normas se quita del dibujo y cuenta como falta: primero una advertencia, luego 3, 7 y 30 días sin salas públicas ni Noches de Juegos, y a la quinta falta en 90 días, para siempre. En cualquier sala, un símbolo de odio (una esvástica cuenta, salvo que la palabra de la ronda deje claro un significado religioso), un término ofensivo escrito o un mensaje de odio dirigido a alguien saca al jugador de la partida y de las salas públicas y las Noches de Juegos para siempre, y un dibujo que sexualiza a un niño cierra la cuenta y se trata como se indica arriba en Seguridad infantil. La sangre y los monstruos están permitidos. En una sala privada, un dibujo reportado solo se sanciona automáticamente cuando es así de grave; todo lo demás lo decide la persona que lee el reporte. Para apelar, escríbenos con el código de tu aviso.',
      drawingsTesters:
        'Por ahora, mientras la probamos, la revisión automática de dibujos solo se aplica en partidas en las que todos los jugadores forman parte de nuestro grupo de pruebas (quienes usan una versión de prueba de la app).',
    },
    age: { title: 'Edad', text: 'SpySocial es para jugadores de 13 años en adelante.' },
    appeal: {
      title: '¿Crees que nos equivocamos?',
      text: 'Escribe a <email/> e incluye el ID de tu aviso. Consulta también los <link>Términos de servicio</link> y la <link2>Política de privacidad</link2>.',
    },
  },

  safety: {
    title: 'Seguridad en SpySocial',
    intro:
      'SpySocial es un juego de fiesta para jugadores de 13 años en adelante. Esta página es para los adolescentes que lo juegan y para los padres y tutores que quieren saber cómo es. Ir a: <link>jugadores de 13 a 17 años</link>, <link2>padres y tutores</link2>, <link3>contactos de seguridad infantil</link3>, <link4>dónde pedir ayuda</link4>.',
    danger: {
      title: '¿Alguien está en peligro ahora mismo?',
      text: 'Llama al número de emergencias local: 999 en el Reino Unido, 911 en EE. UU., 112 en la UE. Luego repórtalo.',
    },
    teens: {
      title: 'Para jugadores de 13 a 17 años',
      intro: 'SpySocial tiene que ser divertido. Si alguien te hace sentir incómodo, con miedo o mal, puedes hacer algo enseguida, y no te vas a meter en problemas por eso.',
      leave: {
        title: 'Sal',
        text: 'Siempre puedes salir de una sala o de una partida: toca <b>Salir</b>. Tu seguridad importa más que cualquier partida.',
        online: (onePool: boolean) =>
          `En «Jugar en línea», salir de una partida ya empezada te da una pausa corta de ${onePool ? '«Jugar en línea»' : 'las partidas públicas'}. Sal de todos modos, y reporta al jugador si fue por su culpa.`,
      },
      block: {
        title: 'Bloquea',
        text: 'Mantén pulsado al jugador y toca <b>Bloquear</b>. No verás su chat, y ninguno de los dos podrá entrar en una sala donde esté el otro. No recibe ningún aviso. Puedes desbloquearlo cuando quieras en Ajustes, en Privacidad y seguridad: Jugadores bloqueados.',
      },
      report: {
        title: 'Reporta',
        text: 'Mantén pulsado al jugador, o algo que escribió en el chat, y toca <b>Reportar</b>. Elige qué pasó, agrega detalles si quieres y envíalo. Adjuntamos el chat por ti, así que no necesitas capturas de pantalla.',
      },
      tell: {
        title: 'Cuéntaselo a alguien',
        text: 'Habla con tu madre, tu padre, un tutor, un profesor u otro adulto de confianza. Si prefieres hablar con alguien que no conoces, las <link>líneas de ayuda de abajo</link> son gratuitas y confidenciales.',
      },
      afterTitle: 'Qué pasa después de reportar',
      after: [
        'Una persona, no un robot, lee cada reporte en menos de 24 horas. Los reportes sobre seguridad infantil, autolesiones, contenido sexual o información personal se leen primero, y también los que involucran a un jugador menor de 18 años.',
        'El jugador que reportas no sabe quién lo reportó.',
        'Si rompió las normas, podemos darle una advertencia, silenciar su chat, pausarlo de las salas públicas o bloquear su cuenta.',
        'No te enviamos el resultado, pero cada reporte se lee y se atiende.',
        'Farolear y mentir sobre tu rol son parte del juego, así que no se reportan.',
      ],
      neverTitle: 'Nunca está bien que alguien',
      never: [
        'te pregunte cuántos años tienes, dónde vives o a qué escuela vas',
        'te pida fotos, tu número de teléfono o tus redes sociales, o que hablen en otra app',
        'hable de sexo, o te envíe mensajes o dibujos sexuales',
        'te ofrezca regalos o dinero, o te pida que guardes un secreto',
        'te diga que te hagas daño, o te acose',
      ],
      neverWhat:
        'Bloquéalo, repórtalo (elige <b>Seguridad infantil</b> si te pide fotos, conversaciones sexuales o verse en persona) y cuéntaselo a un adulto de confianza. Guárdate tu nombre real, tu dirección, tu escuela, tu número de teléfono y tus redes sociales, y nunca compartas tu contraseña: nadie de SpySocial te la va a pedir jamás.',
    },
    parents: {
      title: 'Para padres y tutores',
      intro:
        'SpySocial es un juego de fiesta de faroles y deducción: uno o más jugadores son espías en secreto, y todos intentan descubrir quiénes. Cada jugador usa su propio teléfono, en la misma habitación o a distancia. Los adolescentes necesitan el permiso de su padre, madre o tutor para jugar (consulta nuestros <link>Términos de servicio</link>, sección 2).',
      hasTitle: 'Lo que tiene SpySocial',
      chat: '<b>Chat de texto dentro de una sala:</b> el chat de la sala, el chat de la partida, un chat privado para los espías cuando una partida tiene más de uno y un chat para los jugadores eliminados. El chat se borra unas 24 horas después de enviarse en una sala privada, y 14 días después en una sala pública.',
      sketch: '<b>Spy Sketch:</b> los jugadores se turnan para dibujar con el dedo.',
      names: (o: { avatars: boolean; photos: boolean }) =>
        `<b>Nombres e imágenes:</b> ${
          o.avatars
            ? o.photos
              ? 'un nombre visible, un nombre de usuario y un avatar armado con piezas que ofrece la app. Las versiones de la app anteriores a la 2.2 todavía pueden agregar una foto de perfil.'
              : 'un nombre visible, un nombre de usuario y un avatar armado con piezas que ofrece la app. Los jugadores no pueden agregar fotos.'
            : 'un nombre visible, un nombre de usuario y una foto de perfil opcional.'
        }`,
      private: '<b>Salas privadas:</b> solo pueden unirse quienes tienen el código, el enlace o el código QR de la sala, y el anfitrión puede sacar a un jugador.',
      publicOnePool:
        '<b>Salas públicas</b> con jugadores que tu hijo o hija no conoce: las mesas de «Jugar en línea», donde la app sienta a los jugadores automáticamente y todos juegan con las mismas reglas estándar, y las noches de juegos que organizamos a una hora fija. Los jugadores no pueden crear salas públicas, y ningún jugador es anfitrión de una.',
      public: (playOnline: boolean) =>
        `<b>Salas públicas y Noches de Juegos</b> con jugadores que tu hijo o hija no conoce${playOnline ? ', incluido «Jugar en línea», que sienta a los jugadores en una mesa automáticamente' : ''}.`,
      buy: '<b>Cosas para comprar:</b> paquetes y membresías, a través del App Store o Google Play.',
      /** `buy` once only memberships are sold (LIVE.membershipsOnly). */
      buyMembers:
        '<b>Cosas para comprar:</b> solo membresías (el Pase de paquetes, mensual o anual, y la Membresía de por vida), a través del App Store o Google Play. Una membresía desbloquea los paquetes que no son gratis; no se vende nada más.',
      /** Once Intercepts are live (LIVE.intercepts). Use the app's own word for Intercepts. */
      intercepts:
        '<b>Intercepciones:</b> recompensas que se ganan jugando, y cada una trae un objeto al azar, como un estilo nuevo para el agente. No se pueden comprar, ni con dinero ni con la moneda que se gana en el juego, y la app muestra las probabilidades antes de abrir una.',
      /** `intercepts` once unopened Intercepts trade on the Black Market (LIVE.interceptsMarket). */
      interceptsMarket:
        "<b>Intercepciones:</b> recompensas que se ganan jugando, y cada una trae un objeto al azar, como un estilo nuevo para el agente. Nadie las vende por dinero, ni nosotros ni otros jugadores. Los adultos también pueden comprarlas y venderlas sin abrir entre ellos en el Mercado Negro con la moneda que se gana en el juego, que no se puede comprar; los menores de 18 no pueden. La app muestra las probabilidades antes de abrir una.",
      /** A sentence after interceptsMarket once the app offers it (LIVE.interceptsInTrades). */
      interceptsFriendTrades:
        "Los adultos también pueden intercambiarlas sin abrir con sus amigos.",
      /** Home's Discord pill (LIVE.homeDiscord; under 16 never, 16-17 a safety note first). */
      discord:
        "<b>Un enlace a nuestro Discord:</b> el inicio puede mostrar un enlace al servidor oficial de SpySocial en Discord, donde los jugadores encuentran con quién jugar. Discord es una app aparte, con sus propias reglas y edad mínima. Los menores de 16 nunca ven el enlace, y los jugadores de 16 y 17 ven primero un aviso para estar seguros allí. Nuestros moderadores cuidan el servidor, pero nadie en SpySocial puede ver los mensajes privados de Discord.",
      /** Once members can make packs (LIVE.customPacks); `community`: LIVE.communityPacks. */
      customPacks: (community: boolean) =>
        `<b>Creador de paquetes:</b> los miembros pueden crear sus propios paquetes de lugares o palabras para sus salas privadas.${
          community ? ' Nuestro equipo lee cada paquete compartido en Paquetes de la comunidad antes de que nadie más pueda verlo, y cualquier jugador puede reportarlo.' : ''
        }`,
      hasNotTitle: 'Lo que SpySocial no tiene',
      noDms:
        'No hay mensajes directos: los jugadores solo pueden chatear dentro de una sala, con los jugadores que están en ella. El chat de los espías dura una partida y se filtra, se guarda y se puede reportar como el resto.',
      noFriends:
        'No hay listas de amigos ni de seguidores, ni búsqueda de jugadores, ni perfiles para explorar, ni biografías, así que nadie puede buscar a tu hijo o hija ni contactarlo fuera de una sala.',
      noDmsSocial:
        "No hay mensajes directos: los jugadores solo chatean dentro de una sala, con los jugadores que están en ella, o en el chat de un grupo, con los amigos que lo forman. Todos los chats se filtran, se guardan un tiempo y se pueden reportar.",
      noSearch:
        "No hay búsqueda de jugadores ni sugerencias de amigos, así que un desconocido no puede buscar a tu hijo o hija. Los menores de 18 no tienen perfil público y nadie puede seguirlos.",
      social:
        "<b>Amigos y grupos:</b> los jugadores pueden agregar amigos y jugar juntos en grupo, con un chat de grupo filtrado. Un adulto solo puede agregar a un menor de 16 en persona, escaneando el código de amigo en el teléfono del menor. Los menores de 18 no tienen perfil público, nadie puede seguirlos y no reciben notificaciones sociales de noche. En iPhone y iPad, por ahora, esto sigue desactivado para los menores de 18.",
      trading:
        "<b>Intercambios:</b> los jugadores de 13 a 17 años solo pueden intercambiar objetos del juego por otros objetos, con amigos que agregaron en persona, sin regalos ni mensajes. Los adultos también pueden comprar y vender objetos en el Mercado Negro con la moneda que se gana en el juego; los menores de 18 solo pueden mirar. Nada se puede comprar ni vender con dinero real.",
      noVoice: (photos: boolean) =>
        `No hay chat de voz ni de video: el botón del micrófono solo convierte la voz en texto, y los demás jugadores nunca oyen la voz de nadie.${photos ? '' : ' Tampoco se pueden subir fotos ni videos.'}`,
      noLocation: 'No se comparte la ubicación y no hay anuncios.',
      safeTitle: 'Cómo lo mantenemos seguro',
      age: (o: { gate: boolean; under13Deletion: boolean; storeSignals: boolean }) =>
        `<b>Edad:</b> SpySocial es para jugadores de 13 años en adelante.${
          o.gate ? ` Antes de la primera partida, la app pide el año de nacimiento${o.under13Deletion ? ', y una respuesta de menos de 13 años elimina la cuenta' : ''}.` : ''
        }${o.storeSignals ? ' Si Apple o Google le indican a la app que su usuario tiene menos de 13 años, la app no le deja jugar.' : ''} No verificamos la edad, así que si descubres que un niño menor de 13 años tiene una cuenta, escríbenos y la eliminaremos.`,
      publicRooms:
        '<b>Las salas públicas</b> requieren una cuenta guardada con un correo confirmado, una edad de 13 años o más y la aceptación de nuestras Normas de la comunidad. Los invitados solo pueden jugar en salas privadas, y los jugadores con una pausa o un bloqueo no pueden entrar en salas públicas.',
      filter:
        '<b>Filtro del chat:</b> los nombres y el chat se revisan antes de que nadie los vea. En las salas públicas se bloquean los términos ofensivos, las palabras sexuales explícitas y los insultos. En las salas privadas se bloquean las palabras más graves. En cualquier sala o grupo con un jugador menor de 18 años o que no nos haya dicho su edad se bloquean para todos los enlaces, los correos, los números de teléfono, las redes sociales y otros datos personales (una dirección, dónde vive alguien, un colegio, un nombre real). En las mesas de «Jugar en línea» y en las noches de juegos siempre están bloqueados.',
      filterMild:
        'En las mesas de «Jugar en línea» y en las noches de juegos, las palabrotas comunes no se bloquean, pero todos las ven censuradas: la primera letra y luego asteriscos (m*****). Las palabras más suaves se muestran tal cual.',
      reports:
        '<b>Reportes, bloqueos y sanciones:</b> una persona lee cada reporte en menos de 24 horas, y el jugador reportado no sabe quién lo envió. Los reportes que involucran a un jugador menor de 18 años se leen primero. Las sanciones van desde una advertencia hasta un silencio en el chat, una pausa de las salas públicas o un bloqueo de la cuenta. Nuestras <link>Normas de la comunidad</link> indican lo que no está permitido.',
      drawingCheck:
        '<b>Revisión de dibujos:</b> los turnos de dibujo en una sala pública pueden revisarse automáticamente, y un turno que la revisión detecta que rompe las normas se quita del dibujo.',
      buyTitle: 'Compras',
      buyText:
        'Los adolescentes necesitan el permiso de su padre, madre o tutor para comprar cualquier cosa. Las compras se hacen a través del App Store o Google Play, así que sus controles parentales, como «Pedir la compra» de Apple y la aprobación de compras de Google Family Link, funcionan como siempre. Un Pase de paquetes se renueva hasta que se cancela en los ajustes de la tienda.',
      deleteTitle: 'Eliminar una cuenta',
      deleteSteps: (o: { avatars: boolean; oldApps: boolean }) => [
        'Abre SpySocial.',
        `Toca ${o.avatars ? 'el avatar' : 'la imagen'} en la parte superior de la pantalla de inicio para abrir <b>Cuenta</b>.${
          o.oldApps ? ' (En las versiones anteriores a la 2.2, Cuenta es el icono de abajo a la derecha de la pantalla de inicio.)' : ''
        }`,
        `Toca <b>Ajustes</b> arriba a la derecha y luego, en <b>Cuenta e inicio de sesión</b>, <b>Eliminar cuenta</b> (la última fila). Una cuenta de invitado se elimina con <b>Cerrar sesión</b>, en el mismo lugar.${
          o.oldApps ? ' (En las versiones anteriores a la 2.2, Eliminar cuenta está en la Zona de peligro, al final de Cuenta.)' : ''
        }`,
      ],
      deleteEmail:
        'O escribe a <email/> desde el correo de la cuenta, con el asunto «Delete my SpySocial account». Si no puedes escribir desde ese correo, escríbenos de todos modos con el nombre de usuario y te ayudaremos. Nuestra página <link>Eliminar cuenta</link> explica qué se elimina y qué conservamos.',
      deleteSubject: 'Delete my SpySocial account',
      dataRequests:
        '<b>Los datos de tu hijo o hija:</b> como madre, padre o tutor, puedes pedirnos una copia de los datos de su cuenta, que corrijamos su año de nacimiento o que eliminemos la cuenta. Nuestra <link>Política de privacidad</link> (Privacidad de los niños) explica cómo confirmamos la solicitud y qué incluye.',
      contactTitle: 'Contacto',
      contact: (section: number) =>
        `Escribe a <email/> sobre cualquier tema de esta página. Para cualquier asunto sobre la seguridad de un menor, pon «Child safety» en el asunto y lo atenderemos primero. Para apelar una decisión o presentar una queja, también sobre cómo cumplimos la Online Safety Act del Reino Unido, consulta la sección ${section} de nuestros <link>Términos de servicio</link>.`,
    },
    contactsTitle: 'Contactos de seguridad infantil',
    contactsAfter: 'Nuestros <link>Estándares de seguridad infantil</link> explican qué prohibimos, cómo reportarlo y qué hacemos al respecto.',
    helpTitle: 'Dónde pedir ayuda',
    helpIntro: 'Si lo estás pasando mal, o te preocupa alguien, estos servicios son gratuitos y confidenciales, y puedes hablar con ellos de cualquier cosa.',
    tableWho: 'Quién',
    tableHow: 'Cómo',
    helplines: {
      childline: {
        note: 'Reino Unido, para menores de 19 años',
        text: 'Llama al <b>0800 1111</b>, gratis, a cualquier hora, o chatea en línea con un orientador en <link>childline.org.uk</link>. Las llamadas no aparecen en tu factura del teléfono.',
      },
      samaritans: { note: 'Reino Unido e Irlanda, cualquier edad', text: 'Llama al <b>116 123</b>, gratis, a cualquier hora, de día o de noche (<link>samaritans.org</link>).' },
      lifeline: { note: 'EE. UU.', text: 'Llama o envía un mensaje al <b>988</b>, o chatea en <link>988lifeline.org</link>, gratis, a cualquier hora.' },
      findHelpline: {
        note: 'Cualquier otro país',
        text: '<link>findahelpline.com</link> encuentra líneas de ayuda gratuitas y confidenciales en más de 175 países, por teléfono, mensaje o chat.',
      },
    },
    contacts: {
      danger: {
        label: 'Un niño está en peligro ahora mismo',
        text: 'Llama a la policía: <b>999</b> en el Reino Unido, <b>911</b> en EE. UU., <b>112</b> en la UE, o tu número de emergencias local. Haz esto primero, antes que cualquier otra cosa de esta página.',
      },
      ncmec: {
        note: 'Explotación sexual infantil, desde cualquier país',
        text: 'Repórtalo en línea en <link>report.cybertip.org</link>, o llama al 1-800-843-5678 (1-800-THE-LOST), a cualquier hora. Lo gestiona el National Center for Missing & Exploited Children.',
      },
      ceop: {
        note: 'En el Reino Unido',
        text: 'Si te preocupa un abuso sexual en línea, o la forma en que alguien le ha estado hablando a un niño en línea, repórtalo a CEOP, parte de la National Crime Agency: <link>ceop.police.uk/Safety-Centre</link>. Los jóvenes también pueden reportar, y un asesor de protección infantil lee cada reporte.',
      },
      spysocial: {
        text: 'Reporta al jugador en la app y elige <b>Seguridad infantil</b>, y escribe a <email/> con «Child safety» en el asunto. Eliminamos el contenido, bloqueamos las cuentas involucradas y lo reportamos al NCMEC, como exige la ley de EE. UU.; el NCMEC lo envía a la policía del país correspondiente.',
        textBefore: 'Reporta al jugador en la app y elige <b>Seguridad infantil</b>, y escribe a <email/> con «Child safety» en el asunto. Eliminamos el contenido, bloqueamos las cuentas involucradas y lo reportamos al NCMEC y a otras autoridades, como exige la ley.',
      },
    },
    seeAlso: 'Consulta también nuestras <link>Normas de la comunidad</link>, los <link2>Términos de servicio</link2> y la <link3>Política de privacidad</link3>.',
  },

  support: {
    title: '¿Cómo te ayudamos?',
    sub: 'Estamos aquí para ayudarte con cualquier pregunta o problema que tengas con SpySocial.',
    emailUs: 'Escríbenos',
    respond: 'Solemos responder en menos de 24 horas',
    copy: (email: string) => `Copiar ${email}`,
    copied: '¡Correo copiado!',
    copyFailed: 'No se pudo copiar',
    quickLinks: 'Enlaces rápidos',
    faqLink: 'Preguntas frecuentes y solución de problemas',
    rate: 'Califícanos en el App Store',
    ratePlay: 'Califícanos en Google Play',
  },

  ledger: {
    head: ['Coleccionable', 'Cantidad y estado'],
    supply: (minted, burned, held) => [`${minted} acuñados`, `${burned} quemados`, `${held} en posesión`],
    neverAwarded: 'Nunca se entregó',
    closed: (date, entry) => `Cerrado el ${date} (entrada ${entry})`,
    openUntil: (date) => `Abierto hasta el ${date}`,
    search: 'Buscar coleccionables',
    searchHint: 'Prueba «marco» o «título»',
    clear: 'Borrar',
    sort: 'Ordenar',
    sortBy: { newest: 'Más recientes', name: 'Nombre (A–Z)', minted: 'Más acuñados', held: 'Más en posesión' },
    count: (from, to, total) => `${from}–${to} de ${total}`,
    noMatch: (query) => `Nada coincide con «${query}».`,
    pages: 'Páginas de la tabla',
    prev: 'Anterior',
    next: 'Siguiente',
    page: (n, total) => `Página ${n} de ${total}`,
  },

  whatsNew: {
    title: 'Novedades',
    sub: 'Notas de versión de SpySocial. Grandes actualizaciones, nuevas funciones y mejoras, a medida que las lanzamos.',
    releases: [
      {
        tag: "Lanzamiento en Android",
        summary:
          "SpySocial ya está en Google Play, con una tanda de correcciones de las pruebas en teléfonos Android reales.",
        sections: [
          {
            label: "Ya disponible",
            items: [
              { title: "Android", text: "En Google Play desde el 13 de junio de 2026." },
              { title: "iPhone y iPad", text: "Las mismas correcciones ya están en la App Store." },
            ],
          },
          {
            label: "Correcciones",
            items: [
              { title: "Eliminar cuenta", text: "El botón ya no queda cortado al final de la pantalla Cuenta." },
              { title: "Botones de la sala", text: "«Salir de la sala» e «Iniciar partida» ya no quedan debajo de la barra de navegación de Android." },
              { title: "Iniciar partida", text: "Si la partida aún no puede empezar, te dice por qué: hacen falta al menos 3 jugadores, que todos estén listos y al menos una categoría." },
              { title: "Categorías", text: "El botón para volver y el título ya no se amontonan." },
              { title: "Cómo jugar", text: "En Android hay un solo botón para volver, no dos." },
              { title: "Tutorial", text: "Puedes saltarlo desde cualquier paso, no solo desde el primero." },
              { title: "Cuentas de invitado", text: "El aviso para guardar tu cuenta de invitado ahora es una invitación, no una advertencia." },
              { title: "Iconos", text: "Los resultados y Cómo jugar usan iconos que se ven igual en cualquier teléfono Android." },
              { title: "Arreglos más rápidos", text: "Los arreglos pequeños ya pueden llegar a la app sin esperar una actualización de la tienda." },
            ],
          },
        ],
      },
      {
        tag: "Actualización de pulido",
        summary:
          "Una actualización de pulido: nueva pantalla de bienvenida, pantallas de Fin de partida y Cuenta renovadas, mejor diseño en iPad y un montón de correcciones.",
        sections: [
          {
            label: "Nuevas funciones",
            items: [
              { title: "Nueva pantalla de bienvenida", text: "Un aspecto nuevo, botones claros para iniciar sesión y registrarte, y un enlace sencillo para seguir como invitado." },
              { title: "Guardar tu cuenta de invitado", text: "Mientras esperas el correo de confirmación, la pantalla Cuenta te muestra en qué paso estás, con Reenviar, Cancelar y Actualizar." },
            ],
          },
          {
            label: "Renovación visual",
            items: [
              { title: "Fin de partida", text: "Nuevas tarjetas de jugador, un trofeo para los ganadores, el lugar con un pin en el mapa y un botón claro para volver a la sala." },
              { title: "Cuenta", text: "Una sola lista ordenada con secciones claras, y la Zona de peligro al final." },
              { title: "iPad", text: "Mejor uso de la pantalla grande: seis tarjetas de jugador por fila en la sala, fichas más grandes en la partida y nada cortado." },
            ],
          },
          {
            label: "Correcciones para Android",
            items: [
              { title: "Gesto de volver", text: "Deslizar hacia atrás (o tocar Atrás) en una partida o en la sala ahora te pregunta antes de salir, igual que el botón Salir." },
              { title: "Tarjetas", text: "Las tarjetas de votación y de Fin de partida ya no muestran un recuadro tenue por dentro." },
              { title: "Fin de partida", text: "Ya no queda un hueco debajo del encabezado." },
              { title: "Selectores", text: "Los selectores de los ajustes de la sala se leen bien y ya no hacen que la app falle al cerrarse." },
            ],
          },
          {
            label: "Mejoras",
            items: [
              { title: "Temporizadores", text: "Las cuentas atrás siguen el reloj del juego, así que van bien aunque el reloj de tu teléfono no." },
              { title: "Registro y correo", text: "Registrarte, reenviar la confirmación, restablecer tu contraseña y cambiar tu correo funcionan de forma más fiable." },
              { title: "Correos de soporte", text: "Si tu teléfono no tiene app de correo, tocar una dirección de soporte la copia en lugar de mostrar un error." },
              { title: "Idiomas", text: "Todo lo nuevo está en inglés, español y ruso." },
            ],
          },
        ],
      },
      {
        tag: "Gran actualización",
        summary:
          "El juego en línea, rehecho desde cero: cada pantalla rediseñada, conexiones más estables y un montón de funciones nuevas.",
        sections: [
          {
            label: "Nuevas funciones",
            items: [
              { title: "Tutorial y perfil", text: "Los jugadores nuevos reciben un recorrido por el juego y configuran su perfil en un momento." },
              { title: "Libreta", text: "Anota quién dijo qué durante la ronda. Los jugadores con notas salen primero y los eliminados, al final." },
              { title: "Pistas traducidas", text: "Si la partida está en otro idioma, toca una pista para leerla en el tuyo. Todos en la mesa siguen teniendo la misma pista." },
              { title: "Toques", text: "Toca la tarjeta de un jugador en la sala para darle un toque." },
              { title: "Códigos QR", text: "Comparte una sala desde el menú Compartir de tu teléfono, con un código QR para escanear." },
              { title: "Enlaces de sala", text: "Un enlace de sala abre la app y te lleva directo a la sala, aunque la app estuviera cerrada." },
              { title: "Códigos de sala más cortos", text: "5 caracteres, más fáciles de dictar. Los códigos antiguos de 6 siguen funcionando." },
              { title: "Quién pidió la votación", text: "Un ajuste de la sala que muestra quién inició cada votación." },
              { title: "Terminar la partida", text: "El anfitrión puede terminar una partida antes de tiempo." },
              { title: "Más lugares", text: "Un paquete nuevo de lugares para jugar." },
              { title: "Botón Salir", text: "Sal de una partida con un solo toque." },
            ],
          },
          {
            label: "Renovación visual",
            items: [
              { title: "", text: "Una sala nueva con tarjetas de jugador interactivas y ajustes rediseñados." },
              { title: "", text: "Pantallas de partida, votación y resultados rediseñadas. La votación muestra quién la pidió y cómo va." },
              { title: "", text: "El reparto de roles muestra a quién se espera y ahora dura 60 segundos." },
              { title: "", text: "Las tarjetas de inicio ajustan su texto." },
              { title: "", text: "Todas las pantallas de la partida tienen el mismo encabezado oscuro." },
              { title: "", text: "El aviso de sin conexión se ve igual en todas las pantallas y ya no choca con la Dynamic Island." },
              { title: "", text: "La pantalla Cuenta muestra un mensaje claro cuando no tienes conexión." },
            ],
          },
          {
            label: "Mejoras",
            items: [
              { title: "Conexión", text: "Cuando tu teléfono pasa mucho rato en reposo, la app ya no dice por error que no tienes conexión." },
              { title: "", text: "Sin conexión, la pantalla Jugar lo reintenta cada 5 segundos y ya no parece que hayas cerrado sesión." },
              { title: "", text: "Juego en vivo más estable en la sala, el reparto de roles, la partida, la votación y los resultados." },
              { title: "", text: "El temporizador sigue el reloj del juego, no el de tu teléfono." },
              { title: "", text: "Se reconecta mejor cuando pierdes la señal." },
              { title: "", text: "Registrarte, restablecer la contraseña y guardar una cuenta de invitado funcionan de forma más fiable." },
              { title: "", text: "Mensajes más claros en la pantalla Cuenta." },
              { title: "", text: "Inglés, español y ruso en todas partes, incluidas las 171 sugerencias de pistas." },
              { title: "", text: "Libreta: el teclado ya no se abre solo al elegir a un jugador." },
              { title: "", text: "Pistas: tocar una pista ya no la cambia sin querer. Usa el botón de recargar para pedir otra." },
              { title: "", text: "Lista para iOS 26." },
            ],
          },
          {
            label: "Correcciones",
            items: [
              { title: "", text: "Se corrigió un fallo poco común cuando una votación y el final de la partida coincidían." },
              { title: "", text: "Se corrigieron votos contados dos veces y votaciones que terminaban en el momento equivocado." },
              { title: "", text: "Se corrigió cómo cuenta la abstención. «Abstenerse» ahora está junto a los demás botones de voto." },
              { title: "", text: "Se corrigió el encabezado que tapaba los resultados de la adivinanza." },
              { title: "", text: "Se corrigió un parpadeo al abrir la pantalla de la partida." },
              { title: "", text: "Se corrigió que guardar una cuenta de invitado cerrara tu sesión." },
              { title: "", text: "Se corrigió el campo de correo de la pantalla Cuenta." },
              { title: "", text: "Se corrigió el texto cortado en las tarjetas de inicio y en los encabezados en español." },
            ],
          },
        ],
      },
      {
        tag: 'Primer lanzamiento',
        summary: 'Primera versión pública de SpySocial en el App Store.',
        sections: [] as { label: string; items: { title: string; text: string }[] }[],
      },
    ],
  },

  roadmap: {
    eyebrow: 'Hoja de ruta',
    title: 'Lo que viene',
    lede: (day: string) => `SpySocial\u00A02.2 llega el ${day}. Mira lo que trae y lo que estamos preparando después.`,
    ledeOut: 'SpySocial\u00A02.2 ya está aquí. Mira lo que trae y lo que estamos preparando después.',
    now: {
      coming: (day: string) => `Llega el ${day}`,
      out: 'Ya disponible',
      title: 'SpySocial 2.2',
      sub: 'Nuestra mayor actualización.',
      features: [
        {
          title: 'Jugar en línea',
          text: 'Toca «Buscar partida» para una mesa de 4 u 8 jugadores, con las mismas reglas estándar para todos. Si atrapan a un espía, todos recuperan su votación; cuando a nadie le queda una, la partida pasa directamente a su final. Solo necesitas una cuenta gratuita.',
        },
        { title: 'Spy Sketch', text: 'Una nueva forma de jugar: dibuja la palabra secreta en una pizarra compartida y atrapa a los espías que fingen saberla.' },
        {
          title: 'Traducción automática',
          text: 'Chatea en la sala y durante la partida en cualquiera de los 10 idiomas: los mensajes en otros idiomas se traducen al tuyo en cuanto llegan. Las respuestas de Spy Talk se traducen junto con su pregunta, así no pierden el sentido.',
        },
        {
          title: 'Tu agente y la Bóveda',
          text: "Crea tu propio avatar de espía y gana estilos nuevos jugando. La Bóveda solo vende membresías: todos los paquetes premium en las salas que organizas y en tu mesa de Jugar en línea, el creador de paquetes y dirigir un grupo. Todo es opcional y nada cambia cómo se juega.",
        },
        { title: 'Noches de juegos', text: 'Partidas en línea programadas. Toca «Recordarme» y te avisaremos antes de que empiecen.' },
        {
          title: 'Colores de agente',
          text: 'En las mesas de «Jugar en línea» y en las noches de juegos, los desconocidos ven el color de tu agente, como el Agente Turquesa, nunca tu nombre. Elige tus tres colores favoritos.',
        },
        {
          title: 'Códigos de creadores',
          text: '¿Te dio un código un creador o SpySocial? Introdúcelo en Ajustes y consigue un título u otra recompensa.',
        },
        {
          title: 'Música y sonidos',
          text: 'Tres canciones lounge se turnan en los menús, Spy Talk y Spy Sketch tienen cada uno su propia canción, y nuevos sonidos marcan los últimos segundos, la revelación de Spy Sketch y la victoria. Elige la canción de los menús en Ajustes o apaga la música.',
        },
        {
          title: 'Tiempo de juego recomendado',
          text: 'Las reglas de la sala muestran un tiempo de juego recomendado según el número de jugadores, en Spy Talk y en Spy Sketch. El anfitrión sigue decidiendo.',
        },
        {
          title: 'Seguridad',
          text: 'SpySocial es para mayores de 13 años. El chat tiene un filtro de palabras, puedes reportar o bloquear a cualquier jugador y, en las salas con algún menor de 18 años, el chat bloquea enlaces, números de teléfono y redes sociales.',
        },
      ],
      more: 'Y además: estadísticas, títulos y marcos para desbloquear, niveles hasta el 100 con prestigio, XP también en las partidas cortas, volver a la partida sin tropiezos aunque el teléfono entre en reposo, enlaces de invitación que simplemente funcionan y un nuevo aspecto en cada pantalla.',
      launchWeek: 'Semana de lanzamiento: Spy Talk el martes 8 de diciembre, Spy Sketch el viernes 11 de diciembre y Espía Mafia el sábado 12 de diciembre, siempre de 8 a 10 p. m., hora del Este de EE. UU. (ET).',
    },
    next: {
      status: 'Planeado',
      noDates: 'Aún sin fechas',
      title: 'Lo próximo',
      sub: 'Después de la 2.2, nos centraremos en el lado competitivo de SpySocial.',
      plans: [
        {
          title: 'Competitivo',
          text: 'Juega partidas competitivas y luce tu rango en tu perfil. El emparejamiento te junta con jugadores de un rango parecido.',
        },
        {
          title: 'Temporadas',
          text: 'Cada temporada trae sus propias recompensas, como títulos y marcos, según el rango que alcances y las partidas que juegues.',
        },
        {
          title: 'Torneos',
          text: 'Inscríbete con anticipación en un torneo programado y juega rondas eliminatorias en mesas pequeñas. Los ganadores avanzan, ronda a ronda, hasta la mesa final, con recompensas según el puesto.',
        },
      ],
    },
    outro: 'Los planes pueden cambiar. Síguenos para enterarte de las novedades.',
  },

  join: {
    title: 'Unirse a la partida',
    noCode: 'No se indicó un código de sala',
    friendTitle: "Agregar a un amigo",
    friendLink: "Abre SpySocial para agregar a tu amigo. Su código solo dura unos minutos.",
    browserOrPhone: 'Juega en tu navegador, o en tu teléfono con la app',
    openToJoin: 'Abre SpySocial para unirte a la sala',
    onPhone: 'Abre este enlace en tu teléfono para unirte a la sala',
    roomCode: 'Código de sala',
    afterInstall: "Después de instalarla, vuelve a tocar el enlace de invitación.",
  },

  joinEvent: {
    label: 'Noche de Juegos pública',
    broken: 'Este enlace de Noche de Juegos no funciona',
    brokenHelp: 'Revísalo, o abre SpySocial y explora las salas.',
    live: 'En vivo',
    cancelled: 'Cancelada',
    ended: 'Terminada',
    upcoming: 'Próximamente',
    full: 'Lleno ahora mismo',
    inRoom: (count: number, capacity: number) => `${count} / ${capacity} en la sala`,
    yourTime: 'Tu hora',
    hostTime: (who: string, when: string) => `Hora ${who.startsWith('el ') ? `del ${who.slice(3)}` : `de ${who}`}: ${when}`,
    theHost: 'el anfitrión',
    hostedBy: (name: string) => `organizado por ${name}`,
  },

  resetPassword: {
    title: 'Restablece tu contraseña',
    invalid: 'El enlace para restablecer no es válido o venció. Pide uno nuevo.',
    failed: 'Ocurrió un error. Inténtalo de nuevo.',
    mismatch: 'Las contraseñas no coinciden',
    previewSuccess: 'Vista previa: contraseña restablecida',
    success: 'Contraseña restablecida',
    error: 'Error',
    unexpected: 'Error inesperado',
    done: '¡Contraseña restablecida!',
    redirecting: 'Redirigiendo...',
    newPassword: 'Nueva contraseña',
    newPlaceholder: 'Escribe la nueva contraseña',
    minLength: 'Al menos 6 caracteres.',
    confirm: 'Confirmar contraseña',
    confirmPlaceholder: 'Confirma la contraseña',
    submit: 'Restablecer contraseña',
    cancel: 'Cancelar',
    // passwordless (legalRelease LIVE.passwordless): the page that replaces the reset form.
    goneTitle: "Ya no hay contraseñas",
    goneBody: "Inicia sesión con un código de un solo uso en la app.",
    goneOpen: "Abrir SpySocial",
    goneNoApp: "¿No tienes la app?",
    preview: (mode: string) => `Modo de vista previa: <b>${mode}</b>. Enviar no llega a Supabase.`,
  },

  deleteAccount: {
    title: 'Elimina tu cuenta de SpySocial',
    intro: 'Puedes eliminar tu cuenta de SpySocial y los datos personales vinculados a ella en cualquier momento, desde la app o por correo. Para cualquier pregunta, escríbenos a <email/>.',
    appTitle: 'Cómo eliminar tu cuenta desde la app',
    steps: (o: { avatars: boolean; oldApps: boolean }) => [
      'Abre SpySocial.',
      `Toca tu ${o.avatars ? 'avatar' : 'imagen'} en la parte superior de la pantalla de inicio para abrir <b>Cuenta</b>.${
        o.oldApps ? ' (En las versiones anteriores a la 2.2, Cuenta es el icono de abajo a la derecha de la pantalla de inicio.)' : ''
      }`,
      'Toca <b>Ajustes</b> arriba a la derecha.',
      `En <b>Cuenta e inicio de sesión</b>, toca <b>Eliminar cuenta</b> (la última fila, en rojo) y luego <b>Enviar código</b>.${
        o.oldApps ? ' (En las versiones anteriores a la 2.2, Eliminar cuenta está en la Zona de peligro, al final de Cuenta.)' : ''
      }`,
      'Escribe el código de 6 dígitos que te enviamos por correo. Tu cuenta se elimina en cuanto lo introduces.',
    ],
    atOnce: 'Tu cuenta se elimina de inmediato.',
    guestTitle: 'Cuentas de invitado',
    guest: (purchases: boolean, oldApps: boolean) =>
      `Una cuenta de invitado se elimina en cuanto tocas <b>Eliminar cuenta</b> (en Ajustes, en Cuenta e inicio de sesión; en versiones anteriores, esta fila se llama <b>Cerrar sesión</b>${oldApps ? '; en las versiones anteriores a la 2.2, en Cuenta, en Cuenta y seguridad' : ''}) y confirmas. Un invitado no puede volver a iniciar sesión, así que no hay forma de recuperarla.${
        purchases
          ? ' Las compras son la excepción, como en cualquier cuenta eliminada: lo que compraste como invitado vuelve con Restaurar compras, en la cuenta del App Store o de Google Play con la que pagaste.'
          : ''
      }`,
    noAppTitle: '¿Ya no tienes la app instalada?',
    noApp: 'Escribe a <email/> desde el correo vinculado a tu cuenta con el asunto «Delete my SpySocial account». Las solicitudes se procesan en un plazo de un mes.',
    deletedTitle: 'Qué se elimina',
    staysTitle: 'Qué se conserva y por cuánto tiempo',
    details: 'Nuestra <link>Política de privacidad</link> tiene los detalles.',
  },

  beta: {
    eyebrow: 'Beta 2 · Prueba en vivo',
    title: 'Juega primero',
    lede: '<b>10\u00a0USD por PayPal como agradecimiento</b> para cada jugador confirmado que se una a la hora completa de esta sesión de prueba de juego en grupo y en vivo de SpySocial, el juego gratis de deducción social para fiestas, y envíe la encuesta de 5 minutos, igual en iPhone y Android, más un bono de 50\u00a0USD para el reporte de error o la idea más útil de la sesión. Además, recompensas beta que te quedas después del lanzamiento: el Pin beta y un título para cada tester, y con una partida terminada antes del 7 de diciembre, otro título, 10 intercepciones de cada nivel y 1 mes de membresía.',
    ledeBefore: '<b>10\u00a0USD por PayPal como agradecimiento</b> para cada jugador confirmado que se una a la hora completa de esta sesión de prueba de juego en grupo y en vivo de SpySocial, el juego gratis de deducción social para fiestas, y envíe la encuesta de 5 minutos, igual en iPhone y Android, más un bono de 50\u00a0USD para el reporte de error o la idea más útil de la sesión. Además, recompensas beta que te quedas después del lanzamiento: el Pin beta, dos títulos, 10 intercepciones de cada nivel y 1 mes de membresía.',
    /** Short note under the lede and in the rewards: the test's progress does not carry over. */
    reset: 'Las partidas, la XP y los objetos de la prueba se reinician en el lanzamiento.',
    headsUp: '<b>Ojo:</b> el SpySocial de la App Store y Google Play es una versión antigua. La beta es una versión nueva y muy distinta; la instalas desde el enlace que te enviamos por correo.',
    facts: ['1 hora, en vivo', 'Solo mayores de 18', '24 lugares', 'iPhone o Android'],
    when: {
      label: 'Cuándo',
      et: (time: string) => `${time}, hora del Este (EE.\u00a0UU.)`,
      others: (pacific: string, utc: string) => `${pacific}, hora del Pacífico · ${utc}\u00a0UTC`,
      yours: (time: string) => `Tu hora: ${time}`,
      checkIn: (time: string) => `La entrada abre a las ${time} (hora del Este) en #beta-2-ask-hq de Discord (la sala de voz Beta 2 también estará abierta).`,
    },
    europe: {
      label: 'Europa · Segunda sesión opcional',
      time: (cet: string, uk: string) => `${cet}\u00a0CET · ${uk} en el Reino Unido`,
      note: (date: string) => `Solo se hace si se apuntan suficientes personas en Europa. Lo confirmamos a más tardar el ${date}.`,
    },
    signUp: 'Apúntate',
    signUpNote: (day: string, time: string) => `Unos 2 minutos. Las inscripciones cierran el ${day}, a las ${time} (hora del Este).`,
    discord: 'Únete a nuestro Discord',
    closed: 'Las inscripciones están cerradas. Síguenos en Discord para la próxima prueba.',
    games: {
      eyebrow: 'A qué juegas',
      title: 'Dos juegos',
      talk: 'Preguntas y respuestas. Uno o dos jugadores no conocen el lugar secreto e intentan pasar desapercibidos.',
      sketch: 'Todos aportan trazos al mismo dibujo. Los espías disimulan.',
    },
    who: {
      eyebrow: 'Para quién',
      title: 'A quién buscamos',
      adults: '<b>Solo adultos (18+).</b> 24 lugares.',
      phones: '<b>Un iPhone (TestFlight) o un teléfono Android (pruebas de Google Play).</b> Los Android son especialmente bienvenidos:',
      androidLabel: 'Teléfonos Android que buscamos especialmente',
      fans: '<b>Fans de la deducción social:</b> Among Us, Spyfall, Hombres Lobo/Mafia, Blood on the Clocktower, Codenames. Si eres principiante, también eres bienvenido.',
      mic: '<b>Un micrófono ayuda.</b> Solo escuchar también vale.',
      langs: '<b>El juego está en 10 idiomas:</b>',
      langsLabel: 'Los idiomas del juego',
    },
    ask: {
      eyebrow: 'Qué te pedimos',
      title: 'Juega. Habla. Cuéntanos.',
      steps: ['<b>Juega</b> durante la hora.', '<b>Di en voz alta</b> todo lo que te confunda.', '<b>Responde una encuesta de 5 minutos</b> al terminar.'],
      wantTitle: 'Lo que queremos averiguar',
      want: ['¿Queda claro de quién es el turno?', '¿Se entiende bien la votación?', '¿Funciona el dibujo en tu teléfono?'],
    },
    get: {
      eyebrow: 'Qué recibes',
      title: 'Recompensas beta que te quedas tras el lanzamiento',
      items: ['El <b>Pin beta</b>', 'El título <b>Tester beta</b>'],
      itemsBefore: ['El <b>Pin beta</b>', 'Los títulos <b>Tester beta</b> y <b>Tester de Campo</b>', '<b>10 intercepciones</b> de cada nivel', '<b>1 mes</b> de membresía'],
      gameTitle: 'Termina una partida antes del 7 de diciembre y recibe además',
      gameItems: ['El título <b>Tester de Campo</b>', '<b>10 intercepciones</b> de cada nivel', '<b>1 mes</b> de membresía'],
      trade: { tradable: 'Tras el lanzamiento, las intercepciones de agradecimiento se intercambian como todo lo que ganas.', bound: 'Las intercepciones de agradecimiento se quedan en tu cuenta.' },
      prizeTitle: '10\u00a0USD de agradecimiento por PayPal + un bono de 50\u00a0USD',
      prize: 'Un agradecimiento de 10 USD por PayPal por tu tiempo en la sesión en vivo: cada jugador confirmado que se una a la hora completa y envíe la encuesta de 5 minutos lo recibe en los 7 días siguientes a la sesión, igual en iPhone y Android. Instalar la versión de prueba no da derecho a él por sí solo. Además, un bono de 50 USD (tarjeta regalo) para el reporte de error o la idea más útil de la sesión, elegido por el desarrollador en el plazo de una semana.',
      seats: (day: string) => `24 lugares. El agradecimiento es solo para los jugadores que confirmemos por correo (a más tardar el ${day}) y que se unan a la sesión; los demás pasan a la lista de espera de la próxima prueba.`,
    },
    friends: {
      eyebrow: 'Amigos',
      title: 'Trae a tus amigos',
      text: '<b>Escribe el nombre de tu amigo en el formulario</b> para sentarte en la misma mesa. Los testers de la Beta 1 tienen prioridad.',
    },
    join: {
      eyebrow: 'Cómo unirte',
      title: 'Cuatro pasos',
      form: '<link>Rellena el formulario de inscripción</link> (unos 2 minutos).',
      closes: (day: string, time: string) => `Las inscripciones cierran el ${day}, a las ${time} (hora del Este).`,
      email: (day: string) => `Te escribimos a más tardar el ${day} para confirmar tu lugar y enviarte el enlace de instalación.`,
      discord: '<link>Únete a nuestro Discord</link>: la entrada se hace en #beta-2-ask-hq (la sala de voz Beta 2 también estará abierta).',
      android: 'Android: el formulario te pide el correo de Google de tu Play Store, porque Google lo exige para las versiones de prueba. Se borra después de la sesión.',
      iphone: 'iPhone: instalas SpySocial con TestFlight, desde el enlace del correo.',
    },
    fine: 'Versión previa al lanzamiento. No compartas los nombres ni el chat de otros jugadores. Tus datos de inscripción se borran después de la Beta 2. Tu correo de PayPal se borra en cuanto te enviemos el agradecimiento.',
  },

  notFound: {
    title: 'Página no encontrada',
    text: 'La página que buscas no existe.',
  },

  confirmSuccess: {
    title: 'Correo confirmado',
    text: 'Tu correo se verificó correctamente. Ya puedes usar todas las funciones de la app SpySocial.',
    home: 'Volver al inicio',
    expiredTitle: 'Enlace vencido',
    expired: 'Este enlace venció o ya se usó. Abre SpySocial y toca <b>Reenviar</b>.',
    browserText: 'Tu correo se verificó correctamente. Vuelve a SpySocial en tu navegador e inicia sesión.',
    browserPhoneText: 'Tu correo se verificó correctamente. Vuelve a SpySocial en la computadora donde te registraste e inicia sesión.',
    browserButton: 'Volver a SpySocial',
  },

  launch: {
    railLabel: "Pantallas de SpySocial 2.2",
    shots: {
      talk: "Spy Talk: Haz preguntas astutas. Encuentra al espía.",
      sketch: "Spy Sketch: Dibuja la palabra secreta. Atrapa al que finge.",
      online: "Jugar en línea: Mesas de 4 u 8, cuando quieras",
      gamenight: "Noche de Juegos: Títulos que solo se ganan esa noche",
      market: "Mercado Negro: Intercambia objetos con otros agentes",
      friends: "Amigos: Agrega amigos. Jueguen juntos.",
    },
    cards: [
      { title: "Spy Sketch", text: "Dibuja la palabra secreta en una pizarra compartida y atrapa al espía que finge saberla." },
      { title: "Jugar en línea", text: "Toca «Buscar partida» para una mesa de 4 u 8, cuando quieras. Los extraños ven tu color de agente, nunca tu nombre." },
      { title: "Noche de Juegos", text: "Noches programadas en línea, con títulos que solo se ganan esa noche. Te avisamos antes de que empiecen." },
      { title: "Mercado Negro", text: "Intercambia objetos con amigos. Los adultos también compran y venden objetos en el Mercado Negro por Intel, que se gana jugando. Nunca por dinero real." },
      { title: "Membresías", text: "Opcional: el Pase de paquetes (mensual o anual) o la Membresía de por vida: pagas una vez y nunca se renueva. Todos los paquetes premium en las salas que organizas y en tu mesa de Jugar en línea, y el creador de paquetes. No se vende nada más." },
    ],
    allNotes: "Todo lo nuevo de la 2.2",
    community: {
      title: "Encuentra tu mesa",
      text: "Noches de juegos, noticias y jugadores buscando partida: únete al Discord de SpySocial.",
      discord: "Únete al Discord",
      pressTitle: "Prensa y creadores",
      press: "¿Escribes sobre SpySocial o quieres jugarlo en tu canal? Escribe a <email/> con «Prensa» en el asunto.",
    },
    notes: {
      tag: "Lanzamiento",
      summary: "Nuestra mayor actualización: Spy Sketch, Jugar en línea, la Noche de Juegos, la partida de práctica, los intercambios, el Mercado Negro y las membresías.",
      items: [
        { title: "Partida de práctica", text: "Aprende Spy Talk y Spy Sketch en una partida real con agentes de IA, como local o como espía. Te guiamos en cada jugada y le ponemos a tu partida una nota de la A a la F." },
        { title: "Mis indicios", text: "Los espías anotan lo que descubren en su página de indicios, arman una lista corta de lugares o palabras posibles y hacen su intento final desde ella." },
        { title: "Reglas de sala privada", text: "Reglas opcionales, como el Informante: un local que conoce en secreto a un espía. En Cómo jugar > Funciones y ajustes hay una demo corta y jugable de cada una." },
        { title: "Amigos y grupos", text: "Agrega amigos con tu código de amigo o por nombre de usuario, sigue a jugadores y busquen mesa juntos en grupo. Crear un grupo es para miembros. En iPhone y iPad, los amigos, los grupos y los intercambios son para mayores de 18." },
        { title: "Intercepciones", text: "Archivos sellados con un objeto al azar para tu agente. Se ganan con victorias en Jugar en línea, con tu racha diaria y en la Noche de Juegos. Algunos objetos salen como Únicos: irrepetibles, con su propio color y número de serie. Las probabilidades se ven antes de abrir o comprar una. Nunca se venden por dinero." },
        { title: "Intel e intercambios", text: "Intel es el dinero propio del juego: se gana jugando y se gasta en la Bóveda. No se puede comprar y no tiene valor monetario. Intercambia objetos con tus amigos cuando tu cuenta tenga 7 días, tu correo esté confirmado y hayas jugado 3 partidas. Cada intercambio está protegido 7 días." },
        { title: "Paquetes de la comunidad", text: "Explora en Comunidad los paquetes que hacen los jugadores. Los miembros escriben los suyos con el creador de paquetes y los comparten." },
        { title: "10 idiomas", text: "Inglés, español y ruso, y además francés, portugués (Brasil), chino (simplificado), hindi, árabe, bengalí e indonesio en beta. Cada quien ve el juego en su idioma." },
        { title: "Notificaciones", text: "Para invitaciones y solicitudes de amigos, intercambios, ofertas del Mercado Negro y las Noches de Juegos en las que tocaste Recordarme." },
      ],
      more: "Además: estadísticas, niveles hasta el 100 con prestigio, logros, títulos, marcos y celebraciones, menciones con @, minijuegos en el Arcade, un micrófono más rápido, volver a la partida sin tropiezos cuando tu teléfono se duerme y un nuevo aspecto en cada pantalla.",
      newLabel: "Novedades de la 2.2",
      moreLabel: "Y más",
    },
  },
}

export default es
