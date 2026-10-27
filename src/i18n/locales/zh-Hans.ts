import type { Strings } from './en'

/** Simplified Chinese (zh-Hans): mainland usage, 你, full-width punctuation, a space round Latin words and digits; game words as the app (卧底 / 平民, 房主, 房间码, 在线游戏, 开始匹配, 活动). */
const zhHans: Strings = {
  meta: {
    siteName: 'SpySocial',
    defaultTitle: 'SpySocial — 社交推理派对游戏',
    description:
      '叫上朋友，找出卧底，或者骗过所有人。免费实时多人派对游戏，支持 3–21 名玩家。iOS 和 Google Play 均可下载。',
    titles: {
      /** The Game Night rules page (/game-night-rules), live with LIVE.gameNightRules. */
      gameNightRules: "游戏之夜规则",
      faq: '帮助与常见问题',
      contact: '联系我们',
      rules: '社区规则',
      safety: '安全',
      privacy: '隐私政策',
      terms: '服务条款',
      childSafety: '儿童安全标准',
      whatsNew: '更新内容',
      roadmap: '路线图',
      deleteAccount: '删除你的账号',
      join: '加入游戏',
      joinEvent: '公开活动',
      resetPassword: '重置密码',
      /** /reset-password once passwords are gone (LIVE.passwordless; set by the page's own Helmet). */
      resetPasswordCode: "使用验证码登录",
      confirmSuccess: '邮箱已确认',
      notFound: '页面不存在',
    },
    descriptions: {
      gameNightRules: "SpySocial 每周游戏之夜的规则：举办时间、参与资格、如何获得当晚的称号，以及开发者的额外称号。",
      faq: 'SpySocial 常见问题解答：如何开始、游戏模式、分享和加入房间、语言、房主控制、你的账号以及故障排除。',
      contact: '联系 SpySocial 团队：如需应用、账号或其他方面的帮助，请发邮件至 support@spysocial.app。',
      rules: 'SpySocial 社区规则：友善待人，可以唬人但不能作弊，保护隐私，以及违反规则会怎样。',
      safety: 'SpySocial 安全指南，写给 13 至 17 岁的玩家和家长及监护人：如何离开、屏蔽和举报，以及去哪里寻求帮助。',
      privacy: 'SpySocial 如何收集、使用和保护你的个人数据，谁会收到这些数据，我们保留多久，以及你的隐私权利。',
      terms: 'SpySocial 服务条款：谁可以玩、你的账号和内容、公开房间、社区规则、内容审核与申诉。',
      childSafety: 'SpySocial 打击儿童性虐待和性剥削的标准：我们禁止什么、如何举报问题、我们会怎么做，以及我们的儿童安全联系人。',
      whatsNew: 'SpySocial 版本说明：应用每个版本的新功能、修复和改进。',
      roadmap: 'SpySocial 即将推出的内容：2.2 版本的全部更新，从在线游戏、Spy Sketch 到聊天自动翻译，以及之后的计划：排位赛、赛季和锦标赛。',
      deleteAccount: '如何在应用内或通过邮件删除你的 SpySocial 账号及其数据，以及删除后哪些内容会暂时保留。',
    },
  },

  language: {
    button: (name: string) => `语言：${name}。更改语言`,
    menu: '语言',
  },

  header: {
    home: 'SpySocial 首页',
    nav: '网站',
    join: '加入房间',
    joinShort: '加入',
    shop: '商店',
    toLight: '切换到浅色模式',
    toDark: '切换到深色模式',
  },

  footer: {
    /** The link to the Game Night rules, once they're live (LIVE.gameNightRules). */
    gameNightRules: "游戏之夜规则",
    tagline: '社交推理派对游戏。',
    play: '开玩',
    legal: '法律与安全',
    browser: '在浏览器中玩',
    whatsNew: '更新内容',
    roadmap: '路线图',
    rules: '规则',
    support: '帮助',
    contact: '联系我们',
    shop: '商店',
    privacy: '隐私',
    terms: '条款',
    childSafety: '儿童安全',
    safety: '安全',
    deleteAccount: '删除账号',
    rights: (year: number) => `© ${year} SpySocial。保留所有权利`,
    follow: '关注 SpySocial',
    on: (network: string) => `SpySocial 的 ${network}`,
    discordHandle: 'SpySocial 服务器',
  },

  notice: {
    englishOnly: '本页面仅提供英文版本，以英文版本为准。',
    translated: '本页面为译文。如与英文版本有出入，以英文版本为准。',
    readEnglish: '阅读英文版',
    englishSections: '以下两部分属于我们的隐私政策，仅提供英文版本，以英文版本为准。',
  },

  common: {
    lastUpdated: (date: string) => `最后更新：${date}`,
    goHome: '返回首页',
    close: '关闭',
    openInApp: '在 SpySocial 中打开',
    appStore: '在 App Store 下载',
    googlePlay: '在 Google Play 下载',
    noAppIos: '还没有安装应用？去下载',
    noAppAndroid: '还没有安装应用？去下载',
    playInBrowser: '在浏览器中玩',
  },

  badges: {
    appStoreSmall: '',
    appStoreName: 'App Store',
    appStoreAfter: '下载',
    appStoreLabel: '在 App Store 下载',
    playSmall: '下载应用，请到',
    playName: 'Google Play',
    playAfter: '',
    playLabel: '下载应用，请到 Google Play',
  },

  home: {
    hero: {
      eyebrow: '社交推理派对游戏',
      title: '谁都别信',
      titleMark: '。',
      lede: '<b>找出卧底，或者骗过所有人。</b>你的朋友中有一个是卧底。其他人都知道秘密地点。大家轮流提问或画出线索，赶在卧底猜出你们身在何处之前投票。',
      facts: ['3–21 名玩家', '实时多人', '免费畅玩'],
      browser: '在浏览器中玩',
      joinCode: '用房间码加入',
    },
    creatorShort: {
      eyebrow: '创作者推荐',
      title: (creator: string) => `看 ${creator} 玩 Spy Sketch`,
      credit: (creator: string) => `视频作者：<link>${creator}</link>`,
      cta: '在浏览器中免费玩',
      play: (creator: string) => `播放 ${creator} 的视频`,
      consent: '点击播放后才会从 YouTube 加载视频，YouTube 可能会设置 Cookie。<link>隐私政策</link>',
    },
    lineup: {
      group: '五名特工排成一排。点击其中一人来指认。',
      accuse: (n: number) => `指认嫌疑人 ${n}`,
      wasSpy: (n: number) => `嫌疑人 ${n} 是卧底`,
      isLocal: (n: number) => `嫌疑人 ${n} 是平民`,
      stampSpy: '卧底！',
      stampLocal: '平民',
      tap: '点击嫌疑人来指认',
      eggFound: '火眼金睛！你第一次就找到了间谍。',
      eggWhere: '在应用里领取秘密称号的代码（账号 > 设置 > 输入代码）：',
    },
    how: {
      eyebrow: '怎么玩',
      title: '靠嘴脱身。或者靠画。',
      sub: '两种玩法，一条规则：桌上每个人都知道秘密，只有卧底不知道。',
      talk: {
        secret: '秘密是一个地点',
        name: 'Spy Talk',
        text: '大家轮流提问和回答，每人一个问题。说得太含糊，你就像卧底；说得太直白，卧底就知道你们在哪儿了。',
        alt: 'Spy Talk：每名玩家提一个问题，由另一名玩家回答',
      },
      sketch: {
        secret: '秘密是一个词语',
        name: 'Spy Sketch',
        text: '大家轮流在同一块白板上把它画出来。卧底不知道是什么，也要跟着画，祈祷没人发现。',
        alt: 'Spy Sketch：玩家轮流画出秘密词语，卧底在一旁装模作样',
      },
    },
    round: {
      eyebrow: '一局游戏',
      title: '四步一局',
      steps: [
        {
          title: '身份牌',
          text: '你会看到秘密，或者一张只写着“卧底”的牌。',
          alt: '身份揭晓：卧底的牌上写着“卧底”，所以他们得弄清大家在哪儿',
        },
        { title: '提问', text: '证明你知道秘密，又不把它说破。', alt: '对局中的问题卡' },
        { title: '投票', text: '谁听着不对劲，就对谁发起投票。', alt: '投票：每个人投给自己怀疑是卧底的玩家' },
        {
          title: '豪赌',
          text: '卧底随时可以猜秘密。猜对就赢，猜错出局。',
          alt: '卧底从列表中选出地点，赢下这一局',
        },
      ],
      win: '平民投票淘汰所有卧底即可获胜。卧底猜出秘密，或者一直藏到时间耗尽，就能获胜。',
    },
    who: {
      eyebrow: '和谁一起玩',
      titleOnline: '老朋友。或陌生人。',
      titleCrew: '叫上朋友。',
      sub: '每个人用自己的手机或平板玩，可以围坐一桌，也可以连线通话。',
      privateTitle: '私密房间',
      privateText: '最多 21 名玩家。朋友可以扫二维码、点邀请链接或输入房间码加入。玩法和规则由你来定。',
      howJoin: [
        '<b>扫描</b>房主屏幕上的二维码',
        '<b>点击</b>对方发来的邀请链接',
        '在这里或应用里<b>输入</b>房间码',
      ],
      onlineTitle: '在线游戏',
      onlineText: '点击“开始匹配”，就会为你安排一张 4 人或 8 人游戏桌。陌生人看不到你的名字，只能看到你的特工颜色。还有定时举办的活动。',
      agentsLabel: '特工颜色',
      agents: {
        Teal: '蓝绿色特工',
        Coral: '珊瑚色特工',
        Rose: '玫红色特工',
        Lime: '青柠色特工',
        Yellow: '黄色特工',
        Lilac: '淡紫色特工',
        Blue: '蓝色特工',
        Mint: '薄荷色特工',
      },
      needsAccount: '在线游戏需要一个免费账号。',
    },
    joinForm: {
      label: '房间码',
      button: '加入',
      note: '房主屏幕上的房间码，由 4 到 8 个字母和数字组成。',
    },
    langs: {
      eyebrow: '10 种语言',
      title: '同一桌，各说各的语言。',
      sub: '每名玩家看到的游戏都是自己的语言，秘密也一样。',
      listLabel: '语言',
      chatAlt: '聊天翻译：房间聊天中的一条西班牙语消息显示为英语',
      chatAuto: '聊天也一样：其他语言的消息一到，就会翻译成你的语言。',
      chatTap: '聊天也一样：点击任意消息上的“翻译”，就能用你的语言阅读。',
      trioLabel: '一张身份牌，三种语言',
      cardAlts: [
        '身份揭晓：平民的牌上显示秘密地点“剧院”',
        '西班牙语身份牌：Teatro',
        '俄语身份牌：Театр',
      ],
    },
    safety: {
      title: '适合 13 岁及以上',
      text: (o: { messages: boolean; drawings: boolean }) =>
        `你可以举报或拉黑任何玩家${
          o.messages && o.drawings
            ? '，也可以举报一条消息或一幅画作'
            : o.messages
              ? '，也可以举报一条消息'
              : o.drawings
                ? '，也可以举报一幅画作'
                : ''
        }。只要房间里有未满 18 岁的玩家，所有人都不能发送链接、邮箱地址、电话号码和社交账号；涉及未满 18 岁玩家的举报会优先处理。`,
      rules: '社区规则',
      childSafety: '儿童安全',
      safety: '安全',
      privacy: '隐私',
    },
    shop: {
      eyebrow: '商店',
      title: '穿上你的掩护',
      text: 'TRUST NO ONE. 连帽衫、I\'m Not the Spy T 恤，还有更多。由我们的商店合作伙伴印制并发货。',
      cta: '逛逛商店',
      hoodieAlt: '连帽衫背面印花：TRUST NO ONE.，卧底的脑袋从上方探出来',
      teeAlt: 'T 恤背面印花：(I WAS THE SPY 😂)',
    },
    final: {
      title: '就等你入座',
      text: '免费畅玩，没有广告。',
      purchases: '想要更多地点和词语，可以选购主题包。',
      /** `purchases` once only memberships are sold (LIVE.membershipsOnly). */
      purchasesMembers: '想要更多地点和词语，可以选购会员。',
    },
  },

  faq: {
    title: '帮助与常见问题',
    needMore: '还需要帮助？',
    sections: {
      start: '入门',
      modes: '游戏模式',
      features: '游戏内功能',
      sharing: '分享和加入房间',
      languages: '语言支持',
      host: '房主控制',
      account: '账号与登录',
      trouble: '故障排除',
    },
    startGame: {
      q: '怎么开始一局游戏？',
      a: [
        '点击<b>创建房间</b>当房主，或者用 4 到 8 位字母和数字的房间码加入',
        '至少需要 3 名玩家才能开始一轮',
        '通过分享面板、二维码或链接把房间分享给朋友',
      ],
    },
    firstTime: {
      q: '第一次玩？',
      a: [
        '首次打开应用时，会有一段简短的教程带你上手',
        '接着会提示你设置个人资料（昵称和可选的头像）',
        '然后就会进入主屏幕，可以创建房间或加入房间了',
      ],
    },
    howMany: {
      q: '可以几个人一起玩？',
      intro: '3 到 21 名玩家。推荐卧底人数：',
      a: ['3–5 名玩家：1 名卧底', '6–8 名玩家：2 名卧底', '9 名以上玩家：3 名卧底'],
    },
    gameModes: {
      q: '有哪些游戏模式？',
      a: ['两种玩法：<b>Spy Talk</b>，秘密是一个地点，大家轮流提问和回答；<b>Spy Sketch</b>，秘密是一个词语，大家轮流把它画出来', '<b>经典：</b>卧底之间互不相识', '<b>黑手党：</b>卧底能看到其他卧底是谁'],
    },
    notebook: {
      q: '笔记本是什么？',
      a: [
        '对局中点击笔记本图标，记下谁说了什么',
        '玩家会智能排序：有笔记的在场玩家排最前，其次是其他在场玩家，已出局的玩家排最后',
        '笔记是私密的，只有你自己能看到',
      ],
    },
    hints: {
      q: '提示在不同语言下怎么显示？',
      onePool: '提示和游戏的其他部分一样，用<b>你自己的应用语言</b>显示',
      gameLanguage: [
        '提示始终用<b>游戏语言</b>显示，让桌上每个人读到的问题都一样',
        '如果你的界面语言不同，点击提示就能看到给你的译文',
      ],
      reload: '要换一条提示，请点专门的刷新图标，点击句子本身不会误换提示',
    },
    poke: {
      q: '“戳一戳”是什么？',
      a: '在房间里点击队友的卡片，就能戳对方一下，适合在本轮开始前提醒大家注意。',
    },
    leave: {
      q: '可以中途离开吗？',
      a: '可以。每个游戏内界面都有“离开”按钮，不用一路返回也能退出。',
    },
    share: {
      q: '怎么把房间分享给朋友？',
      a: [
        '<b>分享面板：</b>用手机自带的分享面板把链接发到任何地方',
        '<b>二维码：</b>身边的朋友扫一扫就能立刻加入',
        '<b>口头告诉：</b>直接念出房间码',
      ],
    },
    link: {
      q: '可以通过链接加入吗？',
      a: [
        '可以。像 <b>spysocial.app/join/<房间码></b> 这样的链接会直接打开应用并进入房间',
        '如果对方没有安装应用，链接会带他们前往 App Store 或 Google Play',
      ],
    },
    languages: {
      q: '语言是怎么运作的？',
      setLanguage: '在个人资料中设置你的界面语言',
      onePool: [
        '房间本身没有语言：每名玩家看到的游戏都是自己的语言，包括秘密地点或词语、它的描述、卧底的列表和提示',
        '所以说不同语言的朋友可以在同一个房间玩，也可以坐在同一张在线游戏桌上',
      ],
      chatAuto:
        '聊天消息保持原样，其他语言的消息会自动翻译成你的语言（如果想改为手动点<b>翻译</b>，请在设置中关闭<b>自动翻译消息</b>）',
      chatTap: '聊天消息保持原样：点击<b>翻译</b>即可用你的语言阅读',
      hostPicks: '地点和提示使用的游戏语言由房主选择',
      parity: 'SpySocial 支持 <b>10 种语言</b>：英语、西班牙语、俄语、简体中文、印地语、阿拉伯语、法语、孟加拉语、巴西葡萄牙语和印尼语',
      differs: '如果你的语言和房主的不同，你会在关键的地方看到译文',
    },
    customize: {
      q: '房主可以自定义哪些内容？',
      a: ['卧底人数和游戏模式', '投票规则，以及是否显示投票发起人', '从哪些地点主题包中抽取'],
      turnOnly: '回合时长',
      languageAndTurn: '游戏语言和回合时长',
    },
    endEarly: {
      q: '房主可以提前结束游戏吗？',
      a: '可以。房主有<b>结束游戏</b>控制，游戏中随时都能结束本局。',
    },
    needAccount: {
      q: '需要账号吗？',
      a: [
        '不注册也可以用游客身份玩',
        '创建账号后，可以在多台设备间保留你的个人资料和进度',
        '你随时可以把游客资料升级为正式账号，什么都不会丢',
      ],
    },
    forgot: {
      q: '我忘记密码了',
      a: [
        '在登录界面点击“忘记密码”，然后输入你的邮箱',
        '你会收到一个重置链接，打开后会进入安全的重置页面',
        '如果链接已过期，重新申请一个即可',
      ],
    },
    code: {
      q: '房间码用不了？',
      a: [
        '房间码由 <b>4 到 8 位字母和数字</b>组成：照房主屏幕上显示的输入即可',
        '确认房主没有关闭房间，也没有开始游戏',
        '检查你的网络连接',
      ],
    },
    connection: {
      q: '连接断开了？',
      a: [
        '应用会自动重新连接，不需要刷新',
        '你离开期间，身份和进度都会保留',
        '如果“正在重新连接”界面停留超过几秒，可能是网络有问题：开关一下飞行模式，或在 Wi-Fi 和移动数据之间切换',
      ],
    },
    offline: {
      q: '应用说我离线了，但我其实在线？',
      a: '这是旧版本中的一个 iOS 问题；v2.0.0 会先用真实的网络探测确认连接，再显示离线状态。如果仍然出现，请强制关闭应用后重新打开。',
    },
  },

  rules: {
    title: '社区规则',
    intro: (o: { onePool: boolean; photos: boolean }) =>
      `在公开房间${o.onePool ? '（在线游戏的游戏桌和我们的活动）' : ''}里，你会和不认识的人一起玩。这些规则让每个人都玩得开心。它们适用于名字、${o.photos ? '照片、' : ''}聊天、画作和你的游戏方式，在公开房间和私密房间里都一样，并且是我们<link>服务条款</link>的一部分。`,
    kind: {
      title: '1. 友善待人',
      hate: '禁止仇恨和骚扰：不得辱骂玩家、使用侮辱性称呼，或攻击任何人的身份。',
      sexual: (photos: boolean) => `聊天、名字${photos ? '、照片' : ''}和画作中禁止出现色情内容。`,
      threats: '禁止威胁他人，也不得鼓励任何人伤害自己。',
      selfHarm:
        '不得鼓励、宣扬或教授自杀、自残、进食障碍或危险挑战。这条规则适用于所有人、所有房间。',
    },
    bluff: {
      title: '2. 可以唬人，不能作弊',
      lying: '撒谎和唬人本来就是游戏的一部分，绝不能成为举报他人的理由。',
      cheating: '泄露词语或地点，或在游戏之外和其他玩家串通，都属于作弊。',
      leaving: '故意退出游戏、挂机或拖延回合，会扫了整个房间的兴。',
      online: (onePool: boolean) =>
        `在在线游戏中，错过开局或退出已开始的游戏，会让你暂时不能参加${onePool ? '在线游戏' : '公开游戏'}（5 分钟，屡次退出时间更长）。`,
    },
    privacy: {
      title: '3. 保护隐私',
      personal: '不要分享真实姓名、地址、电话号码或社交账号，无论是你自己的还是别人的。',
      spam: '公开房间内禁止广告、垃圾信息和链接。',
      minors:
        '只要房间里有未满 18 岁的玩家，所有人都不能发送链接、邮箱地址、电话号码和社交账号。在线游戏的游戏桌和活动中，这些内容始终被屏蔽。',
    },
    reports: {
      title: '4. 举报由真人查看',
      text: (o: { messages: boolean; drawings: boolean }) =>
        `长按玩家即可举报或拉黑对方。${
          o.messages ? '长按一条消息、问题或回答即可举报：举报会附上该内容及其前后的聊天记录。' : ''
        }${o.drawings ? '你也可以举报画作。' : ''}每一条举报都会在 24 小时内由真人查看。公开聊天会保留 14 天，以便核查举报；被举报的玩家不会知道是谁举报的。`,
    },
    /** Section 5, once members can make packs (LIVE.customPacks); `community`: LIVE.communityPacks. */
    packs: {
      title: '5. 自定义主题包',
      intro: '会员自己制作的主题包同样要遵守这些规则：名称、描述和每一个词条都是如此。',
      rules: [
        '这些规则在别处禁止的，这里同样禁止：不能有仇恨、色情内容或威胁，也不能有任何不适合 13 岁及以上玩家的内容。',
        '不能有个人信息，也不能有你认识的真实人物：不能写同学、老师或邻居，也不能写地址、电话号码、学校或社交账号。',
        '不能有广告、链接或垃圾信息，而且必须是你自己的作品。',
      ],
      community:
        '社区主题包：在其他人能看到之前，我们团队会有专人阅读每一个主题包。如果主题包违反这些规则，我们可以拒绝它、将它从社区主题包中移除，或禁止该账号分享主题包。任何玩家都可以举报社区主题包，每一条举报都会在 24 小时内由真人查看。',
    },
    child: {
      title: '儿童安全',
      text: '我们绝不允许任何涉及未满 18 岁者的色情内容，也绝不允许任何人试图诱骗、性化或剥削儿童。我们会删除此类内容，封禁相关账号，并依法向美国国家失踪与受剥削儿童中心（NCMEC）报告。如果你看到此类内容，请发邮件至 <email/>，主题写“Child safety”（儿童安全）；如果你和对方在同一个房间里待过，也请在应用内举报该玩家。你也可以直接向 NCMEC 的 <link>CyberTipline</link>（1-800-843-5678）报告。如果有儿童正处于紧急危险中，请先拨打当地的紧急电话。详情请见我们的<link2>儿童安全标准</link2>。',
      subject: 'Child safety',
    },
    breaking: {
      title: '有人违反规则会怎样',
      text: '通常先给予警告。屡次违规或情节严重的，会被禁言（1 小时至 7 天）、暂停参加公开房间和活动（1 至 30 天），或被封禁。泄露他人个人信息，或任何性化儿童的行为，可能会被立即封禁。应用中的每条通知都会说明限制了什么、原因和截止时间，并附有编号，例如 S-207。',
      drawings:
        '公开房间和活动中的画作随时可能被自动检查，被举报的画作都会被检查。如果你的画作违反了这些规则，无论你玩了多久，你的账号都可能被暂停或禁止参加公开房间和活动。在公开房间中，违反规则的一笔会从画作上撤下，并记一次违规：第一次警告，之后分别 3 天、7 天和 30 天不能参加公开房间和活动，90 天内第五次违规则永久禁止。在任何房间里，仇恨符号（纳粹卍字也算，除非本轮的词语明确表明是宗教含义）、写出的侮辱性称呼或针对他人的仇恨内容，会让该玩家被移出游戏，并永久禁止参加公开房间和活动；性化儿童的画作会导致账号被终止，并按上文“儿童安全”所述处理。血腥和怪物没问题。在私密房间中，只有达到这种严重程度的被举报画作才会被自动处理；其他情况由查看举报的人决定。如需申诉，请把通知中的编号发邮件给我们。',
      drawingsTesters:
        '目前画作自动检查仍在测试中，只在所有玩家都是我们的测试玩家（正在试用应用测试版的玩家）的游戏中进行。',
    },
    age: { title: '年龄', text: 'SpySocial 面向 13 岁及以上的玩家。' },
    appeal: {
      title: '觉得我们处理错了？',
      text: '发邮件至 <email/>，并注明通知中的编号。另请参阅<link>服务条款</link>和<link2>隐私政策</link2>。',
    },
  },

  safety: {
    title: 'SpySocial 的安全',
    intro:
      'SpySocial 是一款面向 13 岁及以上玩家的派对游戏。本页面写给玩这款游戏的青少年，也写给想了解它的家长和监护人。快速跳转：<link>13 至 17 岁玩家</link>、<link2>家长和监护人</link2>、<link3>儿童安全联系方式</link3>、<link4>求助渠道</link4>。',
    danger: {
      title: '有人现在正处于危险中吗？',
      text: '请拨打当地的紧急电话：英国 999，美国 911，欧盟 112。然后向我们报告。',
    },
    teens: {
      title: '写给 13 至 17 岁的玩家',
      intro: 'SpySocial 应该是好玩的。如果有人让你感到不舒服、害怕或难过，你可以马上采取行动，而且不会因此惹上麻烦。',
      leave: {
        title: '离开',
        text: '你随时都可以离开房间或游戏：点击<b>离开</b>。你的安全比任何游戏都重要。',
        online: (onePool: boolean) =>
          `在在线游戏中，退出已开始的游戏会让你暂时不能参加${onePool ? '在线游戏' : '公开游戏'}。尽管离开，如果是某个玩家让你离开的，请举报对方。`,
      },
      block: {
        title: '拉黑',
        text: '长按该玩家，点击<b>拉黑</b>。你将看不到对方的聊天，你们双方都无法加入对方所在的房间。对方不会收到通知。你随时可以在“设置”的“隐私与安全”下的“黑名单”中解除拉黑。',
      },
      report: {
        title: '举报',
        text: '长按该玩家，或长按对方在聊天中写的内容，点击<b>举报</b>。选择发生了什么，愿意的话补充细节，然后发送。我们会自动附上聊天记录，你不需要截图。',
      },
      tell: {
        title: '告诉别人',
        text: '和父母、监护人、老师或其他你信任的成年人聊聊。如果你更想和陌生人倾诉，<link>下面的求助热线</link>都是免费且保密的。',
      },
      afterTitle: '举报之后会怎样',
      after: [
        '每一条举报都会在 24 小时内由真人（不是机器人）查看。关于儿童安全、自残、色情内容或个人信息的举报会优先处理，涉及未满 18 岁玩家的举报也一样。',
        '被你举报的玩家不会知道是谁举报的。',
        '如果对方违反了规则，我们可能会警告、禁言、暂停其参加公开房间，或封禁对方。',
        '我们不会把处理结果告诉你，但每一条举报都会被查看和处理。',
        '唬人和在身份上撒谎是游戏的一部分，不需要举报。',
      ],
      neverTitle: '如果有人这样做，绝对不正常',
      never: [
        '问你几岁、住在哪里或在哪所学校上学',
        '向你要照片、电话号码或社交账号，或者要你去别的应用聊天',
        '谈论性话题，或发送色情消息或画作',
        '给你送礼物或钱，或者要你保守秘密',
        '叫你伤害自己，或者欺负你',
      ],
      neverWhat:
        '拉黑对方，举报对方（如果对方向你要照片、谈论性话题或约你见面，请选择<b>儿童安全</b>），并告诉你信任的成年人。不要透露你的真实姓名、地址、学校、电话号码和社交账号，也绝不要分享你的密码：SpySocial 的工作人员绝不会向你索要密码。',
    },
    parents: {
      title: '写给家长和监护人',
      intro:
        'SpySocial 是一款唬人和推理的派对游戏：一名或多名玩家暗中是卧底，大家要设法找出是谁。每名玩家用自己的手机，可以在同一个房间里，也可以相隔很远。青少年需要获得父母或监护人的许可才能玩（见我们的<link>服务条款</link>第 2 节）。',
      hasTitle: 'SpySocial 有什么',
      chat: '<b>房间内的文字聊天：</b>房间聊天、游戏聊天、一局中有多名卧底时卧底专用的私密聊天，以及已出局玩家的聊天。私密房间的聊天在发送约 24 小时后删除，公开房间的聊天在 14 天后删除。',
      sketch: '<b>Spy Sketch：</b>玩家轮流用手指画画。',
      names: (o: { avatars: boolean; photos: boolean }) =>
        `<b>名字和图片：</b>${
          o.avatars
            ? o.photos
              ? '昵称、用户名，以及用应用提供的部件拼成的头像。2.2 之前版本的应用仍可添加个人照片。'
              : '昵称、用户名，以及用应用提供的部件拼成的头像。玩家不能添加照片。'
            : '昵称、用户名，以及可选的个人照片。'
        }`,
      private: '<b>私密房间：</b>只有拿到房间码、链接或二维码的人才能加入，房主可以移出玩家。',
      publicOnePool:
        '<b>公开房间</b>，里面有你孩子不认识的玩家：在线游戏的游戏桌（应用会自动为玩家安排座位，所有人都按同一套标准规则玩），以及我们在固定时间举办的活动。玩家不能创建公开房间，也没有玩家担任公开房间的房主。',
      public: (playOnline: boolean) =>
        `<b>公开房间和活动</b>，里面有你孩子不认识的玩家${playOnline ? '，包括会自动为玩家安排游戏桌的在线游戏' : ''}。`,
      buy: '<b>可购买的内容：</b>主题包和会员，通过 App Store 或 Google Play 购买。',
      /** `buy` once only memberships are sold (LIVE.membershipsOnly). */
      buyMembers:
        '<b>可购买的内容：</b>只有会员（主题包通行证，按月或按年，以及终身通行证），通过 App Store 或 Google Play 购买。会员可解锁所有非免费主题包，除此之外不出售任何东西。',
      /** Once Intercepts are live (LIVE.intercepts). Use the app's own word for Intercepts. */
      intercepts:
        '<b>截获（Intercepts）：</b>通过游戏赢得的奖励，每个都装着一件随机物品，比如特工的新造型。它们不能购买，无论是用钱还是用游戏里赚到的货币；打开之前，应用会显示概率。',
      /** Once members can make packs (LIVE.customPacks); `community`: LIVE.communityPacks. */
      customPacks: (community: boolean) =>
        `<b>自定义主题包：</b>会员可以为自己的私密房间制作地点或词语主题包。${
          community ? '分享到社区主题包的每一个主题包，在其他人能看到之前都会由我们的团队阅读，任何玩家都可以举报。' : ''
        }`,
      hasNotTitle: 'SpySocial 没有什么',
      noDms:
        '没有私信：玩家只能在房间内和房间里的玩家聊天。卧底聊天只持续一局，和其他聊天一样经过过滤、会被保存，也可以被举报。',
      noFriends:
        '没有好友或关注列表，没有玩家搜索，没有可浏览的个人主页，也没有个人简介，所以没人能在房间之外查找或联系你的孩子。',
      noVoice: (photos: boolean) =>
        `没有语音或视频聊天：麦克风按钮只会把语音转成文字，其他玩家永远听不到任何人的声音。${photos ? '' : '也不能上传照片或视频。'}`,
      noLocation: '没有位置共享，也没有广告。',
      safeTitle: '我们如何保障安全',
      age: (o: { gate: boolean; under13Deletion: boolean; storeSignals: boolean }) =>
        `<b>年龄：</b>SpySocial 面向 13 岁及以上的玩家。${
          o.gate ? `第一局游戏之前，应用会询问出生年份${o.under13Deletion ? '；如果填写的年龄未满 13 岁，账号会被删除' : ''}。` : ''
        }${o.storeSignals ? '如果 Apple 或 Google 告知应用其用户未满 13 岁，应用不会让对方玩。' : ''}我们不核实年龄，所以如果你发现有未满 13 岁的儿童拥有账号，请发邮件给我们，我们会删除它。`,
      publicRooms:
        '<b>公开房间</b>需要已保存的账号、已确认的邮箱地址、13 岁及以上的年龄，并同意我们的社区规则。游客只能在私密房间里玩，被暂停或封禁的玩家不能加入公开房间。',
      filter:
        '<b>聊天过滤：</b>名字和聊天在任何人看到之前都会经过检查。在公开房间中，侮辱性称呼、露骨的色情词语和辱骂会被屏蔽。在私密房间中，最严重的词语会被屏蔽。只要房间里有未满 18 岁的玩家，所有人都不能发送链接、邮箱地址、电话号码和社交账号。在线游戏的游戏桌和活动中，这些内容始终被屏蔽。',
      reports:
        '<b>举报、拉黑和处罚：</b>每一条举报都会在 24 小时内由真人查看，被举报的玩家不会知道是谁举报的。涉及未满 18 岁玩家的举报会优先处理。处罚从警告到禁言、暂停参加公开房间，直至封禁。我们的<link>社区规则</link>列出了哪些行为不被允许。',
      drawingCheck:
        '<b>画作检查：</b>公开房间中的每一笔画作都会被自动检查，违反规则的一笔会从画作上撤下。',
      buyTitle: '购买',
      buyText:
        '青少年购买任何内容都需要获得父母或监护人的许可。购买通过 App Store 或 Google Play 进行，所以它们的家长控制功能，例如 Apple 的“询问后购买”和 Google Family Link 中的购买批准，照常有效。主题包通行证会自动续订，直到在商店设置中取消。',
      deleteTitle: '删除账号',
      deleteSteps: (o: { avatars: boolean; oldApps: boolean }) => [
        '打开 SpySocial。',
        `点击主屏幕顶部的${o.avatars ? '头像' : '图片'}，打开<b>账号</b>。${
          o.oldApps ? '（在 2.2 之前的版本中，“账号”是主屏幕右下角的图标。）' : ''
        }`,
        `点击右上角的<b>设置</b>，然后在<b>账号与登录</b>下点击<b>删除账号</b>（最后一行）。游客账号则在同一位置点击<b>退出登录</b>来删除。${
          o.oldApps ? '（在 2.2 之前的版本中，“删除账号”位于“账号”底部的“危险区域”。）' : ''
        }`,
      ],
      deleteEmail:
        '也可以用账号绑定的邮箱发邮件至 <email/>，主题写“Delete my SpySocial account”（删除我的 SpySocial 账号）。如果你无法用那个邮箱发信，也请照样发邮件给我们并附上用户名，我们会帮你处理。我们的<link>删除账号</link>页面说明了哪些内容会被删除、哪些会被保留。',
      deleteSubject: 'Delete my SpySocial account',
      contactTitle: '联系我们',
      contact: (section: number) =>
        `关于本页面的任何内容，请发邮件至 <email/>。凡是涉及儿童安全的事，请在主题中写“Child safety”，我们会优先处理。如需对决定提出申诉或进行投诉，包括关于我们如何遵守英国《网络安全法》（Online Safety Act）的投诉，请见我们<link>服务条款</link>的第 ${section} 节。`,
    },
    contactsTitle: '儿童安全联系方式',
    contactsAfter: '我们的<link>儿童安全标准</link>说明了我们禁止什么、如何举报，以及我们会怎么处理。',
    helpTitle: '求助渠道',
    helpIntro: '如果你过得很艰难，或者在担心某个人，这些服务都是免费且保密的，你可以和他们聊任何事。',
    tableWho: '机构',
    tableHow: '方式',
    helplines: {
      childline: {
        note: '英国，面向所有未满 19 岁的人',
        text: '拨打 <b>0800 1111</b>，免费，随时可打；也可以在 <link>childline.org.uk</link> 与咨询师在线聊天。通话不会显示在你的话费账单上。',
      },
      samaritans: { note: '英国和爱尔兰，不限年龄', text: '拨打 <b>116 123</b>，免费，全天候随时可打（<link>samaritans.org</link>）。' },
      lifeline: { note: '美国', text: '拨打或发短信至 <b>988</b>，或在 <link>988lifeline.org</link> 在线聊天，免费，随时可用。' },
      findHelpline: {
        note: '其他所有国家',
        text: '<link>findahelpline.com</link> 可以帮你找到 175 个以上国家的免费保密求助热线，支持电话、短信或在线聊天。',
      },
    },
    contacts: {
      danger: {
        label: '有儿童现在正处于危险中',
        text: '请报警：英国 <b>999</b>，美国 <b>911</b>，欧盟 <b>112</b>，或拨打当地的紧急电话。请先做这件事，再做本页面上的其他事。',
      },
      ncmec: {
        note: '儿童性剥削，任何国家均可报告',
        text: '在 <link>report.cybertip.org</link> 在线报告，或拨打 1-800-843-5678（1-800-THE-LOST），随时可打。由美国国家失踪与受剥削儿童中心运营。',
      },
      ceop: {
        note: '在英国',
        text: '如果你担心网络性侵害，或担心某人在网上和儿童交谈的方式，请向英国国家犯罪调查局下属的 CEOP 报告：<link>ceop.police.uk/Safety-Centre</link>。青少年也可以自己报告，每一份报告都由儿童保护顾问查看。',
      },
      spysocial: {
        text: '在应用内举报该玩家并选择<b>儿童安全</b>，同时发邮件至 <email/>，主题写“Child safety”。我们会删除相关内容，封禁相关账号，并依法向 NCMEC 和其他主管机关报告。',
      },
    },
    seeAlso: '另请参阅我们的<link>社区规则</link>、<link2>服务条款</link2>和<link3>隐私政策</link3>。',
  },

  support: {
    title: '需要什么帮助？',
    sub: '关于 SpySocial 的任何问题，我们都乐意帮你解决。',
    emailUs: '给我们发邮件',
    respond: '我们通常会在 24 小时内回复',
    copy: (email: string) => `复制 ${email}`,
    copied: '邮箱已复制！',
    copyFailed: '复制失败',
    quickLinks: '快速链接',
    faqLink: '常见问题与故障排除',
    rate: '在 App Store 给我们评分',
    ratePlay: '在 Google Play 给我们评分',
  },

  whatsNew: {
    title: '更新内容',
    sub: 'SpySocial 的版本说明。每次发布的重大更新、新功能和改进。',
    releases: [
      {
        tag: 'Android 上线',
        summary:
          'SpySocial 正式登陆 Google Play Store：这是 Android 上首个公开正式版，同时带来在真实 Android 设备上封闭测试 QA 后的上线前打磨。',
        sections: [
          {
            label: '现已推出',
            items: [
              { title: 'Android 2.1.1', text: '2026 年 6 月 13 日起已在 Google Play 上线。' },
              { title: 'iOS 2.1.1', text: '同样的修复，现已在 App Store 上线。' },
            ],
          },
          {
            label: '上线前打磨',
            items: [
              { title: '“删除账号”按钮不再被截断', text: '“账号”界面的内容现在会遵循设备底部的安全区域边距，并为“未保存的更改”提示条预留空间。Google Play 要求应用内的账号删除入口必须可以触及。' },
              { title: '房间的“离开房间”/“开始游戏”按钮', text: '现在通过动态安全区域边距，位于 Android 手势导航栏上方。' },
              { title: '“开始游戏”反馈', text: '条件不满足时，现在会说明还缺什么（需要 3 名以上玩家、全员准备、至少一个分类）。以前按钮直接禁用，没有任何提示。' },
              { title: '分类界面', text: '返回按钮和“分类与地点”标题不再挤在一起。Android 上的返回按钮只显示图标（遵循 Material 规范）；标题字号也缩小了。' },
              { title: '“玩法说明”弹窗', text: '移除了 Android 上重复的返回按钮（弹窗的关闭 X 和继承来的导航栈返回按钮之前同时显示）。' },
              { title: '新手教程', text: '现在每一步都能点“跳过”，不再只限第一页。' },
              { title: '游客注册横幅', text: '改为一份邀请（“解锁完整账号”），配上闪光图标和清晰的行动按钮。以前的样式像系统警告，让人泄气。' },
              { title: '游戏结果和“玩法说明”界面', text: '表情符号换成了 Ionicons / FontAwesome 图标。表情符号在不同 Android 厂商上显示不一致，矢量图标则始终一致。' },
            ],
          },
          {
            label: '基础设施',
            items: [
              { title: '', text: '已安装 expo-updates 并针对 EAS 项目完成配置。以后只涉及 JS 的修复可以通过 OTA 更新推送，无需经过 Play Store / App Store 审核。' },
            ],
          },
        ],
      },
      {
        tag: '打磨更新',
        summary:
          '一次打磨版本：重新设计的欢迎界面，焕然一新的游戏结束和“账号”界面，iPad 布局改进，以及底层的一系列稳定性和质量修复。',
        sections: [
          {
            label: '新功能',
            items: [
              { title: '欢迎界面重新设计', text: '全新的分层界面，柔和的天蓝色渐变和若隐若现的卧底主题背景细节（雷达圈、准星），橙色的“SOCIAL DEDUCTION”标签，标志下方的标语，带图标的“登录”/“注册”按钮，“或”分隔线，以及轻量的“以游客身份继续”链接。版本号现在是界面底部一个低调的小标签。' },
              { title: '账号“等待确认”流程', text: '游客升级为正式账号时，“账号”界面现在会显示清晰的等待状态，并提供“重新发送”/“取消”/“刷新”操作，让用户清楚自己处在邮箱确认的哪一步。' },
            ],
          },
          {
            label: '视觉焕新',
            items: [
              { title: '游戏结束界面重新设计', text: '单层玩家卡片，柔和渐变加左侧彩色强调条，带光晕的奖杯主视觉，金色点缀的获胜阵营区域，带地图图钉图标的地点卡，以及天蓝色渐变的“返回房间”底部按钮。' },
              { title: '“账号”界面重新设计', text: '统一连贯的列表，每组都使用一致的大写分组标题（个人资料、偏好设置、账号与安全、帮助与法律、危险区域），“帮助”/“法律”采用 iOS 设置风格的菜单行，“危险区域”移到了最底部。' },
              { title: 'iPad 界面打磨', text: '房间玩家卡片改为 6 列（原为 3 列），身份揭晓卡片最宽 420pt，游戏内玩家卡片更大（140×178），容器更高，第三行不再被截断；笔记本栏自动适配身份卡尺寸；主页/开玩卡片行按 iPad 调整，HomeCard 字体更大。' },
            ],
          },
          {
            label: 'Android 专属修复',
            items: [
              { title: '返回手势保护', text: 'Android 10 及以上的系统返回滑动（以及实体返回键）现在会和点击顶部“离开”按钮一样，弹出同一个离开确认对话框。以前 Android 用户可以从游戏内界面或房间直接滑动返回，没有任何确认；gestureEnabled: false 只能阻止 iOS 的滑动手势。通过共享的 useBackPressGuard hook 实现，结合了 navigation.addListener(\'beforeRemove\') 和 BackHandler.hardwareBackPress。' },
              { title: '“框中框”渲染瑕疵', text: 'Android 的合成器在每张投票 / 投票结果 / 游戏结束卡片内都渲染出一道可见的内边。根本原因：半透明的 rgba 背景 + 半透明的细边框 + borderRadius + overflow:hidden，圆角裁剪层自身的边缘透过半透明边框显露了出来。已在 VotePlayerRow、VoteResultRankCard、VoteOutcomeCard 和游戏结束玩家卡片中修复。' },
              { title: '游戏结束顶部空隙', text: '该界面的 SafeAreaView 在 Stack 顶栏之上又重复计算了一次顶部边距，在顶栏和滚动内容开始裁剪的位置之间留出一条可见的 GameBackground 渐变。现在限定为 [\'bottom\',\'left\',\'right\']，与 voting / vote_results 界面一致。' },
              { title: 'WheelPicker', text: '用纯 JS 组件替换了 @react-native-picker/picker。原生选择器在 Android 上会悄悄忽略 itemStyle（导致我们的白色文字变成深色背景上看不清的黑字），并且长期存在关闭时的 NullPointerException 崩溃，两者都是上游库的问题。替换后通过 ScrollView + snap-to-interval 在两个平台上呈现完全相同的体验。' },
            ],
          },
          {
            label: '改进',
            items: [
              { title: '与服务器同步的时钟', text: '每一处“剩余秒数”计算现在都会减去与服务器时钟之间实测的偏差（通过新的 server_now() Postgres 函数），不再依赖设备时钟。修复了时间同步不准的设备上偶尔出现的离谱倒计时。' },
              { title: '认证流程整合', text: '注册、重新发送确认、重置密码和更改邮箱现在都通过同一个 Edge Function 和共享的客户端封装处理，消除了四个界面调用点之间各自走样的风险。新的数据库迁移为注册加入了幂等键，扩展 auth_attempts 以覆盖新增的流程类型，并新增了取消更改邮箱的 RPC。' },
              { title: '账号：mailto 后备方案', text: '未配置邮件客户端时，“帮助”/“法律”的邮箱行现在会把地址复制到剪贴板并弹出友好提示，不再抛出未处理的错误。' },
              { title: '', text: '所有新增键（欢迎标签 / 标语、账号升级等待状态文案等）均保持英语、西班牙语和俄语的翻译一致。' },
            ],
          },
          {
            label: '技术',
            items: [
              { title: '', text: 'tsconfig.json 现在排除了 supabase/functions/**，这些是 Deno Edge Function 文件，模块解析目标不同。' },
              { title: '', text: '版本号升至 2.1.0；iOS 构建号已递增，用于提交 App Store。' },
            ],
          },
        ],
      },
      {
        tag: '重大更新',
        summary:
          '多人游戏体验全面重建：每个界面都重新设计，实时引擎为稳定性而重写，一大批新功能同时上线。',
        sections: [
          {
            label: '新功能',
            items: [
              { title: '教程和个人资料设置', text: '第一次玩的玩家会有游戏引导，并被提示设置个人资料。' },
              { title: '游戏内笔记本', text: '在对局中记下谁说了什么。玩家会智能排序：有笔记的在场玩家排最前，其次是其他在场玩家，已出局的玩家排最后。' },
              { title: '提示翻译', text: '当你的界面语言和游戏语言不同时，点击提示即可看到同一个问题的你的语言版本。提示保持游戏语言，让桌上每名玩家读到的问题都一样。' },
              { title: '玩家戳一戳', text: '在房间里点击队友的卡片，就能戳对方一下。' },
              { title: '二维码分享', text: '通过系统分享面板分享房间，附带可扫描的二维码。' },
              { title: '通用链接', text: 'spysocial.app/join/<房间码> 会打开应用并直接带你进入房间（支持冷启动）。' },
              { title: '5 位房间码', text: '房间码更短，口头分享更方便。旧的 6 位房间码仍然可用。' },
              { title: '显示投票发起人', text: '房间设置中可选择显示是谁发起了投票。' },
              { title: '房主结束游戏', text: '房主现在可以提前结束游戏。' },
              { title: '额外 1 号地点主题包', text: '新增一批可以玩的地点。' },
              { title: '游戏内“离开”按钮', text: '无需一路返回，即可快速退出进行中的游戏。' },
            ],
          },
          {
            label: '视觉焕新',
            items: [
              { title: '', text: '房间界面全面现代化，加入了可互动的玩家卡片。' },
              { title: '', text: '房间设置界面重新设计（底层使用可复用的 PickerModal）。' },
              { title: '', text: '游戏界面重新设计。' },
              { title: '', text: '投票界面重新设计，加入投票发起人显示和进度界面。' },
              { title: '', text: '投票结果界面重新设计，统一了结果 / 出局的体验。' },
              { title: '', text: '身份揭晓阶段经过打磨：显示仍在等待的玩家名字，时长延长到 60 秒。' },
              { title: '', text: '主页卡片现在会自动适配文字；刷新按钮更加纤细。' },
              { title: '', text: '所有游戏内界面现在共用同一个深海军蓝顶栏（猜答案和猜答案结果界面不再使用白色/透明变体）。' },
              { title: '', text: '所有界面的离线横幅统一：高度一致，适配安全区域，不再撞上灵动岛。' },
              { title: '', text: '“账号”界面新增精致的离线空状态，配有云端离线图标。' },
            ],
          },
          {
            label: '改进',
            items: [
              { title: '网络韧性全面升级', text: '修复了一个长期存在的 iOS 问题：长时间后台休眠后，NetInfo 可能会误报“离线”，导致界面卡在重新连接状态，而网络其实完全正常。共享的 useNetwork hook 现在会用真实的 HTTP 探测请求访问 Supabase 来核实任何“离线”判断；所有游戏内和开局前界面都使用同一个 hook。' },
              { title: '', text: '开玩界面现在以实际请求结果为准，而不是 NetInfo 的过时状态；离线时每 5 秒自动重试，并发请求按顺序执行，用户只是离线时也绝不会误显示已退出登录的后备界面。' },
              { title: '', text: '各个阶段（房间、身份揭晓、游戏、投票、结果）的实时同步稳定性全面加强。' },
              { title: '', text: '游戏计时器现在与服务器同步，修复了时钟偏差。' },
              { title: '', text: '更强的离线处理和重新连接逻辑。' },
              { title: '', text: '认证和登录流程更严密：注册加固、重置密码流程，以及游客升级流程。' },
              { title: '', text: '“账号”界面打磨，提示条消息系统重新设计。' },
              { title: '', text: '英语、西班牙语和俄语翻译完全一致（每种语言 171 条提示建议，按固定位置索引，让以后的翻译功能直接可用）。' },
              { title: '', text: '笔记本体验：选择玩家时键盘不再自动弹出；面板会自动调整到合适大小。' },
              { title: '', text: '提示抽屉：点击提示句子不再误换提示，只有专门的刷新图标才能刷新。' },
              { title: '', text: '兼容 iOS 26：顶栏按钮不使用 Liquid Glass 胶囊样式。' },
              { title: '', text: '顶栏整合为共享的 useGameScreenHeader hook，让各界面保持一致。' },
              { title: '', text: '正式版构建中移除了生产环境日志。' },
            ],
          },
          {
            label: '问题修复',
            items: [
              { title: '', text: '修复了投票 / 游戏结束的竞态条件。' },
              { title: '', text: '修复了投票重复计票和计时结束的边界情况。' },
              { title: '', text: '修复了最高票计票与弃权的处理；“弃权”现在固定在操作栏中。' },
              { title: '', text: '修复了猜答案结果界面的顶栏重叠（内容撞进透明顶栏）。' },
              { title: '', text: '修复了游戏界面上动画初始状态透出的问题。' },
              { title: '', text: '修复了投票界面上 Reanimated 的渲染写入警告。' },
              { title: '', text: '修复了游客升级流程意外让游客退出登录的问题。' },
              { title: '', text: '修复了“账号”界面的邮箱字段。' },
              { title: '', text: '修复了主页卡片文字截断和西班牙语顶栏文字被裁的问题。' },
            ],
          },
          {
            label: '技术',
            items: [
              { title: '', text: '状态管理迁移到 useRoom 和 useGame hook。' },
              { title: '', text: '路由扁平化：去掉 (tabs) 路由组，改用扁平路由。' },
              { title: '', text: '将 react-native-screens 锁定在 ~4.18，以兼容 expo-router 6.0.23。' },
              { title: '', text: 'Supabase 端的实时发布修复。' },
              { title: '', text: '问题建议重构为并行的翻译三元组（{ en, es, ru }），只保留单一数据源。' },
              { title: '', text: '移除了已弃用的 Expo 配置字段（privacy、privacyPolicyUrl、termsOfServiceUrl）；隐私/条款链接改由 App Store Connect 管理。' },
            ],
          },
        ],
      },
      {
        tag: '首次发布',
        summary: 'SpySocial 在 App Store 上首次公开发布。',
        sections: [] as { label: string; items: { title: string; text: string }[] }[],
      },
    ],
  },

  roadmap: {
    eyebrow: '路线图',
    title: '即将到来',
    lede: (day: string) => `SpySocial\u00A02.2 将于 ${day}上线。来看看这次更新有什么，以及我们接下来在做什么。`,
    ledeOut: 'SpySocial\u00A02.2 现已上线。来看看这次更新有什么，以及我们接下来在做什么。',
    now: {
      coming: (day: string) => `${day}上线`,
      out: '现已上线',
      title: 'SpySocial 2.2',
      sub: '我们迄今最大的一次更新。',
      features: [
        { title: '在线游戏', text: '点击“开始匹配”，加入 4 人或 8 人游戏桌，所有人都用同一套标准规则。揪出卧底后，所有人都能再发起一次投票；没人能发起投票时，游戏直接进入结局。只需一个免费账号。' },
        { title: 'Spy Sketch', text: '全新玩法：在一块共享白板上画出秘密词语，揪出假装知道的卧底。' },
        { title: '自动翻译', text: '在大厅和游戏中聊天，支持 10 种语言：其他语言的消息一到，就会翻译成你的语言。Spy Talk 的回答会连同问题一起翻译，意思不走样。' },
        {
          title: '你的特工和商店',
          text: '打造你自己的卧底头像。商店里有主题包、会员、头像物品和庆祝动画：全部可选，也都不会改变游戏玩法。',
        },
        { title: '活动', text: '定时举办的在线游戏。点击“提醒我”，开始前我们会提醒你。' },
        {
          title: '特工颜色',
          text: '在线游戏和活动中，陌生人只能看到你的特工颜色，比如“蓝绿色特工”，看不到你的名字。选出你最喜欢的三种颜色。',
        },
        { title: '创作者代码', text: '拿到了创作者或 SpySocial 给的代码？在“设置”里输入，就能获得称号或其他奖励。' },
        {
          title: '音乐与音效',
          text: '菜单里轮流播放三首轻松的 lounge 乐曲，Spy Talk 和 Spy Sketch 各有专属曲目，最后几秒、Spy Sketch 揭晓和获胜时还有新音效。可以在“设置”里选择菜单音乐，也可以关掉音乐。',
        },
        {
          title: '推荐游戏时长',
          text: '房间规则会根据玩家人数显示推荐的游戏时长，Spy Talk 和 Spy Sketch 都有。最终仍由房主决定。',
        },
        {
          title: '安全保障',
          text: 'SpySocial 面向 13 岁及以上的玩家。聊天有敏感词过滤，你可以举报或屏蔽任何玩家；在有未满 18 岁玩家的房间里，聊天会屏蔽链接、电话号码和社交账号。',
        },
      ],
      more: '另外还有玩家数据、可解锁的称号和边框、最高 100 级的等级与威望、短局也能拿经验值、手机休眠后顺畅回到游戏、一点就灵的邀请链接，以及全新的界面设计。',
      launchWeek: '上线周：11 月 10 日（周二）Spy Talk、11 月 13 日（周五）Spy Sketch、11 月 14 日（周六）黑手党模式，均为美国东部时间晚上 8 点至 10 点。',
      /** The Shop card's text (the 4th card) once only memberships are sold (LIVE.membershipsOnly); `customPacks`: LIVE.customPacks. */
      shopMembers: (customPacks: boolean) =>
        `打造你自己的卧底头像，并通过游戏赢得新造型。商店只出售会员，会员可解锁所有主题包${customPacks ? '，还能制作你自己的主题包' : ''}：全部可选，也都不会改变游戏玩法。`,
    },
    next: {
      status: '计划中',
      noDates: '暂无日期',
      title: '接下来',
      sub: '2.2 之后，我们将打造 SpySocial 的竞技玩法。',
      plans: [
        { title: '排位赛', text: '参加排位赛，你的段位会显示在个人资料上。系统按段位为你匹配水平相近的玩家。' },
        { title: '赛季', text: '每个赛季都有专属奖励，比如称号和边框，根据你达到的段位和参与的对局发放。' },
        { title: '锦标赛', text: '提前报名定时举办的锦标赛，在小桌上进行淘汰赛。胜者逐轮晋级，直到决赛桌，并按名次获得奖励。' },
      ],
    },
    outro: '计划可能会变。关注我们，获取最新消息。',
  },

  join: {
    title: '加入游戏',
    noCode: '没有提供房间码',
    browserOrPhone: '在浏览器中玩，或在手机上用应用玩',
    openToJoin: '打开 SpySocial 加入房间',
    onPhone: '在手机上打开此链接即可加入房间',
    roomCode: '房间码',
  },

  joinEvent: {
    label: '公开活动',
    broken: '这个活动链接无效',
    brokenHelp: '检查一下链接，或者打开 SpySocial 浏览房间。',
    live: '进行中',
    cancelled: '已取消',
    ended: '已结束',
    upcoming: '即将开始',
    full: '目前已满',
    inRoom: (count: number, capacity: number) => `房间内 ${count} / ${capacity} 人`,
    yourTime: '你的时间',
    hostTime: (who: string, when: string) => `${who}的时间：${when}`,
    theHost: '主持人',
    hostedBy: (name: string) => `主持人：${name}`,
  },

  resetPassword: {
    title: '重置密码',
    invalid: '重置链接无效或已过期。请重新申请。',
    failed: '出现错误，请重试。',
    mismatch: '两次输入的密码不一致',
    previewSuccess: '预览：密码重置成功',
    success: '密码重置成功',
    error: '错误',
    unexpected: '意外错误',
    done: '密码已成功重置！',
    redirecting: '正在跳转…',
    newPassword: '新密码',
    newPlaceholder: '输入新密码',
    minLength: '至少 6 个字符。',
    confirm: '确认密码',
    confirmPlaceholder: '再次输入密码',
    submit: '重置密码',
    cancel: '取消',
    // passwordless (legalRelease LIVE.passwordless): the page that replaces the reset form.
    goneTitle: "密码已取消",
    goneBody: "请在应用中使用一次性验证码登录。",
    goneOpen: "打开 SpySocial",
    goneNoApp: "还没有应用？",
    preview: (mode: string) => `预览模式：<b>${mode}</b>。提交不会发送到 Supabase。`,
  },

  deleteAccount: {
    title: '删除你的 SpySocial 账号',
    intro: '你随时可以在应用内或通过邮件删除你的 SpySocial 账号以及与之关联的个人数据。如有任何问题，请通过 <email/> 联系我们。',
    appTitle: '如何在应用内删除账号',
    steps: (o: { avatars: boolean; oldApps: boolean }) => [
      '打开 SpySocial。',
      `点击主屏幕顶部你的${o.avatars ? '头像' : '图片'}，打开<b>账号</b>。${
        o.oldApps ? '（在 2.2 之前的版本中，“账号”是主屏幕右下角的图标。）' : ''
      }`,
      '点击右上角的<b>设置</b>。',
      `在<b>账号与登录</b>下，点击<b>删除账号</b>（最后一行，红色）并确认。${
        o.oldApps ? '（在 2.2 之前的版本中，“删除账号”位于“账号”底部的“危险区域”。）' : ''
      }`,
    ],
    atOnce: '你的账号会被立即删除。',
    guestTitle: '游客账号',
    guest: (purchases: boolean) =>
      `游客账号会在你点击<b>退出登录</b>（在“设置”的“账号与登录”下；2.2 之前的版本在“账号”的“账号与安全”下）并确认的那一刻被删除。游客无法重新登录，因此无法恢复。${
        purchases
          ? '购买的内容是例外，和任何已删除的账号一样：你以游客身份购买的内容，可以在付款时使用的 App Store 或 Google Play 账号上通过“恢复购买”找回。'
          : ''
      }`,
    noAppTitle: '已经卸载应用了？',
    noApp: '用账号绑定的邮箱发邮件至 <email/>，主题写“Delete my SpySocial account”（删除我的 SpySocial 账号）。请求会在 30 天内处理。',
    deletedTitle: '哪些内容会被删除',
    staysTitle: '哪些内容会保留，保留多久',
    details: '详情请见我们的<link>隐私政策</link>。',
  },

  notFound: {
    title: '页面不存在',
    text: '你要找的页面不存在。',
  },

  confirmSuccess: {
    title: '邮箱已确认',
    text: '你的邮箱已成功验证。现在你可以使用 SpySocial 应用的全部功能了。',
    home: '返回首页',
    expiredTitle: '链接已失效',
    expired: '此链接已过期或已被使用。请打开 SpySocial，点击<b>重新发送</b>。',
    browserText: '你的邮箱已成功验证。请回到浏览器里的 SpySocial 并登录。',
    browserPhoneText: '你的邮箱已成功验证。请回到注册时用的电脑上的 SpySocial 并登录。',
    browserButton: '返回 SpySocial',
  },
}

export default zhHans
