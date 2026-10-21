import type { Strings } from './en'

/** Spanish (es): neutral Latin American, «tú» like the app; the app's words (Crear sala, «Jugar en línea», Buscar partida, Ajustes, Reportar, anfitrión, noche de juegos), UI labels quoted «así». */
const es: Strings = {
  meta: {
    siteName: 'SpySocial',
    defaultTitle: 'SpySocial — El juego de fiesta del engaño social',
    description:
      'Encuentra al espía o engaña a todos. Juego de fiesta multijugador gratis y en tiempo real para 3–21 jugadores. Disponible en iOS y Google Play.',
    titles: {
      faq: 'Ayuda y preguntas frecuentes',
      contact: 'Contacto',
      rules: 'Normas de la comunidad',
      safety: 'Seguridad',
      privacy: 'Política de privacidad',
      terms: 'Términos de servicio',
      childSafety: 'Estándares de seguridad infantil',
      whatsNew: 'Novedades',
      deleteAccount: 'Eliminar tu cuenta',
      join: 'Unirse a una partida',
      joinEvent: 'Evento público',
      resetPassword: 'Restablecer contraseña',
      confirmSuccess: 'Correo confirmado',
      notFound: 'Página no encontrada',
    },
  },

  language: {
    button: (name: string) => `Idioma: ${name}. Cambiar idioma`,
    menu: 'Idioma',
  },

  header: {
    home: 'Inicio de SpySocial',
    nav: 'Sitio',
    join: 'Unirse a una sala',
    joinShort: 'Unirse',
    shop: 'Tienda',
    toLight: 'Cambiar a modo claro',
    toDark: 'Cambiar a modo oscuro',
  },

  footer: {
    tagline: 'El juego de fiesta del engaño social.',
    play: 'Jugar',
    legal: 'Legal y seguridad',
    browser: 'Juega en tu navegador',
    whatsNew: 'Novedades',
    rules: 'Normas',
    support: 'Ayuda',
    contact: 'Contacto',
    shop: 'Tienda',
    privacy: 'Privacidad',
    terms: 'Términos',
    childSafety: 'Seguridad infantil',
    safety: 'Seguridad',
    deleteAccount: 'Eliminar cuenta',
    rights: (year: number) => `© ${year} SpySocial. Todos los derechos reservados`,
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
          text: 'El espía puede adivinar el secreto cuando quiera. Si acierta, gana; si falla, queda fuera.',
          alt: 'El espía elige la ubicación de la lista para ganar la ronda',
        },
      ],
      win: 'Los Locales ganan si expulsan a todos los espías. Los espías ganan si adivinan el secreto o si siguen ocultos hasta que se acabe el tiempo.',
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
      purchases: 'Paquetes opcionales si quieres más lugares y palabras.',
    },
  },

  faq: {
    title: 'Ayuda y preguntas frecuentes',
    needMore: '¿Necesitas más ayuda?',
    sections: {
      start: 'Primeros pasos',
      modes: 'Modos de juego',
      features: 'Funciones en el juego',
      sharing: 'Compartir salas y unirse',
      languages: 'Idiomas',
      host: 'Controles del anfitrión',
      account: 'Cuenta e inicio de sesión',
      trouble: 'Solución de problemas',
    },
    startGame: {
      q: '¿Cómo empiezo una partida?',
      a: [
        'Toca <b>Crear sala</b> para ser el anfitrión, o únete con un código de sala de 4 a 8 letras y números',
        'Se necesitan al menos 3 jugadores para empezar una ronda',
        'Comparte la sala con tus amigos desde el menú de compartir, con el código QR o con un enlace',
      ],
    },
    firstTime: {
      q: '¿Es tu primera vez?',
      a: [
        'La app te muestra un tutorial rápido la primera vez que la abres',
        'Te pedirá que configures tu perfil (nombre visible y un avatar opcional)',
        'Luego llegas a la pantalla de inicio, listo para crear una sala o unirte a una',
      ],
    },
    howMany: {
      q: '¿Cuántos pueden jugar?',
      intro: 'De 3 a 21 jugadores. Espías recomendados:',
      a: ['3–5 jugadores: 1 espía', '6–8 jugadores: 2 espías', '9+ jugadores: 3 espías'],
    },
    gameModes: {
      q: '¿Qué modos de juego hay?',
      a: ['Dos juegos: <b>Spy Talk</b>, donde el secreto es una ubicación y todos hacen y responden preguntas, y <b>Spy Sketch</b>, donde el secreto es una palabra y todos se turnan para dibujarla', '<b>Clásico:</b> los espías no se conocen entre sí', '<b>Espía Mafia:</b> los espías pueden ver quiénes son los otros espías'],
    },
    notebook: {
      q: '¿Qué es la libreta?',
      a: [
        'Toca el icono de la libreta durante una ronda para anotar quién dijo qué',
        'Los jugadores se ordenan solos: primero los jugadores activos con notas, luego los demás jugadores activos y al final los eliminados',
        'Las notas son privadas: solo tú puedes verlas',
      ],
    },
    hints: {
      q: '¿Cómo funcionan las pistas entre idiomas?',
      onePool: 'Las pistas se muestran en <b>el idioma de tu app</b>, como el resto del juego',
      gameLanguage: [
        'Las pistas siempre se muestran en el <b>idioma de la partida</b>, para que todos en la mesa lean la misma pregunta',
        'Si el idioma de tu interfaz es otro, toca la pista para verla traducida',
      ],
      reload: 'Usa el icono de recargar para cambiar una pista: tocar la frase ya no la cambia por accidente',
    },
    poke: {
      q: '¿Qué es un toque?',
      a: 'Toca la tarjeta de un compañero en la sala para darle un toque rápido: útil para llamar su atención antes de que empiece la ronda.',
    },
    leave: {
      q: '¿Puedo salir a mitad de la partida?',
      a: 'Sí: todas las pantallas del juego tienen un botón Salir para que salgas sin tener que retroceder pantalla por pantalla.',
    },
    share: {
      q: '¿Cómo comparto una sala con mis amigos?',
      a: [
        '<b>Menú de compartir:</b> usa el menú de compartir de tu teléfono para enviar el enlace a donde quieras',
        '<b>Código QR:</b> los amigos que estén cerca pueden escanearlo para unirse al instante',
        '<b>En voz alta:</b> solo di el código de la sala',
      ],
    },
    link: {
      q: '¿Alguien puede unirse con un enlace?',
      a: [
        'Sí: enlaces como <b>spysocial.app/join/<código></b> abren la app directamente en la sala',
        'Si no tiene la app, el enlace lo lleva al App Store o a Google Play',
      ],
    },
    languages: {
      q: '¿Cómo funcionan los idiomas?',
      setLanguage: 'Elige el idioma de la interfaz en tu perfil',
      onePool: [
        'Las salas no tienen idioma: cada jugador ve el juego en el suyo, incluida la ubicación o palabra secreta, su descripción, la lista del espía y las pistas',
        'Así, amigos que hablan idiomas distintos pueden jugar en la misma sala o en la misma mesa de «Jugar en línea»',
      ],
      chatAuto:
        'Los mensajes del chat se quedan como se escribieron, y uno en otro idioma se traduce al tuyo automáticamente (si prefieres tocar <b>Traducir</b>, desactiva <b>Traducir mensajes automáticamente</b> en Ajustes)',
      chatTap: 'Los mensajes del chat se quedan como se escribieron: toca <b>Traducir</b> para leer uno en tu idioma',
      hostPicks: 'El anfitrión elige el idioma de la partida para las ubicaciones y las pistas',
      parity: 'SpySocial está en <b>10 idiomas</b>: inglés, español, ruso, chino simplificado, hindi, árabe, francés, bengalí, portugués de Brasil e indonesio',
      differs: 'Si tu idioma es distinto al del anfitrión, verás traducciones donde importa',
    },
    customize: {
      q: '¿Qué puede personalizar el anfitrión?',
      a: ['Número de espías y modo de juego', 'Reglas de votación y si se revela quién pidió la votación', 'Paquetes de ubicaciones que se usan'],
      turnOnly: 'Duración del turno',
      languageAndTurn: 'Idioma de la partida y duración del turno',
    },
    endEarly: {
      q: '¿El anfitrión puede terminar una partida antes?',
      a: 'Sí: el anfitrión tiene el control <b>Terminar partida</b> para cerrarla en cualquier momento del juego.',
    },
    needAccount: {
      q: '¿Necesito una cuenta?',
      a: [
        'Puedes jugar como invitado sin registrarte',
        'Con una cuenta conservas tu perfil y tu progreso en todos tus dispositivos',
        'Puedes convertir un perfil de invitado en una cuenta completa cuando quieras, sin perder nada',
      ],
    },
    forgot: {
      q: 'Olvidé mi contraseña',
      a: [
        'Toca «¿Olvidaste tu contraseña?» en la pantalla de inicio de sesión y escribe tu correo',
        'Recibirás un enlace para restablecerla: al abrirlo llegas a una página segura de restablecimiento',
        'Si el enlace venció, pide uno nuevo',
      ],
    },
    code: {
      q: '¿El código de sala no funciona?',
      a: [
        'Los códigos de sala tienen <b>de 4 a 8 letras y números</b>: escríbelo tal como aparece en la pantalla del anfitrión',
        'Asegúrate de que el anfitrión no haya cerrado la sala ni empezado la partida',
        'Revisa tu conexión a internet',
      ],
    },
    connection: {
      q: '¿Perdiste la conexión?',
      a: [
        'La app se reconecta sola: no hace falta recargar',
        'Tu rol y tu progreso se conservan mientras no estás',
        'Si te quedas en una pantalla de «reconectando» más de unos segundos, puede que tu red no funcione: activa y desactiva el modo avión o cambia entre Wi-Fi y datos móviles',
      ],
    },
    offline: {
      q: '¿La app dice que no tienes conexión, pero sí la tienes?',
      a: 'Era un fallo de iOS en versiones anteriores; la v2.0.0 comprueba tu conexión con una prueba de red real antes de mostrar el estado sin conexión. Si aún pasa, cierra la app por completo y vuelve a abrirla.',
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
        'En cualquier sala con un jugador menor de 18 años se bloquean para todos los enlaces, los correos, los números de teléfono y las redes sociales. En las mesas de «Jugar en línea» y en las noches de juegos siempre están bloqueados.',
    },
    reports: {
      title: '4. Una persona lee los reportes',
      text: (o: { messages: boolean; drawings: boolean }) =>
        `Mantén pulsado a un jugador para reportarlo o bloquearlo.${
          o.messages ? ' Mantén pulsado un mensaje, una pregunta o una respuesta para reportarlo: el reporte lo incluye junto con el chat de alrededor.' : ''
        }${o.drawings ? ' También puedes reportar un dibujo.' : ''} Una persona lee cada reporte en menos de 24 horas. El chat público se guarda 14 días para poder revisar los reportes; el jugador que reportas no sabe quién lo envió.`,
    },
    child: {
      title: 'Seguridad infantil',
      text: 'Nunca permitimos contenido sexual que involucre a menores de 18 años, ni que alguien intente manipular, sexualizar o explotar a un niño. Lo eliminamos, bloqueamos las cuentas involucradas y lo reportamos al National Center for Missing & Exploited Children (NCMEC), como exige la ley. Si ves algo así, escribe a <email/> con «Child safety» en el asunto, y reporta al jugador en la app si compartiste sala con esa persona. También puedes reportarlo directamente a la <link>CyberTipline</link> del NCMEC (1-800-843-5678). Si un niño está en peligro inmediato, llama primero al número de emergencias local. Nuestros <link2>Estándares de seguridad infantil</link2> dan más detalles.',
      subject: 'Child safety',
    },
    breaking: {
      title: 'Qué pasa cuando alguien rompe las normas',
      text: 'Normalmente, primero una advertencia. Los problemas repetidos o graves llevan a un silencio en el chat (de 1 hora a 7 días), una pausa de las salas públicas y los eventos (de 1 a 30 días) o un bloqueo de la cuenta. Compartir información personal de otra persona, o cualquier cosa que sexualice a un niño, puede significar un bloqueo inmediato. Cada aviso en la app dice qué está limitado, por qué y hasta cuándo, con un ID como S-207.',
      drawings:
        'Los dibujos en salas públicas y eventos pueden revisarse automáticamente en cualquier momento, y todo dibujo reportado se revisa. Si un dibujo tuyo rompe estas normas, tu cuenta puede quedar pausada o bloqueada de las salas públicas y los eventos, sin importar cuánto tiempo lleves jugando. En una sala pública, un turno que rompe estas normas se quita del dibujo y cuenta como falta: primero una advertencia, luego 3, 7 y 30 días sin salas públicas ni eventos, y a la quinta falta en 90 días, para siempre. En cualquier sala, un símbolo de odio (una esvástica cuenta, salvo que la palabra de la ronda deje claro un significado religioso), un término ofensivo escrito o un mensaje de odio dirigido a alguien saca al jugador de la partida y de las salas públicas y los eventos para siempre, y un dibujo que sexualiza a un niño cierra la cuenta y se trata como se indica arriba en Seguridad infantil. La sangre y los monstruos están permitidos. En una sala privada, un dibujo reportado solo se sanciona automáticamente cuando es así de grave; todo lo demás lo decide la persona que lee el reporte. Para apelar, escríbenos con el código de tu aviso.',
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
        `<b>Salas públicas y eventos</b> con jugadores que tu hijo o hija no conoce${playOnline ? ', incluido «Jugar en línea», que sienta a los jugadores en una mesa automáticamente' : ''}.`,
      buy: '<b>Cosas para comprar:</b> paquetes y membresías, a través del App Store o Google Play.',
      hasNotTitle: 'Lo que SpySocial no tiene',
      noDms:
        'No hay mensajes directos: los jugadores solo pueden chatear dentro de una sala, con los jugadores que están en ella. El chat de los espías dura una partida y se filtra, se guarda y se puede reportar como el resto.',
      noFriends:
        'No hay listas de amigos ni de seguidores, ni búsqueda de jugadores, ni perfiles para explorar, ni biografías, así que nadie puede buscar a tu hijo o hija ni contactarlo fuera de una sala.',
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
        '<b>Filtro del chat:</b> los nombres y el chat se revisan antes de que nadie los vea. En las salas públicas se bloquean los términos ofensivos, las palabras sexuales explícitas y los insultos. En las salas privadas se bloquean las palabras más graves. En cualquier sala con un jugador menor de 18 años se bloquean para todos los enlaces, los correos, los números de teléfono y las redes sociales. En las mesas de «Jugar en línea» y en las noches de juegos siempre están bloqueados.',
      reports:
        '<b>Reportes, bloqueos y sanciones:</b> una persona lee cada reporte en menos de 24 horas, y el jugador reportado no sabe quién lo envió. Los reportes que involucran a un jugador menor de 18 años se leen primero. Las sanciones van desde una advertencia hasta un silencio en el chat, una pausa de las salas públicas o un bloqueo de la cuenta. Nuestras <link>Normas de la comunidad</link> indican lo que no está permitido.',
      drawingCheck:
        '<b>Revisión de dibujos:</b> cada turno de dibujo en una sala pública se revisa automáticamente, y un turno que rompe las normas se quita del dibujo.',
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
        text: 'Reporta al jugador en la app y elige <b>Seguridad infantil</b>, y escribe a <email/> con «Child safety» en el asunto. Eliminamos el contenido, bloqueamos las cuentas involucradas y lo reportamos al NCMEC y a otras autoridades, como exige la ley.',
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
  },

  whatsNew: {
    title: 'Novedades',
    sub: 'Notas de versión de SpySocial. Grandes actualizaciones, nuevas funciones y mejoras, a medida que las lanzamos.',
    releases: [
      {
        tag: 'Lanzamiento en Android',
        summary:
          'SpySocial ya está oficialmente en Google Play Store: la primera versión pública de producción en Android, con los últimos retoques de las pruebas cerradas en dispositivos Android reales.',
        sections: [
          {
            label: 'Ya disponible',
            items: [
              { title: 'Android 2.1.1', text: 'Disponible en Google Play desde el 13 de junio de 2026.' },
              { title: 'iOS 2.1.1', text: 'Las mismas correcciones, enviadas a App Store Connect.' },
            ],
          },
          {
            label: 'Retoques previos al lanzamiento',
            items: [
              { title: 'El botón Eliminar cuenta ya no queda cortado', text: 'El contenido de la pantalla Cuenta ahora respeta el margen inferior del área segura del dispositivo y deja espacio para la barra de cambios sin guardar: Google Play exige que la eliminación de la cuenta dentro de la app sea accesible.' },
              { title: 'Botones Salir de la sala / Iniciar partida en la sala', text: 'Ahora quedan por encima de la barra de navegación por gestos de Android gracias a márgenes de área segura dinámicos.' },
              { title: 'Avisos de Iniciar partida', text: 'Ahora indica qué falta (3+ jugadores, todos listos, al menos una categoría) cuando no se cumplen los requisitos. Antes el botón quedaba desactivado sin ninguna explicación.' },
              { title: 'Pantalla de categorías', text: 'El control de volver y el título «Categorías y ubicaciones» ya no se amontonan. En Android el botón de volver es solo un icono (convención de Material); se redujo el tamaño de letra del título.' },
              { title: 'Ventana Cómo jugar', text: 'Se quitó el botón de volver duplicado en Android (se mostraban a la vez la X de cierre de la ventana y el botón de volver heredado de la pila).' },
              { title: 'Tutorial de bienvenida', text: 'Omitir ahora está disponible en cada paso, no solo en la primera diapositiva.' },
              { title: 'Banner de registro para invitados', text: 'Replanteado como una invitación («Desbloquea tu cuenta completa») con un icono de destellos y un botón de acción claro; antes tenía el estilo de una advertencia del sistema, lo que resultaba desalentador.' },
              { title: 'Pantallas de resultados y Cómo jugar', text: 'Los emojis se reemplazaron por glifos de Ionicons / FontAwesome. Los emojis se ven distintos según el fabricante de Android; los iconos vectoriales se ven siempre igual.' },
            ],
          },
          {
            label: 'Infraestructura',
            items: [
              { title: '', text: 'expo-updates ya está instalado y configurado con el proyecto de EAS. Las próximas correcciones solo de JS pueden llegar por actualizaciones over-the-air sin pasar por la revisión de Play Store / App Store.' },
            ],
          },
        ],
      },
      {
        tag: 'Actualización de pulido',
        summary:
          'Una versión de pulido: una pantalla de bienvenida rediseñada, pantallas de Fin de la partida y Cuenta renovadas, mejoras del diseño en iPad y un montón de correcciones de estabilidad y calidad por dentro.',
        sections: [
          {
            label: 'Nuevas funciones',
            items: [
              { title: 'Pantalla de bienvenida rediseñada', text: 'Nueva superficie en capas con un suave degradado celeste y discretos detalles de espías en el fondo (anillos de radar, retícula), una etiqueta naranja «SOCIAL DEDUCTION» arriba, un eslogan bajo el logo, botones Iniciar sesión / Registrarse con iconos, un divisor «O» y un enlace ligero «Continuar como invitado». La insignia de versión ahora es una etiqueta discreta al pie de la pantalla.' },
              { title: 'Flujo de cuenta «confirmación pendiente»', text: 'Cuando un invitado pasa a una cuenta completa, la pantalla Cuenta ahora muestra un estado pendiente claro con las acciones Reenviar / Cancelar / Actualizar, para que sepa exactamente en qué punto de la confirmación por correo está.' },
            ],
          },
          {
            label: 'Renovación visual',
            items: [
              { title: 'Pantalla de Fin de la partida rediseñada', text: 'Tarjetas de jugador de una sola superficie con un degradado suave y un acento de color en el borde izquierdo, un trofeo destacado con un halo brillante, secciones del equipo ganador con acentos dorados, tarjeta de ubicación con un icono de marcador y un botón inferior «Volver a la sala» con degradado celeste.' },
              { title: 'Pantalla Cuenta rediseñada', text: 'Una sola lista coherente, encabezados de sección en mayúsculas iguales en todos los grupos (Perfil, Preferencias, Cuenta y seguridad, Ayuda y legal, Zona de peligro), filas de menú al estilo de los Ajustes de iOS para Ayuda / Legal, y la Zona de peligro movida al final.' },
              { title: 'Pulido de la interfaz en iPad', text: 'Tarjetas de jugador de la sala en 6 columnas (antes 3), tarjeta de revelación de roles limitada a 420 pt, casillas de jugador más grandes en la partida (140×178) con un contenedor más alto para que la tercera fila nunca se corte, columna de la libreta que se ajusta a la tarjeta de rol, y fila de tarjetas de inicio/jugar adaptada al iPad con tipografía de HomeCard más grande.' },
            ],
          },
          {
            label: 'Correcciones para Android',
            items: [
              { title: 'Protección del gesto de volver', text: 'El gesto de volver del sistema en Android 10+ (y el botón físico de volver) ahora pasan por el mismo diálogo de confirmación de Salir que el botón Salir del encabezado. Antes, en Android se podía salir de una pantalla de la partida o de la sala con un gesto, sin ninguna confirmación; gestureEnabled: false solo detiene el gesto de iOS. Se implementó con un hook compartido useBackPressGuard que combina navigation.addListener(\'beforeRemove\') con BackHandler.hardwareBackPress.' },
              { title: 'Artefacto visual de «caja dentro de caja»', text: 'El compositor de Android mostraba un borde interior visible en cada tarjeta de votación / resultados de la votación / fin de la partida. Causa: fondo rgba translúcido + borde fino translúcido + borderRadius + overflow:hidden; el borde de la propia capa de recorte redondeada se veía a través del borde semitransparente. Corregido en VotePlayerRow, VoteResultRankCard, VoteOutcomeCard y la tarjeta de jugador del fin de la partida.' },
              { title: 'Hueco en el encabezado de Fin de la partida', text: 'El SafeAreaView de la pantalla contaba dos veces el margen superior además del encabezado del Stack, y dejaba una franja visible del degradado de GameBackground entre el encabezado y el punto donde empezaba a recortarse el contenido. Ahora se limita a [\'bottom\',\'left\',\'right\'], igual que las pantallas voting / vote_results.' },
              { title: 'WheelPicker', text: 'Reemplazo en JS puro de @react-native-picker/picker. El selector nativo ignora sin avisar itemStyle en Android (por eso nuestro texto blanco se veía negro sobre fondo oscuro, ilegible) y tiene desde hace tiempo cierres por NullPointerException al descartarse, ambos errores de la biblioteca original. El reemplazo ofrece la misma experiencia en las dos plataformas con un ScrollView + snap-to-interval.' },
            ],
          },
          {
            label: 'Mejoras',
            items: [
              { title: 'Reloj sincronizado con el servidor', text: 'Cada cálculo de «segundos restantes» ahora resta un desfase medido respecto al reloj del servidor (con una nueva función de Postgres server_now()) en lugar de fiarse del reloj del dispositivo. Corrige cuentas regresivas absurdas ocasionales en dispositivos con la hora mal sincronizada.' },
              { title: 'Flujos de autenticación unificados', text: 'El registro, el reenvío de la confirmación, el restablecimiento de contraseña y el cambio de correo pasan ahora por una sola Edge Function con un contenedor de cliente compartido, lo que elimina el riesgo de que las cuatro llamadas de la interfaz se desincronicen. Nuevas migraciones agregan una clave de idempotencia al registro, amplían auth_attempts para cubrir los demás tipos de flujo y agregan un RPC para cancelar el cambio de correo.' },
              { title: 'Cuenta: alternativa a mailto', text: 'Las filas de correo de Ayuda / Legal ahora copian la dirección al portapapeles con un aviso amable cuando no hay una app de correo configurada, en lugar de lanzar un error no controlado.' },
              { title: '', text: 'Traducción completa en inglés, español y ruso para todas las claves nuevas (etiqueta y eslogan de bienvenida, textos de cuenta pendiente de confirmación, etc.).' },
            ],
          },
          {
            label: 'Técnico',
            items: [
              { title: '', text: 'tsconfig.json ahora excluye supabase/functions/**: son archivos de Edge Functions de Deno con otro objetivo de resolución de módulos.' },
              { title: '', text: 'Versión subida a 2.1.0; número de compilación de iOS incrementado para el envío al App Store.' },
            ],
          },
        ],
      },
      {
        tag: 'Gran actualización',
        summary:
          'Una reconstrucción completa de la experiencia multijugador: se rediseñaron todas las pantallas, se reescribió el motor en tiempo real para darle estabilidad y llegan juntas un montón de funciones nuevas.',
        sections: [
          {
            label: 'Nuevas funciones',
            items: [
              { title: 'Tutorial y configuración del perfil', text: 'A quienes juegan por primera vez se les explica el juego y se les pide que configuren su perfil.' },
              { title: 'Libreta en la partida', text: 'Anota quién dijo qué durante la ronda. Los jugadores se ordenan solos: primero los jugadores activos con notas, luego los demás jugadores activos y al final los eliminados.' },
              { title: 'Traducción de pistas', text: 'Si el idioma de tu interfaz es distinto al de la partida, toca una pista para ver la misma pregunta en tu idioma. Las pistas se quedan en el idioma de la partida para que todos en la mesa lean la misma pregunta.' },
              { title: 'Toques entre jugadores', text: 'Toca la tarjeta de un compañero en la sala para darle un toque.' },
              { title: 'Compartir con código QR', text: 'Comparte salas con el menú de compartir del sistema y un código QR escaneable.' },
              { title: 'Enlaces universales', text: 'spysocial.app/join/<código> abre la app y te lleva directo a la sala (también si la app estaba cerrada).' },
              { title: 'Códigos de sala de 5 caracteres', text: 'Códigos más cortos y fáciles de decir en voz alta. Los antiguos de 6 caracteres siguen funcionando.' },
              { title: 'Revelar quién pidió la votación', text: 'Ajuste de la sala para mostrar, si quieres, quién inició la votación.' },
              { title: 'Terminar partida para el anfitrión', text: 'El anfitrión ahora puede terminar una partida antes de tiempo.' },
              { title: 'Paquete de ubicaciones Extra 1', text: 'Una nueva tanda de ubicaciones para jugar.' },
              { title: 'Botón Salir en la partida', text: 'Salida rápida de las partidas en curso sin retroceder pantalla por pantalla.' },
            ],
          },
          {
            label: 'Renovación visual',
            items: [
              { title: '', text: 'Interfaz de la sala totalmente modernizada, con tarjetas de jugador interactivas.' },
              { title: '', text: 'Pantalla de ajustes de la sala rediseñada (con un PickerModal reutilizable por dentro).' },
              { title: '', text: 'Pantalla de la partida rediseñada.' },
              { title: '', text: 'Pantalla de votación rediseñada, con quién pidió la votación y el progreso.' },
              { title: '', text: 'Pantalla de resultados de la votación rediseñada, con una experiencia estándar de resultados / eliminados.' },
              { title: '', text: 'Fase de revelación de roles pulida: muestra los nombres de quienes faltan y se amplió a 60 segundos.' },
              { title: '', text: 'Las tarjetas de inicio ahora ajustan el texto solas; botón de actualizar más fino.' },
              { title: '', text: 'Todas las pantallas de la partida comparten ahora el mismo encabezado azul marino oscuro (Resolver y Resultados de resolver ya no usan variantes blancas/transparentes).' },
              { title: '', text: 'Banner sin conexión estandarizado en todas las pantallas: altura uniforme, respeta el área segura y ya no choca con la Dynamic Island.' },
              { title: '', text: 'La pantalla Cuenta tiene un estado vacío sin conexión pulido, con un icono de nube desconectada.' },
            ],
          },
          {
            label: 'Mejoras',
            items: [
              { title: 'Mejor resistencia de red', text: 'Corrige un viejo fallo de iOS por el que NetInfo podía mentir («sin conexión») tras una larga suspensión en segundo plano, y dejaba pantallas atascadas en estados de reconexión aunque la red funcionara bien. El hook compartido useNetwork ahora verifica cualquier «sin conexión» con una prueba HTTP real a Supabase; todas las pantallas de antes y durante la partida usan ese mismo hook.' },
              { title: '', text: 'La pantalla Jugar ahora confía en los resultados reales de las solicitudes y no en el estado desactualizado de NetInfo, reintenta sola cada 5 segundos mientras no hay conexión, ordena las solicitudes simultáneas y nunca muestra por error la pantalla de sesión cerrada cuando el usuario solo está sin conexión.' },
              { title: '', text: 'Sincronización en tiempo real reforzada en todas las fases (sala, revelación de roles, partida, votación, resultados).' },
              { title: '', text: 'El temporizador de la partida ahora está sincronizado con el servidor: se corrigió el desfase del reloj.' },
              { title: '', text: 'Mejor manejo sin conexión y mejor lógica de reconexión.' },
              { title: '', text: 'Flujos de autenticación e inicio de sesión reforzados: registro más robusto, flujo de restablecimiento de contraseña y flujo para convertir una cuenta de invitado.' },
              { title: '', text: 'Pantalla Cuenta pulida, con un sistema de mensajes en barra rediseñado.' },
              { title: '', text: 'Traducción completa en inglés, español y ruso (171 sugerencias de pistas por idioma, indexadas por una posición estable para que las futuras funciones de traducción funcionen sin más).' },
              { title: '', text: 'Libreta: el teclado ya no aparece solo al elegir un jugador; el panel ajusta su tamaño como corresponde.' },
              { title: '', text: 'Panel de pistas: tocar la frase de la pista ya no la cambia por accidente; el icono de recargar es la única forma de cambiarla.' },
              { title: '', text: 'Compatibilidad con iOS 26: se desactivó la cápsula Liquid Glass en los elementos de la barra del encabezado.' },
              { title: '', text: 'Encabezado unificado en un hook compartido useGameScreenHeader para que sea igual en todas las pantallas.' },
              { title: '', text: 'Se quitaron los registros de producción de las compilaciones publicadas.' },
            ],
          },
          {
            label: 'Correcciones',
            items: [
              { title: '', text: 'Se corrigió una condición de carrera entre la votación y el fin de la partida.' },
              { title: '', text: 'Se corrigieron casos límite de doble conteo y de fin del temporizador en las votaciones.' },
              { title: '', text: 'Se corrigió el conteo por mayoría simple frente a las abstenciones; la abstención ahora queda fija en la barra de acciones.' },
              { title: '', text: 'Se corrigió la superposición del encabezado en los resultados de resolver (el contenido chocaba con el encabezado transparente).' },
              { title: '', text: 'Se corrigió que el estado inicial de las animaciones se viera en la pantalla de la partida.' },
              { title: '', text: 'Se corrigieron advertencias de escritura durante el render de Reanimated en la pantalla de votación.' },
              { title: '', text: 'Se corrigió el flujo para convertir una cuenta de invitado, que cerraba la sesión del invitado sin querer.' },
              { title: '', text: 'Se corrigió el campo de correo de Cuenta.' },
              { title: '', text: 'Se corrigió el texto cortado en las tarjetas de inicio y los recortes de encabezados en español.' },
            ],
          },
          {
            label: 'Técnico',
            items: [
              { title: '', text: 'Gestión del estado migrada a los hooks useRoom y useGame.' },
              { title: '', text: 'Rutas aplanadas: se quitó el grupo de rutas (tabs) en favor de rutas planas.' },
              { title: '', text: 'react-native-screens fijado en ~4.18 por compatibilidad con expo-router 6.0.23.' },
              { title: '', text: 'Corrección de la publicación en tiempo real del lado de Supabase.' },
              { title: '', text: 'Sugerencias de preguntas reorganizadas en tríos de traducción paralelos ({ en, es, ru }): una sola fuente de verdad.' },
              { title: '', text: 'Se quitaron campos obsoletos del esquema de Expo (privacy, privacyPolicyUrl, termsOfServiceUrl); las URL de privacidad y términos se gestionan en App Store Connect.' },
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

  join: {
    title: 'Unirse a la partida',
    noCode: 'No se indicó un código de sala',
    browserOrPhone: 'Juega en tu navegador, o en tu teléfono con la app',
    openToJoin: 'Abre SpySocial para unirte a la sala',
    roomCode: 'Código de sala',
  },

  joinEvent: {
    label: 'Evento público',
    broken: 'Este enlace de evento no funciona',
    brokenHelp: 'Revísalo, o abre SpySocial y explora las salas.',
    live: 'En vivo',
    cancelled: 'Cancelado',
    ended: 'Terminado',
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
      `En <b>Cuenta e inicio de sesión</b>, toca <b>Eliminar cuenta</b> (la última fila, en rojo) y confirma.${
        o.oldApps ? ' (En las versiones anteriores a la 2.2, Eliminar cuenta está en la Zona de peligro, al final de Cuenta.)' : ''
      }`,
    ],
    atOnce: 'Tu cuenta se elimina de inmediato.',
    guestTitle: 'Cuentas de invitado',
    guest: (purchases: boolean) =>
      `Una cuenta de invitado se elimina en cuanto tocas <b>Cerrar sesión</b> (en Ajustes, en Cuenta e inicio de sesión; en las versiones anteriores a la 2.2, en Cuenta, en Cuenta y seguridad) y confirmas. Un invitado no puede volver a iniciar sesión, así que no hay forma de recuperarla.${
        purchases
          ? ' Las compras son la excepción, como en cualquier cuenta eliminada: lo que compraste como invitado vuelve con Restaurar compras, en la cuenta del App Store o de Google Play con la que pagaste.'
          : ''
      }`,
    noAppTitle: '¿Ya no tienes la app instalada?',
    noApp: 'Escribe a <email/> desde el correo vinculado a tu cuenta con el asunto «Delete my SpySocial account». Las solicitudes se procesan en un plazo de 30 días.',
    deletedTitle: 'Qué se elimina',
    staysTitle: 'Qué se conserva y por cuánto tiempo',
    details: 'Nuestra <link>Política de privacidad</link> tiene los detalles.',
  },

  notFound: {
    title: 'Página no encontrada',
    text: 'La página que buscas no existe.',
  },

  confirmSuccess: {
    title: 'Correo confirmado',
    text: 'Tu correo se verificó correctamente. Ya puedes usar todas las funciones de la app SpySocial.',
    home: 'Volver al inicio',
    browserText: 'Tu correo se verificó correctamente. Vuelve a SpySocial en tu navegador e inicia sesión.',
    browserPhoneText: 'Tu correo se verificó correctamente. Vuelve a SpySocial en la computadora donde te registraste e inicia sesión.',
    browserButton: 'Volver a SpySocial',
  },
}

export default es
