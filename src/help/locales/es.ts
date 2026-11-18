import type { HelpText } from '../types'

/** Spanish (es): neutral Latin American, «tú» like the app; the app's words (Sala privada, Crear sala, Jugar en línea, Buscar partida, Acciones, Resolver, Bóveda, Mercado Negro, Rarezas, intercepciones, Intel). */
// help-new-1117 (2026-11-17, against app int/u62-15-prep): #question-rounds, #game-night-weekly, #game-night-rewards, #game-night-intercepts, #practice-members, #membership-switch, #two-memberships, #sign-up-email; agent translation, unreviewed.
const es: HelpText = {
  title: 'Ayuda y preguntas frecuentes',
  lede: 'Respuestas rápidas sobre cómo jugar SpySocial, tu cuenta, las recompensas y la membresía.',
  search: 'Buscar en la ayuda',
  searchHint: 'Prueba «votar» o «cancelar»',
  clear: 'Borrar',
  results: (n) => (n === 1 ? '1 respuesta' : `${n} respuestas`),
  noResults: (q) => `No hay nada para «${q}». Prueba con una palabra más corta o escríbenos.`,
  topics: 'Temas',
  stillStuck: '¿Sigues con dudas? Escribe a',
  sections: (o) => [
    {
      id: 'start',
      title: 'Primeros pasos',
      items: [
        {
          id: 'what-is-spysocial',
          q: '¿Qué es SpySocial?',
          a: [
            'Un juego de fiesta gratuito de engaño social para 3 a 21 jugadores. La mayoría son locales y comparten un secreto. Uno o más espías no lo conocen e intentan pasar desapercibidos. Encuentra al espía, o engaña a todos si te toca serlo.',
            'Hay dos juegos: <b>Spy Talk</b>, donde todos hacen y responden preguntas sobre un lugar secreto, y <b>Spy Sketch</b>, donde todos dibujan por turnos una palabra secreta.',
          ],
        },
        {
          id: 'how-many-players',
          q: '¿Cuántos jugadores hacen falta?',
          a: [
            'Una sala privada se juega con 3 a 21 jugadores.',
            '<b>Jugar en línea</b> te sienta en una mesa de 4 u 8.',
            'El anfitrión elige cuántos espías hay, según los jugadores de la sala: con 8 jugadores puede haber hasta 3.',
          ],
        },
        {
          id: 'is-it-free',
          q: '¿SpySocial es gratis?',
          a: [
            'Sí. Los dos juegos, Jugar en línea, las salas privadas y la Noche de Juegos son gratis y sin anuncios.',
            `La membresía, opcional, desbloquea los paquetes premium y algunos estilos para tu agente. Nada de lo que compres te ayuda a ganar.${o.purchases ? '' : ' La membresía sale a la venta con la versión 2.2.'}`,
          ],
        },
        {
          id: 'start-a-game',
          q: '¿Cómo empiezo una partida?',
          a: [
            '<b>Con amigos:</b> toca <b>Sala privada</b> y luego <b>Crear sala</b>, y comparte el código de la sala, el código QR o el enlace de invitación. Hacen falta al menos 3 jugadores.',
            '<b>Con cualquiera:</b> toca <b>Jugar en línea</b> y luego <b>Buscar partida</b>.',
            o.practiceMembers ? "<b>¿Eres nuevo?</b> <b>Cómo jugar</b>, en el inicio, tiene un tutorial gratis de 3 minutos para cada juego y después, para miembros, partidas de práctica contra agentes de IA. El glosario también está ahí." : "<b>¿Eres nuevo?</b> <b>Cómo jugar</b>, en el inicio, tiene un tutorial de 3 minutos para cada juego y después partidas de práctica contra agentes de IA. El glosario también está ahí.",
          ],
        },
      ],
    },
    {
      id: 'how-to-play',
      title: 'Cómo jugar',
      items: [
        {
          id: 'roles',
          q: '¿Qué hacen los locales y los espías?',
          a: [
            'Los <b>locales</b> ven el secreto: un lugar en Spy Talk, una palabra en Spy Sketch. Todos reciben el mismo. Demuestra que lo conoces sin revelarlo.',
            'Los <b>espías</b> ven ESPÍA. Escucha, actúa como si también conocieras el secreto y descúbrelo antes de que te atrapen.',
            'En <b>Espía Mafia</b>, los espías ven quiénes son los demás y comparten un chat privado. En <b>Clásico</b>, cada espía juega solo. Con 1 espía, los dos modos son iguales.',
          ],
        },
        {
          id: 'spy-talk',
          q: '¿Cómo funciona Spy Talk?',
          a: [
            'Primero, las preguntas: por turnos, cada jugador le hace una pregunta al siguiente y responde una.',
            'Después, la discusión libre: chatea, insiste en las respuestas raras y convoca votaciones.',
            '¿Sin ideas? La carta de pistas, abajo en la pantalla, tiene una pregunta. Preguntar el nombre del lugar o su primera letra no es juego limpio.',
          ],
        },
        ...(o.questionRounds
          ? [
            {
              id: 'question-rounds',
              q: '¿Qué son las rondas de preguntas?',
              a: [
                'Algunas mesas de Spy Talk juegan 2 rondas de preguntas en vez de 1: las salas privadas cuyo anfitrión elige 2 en las <b>Reglas</b> de la sala, y las Noches de Juegos que lo tengan. En Jugar en línea siempre es 1.',
                'En la ronda 1, cada uno hace una pregunta y responde una. En cuanto llega la última respuesta, empieza la ronda 2, al revés: te pregunta la persona a la que preguntaste. Arriba se ve «Ronda 2».',
                'Después, la discusión, con su tiempo de siempre. Dos rondas dan a los locales el doble de respuestas para revisar, y al espía el doble de ocasiones para delatarse.',
              ],
            },
            ]
          : []),
        {
          id: 'talk-out-loud',
          q: "¿Qué es Hablar en voz alta?",
          a: [
            "Una regla de Spy Talk para grupos en el mismo lugar o en una llamada de voz. El anfitrión la activa en las <b>Reglas</b> de la sala; las salas nuevas empiezan con ella desactivada. Solo en salas privadas y en las Noches de Juegos que la activen.",
            "Durante las preguntas nadie escribe ni usa el micrófono: quien pregunta lo hace en voz alta y toca <b>Hecho</b>; luego quien responde contesta en voz alta y toca <b>Hecho</b>.",
            "Como nada queda escrito, las notas no guardan el historial de preguntas.",
            "Te sugerimos dejarla desactivada, incluso en una misma mesa: toca el micrófono y pregunta en voz alta. Todos te oyen y la app convierte lo que dices en texto que todos los jugadores ven en el historial de preguntas.",
            "Todos en la sala necesitan la versión más reciente de la app. Si alguien tiene una versión anterior, la regla aparece desactivada hasta que actualice la app.",
          ],
        },
        {
          id: 'spy-sketch',
          q: '¿Cómo funciona Spy Sketch?',
          a: [
            'Los jugadores dibujan por turnos en una pizarra compartida. Los locales insinúan la palabra sin dibujarla del todo. Los espías añaden algo vago que pueda encajar.',
            'Cuando todos han tenido su turno, se abren las votaciones y el intento del espía. Las rondas siguen hasta que termina la partida.',
            'Los dibujos de Spy Sketch no se describen en voz alta, así que un lector de pantalla (VoiceOver, TalkBack) no puede seguir el dibujo.',
          ],
        },
        {
          id: 'drawings-checked',
          q: "¿Se revisan los dibujos de Spy Sketch?",
          a: [
            "Sí, por seguridad. En las mesas de Jugar en línea y en las Noches de Juegos, los turnos de dibujo terminados pueden revisarse automáticamente con OpenAI para detectar lo que rompa las <rules>normas de la comunidad</rules>.",
            "La primera vez, la app muestra <b>Revisamos los dibujos</b>. Toca <b>Acepto</b> para jugar Spy Sketch en línea. Mientras no aceptes, Spy Talk sigue disponible.",
            "En una sala privada, un dibujo se revisa si alguien lo reporta, y también cuando puede verlo un jugador menor de 18 años o uno que no nos ha dicho su edad.",
            "OpenAI recibe una imagen del turno y la palabra de la ronda, nunca tu nombre ni tus mensajes. Un turno que rompe las normas se quita y puede llevar a una advertencia, una pausa o el bloqueo de la cuenta. Una persona revisa cada decisión permanente, y puedes apelar.",
            "Todos los detalles: <drawchecks>Drawing Checks, en la Política de privacidad</drawchecks>.",
          ],
        },
        {
          id: 'new-page',
          q: "¿Qué es Hoja nueva en Spy Sketch?",
          a: [
            "Una pausa de dibujo detiene el juego hasta 20 segundos: mira el dibujo, chatea y revisa tus notas. Todos los que siguen en juego votan <b>Seguir en esta</b> u <b>Hoja nueva</b>. La pausa termina antes si ya votaron todos.",
            "La hoja se queda solo si más de la mitad de los jugadores que siguen en juego votan por seguir en ella. Un empate, o si nadie vota, significa hoja en blanco. Las hojas anteriores se pueden seguir viendo.",
            "<b>Jugar en línea:</b> una hoja extra como máximo. La pausa llega cada 2 rondas en una mesa de 4, y después de cada ronda en una mesa de 8. Si la mesa se queda con la hoja, la siguiente pausa llega las mismas rondas después.",
            "<b>Salas privadas y Noches de Juegos:</b> el anfitrión (o la noche) elige <b>Hoja nueva</b> en las reglas: No, 2, 3 o 4 hojas, o Sin límite. Una sala nueva empieza con 2, como recomendamos. La pausa llega cuando la hoja se llena.",
            "En los últimos 45 segundos de la partida no empieza ninguna pausa.",
          ],
        },
        {
          id: 'voting',
          q: '¿Cómo funcionan las votaciones?',
          a: [
            'Abre <b>Acciones</b> y toca <b>Votar</b>. Cada uno elige a un jugador o <b>Abstener</b> y confirma. Un voto confirmado no se puede cambiar.',
            '<b>Mayoría:</b> alguien queda eliminado solo si vota en su contra más de la mitad de quienes siguen en juego.',
            '<b>Pluralidad:</b> basta con tener más votos que nadie, siempre que superen a las abstenciones y a quienes no votan.',
            'Un empate en el primer puesto no elimina a nadie, y siempre hacen falta al menos 2 votos.',
            'En las mesas de Jugar en línea, cada jugador puede convocar una votación y nombra a quien acusa. Cuando una votación atrapa a un espía, todos los que gastaron la suya la recuperan.',
            'En las mesas de 8 jugadores, sale quien reciba más votos, hasta que queden 4 jugadores; entonces hace falta mayoría. No votar cuenta como abstenerse.',
            'En los resultados, una franja negra dice quién convocó la votación: «Convocada por …». Una votación final muestra en su lugar una cinta roja de <b>Votación final</b>.',
          ],
        },
        {
          id: 'spy-guess',
          q: '¿Cómo funciona el intento del espía?',
          a: [
            'Un espía abre <b>Acciones</b> y toca <b>Resolver</b>. Tiene 60 segundos para elegir el secreto de una lista de unos 30.',
            'Si acierta, ganan todos los espías. Si falla, o se le acaba el tiempo, ese espía queda fuera. Si era el último, ganan los locales.',
            'Todos ven quién está intentando adivinar, así que te delata.',
            "Adivinas por tu cuenta: tu chat queda cerrado hasta que confirmes.",
            'Con <b>Un solo intento</b> activado (en salas privadas y Noches de Juegos que lo activan), el equipo espía tiene un único intento: si falla, pierde todo el equipo.',
          ],
        },
        {
          id: 'winning',
          q: '¿Cómo gana cada equipo?',
          a: [
            'Los <b>locales</b> ganan si eliminan a todos los espías, o si el último espía falla al adivinar.',
            'Los <b>espías</b> ganan si aciertan, si se acaba el tiempo de la partida o si tras una votación quedan tantos espías como locales.',
            'Salir cuenta como ser eliminado por votación: si sale el último espía, ganan los locales; si salen demasiados locales, ganan los espías. Antes de que terminen las preguntas (en Spy Sketch, en la primera ronda), esa partida muestra «Sin resultado» y no cuenta.',
            "<b>Votación final:</b> si queda exactamente un espía, todos votan una vez más cuando se acaba el tiempo, cuando a nadie le quedan votaciones por convocar o cuando se acaba la última oportunidad de convocar una. Si atrapan al espía, ganan los locales. Está activa en Jugar en línea y es un ajuste en las salas privadas. Una mesa de Jugar en línea o una Noche de Juegos también puede jugarla con dos espías: si atrapan a cualquiera de los dos, ganan los locales.",
            "Los resultados de una votación final se abren bajo una cinta roja de <b>Votación final</b> que dice por qué: «El reloj ha hablado», «No quedan votaciones por convocar» o «Se acabó la última oportunidad».",
            "<b>Informante</b> (salas privadas y Noches de Juegos que lo activan, con 2 espías o más y 6 jugadores o más): la carta de un local nombra a un espía. Cuando los locales ganan por votación o porque el último espía falla su intento, los espías, también los atrapados, tienen 30 segundos para nombrar al informante y robar la victoria. No pasa tras un fallo con <b>Un solo intento</b> ni si el último espía se va.",
          ],
        },
        {
          id: 'special-rules',
          q: "¿Qué reglas especiales puede usar una sala privada o una Noche de Juegos?",
          a: [
            "<b>Votaciones por partida:</b> cada jugador puede convocar 1, 2 o 3 votaciones por partida, o sin límite (una sala nueva empieza en 1). Cuando una votación atrapa a un espía, todos los que usaron una la recuperan.",
            "Si a nadie que siga en juego le quedan votaciones, el reloj de la partida salta a sus últimos 5 segundos. Si quedan tantas votaciones como espías en juego, o menos, hay una última oportunidad de 15 segundos para convocar una. Si nadie convoca una a tiempo, sigue una votación final si está activa (mira cómo gana cada bando, arriba); si no, ganan los espías.",
            "<b>Rastro de papel:</b> cuando expulsan a un espía por votación, todos ven cómo votó durante toda la partida. Si los roles no se revelan al expulsar, espera hasta el final de la partida.",
            "<b>Un solo intento</b> e <b>Informante</b>: están arriba, en el intento del espía y en cómo gana cada equipo.",
            "<b>Hablar en voz alta</b> tiene su propia respuesta arriba. En la app, <b>Cómo jugar</b> › <b>Funciones y ajustes</b> tiene una demo corta de cada regla.",
          ],
        },
      ],
    },
    {
      id: 'ways-to-play',
      title: 'Formas de jugar',
      items: [
        {
          id: 'play-online',
          q: '¿Qué es Jugar en línea?',
          a: [
            '<b>Buscar partida</b> te sienta en una mesa de 4 u 8 con otros jugadores. Todas las mesas siguen las mismas reglas estándar, sin anfitrión.',
            'Quienes no te conocen ven el color de tu agente, como Agente Turquesa, nunca tu nombre.',
            'Necesitas una cuenta guardada (con el correo confirmado, o con Apple o Google) y tener 13 años o más.',
            'Salir de una partida después del reparto de roles significa una pausa breve en Jugar en línea.',
          ],
        },
        {
          id: 'private-rooms',
          q: '¿Cómo funcionan las salas privadas?',
          a: [
            'Las salas que crean los jugadores son privadas, para gente que conoces. Tus amigos entran con el código de la sala, el código QR o el enlace de invitación. Los invitados sin cuenta también pueden entrar.',
            'El anfitrión pone las reglas: juego, espías, tiempos, votación y paquetes. El máximo de jugadores llega a 21, y <b>Cerrar con llave</b> impide que entre gente nueva.',
            'Todos juegan los paquetes que tiene desbloqueados el anfitrión.',
          ],
        },
        {
          id: 'game-night',
          q: '¿Qué es la Noche de Juegos?',
          a: [
            'Partidas en línea que organizamos, las noches que anunciamos en la app, normalmente de 8 a 10 PM, hora del Este de EE. UU. Toca <b>Jugar ya</b> en la tarjeta de la Noche de Juegos del inicio.',
            o.gnRewards
              ? 'Cada noche tiene sus propios paquetes y ajustes: la (i) junto a la noche los muestra. <b>Premios</b>, en la tarjeta, muestra lo que ganas: Intel de Noche de Juegos y los títulos ★.'
              : o.gnRewardsRules
                ? 'Cada noche tiene sus propios paquetes y ajustes: la (i) junto a la noche los muestra.'
                : 'Cada noche tiene sus propios paquetes, ajustes y títulos. La (i) junto a la noche muestra sus paquetes y ajustes, y <b>Premios</b>, en la tarjeta, sus títulos.',
            'Es gratis, y nada de lo que compres mejora tus posibilidades. Las reglas completas: <gnr>reglas de la Noche de Juegos</gnr> (en inglés).',
          ],
        },
        ...(o.gnWeekly
          ? [
            {
              id: 'game-night-weekly',
              q: '¿Cuándo es la Noche de Juegos?',
              a: [
                'Una vez por semana: el viernes, y la misma noche otra vez el sábado, normalmente de 8 a 10 PM, hora del Este de EE. UU.',
                'Ven a cualquiera de las dos noches, o juega en ambas.',
                'Anunciamos cada noche en la app, en la tarjeta de la Noche de Juegos del inicio.',
              ],
            },
            ]
          : []),
        ...(o.gnRewards
          ? [
            {
              id: 'game-night-rewards',
              q: '¿Qué gano en la Noche de Juegos?',
              a: [
                '<b>Intel de Noche de Juegos</b> por cada partida que terminas: 500 por una victoria, 200 por una derrota o un empate. El final de la partida muestra lo que ganaste.',
                "No hay Intel de Noche de Juegos si sales antes del final, te sacan de la mesa o no participas, si la partida empieza después del cierre de la Noche de Juegos (una partida que empieza a tiempo y termina más tarde sí paga), si nuestras comprobaciones de juego limpio marcan la partida, o en una mesa con spybots. Una partida que termina antes porque alguien se fue no le paga a nadie.",
                '<b>Títulos ★</b> que van sumando: <b>★ Operativo</b> por cada partida de la Noche de Juegos que terminas, <b>★ Héroe Local</b> por cada victoria como local, <b>★ Maestro Espía</b> por cada victoria como espía y <b>★ Agente Doble</b> por cada noche en que ganas en los dos bandos. Llévalos con su número, como ★ Operativo ×12.',
                'El Intel de Noche de Juegos y los títulos ★ son solo tuyos: no se pueden intercambiar, y la membresía no les suma nada. Gasta el Intel en intercepciones de Noche de Juegos.',
                ...(o.launch
                  ? []
                  : ['Los títulos de las Noches de Juegos de la beta pasaron a sumar en estos títulos. En el reinicio antes del lanzamiento, el Intel de Noche de Juegos que ganaste vuelve completo, aunque lo hayas gastado, y tus títulos ★ se quedan. Las intercepciones de Noche de Juegos y sus objetos se reinician como todo lo demás.']),
              ],
            },
            ]
          : []),
        {
          id: 'practice-game',
          q: "¿Qué son el tutorial y las partidas de práctica?",
          a: [
            "En <b>Cómo jugar</b>, elige Spy Talk o Spy Sketch. <b>Paso 1, Tutorial:</b> una partida guiada de 3 minutos contra agentes de IA. Juégala como local o como espía: superar cualquiera de las dos cuenta.",
            o.practiceMembers ? "<b>Paso 2, Partidas de práctica</b> (para miembros): partidas completas de 5 a 9 minutos contra agentes de IA, con nota de la A a la F. Se desbloquean al superar el tutorial de ese juego, y puedes seguir donde la dejaste." : "<b>Paso 2, Partidas de práctica:</b> partidas completas de 5 a 9 minutos contra agentes de IA, con nota de la A a la F. Se desbloquean al superar el tutorial de ese juego, y puedes seguir donde la dejaste.",
            "Cada juego tiene cuatro: como local o como espía, en una mesa de 4 o de 8. Una A en las ocho te da el título <b>Puras A</b> (solo cuentas guardadas).",
            o.launch ? "Superar el tutorial de un juego abre Jugar en línea para ese juego (con una cuenta guardada). Las partidas de práctica no hacen falta. La Noche de Juegos nunca lo pide." : "Hoy no necesitas ninguno de los dos para jugar en línea. La Noche de Juegos nunca los pide.",
          ],
        },
        ...(o.practiceMembers
          ? [
            {
              id: 'practice-members',
              q: '¿Quién puede jugar partidas de práctica?',
              a: [
                'Las partidas de práctica son para miembros: hasta 5 al día. El día empieza a medianoche UTC. Después de tus 5, puedes retomar una partida guardada.',
                ...(o.practiceAi
                  ? ['Los miembros reciben comentarios de IA sobre cada frase que escriben, mientras juegan, y una nota de la A a la F en cada partida. Los comentarios de IA son para jugadores de 16 años o más que tocan <b>Probar</b> cuando la app lo pregunta; para los demás, puntúa el teléfono. Para dejar de recibirlos, desactiva <b>Puntuar mis frases de práctica con IA</b> en Ajustes.']
                  : []),
                'Los tutoriales siguen siendo gratis para todos, y superar uno sigue contando para Jugar en línea.',
              ],
            },
            ]
          : []),
        {
          id: 'languages',
          q: '¿Puedo jugar con gente que habla otros idiomas?',
          a: [
            'SpySocial está en 10 idiomas: inglés, español, ruso, chino simplificado, hindi, árabe, francés, bengalí, portugués de Brasil e indonesio.',
            ...(o.onePool
              ? [
                  'Cada uno ve la partida en su propio idioma, el secreto y las pistas incluidos, así que en una misma mesa se pueden mezclar idiomas.',
                  o.autoTranslation
                    ? 'Los mensajes en otro idioma se traducen al tuyo automáticamente. Para traducir solo al tocar, desactiva <b>Traducir mensajes automáticamente</b> en Ajustes.'
                    : 'Toca <b>Traducir</b> en un mensaje para leerlo en tu idioma.',
                ]
              : ['En una sala privada, el anfitrión elige el idioma de la partida para el secreto y las pistas.', ...(o.autoTranslation ? ['Los mensajes en otro idioma se traducen al tuyo automáticamente. Para traducir solo al tocar, desactiva <b>Traducir mensajes automáticamente</b> en Ajustes.'] : [])]),
            ...(o.autoTranslation ? ['Jugar en línea puede ofrecerte añadir tu idioma al traductor propio de tu teléfono. Es opcional, y mantiene traducidas las líneas en inglés del chat cuando nuestro traductor está ocupado.'] : []),
          ],
        },
      ],
    },
    {
      id: 'in-game',
      title: 'Durante la partida',
      items: [
        ...(o.roleReveal
          ? [
            {
              id: 'role-reveal',
              q: "¿Cómo funciona la revelación de roles?",
              a: [
                "Las partidas en línea tienen revelación de roles: Jugar en línea, las Noches de Juegos y las salas privadas cuyo anfitrión eligió <b>En línea</b>. Toca tu carta: se apagan las luces y un reflector muestra tu rol.",
                "Los <b>locales</b> ven el secreto y cuántos espías hay entre ellos: en Spy Talk, el lugar y su imagen (todos los lugares de nuestros paquetes tienen una); en Spy Sketch, solo la palabra.",
                "Los <b>espías</b> reciben una carta oscura. En Espía Mafia, los demás espías aparecen a tu lado, con su nombre y una etiqueta roja de «Espía». En Clásico, los espías no se conocen, así que los demás aparecen como <b>Desconocido</b>.",
                "Tu carta se queda abajo en la pantalla toda la partida, con la misma cara: la de un local conserva la imagen del lugar, y la de un espía en Espía Mafia muestra en rojo los nombres de los demás espías.",
                "En Espía Mafia con más de un espía, toca <b>CANAL DE ESPÍAS</b> para chatear en privado con los otros espías: en tu carta antes de empezar, luego en la barra de arriba, o junto al chat en una votación. Basta un toque; un número muestra los mensajes nuevos, y un mensaje de otro espía dice «… intenta contactarte».",
                "La etiqueta roja sigue en las fotos de los otros espías toda la partida. Los locales nunca ven las etiquetas, el botón ni el chat.",
                "¿En una llamada de voz? Activa <b>Mismo sonido para todos los roles</b> (Ajustes, Sonido y música) para que tu micrófono no capte el sonido de revelación de un espía. La app solo te lo pregunta (<b>¿Juegas en una llamada?</b>) en una sala privada <b>En línea</b>.",
              ],
            },
            {
              id: 'poker-face',
              q: "En línea o En persona: ¿qué es Cara de póker?",
              a: [
                "Cuando un anfitrión crea una sala privada, la app pregunta <b>¿Dónde juegan?</b> Elige <b>En línea</b> si cada quien juega en su teléfono, donde sea, también en una llamada: hay revelación completa de roles y chat de espías de un toque. Elige <b>En persona</b> si están alrededor de una mesa: se activa <b>Cara de póker</b>.",
                "Con Cara de póker, todas las cartas de rol se ven igual: sin carta oscura de espía, sin etiquetas rojas de «Espía», y nada se ilumina cuando llega un mensaje de espías. Los espías abren su chat manteniendo presionada su carta. En una votación, mantienen presionado el botón del chat.",
                "El porqué: en una misma mesa, una mirada al teléfono de al lado podría delatar un rol. Cara de póker evita descuidos, no trampas. La desventaja: cuesta más reconocer a los otros espías y chatear con ellos.",
                "El anfitrión puede cambiarla entre partidas en las <b>Reglas</b> del lobby, y quien entra ve <b>«Cara de póker» está activada</b>. En las Noches de Juegos, se define para cada noche. No existe en Jugar en línea.",
              ],
            },
            ]
          : []),
        {
          id: 'voice-chat',
          q: "¿Hay chat de voz? ¿Para qué sirve el micrófono?",
          a: [
            "SpySocial no tiene chat de voz: nadie te oye a través de la app. El micrófono convierte lo que dices en texto, para que no tengas que escribir.",
            "Toca el micrófono, habla y vuelve a tocarlo para terminar. Funciona en los chats de la partida y de la sala de espera, y en las preguntas de Spy Talk.",
            "Lo hace el reconocimiento de voz de tu teléfono (o de tu navegador). Nosotros recibimos solo el texto, nunca el audio. Detalles: <privacy>Política de privacidad</privacy>.",
            "Para hablar mientras juegas, usa una llamada de voz aparte, por ejemplo en Discord o por teléfono.",
            ...(o.roleReveal ? ["En una llamada, el anfitrión elige <b>En línea</b> en <b>¿Dónde juegan?</b>, y cada uno puede activar <b>Mismo sonido para todos los roles</b> (Ajustes, Sonido y música) para que ningún micrófono capte el sonido de revelación de un espía."] : []),
            "En una sala privada de Spy Talk, <b>Hablar en voz alta</b> permite preguntar y responder de viva voz, sin escribir.",
          ],
        },
        {
          id: 'wax-seal',
          q: '¿Qué es el Sello de Cera?',
          a: [
            'El sello arriba a la izquierda de la pantalla de juego guarda <b>Salir</b> e <b>Info</b>, plegados para que nadie salga sin querer. <b>Chat</b> y <b>Notas</b> tienen su propio botón arriba a la derecha y se abren con un toque. Un número en Chat indica mensajes nuevos.',
            'El sello está en todas las pantallas de la partida: la votación y sus resultados, el intento del espía y el final de la partida.',
            'En la votación, el intento del espía y el final de la partida, <b>Info</b> explica la pantalla en la que estás.',
            'Las partidas de práctica también tienen el sello, con <b>Terminar</b> e <b>Info</b> en la votación, el intento y el final. La partida espera mientras Info está abierto.',
            'Toca la foto de un jugador para preguntarle en el chat. Desliza un mensaje para responderlo.',
            'Mentir y farolear es parte del juego. Decir el secreto directamente, no.',
          ],
        },
        {
          id: 'notes',
          q: '¿Cómo funcionan las notas?',
          a: [
            'Mantén pulsada la foto de un jugador para abrir tus notas sobre él.',
            'El <b>Tablero</b> ordena a los jugadores en Sospecho, No sé y Confío. En Spy Talk, <b>Historial</b> muestra lo que preguntó y respondió cada jugador.',
            'Los espías tienen un tablero de indicios: <b>Mis indicios</b>, con Quizá, Es y No es.',
            'Tus notas son privadas, se quedan en tu teléfono y se borran después de la pantalla final.',
          ],
        },
        {
          id: 'leave-rejoin',
          q: '¿Puedo salir de una partida y volver?',
          a: [
            'El botón <b>Salir</b> ofrece <b>Salir un momento</b>, que guarda tu lugar (la tarjeta del inicio tiene <b>Volver</b>), o <b>Salir definitivamente</b>: no puedes volver a esa partida y, si cuenta, es una derrota para ti.',
            'El anfitrión puede tocar <b>Terminar la partida para todos</b>. Entonces no gana nadie.',
            'En las mesas de Jugar en línea, salir después del reparto significa una pausa breve en Jugar en línea.',
          ],
        },
      ],
    },
    {
      id: 'friends',
      title: 'Amigos y grupos',
      items: [
        {
          id: 'add-friends',
          q: '¿Cómo añado amigos?',
          a: [
            "<b>En persona:</b> muestra tu <b>código de amigo</b> y deja que lo escanee en SpySocial. Cada 5 minutos sale un código nuevo, que sirve para 3 escaneos como máximo, así que una captura de pantalla deja de funcionar enseguida.",
            '<b>Desde una partida privada</b> que jugaron juntos en las últimas 24 horas.',
            '<b>Solo adultos:</b> desde una mesa pública, o por nombre de usuario exacto, si lo permiten.',
            'La amistad es mutua. Puedes quitar o bloquear a un amigo cuando quieras; no se le avisa. No hay mensajes privados.',
          ],
        },
        {
          id: 'parties',
          q: '¿Qué es un grupo?',
          a: [
            'Un líder y sus amigos que juegan juntos, hasta 21 personas en total. Para empezar hace falta una membresía. Si el líder se va, el puesto pasa primero a alguien con membresía.',
            ...(o.partyLeaderLapse ? ['Si la membresía del líder termina, el grupo se cierra para todos; el puesto no pasa a nadie. La partida en curso sigue hasta el final y, después, cada uno busca por su cuenta.'] : []),
            'En las mesas de Jugar en línea y en la Noche de Juegos, un grupo ocupa como mucho media mesa, y todos lo ven: hasta 2 en una mesa de 4, hasta 4 en una mesa de 8.',
            'En una mesa de 12 de la Noche de Juegos, hasta 6. Los miembros del grupo que buscan partida por su cuenta también cuentan: entre todos, nunca más de media mesa.',
            'Para jugar en la misma mesa, busca desde el grupo: <b>Jugar en línea</b> por tu cuenta es una búsqueda individual. Después de una partida de Jugar en línea, <b>Volver a tu grupo</b> te lleva de vuelta a él.',
            'Si dejas una partida antes de tiempo, recibes la pausa habitual de Jugar en línea, y tu grupo no puede buscar mesa hasta que termine. Mientras tienes asiento en una partida, sigues en el grupo aunque tu teléfono se suspenda.',
            'Cualquier grupo puede abrir una sala privada, y un grupo demasiado grande para una mesa juega ahí.',
            'El chat del grupo sigue las mismas reglas que todo el chat. Para reportar un mensaje, mantenlo pulsado.',
          ],
        },
        {
          id: 'privacy-friends',
          q: '¿Quién puede ver que estoy en línea o invitarme?',
          a: [
            'Tú decides en <b>Privacidad y amigos</b>: quién puede añadirte, si tus amigos te ven en línea y quién puede invitarte a salas y grupos.',
            'Tus amigos solo ven En línea, Jugando en línea, En una sala privada o En la Noche de Juegos, nunca qué sala. Nadie puede ver tu lista de amigos.',
            'Los adultos pueden tener un perfil público y seguidores. Los menores de 18, no.',
          ],
        },
      ],
    },
    {
      id: 'trading',
      title: 'Intercambios',
      items: [
        {
          id: 'who-can-trade',
          q: '¿Quién puede intercambiar, y qué?',
          a: [
            'Intercambias con amigos, dentro de la app. Necesitas una cuenta de al menos 7 días, el correo confirmado y 3 partidas que cuenten (partidas terminadas que suman a tus estadísticas, con al menos otras 2 cuentas guardadas en otros teléfonos).',
            "Los 7 días cuentan desde que se guardó la cuenta: el tiempo como invitado no cuenta.",
            ...(o.launch ? [] : ['Durante la prueba beta, hasta el 7 de diciembre, no se aplican las reglas de antigüedad de la cuenta, partidas contadas ni dispositivo nuevo: cualquier tester puede intercambiar en cuanto confirme su correo.']),
            ...(o.launch ? ["Los testers que jugaron 3 partidas que cuentan durante la prueba beta no necesitan otras 3."] : ["Los testers que jueguen 3 partidas que cuenten durante la prueba beta no necesitarán otras 3 después del lanzamiento."]),
            'Cada lado ofrece hasta 10 objetos, y los dos confirman antes de que se haga. Los intercambios grandes piden un código que te enviamos por correo.',
            ...(o.interceptsInTrades ? ['Los adultos también pueden poner intercepciones sin abrir en un intercambio: eligen cuántas de cada nivel. Cada una cuenta como uno de los 10.'] : []),
            ...(o.interceptsInTrades && !o.launch ? ['Durante la beta, hasta el 7 de diciembre, cualquier intercepción sin abrir puede entrar en un intercambio, sea cual sea su origen. De todos modos, las intercepciones empiezan de cero con el lanzamiento.'] : []),
            'Lo que pones en un intercambio abierto queda reservado para él: no puede ir a otro intercambio ni al Mercado Negro al mismo tiempo. Si el Intel de un intercambio se gasta antes de que se haga, aparece un aviso en ese lado y el intercambio no puede hacerse hasta que se baje la cantidad.',
            'La app marca qué objetos se pueden intercambiar. La membresía y lo que incluye, las recompensas de nivel y los objetos de los juegos arcade nunca se pueden.' + (o.launch ? (o.gnRewardsRules ? " Tampoco lo que venga de un código ni lo que te demos nosotros o nuestro equipo: se queda en tu cuenta. El Intel nunca queda ligado a una cuenta, venga de donde venga." : " Tampoco lo que venga de un código ni lo que te demos nosotros o nuestro equipo, incluida una Elección del desarrollador: se queda en tu cuenta. El Intel nunca queda ligado a una cuenta, venga de donde venga.") : ''),
            'El Intel solo se puede intercambiar entre adultos.',
            ...(o.launch ? [] : ["Durante la prueba beta, hasta el 7 de diciembre, los testers adultos también intercambian Intel." + (o.intelZero ? " Justo antes del lanzamiento, el Intel de cada cuenta pasa a 0, incluido el que se ganó en la prueba." : " El 7 de diciembre se devuelve todo el Intel intercambiado: quien lo dio lo recupera y cada uno se queda solo con el Intel que ganó."), "Desde el 7 de diciembre, las intercepciones de un código o un regalo, lo que salga de ellas y lo que consigas con ellas en un Canje se quedan en tu cuenta: puedes usarlas, pero no intercambiarlas ni venderlas."]),
            'Comprar o vender objetos, Intel o cuentas por dinero real va contra las reglas.',
          ],
        },
        {
          id: 'trade-protection',
          q: '¿Qué es la protección de 7 días? ¿Puedo deshacer un intercambio?',
          a: [
            'Lo que recibes en un intercambio queda protegido 7 días. Puedes usar un objeto enseguida, pero aún no puedes intercambiarlo, triturarlo ni canjearlo, y el Intel recibido aún no se puede gastar.',
            ...(o.interceptsInTrades ? ['Una intercepción sin abrir que recibes sigue sellada esos 7 días: aún no puedes abrirla, intercambiarla ni ponerla a la venta.'] : []),
            'En esos 7 días puedes revertir tus intercambios, una vez cada 90 días. Se revierten todos tus intercambios protegidos y tus intercambios se pausan 30 días.',
            "La reversión también deshace tus compras y ventas en Rarezas que siguen en sus 3 días de protección.",
            'Pasados 7 días, el intercambio es definitivo. También podemos revertirlo por robo de cuenta o fraude.',
          ],
        },
        {
          id: 'trade-deleted-account',
          q: '¿Y si alguien borra su cuenta después de un intercambio?',
          a: [
            'Si el otro jugador borra su cuenta dentro de los 7 días, el intercambio se deshace: recuperas lo que diste y se retira lo que recibiste de él.',
            'Si borras la tuya dentro de los 7 días, lo que recibiste vuelve a quien te lo dio.',
          ],
        },
        {
          id: 'trading-under-18',
          q: '¿Los menores de 18 pueden intercambiar?',
          a: [
            'Sí, con límites: solo objetos por objetos, y solo con amigos que añadieron en persona con un código de amigo.',
            'Sin regalos, sin Intel, sin intercepciones sin abrir y sin comprar ni vender en el Mercado Negro.',
            'En iPhone y iPad, los menores de 18 no pueden intercambiar hasta que salga una versión de la app que pida el consentimiento de un padre o madre a través de Apple.',
          ],
        },
        {
          id: 'trading-paused',
          q: '¿Por qué están pausados mis intercambios?',
          a: [
            'Los intercambios se pausan un tiempo tras un cambio de correo o de forma de inicio de sesión, tras iniciar sesión en un dispositivo nuevo, tras revertir tus intercambios (30 días) o cuando los bloqueas tú.',
            'La pausa por un dispositivo nuevo dura 24 horas; la de un cambio de correo o de inicio de sesión, 3 días.',
            ...(o.launch ? [] : ['Durante la prueba beta, hasta el 7 de diciembre, iniciar sesión en un dispositivo nuevo o cambiar el correo o el método de inicio de sesión no pausa los intercambios.']),
            'Así se protegen tus objetos si alguien más entra en tu cuenta.',
            'También podemos pausar nosotros los intercambios de una cuenta, para protegerla o mientras revisamos un posible fraude.',
            "Una revisión de juego limpio pausa los intercambios y el Mercado Negro mientras dura. Con la reputación Bloqueada, los intercambios, los regalos y el Mercado Negro siguen cerrados hasta que se recupere: mira <b>Reputación</b> en Ajustes.",
            'Cualquiera de estas pausas, también tu propio bloqueo, cierra al instante tus ofertas y anuncios abiertos en el Mercado Negro. Lo mismo hacen un baneo, una suspensión o una revisión de juego limpio. Los objetos vuelven a ti, el Intel de una oferta de compra espera a que lo recojas y las ofertas de otros jugadores en tus anuncios vuelven a ellos. Nada se reabre cuando termina: tienes que volver a publicar.',
            'Si cerramos la sesión de tu cuenta en todos los dispositivos sin pausar los intercambios, tus ofertas y anuncios del Mercado Negro de antes de eso muestran <b>En espera</b> y no se completan. Cuando tu nuevo inicio de sesión pueda intercambiar, toca <b>Volver a poner</b> en cada uno que sea tuyo, o detenlo.',
          ],
        },
      ],
    },
    {
      id: 'black-market',
      title: 'Mercado Negro y Rarezas',
      items: [
        {
          id: 'what-is-black-market',
          q: '¿Qué son el Mercado Negro y las Rarezas?',
          a: [
            'El Mercado Negro, en la <b>Bóveda</b>, es donde los adultos compran y venden objetos intercambiables por Intel, nunca por dinero.',
            '<b>Objetos:</b> haz una oferta de compra o de venta al precio que quieras. Se cruza con el mejor precio del otro lado.',
            '<b>Rarezas:</b> cada objeto Único se publica por separado, con un precio, y quien vende puede aceptar ofertas más bajas.',
            'Ahí también se venden intercepciones sin abrir, por nivel. Nadie ve quién compra ni quién vende.',
          ],
        },
        {
          id: 'black-market-who',
          q: '¿Quién puede usar el Mercado Negro?',
          a: [
            'Los adultos que pueden intercambiar: una cuenta de al menos 7 días, el correo confirmado, 3 partidas que cuenten y sin pausa de intercambios.',
            "Los 7 días cuentan desde que se guardó la cuenta: el tiempo como invitado no cuenta.",
            ...(o.launch ? [] : ['Durante la prueba beta, hasta el 7 de diciembre, aquí tampoco se aplican las reglas de antigüedad de la cuenta ni de partidas contadas.']),
            'Los menores de 18 pueden mirar, pero no comprar, vender ni hacer ofertas.',
            ...(o.launch ? [] : [o.testerMarket ? 'Beta 2: del 9 al 16 de noviembre, los adultos que pueden intercambiar compran y venden aquí de verdad. Todas las ventas hechas durante la prueba se deshacen el 16 de noviembre: quien compró recupera el Intel que pagó y quien vendió devuelve lo que recibió.' : 'El Intel empieza a moverse ahí con el lanzamiento de la 2.2, el 8 de diciembre. Hasta entonces, puedes mirar.']),
          ],
        },
        {
          id: 'black-market-fees',
          q: '¿Qué comisiones, límites y precio mínimo hay?',
          a: [
            'Cada objeto vendido paga una comisión del 2 % (como mínimo 1 Intel y como mucho 5000), que sale del juego.',
            'Ninguna oferta puede bajar del precio mínimo de un objeto: lo que da al triturar una copia. Para una intercepción sin abrir, es lo que da de media su nivel.',
            'Los miembros pueden tener 8 ofertas abiertas a la vez; los demás, 4. Mientras una oferta está abierta, su Intel o sus objetos quedan reservados (puedes seguir usando los objetos).',
            "Un precio puede llegar a 1.000.000 de Intel por unidad, y una oferta puede ser de hasta 1.000 copias.",
            "En Rarezas puedes tener hasta 25 objetos Únicos a la venta a la vez y hasta 20 ofertas abiertas en anuncios de otros jugadores.",
            'Puedes retirar una oferta cuando quieras y recoger lo que quede.',
          ],
        },
        ...(o.rarefindsOffers
          ? [
              {
                id: 'rare-finds-offers',
                q: "¿Cómo funcionan las ofertas en Rarezas?",
                a: [
                  ...(o.appU61 ? ["El vendedor elige cuánto por debajo del precio puedes ofrecer: hasta un 5 %, 10 % o 15 %, o ninguna oferta."] : []),
                  "El Intel de tu oferta queda reservado mientras espera. Si el vendedor no responde en 24 horas, la oferta termina y el Intel vuelve.",
                  "Puedes retirar una oferta cuando lleve 30 minutos esperando.",
                  ...(o.appU61 ? ["El vendedor puede aceptar, rechazar o hacer una contraoferta con un precio entre tu oferta y el suyo. Una contraoferta no reserva tu Intel: compra a ese precio, recházala o haz otra contraoferta."] : []),
                  "Cuando un vendedor rechaza una oferta, nadie puede volver a ofrecer tan poco en ese anuncio: la oferta mínima sube.",
                  ...(o.appU61 ? ["El vendedor ve la nueva oferta mínima. Si los rechazos la suben hasta el precio, el anuncio ya no acepta ofertas: solo Comprar ya."] : []),
                  "Si rechazan muchas de tus ofertas y casi ninguna se acepta, no podrás hacer ofertas nuevas durante un máximo de 3 días.",
                  ...(o.rarefindsOfferPush ? ["Con las notificaciones del Mercado Negro activadas, recibes una cuando el vendedor hace una contraoferta y cuando tu oferta se rechaza o termina."] : []),
                ],
              },
            ]
          : []),
        {
          id: 'black-market-protection',
          q: '¿Las ventas del Mercado Negro están protegidas?',
          a: [
            'Una venta en Objetos es definitiva al instante.',
            'Un Único comprado en Rarezas queda protegido 3 días: no se puede intercambiar, publicar, triturar ni canjear, y el Intel de quien vende espera. En ese tiempo la venta se puede revertir, como un intercambio.',
            'Si quien compra o quien vende borra su cuenta en esos 3 días, la venta se deshace: el comprador recupera el Intel, o el vendedor recupera el Único.',
          ],
        },
        {
          id: 'archive-holder',
          q: "¿Pueden otros ver que tengo un Único?",
          a: [
            "Cada Único tiene su propia página en archive.spysocial.app. Su dueño actual aparece como «En manos de @usuario», con un enlace a su perfil, solo si es adulto y tiene el perfil público.",
            "Para todos los demás, incluidos los menores de 18, dice «Dueño privado».",
            "Para ocultar tu nombre, haz privado tu perfil en <b>Privacidad y amigos</b>. Desaparece del Archivo en más o menos un minuto.",
          ],
        },
      ],
    },
    {
      id: 'rewards',
      title: 'Intercepciones e Intel',
      items: [
        {
          id: 'intercepts',
          q: '¿Qué son las intercepciones?',
          a: [
            'Recompensas selladas que ganas jugando. Cada una se abre y da un objeto cosmético al azar, como un estilo para tu agente o una celebración.',
            'Nunca se venden por dinero, y la membresía no te da más ni mejores probabilidades.',
            o.launch ? 'Antes de abrir o comprar una, la app muestra las probabilidades exactas en <b>Probabilidades</b>.' : 'Antes de abrir una, la app muestra las probabilidades exactas en <b>Probabilidades</b>.',
          ],
        },
        {
          id: 'intercept-tiers',
          q: '¿Qué niveles tienen las intercepciones?',
          a: [
            'Cinco niveles, de menor a mayor: <b>Restringido</b>, <b>Confidencial</b>, <b>Secreto</b>, <b>Alto secreto</b> y <b>Enigma</b>.',
            'El nivel se fija al ganarla. Cuanto más alto, mejores probabilidades.',
            'Un <b>Único</b> es una copia con un color y un número que ninguna otra copia tiene.',
          ],
        },
        {
          id: 'earn-intercepts',
          q: '¿Cómo gano intercepciones?',
          a: [
            '<b>Victorias:</b> cada 10 victorias en Jugar en línea te dan 5 intercepciones, una de ellas de nivel Secreto o mejor.',
            "<b>Diaria:</b> tu primera partida del día en Jugar en línea te da una. Cada 7.º día seguido suma una Secreto o superior, y cada 30.º día, una Enigma.",
            ...(o.gnRewards ? ["<b>Noche de Juegos:</b> tus partidas allí dan Intel de Noche de Juegos, con el que consigues intercepciones de Noche de Juegos (más abajo)."] : o.gnRewardsRules ? [] : ["<b>Noche de Juegos:</b> gana una partida allí, como local o como espía, y recibes una Enigma, una por noche."]),
            `<b>Códigos y regalos:</b> un código de un creador o nuestro funciona una vez por cuenta, y sus intercepciones se desbloquean tras tu primera partida de Jugar en línea que cuente. También regalamos algunas.${o.launch ? " Las intercepciones de un código o de un regalo, lo que sale de ellas y lo que consigas al canjearlas son solo para ti: no se pueden intercambiar, vender ni regalar, por muchas partidas que juegues. Puedes abrirlas, ponerte lo que salga, canjearlas y triturar los repetidos. Triturar un repetido da Intel normal." : ''}`,
            'Las salas privadas no dan intercepciones.',
            ...(o.launch
              ? []
              : ['Antes de que la 2.2 se abra a todos, las intercepciones empiezan de cero: las ganadas en versiones de prueba se borran. El Pin beta y lo que se haya comprado en una tienda se mantienen.']),
          ],
        },
        ...(o.gnRewards
          ? [
            {
              id: 'game-night-intercepts',
              q: '¿Qué son las intercepciones de Noche de Juegos?',
              a: [
                'Intercepciones que consigues con Intel de Noche de Juegos, en la tarjeta de la Noche de Juegos de la <b>Bóveda</b>: <b>Nivel 1</b> por 400 (cualquier rareza, hasta Legendario), <b>Nivel 2</b> por 800 (Poco común o mejor) y <b>Nivel 3</b> por 10.000 (Épico o mejor, con opción de un Único).',
                'Se abren en la colección propia de la Noche de Juegos, <b>After Hours</b>: 14 objetos de sala de cartas para tu agente que ninguna otra intercepción tiene. Como en toda intercepción, la app muestra las probabilidades exactas.',
                'Una comprada espera en <b>Por abrir</b>. A diferencia del Intel de Noche de Juegos, las intercepciones y lo que sale de ellas se intercambian como cualquier otra cosa que ganes.',
              ],
            },
            ]
          : []),
        {
          id: 'duplicates',
          q: '¿Qué hago con los repetidos?',
          a: [
            '<b>Tritura</b> una copia repetida para obtener Intel, por la cantidad que muestra la app.',
            '<b>Canje:</b> 5 copias repetidas de una rareza te dan 1 objeto al azar de la rareza siguiente, y 10 copias Legendarias repetidas te dan un Único.' + (o.launch ? " Si hay un regalo entre ellas, lo que consigas también será solo para ti." : ''),
            'Solo cuentan los repetidos, nunca tu primera copia ni un Único.',
            'Una copia que compraste o recibiste en un intercambio cuenta como repetida si tienes otra copia de ese objeto. Tu única copia siempre se queda.',
          ],
        },
        {
          id: 'intel',
          q: '¿Qué es el Intel?',
          a: [
            'La moneda que ganas jugando: con tus partidas, tu primera partida del día y tu racha diaria, y al triturar copias repetidas.',
            'Tu racha: una partida de Jugar en línea al día la mantiene. Una partida que empiezas antes del nuevo día también la mantiene, aunque termine después.',
            o.launch ? 'El Intel nunca se vende y no vale dinero. Los adultos lo gastan en el Mercado Negro y pueden intercambiarlo con otros adultos.' : 'El Intel nunca se vende y no vale dinero. Los adultos pueden intercambiarlo con otros adultos y gastarlo en el Mercado Negro desde el lanzamiento de la 2.2, el 8 de diciembre, o en una prueba cuyas ventas se deshacen.',
            'Cada cambio en tu Intel es una línea en tu registro de Intel, con su motivo. Consulta el tuyo en <b>Historial de Intel</b>, dentro de «Cómo funciona Intel», en la actualización más reciente de la app.',
            'En la <b>Bóveda</b>, tu Intel tiene su propia ficha, una pila que crece con la cantidad. Tócala para ver lo ganado hoy, lo ganado en total y lo gastado en total. El Intel retenido en una oferta abierta del Mercado Negro cuenta como gastado hasta que vuelve.',
          ],
        },
        {
          id: 'verifying',
          q: '¿Por qué una recompensa dice «Verificando»?',
          a: [
            'Desde el 8 de diciembre de 2026, nuestras comprobaciones de juego limpio pueden retener las recompensas nuevas de una cuenta hasta 72 horas mientras alguien del equipo revisa una señal clara de farmeo, bots o trampas.',
            'Puedes pedir una revisión en la app.',
          ],
        },
        {
          id: 'missing-item',
          q: 'Me falta un objeto o una intercepción',
          a: [
            'Puede estar reservado por una oferta abierta en el Mercado Negro. Puedes retirar la oferta cuando quieras.',
            'Puede que lo hayas triturado o usado en un Canje.',
            'Un intercambio revertido lo devuelve al jugador que lo dio.',
            'Cuando una membresía termina o se reembolsa, lo que venía con ella deja de estar disponible.',
            ...(o.launch ? [] : ['Las intercepciones de las versiones de prueba y sus objetos se borran antes de que la 2.2 abra para todos.']),
            '¿Nada de esto? Escribe a <email/> con tu nombre de usuario, el nombre del objeto y cuándo lo viste por última vez.',
          ],
        },
        {
          id: 'tester-rewards',
          q: '¿Dónde están mis recompensas de la beta?',
          a: [
            ...(o.testerGiftGame
              ? [
                o.launch
                  ? 'Se añadieron en el lanzamiento de la 2.2 y son tuyas. Todos los de la lista de testers recibieron el <b>Pin beta</b> y el título <b>Tester beta</b>. La primera vez que abres la app tras el lanzamiento aparece una tarjeta de agradecimiento.'
                  : 'Llegan con el lanzamiento de la 2.2, el 8 de diciembre, en una tarjeta de agradecimiento al abrir la app, y son tuyas. Todos los de la lista de testers reciben el <b>Pin beta</b> y el título <b>Tester beta</b>.',
                o.launch
                  ? "Quienes terminaron al menos una partida con otros jugadores antes del 7 de diciembre (jugada hasta el final, en cualquier sala, así que aparece en sus Estadísticas; las partidas de práctica no cuentan) recibieron además el título <b>Tester de campo</b>, 10 intercepciones de cada nivel y 1 mes de membresía."
                  : "Termina al menos una partida con otros jugadores antes del 7 de diciembre (jugada hasta el final, en cualquier sala, así que aparece en tus Estadísticas; las partidas de práctica no cuentan) y recibirás además el título <b>Tester de campo</b>, 10 intercepciones de cada nivel y 1 mes de membresía.",
                o.testerInterceptsTradable
                  ? 'El <b>Pin beta</b>, el título <b>Tester de campo</b> y las intercepciones de agradecimiento se intercambian como todo lo que ganas.'
                  : 'El <b>Pin beta</b> y el título <b>Tester de campo</b> se intercambian como todo lo que ganas; como otros regalos, las intercepciones de agradecimiento se quedan en tu cuenta.',
              ]
              : [
                o.launch
                  ? 'Se añadieron en el lanzamiento de la 2.2 y son tuyas: el <b>Pin beta</b>, los títulos <b>Tester beta</b> y <b>Tester de campo</b>, 10 intercepciones de cada nivel y 1 mes de membresía. La primera vez que abres la app tras el lanzamiento aparece una tarjeta de agradecimiento.'
                  : 'Llegan con el lanzamiento de la 2.2, el 8 de diciembre, en una tarjeta de agradecimiento al abrir la app, y son tuyas: el <b>Pin beta</b>, los títulos <b>Tester beta</b> y <b>Tester de campo</b>, 10 intercepciones de cada nivel y 1 mes de membresía.',
              ]),
            ...(o.launch ? [] : ['Lo que tienes ahora en una versión de prueba es para probar y se borra antes del lanzamiento. Tus recompensas no dependen de eso, siempre que sigas con la misma cuenta guardada.']),
            'Para ponerte el pin: <b>Cuenta</b>, <b>Editar agente</b>, <b>Accesorios</b>, <b>Pin beta</b>, <b>Guardar</b>.',
            '¿Falta algo? Escribe a <email/> con tu nombre de usuario y el correo con el que entraste durante la prueba. Una cuenta de invitado no está en la lista, así que lo habitual es que se trate de otra cuenta.',
            ...(o.launch ? [] : ["La Beta 3 es el martes 24 de noviembre, de 8 a 9 PM, hora del Este de EE. UU. (se entra desde las 7:30). Si el correo de tu lugar menciona el agradecimiento de 10 USD: juega al menos una partida esa noche y envía la encuesta antes del viernes 27 de noviembre a las 11:59 PM, hora del Este, y los 10 USD llegan por PayPal antes del 1 de diciembre. Además, un tester recibe una tarjeta regalo de 50 USD por el reporte o la idea más útil, elegido por nosotros."]),
          ],
        },
        ...(o.launch
          ? []
          : [
            {
              id: 'beta-reset',
              q: "La app dice que todo se reinicia antes del lanzamiento. ¿Qué significa?",
              a: [
                "SpySocial todavía está en pruebas. Antes del lanzamiento del 8 de diciembre se reinician los objetos, las intercepciones, el Intel, las operaciones del Mercado Negro y los intercambios, y todos empiezan de cero.",
                "Tu cuenta, tus amigos y tus paquetes se quedan, y también tu XP, tu nivel, tus logros, tus estadísticas, tus notas de las partidas de práctica, los títulos de códigos y todo lo que compraste en la App Store o Google Play.",
                ...(o.gnRewards ? ["Tus títulos ★ de Noche de Juegos se quedan, y recuperas todo el Intel de Noche de Juegos que ganaste, aunque lo hayas gastado."] : []),
                "Las membresías dadas para la prueba terminan en el lanzamiento." + (o.intelZero ? " Tu racha vuelve a empezar desde el día 0." : ''),
                "Los testers recibirán una recompensa especial por ayudar.",
                "El aviso aparece en la Bóveda, el Mercado Negro y las pantallas de intercambios. Tócalo para leer más, o toca la X para ocultarlo en ese teléfono.",
              ],
            },
            ]),
      ],
    },
    {
      id: 'membership',
      title: 'Membresía',
      items: [
        {
          id: 'membership-includes',
          q: '¿Qué incluye la membresía?',
          a: [
            ...(o.purchases ? [] : ['La membresía sale a la venta con la versión 2.2.']),
            'Todos los paquetes premium, incluidos los nuevos. Todos pueden jugarlos en las salas donde eres anfitrión y en tu mesa de Jugar en línea.',
            'Crea tus propios paquetes con el creador y compártelos en la comunidad.',
            '+50 % de XP en cada partida y salas solo para miembros en Jugar en línea.',
            ...(o.practiceMembers ? ['Partidas de práctica, hasta 5 al día, con notas de la A a la F y comentarios de IA.'] : []),
            'El marco, la etiqueta y el título de tu rango. Puedes liderar un grupo y tener 8 ofertas abiertas en el Mercado Negro en vez de 4.',
            'Nunca cambia cómo juegas ni cómo puntúas. Los paquetes gratis siguen gratis para todos.',
          ],
        },
        {
          id: 'pack-creator',
          q: "¿Cómo funciona el creador de paquetes?",
          a: [
            "Con membresía (13 años o más), abre <b>Paquetes</b> y luego el creador de paquetes. Un paquete necesita de 30 a 200 entradas para jugarse o enviarse a la <b>Comunidad</b>.",
            "Tus paquetes se juegan en las salas privadas que organizas mientras seas miembro.",
            "Envía uno a la <b>Comunidad</b> y lo revisamos en 72 horas: primero una revisión automática lee el texto y luego decide una persona. Muestra <b>En revisión</b>, después <b>En la comunidad</b>, o <b>Necesita cambios</b> con el motivo: cámbialo y vuelve a enviarlo.",
            "Los paquetes populares pueden salir como <b>Destacado</b>. Otros miembros añaden paquetes de la comunidad a <b>Mis paquetes</b> para jugarlos en sus salas.",
            "A los jugadores menores de 18 años no les enviamos la respuesta entre las 10 p. m. y las 7 a. m.",
          ],
        },
        {
          id: 'membership-plans',
          q: '¿Qué son Agente, Élite y Mente maestra?',
          a: [
            '<b>Agente</b> es la membresía mensual, <b>Élite</b> la anual, y <b>Mente maestra</b> es la membresía de por vida: un solo pago, sin renovación.',
            'Mente maestra añade los tres marcos metálicos, el título Tarjeta dorada, la celebración Tormenta dorada y objetos de avatar exclusivos.',
            'La membresía de por vida dura mientras ofrezcamos SpySocial, no toda tu vida. No hay pruebas gratis, y la membresía no se comparte con En familia.',
          ],
        },
        ...(o.membershipSwitch
          ? [
            {
              id: 'membership-switch',
              q: '¿Puedo cambiar entre la membresía mensual y la anual?',
              a: [
                'Sí, en la app: abre la <b>Bóveda</b> y luego <b>Membresía</b>. Con la mensual, toca <b>Mejorar a Élite</b> (anual) o <b>Mejorar a Mente maestra</b> (de por vida). Con la anual también está <b>Cambiar a mensual</b>: el marco, el título y la etiqueta Élite pasan a ser los de Agente, y las demás ventajas siguen.',
                'Nunca pagas dos veces. En Google Play, el nuevo plan empieza ya y el tiempo que pagaste pasa a ser tiempo del nuevo plan. En el App Store, Apple decide cuándo empieza, a menudo en tu próxima renovación, y te abona el tiempo que pagaste.',
                'Una membresía que cobra la otra tienda se cambia en esa tienda: comprar otro plan aquí te cobraría dos veces.',
                ...(o.googlePassStop
                  ? ['Cuando compras la membresía de por vida, una membresía mensual o anual que cobra Google Play deja de renovarse sola: la conservas hasta su fecha de fin y no se te cobra nada más. Apple no lo permite, así que una del App Store tienes que cancelarla tú.']
                  : []),
              ],
            },
            {
              id: 'two-memberships',
              q: 'La app dice que tengo dos membresías activas',
              a: [
                'Estás pagando dos a la vez: por ejemplo, la de por vida y una mensual, o una en cada tienda. La app te dice cuál necesitas y cuál cancelar, al abrirla y en la pestaña <b>Membresía</b>.',
                'Toca <b>Gestionar suscripción</b> para cancelar la que sobra en su tienda. Cancelar solo detiene el próximo cobro: conservas el tiempo que ya pagaste.',
                ...(o.googlePassStop ? ['Si la que sobra la cobra Google Play, <b>Detener renovación</b> la detiene desde la misma app.'] : []),
                'Mientras tanto no se bloquea nada: <b>Más tarde</b> oculta el aviso hasta la próxima vez que abras la app.',
              ],
            },
            ]
          : []),
        ...(o.memberLoyalty
          ? [
            {
              id: 'member-time',
              q: "¿Qué es «Miembro desde»?",
              a: [
                "Mientras tengas membresía, <b>Cuenta</b> muestra cuándo empezó y cuánto tiempo llevas como miembro, y la <b>Bóveda</b> muestra tus sellos: 1, 3 y 6 meses, 1, 2 y 3 años, y después cada año.",
                "Cuenta el tiempo que tu membresía ha estado activa sin interrupción: una membresía mensual o anual, la membresía de por vida, un regalo o un código. El tiempo reembolsado y las compras de prueba no cuentan.",
                "Se gana quedándote. El primer día en que tu membresía ya no esté activa (después del periodo de gracia que da la tienda si falla un pago), tu tiempo como miembro y tus sellos desaparecen. Si vuelves a ser miembro, «Miembro desde» y tu tiempo empiezan de cero.",
                "La membresía <b>de por vida</b> es la excepción: tu tiempo cuenta desde tu primer día como miembro, incluidos los meses con una membresía mensual o anual antes, y sigue creciendo, con cada sello que añadamos más adelante.",
                "Los demás jugadores solo ven cuánto tiempo, con tu sello, en tu ficha de jugador; nunca la fecha ni el precio. Desactiva <b>Mostrar mi tiempo como miembro</b> en Ajustes para ocultarlo. El tiempo de una cuenta de menores de 13 años nunca se muestra a otros.",
                "Los sellos solo cambian el aspecto de tu perfil: no dan XP ni mejores probabilidades, y no se pueden intercambiar.",
              ],
            },
            {
              id: 'membership-price',
              q: "¿Me subirán el precio?",
              a: [
                "Mientras tu membresía mensual o anual se renueve sin interrupción, sigues pagando el precio de ahora, aunque suba para los nuevos miembros. La tienda puede ajustarlo por impuestos locales o por la moneda.",
                "Si cambias al otro plan, pagas el precio actual de ese plan. Si tu membresía termina y vuelves más tarde, puede que pagues el precio de ese momento. La membresía de por vida se paga una vez y nunca se renueva.",
              ],
            },
            ]
          : []),
        {
          id: 'cancel-membership',
          q: '¿Cómo funcionan la renovación automática y la cancelación?',
          a: [
            'Agente y Élite se renuevan solos hasta que canceles: en el App Store, al menos 24 horas antes de que termine el periodo; en Google Play, antes de la fecha de renovación. Mantienes las ventajas hasta el final del periodo que pagaste.',
            '<b>iPhone o iPad:</b> Ajustes, tu nombre, Suscripciones, SpySocial.',
            '<b>Android:</b> la app Google Play Store, tu foto de perfil, Pagos y suscripciones, Suscripciones, SpySocial.',
            o.googlePassStop
              ? '<b>Gestionar suscripción</b> en la app abre la misma página. Borrar la app o tu cuenta no cancela una membresía mensual o anual. Comprar la membresía de por vida detiene sola una que cobra Google Play, pero no una que cobra el App Store.'
              : '<b>Gestionar suscripción</b> en la app abre la misma página. Borrar la app o tu cuenta, o comprar la membresía de por vida, no cancela una membresía mensual o anual.',
            ...(o.memberLoyalty ? ["En la <b>Bóveda</b>, <b>Cancelar membresía</b> (debajo de Gestionar suscripción) muestra antes una pantalla con los hechos: si tu membresía termina, tu tiempo como miembro y tus sellos se reinician y empiezan desde cero, y tu precio fijado termina. Su único botón, <b>Continuar con la cancelación</b>, te lleva directamente a la tienda. <b>Gestionar suscripción</b> sigue abriendo la tienda directamente. Nada cambia antes del final del periodo que pagaste."] : []),
          ],
        },
        {
          id: 'restore-purchases',
          q: '¿Cómo recupero mi membresía?',
          a: [
            'Toca <b>Restaurar compras</b> en la app con el teléfono conectado a la cuenta del App Store o de Google Play con la que pagaste.',
            'Pasa tu membresía a la cuenta de SpySocial que estás usando, y la quita de cualquier otra en la que estuviera, aunque esté borrada.',
          ],
        },
        {
          id: 'refunds',
          q: '¿Me pueden devolver el dinero?',
          a: [
            'Apple y Google gestionan los reembolsos según sus políticas: pídeselo a Apple en reportaproblem.apple.com, o a Google desde tu historial de pedidos de Google Play.',
            'Si se reembolsa una compra, se retira lo que desbloqueó.',
          ],
        },
      ],
    },
    {
      id: 'account',
      title: 'Tu cuenta',
      items: [
        {
          id: 'guest-or-saved',
          q: 'Cuenta de invitado o guardada: ¿qué diferencia hay?',
          a: [
            'Un <b>invitado</b> juega en salas privadas al instante. Una cuenta de invitado vive en un solo teléfono, y cerrar sesión la borra para siempre.',
            `Una cuenta <b>guardada</b> (con Apple, Google o tu correo${o.passwordless ? ', con un código que te enviamos, sin contraseña' : ''}) conserva tu nombre, tu progreso y tu membresía en cualquier teléfono, y te deja jugar en línea, entrar a la Noche de Juegos y añadir amigos.`,
            'Puedes guardar una cuenta de invitado cuando quieras desde la página de tu cuenta, sin perder nada. Amigos, Intercambios y el Mercado Negro le piden a un invitado que la guarde primero.',
          ],
        },
        ...(o.emailCodes22
          ? [
            {
              id: 'sign-up-email',
              q: '¿Cómo me registro con mi correo?',
              a: [
                'Toca <b>Continuar con correo</b> y escribe tu correo. Te enviamos un código de 6 dígitos: escríbelo en la app y tu cuenta queda creada. No hace falta contraseña.',
                'El código sirve durante 1 hora. ¿No llega? Revisa spam o correo no deseado, o toca <b>Reenviar código</b> pasado un minuto.',
                ...(o.passwordless
                  ? []
                  : ['Las versiones anteriores de la app piden una contraseña. Si una dice que la contraseña es demasiado común o apareció en una filtración de datos, elige otra: no se creó ninguna cuenta ni se envió ningún correo, y puedes volver a intentarlo enseguida.']),
              ],
            },
            ]
          : []),
        {
          id: 'lost-account',
          q: 'Perdí mi cuenta. ¿Puedo recuperarla?',
          a: [
            'Una <b>cuenta guardada</b> vuelve en cualquier teléfono: abre SpySocial e inicia sesión igual que antes (Apple, Google o el mismo correo). Otro correo, o Ocultar mi correo de Apple, abre una cuenta nueva y vacía, y por eso muchas veces parece que el progreso desapareció.',
            'Una <b>cuenta de invitado</b> vive en un solo teléfono. Si se borró la app, se perdió el teléfono o cerraste sesión, se fue para siempre y no podemos recuperarla.',
            'Si la app muestra <b>No se pudo abrir tu cuenta</b>, tu cuenta sigue guardada en el teléfono, pero no se pudo leer en ese momento. Toca <b>Reintentar</b>, o cierra la app y vuelve a abrirla.',
            'La membresía no se pierde: <b>Restaurar compras</b> la recupera. No podemos unir cuentas ni mover objetos entre ellas.',
            'Si tenías una cuenta guardada, escribe a <email/> con tu nombre de usuario y cómo iniciabas sesión, y lo miramos.',
          ],
        },
        {
          id: 'cant-sign-in',
          q: 'No puedo iniciar sesión',
          a: [
            ...(o.passwordless ? ['Puedes iniciar sesión con Apple, con Google o con un código de 6 dígitos que te enviamos por correo. Ya no hay contraseñas: si la app aún te pide una, actualízala en el App Store o Google Play.'] : []),
            'Entra de la misma forma que antes. Otro correo, o Ocultar mi correo de Apple, abre una cuenta nueva y vacía en lugar de la tuya.',
            'Si la app se abre en la pantalla de inicio de sesión con <b>Se cerró tu sesión en este dispositivo</b>, cerramos tu sesión ahí desde nuestro lado, normalmente porque se cerró la sesión de la cuenta en todos los dispositivos. Vuelve a entrar de la misma forma: tu progreso está guardado. Una cuenta de invitado no puede volver a entrar.',
            'Si la app dice «Esta cuenta no puede iniciar sesión», escribe a <email/> desde el correo de la cuenta y lo miramos.',
            'Si la cuenta fue bloqueada, nuestro correo a esa dirección indica la referencia, el motivo y cómo apelar.',
          ],
        },
        {
          id: 'code-not-arriving',
          q: 'No me llega el código o el correo para entrar',
          a: [
            'Llega desde noreply@mail.spysocial.app. Mira en spam o correo no deseado, y revisa letra por letra la dirección que escribiste.',
            o.passwordless
              ? 'Puedes pedir un código nuevo a los 60 segundos con <b>Reenviar código</b>. Cada código sirve 1 hora: usa el del correo más reciente. Si la app dice que hay demasiados correos, espera unos minutos e inténtalo una vez.'
              : 'Puedes pedir otro correo a los 60 segundos. Usa el más reciente.',
            'Si tu cuenta usa Apple o Google, también puedes entrar con ellos.',
            '¿Sigue sin llegar? Escribe a <email/> con la dirección exacta y más o menos cuándo lo intentaste, y lo revisamos.',
          ],
        },
        {
          id: 'lost-email',
          q: 'Perdí mi correo o quiero cambiarlo',
          a: [
            'La app no puede cambiar el correo de una cuenta guardada, así que escribe a <email/>.',
            'Si aún puedes leer el correo anterior, escribe desde él y dinos el nuevo. También escribiremos al correo nuevo, y tendrás que responder.',
            'Si ya no tienes el correo anterior, primero intenta recuperarlo con tu proveedor de correo. Si tu cuenta también tiene inicio de sesión con Apple o Google, puedes seguir entrando así. No podemos prometer el cambio sin el correo anterior, porque así sabemos que la cuenta es tuya.',
            'Después de cambiar el correo, tus intercambios se pausan 3 días y tus ofertas y anuncios abiertos en el Mercado Negro se cierran.',
          ],
        },
        {
          id: 'stolen-account',
          q: 'Alguien entró en mi cuenta. ¿Qué hago?',
          a: [
            'Primero protege el correo de tu cuenta de SpySocial, y tu cuenta de Apple o Google si entras con ellas. Quien pueda leer ese correo puede entrar en tu cuenta.',
            'Dentro de los 7 días de un intercambio que no hiciste, toca <b>Revertir mis intercambios</b> en tu página de intercambios. Revierte todos tus intercambios protegidos y pausa tus intercambios 30 días. Puedes hacerlo una vez cada 90 días.',
            'Luego escribe a <email/> con tu nombre de usuario, más o menos cuándo pasó y qué falta. Avísanos también si crees que alguien sigue con la sesión iniciada.',
            'Pasados 7 días, un intercambio es definitivo, y una venta de Objetos en el Mercado Negro es definitiva al instante. Nunca te pediremos tu código de inicio de sesión.',
          ],
        },
        {
          id: 'change-name',
          q: '¿Cómo cambio mi nombre?',
          a: [
            'Cambia tu nombre visible cuando quieras en la página de tu cuenta, y tu nombre de usuario una vez cada 30 días.',
            'Una cuenta nueva empieza con un nombre visible al azar en el idioma de tu app.',
            "Al crear una cuenta nueva, tu @usuario se forma a partir del nombre visible que escribes y lo sigue hasta que pongas uno propio o tires el dado. Nunca usa el nombre de tu cuenta de Google o Apple.",
            'En las mesas de Jugar en línea, quienes no te conocen ven el color de tu agente. Los nombres siguen las <rules>normas de la comunidad</rules>.',
          ],
        },
        {
          id: 'birth-year',
          q: 'Puse mal mi año de nacimiento. ¿Puedo corregirlo?',
          a: [
            'No se puede cambiar en la app: escribe a <email/> desde el correo de tu cuenta.',
            'Lo cambiamos a un año posterior (una edad menor) cuando lo pides tú o tu padre o madre, y a uno anterior solo con prueba de edad.',
            'Si la edad corregida es menor de 13, la cuenta se borra.',
          ],
        },
        {
          id: 'delete-account',
          q: '¿Cómo borro mi cuenta?',
          a: [
            "En la app: <b>Cuenta</b>, <b>Ajustes</b>, <b>Cuenta e inicio de sesión</b>, <b>Eliminar cuenta</b>. No se puede deshacer. Una cuenta de invitado también se borra ahí, o al cerrar sesión.",
            'También puedes pedírnoslo por correo: consulta <delete>Eliminar tu cuenta</delete>.',
            'Borrar la cuenta no cancela una membresía: cancélalo también en la tienda.',
          ],
        },
        {
          id: 'data-copy',
          q: '¿Puedo obtener una copia de mis datos?',
          a: [
            'Sí. Escribe a <email/> desde el correo de tu cuenta. Te enviamos una copia en un archivo legible por máquina (JSON) en el plazo de un mes.',
            'Una cuenta de invitado no tiene correo, así que primero guárdala con un correo. Más detalles: <privacy>Política de privacidad</privacy>.',
          ],
        },
      ],
    },
    {
      id: 'safety',
      title: 'Seguridad',
      items: [
        {
          id: 'report-block',
          q: '¿Cómo reporto o bloqueo a alguien?',
          a: [
            "En la sala de espera, mantén pulsada su tarjeta. En la partida, mantén pulsada su foto: <b>Reportar</b> y <b>Bloquear</b> están al final de tus notas sobre esa persona. En el final de la partida, toca su tarjeta.",
            'Una persona lee cada reporte, y el jugador no sabe quién lo envió.',
            'Bloquear los mantiene separados: ninguno puede entrar en una sala donde esté el otro. Desbloquea en Ajustes, en <b>Privacidad y seguridad</b>: <b>Jugadores bloqueados</b>.',
            'Mentir y farolear es parte del juego y no se reporta.',
            'En una mesa con un grupo, elige <b>Juego en equipo</b> si crees que se ayudan fuera del juego. <b>Reportar al grupo</b> cubre a todos los de su grupo en esa mesa.',
          ],
        },
        {
          id: 'moderators',
          q: '¿Quién modera SpySocial?',
          a: [
            'Nuestro equipo lee cada reporte y decide qué pasa. Moderadores voluntarios de confianza ayudan, con nuestro permiso: en las mesas de la Noche de Juegos, con mensajes reportados y con los paquetes de la comunidad.',
            'Puedes apelar cualquier decisión escribiendo a <email/>.',
          ],
        },
        {
          id: 'reputation',
          q: "¿Qué es mi reputación?",
          a: [
            "Toda cuenta tiene una. Mira la tuya en Ajustes, en <b>Reputación</b>: Excelente, Buena, Baja, En riesgo o Bloqueada. Las cuentas nuevas empiezan en Buena.",
            "Tu reputación sale de tu historial: cuánto llevas jugando y si hubo reportes, advertencias, silenciamientos o pausas. La puntuación exacta no se muestra. Las notas antiguas cuentan menos con el tiempo y dejan de contar a los 90 días.",
            "A las cuentas nuevas y a los jugadores con menos reputación se les revisan automáticamente más dibujos.",
            "Mientras está Bloqueada, no puedes usar Jugar en línea, las salas públicas, las Noches de Juegos, los intercambios, los regalos ni el Mercado Negro, y puede que tampoco las salas privadas. Puedes seguir iniciando sesión y conservas tus objetos. Se recupera con el tiempo si juegas limpio.",
            "¿Crees que es un error? Escribe a <email/> y lo revisamos.",
          ],
        },
        {
          id: 'under-18',
          q: '¿Qué reglas hay para menores de 18?',
          a: [
            'Hay que tener 13 años o más para jugar.',
            'En cualquier sala o grupo con un jugador menor de 18 años o que no nos haya dicho su edad se bloquean para todos los enlaces, los correos, los números de teléfono, las redes sociales y otros datos personales (una dirección, dónde vive alguien, un colegio, un nombre real).',
            'Los menores de 18 no tienen perfil público ni pueden tener seguidores, solo intercambian objetos por objetos con amigos del código de amigo y no pueden comprar ni vender en el Mercado Negro.',
            'En iPhone y iPad, los amigos, los grupos y los intercambios esperan a una versión de la app que pida el consentimiento de un padre o madre a través de Apple.',
            'Padres, madres y tutores: consulten nuestra <safety>página de seguridad</safety>.',
          ],
        },
        {
          id: 'under-13',
          q: 'La app dice «SpySocial es para jugadores de 13 años o más»',
          a: [
            o.storeAgeSignals
              ? 'SpySocial es para jugadores de 13 años o más. No verificamos ni estimamos edades: la app se basa en el año de nacimiento que indicas y en el rango de edad que comparten Apple o Google.'
              : 'SpySocial es para jugadores de 13 años o más. No verificamos ni estimamos edades: la app se basa en el año de nacimiento que indicas.',
            'Un año de nacimiento de menos de 13 años borra la cuenta al instante, y no se puede restaurar.',
            ...(o.storeAgeSignals ? ['Si tu cuenta de Apple o Google muestra una edad equivocada, corrígela allí y la app te dejará jugar. Si un padre, madre o tutor rechazó SpySocial en la tienda, solo esa persona puede cambiarlo.'] : []),
          ],
        },
      ],
    },
    {
      id: 'troubleshooting',
      title: 'Solución de problemas',
      items: [
        {
          id: 'update-not-showing',
          q: 'No me aparece la nueva actualización',
          a: [
            'Las actualizaciones se descargan en segundo plano. Cierra SpySocial del todo (deslízala fuera), ábrela, y luego ciérrala y ábrela una vez más.',
            'Si es una versión nueva en el App Store o Google Play, actualízala ahí.',
          ],
        },
        {
          id: 'cant-join',
          q: '¿Por qué no puedo entrar a una sala?',
          a: [
            'Revisa el código: letras de la A a la Z y números del 2 al 9 (el 0 y el 1 se leen como O e I).',
            'No se puede entrar a una partida en curso: espera a que termine. La sala también puede estar llena o cerrada con llave.',
            'Si el anfitrión cambió el código, los enlaces y QR antiguos dejan de funcionar. Si el anfitrión te expulsó, no puedes volver a esa sala.',
            'Una invitación a una sala que ya no existe dice <b>Esta invitación no funciona</b> o <b>Sala cerrada</b> enseguida, antes de pedirte el año de nacimiento.',
            'Jugar en línea y la Noche de Juegos necesitan una cuenta guardada.',
          ],
        },
        {
          id: 'connection-lost',
          q: 'Perdí la conexión en una partida',
          a: [
            'La app se reconecta sola cuando vuelve tu conexión.',
            'Un mensaje del chat que no salió muestra <b>No se envió</b>. Si tu conexión vuelve en menos de 2 minutos, se envía de nuevo solo; después, tócalo para enviarlo.',
            'Si terminas en el inicio, toca <b>Volver</b> en la tarjeta de tu sala. Tu lugar se guarda.',
            'Si la app dice que no recibió respuesta tras un voto, una adivinanza, una compra, una trituración o un intercambio, puede que se haya hecho igual. Compruébalo y vuelve a intentarlo si no: nada se paga ni se intercambia dos veces.',
          ],
        },
        {
          id: 'app-crashes',
          q: 'La app se cierra sola una y otra vez',
          a: [
            'Actualiza SpySocial en el App Store o Google Play si hay una actualización.',
            'Ciérrala del todo (deslízala fuera), ábrela, y luego ciérrala y ábrela una vez más.',
            'Reinicia el teléfono y comprueba que tenga algo de espacio libre: una actualización puede fallar con el teléfono lleno.',
            '¿Sigue pasando? Usa <b>Cuenta</b>, <b>Ajustes</b>, <b>Reportar un problema</b> si puedes llegar, o escribe a <email/> con el modelo de tu teléfono, la versión del sistema, qué estabas haciendo y la hora con tu zona horaria.',
            'Si estabas en una partida, la app te reconecta, o toca <b>Volver</b> en la tarjeta de tu sala en el inicio. Tu lugar se guarda.',
          ],
        },
        {
          id: 'game-not-counted',
          q: 'Mi partida no contó',
          a: [
            'Una partida cuenta en tu historial cuando terminó y tenías un lugar, tanto si jugaste hasta el final como si saliste antes (una derrota) o estabas ausente.',
            'No cuentan: una partida que terminó el anfitrión, una partida demasiado corta o con muy pocos jugadores, un reparto cancelado, una partida abandonada, que te saquen de la sala, un lugar al que nunca llegaste, ni mirar. Una partida sin ganador no es victoria ni derrota.',
            'Tus estadísticas muestran Jugar en línea y las salas privadas por separado, así que mira el selector de arriba.',
            'Las salas privadas nunca dan Intel ni intercepciones, y las partidas de Jugar en línea solo los dan si ganaron XP.',
            'Para intercambiar necesitas 3 partidas terminadas que cuenten y que nuestras comprobaciones de juego limpio no hayan marcado, cada una con al menos otras 2 cuentas guardadas en otros teléfonos. Dos teléfonos en el mismo Wi-Fi sí valen; otra cuenta en tu propio teléfono no es una de esas 2.',
            'Si debería haber contado, escribe a <email/> con tu nombre de usuario, el código de la sala (si lo tienes) y cuándo jugaste.',
          ],
        },
        {
          id: 'notifications',
          q: 'No me llegan las notificaciones',
          a: [
            'Permite las notificaciones de SpySocial en los ajustes de tu teléfono.',
            'En la app, <b>Privacidad y amigos</b> tiene interruptores para solicitudes de amistad, invitaciones, paquetes nuevos, intercambios y el Mercado Negro.',
            'En Android, las notificaciones de amigos, grupo, intercambios y el Mercado Negro comparten una categoría en los ajustes del teléfono, <b>Amigos, grupo e intercambios</b>: si la desactivas ahí, se detienen todas.',
            'Los avisos de partida llegan cuando buscas en Jugar en línea, y los recordatorios de la Noche de Juegos cuando tocas <b>Recordarme</b>. Los invitados no los reciben.',
            'Los menores de 18 no reciben notificaciones sociales, ni nuestra respuesta sobre un paquete que enviaron a Comunidad, entre las 10 PM y las 7 AM.',
          ],
        },
        {
          id: 'contact-support',
          q: '¿Cómo contacto con soporte?',
          a: [
            'Escribe a <email/>. Para cualquier tema de tu cuenta, hazlo desde su correo. Una persona lee cada mensaje.',
            'Para novedades, Noches de Juegos y jugadores que buscan partida, únete a nuestro <discord>Discord</discord>.',
          ],
        },
      ],
    },
  ],
}

export default es
