import type { PressStrings } from '../strings'

/** Português (pt-BR): "você", direto como o app; termos do app (src/help/locales/pt-BR.ts). */
const ptBR: PressStrings = {
  eyebrow: 'Kit de imprensa',
  title: 'Imprensa',
  lede: 'Para jornalistas e criadores: o que é o SpySocial, os dados principais, e logos e capturas de tela para usar na sua cobertura.',
  email: 'Escreva para a equipe',
  toAssets: 'Logos e capturas de tela',
  about: {
    eyebrow: 'Em um parágrafo',
    title: 'Sobre o SpySocial',
    short: (out) =>
      `SpySocial é um jogo de festa gratuito de blefe e dedução para 3 a 21 jogadores, cada um no seu celular ou tablet. Todo mundo sabe o segredo, menos os espiões. No Spy Talk o segredo é um local, e os jogadores se revezam fazendo e respondendo perguntas. No Spy Sketch é uma palavra, e os jogadores se revezam desenhando-a num mesmo quadro enquanto os espiões disfarçam. Depois, a mesa vota. A versão 2.2 ${out ? 'chegou' : 'chega'} ao iPhone, iPad e Android, com Spy Sketch, mesas do Jogar online, um tutorial guiado, Noites de Jogos, amigos, trocas e 10 idiomas. Não tem anúncios, e a única coisa à venda é um plano de membro opcional.`,
    moreTitle: 'A versão completa',
    sections: [
      {
        title: 'Dois jogos',
        text: 'No Spy Talk o segredo é um local. Os jogadores se revezam fazendo e respondendo perguntas, digitadas ou ditadas no microfone. Vago demais, você parece espião; óbvio demais, os espiões descobrem onde vocês estão. No Spy Sketch o segredo é uma palavra, desenhada na vez de cada um num mesmo quadro, enquanto os espiões desenham junto e tentam não ser pegos. Os dois têm os modos Clássico e Máfia, em que os espiões se conhecem e têm um chat secreto. Os locais vencem se expulsarem todos os espiões na votação. Os espiões vencem se adivinharem o segredo ou se ficarem escondidos até o tempo acabar.',
      },
      {
        title: 'Jeitos de jogar',
        text: 'As salas privadas recebem até 21 pessoas, com regras e pacotes próprios, e os amigos entram por QR code, link de convite ou código da sala. O Jogar online coloca você numa mesa de 4 ou 8, onde estranhos se veem como cores de agente, como Agente Turquesa, e não pelo nome. A Noite de Jogos é um evento online com data marcada e títulos que só dá para ganhar naquela noite. Quem é novo começa com um tutorial guiado de uns três minutos e depois joga partidas de treino contra agentes de IA, com nota de A a F.',
      },
      {
        title: '10 idiomas',
        text: 'Inglês, espanhol, russo, francês, português do Brasil, indonésio, hindi, bengali, árabe e chinês simplificado. Na mesma mesa, cada jogador vê o jogo no próprio idioma, e o chat é traduzido automaticamente.',
      },
      {
        title: 'Conquistado jogando',
        text: 'Os jogadores criam um agente no estilo film noir e ganham XP, títulos, molduras e comemorações jogando. As interceptações, arquivos lacrados ganhos jogando, abrem cada uma um item aleatório, e as chances aparecem antes de abrir. Dá para trocar itens com amigos, e adultos podem negociar no Mercado Negro por Intel, a moeda do próprio jogo, que só se ganha jogando. Dinheiro de verdade nunca compra itens, interceptações nem Intel, e nada disso tem valor em dinheiro. Os colecionáveis não são NFTs, tokens nem cripto.',
      },
      {
        title: 'Grátis, com uma única coisa à venda',
        text: 'Não tem anúncios. Spy Talk, Spy Sketch, a Noite de Jogos, as interceptações, as trocas e o Mercado Negro são grátis. A única coisa à venda é um plano de membro opcional: a assinatura mensal ou anual, ou o Vitalício (pagamento único). Ele libera todos os pacotes premium para todo mundo nas salas em que o membro é anfitrião ou na mesa dele no Jogar online, e inclui o criador de pacotes, 50% a mais de XP e mesas só para membros. Não vendemos pacotes avulsos nem combos, e interceptações e Intel nunca são vendidas.',
      },
    ],
  },
  facts: {
    eyebrow: 'Resumo',
    title: 'Ficha técnica',
    labels: {
      name: 'Nome',
      developer: 'Desenvolvedora',
      genre: 'Gênero',
      platforms: 'Plataformas',
      players: 'Jogadores',
      release: 'Lançamento',
      price: 'Preço',
      membership: 'Plano de membro',
      languages: 'Idiomas',
      age: 'Idade',
      website: 'Site',
      stores: 'Baixe',
      community: 'Comunidade',
      press: 'Contato para imprensa',
    },
    developer: 'SpySocial LLC, Pensilvânia, EUA',
    genre: 'Jogo de festa de dedução social',
    platforms: 'iPhone, iPad e celulares e tablets Android. Jogadores de iPhone e Android jogam juntos.',
    players: 'De 3 a 21 numa sala privada. Jogar online: mesas de 4 ou 8.',
    release: (out) =>
      out
        ? `A versão 2.2 já chegou, como atualização gratuita na App Store e no Google Play.`
        : `A versão 2.2 chega em breve. O SpySocial já está na App Store e no Google Play, e a 2.2 é uma atualização gratuita.`,
    price: 'Grátis para baixar e jogar. Sem anúncios.',
    membership: (month, year, life) =>
      `Opcional, e a única coisa vendida: a assinatura mensal por ${month} ao mês ou anual por ${year} ao ano (renovam até serem canceladas), ou o Vitalício por ${life}, em pagamento único. Preços dos EUA; variam conforme o país. Não vendemos pacotes avulsos nem combos.`,
    languages:
      'Inglês, espanhol, russo, francês, português do Brasil, indonésio, hindi, bengali, árabe, chinês simplificado. Todos menos os três primeiros aparecem como Beta no app.',
    age: '13 anos ou mais',
    press: '<email/>, com “Imprensa” no assunto',
  },
  assets: {
    eyebrow: 'Downloads',
    title: 'Logos e capturas de tela',
    sub: 'Use em matérias e vídeos sobre o SpySocial.',
    logoInk: 'Logo para fundos claros',
    logoCream: 'Logo para fundos escuros',
    icon: 'Ícone do app',
    banner: 'Banner',
    shotsTitle: 'Capturas de tela',
    shotsSub: 'Da página da 2.2 nas lojas, com as legendas no idioma desta página. Escolha outro idioma no topo da página para ver o conjunto dele.',
    file: (what, format) => `${what}, ${format}`,
  },
  safety: {
    eyebrow: 'Para pais e plataformas',
    title: 'Segurança',
    points: [
      'O SpySocial é para quem tem 13 anos ou mais.',
      'Os jogadores só conversam dentro de uma sala ou de um grupo, com quem está nele. Não existem mensagens diretas.',
      'Os filtros do chat bloqueiam ofensas e ameaças. Em qualquer sala com um jogador menor de 18 anos, links, e-mails, números de telefone e redes sociais ficam bloqueados para todos.',
      'Nas mesas do Jogar online, estranhos veem uma cor de agente, não um nome.',
      'Dá para denunciar qualquer jogador, mensagem, desenho ou pacote, e bloquear qualquer pessoa. Uma pessoa lê cada denúncia em até 24 horas, e as que envolvem a segurança de crianças ou um jogador menor de 18 anos vêm primeiro.',
    ],
  },
  contact: {
    title: 'Contato para imprensa',
    text: 'Entrevistas, acesso para análise ou dúvidas sobre jogar SpySocial no seu canal: mande um e-mail para <email/> com “Imprensa” no assunto.',
  },
}

export default ptBR
