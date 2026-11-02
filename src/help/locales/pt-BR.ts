import type { HelpText } from '../types'

/** Português (pt-BR): "você", direto e informal como o app; termos do app (Sala privada, Criar sala, Jogar online, Buscar partida, Ações, Adivinhar, Cofre, Mercado Negro, Achados raros, interceptações, Intel, Ajustes). */
const ptBR: HelpText = {
  title: 'Ajuda e perguntas frequentes',
  lede: 'Respostas rápidas sobre como jogar SpySocial, sua conta, as recompensas e a assinatura.',
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
          q: 'Quantos jogadores precisa?',
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
            `A assinatura, opcional, libera os pacotes premium e alguns visuais para o seu agente. Nada que você compra ajuda a ganhar.${o.purchases ? '' : ' A assinatura começa a ser vendida com a versão 2.2.'}`,
          ],
        },
        {
          id: 'start-a-game',
          q: 'Como começo uma partida?',
          a: [
            '<b>Com amigos:</b> toque em <b>Sala privada</b> e depois em <b>Criar sala</b>, e compartilhe o código da sala, o QR code ou o link de convite. Precisa de pelo menos 3 jogadores.',
            '<b>Com qualquer pessoa:</b> toque em <b>Jogar online</b> e depois em <b>Buscar partida</b>.',
            '<b>É novo?</b> <b>Como jogar</b>, no início, tem uma introdução de 1 minuto, tutoriais, um glossário e uma partida de treino.',
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
            'Primeiro o interrogatório: na sua vez, cada jogador faz uma pergunta ao próximo e responde uma.',
            'Depois a discussão livre: converse, insista nas respostas estranhas e peça votações.',
            'Sem ideia? A carta de dicas, embaixo na tela, tem uma pergunta. Perguntar o nome do local ou a primeira letra não vale.',
          ],
        },
        {
          id: 'spy-sketch',
          q: 'Como funciona o Spy Sketch?',
          a: [
            'Os jogadores desenham, um de cada vez, num quadro compartilhado. Os locais dão pistas da palavra sem desenhá-la de vez. Os espiões acrescentam algo vago que possa servir.',
            'Depois que todos jogaram sua vez, abrem as votações e o palpite do espião. As rodadas seguem até o fim da partida.',
          ],
        },
        {
          id: 'voting',
          q: 'Como funciona a votação?',
          a: [
            'Abra <b>Ações</b> e toque em <b>Votar</b>. Cada um escolhe um jogador ou <b>Abster-se</b> e confirma. Voto confirmado não muda.',
            '<b>Maioria:</b> alguém só é eliminado com votos de mais da metade dos jogadores que ainda estão no jogo.',
            '<b>Mais votos:</b> ter mais votos que todo mundo basta, desde que superem as abstenções.',
            'Empate no primeiro lugar não elimina ninguém, e sempre são precisos pelo menos 2 votos.',
            'Nas mesas do Jogar online, cada jogador pode pedir uma votação e diz quem acusa. Quando uma votação pega um espião, todos que usaram a sua a recebem de volta.',
          ],
        },
        {
          id: 'spy-guess',
          q: 'Como funciona o palpite do espião?',
          a: [
            'Um espião abre <b>Ações</b> e toca em <b>Adivinhar</b>. Ele tem 60 segundos para escolher o segredo numa lista de uns 30.',
            'Acertou: todos os espiões ganham. Errou, ou o tempo acabou: esse espião sai. Se era o último, os locais ganham.',
            'Todo mundo vê quem está adivinhando, então isso entrega você.',
            'Com <b>Um só palpite</b> ligado (salas privadas), a equipe espiã tem uma única chance: errou, a equipe toda perde.',
          ],
        },
        {
          id: 'winning',
          q: 'Como cada lado ganha?',
          a: [
            'Os <b>locais</b> ganham eliminando todos os espiões, ou quando o último espião erra o palpite.',
            'Os <b>espiões</b> ganham acertando o palpite, quando o tempo da partida acaba, ou quando uma votação deixa tantos espiões quanto locais.',
            '<b>Votação final:</b> se o tempo acabar com exatamente um espião no jogo, todos votam mais uma vez. Peguem o espião e os locais ganham. Ela vale no Jogar online e é um ajuste nas salas privadas.',
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
            'As salas que os jogadores criam são privadas, para quem você conhece. Os amigos entram com o código da sala, o QR code ou o link de convite. Convidados sem conta também entram.',
            'O anfitrião define as regras: jogo, espiões, tempos, votação e pacotes. O máximo vai até 21 jogadores, e <b>Trancar sala</b> impede que gente nova entre.',
            'Todos jogam com os pacotes que o anfitrião liberou.',
          ],
        },
        {
          id: 'game-night',
          q: 'O que é a Noite de Jogos?',
          a: [
            'Nosso evento online, nas noites que anunciamos no app, normalmente das 20h às 22h no horário do leste dos EUA. Toque em <b>Jogar agora</b> no cartão da Noite de Jogos no início.',
            'Cada noite tem seus pacotes, ajustes e títulos. O (i) ao lado da noite mostra tudo.',
            'É grátis, e nada que você compra melhora suas chances. As regras completas: <gnr>regras da Noite de Jogos</gnr> (em inglês).',
          ],
        },
        {
          id: 'practice-game',
          q: 'O que é a partida de treino?',
          a: [
            'Uma partida de uns 5 minutos contra agentes de IA, com um treinador, em <b>Como jogar</b>. Você ganha uma nota de A a F e pode continuar de onde parou.',
            'Antes de você jogar Spy Talk ou Spy Sketch online, o app pode pedir que passe no treino desse jogo com C ou melhor. A Noite de Jogos nunca pede.',
          ],
        },
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
              : ['Numa sala privada, o anfitrião escolhe o idioma da partida para o segredo e as dicas.']),
          ],
        },
      ],
    },
    {
      id: 'in-game',
      title: 'Durante a partida',
      items: [
        {
          id: 'wax-seal',
          q: 'O que é o Selo de Cera?',
          a: [
            'O selo no alto à direita da tela do jogo. Toque nele quando quiser para abrir o chat completo da partida, suas notas e as informações do jogo. Um ponto vermelho indica mensagens novas.',
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
            'Suas notas são privadas, ficam no seu celular e são apagadas no fim da partida.',
          ],
        },
        {
          id: 'leave-rejoin',
          q: 'Posso sair de uma partida e voltar?',
          a: [
            'Ao sair, você vai para o início, onde o cartão da sua sala tem <b>Voltar</b>. Seu lugar fica guardado enquanto você está fora.',
            'O anfitrião pode tocar em <b>Encerrar partida</b> para parar para todos. Aí ninguém ganha.',
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
            '<b>Pessoalmente:</b> mostre seu <b>código de amigo</b> e deixe a pessoa escanear no SpySocial. Ele muda com frequência, então um print para de funcionar.',
            '<b>De uma partida privada</b> que vocês jogaram juntos nas últimas 24 horas.',
            '<b>Só adultos:</b> de uma mesa pública, ou pelo nome de usuário exato, se a pessoa permitir.',
            'A amizade é dos dois lados. Você pode remover ou bloquear um amigo quando quiser, e ele não fica sabendo. Não existem mensagens privadas.',
          ],
        },
        {
          id: 'parties',
          q: 'O que é um grupo?',
          a: [
            'Um líder e até 3 amigos que jogam juntos. O líder precisa de uma assinatura.',
            'O grupo joga junto nas mesas do Jogar online e nas Noites de Jogos (no máximo meia mesa, marcado para todos), ou abre uma sala privada.',
            'O chat do grupo segue as mesmas regras de todo o chat, e você pode denunciar qualquer mensagem.',
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
            'Você troca com amigos, dentro do app. Precisa de uma conta com pelo menos 7 dias, e-mail confirmado e 3 partidas contadas (partidas terminadas que entram nas suas estatísticas).',
            'Cada lado oferece até 10 itens, e os dois confirmam antes da troca. Trocas grandes pedem um código que mandamos por e-mail.',
            'O app marca quais itens dá para trocar. A assinatura e o que ela inclui, as recompensas de nível e os itens dos jogos de arcade nunca dão.',
            `Intel só pode ser trocada entre adultos${o.launch ? '' : ', a partir do lançamento da 2.2 em 8 de dezembro'}.`,
            'Comprar ou vender itens, Intel ou contas por dinheiro de verdade é contra as regras.',
          ],
        },
        {
          id: 'trade-protection',
          q: 'O que é a proteção de 7 dias? Posso desfazer uma troca?',
          a: [
            'O que você recebe numa troca fica protegido por 7 dias. Dá para usar um item na hora, mas ainda não dá para trocá-lo, triturá-lo nem usá-lo numa Troca, e a Intel recebida ainda não pode ser gasta.',
            'Nesses 7 dias, você pode reverter suas trocas, uma vez a cada 90 dias. Isso reverte todas as suas trocas protegidas e pausa suas trocas por 30 dias.',
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
            'No iPhone, menores de 18 não podem trocar até sair uma versão do app que peça o consentimento de um responsável pela Apple.',
          ],
        },
        {
          id: 'trading-paused',
          q: 'Por que minhas trocas estão pausadas?',
          a: [
            'As trocas pausam por um tempo depois de mudar o e-mail ou a forma de login, depois de entrar num aparelho novo, depois de reverter suas trocas (30 dias) ou quando você mesmo as tranca.',
            'Isso protege seus itens se outra pessoa entrar na sua conta.',
          ],
        },
      ],
    },
    {
      id: 'black-market',
      title: 'Mercado Negro e Achados raros',
      items: [
        {
          id: 'black-market',
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
            'Menores de 18 podem olhar, mas não podem comprar, vender nem fazer ofertas.',
            ...(o.launch ? [] : ['A Intel começa a circular lá no lançamento da 2.2, em 8 de dezembro. Até lá, dá para dar uma olhada.']),
          ],
        },
        {
          id: 'black-market-fees',
          q: 'Quais são as taxas, os limites e o preço mínimo?',
          a: [
            'Cada item vendido paga uma taxa de 2% (no máximo 5.000 de Intel), que sai do jogo.',
            'Nenhuma oferta pode ficar abaixo do preço mínimo de um item: o que uma cópia rende ao ser triturada. Para uma interceptação fechada, é a média do seu nível.',
            'Membros podem ter 8 ofertas abertas ao mesmo tempo; os outros, 4. Enquanto uma oferta está aberta, a Intel ou os itens dela ficam reservados (você ainda pode usar os itens).',
            'Dá para cancelar uma oferta quando quiser e pegar o que sobrou.',
          ],
        },
        {
          id: 'black-market-protection',
          q: 'As vendas do Mercado Negro são protegidas?',
          a: [
            'Uma venda em Itens é definitiva na hora.',
            'Um Único comprado nos Achados raros fica protegido por 3 dias: não pode ser trocado, anunciado, triturado nem usado numa Troca, e a Intel de quem vendeu espera. Nesse tempo a venda pode ser revertida, como uma troca.',
            'Se quem compra ou quem vende excluir a conta nesses 3 dias, a venda é desfeita: o comprador recebe a Intel de volta, ou o vendedor recebe o Único de volta.',
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
            'Nunca são vendidas por dinheiro, e a assinatura não dá mais nem chances melhores.',
            'Antes de abrir uma, o app mostra as chances exatas em <b>Chances</b>.',
          ],
        },
        {
          id: 'intercept-tiers',
          q: 'Quais são os níveis das interceptações?',
          a: [
            'Cinco níveis, do mais baixo ao mais alto: <b>Restrito</b>, <b>Confidencial</b>, <b>Secreto</b>, <b>Ultrassecreto</b> e <b>Enigma</b>.',
            'O nível é definido quando você ganha. Quanto mais alto, melhores as chances.',
            'Um <b>Único</b> é uma cópia com uma cor e um número que nenhuma outra cópia tem.',
          ],
        },
        {
          id: 'earn-intercepts',
          q: 'Como ganho interceptações?',
          a: [
            '<b>Vitórias:</b> a cada 10 vitórias no Jogar online, você ganha 5 interceptações, uma delas de nível Secreto ou melhor.',
            '<b>Diária:</b> sua primeira partida do dia no Jogar online dá uma, e sequências longas dão mais (a cada 30 dias seguidos, uma Enigma).',
            '<b>Noite de Jogos:</b> os vencedores da noite ganham uma Enigma.',
            `<b>Códigos e presentes:</b> um código de um criador ou nosso vale uma vez por conta, e as interceptações dele são liberadas depois da sua primeira partida contada no Jogar online. Também damos algumas de presente.${o.launch ? ' Interceptações de código ou de presente são só suas: não podem ser trocadas nem vendidas.' : ''}`,
            'Salas privadas não dão interceptações.',
            ...(o.launch
              ? []
              : ['Antes de a 2.2 abrir para todos, as interceptações recomeçam do zero: as ganhas em versões de teste são apagadas. O Pin beta e o que foi comprado numa loja continuam.']),
          ],
        },
        {
          id: 'duplicates',
          q: 'O que faço com os repetidos?',
          a: [
            '<b>Triture</b> uma cópia repetida por Intel, no valor que o app mostra.',
            '<b>Troca:</b> 5 cópias repetidas de uma raridade dão 1 item aleatório da raridade seguinte, e 10 cópias Lendárias repetidas dão um Único.',
            'Só contam os repetidos, nunca sua primeira cópia nem um Único.',
          ],
        },
        {
          id: 'intel',
          q: 'O que é a Intel?',
          a: [
            'A moeda que você ganha jogando: com suas partidas, sua primeira partida do dia e sua sequência diária, e triturando cópias repetidas.',
            'A Intel nunca é vendida e não vale dinheiro. Adultos gastam no Mercado Negro e podem trocá-la com outros adultos.',
            'Cada mudança na sua Intel é uma linha no seu registro de Intel, com o motivo.',
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
      ],
    },
    {
      id: 'membership',
      title: 'Assinatura',
      items: [
        {
          id: 'membership-includes',
          q: 'O que a assinatura inclui?',
          a: [
            ...(o.purchases ? [] : ['A assinatura começa a ser vendida com a versão 2.2.']),
            'Todos os pacotes premium, inclusive os novos. Todo mundo numa sala com você joga com eles também.',
            'Crie seus próprios pacotes com o criador e compartilhe na comunidade.',
            '+50% de XP em toda partida e salas só para membros no Jogar online.',
            'A moldura, a etiqueta e o título do seu nível. Você pode liderar um grupo e ter 8 ofertas abertas no Mercado Negro em vez de 4.',
            'Nunca muda como você joga ou pontua. Os pacotes grátis continuam grátis para todos.',
          ],
        },
        {
          id: 'membership-plans',
          q: 'O que são Agente, Elite e Mestre-espião?',
          a: [
            '<b>Agente</b> é o passe de pacotes mensal, <b>Elite</b> o anual, e <b>Mestre-espião</b> é o Vitalício: um pagamento só, sem renovação.',
            'Mestre-espião acrescenta as três molduras de metal, o título Cartão ouro, a comemoração Tempestade dourada e itens do Vitalício para o seu agente.',
            'Vitalício dura enquanto oferecermos o SpySocial, não a sua vida toda. Não há teste grátis, e a assinatura não é compartilhada pelo Compartilhamento Familiar.',
          ],
        },
        {
          id: 'cancel-membership',
          q: 'Como funcionam a renovação automática e o cancelamento?',
          a: [
            'Agente e Elite renovam sozinhos até você cancelar: na App Store, pelo menos 24 horas antes de o período acabar; no Google Play, antes da data de renovação. Você mantém os benefícios até o fim do período pago.',
            '<b>iPhone ou iPad:</b> Ajustes, seu nome, Assinaturas, SpySocial.',
            '<b>Android:</b> o app Google Play Store, sua foto de perfil, Pagamentos e assinaturas, Assinaturas, SpySocial.',
            '<b>Gerenciar assinatura</b> no app abre a mesma página. Apagar o app ou a conta, ou comprar o Vitalício, não cancela um passe.',
          ],
        },
        {
          id: 'restore-purchases',
          q: 'Como recupero minha assinatura?',
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
          q: 'Conta de convidado ou salva: qual a diferença?',
          a: [
            'Um <b>convidado</b> joga em salas privadas na hora. Uma conta de convidado fica num celular só, e sair dela apaga a conta para sempre.',
            `Uma conta <b>salva</b> (Apple, Google ou seu e-mail${o.passwordless ? ', com um código que mandamos, sem senha' : ''}) guarda seu nome, seu progresso e sua assinatura em qualquer celular, e libera o Jogar online, a Noite de Jogos e os amigos.`,
            'Você pode salvar uma conta de convidado quando quiser na página da sua conta, sem perder nada.',
          ],
        },
        {
          id: 'change-name',
          q: 'Como mudo meu nome?',
          a: [
            'Mude seu nome de exibição quando quiser na página da sua conta, e seu nome de usuário uma vez a cada 30 dias.',
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
            'No app: <b>Conta</b>, <b>Ajustes</b>, <b>Excluir conta</b>. Para um convidado, sair da conta já a exclui.',
            'Você também pode pedir por e-mail: veja <delete>Excluir sua conta</delete>.',
            'Excluir a conta não cancela um passe de assinatura: cancele também na loja.',
          ],
        },
        {
          id: 'data-copy',
          q: 'Posso receber uma cópia dos meus dados?',
          a: [
            'Sim. Escreva para <email/> do e-mail da sua conta. Mandamos uma cópia num arquivo legível por máquina (JSON) em até um mês.',
            'Uma conta de convidado não tem e-mail, então salve com um e-mail antes. Detalhes: <privacy>Política de Privacidade</privacy>.',
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
            'Toque e segure o cartão da pessoa, no lobby, na partida ou no fim de jogo, e escolha <b>Denunciar</b> ou <b>Bloquear</b>.',
            'Uma pessoa lê cada denúncia, e o jogador não fica sabendo quem enviou.',
            'Bloquear mantém vocês separados: nenhum dos dois entra numa sala onde o outro está. Desbloqueie nos Ajustes, em <b>Jogadores bloqueados</b>.',
            'Mentir e blefar faz parte do jogo e não é motivo de denúncia.',
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
          id: 'under-18',
          q: 'Quais são as regras para menores de 18?',
          a: [
            'É preciso ter 13 anos ou mais para jogar.',
            'Em qualquer sala com um jogador menor de 18, links, e-mails, telefones e perfis de redes sociais são bloqueados para todos.',
            'Menores de 18 não têm perfil público nem seguidores, só trocam item por item com amigos do código de amigo e não podem comprar nem vender no Mercado Negro.',
            'No iPhone, amigos, grupos e trocas esperam uma versão do app que peça o consentimento de um responsável pela Apple.',
            'Pais e responsáveis: vejam nossa <safety>página de segurança</safety>.',
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
            'O Jogar online e a Noite de Jogos precisam de uma conta salva.',
          ],
        },
        {
          id: 'connection-lost',
          q: 'Perdi a conexão numa partida',
          a: [
            'O app reconecta sozinho quando sua conexão volta.',
            'Se você for parar no início, toque em <b>Voltar</b> no cartão da sua sala. Seu lugar fica guardado.',
          ],
        },
        {
          id: 'notifications',
          q: 'Não estou recebendo notificações',
          a: [
            'Permita as notificações do SpySocial nos ajustes do celular.',
            'No app, <b>Privacidade e amigos</b> tem uma chave para pedidos de amizade, convites e pacotes novos.',
            'Os avisos de partida chegam quando você busca no Jogar online, e os lembretes da Noite de Jogos quando você toca em <b>Me avise</b>. Convidados não recebem.',
            'Menores de 18 não recebem notificações sociais entre 22h e 7h.',
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
