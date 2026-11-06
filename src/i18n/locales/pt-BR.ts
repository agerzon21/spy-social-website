import type { Strings } from './en'

/** Português (pt-BR): "você", tom direto e informal como o app; termos do app (espião, locais, sala, anfitrião, Jogar online, Buscar partida, Ajustes). */
const ptBR: Strings = {
  meta: {
    siteName: 'SpySocial',
    defaultTitle: 'SpySocial — O jogo de festa da dedução social',
    description:
      'Junte os amigos e descubra o espião — ou engane todo mundo. Jogo de festa multijogador grátis em tempo real, de 3–21 jogadores. Para iOS e Google Play.',
    titles: {
      /** The Beta 2 playtester page (/beta). */
      beta: 'Beta 2: jogue SpySocial antes do lançamento',
      /** The transparency page (/transparency), live with LIVE.transparencyPage. */
      /** The collectibles ledger (/ledger), live with LIVE.mintedCollectibles. */
      ledger: "Registro de colecionáveis",
      transparency: "Relatório de transparência",
      /** The Game Night rules page (/game-night-rules), live with LIVE.gameNightRules. */
      gameNightRules: "Regras da Noite de Jogo",
      faq: "Ajuda e perguntas frequentes",
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
      joinEvent: 'Noite de Jogos pública',
      resetPassword: 'Redefinir sua senha',
      /** /reset-password once passwords are gone (LIVE.passwordless; set by the page's own Helmet). */
      resetPasswordCode: "Entre com um código",
      confirmSuccess: 'E-mail confirmado',
      notFound: 'Página não encontrada',
    },
    descriptions: {
      beta: 'Participe de um teste de jogo em grupo, ao vivo e de 1 hora, do SpySocial, um jogo grátis de dedução social para festas: quinta-feira, 12 de novembro de 2026, das 19h às 20h no horário do Leste dos EUA. Só maiores de 18, no iPhone ou Android. Os testadores ficam com o Pin beta e mais.',
      ledger: "O registro público de cada colecionável do SpySocial: cada cópia e seu número. Qualquer pessoa pode conferir.",
      transparency: "Todo mês: quanta Intel foi ganha, gasta e corrigida no SpySocial, cada incidente e cada mudança de regra, sem citar nenhum jogador.",
      gameNightRules: "As regras da Noite de Jogo semanal do SpySocial: quando acontece, quem pode participar, como ganhar os títulos da noite e o título bônus do desenvolvedor.",
      faq: "Ajuda do SpySocial: como jogar Spy Talk e Spy Sketch, Jogar online, salas privadas e Noite de Jogos, amigos, trocas, o Mercado Negro, interceptações, Intel, assinatura, sua conta, segurança e solução de problemas.",
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
    /** The link to the transparency page (LIVE.transparencyPage). */
    transparency: "Transparência",
    /** The link to the Game Night rules, once they're live (LIVE.gameNightRules). */
    gameNightRules: "Regras da Noite de Jogo",
    /** The link to the /beta playtest page, shown only until sign-ups close. */
    beta: "Teste Beta 2",
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
    rights: (year: number, holder = 'SpySocial') => `© ${year} ${holder}. Todos os direitos reservados`,
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
    creatorShort: {
      eyebrow: 'Criador em destaque',
      title: (creator: string) => `Veja ${creator} jogar Spy Sketch`,
      credit: (creator: string) => `Vídeo de <link>${creator}</link>`,
      cta: 'Jogue grátis no navegador',
      play: (creator: string) => `Assistir ao vídeo de ${creator}`,
      consent: 'Ao dar play, o vídeo é carregado do YouTube, que pode usar cookies. <link>Política de Privacidade</link>',
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
          text: 'O espião pode arriscar um chute no segredo. Acertou, vence; errou, está fora.',
          alt: 'O espião escolhe o lugar na lista para vencer a rodada',
        },
      ],
      win: 'Os locais vencem quando tiram todos os espiões na votação. Os espiões vencem adivinhando o segredo, ou ficando escondidos até o fim.',
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
      /** Shown once the released app sells memberships (LIVE.purchases). The only things sold are memberships. */
      purchases: 'Assinaturas opcionais se você quiser mais lugares e palavras.',
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
        'Em qualquer sala ou grupo com um jogador menor de 18 anos ou que não nos informou a idade, links, e-mails, números de telefone, redes sociais e outros dados pessoais (endereço de casa, onde alguém mora, escola, nome verdadeiro) ficam bloqueados para todos. Nas mesas do Jogar online e nas noites de jogos, eles ficam sempre bloqueados.',
    },
    reports: {
      title: '4. Uma pessoa lê as denúncias',
      text: (o: { messages: boolean; drawings: boolean }) =>
        `Toque e segure num jogador para denunciá-lo ou bloqueá-lo.${
          o.messages ? ' Toque e segure numa mensagem, pergunta ou resposta para denunciá-la: a denúncia a inclui, junto com o chat ao redor.' : ''
        }${o.drawings ? ' Você também pode denunciar um desenho.' : ''} Uma pessoa lê cada denúncia em até 24 horas. O chat público fica guardado por 14 dias para que as denúncias possam ser verificadas; o jogador denunciado não fica sabendo quem fez a denúncia.`,
    },
    /** Section 5, once members can make packs (LIVE.customPacks); `community`: LIVE.communityPacks. */
    packs: {
      title: '5. Pacotes personalizados',
      intro: 'Os pacotes que os membros criam também seguem estas regras: o nome, a descrição e cada item.',
      rules: [
        'Nada do que estas regras proíbem em outros lugares: nada de ódio, conteúdo sexual ou ameaças, e nada impróprio para jogadores a partir de 13 anos.',
        'Nada de informações pessoais nem de pessoas reais que você conhece: nada de colegas de classe, professores ou vizinhos, nem endereços, números de telefone, escolas ou perfis de redes sociais.',
        'Nada de anúncios, links ou spam, e só trabalho seu.',
      ],
      community:
        'Pacotes da comunidade: uma pessoa da nossa equipe lê cada pacote antes que qualquer outra pessoa possa vê-lo. Se um pacote violar estas regras, podemos recusá-lo, tirá-lo dos Pacotes da comunidade ou impedir que essa conta compartilhe pacotes. Qualquer jogador pode denunciar um pacote da comunidade, e uma pessoa lê cada denúncia em até 24 horas.',
      swearing:
        'Palavrões: permitidos nos pacotes que você joga nas suas próprias salas privadas, nunca nos Pacotes da comunidade, porque jogadores com menos de 18 anos os usam. Se um título tiver um (o de um filme, por exemplo), os Pacotes da comunidade o mostram censurado: a primeira letra e depois asteriscos (S***). Palavrões pesados não são permitidos lá de jeito nenhum.',
    },
    child: {
      title: 'Segurança infantil',
      text: 'Nunca permitimos conteúdo sexual envolvendo menores de 18 anos, nem que alguém tente aliciar, sexualizar ou explorar uma criança. Removemos esse conteúdo, banimos as contas envolvidas e o denunciamos ao National Center for Missing & Exploited Children (NCMEC), como a lei exige. Se você vir algo assim, escreva para <email/> com “Child safety” (segurança infantil) no assunto e denuncie o jogador no app se vocês estiveram na mesma sala. Você também pode denunciar direto na <link>CyberTipline</link> do NCMEC (1-800-843-5678). Se uma criança estiver em perigo imediato, ligue primeiro para o número de emergência local. Nossos <link2>Padrões de segurança infantil</link2> explicam mais.',
      subject: 'Child safety',
    },
    breaking: {
      title: 'O que acontece quando alguém quebra as regras',
      text: 'Normalmente, primeiro vem uma advertência. Problemas repetidos ou graves levam a um bloqueio do chat (de 1 hora a 7 dias), uma pausa nas salas públicas e nas Noites de Jogos (de 1 a 30 dias) ou um banimento. Compartilhar dados pessoais de alguém, ou qualquer coisa que sexualize uma criança, pode levar a um banimento imediato. Cada aviso no app diz o que está limitado, por quê e até quando, com um ID como S-207.',
      drawings:
        'Os desenhos em salas públicas e Noites de Jogos podem ser verificados automaticamente a qualquer momento, e os desenhos denunciados também são verificados. Se um desenho seu quebrar estas regras, sua conta pode ser pausada ou banida das salas públicas e das Noites de Jogos, não importa há quanto tempo você joga. Numa sala pública, uma vez de desenhar que quebra estas regras é removida do desenho e conta como uma infração: primeiro uma advertência, depois 3, 7 e 30 dias sem salas públicas e Noites de Jogos e, na quinta infração em 90 dias, para sempre. Em qualquer sala, um símbolo de ódio (uma suástica conta, a menos que a palavra da rodada deixe claro um sentido religioso), uma ofensa discriminatória escrita ou ódio contra alguém tira o jogador da partida e das salas públicas e das Noites de Jogos para sempre, e um desenho que sexualiza uma criança encerra a conta e é tratado como diz a seção Segurança infantil acima. Sangue e monstros são permitidos. Numa sala privada, um desenho denunciado só gera uma ação automática quando é grave a esse ponto; o resto fica a critério da pessoa que lê a denúncia. Para recorrer, mande para nós por e-mail o código do seu aviso.',
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
        `<b>Salas públicas e Noites de Jogos</b> com jogadores que seu filho ou sua filha não conhece${playOnline ? ', inclusive o Jogar online, que coloca os jogadores numa mesa automaticamente' : ''}.`,
      buy: '<b>Itens para comprar:</b> pacotes e assinaturas, pela App Store ou pelo Google Play.',
      /** `buy` once only memberships are sold (LIVE.membershipsOnly). */
      buyMembers:
        '<b>Itens para comprar:</b> só assinaturas (o Pack Pass, mensal ou anual, e o Passe vitalício), pela App Store ou pelo Google Play. Uma assinatura libera os pacotes que não são grátis; nada mais é vendido.',
      /** Once Intercepts are live (LIVE.intercepts). Use the app's own word for Intercepts. */
      intercepts:
        '<b>Interceptações:</b> recompensas ganhas jogando, cada uma com um item aleatório, como um visual novo para o agente. Não podem ser compradas, nem com dinheiro nem com a moeda ganha no jogo, e o app mostra as chances antes de alguém abrir uma.',
      /** `intercepts` once unopened Intercepts trade on the Black Market (LIVE.interceptsMarket). */
      interceptsMarket:
        "<b>Interceptações:</b> recompensas ganhas jogando, cada uma com um item aleatório, como um visual novo para o agente. Ninguém as vende por dinheiro, nem nós nem outros jogadores. Adultos também podem comprar e vender Interceptações fechadas entre si no Mercado Negro pela moeda ganha no jogo, que não pode ser comprada; menores de 18 anos não podem. O app mostra as chances antes de alguém abrir uma.",
      /** Home's Discord pill (LIVE.homeDiscord; under 16 never, 16-17 a safety note first). */
      discord:
        "<b>Um link para o nosso Discord:</b> o início pode mostrar um link para o servidor oficial do SpySocial no Discord, onde os jogadores encontram com quem jogar. O Discord é um app à parte, com regras e idade mínima próprias. Menores de 16 anos nunca veem o link, e jogadores de 16 e 17 anos veem antes um aviso para ficar seguros lá. Nossos moderadores cuidam do servidor, mas ninguém no SpySocial consegue ver as mensagens privadas do Discord.",
      /** Once members can make packs (LIVE.customPacks); `community`: LIVE.communityPacks. */
      customPacks: (community: boolean) =>
        `<b>Criador de pacotes:</b> os membros podem criar os próprios pacotes de lugares ou palavras para as salas privadas deles.${
          community ? ' Nossa equipe lê cada pacote compartilhado nos Pacotes da comunidade antes que qualquer outra pessoa possa vê-lo, e qualquer jogador pode denunciá-lo.' : ''
        }`,
      hasNotTitle: 'O que o SpySocial não tem',
      noDms:
        'Nada de mensagens diretas: os jogadores só conversam dentro de uma sala, com os jogadores que estão nela. O chat dos espiões dura uma partida e é filtrado, guardado e pode ser denunciado como o resto.',
      noFriends:
        'Nada de listas de amigos ou seguidores, busca de jogadores, perfis para navegar ou biografias, então ninguém pode procurar seu filho ou sua filha nem entrar em contato fora de uma sala.',
      noDmsSocial:
        "Nada de mensagens diretas: os jogadores só conversam dentro de uma sala, com os jogadores que estão nela, ou no chat de um grupo, com os amigos que fazem parte dele. Todos os chats são filtrados, guardados por um tempo e podem ser denunciados.",
      noSearch:
        "Nada de busca de jogadores nem de sugestões de amigos, então um desconhecido não pode procurar seu filho ou sua filha. Menores de 18 anos não têm perfil público e ninguém pode segui-los.",
      social:
        "<b>Amigos e grupos:</b> os jogadores podem adicionar amigos e jogar juntos em grupo, com um chat de grupo filtrado. Um adulto só pode adicionar um jogador com menos de 16 anos pessoalmente, escaneando o código de amigo no celular do jogador. Menores de 18 anos não têm perfil público, ninguém pode segui-los e eles não recebem notificações sociais à noite. No iPhone e no iPad, por enquanto, isso fica desligado para menores de 18 anos.",
      trading:
        "<b>Trocas:</b> jogadores de 13 a 17 anos só podem trocar itens do jogo por outros itens, com amigos que adicionaram pessoalmente, sem presentes nem mensagens. Adultos também podem comprar e vender itens no Mercado Negro pela moeda ganha no jogo; menores de 18 anos só podem olhar. Nada pode ser comprado ou vendido por dinheiro real.",
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
        '<b>Filtro do chat:</b> nomes e mensagens são verificados antes que alguém os veja. Em salas públicas, ofensas discriminatórias, palavras sexuais explícitas e insultos são bloqueados. Em salas privadas, as palavras mais graves são bloqueadas. Em qualquer sala ou grupo com um jogador menor de 18 anos ou que não nos informou a idade, links, e-mails, números de telefone, redes sociais e outros dados pessoais (endereço de casa, onde alguém mora, escola, nome verdadeiro) ficam bloqueados para todos. Nas mesas do Jogar online e nas noites de jogos, eles ficam sempre bloqueados.',
      reports:
        '<b>Denúncias, bloqueios e punições:</b> uma pessoa lê cada denúncia em até 24 horas, e o jogador denunciado não fica sabendo quem fez a denúncia. Denúncias que envolvem um jogador menor de 18 anos são lidas primeiro. As punições vão de uma advertência a um bloqueio do chat, uma pausa nas salas públicas ou um banimento. Nossas <link>Regras da comunidade</link> listam o que não é permitido.',
      drawingCheck:
        '<b>Verificação dos desenhos:</b> as vezes de desenhar numa sala pública podem ser verificadas automaticamente, e a vez que a verificação constatar que quebra as regras é removida do desenho.',
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
      dataRequests:
        '<b>Os dados do seu filho ou filha:</b> como pai, mãe ou responsável, você pode nos pedir uma cópia dos dados da conta, a correção do ano de nascimento ou a exclusão da conta. Nossa <link>Política de Privacidade</link> (Privacidade das crianças) explica como confirmamos o pedido e o que ele inclui.',
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

  ledger: {
    head: ['Colecionável', 'Quantidade e situação'],
    supply: (minted, burned, held) => [`${minted} cunhados`, `${burned} destruídos`, `${held} com jogadores`],
    neverAwarded: 'Nunca concedido',
    closed: (date, entry) => `Fechado em ${date} (registro ${entry})`,
    openUntil: (date) => `Aberto até ${date}`,
    search: 'Buscar colecionáveis',
    searchHint: 'Tente “moldura” ou “título”',
    clear: 'Limpar',
    sort: 'Ordenar',
    sortBy: { newest: 'Mais recentes', name: 'Nome (A–Z)', minted: 'Mais cunhados', held: 'Mais com jogadores' },
    count: (from, to, total) => `${from}–${to} de ${total}`,
    noMatch: (query) => `Nada corresponde a “${query}”.`,
    pages: 'Páginas da tabela',
    prev: 'Anterior',
    next: 'Próxima',
    page: (n, total) => `Página ${n} de ${total}`,
  },

  whatsNew: {
    title: 'Novidades',
    sub: 'Notas de versão do SpySocial. Grandes atualizações, recursos novos e melhorias, conforme lançamos.',
    releases: [
      {
        tag: "Lançamento no Android",
        summary:
          "O SpySocial chegou ao Google Play, com uma leva de correções dos testes em celulares Android de verdade.",
        sections: [
          {
            label: "Já disponível",
            items: [
              { title: "Android", text: "No Google Play desde 13 de junho de 2026." },
              { title: "iPhone e iPad", text: "As mesmas correções já estão na App Store." },
            ],
          },
          {
            label: "Correções",
            items: [
              { title: "Excluir conta", text: "O botão não fica mais cortado no fim da tela Conta." },
              { title: "Botões do lobby", text: "Sair da sala e Começar partida não ficam mais embaixo da barra de navegação do Android." },
              { title: "Começar partida", text: "Se a partida ainda não pode começar, o app diz por quê: são precisos pelo menos 3 jogadores, todo mundo pronto e pelo menos uma categoria." },
              { title: "Categorias", text: "O botão de voltar e o título não ficam mais espremidos." },
              { title: "Como jogar", text: "Só um botão de voltar no Android, não dois." },
              { title: "Tutorial", text: "Você pode pular em qualquer etapa, não só na primeira." },
              { title: "Contas de visitante", text: "O lembrete para salvar sua conta de visitante agora é um convite, não um alerta." },
              { title: "Ícones", text: "Os resultados e o Como jogar usam ícones que ficam iguais em qualquer celular Android." },
              { title: "Correções mais rápidas", text: "Correções pequenas agora chegam ao app sem esperar uma atualização na loja." },
            ],
          },
        ],
      },
      {
        tag: "Atualização de acabamento",
        summary:
          "Uma atualização de acabamento: nova tela de boas-vindas, telas de Fim de jogo e Conta renovadas, layout melhor no iPad e um monte de correções.",
        sections: [
          {
            label: "Recursos novos",
            items: [
              { title: "Nova tela de boas-vindas", text: "Visual novo, botões claros para entrar e se cadastrar e um link simples para continuar como visitante." },
              { title: "Salvar sua conta de visitante", text: "Enquanto você espera o e-mail de confirmação, a tela Conta mostra em que passo você está, com Reenviar, Cancelar e Atualizar." },
            ],
          },
          {
            label: "Visual renovado",
            items: [
              { title: "Fim de jogo", text: "Novos cards de jogador, um troféu para quem venceu, o local com um alfinete no mapa e um botão claro para voltar ao lobby." },
              { title: "Conta", text: "Uma lista só, organizada, com seções claras e a Zona de perigo lá no fim." },
              { title: "iPad", text: "A tela grande mais bem aproveitada: seis cards de jogador por linha no lobby, quadros de jogador maiores na partida e nada cortado." },
            ],
          },
          {
            label: "Correções para Android",
            items: [
              { title: "Gesto de voltar", text: "Deslizar para voltar (ou tocar em Voltar) na partida ou no lobby agora pergunta antes de você sair, igual ao botão Sair." },
              { title: "Cards", text: "Os cards de votação e de fim de jogo não mostram mais uma caixinha apagada por dentro." },
              { title: "Fim de jogo", text: "Não sobra mais um espaço embaixo do cabeçalho." },
              { title: "Seletores", text: "Os seletores dos ajustes do lobby ficaram legíveis e não fazem mais o app travar ao fechar." },
            ],
          },
          {
            label: "Melhorias",
            items: [
              { title: "Cronômetros", text: "As contagens regressivas seguem o relógio do jogo, então ficam certas mesmo se o relógio do seu celular estiver errado." },
              { title: "Cadastro e e-mail", text: "Cadastrar, reenviar a confirmação, redefinir a senha e trocar o e-mail ficaram mais confiáveis." },
              { title: "E-mails de suporte", text: "Se o seu celular não tem app de e-mail, tocar num endereço de suporte copia o endereço em vez de mostrar um erro." },
              { title: "Idiomas", text: "Tudo o que é novo está em inglês, espanhol e russo." },
            ],
          },
        ],
      },
      {
        tag: "Grande atualização",
        summary:
          "O jogo online refeito do zero: todas as telas redesenhadas, conexão mais estável e uma porção de recursos novos.",
        sections: [
          {
            label: "Recursos novos",
            items: [
              { title: "Tutorial e perfil", text: "Quem está começando ganha um passo a passo do jogo e configura o perfil rapidinho." },
              { title: "Caderno", text: "Anote quem disse o quê durante a rodada. Jogadores com notas aparecem primeiro, e os eliminados por último." },
              { title: "Dicas traduzidas", text: "Se a partida está em outro idioma, toque numa dica para ler no seu. Todo mundo na mesa continua com a mesma dica." },
              { title: "Cutucadas", text: "Toque no card de um jogador no lobby para dar uma cutucada." },
              { title: "QR codes", text: "Compartilhe uma sala pelo menu de compartilhar do celular, com um QR code para escanear." },
              { title: "Links de sala", text: "Um link de sala abre o app e leva você direto para a sala, mesmo com o app fechado." },
              { title: "Códigos de sala mais curtos", text: "5 caracteres, mais fáceis de falar em voz alta. Os códigos antigos de 6 continuam funcionando." },
              { title: "Quem chamou a votação", text: "Um ajuste do lobby que mostra quem começou cada votação." },
              { title: "Encerrar a partida", text: "O anfitrião pode encerrar uma partida antes da hora." },
              { title: "Mais locais", text: "Um pacote novo de locais para jogar." },
              { title: "Botão Sair", text: "Saia de uma partida com um toque." },
            ],
          },
          {
            label: "Visual renovado",
            items: [
              { title: "", text: "Um lobby novo, com cards de jogador interativos e ajustes redesenhados." },
              { title: "", text: "Telas de partida, votação e resultado da votação redesenhadas. A votação mostra quem a chamou e como ela está indo." },
              { title: "", text: "A revelação dos papéis mostra quem ainda falta e agora dura 60 segundos." },
              { title: "", text: "Os cards da tela inicial ajustam o texto." },
              { title: "", text: "Todas as telas da partida têm o mesmo cabeçalho escuro." },
              { title: "", text: "O aviso de sem conexão é igual em todas as telas e não bate mais na Dynamic Island." },
              { title: "", text: "A tela Conta mostra uma mensagem clara quando você está sem conexão." },
            ],
          },
          {
            label: "Melhorias",
            items: [
              { title: "Conexão", text: "Depois que o celular fica muito tempo em repouso, o app não diz mais, por engano, que você está sem conexão." },
              { title: "", text: "Sem conexão, a tela Jogar tenta de novo a cada 5 segundos e não parece mais que você saiu da conta." },
              { title: "", text: "Jogo ao vivo mais estável no lobby, na revelação dos papéis, na partida, na votação e nos resultados." },
              { title: "", text: "O cronômetro da partida segue o relógio do jogo, não o do seu celular." },
              { title: "", text: "Reconecta melhor quando o sinal cai." },
              { title: "", text: "Cadastro, redefinição de senha e salvar uma conta de visitante ficaram mais confiáveis." },
              { title: "", text: "Mensagens mais claras na tela Conta." },
              { title: "", text: "Inglês, espanhol e russo em todo lugar, incluindo as 171 sugestões de dica." },
              { title: "", text: "Caderno: o teclado não abre mais sozinho quando você escolhe um jogador." },
              { title: "", text: "Dicas: tocar numa dica não troca mais a dica sem querer. Use o botão de recarregar para pegar outra." },
              { title: "", text: "Pronto para o iOS 26." },
            ],
          },
          {
            label: "Correções de bugs",
            items: [
              { title: "", text: "Corrigida uma confusão rara quando uma votação e o fim da partida aconteciam juntos." },
              { title: "", text: "Corrigidos votos contados duas vezes e votações que terminavam na hora errada." },
              { title: "", text: "Corrigida a contagem de abstenções. Abster-se agora fica junto dos outros botões de voto." },
              { title: "", text: "Corrigido o cabeçalho que cobria o resultado do palpite." },
              { title: "", text: "Corrigida uma piscada ao abrir a tela da partida." },
              { title: "", text: "Corrigido um erro que desconectava você ao salvar a conta de visitante." },
              { title: "", text: "Corrigido o campo de e-mail da tela Conta." },
              { title: "", text: "Corrigido o texto cortado nos cards da tela inicial e nos cabeçalhos em espanhol." },
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
          title: 'Seu agente e o Cofre',
          text: "Crie seu próprio avatar de espião e ganhe visuais novos jogando. O Cofre vende só assinaturas: todos os pacotes premium nas salas que você comanda e na sua mesa no Jogar online, o criador de pacotes e liderar um grupo. Tudo opcional, e nada disso muda o jeito de jogar.",
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
      launchWeek: 'Semana de lançamento: Spy Talk na terça, 8 de dezembro, Spy Sketch na sexta, 11 de dezembro, e Máfia no sábado, 12 de dezembro, sempre das 20h às 22h no horário do leste dos EUA (ET).',
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
    afterInstall: "Depois de instalar, toque no link de convite de novo.",
  },

  joinEvent: {
    label: 'Noite de Jogos pública',
    broken: 'Este link de Noite de Jogos não funciona',
    brokenHelp: 'Confira o link, ou abra o SpySocial e procure salas.',
    live: 'Ao vivo',
    cancelled: 'Cancelada',
    ended: 'Encerrada',
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
    // passwordless (legalRelease LIVE.passwordless): the page that replaces the reset form.
    goneTitle: "Não há mais senhas",
    goneBody: "Entre com um código de uso único no app.",
    goneOpen: "Abrir o SpySocial",
    goneNoApp: "Não tem o app?",
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
    guest: (purchases: boolean, oldApps: boolean) =>
      `Uma conta de visitante é excluída no momento em que você toca em <b>Sair</b> (em Ajustes, em Conta e acesso${oldApps ? '; em versões anteriores à 2.2, em Conta, na seção Conta e segurança' : ''}) e confirma. Um visitante não pode entrar de novo, então não há como recuperar a conta.${
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

  beta: {
    eyebrow: 'Beta 2 · Teste ao vivo',
    title: 'Jogue primeiro',
    lede: '<b>US$\u00a010 pelo PayPal como agradecimento</b> para cada jogador confirmado que participar da hora inteira desta sessão de teste de jogo em grupo e ao vivo do SpySocial, o jogo grátis de dedução social para festas, e enviar a pesquisa de 5 minutos, igual no iPhone e no Android, mais um bônus de US$\u00a050 para o relato de bug ou a ideia mais útil da sessão. Além disso, recompensas beta que ficam com você depois do lançamento: o Pin beta, dois títulos, 10 interceptações de cada nível e 1 mês de assinatura.',
    /** Short note under the lede and in the rewards: the test's progress does not carry over. */
    reset: 'Partidas, XP e itens do teste são zerados no lançamento.',
    headsUp: '<b>Atenção:</b> o SpySocial da App Store e do Google Play é uma versão antiga. A beta é uma versão nova e bem diferente; você instala pelo link que mandamos por e-mail.',
    facts: ['1 hora, ao vivo', 'Só maiores de 18', '24 vagas', 'iPhone ou Android'],
    when: {
      label: 'Quando',
      et: (time: string) => `${time}, horário do Leste dos EUA (ET)`,
      others: (pacific: string, utc: string) => `${pacific}, horário do Pacífico · ${utc}\u00a0UTC`,
      yours: (time: string) => `No seu horário: ${time}`,
      checkIn: (time: string) => `O check-in abre às ${time} (horário do Leste) no canal de voz do Discord.`,
    },
    europe: {
      label: 'Europa · Segunda sessão opcional',
      time: (cet: string, uk: string) => `${cet}\u00a0CET · ${uk} no Reino Unido`,
      note: (date: string) => `Só acontece se pessoas suficientes da Europa se inscreverem. Confirmamos até ${date}.`,
    },
    signUp: 'Inscreva-se',
    signUpNote: (day: string, time: string) => `Cerca de 2 minutos. As inscrições fecham ${day}, às ${time} (horário do Leste).`,
    discord: 'Entre no nosso Discord',
    closed: 'As inscrições estão encerradas. Siga a gente no Discord para o próximo teste.',
    games: {
      eyebrow: 'O que você joga',
      title: 'Dois jogos',
      talk: 'Perguntas e respostas. Um ou dois jogadores não sabem o lugar secreto e tentam se disfarçar.',
      sketch: 'Todo mundo contribui para o mesmo desenho. Os espiões disfarçam.',
    },
    who: {
      eyebrow: 'Para quem',
      title: 'Quem procuramos',
      adults: '<b>Só adultos, maiores de 18.</b> 24 vagas.',
      phones: '<b>Um iPhone (TestFlight) ou um celular Android (teste do Google Play).</b> Celulares Android são especialmente bem-vindos:',
      androidLabel: 'Celulares Android que mais queremos testar',
      fans: '<b>Fãs de dedução social:</b> Among Us, Spyfall, Lobisomem/Máfia, Blood on the Clocktower, Codenames. Iniciantes também são bem-vindos.',
      mic: '<b>Um microfone ajuda.</b> Só ouvir também vale.',
      langs: '<b>O jogo está em 10 idiomas:</b>',
      langsLabel: 'Os idiomas do jogo',
    },
    ask: {
      eyebrow: 'O que pedimos',
      title: 'Jogue. Fale. Conte.',
      steps: ['<b>Jogue</b> durante a hora.', '<b>Fale em voz alta</b> sobre tudo o que confundir você.', '<b>Responda uma pesquisa de 5 minutos</b> depois.'],
      wantTitle: 'O que queremos descobrir',
      want: ['Fica claro de quem é a vez?', 'A votação é fácil de entender?', 'O desenho funciona bem no seu celular?'],
    },
    get: {
      eyebrow: 'O que você ganha',
      title: 'Recompensas beta que ficam com você depois do lançamento',
      items: ['O <b>Pin beta</b>', 'Os títulos <b>Beta tester</b> e <b>Testador de Campo</b>', '<b>10 interceptações</b> de cada nível', '<b>1 mês</b> de assinatura'],
      prizeTitle: 'US$\u00a010 de agradecimento pelo PayPal + um bônus de US$\u00a050',
      prize: 'Um agradecimento de US$ 10 pelo PayPal pelo seu tempo na sessão ao vivo: cada jogador confirmado que participar da hora inteira e enviar a pesquisa de 5 minutos recebe em até 7 dias após a sessão, igual no iPhone e no Android. Só instalar a versão de teste não dá direito a ele. Além disso, um bônus de US$ 50 (vale-presente) para o relato de bug ou a ideia mais útil da sessão, escolhido pelo desenvolvedor em até uma semana.',
      seats: (day: string) => `24 vagas. O agradecimento vai só para os jogadores que confirmarmos por e-mail (até ${day}) e que participarem da sessão; os demais entram na lista de espera do próximo teste.`,
    },
    friends: {
      eyebrow: 'Amigos',
      title: 'Traga um amigo',
      text: '<b>Coloque o nome de um amigo no formulário</b> para jogar na mesma mesa. Quem testou a Beta 1 tem prioridade.',
    },
    join: {
      eyebrow: 'Como participar',
      title: 'Quatro passos',
      form: '<link>Preencha o formulário de inscrição</link> (cerca de 2 minutos).',
      closes: (day: string, time: string) => `As inscrições fecham ${day}, às ${time} (horário do Leste).`,
      email: (day: string) => `Mandamos um e-mail até ${day} para confirmar sua vaga e enviar o link de instalação.`,
      discord: '<link>Entre no nosso Discord</link>: o check-in é no canal de voz.',
      android: 'Android: o formulário pede o e-mail do Google da sua Play Store, porque o Google exige isso para versões de teste. Ele é apagado depois da sessão.',
      iphone: 'iPhone: você instala o SpySocial pelo TestFlight, com o link do e-mail.',
    },
    fine: 'Versão de pré-lançamento. Não compartilhe nomes nem o chat de outros jogadores. Seus dados de inscrição são apagados depois da Beta 2. Seu e-mail do PayPal é apagado assim que enviarmos o seu agradecimento.',
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

  launch: {
    railLabel: "Telas do SpySocial 2.2",
    shots: {
      talk: "Spy Talk: Pergunte com astúcia. Ache o espião.",
      sketch: "Spy Sketch: Desenhe o segredo. Pegue o impostor.",
      online: "Jogar online: Mesas de 4 ou 8, a qualquer hora",
      gamenight: "Noite de Jogos: Títulos que só saem naquela noite",
      market: "Mercado Negro: Troque itens com outros agentes",
      friends: "Amigos: Adicione amigos. Joguem juntos.",
    },
    cards: [
      { title: "Spy Sketch", text: "Desenhe a palavra secreta num quadro compartilhado e pegue o espião que está fingindo." },
      { title: "Jogar online", text: "Toque em Buscar partida para uma mesa de 4 ou 8, a qualquer hora. Estranhos veem sua cor de agente, nunca seu nome." },
      { title: "Noite de Jogos", text: "Noites online com hora marcada e títulos que só saem naquela noite. A gente avisa antes de começar." },
      { title: "Mercado Negro", text: "Troque itens com amigos. Adultos também compram e vendem itens no Mercado Negro por Intel, que se ganha jogando. Nunca por dinheiro real." },
      { title: "Assinaturas", text: "Opcional: o Passe de pacotes (mensal ou anual) ou o Vitalício, pago uma vez e que nunca renova. Todos os pacotes premium nas salas que você comanda e na sua mesa no Jogar online, e o criador de pacotes. Nada mais é vendido." },
    ],
    allNotes: "Tudo o que há de novo na 2.2",
    community: {
      title: "Ache sua mesa",
      text: "Noites de jogos, novidades e jogadores procurando partida: entre no Discord do SpySocial.",
      discord: "Entrar no Discord",
      pressTitle: "Imprensa e criadores",
      press: "Vai escrever sobre o SpySocial ou quer jogar no seu canal? Mande um e-mail para <email/> com “Imprensa” no assunto.",
    },
    notes: {
      tag: "Lançamento",
      summary: "Nossa maior atualização: Spy Sketch, Jogar online, a Noite de Jogos, a partida de treino, as trocas, o Mercado Negro e as assinaturas.",
      items: [
        { title: "Partida de treino", text: "Aprenda Spy Talk e Spy Sketch numa partida de verdade com agentes de IA, como local ou como espião. A gente orienta cada jogada e dá à sua partida uma nota de A a F." },
        { title: "Minhas pistas", text: "Os espiões anotam o que descobrem na página de pistas, montam uma lista curta de lugares ou palavras possíveis e dão o palpite final a partir dela." },
        { title: "Regras de sala privada", text: "Regras opcionais, como o Informante: um local que conhece um espião em segredo. Em Como jogar > Recursos e configurações tem uma demo curta e jogável de cada uma." },
        { title: "Amigos e grupos", text: "Adicione amigos com seu código de amigo ou nome de usuário, siga jogadores e procurem mesa juntos, em grupo. Criar um grupo é para membros. No iPhone e no iPad, amigos, grupos e trocas são para maiores de 18." },
        { title: "Interceptações", text: "Arquivos lacrados com um item aleatório para o seu agente, ganhos com vitórias no Jogar online, na sequência diária e na Noite de Jogos. Alguns itens vêm como Únicos: exemplar único, com cor e número de série próprios. As chances aparecem antes de abrir ou comprar. Nunca vendidas por dinheiro." },
        { title: "Intel e trocas", text: "Intel é o dinheiro do próprio jogo: você ganha jogando e gasta no Cofre. Não pode ser comprado e não tem valor em dinheiro. Troque itens com amigos quando sua conta tiver 7 dias, seu e-mail estiver confirmado e você tiver jogado 3 partidas. Cada troca fica protegida por 7 dias." },
        { title: "Pacotes da comunidade", text: "Explore em Comunidade os pacotes feitos pelos jogadores. Membros escrevem os próprios com o criador de pacotes e compartilham." },
        { title: "10 idiomas", text: "Inglês, espanhol e russo, além de francês, português (Brasil), chinês (simplificado), hindi, árabe, bengali e indonésio em beta. Cada um vê o jogo no próprio idioma." },
        { title: "Notificações", text: "Para convites e pedidos de amigos, trocas, ofertas do Mercado Negro e as Noites de Jogos em que você tocou em Me avise." },
      ],
      more: "E mais: estatísticas, níveis até 100 com prestígio, conquistas, títulos, molduras e comemorações, menções com @, minijogos no Arcade, um microfone mais rápido, volta ao jogo sem tropeço depois que o celular dorme e um visual novo em todas as telas.",
      newLabel: "Novidades da 2.2",
      moreLabel: "E mais",
    },
  },
}

export default ptBR
