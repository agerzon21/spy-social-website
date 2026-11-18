import type { HelpText } from '../types'

/** Português (pt-BR): "você", direto e informal como o app; termos do app (Sala privada, Criar sala, Jogar online, Buscar partida, Ações, Adivinhar, Cofre, Mercado Negro, Achados raros, interceptações, Intel, Ajustes). */
// help-new-1117 (2026-11-17, against app int/u62-15-prep): #question-rounds, #game-night-weekly, #game-night-rewards, #game-night-intercepts, #practice-members, #membership-switch, #two-memberships, #sign-up-email; agent translation, unreviewed.
const ptBR: HelpText = {
  title: 'Ajuda e perguntas frequentes',
  lede: 'Respostas rápidas sobre como jogar SpySocial, sua conta, as recompensas e o plano de membro.',
  search: 'Buscar na ajuda',
  searchHint: 'Tente “votar” ou “troca”',
  clear: 'Limpar',
  results: (n) => (n <= 1 ? `${n} resposta` : `${n} respostas`),
  noResults: (q) => `Nada encontrado para “${q}”. Tente uma palavra mais curta ou mande um e-mail.`,
  topics: 'Assuntos',
  stillStuck: 'Ainda com dúvida? Escreva para',
  sections: (o) => [
    {
      id: 'start',
      title: 'Primeiros passos',
      items: [
        {
          id: 'what-is-spysocial',
          q: 'O que é o SpySocial?',
          a: [
            'Um jogo de festa grátis de dedução social para 3 a 21 jogadores. A maioria são locais e compartilham um segredo. Um ou mais espiões não sabem qual é e tentam se misturar. Descubra o espião, ou engane todo mundo se for você.',
            'São dois jogos: <b>Spy Talk</b>, em que todos fazem e respondem perguntas sobre um local secreto, e <b>Spy Sketch</b>, em que todos desenham, um de cada vez, uma palavra secreta.',
          ],
        },
        {
          id: 'how-many-players',
          q: 'De quantos jogadores eu preciso?',
          a: [
            'Uma sala privada joga com 3 a 21 jogadores.',
            '<b>Jogar online</b> coloca você numa mesa de 4 ou 8.',
            'O anfitrião escolhe quantos espiões, de acordo com os jogadores da sala: com 8 jogadores, até 3 espiões.',
          ],
        },
        {
          id: 'is-it-free',
          q: 'O SpySocial é grátis?',
          a: [
            'Sim. Os dois jogos, o Jogar online, as salas privadas e a Noite de Jogos são grátis e sem anúncios.',
            `Ser membro é opcional e libera os pacotes premium e alguns visuais para o seu agente. Nada que você compra ajuda a ganhar.${o.purchases ? '' : ' O plano de membro começa a ser vendido com a versão 2.2.'}`,
          ],
        },
        {
          id: 'start-a-game',
          q: 'Como começo uma partida?',
          a: [
            '<b>Com amigos:</b> toque em <b>Sala privada</b> e depois em <b>Criar sala</b>, e compartilhe o código da sala, o QR code ou o link de convite. Precisa de pelo menos 3 jogadores.',
            '<b>Com qualquer pessoa:</b> toque em <b>Jogar online</b> e depois em <b>Buscar partida</b>.',
            o.practiceMembers ? "<b>É novo?</b> <b>Como jogar</b>, no início, tem um tutorial grátis de 3 minutos para cada jogo e depois, para membros, partidas de treino contra agentes de IA. O glossário também fica lá." : "<b>É novo?</b> <b>Como jogar</b>, no início, tem um tutorial de 3 minutos para cada jogo e depois partidas de treino contra agentes de IA. O glossário também fica lá.",
          ],
        },
      ],
    },
    {
      id: 'how-to-play',
      title: 'Como jogar',
      items: [
        {
          id: 'roles',
          q: 'O que fazem os locais e os espiões?',
          a: [
            'Os <b>locais</b> veem o segredo: um local no Spy Talk, uma palavra no Spy Sketch. Todos recebem o mesmo. Mostre que você sabe sem entregar.',
            'Os <b>espiões</b> veem ESPIÃO. Escute, aja como se também soubesse o segredo e descubra qual é antes de ser pego.',
            'Na <b>Máfia</b>, os espiões se conhecem e têm um chat privado. No <b>Clássico</b>, cada espião joga sozinho. Com 1 espião, os dois modos são iguais.',
          ],
        },
        {
          id: 'spy-talk',
          q: 'Como funciona o Spy Talk?',
          a: [
            'Primeiro, as perguntas: na sua vez, cada jogador faz uma pergunta ao próximo e responde uma.',
            'Depois a discussão livre: converse, insista nas respostas estranhas e peça votações.',
            'Sem ideia? A carta de dicas, embaixo na tela, tem uma pergunta. Perguntar o nome do local ou a primeira letra não vale.',
          ],
        },
        ...(o.questionRounds
          ? [
            {
              id: 'question-rounds',
              q: 'O que são as rodadas de perguntas?',
              a: [
                'Algumas mesas de Spy Talk jogam 2 rodadas de perguntas em vez de 1: salas privadas em que o anfitrião escolhe 2 nas <b>Regras</b> da sala, e Noites de Jogos que usam isso. No Jogar online, é sempre 1.',
                'Na rodada 1, cada um faz uma pergunta e responde uma. Assim que chega a última resposta, começa a rodada 2, ao contrário: a pessoa a quem você perguntou é quem pergunta para você. No topo aparece “Rodada 2”.',
                'Depois vem a discussão, com o tempo de sempre. Duas rodadas dão aos locais o dobro de respostas para conferir, e ao espião o dobro de chances de vacilar.',
              ],
            },
            ]
          : []),
        {
          id: 'talk-out-loud',
          q: "O que é Falar em voz alta?",
          a: [
            "Uma regra do Spy Talk para quem joga no mesmo lugar ou numa chamada de voz. O anfitrião a ativa nas <b>Regras</b> da sala; salas novas começam com ela desativada. Só em salas privadas e nas Noites de Jogos que a ativarem.",
            "Durante as perguntas, ninguém digita nem usa o microfone: quem pergunta fala em voz alta e toca em <b>Concluído</b>, depois quem responde fala em voz alta e toca em <b>Concluído</b>.",
            "Nada fica escrito, então as anotações não guardam o histórico de perguntas.",
            "Sugerimos deixar desativada, mesmo com todos na mesma mesa: toque no microfone e pergunte em voz alta. Todos ouvem você, e o app transforma o que você diz em texto que todos os jogadores veem no histórico de perguntas.",
            "Todos na sala precisam da versão mais nova do app. Se alguém tiver uma versão antiga, a regra aparece desativada até a pessoa atualizar o app.",
          ],
        },
        {
          id: 'spy-sketch',
          q: 'Como funciona o Spy Sketch?',
          a: [
            'Os jogadores desenham, um de cada vez, num quadro compartilhado. Os locais dão pistas da palavra sem desenhá-la de vez. Os espiões acrescentam algo vago que possa servir.',
            'Depois que todos jogaram sua vez, abrem as votações e o palpite do espião. As rodadas seguem até o fim da partida.',
            'Os desenhos do Spy Sketch não são descritos em voz alta, então um leitor de tela (VoiceOver, TalkBack) não consegue acompanhar o desenho.',
          ],
        },
        {
          id: 'drawings-checked',
          q: "Os desenhos do Spy Sketch são verificados?",
          a: [
            "Sim, por segurança. Nas mesas do Jogar online e nas Noites de Jogos, os turnos de desenho terminados podem ser verificados automaticamente pela OpenAI, em busca de qualquer coisa que quebre as <rules>regras da comunidade</rules>.",
            "Na primeira vez, o app mostra <b>Os desenhos são verificados</b>. Toque em <b>Concordo</b> para jogar Spy Sketch online. Até concordar, o Spy Talk continua disponível.",
            "Numa sala privada, um desenho é verificado se alguém o denunciar, e também quando um jogador com menos de 18 anos, ou que não nos informou a idade, pode vê-lo.",
            "A OpenAI recebe uma imagem do turno e a palavra da rodada, nunca seu nome nem suas mensagens. Um turno que quebra as regras é removido e pode levar a uma advertência, uma pausa ou um banimento. Uma pessoa revisa toda decisão permanente, e você pode recorrer.",
            "Todos os detalhes: <drawchecks>Drawing Checks, na Política de privacidade</drawchecks>.",
          ],
        },
        {
          id: 'new-page',
          q: "O que é Página nova no Spy Sketch?",
          a: [
            "Uma pausa no desenho para o jogo por até 20 segundos: estude o desenho, converse e confira suas anotações. Todos que ainda estão no jogo votam em <b>Manter esta</b> ou <b>Página nova</b>. A pausa acaba antes quando todos já votaram.",
            "A página fica só se mais da metade dos jogadores que ainda estão no jogo votar para mantê-la. Empate, ou nenhum voto, significa página em branco. Dá para voltar e ver as páginas anteriores.",
            "<b>Jogar online:</b> no máximo uma página a mais. A pausa vem a cada 2 rodadas numa mesa de 4, e depois de cada rodada numa mesa de 8. Se a mesa mantiver a página, a pausa seguinte vem o mesmo número de rodadas depois.",
            "<b>Salas privadas e Noites de Jogos:</b> o anfitrião (ou a noite) escolhe <b>Página nova</b> nas regras: Não, 2, 3 ou 4 páginas, ou Sem limite. Uma sala nova começa com 2, como recomendamos. A pausa vem quando a folha fica cheia.",
            "Nenhuma pausa começa nos últimos 45 segundos da partida.",
          ],
        },
        {
          id: 'voting',
          q: 'Como funciona a votação?',
          a: [
            'Abra <b>Ações</b> e toque em <b>Votar</b>. Cada um escolhe um jogador ou <b>Abster-se</b> e confirma. Voto confirmado não muda.',
            '<b>Maioria:</b> alguém só é eliminado com votos de mais da metade dos jogadores que ainda estão no jogo.',
            '<b>Mais votos:</b> ter mais votos que todo mundo basta, desde que superem as abstenções e quem não votou.',
            'Empate no primeiro lugar não elimina ninguém, e sempre são precisos pelo menos 2 votos.',
            'Nas mesas do Jogar online, cada jogador pode pedir uma votação e diz quem acusa. Quando uma votação pega um espião, todos que usaram a sua a recebem de volta.',
            'Nas mesas de 8 jogadores, sai quem receber mais votos, até restarem 4 jogadores; aí volta a maioria. Não votar conta como se abster.',
            'No resultado, uma faixa preta mostra quem pediu a votação: “Pedida por …”. Uma votação final mostra no lugar uma fita vermelha de <b>Votação final</b>.',
          ],
        },
        {
          id: 'spy-guess',
          q: 'Como funciona o palpite do espião?',
          a: [
            'Um espião abre <b>Ações</b> e toca em <b>Adivinhar</b>. Ele tem 60 segundos para escolher o segredo numa lista de uns 30.',
            'Acertou: todos os espiões ganham. Errou, ou o tempo acabou: esse espião sai. Se era o último, os locais ganham.',
            'Todo mundo vê quem está adivinhando, então isso entrega você.',
            "Você adivinha sem ajuda: seu chat fica fechado até você confirmar.",
            'Com <b>Um só palpite</b> ligado (salas privadas e Noites de Jogos que o ligam), a equipe espiã tem uma única chance: errou, a equipe toda perde.',
          ],
        },
        {
          id: 'winning',
          q: 'Como cada lado ganha?',
          a: [
            'Os <b>locais</b> ganham eliminando todos os espiões, ou quando o último espião erra o palpite.',
            'Os <b>espiões</b> ganham acertando o palpite, quando o tempo da partida acaba, ou quando uma votação deixa tantos espiões quanto locais.',
            'Sair conta como ser eliminado na votação: se o último espião sair, os locais vencem; se locais demais saírem, os espiões vencem. Se isso acontecer antes de as perguntas terminarem (no Spy Sketch, na primeira rodada), a partida mostra “Sem resultado” e não conta.',
            "<b>Votação final:</b> com exatamente um espião no jogo, todos votam mais uma vez quando o tempo acaba, quando ninguém tem mais votações ou quando a última chance de pedir uma acaba. Peguem o espião e os locais ganham. Ela vale no Jogar online e é um ajuste nas salas privadas. Uma mesa do Jogar online ou uma Noite de Jogos também pode jogá-la com dois espiões: peguem qualquer um deles e os locais ganham.",
            "O resultado de uma votação final abre sob uma fita vermelha de <b>Votação final</b> que diz o motivo: “O relógio falou”, “Ninguém tem mais votações” ou “A última chance acabou”.",
            "<b>Informante</b> (salas privadas e Noites de Jogos que o ligam, com 2 espiões ou mais e 6 jogadores ou mais): a carta de um local aponta um espião. Quando os locais ganham por votação ou pelo palpite errado do último espião, os espiões, inclusive os pegos, têm 30 segundos para apontar o informante e roubar a vitória. Não vale depois de um erro com <b>Um só palpite</b>, nem quando o último espião sai.",
          ],
        },
        {
          id: 'special-rules',
          q: "Que regras especiais uma sala privada ou uma Noite de Jogos pode usar?",
          a: [
            "<b>Votações por partida:</b> cada jogador pode pedir 1, 2 ou 3 votações por partida, ou sem limite (sala nova começa com 1). Quando uma votação pega um espião, todo mundo que usou uma recebe uma de volta.",
            "Quando ninguém que ainda está no jogo tem votação sobrando, o relógio da partida pula para os últimos 5 segundos. Quando sobram tantas votações quanto espiões no jogo, ou menos, há uma última chance de 15 segundos para pedir uma. Se ninguém pedir uma a tempo, vem a votação final, se ela estiver ativa (veja como cada lado ganha, acima); se não, os espiões ganham.",
            "<b>Rastro de papel:</b> quando um espião sai por votação, todos veem como ele votou a partida inteira. Se os papéis não forem revelados na saída, o rastro espera o fim de jogo.",
            "<b>Um só palpite</b> e <b>Informante</b>: veja acima, no palpite do espião e em como cada lado ganha.",
            "<b>Falar em voz alta</b> tem sua própria resposta acima. No app, <b>Como jogar</b> › <b>Recursos e configurações</b> tem uma demo curta de cada regra.",
          ],
        },
      ],
    },
    {
      id: 'ways-to-play',
      title: 'Jeitos de jogar',
      items: [
        {
          id: 'play-online',
          q: 'O que é o Jogar online?',
          a: [
            '<b>Buscar partida</b> coloca você numa mesa de 4 ou 8 com outros jogadores. Todas as mesas seguem as mesmas regras padrão, sem anfitrião.',
            'Quem não conhece você vê sua cor de agente, como Agente Turquesa, nunca o seu nome.',
            'Você precisa de uma conta salva (e-mail confirmado, ou login com Apple ou Google) e ter 13 anos ou mais.',
            'Sair de uma partida depois que os papéis são distribuídos dá uma pausa curta no Jogar online.',
          ],
        },
        {
          id: 'private-rooms',
          q: 'Como funcionam as salas privadas?',
          a: [
            'As salas que os jogadores criam são privadas, para quem você conhece. Os amigos entram com o código da sala, o QR code ou o link de convite. Visitantes sem conta também entram.',
            'O anfitrião define as regras: jogo, espiões, tempos, votação e pacotes. O máximo vai até 21 jogadores, e <b>Trancar sala</b> impede que gente nova entre.',
            'Todos jogam com os pacotes que o anfitrião liberou.',
          ],
        },
        {
          id: 'game-night',
          q: 'O que é a Noite de Jogos?',
          a: [
            'Partidas online que organizamos, nas noites que anunciamos no app, normalmente das 20h às 22h no horário do leste dos EUA. Toque em <b>Jogar agora</b> no cartão da Noite de Jogos no início.',
            o.gnRewards
              ? 'Cada noite tem seus pacotes e ajustes: o (i) ao lado da noite mostra tudo. <b>Prêmios</b>, no cartão, mostra o que você ganha: Intel da Noite de Jogos e os títulos ★.'
              : o.gnRewardsRules
                ? 'Cada noite tem seus pacotes e ajustes: o (i) ao lado da noite mostra tudo.'
                : 'Cada noite tem seus pacotes, ajustes e títulos. O (i) ao lado da noite mostra os pacotes e ajustes, e <b>Prêmios</b>, no cartão, mostra os títulos.',
            'É grátis, e nada que você compra melhora suas chances. As regras completas: <gnr>regras da Noite de Jogos</gnr> (em inglês).',
          ],
        },
        ...(o.gnWeekly
          ? [
            {
              id: 'game-night-weekly',
              q: 'Quando é a Noite de Jogos?',
              a: [
                'Uma vez por semana: na sexta, e a mesma noite de novo no sábado, normalmente das 20h às 22h no horário do leste dos EUA.',
                'Venha em qualquer uma das noites, ou jogue nas duas.',
                'Anunciamos cada noite no app, no cartão da Noite de Jogos no início.',
              ],
            },
            ]
          : []),
        ...(o.gnRewards
          ? [
            {
              id: 'game-night-rewards',
              q: 'O que eu ganho na Noite de Jogos?',
              a: [
                '<b>Intel da Noite de Jogos</b> por cada partida que você termina: 500 por vitória, 200 por derrota ou empate. O fim de jogo mostra quanto você ganhou.',
                "Não há Intel da Noite de Jogos se você sair antes do fim, for removido da mesa ou não participar, se a partida começar depois do encerramento da Noite de Jogos (uma partida que começa a tempo e termina depois ainda paga), se nossas checagens de jogo limpo marcarem a partida, ou numa mesa com spybots. Uma partida que acaba antes porque alguém saiu não dá nada a ninguém.",
                '<b>Títulos ★</b> que vão somando: <b>★ Operativo</b> por cada partida da Noite de Jogos que você termina, <b>★ Herói Local</b> por cada vitória como local, <b>★ Espião Exímio</b> por cada vitória como espião e <b>★ Agente Duplo</b> por cada noite em que você ganha dos dois lados. Use o título com a contagem, como ★ Operativo ×12.',
                'O Intel da Noite de Jogos e os títulos ★ são só seus: não podem ser trocados, e o plano de membro não acrescenta nada a eles. Gaste o Intel em interceptações da Noite de Jogos.',
                ...(o.launch
                  ? []
                  : ['Os títulos das Noites de Jogos do beta viraram contagens nesses títulos. No reset antes do lançamento, o Intel da Noite de Jogos que você ganhou volta inteiro, mesmo que tenha gastado, e seus títulos ★ continuam. As interceptações da Noite de Jogos e os itens delas são apagados como todo o resto.']),
              ],
            },
            ]
          : []),
        {
          id: 'practice-game',
          q: "O que são o tutorial e as partidas de treino?",
          a: [
            "Em <b>Como jogar</b>, escolha Spy Talk ou Spy Sketch. <b>Passo 1, Tutorial:</b> uma partida guiada de 3 minutos contra agentes de IA. Jogue como local ou como espião: concluir qualquer um dos dois vale.",
            o.practiceMembers ? "<b>Passo 2, Partidas de treino</b> (para membros): partidas completas de 5 a 9 minutos contra agentes de IA, com nota de A a F. Elas são liberadas quando você conclui o tutorial daquele jogo, e dá para continuar de onde parou." : "<b>Passo 2, Partidas de treino:</b> partidas completas de 5 a 9 minutos contra agentes de IA, com nota de A a F. Elas são liberadas quando você conclui o tutorial daquele jogo, e dá para continuar de onde parou.",
            "Cada jogo tem quatro: como local ou como espião, numa mesa de 4 ou de 8. Tirar A nas oito dá o título <b>Nota dez</b> (só contas salvas).",
            o.launch ? "Concluir o tutorial de um jogo libera o Jogar online para esse jogo (com uma conta salva). As partidas de treino não são necessárias. A Noite de Jogos nunca pede." : "Hoje você não precisa de nenhum dos dois para jogar online. A Noite de Jogos nunca pede.",
          ],
        },
        ...(o.practiceMembers
          ? [
            {
              id: 'practice-members',
              q: 'Quem pode jogar as partidas de treino?',
              a: [
                'As partidas de treino são para membros: até 5 por dia. O dia começa à meia-noite UTC. Depois das suas 5, uma partida salva ainda pode ser continuada.',
                ...(o.practiceAi
                  ? ['Membros recebem comentários da IA sobre cada frase que escrevem, enquanto jogam, e uma nota de A a F em toda partida. Os comentários da IA são para quem tem 16 anos ou mais e toca em <b>Experimentar</b> quando o app pergunta; para os outros, quem avalia é o celular. Para parar, desative <b>Avaliar minhas frases de treino com IA</b> nos Ajustes.']
                  : []),
                'Os tutoriais continuam grátis para todos, e passar em um ainda conta para o Jogar online.',
              ],
            },
            ]
          : []),
        {
          id: 'languages',
          q: 'Dá para jogar com quem fala outros idiomas?',
          a: [
            'O SpySocial está em 10 idiomas: inglês, espanhol, russo, chinês simplificado, hindi, árabe, francês, bengali, português do Brasil e indonésio.',
            ...(o.onePool
              ? [
                  'Cada um vê a partida no seu idioma, segredo e dicas incluídos, então uma mesma mesa pode misturar idiomas.',
                  o.autoTranslation
                    ? 'Mensagens em outro idioma são traduzidas para o seu automaticamente. Para traduzir só quando tocar, desligue <b>Traduzir mensagens automaticamente</b> nos Ajustes.'
                    : 'Toque em <b>Traduzir</b> numa mensagem para ler no seu idioma.',
                ]
              : ['Numa sala privada, o anfitrião escolhe o idioma da partida para o segredo e as dicas.', ...(o.autoTranslation ? ['Mensagens em outro idioma são traduzidas para o seu automaticamente. Para traduzir só quando tocar, desligue <b>Traduzir mensagens automaticamente</b> nos Ajustes.'] : [])]),
            ...(o.autoTranslation ? ['O Jogar online pode oferecer adicionar seu idioma ao tradutor do próprio telefone. É opcional, e mantém as linhas em inglês do chat traduzidas quando nosso tradutor está ocupado.'] : []),
          ],
        },
      ],
    },
    {
      id: 'in-game',
      title: 'Durante a partida',
      items: [
        ...(o.roleReveal
          ? [
            {
              id: 'role-reveal',
              q: "Como funciona a revelação de papéis?",
              a: [
                "As partidas online têm revelação de papéis: Jogar online, Noites de Jogos e salas privadas em que o anfitrião escolheu <b>Online</b>. Toque na sua carta: as luzes se apagam e um holofote mostra seu papel.",
                "Os <b>locais</b> veem o segredo e quantos espiões estão entre eles: no Spy Talk, o local e a imagem dele (todo local dos nossos pacotes tem uma); no Spy Sketch, só a palavra.",
                "Quem é do time dos <b>espiões</b> recebe uma carta escura. Na Máfia, os outros espiões aparecem ao seu lado, com o nome e uma etiqueta vermelha de Espião. No Clássico, os espiões não se conhecem, então os outros aparecem como <b>Desconhecido</b>.",
                "Sua carta fica na parte de baixo da tela a partida toda, com a mesma cara: a de um local mantém a imagem do lugar, e a de um espião na Máfia mostra em vermelho o nome dos outros espiões.",
                "Na Máfia com mais de um espião, toque em <b>CANAL DOS ESPIÕES</b> para conversar em particular com os outros espiões: na sua carta antes de começar, depois na barra de cima, ou ao lado do chat numa votação. Basta um toque; um número mostra as mensagens novas, e uma mensagem de outro espião diz “… está tentando falar com você”.",
                "A etiqueta vermelha fica nas fotos dos outros espiões a partida toda. Os locais nunca veem as etiquetas, o botão nem o chat.",
                "Numa chamada de voz? Ative <b>Mesmo som para todos os papéis</b> (Ajustes, Som e música) para o microfone não captar o som de revelação de um espião. O app só pergunta isso (<b>Jogando em chamada?</b>) numa sala privada <b>Online</b>.",
              ],
            },
            {
              id: 'poker-face',
              q: "Online ou Mesmo lugar: o que é Cara de paisagem?",
              a: [
                "Quando um anfitrião cria uma sala privada, o app pergunta <b>Onde vocês vão jogar?</b> Escolha <b>Online</b> se cada um estiver no seu celular, esteja onde estiver, inclusive numa chamada: revelação completa dos papéis e chat dos espiões a um toque. Escolha <b>Mesmo lugar</b> se estiverem em volta de uma mesa: isso ativa a <b>Cara de paisagem</b>.",
                "Com a Cara de paisagem, todas as cartas de papel ficam iguais: sem carta escura de espião, sem etiquetas vermelhas de Espião, e nada acende quando chega mensagem dos espiões. Os espiões abrem o chat segurando a própria carta. Numa votação, eles seguram o botão do chat.",
                "Por quê: numa mesma mesa, uma olhada no celular do vizinho poderia entregar o papel dele. A Cara de paisagem evita descuidos, não trapaças. O porém: fica mais difícil reconhecer os outros espiões e conversar com eles.",
                "O anfitrião pode mudar isso entre uma partida e outra em <b>Regras</b>, no lobby, e quem entra vê <b>“Cara de paisagem” está ativada</b>. Nas Noites de Jogos, isso é definido para cada noite. Ela não existe no Jogar online.",
              ],
            },
            ]
          : []),
        {
          id: 'voice-chat',
          q: "Tem chat de voz? Para que serve o microfone?",
          a: [
            "O SpySocial não tem chat de voz: ninguém ouve você pelo app. O microfone transforma o que você diz em texto, para você não precisar digitar.",
            "Toque no microfone, fale e toque de novo para parar. Funciona nos chats da partida e do lobby e nas perguntas do Spy Talk.",
            "Quem faz isso é o reconhecimento de voz do seu celular (ou do seu navegador). Recebemos só o texto, nunca o áudio. Detalhes: <privacy>Política de privacidade</privacy>.",
            "Para conversar durante a partida, faça uma chamada de voz à parte, no Discord ou pelo telefone, por exemplo.",
            ...(o.roleReveal ? ["Numa chamada, o anfitrião escolhe <b>Online</b> em <b>Onde vocês vão jogar?</b>, e cada um pode ativar <b>Mesmo som para todos os papéis</b> (Ajustes, Som e música) para nenhum microfone captar o som de revelação de um espião."] : []),
            "Numa sala privada de Spy Talk, <b>Falar em voz alta</b> deixa todos perguntarem e responderem falando, sem digitar.",
          ],
        },
        {
          id: 'wax-seal',
          q: 'O que é o Selo de Cera?',
          a: [
            'O selo no alto à esquerda da tela do jogo guarda <b>Sair</b> e <b>Info</b>, dobrados para ninguém sair sem querer. <b>Chat</b> e <b>Notas</b> têm botões próprios no alto à direita e abrem com um toque. Um número no Chat indica mensagens novas.',
            'O selo aparece em todas as telas da partida: a votação e o resultado, o palpite do espião e o fim de jogo.',
            'Na votação, no palpite do espião e no fim de jogo, <b>Info</b> explica a tela em que você está.',
            'As partidas de treino também têm o selo, com <b>Encerrar</b> e <b>Info</b> na votação, no palpite e no fim de jogo. A partida espera enquanto o Info estiver aberto.',
            'Toque na foto de um jogador para perguntar a ele no chat. Deslize uma mensagem para responder.',
            'Mentir e blefar faz parte do jogo. Falar o segredo direto, não.',
          ],
        },
        {
          id: 'notes',
          q: 'Como funcionam as notas?',
          a: [
            'Toque e segure a foto de um jogador para abrir suas notas sobre ele.',
            'O <b>Quadro</b> separa os jogadores em Suspeito, Não sei e Confio. No Spy Talk, o <b>Histórico</b> mostra o que cada um perguntou e respondeu.',
            'Os espiões têm um quadro de pistas: <b>Minhas pistas</b>, com Talvez, É e Não é.',
            'Suas notas são privadas, ficam no seu celular e são apagadas depois da tela de fim de jogo.',
          ],
        },
        {
          id: 'leave-rejoin',
          q: 'Posso sair de uma partida e voltar?',
          a: [
            'O botão <b>Sair</b> oferece <b>Dar uma saída</b>, que guarda seu lugar (o cartão no início tem <b>Voltar</b>), ou <b>Sair de vez</b>: você não volta a essa partida e, se ela contar, é uma derrota para você.',
            'O anfitrião pode tocar em <b>Encerrar a partida para todos</b>. Aí ninguém ganha.',
            'Nas mesas do Jogar online, sair depois da distribuição dá uma pausa curta no Jogar online.',
          ],
        },
      ],
    },
    {
      id: 'friends',
      title: 'Amigos e grupos',
      items: [
        {
          id: 'add-friends',
          q: 'Como adiciono amigos?',
          a: [
            "<b>Pessoalmente:</b> mostre seu <b>código de amigo</b> e deixe a pessoa escanear no SpySocial. Um código novo aparece a cada 5 minutos e vale para no máximo 3 leituras, então um print logo para de funcionar.",
            '<b>De uma partida privada</b> que vocês jogaram juntos nas últimas 24 horas.',
            '<b>Só adultos:</b> de uma mesa pública, ou pelo nome de usuário exato, se a pessoa permitir.',
            'A amizade é dos dois lados. Você pode remover ou bloquear um amigo quando quiser, e ele não fica sabendo. Não existem mensagens privadas.',
          ],
        },
        {
          id: 'parties',
          q: 'O que é um grupo?',
          a: [
            'Um líder e amigos que jogam juntos, até 21 pessoas no total. É preciso ser membro para começar. ' + (o.partyNoMember ? "Se o líder sair, a liderança passa para um membro." : "Se o líder sair, a liderança passa primeiro para um membro."),
            ...(o.partyLeaderLapse ? ['Se o líder deixar de ser membro, o grupo é encerrado para todos; a liderança não passa para ninguém. Uma partida em andamento vai até o fim e, depois, cada um busca sozinho.'] : []),
            ...(o.partyNoMember ? ['Se o líder sair e ninguém que ficou for membro, o grupo é encerrado para todos.'] : []),
            'Nas mesas do Jogar online e nas Noites de Jogos, o grupo ocupa no máximo meia mesa, marcado para todos: até 2 numa mesa de 4, até 4 numa mesa de 8.',
            'Numa mesa de 12 lugares da Noite de Jogos, até 6. Membros do grupo que procuram partida sozinhos também contam: juntos, nunca mais que meia mesa.',
            'Para sentar na mesma mesa, busquem pelo grupo: <b>Jogar online</b> sozinho é uma busca individual. Depois de uma partida do Jogar online, <b>Voltar ao seu grupo</b> leva você de volta a ele.',
            'Sair de uma partida antes do fim dá a pausa de costume do Jogar online, e seu grupo não pode buscar mesa até ela acabar. Enquanto você tem lugar numa partida, continua no grupo mesmo se o telefone entrar em repouso.',
            'Qualquer grupo pode abrir uma sala privada junto, e um grupo grande demais para uma mesa joga lá.',
            'O chat do grupo segue as mesmas regras de todo o chat. Para denunciar uma mensagem, toque e segure nela.',
          ],
        },
        {
          id: 'privacy-friends',
          q: 'Quem pode ver que estou online, ou me convidar?',
          a: [
            'Você escolhe em <b>Privacidade e amigos</b>: quem pode adicionar você, se os amigos veem você online e quem pode convidar você para salas e grupos.',
            'Os amigos veem só Online, Jogando online, Em uma sala privada ou Na Noite de Jogos, nunca qual sala. Ninguém vê sua lista de amigos.',
            'Adultos podem ter perfil público e seguidores. Menores de 18, não.',
          ],
        },
      ],
    },
    {
      id: 'trading',
      title: 'Trocas',
      items: [
        {
          id: 'who-can-trade',
          q: 'Quem pode trocar, e o quê?',
          a: [
            'Você troca com amigos, dentro do app. Precisa de uma conta com pelo menos 7 dias, e-mail confirmado e 3 partidas contadas (partidas terminadas que entram nas suas estatísticas, com pelo menos outras 2 contas salvas em outros celulares).',
            "Os 7 dias contam a partir de quando a conta foi salva: o tempo como visitante não conta.",
            ...(o.launch ? [] : ['Durante o teste beta, até 7 de dezembro, as regras de idade da conta, partidas contadas e novo aparelho estão desligadas: qualquer testador pode trocar assim que confirmar o e-mail.']),
            ...(o.launch ? ["Testadores que jogaram 3 partidas contadas durante o teste beta não precisam de mais 3."] : ["Testadores que jogarem 3 partidas contadas durante o teste beta não vão precisar de mais 3 depois do lançamento."]),
            'Cada lado oferece até 10 itens, e os dois confirmam antes da troca. Trocas grandes pedem um código que mandamos por e-mail.',
            ...(o.interceptsInTrades ? ['Adultos também podem colocar Interceptações fechadas numa troca: escolha quantas de cada nível. Cada uma conta como um dos 10 itens.'] : []),
            ...(o.interceptsInTrades && !o.launch ? ['Durante o teste beta, até 7 de dezembro, qualquer Interceptação fechada pode entrar numa troca, não importa como você a conseguiu. De qualquer forma, as Interceptações recomeçam do zero no lançamento.'] : []),
            'O que você coloca numa troca aberta fica reservado para ela: não pode ir para outra troca nem para o Mercado Negro ao mesmo tempo. Se o Intel de uma troca for gasta antes de a troca acontecer, aparece um aviso naquele lado, e a troca não pode acontecer até a quantia ser reduzida.',
            'O app marca quais itens dá para trocar. O plano de membro e o que ele inclui, as recompensas de nível e os itens dos jogos de arcade nunca dão.' + (o.launch ? (o.gnRewardsRules ? " Nem o que vem de um código, nem o que nós ou nossa equipe damos a você: fica na sua conta. O Intel nunca fica preso a uma conta, venha de onde vier." : " Nem o que vem de um código, nem o que nós ou nossa equipe damos a você, incluindo uma Escolha do desenvolvedor: fica na sua conta. O Intel nunca fica preso a uma conta, venha de onde vier.") : ''),
            'Intel só pode ser trocado entre adultos.',
            ...(o.launch ? [] : ["Durante o teste beta, até 7 de dezembro, testadores adultos também trocam Intel." + (o.intelZero ? " Logo antes do lançamento, o Intel de toda conta vai a 0, inclusive o ganho no teste." : " Em 7 de dezembro, todo o Intel trocado volta: quem deu recebe de volta, e cada um fica só com o Intel que ganhou."), "A partir de 7 de dezembro, interceptações de um código ou presente, o que sair delas e o que você conseguir com elas na Troca ficam na sua conta: dá para usar, mas não para trocar nem vender."]),
            'Comprar ou vender itens, Intel ou contas por dinheiro de verdade é contra as regras.',
          ],
        },
        {
          id: 'trade-protection',
          q: 'O que é a proteção de 7 dias? Posso desfazer uma troca?',
          a: [
            'O que você recebe numa troca fica protegido por 7 dias. Dá para usar um item na hora, mas ainda não dá para trocá-lo, triturá-lo nem usá-lo numa Troca, e o Intel recebido ainda não pode ser gasto.',
            ...(o.interceptsInTrades ? ['Uma Interceptação fechada que você recebe fica lacrada nesses 7 dias: ainda não dá para abrir, trocar nem anunciar.'] : []),
            'Nesses 7 dias, você pode reverter suas trocas, uma vez a cada 90 dias. Isso reverte todas as suas trocas protegidas e pausa suas trocas por 30 dias.',
            "Reverter também desfaz suas compras e vendas nos Achados raros que ainda estão nos 3 dias de proteção.",
            'Depois de 7 dias, a troca é definitiva. Também podemos reverter uma troca por roubo de conta ou fraude.',
          ],
        },
        {
          id: 'trade-deleted-account',
          q: 'E se alguém excluir a conta depois de uma troca?',
          a: [
            'Se o outro jogador excluir a conta dentro dos 7 dias, a troca é desfeita: você recebe de volta o que deu, e o que recebeu dele é removido.',
            'Se você excluir a sua dentro dos 7 dias, o que você recebeu volta para quem deu.',
          ],
        },
        {
          id: 'trading-under-18',
          q: 'Menores de 18 podem trocar?',
          a: [
            'Sim, com limites: só item por item, e só com amigos adicionados pessoalmente com um código de amigo.',
            'Sem presentes, sem Intel, sem interceptações fechadas e sem comprar nem vender no Mercado Negro.',
            'No iPhone e no iPad, menores de 18 não podem trocar até sair uma versão do app que peça o consentimento de um responsável pela Apple.',
          ],
        },
        {
          id: 'trading-paused',
          q: 'Por que minhas trocas estão pausadas?',
          a: [
            'As trocas pausam por um tempo depois de mudar o e-mail ou a forma de login, depois de entrar num aparelho novo, depois de reverter suas trocas (30 dias) ou quando você mesmo as tranca.',
            'A pausa por aparelho novo dura 24 horas; a por mudança de e-mail ou de login, 3 dias.',
            ...(o.launch ? [] : ['Durante o teste beta, até 7 de dezembro, entrar em um novo aparelho ou mudar o e-mail ou a forma de entrar não pausa as trocas.']),
            'Isso protege seus itens se outra pessoa entrar na sua conta.',
            'Também podemos pausar nós mesmos as trocas de uma conta, para protegê-la ou enquanto verificamos uma fraude.',
            "Uma verificação de jogo limpo pausa as trocas e o Mercado Negro enquanto durar. Com a reputação Banida, trocas, presentes e o Mercado Negro ficam fechados até ela se recuperar: veja <b>Reputação</b> em Ajustes.",
            'Qualquer uma dessas pausas, inclusive o seu próprio bloqueio, fecha na hora suas ofertas e anúncios abertos no Mercado Negro. O mesmo acontece com um banimento, uma suspensão ou uma verificação de jogo limpo. Os itens voltam para você, o Intel de uma oferta de compra espera você coletar, e as ofertas de outros jogadores nos seus anúncios voltam para eles. Nada reabre quando termina: é preciso anunciar de novo.',
            'Se desconectarmos sua conta em todos os aparelhos sem pausar as trocas, suas ofertas e anúncios do Mercado Negro feitos antes disso mostram <b>Em espera</b> e não são executados. Quando seu novo login puder trocar, toque em <b>Colocar de volta</b> em cada um que for seu, ou pare-o.',
          ],
        },
      ],
    },
    {
      id: 'black-market',
      title: 'Mercado Negro e Achados raros',
      items: [
        {
          id: 'what-is-black-market',
          q: 'O que são o Mercado Negro e os Achados raros?',
          a: [
            'O Mercado Negro, no <b>Cofre</b>, é onde adultos compram e vendem itens trocáveis por Intel, nunca por dinheiro.',
            '<b>Itens:</b> faça uma oferta de compra ou de venda pelo preço que quiser. Ela fecha com o melhor preço do outro lado.',
            '<b>Achados raros:</b> cada item Único é anunciado sozinho, com um preço, e quem vende pode aceitar ofertas menores.',
            'Interceptações fechadas também são vendidas lá, por nível. Ninguém vê quem compra ou quem vende.',
          ],
        },
        {
          id: 'black-market-who',
          q: 'Quem pode usar o Mercado Negro?',
          a: [
            'Adultos que podem trocar: conta com pelo menos 7 dias, e-mail confirmado, 3 partidas contadas e trocas sem pausa.',
            "Os 7 dias contam a partir de quando a conta foi salva: o tempo como visitante não conta.",
            ...(o.launch ? [] : ['Durante o teste beta, até 7 de dezembro, as regras de idade da conta e de partidas contadas também estão desligadas aqui.']),
            'Menores de 18 podem olhar, mas não podem comprar, vender nem fazer ofertas.',
            ...(o.launch ? [] : [o.testerMarket ? 'Beta 2: de 9 a 16 de novembro, adultos que podem trocar compram e vendem aqui de verdade. Toda venda feita durante o teste é desfeita em 16 de novembro: quem comprou recebe de volta o Intel que pagou, e quem vendeu devolve o que recebeu.' : 'O Intel começa a circular lá no lançamento da 2.2, em 8 de dezembro. Até lá, dá para dar uma olhada.']),
          ],
        },
        {
          id: 'black-market-fees',
          q: 'Quais são as taxas, os limites e o preço mínimo?',
          a: [
            'Cada item vendido paga uma taxa de 2% (no mínimo 1 e no máximo 5.000 de Intel), que sai do jogo.',
            'Nenhuma oferta pode ficar abaixo do preço mínimo de um item: o que uma cópia rende ao ser triturada. Para uma interceptação fechada, é a média do seu nível.',
            'Membros podem ter 8 ofertas abertas ao mesmo tempo; os outros, 4. Enquanto uma oferta está aberta, o Intel ou os itens dela ficam reservados (você ainda pode usar os itens).',
            "Um preço pode chegar a 1.000.000 de Intel por cópia, e uma oferta pode ser de até 1.000 cópias.",
            "Nos Achados raros, você pode anunciar até 25 itens Únicos ao mesmo tempo e ter até 20 ofertas abertas em anúncios de outros jogadores.",
            'Dá para cancelar uma oferta quando quiser e pegar o que sobrou.',
          ],
        },
        ...(o.rarefindsOffers
          ? [
              {
                id: 'rare-finds-offers',
                q: "Como funcionam as ofertas nos Achados raros?",
                a: [
                  ...(o.appU61 ? ["O vendedor escolhe quanto abaixo do preço dá para oferecer: até 5%, 10% ou 15%, ou nenhuma oferta."] : []),
                  "O Intel da sua oferta fica reservado enquanto ela espera. Se o vendedor não responder em 24 horas, a oferta termina e o Intel volta.",
                  "Você pode retirar uma oferta depois que ela esperar 30 minutos.",
                  ...(o.appU61 ? ["O vendedor pode aceitar, recusar ou fazer uma contraoferta, com um preço entre a sua oferta e o dele. A contraoferta não reserva o seu Intel: compre por ele, recuse ou faça outra contraoferta."] : []),
                  "Quando um vendedor recusa uma oferta, ninguém mais pode oferecer tão pouco naquele anúncio: a oferta mínima sobe.",
                  ...(o.appU61 ? ["O vendedor vê a nova oferta mínima. Se as recusas a levarem até o preço, o anúncio não aceita mais ofertas: só Comprar já."] : []),
                  "Se muitas das suas ofertas forem recusadas e quase nenhuma aceita, você fica sem poder fazer ofertas novas por até 3 dias.",
                  ...(o.rarefindsOfferPush ? ["Com as notificações do Mercado Negro ligadas, você recebe uma quando o vendedor faz uma contraoferta e quando sua oferta é recusada ou termina."] : []),
                ],
              },
            ]
          : []),
        {
          id: 'black-market-protection',
          q: 'As vendas do Mercado Negro são protegidas?',
          a: [
            'Uma venda em Itens é definitiva na hora.',
            'Um Único comprado nos Achados raros fica protegido por 3 dias: não pode ser trocado, anunciado, triturado nem usado numa Troca, e o Intel de quem vendeu espera. Nesse tempo a venda pode ser revertida, como uma troca.',
            'Se quem compra ou quem vende excluir a conta nesses 3 dias, a venda é desfeita: o comprador recebe o Intel de volta, ou o vendedor recebe o Único de volta.',
          ],
        },
        {
          id: 'archive-holder',
          q: "Os outros podem ver que tenho um Único?",
          a: [
            "Cada Único tem sua própria página em archive.spysocial.app. Quem o tem hoje aparece como “Nas mãos de @usuário”, com link para o perfil, só se for adulto com perfil público.",
            "Para todos os outros, inclusive menores de 18, aparece “Dono não divulgado”.",
            "Para esconder seu nome, deixe seu perfil privado em <b>Privacidade e amigos</b>. Ele sai do Arquivo em cerca de um minuto.",
          ],
        },
      ],
    },
    {
      id: 'rewards',
      title: 'Interceptações e Intel',
      items: [
        {
          id: 'intercepts',
          q: 'O que são interceptações?',
          a: [
            'Recompensas lacradas que você ganha jogando. Cada uma abre num item cosmético aleatório, como um visual para o seu agente ou uma comemoração.',
            'Nunca são vendidas por dinheiro, e ser membro não dá mais nem chances melhores.',
            o.launch ? 'Antes de abrir ou comprar uma, o app mostra as chances exatas em <b>Chances</b>.' : 'Antes de abrir uma, o app mostra as chances exatas em <b>Chances</b>.',
          ],
        },
        {
          id: 'intercept-tiers',
          q: 'Quais são os níveis das interceptações?',
          a: [
            'Cinco níveis, do mais baixo ao mais alto: <b>Restrito</b>, <b>Confidencial</b>, <b>Secreto</b>, <b>Ultrassecreto</b> e <b>Enigma</b>.',
            'O nível é definido quando você ganha. Quanto mais alto, melhores as chances.',
            "Um <b>Único</b> é uma cópia exclusiva: uma gema de prisma, uma moldura de folha arco-íris, um codinome e um número que nenhuma outra cópia tem. Cada cópia mantém suas próprias cores por dentro.",
          ],
        },
        {
          id: 'earn-intercepts',
          q: 'Como ganho interceptações?',
          a: [
            '<b>Vitórias:</b> a cada 10 vitórias no Jogar online, você ganha 5 interceptações, uma delas de nível Secreto ou melhor.',
            "<b>Diária:</b> sua primeira partida do dia no Jogar online dá uma. A cada 7 dias seguidos vem mais uma Secreto ou melhor, e a cada 30 dias, uma Enigma.",
            ...(o.gnRewards ? ["<b>Noite de Jogos:</b> suas partidas lá dão Intel da Noite de Jogos, que você usa para pegar interceptações da Noite de Jogos (abaixo)."] : o.gnRewardsRules ? [] : ["<b>Noite de Jogos:</b> ganhe uma partida lá, como local ou espião, e você recebe uma Enigma, uma por noite."]),
            `<b>Códigos e presentes:</b> um código de um criador ou nosso vale uma vez por conta, e as interceptações dele são liberadas depois da sua primeira partida contada no Jogar online. Também damos algumas de presente.${o.launch ? " Interceptações de código ou de presente, o que sai delas e o que você consegue com elas na Troca são só seus: não podem ser trocados, vendidos nem dados, não importa quantas partidas você jogue. Você ainda pode abri-las, usar o que sair, fazer Trocas e triturar repetidos. Triturar um repetido dá Intel comum." : ''}`,
            'Salas privadas não dão interceptações.',
            ...(o.launch
              ? []
              : ['Antes de a 2.2 abrir para todos, as interceptações recomeçam do zero: as ganhas em versões de teste são apagadas. O Pin beta e o que foi comprado numa loja continuam.']),
          ],
        },
        ...(o.gnRewards
          ? [
            {
              id: 'game-night-intercepts',
              q: 'O que são as interceptações da Noite de Jogos?',
              a: [
                'Interceptações que você pega com Intel da Noite de Jogos, no cartão da Noite de Jogos no <b>Cofre</b>: <b>Nível 1</b> por 400 (qualquer raridade, até Lendário), <b>Nível 2</b> por 800 (Incomum ou melhor) e <b>Nível 3</b> por 10.000 (Épico ou melhor, com chance de um Único).',
                'O que sai delas é da coleção própria da Noite de Jogos, <b>After Hours</b>: 14 itens de salão de cartas para o seu agente que nenhuma outra interceptação tem. Como em toda interceptação, o app mostra as chances exatas.',
                'Uma comprada espera em <b>Para abrir</b>. Ao contrário do Intel da Noite de Jogos, as interceptações e o que sai delas podem ser trocados como qualquer outra coisa que você ganha.',
              ],
            },
            ]
          : []),
        {
          id: 'duplicates',
          q: 'O que faço com os repetidos?',
          a: [
            '<b>Triture</b> uma cópia repetida por Intel, no valor que o app mostra.',
            '<b>Troca:</b> 5 cópias repetidas de uma raridade dão 1 item aleatório da raridade seguinte, e 10 cópias Lendárias repetidas dão um Único.' + (o.launch ? " Se houver um presente entre elas, o que você receber também será só seu." : ''),
            'Só contam os repetidos, nunca sua primeira cópia nem um Único.',
            'Uma cópia que você comprou ou recebeu numa troca conta como repetida se você tem outra cópia desse item. Sua única cópia sempre fica.',
          ],
        },
        {
          id: 'intel',
          q: 'O que é o Intel?',
          a: [
            'A moeda que você ganha jogando: com suas partidas, sua primeira partida do dia e sua sequência diária, e triturando cópias repetidas.',
            'Sua sequência: uma partida de Jogar online por dia a mantém. Uma partida que você começa antes do novo dia também a mantém, mesmo se terminar depois.',
            o.launch ? 'O Intel nunca é vendido e não vale dinheiro. Adultos gastam no Mercado Negro e podem trocá-lo com outros adultos.' : 'O Intel nunca é vendido e não vale dinheiro. Adultos podem trocá-lo com outros adultos e gastá-lo no Mercado Negro a partir do lançamento da 2.2, em 8 de dezembro, ou em um teste cujas vendas são desfeitas.',
            'Cada mudança no seu Intel é uma linha no seu registro de Intel, com o motivo. Veja o seu em <b>Histórico de Intel</b>, em “Como o Intel funciona”, na atualização mais recente do app.',
            'No <b>Cofre</b>, seu Intel tem um bloco próprio, uma pilha que cresce com o valor. Toque nele para ver o ganho hoje, o ganho no total e o gasto no total. O Intel preso numa oferta aberta do Mercado Negro conta como gasto até voltar.',
          ],
        },
        {
          id: 'verifying',
          q: 'Por que uma recompensa diz “Verificando”?',
          a: [
            'A partir de 8 de dezembro de 2026, nossas checagens de jogo limpo podem segurar as recompensas novas de uma conta por até 72 horas enquanto alguém da equipe olha um sinal forte de farm, bots ou trapaça.',
            'Você pode pedir uma revisão no app.',
          ],
        },
        {
          id: 'missing-item',
          q: 'Sumiu um item ou uma interceptação',
          a: [
            'Ele pode estar reservado por uma oferta aberta no Mercado Negro. Dá para cancelar a oferta quando quiser.',
            'Talvez você o tenha triturado ou usado numa Troca.',
            'Uma troca revertida o devolve ao jogador que o deu.',
            'Quando um plano de membro termina ou é reembolsado, o que vinha com ele deixa de estar disponível.',
            ...(o.launch ? [] : ['As interceptações de versões de teste e seus itens são apagados antes de a 2.2 abrir para todos.']),
            'Nada disso? Escreva para <email/> com seu nome de usuário, o nome do item e quando você o viu pela última vez.',
          ],
        },
        {
          id: 'tester-rewards',
          q: 'Onde estão minhas recompensas do beta?',
          a: [
            ...(o.testerGiftGame
              ? [
                o.launch
                  ? 'Elas foram adicionadas no lançamento da 2.2 e são suas. Todos da lista de testadores ganharam o <b>Pin beta</b> e o título <b>Beta tester</b>. Um cartão de agradecimento aparece quando você abre o app pela primeira vez após o lançamento.'
                  : 'Elas chegam no lançamento da 2.2, em 8 de dezembro, num cartão de agradecimento quando você abre o app, e são suas. Todos da lista de testadores ganham o <b>Pin beta</b> e o título <b>Beta tester</b>.',
                o.launch
                  ? "Quem terminou pelo menos uma partida com outros jogadores antes de 7 de dezembro (jogada até o fim, em qualquer sala, então aparece nas Estatísticas; partidas de treino não contam) também ganhou o título <b>Teste de campo</b>, 10 interceptações de cada nível e 1 mês como membro."
                  : "Termine pelo menos uma partida com outros jogadores antes de 7 de dezembro (jogada até o fim, em qualquer sala, então aparece nas suas Estatísticas; partidas de treino não contam) e você também ganha o título <b>Teste de campo</b>, 10 interceptações de cada nível e 1 mês como membro.",
                o.testerInterceptsTradable
                  ? 'O <b>Pin beta</b>, o título <b>Teste de campo</b> e as interceptações de agradecimento podem ser trocados como tudo o que você ganha.'
                  : 'O <b>Pin beta</b> e o título <b>Teste de campo</b> podem ser trocados como tudo o que você ganha; como outros presentes, as interceptações de agradecimento ficam na sua conta.',
              ]
              : [
                o.launch
                  ? 'Elas foram adicionadas no lançamento da 2.2 e são suas: o <b>Pin beta</b>, os títulos <b>Beta tester</b> e <b>Teste de campo</b>, 10 interceptações de cada nível e 1 mês como membro. Um cartão de agradecimento aparece quando você abre o app pela primeira vez após o lançamento.'
                  : 'Elas chegam no lançamento da 2.2, em 8 de dezembro, num cartão de agradecimento quando você abre o app, e são suas: o <b>Pin beta</b>, os títulos <b>Beta tester</b> e <b>Teste de campo</b>, 10 interceptações de cada nível e 1 mês como membro.',
              ]),
            ...(o.launch ? [] : ['O que você tem agora numa versão de teste é para testar e será apagado antes do lançamento. Suas recompensas não dependem disso, desde que você continue na mesma conta salva.']),
            'Para usar o pin: <b>Conta</b>, <b>Editar agente</b>, <b>Acessórios</b>, <b>Pin beta</b>, <b>Salvar</b>.',
            'Faltou algo? Escreva para <email/> com seu nome de usuário e o e-mail que você usou durante o teste. Uma conta de visitante não está na lista, então o mais comum é ser outra conta.',
            ...(o.launch ? [] : ["O Beta 3 é na terça-feira, 24 de novembro, das 20h às 21h no horário do leste dos EUA (dá para entrar a partir das 19h30). Se o e-mail da sua vaga fala do agradecimento de US$ 10: jogue pelo menos uma partida naquela noite e envie a pesquisa até sexta-feira, 27 de novembro, às 23h59 no horário do leste, e os US$ 10 chegam por PayPal até 1º de dezembro. Um testador também ganha um vale-presente de US$ 50 pelo relato ou pela ideia mais útil, escolhido por nós."]),
          ],
        },
        ...(o.launch
          ? []
          : [
            {
              id: 'beta-reset',
              q: "O app diz que tudo será zerado antes do lançamento. O que isso significa?",
              a: [
                "O SpySocial ainda está em teste. Antes do lançamento em 8 de dezembro, itens, interceptações, Intel, negociações do Mercado Negro e trocas serão zerados, e todo mundo começa do zero.",
                "Sua conta, seus amigos e seus pacotes continuam, assim como seu XP, seu nível, suas conquistas, suas estatísticas, suas notas nas partidas de treino, os títulos de códigos e tudo o que você comprou na App Store ou no Google Play.",
                ...(o.gnRewards ? ["Seus títulos ★ da Noite de Jogos continuam, e você recebe de volta todo o Intel da Noite de Jogos que ganhou, mesmo se gastou."] : []),
                "Os planos de membro dados para o teste terminam no lançamento." + (o.intelZero ? " Sua sequência recomeça do dia 0." : ''),
                "Quem testou vai ganhar uma recompensa especial pela ajuda.",
                "O aviso aparece no Cofre, no Mercado Negro e nas telas de trocas. Toque nele para ler mais, ou no X para escondê-lo naquele celular.",
              ],
            },
            ]),
      ],
    },
    {
      id: 'membership',
      title: 'Membros',
      items: [
        {
          id: 'membership-includes',
          q: 'O que o plano de membro inclui?',
          a: [
            ...(o.purchases ? [] : ['O plano de membro começa a ser vendido com a versão 2.2.']),
            'Todos os pacotes premium, inclusive os novos. Todo mundo joga com eles nas salas em que você é o anfitrião e na sua mesa de Jogar online.',
            'Crie seus próprios pacotes com o criador e compartilhe na comunidade.',
            '+50% de XP em toda partida e salas só para membros no Jogar online.',
            ...(o.practiceMembers ? ['Partidas de treino, até 5 por dia, com notas de A a F e comentários da IA.'] : []),
            'A moldura, a etiqueta e o título do seu nível. Você pode liderar um grupo e ter 8 ofertas abertas no Mercado Negro em vez de 4.',
            'Nunca muda como você joga ou pontua. Os pacotes grátis continuam grátis para todos.',
          ],
        },
        {
          id: 'pack-creator',
          q: "Como funciona o criador de pacotes?",
          a: [
            "Sendo membro (a partir de 13 anos), abra <b>Pacotes</b> e depois o criador de pacotes. Um pacote precisa de 30 a 200 itens para ser jogado ou enviado à <b>Comunidade</b>.",
            "Seus pacotes valem nas salas privadas que você comanda enquanto for membro.",
            "Envie um para a <b>Comunidade</b> e nós o analisamos em até 72 horas: primeiro uma verificação automática lê o texto, depois uma pessoa decide. Ele mostra <b>Em análise</b>, depois <b>Na comunidade</b>, ou <b>Precisa de ajustes</b> com o motivo: ajuste e envie de novo.",
            "Pacotes populares podem ficar <b>Em destaque</b>. Outros membros adicionam pacotes da comunidade a <b>Meus pacotes</b> para jogar nas próprias salas.",
            "Jogadores com menos de 18 anos não recebem nossa resposta entre 22h e 7h.",
          ],
        },
        {
          id: 'membership-plans',
          q: 'O que são Agente, Elite e Mestre-espião?',
          a: [
            '<b>Agente</b> é o plano mensal, <b>Elite</b> o plano anual, e <b>Mestre-espião</b> é o Vitalício: um pagamento só, sem renovação.',
            'Mestre-espião acrescenta as três molduras de metal, o título Cartão ouro, a comemoração Tempestade dourada e itens do Vitalício para o seu agente.',
            'Vitalício dura enquanto oferecermos o SpySocial, não a sua vida toda. Não há teste grátis, e o plano de membro não é compartilhado pelo Compartilhamento Familiar.',
          ],
        },
        ...(o.membershipSwitch
          ? [
            {
              id: 'membership-switch',
              q: 'Posso mudar entre o plano mensal e o anual?',
              a: [
                'Sim, no app: abra o <b>Cofre</b> e depois <b>Membros</b>. No mensal, toque em <b>Subir para Elite</b> (anual) ou <b>Subir para Mestre-espião</b> (Vitalício). No anual também aparece <b>Mudar para o mensal</b>: a moldura, o título e a etiqueta Elite viram os de Agente, e as outras vantagens continuam.',
                'Você nunca paga duas vezes. No Google Play, o novo plano começa na hora e o tempo que você já pagou vira tempo no novo plano. Na App Store, a Apple decide quando ele começa, muitas vezes na sua próxima renovação, e credita o tempo que você já pagou.',
                'Um plano cobrado pela outra loja é mudado nessa loja: comprar outro plano aqui faria você pagar duas vezes.',
                ...(o.googlePassStop
                  ? ['Quando você compra o Vitalício, um plano mensal ou anual cobrado pelo Google Play para de renovar sozinho: ele fica com você até a data de término, e nada mais é cobrado. A Apple não permite isso, então cancele por conta própria um plano da App Store.']
                  : []),
              ],
            },
            {
              id: 'two-memberships',
              q: 'O app diz que tenho dois planos ativos',
              a: [
                'Você está pagando dois ao mesmo tempo: por exemplo, o Vitalício e um plano mensal, ou um em cada loja. O app diz de qual você precisa e qual cancelar, quando você o abre e na aba <b>Membros</b>.',
                'Toque em <b>Gerenciar plano</b> para cancelar o que sobra na loja dele. Cancelar só interrompe a próxima cobrança: o tempo que você já pagou continua seu.',
                ...(o.googlePassStop ? ['Se o que sobra é cobrado pelo Google Play, <b>Parar renovação</b> faz isso direto no app.'] : []),
                'Nada fica bloqueado enquanto isso: <b>Depois</b> esconde o aviso até a próxima vez que você abrir o app.',
              ],
            },
            ]
          : []),
        ...(o.memberLoyalty
          ? [
            {
              id: 'member-time',
              q: "O que é “Membro desde”?",
              a: [
                "Enquanto você for membro, a <b>Conta</b> mostra desde quando e há quanto tempo você é membro, e o <b>Cofre</b> mostra seus carimbos: 1, 3 e 6 meses, 1, 2 e 3 anos, e depois a cada ano.",
                "Conta o tempo em que você foi membro sem interrupção: um plano mensal ou anual, o Vitalício, um presente ou um código. Tempo reembolsado e compras de teste não contam.",
                "Ele se ganha ficando. No primeiro dia em que você deixar de ser membro (depois do período de carência que a loja dá quando um pagamento falha), seu tempo de membro e seus carimbos zeram. Se você voltar a ser membro, “Membro desde” e seu tempo começam do zero.",
                "O <b>Vitalício</b> é a exceção: seu tempo conta desde o seu primeiro dia como membro, incluindo os meses de plano mensal ou anual antes dele, e continua crescendo, com cada carimbo que adicionarmos depois.",
                "Os outros jogadores veem só há quanto tempo, com seu carimbo, na sua ficha de jogador, nunca a data nem o preço. Desative <b>Mostrar meu tempo de membro</b> nos Ajustes para esconder. O tempo de uma conta de menor de 13 anos nunca aparece para os outros.",
                "Os carimbos só mudam a aparência do seu perfil: não dão XP nem chances melhores, e não podem ser trocados.",
              ],
            },
            {
              id: 'membership-price',
              q: "Meu preço vai subir?",
              a: [
                "Enquanto seu plano mensal ou anual renovar sem interrupção, você continua pagando o preço de agora, mesmo que o preço suba para novos membros. A loja ainda pode ajustá-lo por impostos locais ou câmbio.",
                "Se trocar para o outro plano, você paga o preço atual desse plano. Se seu plano acabar e você voltar depois, pode pagar o preço da época. O Vitalício é pago uma vez e nunca renova.",
              ],
            },
            ]
          : []),
        {
          id: 'cancel-membership',
          q: 'Como funcionam a renovação automática e o cancelamento?',
          a: [
            'Agente e Elite renovam sozinhos até você cancelar: na App Store, pelo menos 24 horas antes de o período acabar; no Google Play, antes da data de renovação. Você mantém os benefícios até o fim do período pago.',
            '<b>iPhone ou iPad:</b> Ajustes, seu nome, Assinaturas, SpySocial.',
            '<b>Android:</b> o app Google Play Store, sua foto de perfil, Pagamentos e assinaturas, Assinaturas, SpySocial.',
            o.googlePassStop
              ? '<b>Gerenciar plano</b> no app abre a mesma página. Apagar o app ou a conta não cancela um plano mensal ou anual. Comprar o Vitalício para sozinho um plano cobrado pelo Google Play, mas não um cobrado pela App Store.'
              : '<b>Gerenciar plano</b> no app abre a mesma página. Apagar o app ou a conta, ou comprar o Vitalício, não cancela um plano mensal ou anual.',
            ...(o.memberLoyalty ? ["No <b>Cofre</b>, <b>Cancelar plano</b> (abaixo de Gerenciar plano) mostra antes uma tela com os fatos: se o seu plano terminar, seu tempo de membro e seus carimbos zeram e começam do zero, e seu preço garantido termina. O único botão, <b>Continuar para cancelar</b>, leva direto à loja. <b>Gerenciar plano</b> continua abrindo a loja diretamente. Nada muda antes do fim do período pago."] : []),
          ],
        },
        {
          id: 'restore-purchases',
          q: 'Como recupero meu plano de membro?',
          a: [
            'Toque em <b>Restaurar compras</b> no app com o celular conectado à conta da App Store ou do Google Play com que você pagou.',
            'Ela passa para a conta do SpySocial que você está usando e sai de qualquer outra conta em que estava, mesmo excluída.',
          ],
        },
        {
          id: 'refunds',
          q: 'Posso pedir reembolso?',
          a: [
            'A Apple e o Google cuidam dos reembolsos pelas regras deles: peça à Apple em reportaproblem.apple.com, ou ao Google pelo seu histórico de pedidos do Google Play.',
            'Se uma compra for reembolsada, o que ela liberou é removido.',
          ],
        },
      ],
    },
    {
      id: 'account',
      title: 'Sua conta',
      items: [
        {
          id: 'guest-or-saved',
          q: 'Conta de visitante ou salva: qual a diferença?',
          a: [
            'Um <b>visitante</b> joga em salas privadas na hora. Uma conta de visitante fica num celular só, e sair dela apaga a conta para sempre.',
            `Uma conta <b>salva</b> (Apple, Google ou seu e-mail${o.passwordless ? ', com um código que mandamos, sem senha' : ''}) guarda seu nome, seu progresso e seu plano de membro em qualquer celular, e libera o Jogar online, a Noite de Jogos e os amigos.`,
            'Você pode salvar uma conta de visitante quando quiser na página da sua conta, sem perder nada. Amigos, Trocas e o Mercado Negro pedem que o visitante salve a conta primeiro.',
          ],
        },
        ...(o.emailCodes22
          ? [
            {
              id: 'sign-up-email',
              q: 'Como crio uma conta com meu e-mail?',
              a: [
                'Toque em <b>Continuar com e-mail</b> e digite seu e-mail. Mandamos um código de 6 dígitos: digite no app e sua conta está criada. Não precisa de senha.',
                'O código vale por 1 hora. Não chegou? Veja o spam ou lixo eletrônico, ou toque em <b>Reenviar código</b> depois de um minuto.',
                ...(o.passwordless
                  ? []
                  : ['Versões mais antigas do app pedem uma senha. Se uma disser que a senha é comum demais ou apareceu em um vazamento de dados, escolha outra: nenhuma conta foi criada, nenhum e-mail foi enviado, e você pode tentar de novo na hora.']),
              ],
            },
            ]
          : []),
        {
          id: 'lost-account',
          q: 'Perdi minha conta. Dá para recuperar?',
          a: [
            'Uma <b>conta salva</b> volta em qualquer celular: abra o SpySocial e entre do mesmo jeito de antes (Apple, Google ou o mesmo e-mail). Outro e-mail, ou o Ocultar Meu E-mail da Apple, abre uma conta nova e vazia, e muitas vezes é por isso que o progresso parece ter sumido.',
            'Uma <b>conta de visitante</b> fica num celular só. Se o app foi apagado, o celular foi perdido ou você saiu da conta, ela se foi para sempre e não conseguimos trazê-la de volta.',
            'Se o app mostrar <b>Não foi possível abrir sua conta</b>, sua conta continua salva no celular, só não deu para lê-la naquele momento. Toque em <b>Tentar de novo</b>, ou feche o app e abra de novo.',
            'O plano de membro não se perde: <b>Restaurar compras</b> traz de volta. Não conseguimos juntar contas nem mover itens entre elas.',
            'Se você tinha uma conta salva, escreva para <email/> com seu nome de usuário e como entrava, e nós verificamos.',
          ],
        },
        {
          id: 'cant-sign-in',
          q: 'Não consigo entrar',
          a: [
            ...(o.passwordless ? ['Você pode entrar com Apple, com Google ou com um código de 6 dígitos que mandamos por e-mail. Não há mais senhas: se o app ainda pedir uma, atualize-o na App Store ou no Google Play.'] : []),
            'Entre do mesmo jeito de antes. Outro e-mail, ou o Ocultar Meu E-mail da Apple, abre uma conta nova e vazia no lugar da sua.',
            'Se o app abrir na tela de login com <b>Sua sessão neste dispositivo foi encerrada</b>, encerramos seu login ali do nosso lado, geralmente porque a conta foi desconectada de todos os aparelhos. Entre de novo do mesmo jeito: seu progresso está salvo. Uma conta de visitante não consegue entrar de novo.',
            'Se o app disser “Esta conta não pode entrar”, escreva para <email/> pelo e-mail da conta, e nós verificamos.',
            'Se a conta foi banida, nosso e-mail para esse endereço informa a referência, o motivo e como recorrer.',
          ],
        },
        {
          id: 'code-not-arriving',
          q: 'Meu código ou e-mail de entrada não chega',
          a: [
            'Ele vem de noreply@mail.spysocial.app. Veja o spam ou lixo eletrônico, e confira letra por letra o endereço que você digitou.',
            o.passwordless
              ? 'Você pode pedir um código novo depois de 60 segundos com <b>Reenviar código</b>. Cada código vale 1 hora: use o do e-mail mais recente. Se o app disser que há e-mails demais, espere alguns minutos e tente uma vez.'
              : 'Você pode pedir outro e-mail depois de 60 segundos. Use o mais recente.',
            'Se sua conta usa Apple ou Google, você pode entrar com eles.',
            'Ainda nada? Escreva para <email/> com o endereço exato e mais ou menos quando você tentou, e verificamos do nosso lado.',
          ],
        },
        {
          id: 'lost-email',
          q: 'Perdi meu e-mail ou quero trocá-lo',
          a: [
            'O app não consegue trocar o e-mail de uma conta salva, então escreva para <email/>.',
            'Se você ainda consegue ler o endereço antigo, escreva por ele e informe o novo. Também vamos escrever para o endereço novo, e você responde.',
            'Se o endereço antigo não existe mais, tente primeiro recuperá-lo com seu provedor de e-mail. Se sua conta também tem entrada por Apple ou Google, você ainda pode entrar assim. Não podemos prometer a troca sem o endereço antigo, porque é assim que sabemos que a conta é sua.',
            'Depois de uma troca de e-mail, suas trocas ficam pausadas por 3 dias e suas ofertas e anúncios abertos no Mercado Negro são fechados.',
          ],
        },
        {
          id: 'stolen-account',
          q: 'Alguém entrou na minha conta. O que eu faço?',
          a: [
            'Primeiro proteja o e-mail da sua conta SpySocial, e sua conta Apple ou Google se você entra com elas. Quem consegue ler esse e-mail consegue entrar na sua conta.',
            'Em até 7 dias de uma troca que você não fez, toque em <b>Desfazer minhas trocas</b> na sua página de trocas. Isso reverte todas as suas trocas protegidas e pausa suas trocas por 30 dias. Dá para fazer uma vez a cada 90 dias.',
            'Depois escreva para <email/> com seu nome de usuário, mais ou menos quando aconteceu e o que está faltando. Avise também se achar que alguém ainda está conectado.',
            'Depois de 7 dias, a troca é definitiva, e uma venda de Itens no Mercado Negro é definitiva na hora. Nunca vamos pedir seu código de entrada.',
          ],
        },
        {
          id: 'change-name',
          q: 'Como mudo meu nome?',
          a: [
            'Mude seu nome de exibição quando quiser na página da sua conta, e seu nome de usuário uma vez a cada 30 dias.',
            'Uma conta nova começa com um nome de exibição aleatório no idioma do seu app.',
            "Ao criar uma conta nova, seu @usuário é feito a partir do nome de exibição que você digita e acompanha esse nome até você digitar um seu ou jogar o dado. Ele nunca usa o nome da sua conta Google ou Apple.",
            'Nas mesas do Jogar online, quem não conhece você vê sua cor de agente no lugar. Os nomes seguem as <rules>regras da comunidade</rules>.',
          ],
        },
        {
          id: 'birth-year',
          q: 'Coloquei o ano de nascimento errado. Dá para corrigir?',
          a: [
            'Não dá para mudar no app: escreva para <email/> do e-mail da sua conta.',
            'Mudamos para um ano mais recente (uma idade menor) quando você ou seu responsável pedem, e para um mais antigo só com comprovação de idade.',
            'Se a idade corrigida for menor de 13 anos, a conta é excluída.',
          ],
        },
        {
          id: 'delete-account',
          q: 'Como excluo minha conta?',
          a: [
            "No app: <b>Conta</b>, <b>Ajustes</b>, <b>Conta e acesso</b>, <b>Excluir conta</b>. Não dá para desfazer. Uma conta de visitante também é excluída ali, ou ao sair da conta.",
            'Você também pode pedir por e-mail: veja <delete>Excluir sua conta</delete>.',
            "Excluir sua conta não cancela seu plano. Cancele primeiro na App Store ou no Google Play, ou você continuará sendo cobrado.",
          ],
        },
        {
          id: 'data-copy',
          q: 'Posso receber uma cópia dos meus dados?',
          a: [
            'Sim. Escreva para <email/> do e-mail da sua conta. Mandamos uma cópia num arquivo legível por máquina (JSON) em até um mês.',
            'Uma conta de visitante não tem e-mail, então salve com um e-mail antes. Detalhes: <privacy>Política de privacidade</privacy>.',
          ],
        },
      ],
    },
    {
      id: 'safety',
      title: 'Segurança',
      items: [
        {
          id: 'report-block',
          q: 'Como denuncio ou bloqueio alguém?',
          a: [
            "No lobby, toque e segure o cartão da pessoa. Na partida, toque e segure a foto dela: <b>Denunciar</b> e <b>Bloquear</b> ficam no fim das suas anotações sobre ela. No fim de jogo, toque no cartão dela.",
            'Uma pessoa lê cada denúncia, e o jogador não fica sabendo quem enviou.',
            'Bloquear mantém vocês separados: nenhum dos dois entra numa sala onde o outro está. Desbloqueie nos Ajustes, em <b>Privacidade e segurança</b>: <b>Jogadores bloqueados</b>.',
            'Mentir e blefar faz parte do jogo e não é motivo de denúncia.',
            'Numa mesa com um grupo, escolha <b>Conluio</b> se achar que eles se ajudam fora do jogo. <b>Denunciar o grupo</b> cobre todos do grupo deles naquela mesa.',
          ],
        },
        {
          id: 'moderators',
          q: 'Quem modera o SpySocial?',
          a: [
            'Nossa equipe lê cada denúncia e decide o que fazer. Moderadores voluntários de confiança ajudam, com nossa permissão: nas mesas da Noite de Jogos, com mensagens denunciadas e com os pacotes da comunidade.',
            'Você pode recorrer de qualquer decisão escrevendo para <email/>.',
          ],
        },
        {
          id: 'reputation',
          q: "O que é a minha reputação?",
          a: [
            "Toda conta tem uma. Veja a sua em Ajustes, em <b>Reputação</b>: Excelente, Boa, Baixa, Em risco ou Banida. Contas novas começam em Boa.",
            "Sua reputação vem do seu histórico: há quanto tempo você joga e se houve denúncias, advertências, silenciamentos ou pausas. A pontuação exata não aparece. Registros antigos contam menos com o tempo e deixam de contar após 90 dias.",
            "Contas novas e jogadores com reputação mais baixa têm mais desenhos verificados automaticamente.",
            "Enquanto ela estiver Banida, Jogar online, salas públicas, Noites de Jogos, trocas, presentes e o Mercado Negro ficam fechados para você, e talvez as salas privadas também. Você ainda pode entrar e continua com seus itens. Ela se recupera com o tempo se você jogar limpo.",
            "Acha que está errado? Escreva para <email/> e a gente revisa.",
          ],
        },
        {
          id: 'under-18',
          q: 'Quais são as regras para menores de 18?',
          a: [
            'É preciso ter 13 anos ou mais para jogar.',
            'Em qualquer sala ou grupo com um jogador menor de 18 anos ou que não nos informou a idade, links, e-mails, números de telefone, redes sociais e outros dados pessoais (endereço de casa, onde alguém mora, escola, nome verdadeiro) ficam bloqueados para todos.',
            'Menores de 18 não têm perfil público nem seguidores, só trocam item por item com amigos do código de amigo e não podem comprar nem vender no Mercado Negro.',
            'No iPhone e no iPad, amigos, grupos e trocas esperam uma versão do app que peça o consentimento de um responsável pela Apple.',
            'Pais e responsáveis: vejam nossa <safety>página de segurança</safety>.',
          ],
        },
        {
          id: 'under-13',
          q: 'O app diz “O SpySocial é para jogadores a partir de 13 anos”',
          a: [
            o.storeAgeSignals
              ? 'O SpySocial é para jogadores a partir de 13 anos. Não verificamos nem estimamos idades: o app se baseia no ano de nascimento que você informa e na faixa etária que a Apple ou o Google compartilha.'
              : 'O SpySocial é para jogadores a partir de 13 anos. Não verificamos nem estimamos idades: o app se baseia no ano de nascimento que você informa.',
            'Um ano de nascimento de menos de 13 anos apaga a conta na hora, e ela não pode ser restaurada.',
            ...(o.storeAgeSignals ? ['Se sua conta Apple ou Google mostra a idade errada, corrija lá e o app vai deixar você jogar. Se um responsável recusou o SpySocial pela loja, só ele pode mudar isso.'] : []),
          ],
        },
      ],
    },
    {
      id: 'troubleshooting',
      title: 'Solução de problemas',
      items: [
        {
          id: 'update-not-showing',
          q: 'A atualização nova não aparece',
          a: [
            'As atualizações baixam em segundo plano. Feche o SpySocial de vez (deslize para fora), abra, depois feche e abra mais uma vez.',
            'Se for uma versão nova na App Store ou no Google Play, atualize por lá.',
          ],
        },
        {
          id: 'cant-join',
          q: 'Por que não consigo entrar numa sala?',
          a: [
            'Confira o código: letras de A a Z e números de 2 a 9 (0 e 1 viram O e I).',
            'Não dá para entrar numa partida em andamento: espere acabar. A sala também pode estar cheia ou trancada.',
            'Se o anfitrião mudou o código, links e QR codes antigos param de funcionar. Se o anfitrião removeu você, não dá para voltar àquela sala.',
            'Um convite para uma sala que não existe mais mostra na hora <b>Este convite não funciona</b> ou <b>Sala fechada</b>, antes de pedir seu ano de nascimento.',
            'O Jogar online e a Noite de Jogos precisam de uma conta salva.',
          ],
        },
        {
          id: 'connection-lost',
          q: 'Perdi a conexão numa partida',
          a: [
            'O app reconecta sozinho quando sua conexão volta.',
            'Uma mensagem do chat que não saiu mostra <b>Não enviada</b>. Se sua conexão voltar em até 2 minutos, ela é enviada de novo sozinha; depois disso, toque nela para enviar.',
            'Se você for parar no início, toque em <b>Voltar</b> no cartão da sua sala. Seu lugar fica guardado.',
            'Se o app disser que não recebeu resposta depois de um voto, um palpite, uma compra, uma trituração ou uma troca, a ação pode ter acontecido mesmo assim. Confira e tente de novo se não: nada é pago nem trocado duas vezes.',
          ],
        },
        {
          id: 'app-crashes',
          q: 'O app fica travando e fechando',
          a: [
            'Atualize o SpySocial na App Store ou no Google Play, se houver atualização.',
            'Feche o app por completo (deslize para fora), abra, depois feche e abra mais uma vez.',
            'Reinicie o celular e veja se há espaço livre: uma atualização pode falhar com o celular cheio.',
            'Continua? Use <b>Conta</b>, <b>Ajustes</b>, <b>Relatar um problema</b> se conseguir chegar lá, ou escreva para <email/> com o modelo do celular, a versão do sistema, o que você estava fazendo e o horário com seu fuso.',
            'Se você estava numa partida, o app reconecta, ou toque em <b>Voltar</b> no cartão da sua sala, na tela inicial. Seu lugar fica guardado.',
          ],
        },
        {
          id: 'game-not-counted',
          q: 'Minha partida não contou',
          a: [
            'Uma partida conta no seu histórico quando terminou e você tinha um lugar, seja jogando até o fim, saindo antes (uma derrota) ou estando ausente.',
            'Não contam: partida encerrada pelo anfitrião, partida curta demais ou com poucos jogadores demais, distribuição cancelada, partida abandonada, ser removido da sala, um lugar a que você nunca chegou, ou assistir. Partida sem vencedor não é vitória nem derrota.',
            'Suas estatísticas mostram o Jogar online e as salas privadas separados, então veja o seletor no topo.',
            'Salas privadas nunca dão Intel nem interceptações, e partidas do Jogar online só dão se renderam XP.',
            'Para trocar, você precisa de 3 partidas terminadas que contem e que nossas verificações de jogo limpo não tenham marcado, cada uma com pelo menos outras 2 contas salvas em outros celulares. Dois celulares no mesmo Wi-Fi valem; outra conta no seu próprio celular não é uma dessas 2.',
            'Se devia ter contado, escreva para <email/> com seu nome de usuário, o código da sala (se tiver) e quando você jogou.',
          ],
        },
        {
          id: 'notifications',
          q: 'Não estou recebendo notificações',
          a: [
            'Permita as notificações do SpySocial nos ajustes do celular.',
            'No app, <b>Privacidade e amigos</b> tem chaves para pedidos de amizade, convites, pacotes novos, trocas e o Mercado Negro.',
            'No Android, as notificações de amigos, grupo, trocas e Mercado Negro ficam numa só categoria nos ajustes do celular, <b>Amigos, grupo e trocas</b>: desligá-la ali desliga todas.',
            'Os avisos de partida chegam quando você busca no Jogar online, e os lembretes da Noite de Jogos quando você toca em <b>Me avise</b>. Visitantes não recebem.',
            'Menores de 18 não recebem notificações sociais, nem nossa resposta sobre um pacote que enviaram para a Comunidade, entre 22h e 7h.',
          ],
        },
        {
          id: 'contact-support',
          q: 'Como falo com o suporte?',
          a: [
            'Escreva para <email/>. Para assuntos da sua conta, use o e-mail dela. Uma pessoa lê cada mensagem.',
            'Para novidades, Noites de Jogos e jogadores procurando partida, entre no nosso <discord>Discord</discord>.',
          ],
        },
      ],
    },
  ],
}

export default ptBR
