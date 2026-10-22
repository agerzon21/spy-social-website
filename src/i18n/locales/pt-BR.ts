import type { Strings } from './en'

/** Português (pt-BR): "você", tom direto e informal como o app; termos do app (espião, locais, sala, anfitrião, Jogar online, Buscar partida, Ajustes). */
const ptBR: Strings = {
  meta: {
    siteName: 'SpySocial',
    defaultTitle: 'SpySocial — O jogo de festa da dedução social',
    description:
      'Junte os amigos e descubra o espião — ou engane todo mundo. Jogo de festa multijogador grátis em tempo real, de 3–21 jogadores. Para iOS e Google Play.',
    titles: {
      faq: 'Suporte e perguntas',
      contact: 'Fale conosco',
      rules: 'Regras da comunidade',
      safety: 'Segurança',
      privacy: 'Política de privacidade',
      terms: 'Termos de uso',
      childSafety: 'Padrões de segurança infantil',
      whatsNew: 'Novidades',
      roadmap: 'Roadmap',
      deleteAccount: 'Excluir sua conta',
      join: 'Entrar numa partida',
      joinEvent: 'Evento público',
      resetPassword: 'Redefinir sua senha',
      confirmSuccess: 'E-mail confirmado',
      notFound: 'Página não encontrada',
    },
    descriptions: {
      faq: 'Respostas para as dúvidas mais comuns sobre o SpySocial: como começar, modos de jogo, compartilhar e entrar em salas, idiomas, controles do anfitrião, sua conta e solução de problemas.',
      contact: 'Fale com a equipe do SpySocial: escreva para support@spysocial.app se precisar de ajuda com o app, sua conta ou qualquer outra coisa.',
      rules: 'As regras da comunidade do SpySocial: seja gentil, blefe sem trapacear, mantenha a privacidade e o que acontece quando alguém quebra as regras.',
      safety: 'Segurança no SpySocial para jogadores de 13 a 17 anos e para pais e responsáveis: como sair, bloquear e denunciar, e onde buscar ajuda.',
      privacy: 'Como o SpySocial coleta, usa e protege seus dados pessoais, quem os recebe, por quanto tempo os guardamos e quais são seus direitos de privacidade.',
      terms: 'Os termos para usar o SpySocial: quem pode jogar, sua conta e seu conteúdo, salas públicas, regras da comunidade, moderação e recursos.',
      childSafety: 'Os padrões do SpySocial contra o abuso e a exploração sexual infantil: o que proibimos, como denunciar um problema, o que fazemos e nosso contato de segurança infantil.',
      whatsNew: 'Notas de versão do SpySocial: novos recursos, correções e melhorias em cada versão do app.',
      roadmap:
        'O que vem aí no SpySocial: tudo da versão 2.2, do Jogar online e do Spy Sketch à tradução automática do chat, e o que está planejado depois: partidas ranqueadas, temporadas e torneios.',
      deleteAccount: 'Como excluir sua conta do SpySocial e os dados dela, no app ou por e-mail, e o que ainda fica guardado por um tempo.',
    },
  },

  language: {
    button: (name: string) => `Idioma: ${name}. Mudar o idioma`,
    menu: 'Idioma',
  },

  header: {
    home: 'Página inicial do SpySocial',
    nav: 'Site',
    join: 'Entrar numa sala',
    joinShort: 'Entrar',
    shop: 'Loja',
    toLight: 'Mudar para o modo claro',
    toDark: 'Mudar para o modo escuro',
  },

  footer: {
    tagline: 'O jogo de festa da dedução social.',
    play: 'Jogar',
    legal: 'Legal e segurança',
    browser: 'Jogue no navegador',
    whatsNew: 'Novidades',
    roadmap: 'Roadmap',
    rules: 'Regras',
    support: 'Suporte',
    contact: 'Contato',
    shop: 'Loja',
    privacy: 'Privacidade',
    terms: 'Termos',
    childSafety: 'Segurança infantil',
    safety: 'Segurança',
    deleteAccount: 'Excluir conta',
    rights: (year: number) => `© ${year} SpySocial. Todos os direitos reservados`,
    follow: 'Siga o SpySocial',
    on: (network: string) => `SpySocial no ${network}`,
    discordHandle: 'Servidor do SpySocial',
  },

  notice: {
    englishOnly: 'Esta página está disponível só em inglês. Vale a versão em inglês.',
    translated: 'Esta página é uma tradução. Se ela diferir da versão em inglês, vale a versão em inglês.',
    readEnglish: 'Ler em inglês',
    englishSections:
      'As duas seções abaixo fazem parte da nossa Política de privacidade e estão disponíveis só em inglês. Vale a versão em inglês.',
  },

  common: {
    lastUpdated: (date: string) => `Última atualização: ${date}`,
    goHome: 'Ir para o início',
    close: 'Fechar',
    openInApp: 'Abrir no SpySocial',
    appStore: 'Baixar na App Store',
    googlePlay: 'Disponível no Google Play',
    noAppIos: 'Não tem o app? Baixe',
    noAppAndroid: 'Não tem o app? Baixe',
    playInBrowser: 'Jogue no navegador',
  },

  badges: {
    appStoreSmall: 'Baixar na',
    appStoreName: 'App Store',
    appStoreAfter: '',
    appStoreLabel: 'Baixar na App Store',
    playSmall: 'DISPONÍVEL NO',
    playName: 'Google Play',
    playAfter: '',
    playLabel: 'Disponível no Google Play',
  },

  home: {
    hero: {
      eyebrow: 'O jogo de festa da dedução social',
      title: 'Desconfie de todos',
      titleMark: '.',
      lede: '<b>Descubra o espião — ou engane todo mundo.</b> Um dos seus amigos é o espião. Todos os outros sabem qual é o lugar secreto. Façam perguntas ou desenhem pistas e votem antes que o espião descubra onde vocês estão.',
      facts: ['De 3 a 21 jogadores', 'Multijogador em tempo real', 'Grátis para jogar'],
      browser: 'Jogue no navegador',
      joinCode: 'Entre com um código da sala',
    },
    lineup: {
      group: 'Uma fila de cinco agentes. Toque em um para acusar.',
      accuse: (n: number) => `Acusar o suspeito ${n}`,
      wasSpy: (n: number) => `O suspeito ${n} era o espião`,
      isLocal: (n: number) => `O suspeito ${n} é local`,
      stampSpy: 'Espião!',
      stampLocal: 'Local',
      tap: 'Toque num suspeito para acusar',
      eggFound: 'Olho de lince! Você achou o espião na primeira tentativa.',
      eggWhere: 'Seu código para um título secreto no app (Conta > Ajustes > Inserir um código):',
    },
    how: {
      eyebrow: 'Como se joga',
      title: 'Saia no papo. Ou desenhe.',
      sub: 'Dois jogos, uma regra: todo mundo na mesa sabe o segredo, menos o espião.',
      talk: {
        secret: 'O segredo é um lugar',
        name: 'Spy Talk',
        text: 'Na sua vez, faça uma pergunta e responda a uma. Vago demais, você parece o espião. Óbvio demais, o espião descobre onde vocês estão.',
        alt: 'Spy Talk: cada jogador faz uma pergunta e outro jogador responde',
      },
      sketch: {
        secret: 'O segredo é uma palavra',
        name: 'Spy Sketch',
        text: 'Cada um desenha um pouco num quadro compartilhado. O espião desenha junto sem saber o que é, torcendo para ninguém perceber.',
        alt: 'Spy Sketch: os jogadores se revezam desenhando a palavra secreta enquanto o espião finge',
      },
    },
    round: {
      eyebrow: 'Uma rodada',
      title: 'Quatro atos',
      steps: [
        {
          title: 'A carta',
          text: 'Você vê o segredo, ou uma carta que só diz Espião.',
          alt: 'Revelação do papel: a carta do espião diz Espião, então ele precisa descobrir onde todos estão',
        },
        { title: 'As perguntas', text: 'Prove que você sabe sem entregar o segredo.', alt: 'A carta de pergunta no meio da rodada' },
        { title: 'A votação', text: 'Peça uma votação contra quem soar estranho.', alt: 'Votação: cada um vota no jogador que acha que é o espião' },
        {
          title: 'A aposta',
          text: 'O espião pode chutar o segredo a qualquer momento. Acertou, vence; errou, está fora.',
          alt: 'O espião escolhe o lugar na lista para vencer a rodada',
        },
      ],
      win: 'Os locais vencem quando tiram todos os espiões na votação. Os espiões vencem adivinhando o segredo, ou ficando escondidos até o tempo acabar.',
    },
    who: {
      eyebrow: 'Com quem você joga',
      titleOnline: 'Sua turma. Ou estranhos.',
      titleCrew: 'Chame a turma.',
      sub: 'Cada um joga no próprio celular ou tablet, em volta da mesa ou numa chamada.',
      privateTitle: 'Sala privada',
      privateText: 'Até 21 jogadores. Os amigos entram com um QR, um link de convite ou o código da sala. Você escolhe o modo e as regras.',
      howJoin: [
        '<b>Escaneie</b> o QR na tela do anfitrião',
        '<b>Toque</b> no link de convite que ele mandar',
        '<b>Digite</b> o código da sala aqui ou no app',
      ],
      onlineTitle: 'Jogar online',
      onlineText: 'Buscar partida coloca você numa mesa de 4 ou 8. Estranhos nunca veem seu nome, só sua cor de agente. E tem noites de jogos com hora marcada.',
      agentsLabel: 'Cores de agente',
      agents: {
        Teal: 'Agente Turquesa',
        Coral: 'Agente Coral',
        Rose: 'Agente Fúcsia',
        Lime: 'Agente Verde-limão',
        Yellow: 'Agente Amarelo',
        Lilac: 'Agente Lilás',
        Blue: 'Agente Azul',
        Mint: 'Agente Menta',
      },
      needsAccount: 'Para jogar online, é preciso uma conta grátis.',
    },
    joinForm: {
      label: 'Código da sala',
      button: 'Entrar',
      note: 'O código na tela do anfitrião, de 4 a 8 letras e números.',
    },
    langs: {
      eyebrow: 'Dez idiomas',
      title: 'Mesma mesa. Sua língua.',
      sub: 'Cada jogador vê o jogo no próprio idioma, inclusive o segredo.',
      listLabel: 'Idiomas',
      chatAlt: 'Tradução do chat: uma mensagem em espanhol no chat do lobby, mostrada em inglês',
      chatAuto: 'O chat também: uma mensagem em outro idioma chega traduzida para o seu.',
      chatTap: 'O chat também: toque em Traduzir em qualquer mensagem para ler no seu idioma.',
      trioLabel: 'Uma carta de papel em três idiomas',
      cardAlts: [
        'Revelação do papel: a carta de um local mostra o lugar secreto, Teatro',
        'Carta de papel em espanhol: Teatro',
        'Carta de papel em russo: Театр',
      ],
    },
    safety: {
      title: 'A partir de 13 anos',
      text: (o: { messages: boolean; drawings: boolean }) =>
        `Denuncie ou bloqueie qualquer jogador${
          o.messages && o.drawings
            ? ', e denuncie uma mensagem ou um desenho'
            : o.messages
              ? ', e denuncie uma mensagem'
              : o.drawings
                ? ', e denuncie um desenho'
                : ''
        }. Em salas com um jogador menor de 18 anos, links, e-mails, números de telefone e redes sociais ficam bloqueados para todos, e as denúncias que envolvem um jogador menor de 18 anos são lidas primeiro.`,
      rules: 'Regras da comunidade',
      childSafety: 'Segurança infantil',
      safety: 'Segurança',
      privacy: 'Privacidade',
    },
    shop: {
      eyebrow: 'A loja',
      title: 'Vista o álibi',
      text: "O moletom TRUST NO ONE., a camiseta I'm Not the Spy e mais. Impressos e enviados pela nossa loja parceira.",
      cta: 'Visitar a loja',
      hoodieAlt: 'A estampa nas costas do moletom: TRUST NO ONE. com a cabeça do espião espiando por cima',
      teeAlt: 'A estampa nas costas da camiseta: (I WAS THE SPY 😂)',
    },
    final: {
      title: 'Sua mesa aguarda',
      text: 'Grátis para jogar, sem anúncios.',
      purchases: 'Pacotes opcionais se você quiser mais lugares e palavras.',
    },
  },

  faq: {
    title: 'Suporte e perguntas',
    needMore: 'Precisa de mais ajuda?',
    sections: {
      start: 'Primeiros passos',
      modes: 'Modos de jogo',
      features: 'Recursos na partida',
      sharing: 'Compartilhar e entrar em salas',
      languages: 'Idiomas',
      host: 'Controles do anfitrião',
      account: 'Conta e acesso',
      trouble: 'Solução de problemas',
    },
    startGame: {
      q: 'Como começo uma partida?',
      a: [
        'Toque em <b>Criar sala</b> para ser o anfitrião, ou entre com um código da sala de 4 a 8 letras e números',
        'São necessários pelo menos 3 jogadores para começar uma rodada',
        'Compartilhe a sala com os amigos pelo menu de compartilhamento, pelo QR ou por link',
      ],
    },
    firstTime: {
      q: 'Primeira vez jogando?',
      a: [
        'Na primeira vez que você abre o app, um tutorial rápido mostra como jogar',
        'Depois, o app pede que você crie um perfil (nome de exibição e avatar opcional)',
        'Aí você cai na tela inicial, pronto para criar uma sala ou entrar numa',
      ],
    },
    howMany: {
      q: 'Quantas pessoas podem jogar?',
      intro: 'De 3 a 21 jogadores. Espiões recomendados:',
      a: ['3–5 jogadores: 1 espião', '6–8 jogadores: 2 espiões', '9+ jogadores: 3 espiões'],
    },
    gameModes: {
      q: 'Quais modos de jogo existem?',
      a: ['Dois jogos: <b>Spy Talk</b>, em que o segredo é um lugar e todos se revezam fazendo e respondendo perguntas, e <b>Spy Sketch</b>, em que o segredo é uma palavra e todos se revezam para desenhá-la', '<b>Clássico:</b> os espiões não se conhecem', '<b>Máfia dos espiões:</b> os espiões sabem quem são os outros espiões'],
    },
    notebook: {
      q: 'O que são as Notas?',
      a: [
        'Toque no ícone de notas durante a rodada para anotar quem disse o quê',
        'Os jogadores aparecem numa ordem inteligente: primeiro os ativos com notas, depois os outros ativos e, por último, os eliminados',
        'As notas são privadas — só você as vê',
      ],
    },
    hints: {
      q: 'Como as dicas funcionam entre idiomas?',
      onePool: 'As dicas aparecem <b>no idioma do seu app</b>, como o resto do jogo',
      gameLanguage: [
        'As dicas sempre aparecem no <b>idioma da partida</b>, para que todos na mesa leiam a mesma sugestão',
        'Se o idioma da sua interface for outro, toque na dica para ver a tradução',
      ],
      reload: 'Use o ícone próprio de recarregar para trocar a dica — tocar na frase não troca a dica sem querer',
    },
    poke: {
      q: 'O que é cutucar?',
      a: 'Toque na carta de um colega no lobby para dar uma cutucada rápida — útil para chamar a atenção antes de a rodada começar.',
    },
    leave: {
      q: 'Posso sair no meio da partida?',
      a: 'Sim — toda tela da partida tem um botão Sair, para você sair sem precisar voltar tela por tela.',
    },
    share: {
      q: 'Como compartilho uma sala com os amigos?',
      a: [
        '<b>Menu de compartilhamento:</b> use o menu do próprio celular para mandar o link para onde quiser',
        '<b>QR:</b> amigos por perto escaneiam e entram na hora',
        '<b>Em voz alta:</b> é só ler o código da sala',
      ],
    },
    link: {
      q: 'Dá para entrar por um link?',
      a: [
        'Sim — links como <b>spysocial.app/join/<código></b> abrem o app direto na sala',
        'Se a pessoa não tiver o app, o link leva para a App Store ou o Google Play',
      ],
    },
    languages: {
      q: 'Como funcionam os idiomas?',
      setLanguage: 'Escolha o idioma da interface no seu perfil',
      onePool: [
        'As salas não têm idioma: cada jogador vê o jogo no próprio idioma, inclusive o lugar ou a palavra secreta, a descrição, a lista do espião e as dicas',
        'Assim, amigos que falam idiomas diferentes podem jogar na mesma sala, ou na mesma mesa do Jogar online',
      ],
      chatAuto:
        'As mensagens do chat ficam como foram escritas, e uma mensagem em outro idioma é traduzida para o seu automaticamente (para tocar em <b>Traduzir</b> em vez disso, desative <b>Traduzir mensagens automaticamente</b> nos Ajustes)',
      chatTap: 'As mensagens do chat ficam como foram escritas: toque em <b>Traduzir</b> para ler uma no seu idioma',
      hostPicks: 'O anfitrião escolhe o idioma da partida para os lugares e as dicas',
      parity: 'O SpySocial está em <b>10 idiomas</b>: inglês, espanhol, russo, chinês simplificado, hindi, árabe, francês, bengali, português do Brasil e indonésio',
      differs: 'Se o seu idioma for diferente do idioma do anfitrião, você vê traduções onde elas importam',
    },
    customize: {
      q: 'O que o anfitrião pode personalizar?',
      a: ['Número de espiões e modo de jogo', 'Regras de votação e se quem pediu a votação aparece', 'Pacotes de lugares a usar'],
      turnOnly: 'Duração da vez',
      languageAndTurn: 'Idioma da partida e duração da vez',
    },
    endEarly: {
      q: 'O anfitrião pode encerrar a partida antes?',
      a: 'Sim — o anfitrião tem o controle <b>Encerrar partida</b> para terminar a qualquer momento do jogo.',
    },
    needAccount: {
      q: 'Preciso de uma conta?',
      a: [
        'Você pode jogar como visitante sem se cadastrar',
        'Com uma conta, você mantém seu perfil e seu progresso em qualquer aparelho',
        'Você pode transformar um perfil de visitante numa conta completa quando quiser, sem perder nada',
      ],
    },
    forgot: {
      q: 'Esqueci minha senha',
      a: [
        'Toque em “Esqueci a senha” na tela de login e digite seu e-mail',
        'Você recebe um link de redefinição — ele abre uma página segura para trocar a senha',
        'Se o link expirou, é só pedir um novo',
      ],
    },
    code: {
      q: 'O código da sala não funciona?',
      a: [
        'Os códigos de sala têm <b>de 4 a 8 letras e números</b>: digite o código exatamente como aparece na tela do anfitrião',
        'Confira se o anfitrião não fechou a sala nem começou a partida',
        'Verifique sua conexão com a internet',
      ],
    },
    connection: {
      q: 'Perdeu a conexão?',
      a: [
        'O app se reconecta sozinho — não precisa recarregar',
        'Seu papel e seu progresso ficam guardados enquanto você está fora',
        'Se você ficar preso numa tela de “reconectando” por mais de alguns segundos, talvez sua rede tenha caído — ative e desative o modo avião ou troque entre Wi-Fi e dados móveis',
      ],
    },
    offline: {
      q: 'O app diz que estou sem conexão, mas não estou?',
      a: 'Isso era uma falha do iOS em versões antigas; a v2.0.0 confirma sua conexão com um teste real de rede antes de mostrar que você está sem conexão. Se ainda acontecer, force o fechamento do app e abra de novo.',
    },
  },

  rules: {
    title: 'Regras da comunidade',
    intro: (o: { onePool: boolean; photos: boolean }) =>
      `As salas públicas${o.onePool ? ' (as mesas do Jogar online e as nossas noites de jogos)' : ''} colocam você numa partida com pessoas que você não conhece. Estas regras mantêm o jogo divertido para todos. Elas valem para nomes,${o.photos ? ' fotos,' : ''} chat, desenhos e o jeito de jogar, em salas públicas e privadas, e fazem parte dos nossos <link>Termos de uso</link>.`,
    kind: {
      title: '1. Seja gentil',
      hate: 'Nada de ódio ou assédio: nada de insultos contra um jogador, ofensas discriminatórias ou ataques à identidade de alguém.',
      sexual: (photos: boolean) => `Nada de conteúdo sexual no chat, nos nomes${photos ? ', nas fotos' : ''} ou nos desenhos.`,
      threats: 'Nada de ameaças, e nada que incentive alguém a se machucar.',
      selfHarm:
        'Nada que incentive, promova ou ensine suicídio, automutilação, transtornos alimentares ou desafios perigosos. Isso vale para todos, em todas as salas.',
    },
    bluff: {
      title: '2. Blefe, não trapaceie',
      lying: 'Mentir e blefar fazem parte do jogo. Nunca são motivo para denunciar ninguém.',
      cheating: 'Revelar a palavra ou o lugar, ou combinar com outros jogadores fora do jogo, é trapaça.',
      leaving: 'Sair das partidas de propósito, ficar parado ou travar a rodada estraga o jogo para o resto da sala.',
      online: (onePool: boolean) =>
        `No jogo online, perder o início de uma partida ou sair de uma partida já começada deixa você um tempo sem ${onePool ? 'jogar online' : 'partidas públicas'} (5 minutos, mais se você continuar saindo).`,
    },
    privacy: {
      title: '3. Mantenha a privacidade',
      personal: 'Não compartilhe nomes reais, endereços, números de telefone ou perfis de redes sociais, seus ou de outras pessoas.',
      spam: 'Nada de anúncios, spam ou links em salas públicas.',
      minors:
        'Em qualquer sala com um jogador menor de 18 anos, links, e-mails, números de telefone e redes sociais ficam bloqueados para todos. Nas mesas do Jogar online e nas noites de jogos, eles ficam sempre bloqueados.',
    },
    reports: {
      title: '4. Uma pessoa lê as denúncias',
      text: (o: { messages: boolean; drawings: boolean }) =>
        `Toque e segure num jogador para denunciá-lo ou bloqueá-lo.${
          o.messages ? ' Toque e segure numa mensagem, pergunta ou resposta para denunciá-la: a denúncia a inclui, junto com o chat ao redor.' : ''
        }${o.drawings ? ' Você também pode denunciar um desenho.' : ''} Uma pessoa lê cada denúncia em até 24 horas. O chat público fica guardado por 14 dias para que as denúncias possam ser verificadas; o jogador denunciado não fica sabendo quem fez a denúncia.`,
    },
    child: {
      title: 'Segurança infantil',
      text: 'Nunca permitimos conteúdo sexual envolvendo menores de 18 anos, nem que alguém tente aliciar, sexualizar ou explorar uma criança. Removemos esse conteúdo, banimos as contas envolvidas e o denunciamos ao National Center for Missing & Exploited Children (NCMEC), como a lei exige. Se você vir algo assim, escreva para <email/> com “Child safety” (segurança infantil) no assunto e denuncie o jogador no app se vocês estiveram na mesma sala. Você também pode denunciar direto na <link>CyberTipline</link> do NCMEC (1-800-843-5678). Se uma criança estiver em perigo imediato, ligue primeiro para o número de emergência local. Nossos <link2>Padrões de segurança infantil</link2> explicam mais.',
      subject: 'Child safety',
    },
    breaking: {
      title: 'O que acontece quando alguém quebra as regras',
      text: 'Normalmente, primeiro vem uma advertência. Problemas repetidos ou graves levam a um bloqueio do chat (de 1 hora a 7 dias), uma pausa nas salas públicas e nos eventos (de 1 a 30 dias) ou um banimento. Compartilhar dados pessoais de alguém, ou qualquer coisa que sexualize uma criança, pode levar a um banimento imediato. Cada aviso no app diz o que está limitado, por quê e até quando, com um ID como S-207.',
      drawings:
        'Os desenhos em salas públicas e eventos podem ser verificados automaticamente a qualquer momento, e todo desenho denunciado é verificado. Se um desenho seu quebrar estas regras, sua conta pode ser pausada ou banida das salas públicas e dos eventos, não importa há quanto tempo você joga. Numa sala pública, uma vez de desenhar que quebra estas regras é removida do desenho e conta como uma infração: primeiro uma advertência, depois 3, 7 e 30 dias sem salas públicas e eventos e, na quinta infração em 90 dias, para sempre. Em qualquer sala, um símbolo de ódio (uma suástica conta, a menos que a palavra da rodada deixe claro um sentido religioso), uma ofensa discriminatória escrita ou ódio contra alguém tira o jogador da partida e das salas públicas e dos eventos para sempre, e um desenho que sexualiza uma criança encerra a conta e é tratado como diz a seção Segurança infantil acima. Sangue e monstros são permitidos. Numa sala privada, um desenho denunciado só gera uma ação automática quando é grave a esse ponto; o resto fica a critério da pessoa que lê a denúncia. Para recorrer, mande para nós por e-mail o código do seu aviso.',
      drawingsTesters:
        'Por ora, a verificação automática de desenhos está em teste e só funciona em partidas em que todos os jogadores são nossos testadores (quem usa uma versão de teste do app).',
    },
    age: { title: 'Idade', text: 'O SpySocial é para jogadores de 13 anos ou mais.' },
    appeal: {
      title: 'Acha que erramos?',
      text: 'Escreva para <email/> e informe o ID do seu aviso. Veja também os <link>Termos de uso</link> e a <link2>Política de privacidade</link2>.',
    },
  },

  safety: {
    title: 'Segurança no SpySocial',
    intro:
      'O SpySocial é um jogo de festa para jogadores de 13 anos ou mais. Esta página é para os adolescentes que jogam e para os pais e responsáveis que querem saber como é. Ir para: <link>jogadores de 13 a 17 anos</link>, <link2>pais e responsáveis</link2>, <link3>contatos de segurança infantil</link3>, <link4>onde buscar ajuda</link4>.',
    danger: {
      title: 'Alguém está em perigo agora?',
      text: 'Ligue para o número de emergência local: 999 no Reino Unido, 911 nos EUA, 112 na UE. Depois, denuncie para nós.',
    },
    teens: {
      title: 'Para jogadores de 13 a 17 anos',
      intro: 'O SpySocial é para ser divertido. Se alguém deixar você desconfortável, com medo ou chateado, você pode agir na hora, e não vai ter problemas por isso.',
      leave: {
        title: 'Saia',
        text: 'Você sempre pode sair de uma sala ou de uma partida: toque em <b>Sair</b>. Sua segurança importa mais do que qualquer jogo.',
        online: (onePool: boolean) =>
          `No jogo online, sair de uma partida já começada deixa você um tempo sem ${onePool ? 'jogar online' : 'partidas públicas'}. Saia mesmo assim, e denuncie o jogador se foi por causa dele.`,
      },
      block: {
        title: 'Bloqueie',
        text: 'Toque e segure no jogador e toque em <b>Bloquear</b>. Você não vê mais o chat dele, e nenhum dos dois pode entrar numa sala em que o outro esteja. Ele não fica sabendo. Você pode desbloquear quando quiser em Ajustes, em Privacidade e segurança: Jogadores bloqueados.',
      },
      report: {
        title: 'Denuncie',
        text: 'Toque e segure no jogador, ou em algo que ele escreveu no chat, e toque em <b>Denunciar</b>. Escolha o que aconteceu, adicione detalhes se quiser e envie. Nós anexamos o chat para você, então não precisa de capturas de tela.',
      },
      tell: {
        title: 'Conte para alguém',
        text: 'Converse com seu pai, sua mãe, um responsável, um professor ou outro adulto de confiança. Se preferir falar com alguém que você não conhece, as <link>linhas de apoio abaixo</link> são gratuitas e sigilosas.',
      },
      afterTitle: 'O que acontece depois que você denuncia',
      after: [
        'Uma pessoa, não um robô, lê cada denúncia em até 24 horas. Denúncias sobre segurança infantil, automutilação, conteúdo sexual ou dados pessoais são lidas primeiro, assim como as que envolvem um jogador menor de 18 anos.',
        'O jogador denunciado não fica sabendo quem o denunciou.',
        'Se ele quebrou as regras, podemos dar uma advertência, bloquear o chat dele, pausá-lo das salas públicas ou bani-lo.',
        'Não enviamos o resultado para você, mas toda denúncia é lida e tratada.',
        'Blefar e mentir sobre o seu papel fazem parte do jogo, então não são motivo de denúncia.',
      ],
      neverTitle: 'Nunca está tudo bem se alguém',
      never: [
        'pergunta sua idade, onde você mora ou em que escola você estuda',
        'pede fotos, seu número de telefone ou suas redes sociais, ou quer conversar em outro app',
        'fala sobre sexo, ou manda mensagens ou desenhos de cunho sexual',
        'oferece presentes ou dinheiro, ou pede para você guardar um segredo',
        'manda você se machucar, ou pratica bullying com você',
      ],
      neverWhat:
        'Bloqueie, denuncie (escolha <b>Segurança infantil</b> se a pessoa pedir fotos, puxar conversa de cunho sexual ou quiser marcar um encontro) e conte para um adulto de confiança. Guarde para você seu nome real, endereço, escola, número de telefone e redes sociais, e nunca compartilhe sua senha: ninguém do SpySocial vai pedir sua senha.',
    },
    parents: {
      title: 'Para pais e responsáveis',
      intro:
        'O SpySocial é um jogo de festa de blefe e dedução: um ou mais jogadores são espiões em segredo, e todos tentam descobrir quem são. Cada jogador usa o próprio celular, no mesmo lugar ou longe. Adolescentes precisam da permissão dos pais ou do responsável legal para jogar (veja nossos <link>Termos de uso</link>, seção 2).',
      hasTitle: 'O que o SpySocial tem',
      chat: '<b>Chat de texto dentro de uma sala:</b> o chat da sala, o chat da partida, um chat privado para os espiões quando a partida tem mais de um e um chat para os jogadores que estão fora. O chat é excluído cerca de 24 horas depois do envio numa sala privada, e 14 dias depois numa sala pública.',
      sketch: '<b>Spy Sketch:</b> os jogadores se revezam desenhando com o dedo.',
      names: (o: { avatars: boolean; photos: boolean }) =>
        `<b>Nomes e imagens:</b> ${
          o.avatars
            ? o.photos
              ? 'um nome de exibição, um nome de usuário e um avatar montado com peças que o app oferece. Versões do app anteriores à 2.2 ainda podem adicionar uma foto de perfil.'
              : 'um nome de exibição, um nome de usuário e um avatar montado com peças que o app oferece. Os jogadores não podem adicionar fotos.'
            : 'um nome de exibição, um nome de usuário e uma foto de perfil opcional.'
        }`,
      private: '<b>Salas privadas:</b> só entra quem tem o código, o link ou o QR da sala, e o anfitrião pode remover um jogador.',
      publicOnePool:
        '<b>Salas públicas</b> com jogadores que seu filho ou sua filha não conhece: as mesas do Jogar online, onde o app distribui os jogadores automaticamente e todos jogam com as mesmas regras padrão, e as noites de jogos que organizamos com hora marcada. Os jogadores não podem criar salas públicas, e nenhum jogador é anfitrião de uma.',
      public: (playOnline: boolean) =>
        `<b>Salas públicas e eventos</b> com jogadores que seu filho ou sua filha não conhece${playOnline ? ', inclusive o Jogar online, que coloca os jogadores numa mesa automaticamente' : ''}.`,
      buy: '<b>Itens para comprar:</b> pacotes e assinaturas, pela App Store ou pelo Google Play.',
      hasNotTitle: 'O que o SpySocial não tem',
      noDms:
        'Nada de mensagens diretas: os jogadores só conversam dentro de uma sala, com os jogadores que estão nela. O chat dos espiões dura uma partida e é filtrado, guardado e pode ser denunciado como o resto.',
      noFriends:
        'Nada de listas de amigos ou seguidores, busca de jogadores, perfis para navegar ou biografias, então ninguém pode procurar seu filho ou sua filha nem entrar em contato fora de uma sala.',
      noVoice: (photos: boolean) =>
        `Nada de chat de voz ou vídeo: o botão do microfone só transforma a fala em texto, e os outros jogadores nunca ouvem a voz de ninguém.${photos ? '' : ' Também não dá para enviar fotos ou vídeos.'}`,
      noLocation: 'Nada de compartilhamento de localização e nada de anúncios.',
      safeTitle: 'Como mantemos o jogo seguro',
      age: (o: { gate: boolean; under13Deletion: boolean; storeSignals: boolean }) =>
        `<b>Idade:</b> o SpySocial é para jogadores de 13 anos ou mais.${
          o.gate ? ` Antes da primeira partida, o app pede o ano de nascimento${o.under13Deletion ? ', e uma resposta abaixo de 13 anos exclui a conta' : ''}.` : ''
        }${o.storeSignals ? ' Se a Apple ou o Google informar ao app que o usuário tem menos de 13 anos, o app não deixa jogar.' : ''} Não verificamos idades; então, se você descobrir que uma criança com menos de 13 anos tem uma conta, escreva para nós e vamos excluí-la.`,
      publicRooms:
        '<b>Salas públicas</b> exigem uma conta salva com e-mail confirmado, idade de 13 anos ou mais e aceite das nossas Regras da comunidade. Visitantes só podem jogar em salas privadas, e jogadores com pausa ou banimento não podem entrar em salas públicas.',
      filter:
        '<b>Filtro do chat:</b> nomes e mensagens são verificados antes que alguém os veja. Em salas públicas, ofensas discriminatórias, palavras sexuais explícitas e insultos são bloqueados. Em salas privadas, as palavras mais graves são bloqueadas. Em qualquer sala com um jogador menor de 18 anos, links, e-mails, números de telefone e redes sociais ficam bloqueados para todos. Nas mesas do Jogar online e nas noites de jogos, eles ficam sempre bloqueados.',
      reports:
        '<b>Denúncias, bloqueios e punições:</b> uma pessoa lê cada denúncia em até 24 horas, e o jogador denunciado não fica sabendo quem fez a denúncia. Denúncias que envolvem um jogador menor de 18 anos são lidas primeiro. As punições vão de uma advertência a um bloqueio do chat, uma pausa nas salas públicas ou um banimento. Nossas <link>Regras da comunidade</link> listam o que não é permitido.',
      drawingCheck:
        '<b>Verificação dos desenhos:</b> cada vez de desenhar numa sala pública é verificada automaticamente, e uma vez que quebra as regras é removida do desenho.',
      buyTitle: 'Compras',
      buyText:
        'Adolescentes precisam da permissão dos pais ou do responsável legal para comprar qualquer coisa. As compras passam pela App Store ou pelo Google Play, então os controles parentais deles, como o Pedir Compra da Apple e as aprovações de compra do Google Family Link, funcionam normalmente. Um Pack Pass é renovado até ser cancelado nos ajustes da loja.',
      deleteTitle: 'Excluir uma conta',
      deleteSteps: (o: { avatars: boolean; oldApps: boolean }) => [
        'Abra o SpySocial.',
        `Toque ${o.avatars ? 'no avatar' : 'na foto'} no alto da tela inicial para abrir <b>Conta</b>.${
          o.oldApps ? ' (Em versões anteriores à 2.2, Conta é o ícone no canto inferior direito da tela inicial.)' : ''
        }`,
        `Toque em <b>Ajustes</b> no canto superior direito e, em <b>Conta e acesso</b>, em <b>Excluir conta</b> (a última linha). Uma conta de visitante é excluída com <b>Sair</b>, no mesmo lugar.${
          o.oldApps ? ' (Em versões anteriores à 2.2, Excluir conta fica na Zona de perigo, no fim de Conta.)' : ''
        }`,
      ],
      deleteEmail:
        'Ou escreva para <email/> do endereço da conta, com o assunto “Delete my SpySocial account” (excluir minha conta do SpySocial). Se não puder escrever desse endereço, escreva mesmo assim informando o nome de usuário, e vamos ajudar. Nossa página <link>Excluir conta</link> explica o que é excluído e o que guardamos.',
      deleteSubject: 'Delete my SpySocial account',
      contactTitle: 'Fale conosco',
      contact: (section: number) =>
        `Escreva para <email/> sobre qualquer assunto desta página. Para qualquer coisa sobre a segurança de uma criança, coloque “Child safety” (segurança infantil) no assunto, e vamos tratar disso primeiro. Para recorrer de uma decisão ou fazer uma reclamação, inclusive sobre como cumprimos a Online Safety Act do Reino Unido, veja a seção ${section} dos nossos <link>Termos de uso</link>.`,
    },
    contactsTitle: 'Contatos de segurança infantil',
    contactsAfter: 'Nossos <link>Padrões de segurança infantil</link> explicam o que proibimos, como denunciar e o que fazemos a respeito.',
    helpTitle: 'Onde buscar ajuda',
    helpIntro: 'Se você está passando por dificuldades, ou está preocupado com alguém, estes serviços são gratuitos e sigilosos, e você pode falar com eles sobre qualquer coisa.',
    tableWho: 'Quem',
    tableHow: 'Como',
    helplines: {
      childline: {
        note: 'Reino Unido, para menores de 19 anos',
        text: 'Ligue para <b>0800 1111</b>, de graça, a qualquer hora, ou converse com um conselheiro on-line em <link>childline.org.uk</link>. As ligações não aparecem na conta de telefone.',
      },
      samaritans: { note: 'Reino Unido e Irlanda, qualquer idade', text: 'Ligue para <b>116 123</b>, de graça, a qualquer hora, de dia ou de noite (<link>samaritans.org</link>).' },
      lifeline: { note: 'EUA', text: 'Ligue ou mande mensagem para <b>988</b>, ou converse em <link>988lifeline.org</link>, de graça, a qualquer hora.' },
      findHelpline: {
        note: 'Todos os outros países',
        text: 'O <link>findahelpline.com</link> encontra linhas de apoio gratuitas e sigilosas em mais de 175 países, por telefone, mensagem ou chat.',
      },
    },
    contacts: {
      danger: {
        label: 'Uma criança está em perigo agora',
        text: 'Ligue para a polícia: <b>999</b> no Reino Unido, <b>911</b> nos EUA, <b>112</b> na UE, ou o número de emergência local. Faça isso primeiro, antes de qualquer outra coisa desta página.',
      },
      ncmec: {
        note: 'Exploração sexual infantil, de qualquer país',
        text: 'Denuncie on-line em <link>report.cybertip.org</link>, ou ligue para 1-800-843-5678 (1-800-THE-LOST), a qualquer hora. Mantido pelo National Center for Missing & Exploited Children.',
      },
      ceop: {
        note: 'No Reino Unido',
        text: 'Se você está preocupado com abuso sexual on-line, ou com o jeito como alguém tem falado com uma criança na internet, denuncie ao CEOP, parte da National Crime Agency: <link>ceop.police.uk/Safety-Centre</link>. Jovens também podem denunciar, e um Child Protection Advisor lê cada denúncia.',
      },
      spysocial: {
        text: 'Denuncie o jogador no app escolhendo <b>Segurança infantil</b>, e escreva para <email/> com “Child safety” (segurança infantil) no assunto. Removemos o conteúdo, banimos as contas envolvidas e denunciamos ao NCMEC e a outras autoridades, como a lei exige.',
      },
    },
    seeAlso: 'Veja também nossas <link>Regras da comunidade</link>, os <link2>Termos de uso</link2> e a <link3>Política de privacidade</link3>.',
  },

  support: {
    title: 'Como podemos ajudar?',
    sub: 'Estamos aqui para ajudar com qualquer dúvida ou problema que você tenha com o SpySocial.',
    emailUs: 'Escreva para nós',
    respond: 'Normalmente respondemos em até 24 horas',
    copy: (email: string) => `Copiar ${email}`,
    copied: 'E-mail copiado!',
    copyFailed: 'Não foi possível copiar',
    quickLinks: 'Links rápidos',
    faqLink: 'Perguntas e solução de problemas',
    rate: 'Avalie a gente na App Store',
    ratePlay: 'Avalie a gente no Google Play',
  },

  whatsNew: {
    title: 'Novidades',
    sub: 'Notas de versão do SpySocial. Grandes atualizações, recursos novos e melhorias, conforme lançamos.',
    releases: [
      {
        tag: 'Lançamento no Android',
        summary:
          'O SpySocial está oficialmente na Google Play Store — a primeira versão pública de produção no Android, com ajustes finais vindos dos testes fechados em aparelhos Android reais.',
        sections: [
          {
            label: 'Já disponível',
            items: [
              { title: 'Android 2.1.1', text: 'No Google Play desde 13 de junho de 2026.' },
              { title: 'iOS 2.1.1', text: 'As mesmas correções, agora disponíveis na App Store.' },
            ],
          },
          {
            label: 'Ajustes antes do lançamento',
            items: [
              { title: 'O botão Excluir conta não é mais cortado', text: 'O conteúdo da tela Conta agora respeita a margem inferior da área segura do aparelho e reserva espaço para o aviso de alterações não salvas — o Google Play exige que a exclusão da conta no app esteja ao alcance.' },
              { title: 'Botões Sair da sala / Começar partida no lobby', text: 'Agora ficam acima da barra de navegação por gestos do Android, com margens dinâmicas da área segura.' },
              { title: 'Retorno do Começar partida', text: 'Agora mostra o que falta (3 ou mais jogadores, todos prontos, pelo menos uma categoria) quando os requisitos não são cumpridos. Antes, o botão ficava desativado sem nenhuma explicação.' },
              { title: 'Tela de categorias', text: 'O botão de voltar e o título "Categorias e lugares" não se espremem mais. No Android, o botão de voltar é só um ícone (convenção do Material); o tamanho da fonte do título foi reduzido.' },
              { title: 'Janela Como jogar', text: 'Removido o botão de voltar duplicado no Android (apareciam tanto o X de fechar da janela quanto o botão de voltar herdado da pilha).' },
              { title: 'Tutorial de boas-vindas', text: 'Agora dá para pular em qualquer etapa, não só no primeiro slide.' },
              { title: 'Faixa de cadastro para visitantes', text: 'Reescrita como um convite ("Desbloqueie sua conta completa") com um ícone de brilhos e um botão de ação claro — antes parecia um aviso do sistema, o que desanimava.' },
              { title: 'Telas de resultado e Como jogar', text: 'Emojis trocados por ícones do Ionicons / FontAwesome. Os emojis aparecem de forma diferente em cada fabricante de Android; os ícones vetoriais ficam iguais.' },
            ],
          },
          {
            label: 'Infraestrutura',
            items: [
              { title: '', text: 'expo-updates agora instalado e configurado no projeto EAS. Correções futuras só de JS podem sair por atualizações over-the-air, sem passar pela revisão da Play Store / App Store.' },
            ],
          },
        ],
      },
      {
        tag: 'Atualização de acabamento',
        summary:
          'Uma versão de acabamento: tela de boas-vindas redesenhada, telas de Fim de jogo e Conta renovadas, melhorias de layout no iPad e uma pilha de correções de estabilidade e qualidade por trás.',
        sections: [
          {
            label: 'Recursos novos',
            items: [
              { title: 'Nova tela de boas-vindas', text: 'Nova superfície em camadas com um degradê suave azul-céu e detalhes de espionagem discretos no fundo (anéis de radar, mira), uma etiqueta laranja "SOCIAL DEDUCTION", um slogan abaixo do logo, botões Entrar / Criar conta com ícones, um divisor OU e um link leve "Continuar como visitante". O selo da versão agora é uma etiqueta discreta no pé da tela.' },
              { title: 'Fluxo de "confirmação pendente" da conta', text: 'Quando um visitante passa para uma conta completa, a tela Conta agora mostra um estado pendente claro, com as ações Reenviar / Cancelar / Atualizar, para ele saber exatamente em que ponto está da confirmação por e-mail.' },
            ],
          },
          {
            label: 'Visual renovado',
            items: [
              { title: 'Tela de Fim de jogo redesenhada', text: 'Cartas de jogador numa superfície única com degradê suave e um destaque de cor na borda esquerda, um troféu em destaque com um halo de brilho, seções da equipe vencedora com detalhes dourados, carta do lugar com um ícone de alfinete de mapa e um botão "Voltar ao lobby" no rodapé com degradê azul-céu.' },
              { title: 'Nova tela Conta', text: 'Uma lista única e coesa, cabeçalhos de seção em maiúsculas iguais em todos os grupos (Perfil, Preferências, Conta e segurança, Suporte e informações legais, Zona de perigo), linhas de menu no estilo dos Ajustes do iOS para Suporte / Informações legais e a Zona de perigo movida para o fim.' },
              { title: 'Acabamento no iPad', text: 'Cartas de jogador do lobby em 6 colunas (eram 3), carta de revelação do papel limitada a 420pt, blocos de jogador maiores na partida (140×178) com um contêiner mais alto para a terceira fileira nunca ser cortada, coluna de notas que se ajusta à carta do papel e a fileira de cartas da tela inicial dimensionada para o iPad, com tipografia maior no HomeCard.' },
            ],
          },
          {
            label: 'Correções para Android',
            items: [
              { title: 'Proteção do gesto de voltar', text: "O gesto de voltar do sistema no Android 10+ (e o botão físico de voltar) agora passa pela mesma confirmação de saída que o botão Sair do cabeçalho. Antes, no Android, dava para voltar de uma tela da partida ou do lobby sem nenhuma confirmação; gestureEnabled: false só bloqueia o gesto do iOS. Implementado com um hook compartilhado useBackPressGuard que combina navigation.addListener('beforeRemove') com BackHandler.hardwareBackPress." },
              { title: 'Artefato visual de "caixa dentro de caixa"', text: 'O compositor do Android mostrava uma borda interna visível dentro de cada carta de votação / resultado da votação / fim de jogo. Causa: fundo rgba translúcido + borda fina translúcida + borderRadius + overflow:hidden — a própria borda da camada de recorte arredondada aparecia através da borda semitransparente. Corrigido em VotePlayerRow, VoteResultRankCard, VoteOutcomeCard e na carta de jogador do fim de jogo.' },
              { title: 'Espaço no cabeçalho do Fim de jogo', text: "O SafeAreaView da tela contava duas vezes a margem superior em cima do cabeçalho do Stack, deixando uma faixa visível do degradê do GameBackground entre o cabeçalho e o começo do conteúdo rolável. Agora limitado a ['bottom','left','right'], como nas telas voting / vote_results." },
              { title: 'WheelPicker', text: 'Substituto em JS puro para o @react-native-picker/picker. O seletor nativo ignora o itemStyle no Android sem avisar (o que deixava nosso texto branco ilegível, preto sobre escuro) e tem travamentos antigos por NullPointerException ao fechar — ambos bugs da biblioteca original. O substituto mostra a mesma experiência nas duas plataformas, com um ScrollView + snap-to-interval.' },
            ],
          },
          {
            label: 'Melhorias',
            items: [
              { title: 'Relógio sincronizado com o servidor', text: 'Todo cálculo de "segundos restantes" agora subtrai uma diferença medida em relação ao relógio do servidor (por uma nova função server_now() no Postgres) em vez de confiar no relógio do aparelho. Corrige contagens regressivas sem sentido em aparelhos com a hora mal sincronizada.' },
              { title: 'Fluxos de login unificados', text: 'Cadastro, reenvio de confirmação, redefinição de senha e troca de e-mail passam todos por uma única Edge Function, com um wrapper compartilhado no cliente, eliminando o risco de divergência entre os quatro pontos da interface. Novas migrações adicionam uma chave de idempotência ao cadastro, ampliam auth_attempts para os novos tipos de fluxo e adicionam um RPC para cancelar a troca de e-mail.' },
              { title: 'Conta: alternativa ao mailto', text: 'As linhas de e-mail de Suporte / Informações legais agora copiam o endereço para a área de transferência, com um aviso amigável, quando não há app de e-mail configurado, em vez de gerar um erro não tratado.' },
              { title: '', text: 'Paridade de tradução mantida em inglês, espanhol e russo para todas as chaves novas (etiqueta e slogan das boas-vindas, textos de conta com confirmação pendente etc.).' },
            ],
          },
          {
            label: 'Técnico',
            items: [
              { title: '', text: 'O tsconfig.json agora exclui supabase/functions/** — são arquivos de Edge Function em Deno, com outro alvo de resolução de módulos.' },
              { title: '', text: 'Versão atualizada para 2.1.0; número de build do iOS incrementado para envio à App Store.' },
            ],
          },
        ],
      },
      {
        tag: 'Grande atualização',
        summary:
          'Uma reconstrução completa da experiência multijogador: todas as telas foram redesenhadas, o motor em tempo real foi reescrito para ficar estável e uma pilha de recursos novos chega de uma vez.',
        sections: [
          {
            label: 'Recursos novos',
            items: [
              { title: 'Tutorial e criação do perfil', text: 'Quem joga pela primeira vez aprende o jogo passo a passo e é convidado a criar o perfil.' },
              { title: 'Notas na partida', text: 'Anote quem disse o quê durante a rodada. Os jogadores aparecem numa ordem inteligente: primeiro os ativos com notas, depois os outros ativos e, por último, os eliminados.' },
              { title: 'Tradução das dicas', text: 'Quando o idioma da interface é diferente do idioma da partida, toque numa dica para ver a mesma pergunta no seu idioma. As dicas ficam no idioma da partida para que todos na mesa leiam a mesma sugestão.' },
              { title: 'Cutucar jogadores', text: 'Toque na carta de um colega no lobby para dar uma cutucada.' },
              { title: 'Compartilhar com QR', text: 'Compartilhe salas pelo menu de compartilhamento do celular, com um QR para escanear.' },
              { title: 'Links universais', text: 'spysocial.app/join/<código> abre o app e leva você direto para a sala (mesmo com o app fechado).' },
              { title: 'Códigos da sala de 5 caracteres', text: 'Códigos mais curtos, mais fáceis de dizer em voz alta. Os antigos, de 6 caracteres, ainda funcionam.' },
              { title: 'Mostrar quem pediu a votação', text: 'Ajuste do lobby para mostrar, se quiser, quem pediu a votação.' },
              { title: 'Anfitrião encerra a partida', text: 'Agora o anfitrião pode encerrar uma partida antes do fim.' },
              { title: 'Pacote de lugares Extra 1', text: 'Um novo lote de lugares para jogar.' },
              { title: 'Botão Sair na partida', text: 'Saída rápida das partidas em andamento, sem precisar voltar tela por tela.' },
            ],
          },
          {
            label: 'Visual renovado',
            items: [
              { title: '', text: 'Interface do lobby totalmente modernizada, com cartas de jogador interativas.' },
              { title: '', text: 'Tela de ajustes do lobby redesenhada (com um PickerModal reutilizável por trás).' },
              { title: '', text: 'Tela da partida redesenhada.' },
              { title: '', text: 'Tela de votação redesenhada, mostrando quem pediu a votação e o progresso.' },
              { title: '', text: 'Tela de resultado da votação redesenhada, com resultados e eliminações padronizados.' },
              { title: '', text: 'Fase de revelação do papel refinada — mostra os nomes de quem está esperando e agora dura 60 segundos.' },
              { title: '', text: 'As cartas da tela inicial agora ajustam o texto sozinhas; o botão de atualizar ficou mais fino.' },
              { title: '', text: 'Todas as telas da partida agora usam o mesmo cabeçalho azul-marinho escuro (Solve e Solve Results não usam mais variantes brancas/transparentes).' },
              { title: '', text: 'Faixa de sem conexão padronizada em todas as telas — altura uniforme, respeita a área segura e não bate mais na Dynamic Island.' },
              { title: '', text: 'A tela Conta tem um estado vazio caprichado para quando está sem conexão, com um ícone de nuvem desconectada.' },
            ],
          },
          {
            label: 'Melhorias',
            items: [
              { title: 'Reforço geral da conexão', text: 'Corrige uma falha antiga do iOS em que o NetInfo podia mentir ("sem conexão") depois de muito tempo em segundo plano, deixando telas presas em estados de reconexão mesmo com a rede funcionando. O hook compartilhado useNetwork agora confirma qualquer "sem conexão" com um teste HTTP real ao Supabase; todas as telas da partida e de antes da partida usam esse mesmo hook.' },
              { title: '', text: 'A tela Jogar agora confia nos resultados reais das requisições, e não no estado desatualizado do NetInfo, tenta de novo automaticamente a cada 5 segundos enquanto está sem conexão, enfileira requisições simultâneas e nunca mostra por engano a tela de usuário desconectado quando o usuário só está sem conexão.' },
              { title: '', text: 'Estabilidade da sincronização em tempo real reforçada em todas as fases (lobby, revelação do papel, partida, votação, resultados).' },
              { title: '', text: 'O cronômetro da partida agora é sincronizado com o servidor — a defasagem do relógio foi corrigida.' },
              { title: '', text: 'Tratamento de falta de conexão e lógica de reconexão mais robustos.' },
              { title: '', text: 'Fluxos de autenticação e login reforçados: cadastro mais robusto, fluxo de redefinição de senha e fluxo de conversão de visitante.' },
              { title: '', text: 'Acabamento na tela Conta, com um sistema de avisos (snackbar) redesenhado.' },
              { title: '', text: 'Paridade total de tradução em inglês, espanhol e russo (171 sugestões de dica por idioma, indexadas por posição fixa para que futuros recursos de tradução simplesmente funcionem).' },
              { title: '', text: 'Notas: o teclado não abre mais sozinho ao selecionar um jogador; o painel se ajusta ao tamanho certo.' },
              { title: '', text: 'Gaveta de dicas: tocar na frase da dica não troca mais a dica sem querer — o ícone próprio de recarregar é o único jeito de trocar.' },
              { title: '', text: 'Compatibilidade com o iOS 26 — desativada a cápsula Liquid Glass nos itens da barra de cabeçalho.' },
              { title: '', text: 'Cabeçalho unificado num hook compartilhado useGameScreenHeader, para manter a consistência entre as telas.' },
              { title: '', text: 'Logs de produção removidos das versões de lançamento.' },
            ],
          },
          {
            label: 'Correções de bugs',
            items: [
              { title: '', text: 'Corrigida a condição de corrida entre votação e fim de jogo.' },
              { title: '', text: 'Corrigidos casos de contagem dupla e de fim do cronômetro nas votações.' },
              { title: '', text: 'Corrigido o tratamento da contagem por maioria simples vs. abstenção; a abstenção agora fica fixa na barra de ações.' },
              { title: '', text: 'Corrigida a sobreposição do cabeçalho em solve-results (conteúdo batendo no cabeçalho transparente).' },
              { title: '', text: 'Corrigido o estado inicial de animação que vazava na tela da partida.' },
              { title: '', text: 'Corrigidos os avisos de escrita durante a renderização do Reanimated na tela de votação.' },
              { title: '', text: 'Corrigido o fluxo de conversão de visitante, que desconectava o visitante sem querer.' },
              { title: '', text: 'Corrigido o campo de e-mail da Conta.' },
              { title: '', text: 'Corrigido o texto cortado nas cartas da tela inicial e os cortes no cabeçalho em espanhol.' },
            ],
          },
          {
            label: 'Técnico',
            items: [
              { title: '', text: 'Gerenciamento de estado migrado para os hooks useRoom e useGame.' },
              { title: '', text: 'Rotas simplificadas — removido o grupo de rotas (tabs) em favor de rotas planas.' },
              { title: '', text: 'react-native-screens fixado em ~4.18 para compatibilidade com o expo-router 6.0.23.' },
              { title: '', text: 'Correção da publicação em tempo real no lado do Supabase.' },
              { title: '', text: 'Sugestões de perguntas reorganizadas em trios de tradução paralelos ({ en, es, ru }) — uma única fonte de verdade.' },
              { title: '', text: 'Removidos campos obsoletos do esquema do Expo (privacy, privacyPolicyUrl, termsOfServiceUrl); as URLs de privacidade e termos ficam no App Store Connect.' },
            ],
          },
        ],
      },
      {
        tag: 'Primeira versão',
        summary: 'Primeira versão pública do SpySocial na App Store.',
        sections: [] as { label: string; items: { title: string; text: string }[] }[],
      },
    ],
  },

  roadmap: {
    eyebrow: 'Roadmap',
    title: 'O que vem aí',
    lede: (day: string) => `O SpySocial\u00A02.2 chega em ${day}. Veja o que vem nele e o que estamos preparando depois.`,
    ledeOut: 'O SpySocial\u00A02.2 já chegou. Veja o que vem nele e o que estamos preparando depois.',
    now: {
      coming: (day: string) => `Chega em ${day}`,
      out: 'Já disponível',
      title: 'SpySocial 2.2',
      sub: 'Nossa maior atualização até agora.',
      features: [
        {
          title: 'Jogar online',
          text: 'Toque em “Buscar partida” para uma mesa de 4 ou 8 jogadores, com as mesmas regras padrão para todos. Se um espião for pego, todos recebem a votação de volta; quando ninguém tiver mais votações, o jogo vai direto para o fim. Você só precisa de uma conta grátis.',
        },
        {
          title: 'Spy Sketch',
          text: 'Uma nova forma de jogar: desenhe a palavra secreta num quadro compartilhado e pegue os espiões que estão só fingindo.',
        },
        {
          title: 'Tradução automática',
          text: 'Converse na sala e durante a partida em qualquer um dos 10 idiomas: mensagens em outros idiomas chegam traduzidas para o seu. As respostas do Spy Talk são traduzidas junto com a pergunta, então não perdem o sentido.',
        },
        {
          title: 'Seu agente e a Loja',
          text: 'Crie seu próprio avatar de espião. A Loja tem pacotes, assinaturas, itens de avatar e comemorações: tudo opcional, e nada disso muda o jeito de jogar.',
        },
        { title: 'Noites de jogos', text: 'Partidas online com hora marcada. Toque em “Me avise” e a gente avisa antes de começar.' },
        {
          title: 'Cores de agente',
          text: 'Nas mesas do Jogar online e nas noites de jogos, estranhos veem sua cor de agente, como Agente Turquesa, nunca o seu nome. Escolha suas três cores favoritas.',
        },
        {
          title: 'Códigos de criadores',
          text: 'Ganhou um código de um criador ou do SpySocial? Insira o código em Ajustes e ganhe um título ou outra recompensa.',
        },
        {
          title: 'Música e sons',
          text: 'Três músicas lounge se revezam nos menus, o Spy Talk e o Spy Sketch têm cada um a sua, e novos sons marcam os últimos segundos, a revelação do Spy Sketch e a vitória. Escolha a música dos menus em Ajustes ou desligue a música.',
        },
        {
          title: 'Tempo de jogo recomendado',
          text: 'As regras da sala mostram um tempo de jogo recomendado para o número de jogadores, no Spy Talk e no Spy Sketch. Quem decide continua sendo o anfitrião.',
        },
        {
          title: 'Segurança',
          text: 'O SpySocial é para maiores de 13 anos. O chat tem filtro de palavras, você pode denunciar ou bloquear qualquer jogador, e nas salas com alguém menor de 18 anos o chat bloqueia links, números de telefone e redes sociais.',
        },
      ],
      more: 'E mais: estatísticas, títulos e molduras para desbloquear, níveis até o 100 com prestígio, XP até nas partidas rápidas, volta ao jogo sem tropeços quando o celular entra em repouso, links de convite que simplesmente funcionam e um visual novo em todas as telas.',
      launchWeek: 'Semana de lançamento: Spy Talk na terça, 10 de novembro, Spy Sketch na sexta, 13 de novembro, e Máfia no sábado, 14 de novembro, sempre das 20h às 22h no horário do leste dos EUA (ET).',
    },
    next: {
      status: 'Planejado',
      noDates: 'Ainda sem data',
      title: 'Próximos passos',
      sub: 'Depois da 2.2, vamos construir o lado competitivo do SpySocial.',
      plans: [
        {
          title: 'Modo ranqueado',
          text: 'Jogue partidas ranqueadas e mostre seu rank no perfil. O matchmaking junta você com jogadores de rank parecido.',
        },
        {
          title: 'Temporadas',
          text: 'Cada temporada traz recompensas próprias, como títulos e molduras, pelo rank que você alcançar e pelas partidas que jogar.',
        },
        {
          title: 'Torneios',
          text: 'Inscreva-se com antecedência num torneio com data marcada e jogue rodadas eliminatórias em mesas pequenas. Os vencedores avançam, rodada a rodada, até a mesa final, com recompensas pela colocação.',
        },
      ],
    },
    outro: 'Os planos podem mudar. Siga a gente para ficar por dentro.',
  },

  join: {
    title: 'Entrar na partida',
    noCode: 'Nenhum código da sala informado',
    browserOrPhone: 'Jogue no navegador, ou no celular com o app',
    openToJoin: 'Abra o SpySocial para entrar na sala',
    onPhone: 'Abra este link no celular para entrar na sala',
    roomCode: 'Código da sala',
  },

  joinEvent: {
    label: 'Evento público',
    broken: 'Este link de evento não funciona',
    brokenHelp: 'Confira o link, ou abra o SpySocial e procure salas.',
    live: 'Ao vivo',
    cancelled: 'Cancelado',
    ended: 'Encerrado',
    upcoming: 'Em breve',
    full: 'Lotado agora',
    inRoom: (count: number, capacity: number) => `${count} / ${capacity} na sala`,
    yourTime: 'Seu horário',
    hostTime: (who: string, when: string) => `Horário de ${who}: ${when}`,
    theHost: 'quem organiza',
    hostedBy: (name: string) => `organizado por ${name}`,
  },

  resetPassword: {
    title: 'Redefinir sua senha',
    invalid: 'Link de redefinição inválido ou expirado. Peça um novo.',
    failed: 'Ocorreu um erro. Tente de novo.',
    mismatch: 'As senhas não coincidem',
    previewSuccess: 'Prévia: senha redefinida com sucesso',
    success: 'Senha redefinida com sucesso',
    error: 'Erro',
    unexpected: 'Erro inesperado',
    done: 'Senha redefinida com sucesso!',
    redirecting: 'Redirecionando...',
    newPassword: 'Nova senha',
    newPlaceholder: 'Digite a nova senha',
    minLength: 'Pelo menos 6 caracteres.',
    confirm: 'Confirmar senha',
    confirmPlaceholder: 'Confirme a senha',
    submit: 'Redefinir senha',
    cancel: 'Cancelar',
    preview: (mode: string) => `Modo de prévia: <b>${mode}</b>. Enviar não chega ao Supabase.`,
  },

  deleteAccount: {
    title: 'Excluir sua conta do SpySocial',
    intro: 'Você pode excluir sua conta do SpySocial e os dados pessoais ligados a ela a qualquer momento, no app ou por e-mail. Para qualquer dúvida, fale conosco em <email/>.',
    appTitle: 'Como excluir sua conta pelo app',
    steps: (o: { avatars: boolean; oldApps: boolean }) => [
      'Abra o SpySocial.',
      `Toque ${o.avatars ? 'no seu avatar' : 'na sua foto'} no alto da tela inicial para abrir <b>Conta</b>.${
        o.oldApps ? ' (Em versões anteriores à 2.2, Conta é o ícone no canto inferior direito da tela inicial.)' : ''
      }`,
      'Toque em <b>Ajustes</b> no canto superior direito.',
      `Em <b>Conta e acesso</b>, toque em <b>Excluir conta</b> (a última linha, em vermelho) e confirme.${
        o.oldApps ? ' (Em versões anteriores à 2.2, Excluir conta fica na Zona de perigo, no fim de Conta.)' : ''
      }`,
    ],
    atOnce: 'Sua conta é excluída na hora.',
    guestTitle: 'Contas de visitante',
    guest: (purchases: boolean) =>
      `Uma conta de visitante é excluída no momento em que você toca em <b>Sair</b> (em Ajustes, em Conta e acesso; em versões anteriores à 2.2, em Conta, na seção Conta e segurança) e confirma. Um visitante não pode entrar de novo, então não há como recuperar a conta.${
        purchases
          ? ' As compras são a exceção, como em qualquer conta excluída: o que você comprou como visitante volta com Restaurar compras, na conta da App Store ou do Google Play com que você pagou.'
          : ''
      }`,
    noAppTitle: 'Não tem mais o app instalado?',
    noApp: 'Escreva para <email/> do endereço ligado à sua conta, com o assunto “Delete my SpySocial account” (excluir minha conta do SpySocial). Os pedidos são processados em até 30 dias.',
    deletedTitle: 'O que é excluído',
    staysTitle: 'O que fica, e por quanto tempo',
    details: 'Nossa <link>Política de privacidade</link> tem os detalhes.',
  },

  notFound: {
    title: 'Página não encontrada',
    text: 'A página que você procura não existe.',
  },

  confirmSuccess: {
    title: 'E-mail confirmado',
    text: 'Seu e-mail foi verificado com sucesso. Agora você pode usar todos os recursos do app SpySocial.',
    home: 'Voltar ao início',
    expiredTitle: 'Link expirado',
    expired: 'Este link expirou ou já foi usado. Abra o SpySocial e toque em <b>Reenviar</b>.',
    browserText: 'Seu e-mail foi verificado com sucesso. Volte ao SpySocial no navegador e entre.',
    browserPhoneText: 'Seu e-mail foi verificado com sucesso. Volte ao SpySocial no computador em que você se cadastrou e entre.',
    browserButton: 'Voltar ao SpySocial',
  },
}

export default ptBR
