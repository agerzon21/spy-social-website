import type { Strings } from './en'

/** Simplified Chinese (zh-Hans): mainland usage, 你, full-width punctuation, a space round Latin words and digits; game words as the app (卧底 / 平民, 房主, 房间码, 在线游戏, 开始匹配, 游戏之夜). */
const zhHans: Strings = {
  meta: {
    siteName: 'SpySocial',
    defaultTitle: 'SpySocial — 社交推理派对游戏',
    description:
      '叫上朋友，找出卧底，或者骗过所有人。免费实时多人派对游戏，支持 3–21 名玩家。iOS 和 Google Play 均可下载。',
    titles: {
      /** The Beta 2 playtester page (/beta). */
      beta: '第 2 轮内测：上线前抢先玩 SpySocial',
      /** The transparency page (/transparency), live with LIVE.transparencyPage. */
      /** The collectibles ledger (/ledger), live with LIVE.mintedCollectibles. */
      ledger: "收藏品账本",
      transparency: "透明度报告",
      /** The Game Night rules page (/game-night-rules), live with LIVE.gameNightRules. */
      gameNightRules: "游戏之夜规则",
      faq: "帮助与常见问题",
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
      joinEvent: '公开游戏之夜',
      resetPassword: '重置密码',
      /** /reset-password once passwords are gone (LIVE.passwordless; set by the page's own Helmet). */
      resetPasswordCode: "使用验证码登录",
      confirmSuccess: '邮箱已确认',
      notFound: '页面不存在',
    },
    descriptions: {
      beta: '加入 SpySocial 的 1 小时线上集体试玩。SpySocial 是一款免费的社交推理派对游戏。时间：2026 年 11 月 12 日（星期四）美东时间晚上 7–8 点。仅限 18 岁以上成年人，iPhone 或 Android 均可。测试玩家可获得内测徽章等奖励。',
      ledger: "SpySocial 每件收藏品的公开记录：每一份副本及其编号，人人都可核验。",
      transparency: "每月公布 SpySocial 中情报的获得、花费和更正数量，以及每一起事件和每一次规则变更，不点名任何玩家。",
      gameNightRules: "SpySocial 每周游戏之夜的规则：举办时间、参与资格、如何获得当晚的称号，以及开发者的额外称号。",
      faq: "SpySocial 帮助：如何玩 Spy Talk 和 Spy Sketch、在线游戏、私密房间和游戏之夜、好友、交易、黑市、密函、情报、会员、你的账号、安全和故障排除。",
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
    /** The link to the transparency page (LIVE.transparencyPage). */
    transparency: "透明度",
    /** The link to the Game Night rules, once they're live (LIVE.gameNightRules). */
    gameNightRules: "游戏之夜规则",
    /** The link to the /beta playtest page, shown only until sign-ups close. */
    beta: "第 2 轮内测",
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
    rights: (year: number, holder = 'SpySocial') => `© ${year} ${holder}。保留所有权利`,
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
          text: '卧底可以冒险猜秘密。猜对就赢，猜错出局。',
          alt: '卧底从列表中选出地点，赢下这一局',
        },
      ],
      win: '平民投票淘汰所有卧底即可获胜。卧底猜出秘密，或者一直藏到最后，就能获胜。',
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
      onlineText: '点击“开始匹配”，就会为你安排一张 4 人或 8 人游戏桌。陌生人看不到你的名字，只能看到你的特工颜色。还有定时举办的游戏之夜。',
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
      /** Shown once the released app sells memberships (LIVE.purchases). The only things sold are memberships. */
      purchases: '想要更多地点和词语，可以选购会员。',
    },
  },

  rules: {
    title: '社区规则',
    intro: (o: { onePool: boolean; photos: boolean }) =>
      `在公开房间${o.onePool ? '（在线游戏的游戏桌和我们的游戏之夜）' : ''}里，你会和不认识的人一起玩。这些规则让每个人都玩得开心。它们适用于名字、${o.photos ? '照片、' : ''}聊天、画作和你的游戏方式，在公开房间和私密房间里都一样，并且是我们<link>服务条款</link>的一部分。`,
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
        '只要房间或小队里有未满 18 岁或未告知年龄的玩家，所有人都不能发送链接、邮箱地址、电话号码、社交账号和其他个人信息（家庭住址、住在哪里、学校、真实姓名）。在线游戏的游戏桌和游戏之夜中，这些内容始终被屏蔽。',
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
      swearing:
        '脏话：在你自己的私密房间里玩的主题包可以有，社区主题包里绝不可以，因为未满 18 岁的玩家也会使用。如果标题里有脏话（比如电影名），社区主题包会打码显示：保留首字母或首字，其余为星号（S***）。严重的脏话在那里完全不允许。',
    },
    child: {
      title: '儿童安全',
      text: '我们绝不允许任何涉及未满 18 岁者的色情内容，也绝不允许任何人试图诱骗、性化或剥削儿童。我们会删除此类内容，封禁相关账号，并依法向美国国家失踪与受剥削儿童中心（NCMEC）报告。如果你看到此类内容，请发邮件至 <email/>，主题写“Child safety”（儿童安全）；如果你和对方在同一个房间里待过，也请在应用内举报该玩家。你也可以直接向 NCMEC 的 <link>CyberTipline</link>（1-800-843-5678）报告。如果有儿童正处于紧急危险中，请先拨打当地的紧急电话。详情请见我们的<link2>儿童安全标准</link2>。',
      subject: 'Child safety',
    },
    breaking: {
      title: '有人违反规则会怎样',
      text: '通常先给予警告。屡次违规或情节严重的，会被禁言（1 小时至 7 天）、暂停参加公开房间和游戏之夜（1 至 30 天），或被封禁。泄露他人个人信息，或任何性化儿童的行为，可能会被立即封禁。应用中的每条通知都会说明限制了什么、原因和截止时间，并附有编号，例如 S-207。',
      drawings:
        '公开房间和游戏之夜中的画作随时可能被自动检查，被举报的画作也会被检查。如果你的画作违反了这些规则，无论你玩了多久，你的账号都可能被暂停或禁止参加公开房间和游戏之夜。在公开房间中，违反规则的一笔会从画作上撤下，并记一次违规：第一次警告，之后分别 3 天、7 天和 30 天不能参加公开房间和游戏之夜，90 天内第五次违规则永久禁止。在任何房间里，仇恨符号（纳粹卍字也算，除非本轮的词语明确表明是宗教含义）、写出的侮辱性称呼或针对他人的仇恨内容，会让该玩家被移出游戏，并永久禁止参加公开房间和游戏之夜；性化儿童的画作会导致账号被终止，并按上文“儿童安全”所述处理。血腥和怪物没问题。在私密房间中，只有达到这种严重程度的被举报画作才会被自动处理；其他情况由查看举报的人决定。如需申诉，请把通知中的编号发邮件给我们。',
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
        '<b>公开房间</b>，里面有你孩子不认识的玩家：在线游戏的游戏桌（应用会自动为玩家安排座位，所有人都按同一套标准规则玩），以及我们在固定时间举办的游戏之夜。玩家不能创建公开房间，也没有玩家担任公开房间的房主。',
      public: (playOnline: boolean) =>
        `<b>公开房间和游戏之夜</b>，里面有你孩子不认识的玩家${playOnline ? '，包括会自动为玩家安排游戏桌的在线游戏' : ''}。`,
      buy: '<b>可购买的内容：</b>主题包和会员，通过 App Store 或 Google Play 购买。',
      /** `buy` once only memberships are sold (LIVE.membershipsOnly). */
      buyMembers:
        '<b>可购买的内容：</b>只有会员（主题包通行证，按月或按年，以及终身通行证），通过 App Store 或 Google Play 购买。会员可解锁所有非免费主题包，除此之外不出售任何东西。',
      /** Once Intercepts are live (LIVE.intercepts). Use the app's own word for Intercepts. */
      intercepts:
        '<b>密函（Intercepts）：</b>通过游戏赢得的奖励，每封都装着一件随机物品，比如特工的新造型。它们不能购买，无论是用钱还是用游戏里赚到的货币；打开之前，应用会显示概率。',
      /** `intercepts` once unopened Intercepts trade on the Black Market (LIVE.interceptsMarket). */
      interceptsMarket:
        "<b>密函（Intercepts）：</b>通过游戏赢得的奖励，每封都装着一件随机物品，比如特工的新造型。没有人用钱出售它们，我们不卖，其他玩家也不能卖。成年人还可以在黑市上用游戏里赚到的货币（这种货币无法购买）彼此买卖未打开的密函；未满 18 岁的玩家不能这样做。打开之前，应用会显示概率。",
      /** Home's Discord pill (LIVE.homeDiscord; under 16 never, 16-17 a safety note first). */
      discord:
        "<b>我们 Discord 的链接：</b>首页可能会显示 SpySocial 官方 Discord 服务器的链接，玩家可以在那里找人一起玩。Discord 是一个独立的应用，有自己的规则和最低年龄。未满 16 岁的玩家永远看不到这个链接，16 和 17 岁的玩家会先看到一条安全提示。我们的版主会照看这个服务器，但 SpySocial 的任何人都看不到 Discord 上的私信。",
      /** Once members can make packs (LIVE.customPacks); `community`: LIVE.communityPacks. */
      customPacks: (community: boolean) =>
        `<b>主题包制作器：</b>会员可以为自己的私密房间制作地点或词语主题包。${
          community ? '分享到社区主题包的每一个主题包，在其他人能看到之前都会由我们的团队阅读，任何玩家都可以举报。' : ''
        }`,
      hasNotTitle: 'SpySocial 没有什么',
      noDms:
        '没有私信：玩家只能在房间内和房间里的玩家聊天。卧底聊天只持续一局，和其他聊天一样经过过滤、会被保存，也可以被举报。',
      noFriends:
        '没有好友或关注列表，没有玩家搜索，没有可浏览的个人主页，也没有个人简介，所以没人能在房间之外查找或联系你的孩子。',
      noDmsSocial:
        "没有私信：玩家只能在房间内和房间里的玩家聊天，或在小队聊天里和小队中的好友聊天。所有聊天都会经过过滤、保存一段时间，也可以被举报。",
      noSearch:
        "没有玩家搜索，也不推荐好友，所以陌生人无法查找你的孩子。未满 18 岁的玩家没有公开主页，也不能被关注。",
      social:
        "<b>好友和小队：</b>玩家可以添加好友，组成小队一起玩，小队聊天同样经过过滤。成年人只能当面添加未满 16 岁的玩家，需要扫描孩子手机上的好友码。未满 18 岁的玩家没有公开主页，不能被关注，夜间也不会收到社交通知。在 iPhone 和 iPad 上，这些功能目前对未满 18 岁的玩家保持关闭。",
      trading:
        "<b>交易：</b>13–17 岁的玩家只能用游戏物品换其他物品，只能和当面添加的好友交易，不能赠送，也没有留言。成年人还可以在黑市用游戏里赚到的货币买卖物品；未满 18 岁的玩家只能浏览。任何东西都不能用真钱买卖。",
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
        '<b>聊天过滤：</b>名字和聊天在任何人看到之前都会经过检查。在公开房间中，侮辱性称呼、露骨的色情词语和辱骂会被屏蔽。在私密房间中，最严重的词语会被屏蔽。只要房间或小队里有未满 18 岁或未告知年龄的玩家，所有人都不能发送链接、邮箱地址、电话号码、社交账号和其他个人信息（家庭住址、住在哪里、学校、真实姓名）。在线游戏的游戏桌和游戏之夜中，这些内容始终被屏蔽。',
      reports:
        '<b>举报、拉黑和处罚：</b>每一条举报都会在 24 小时内由真人查看，被举报的玩家不会知道是谁举报的。涉及未满 18 岁玩家的举报会优先处理。处罚从警告到禁言、暂停参加公开房间，直至封禁。我们的<link>社区规则</link>列出了哪些行为不被允许。',
      drawingCheck:
        '<b>画作检查：</b>公开房间中的画作可能会被自动检查，检查发现违反规则的一笔会从画作上撤下。',
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
      dataRequests:
        '<b>孩子的数据：</b>作为家长或监护人，你可以请我们提供孩子账号数据的副本、更正其出生年份，或删除该账号。我们的<link>隐私政策</link>（儿童隐私部分）说明了我们如何确认请求以及请求涵盖的内容。',
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

  ledger: {
    head: ['收藏品', '数量和状态'],
    supply: (minted, burned, held) => [`已铸造 ${minted}`, `已销毁 ${burned}`, `持有中 ${held}`],
    neverAwarded: '从未发放',
    closed: (date, entry) => `${date} 关闭（第 ${entry} 条记录）`,
    openUntil: (date) => `开放至 ${date}`,
    search: '搜索收藏品',
    searchHint: '试试“边框”或“称号”',
    clear: '清除',
    sort: '排序',
    sortBy: { newest: '最新', name: '名称', minted: '铸造最多', held: '持有最多' },
    count: (from, to, total) => `第 ${from}–${to} 项，共 ${total} 项`,
    noMatch: (query) => `没有与“${query}”匹配的结果。`,
    pages: '表格分页',
    prev: '上一页',
    next: '下一页',
    page: (n, total) => `第 ${n} / ${total} 页`,
  },

  whatsNew: {
    title: '更新内容',
    sub: 'SpySocial 的版本说明。每次发布的重大更新、新功能和改进。',
    releases: [
      {
        tag: "Android 上线",
        summary:
          "SpySocial 现已登陆 Google Play，并带来一批在真实 Android 手机上测试后的修复。",
        sections: [
          {
            label: "现已推出",
            items: [
              { title: "Android", text: "2026 年 6 月 13 日起在 Google Play 上线。" },
              { title: "iPhone 和 iPad", text: "同样的修复已在 App Store 上线。" },
            ],
          },
          {
            label: "修复",
            items: [
              { title: "“删除账号”", text: "这个按钮不再在“账号”界面底部被截断。" },
              { title: "房间按钮", text: "“离开房间”和“开始游戏”不再被 Android 导航栏挡住。" },
              { title: "“开始游戏”", text: "游戏还不能开始时，会告诉你原因：至少需要 3 名玩家、所有人都已准备、至少选择一个分类。" },
              { title: "分类", text: "返回按钮和标题不再挤在一起。" },
              { title: "“玩法说明”", text: "在 Android 上只有一个返回按钮，不再是两个。" },
              { title: "新手教程", text: "任何一步都可以跳过，不只是第一步。" },
              { title: "游客账号", text: "保存游客账号的提醒现在读起来像邀请，而不是警告。" },
              { title: "图标", text: "游戏结果和“玩法说明”中的图标在所有 Android 手机上看起来都一样。" },
              { title: "更快的修复", text: "小修复现在无需等待商店更新就能送达应用。" },
            ],
          },
        ],
      },
      {
        tag: "打磨更新",
        summary:
          "一次打磨更新：全新欢迎界面、焕新的“游戏结束”和“账号”界面、更好的 iPad 布局，以及一批修复。",
        sections: [
          {
            label: "新功能",
            items: [
              { title: "全新欢迎界面", text: "焕然一新，登录和注册按钮一目了然，还有一个简单的“以游客身份继续”链接。" },
              { title: "保存游客账号", text: "等待确认邮件时，“账号”界面会显示你进行到哪一步，并提供“重新发送”“取消”和“刷新”。" },
            ],
          },
          {
            label: "视觉焕新",
            items: [
              { title: "“游戏结束”", text: "全新的玩家卡片、为获胜方准备的奖杯、带地图标记的地点，以及醒目的“返回房间”按钮。" },
              { title: "“账号”", text: "一份整洁的列表，分区清楚，“危险区域”放在最底部。" },
              { title: "iPad", text: "更好地利用大屏幕：房间里每排六张玩家卡片，游戏中的玩家方块更大，内容不再被截断。" },
            ],
          },
          {
            label: "Android 专属修复",
            items: [
              { title: "返回手势", text: "在游戏中或房间里向后滑动（或按返回键）时，会先问你是否离开，和“离开”按钮一样。" },
              { title: "卡片", text: "投票卡片和游戏结束卡片里不再出现一圈淡淡的方框。" },
              { title: "“游戏结束”", text: "标题栏下方不再有空隙。" },
              { title: "选择器", text: "房间设置里的选择器清晰易读，关闭时也不会再让应用崩溃。" },
            ],
          },
          {
            label: "改进",
            items: [
              { title: "计时器", text: "倒计时以游戏的时钟为准，即使你的手机时间不准，也能保持正确。" },
              { title: "注册和邮箱", text: "注册、重新发送确认邮件、重置密码和更改邮箱都更可靠了。" },
              { title: "客服邮箱", text: "如果手机上没有邮件应用，点按客服邮箱地址会直接复制它，而不是报错。" },
              { title: "语言", text: "所有新内容都支持英语、西班牙语和俄语。" },
            ],
          },
        ],
      },
      {
        tag: "重大更新",
        summary:
          "在线游戏从头重建：每个界面都重新设计，连接更稳定，还一口气加入了许多新功能。",
        sections: [
          {
            label: "新功能",
            items: [
              { title: "教程和个人资料", text: "新玩家会看到游戏导览，并快速设置个人资料。" },
              { title: "笔记本", text: "在回合中记下谁说了什么。有笔记的玩家排在前面，出局的玩家排在最后。" },
              { title: "提示翻译", text: "如果游戏用的是别的语言，点按提示就能用你的语言阅读。桌上每个人拿到的仍是同一条提示。" },
              { title: "戳一戳", text: "在房间里点按某位玩家的卡片，就能戳一下对方。" },
              { title: "二维码", text: "通过手机的分享菜单分享房间，附带可扫描的二维码。" },
              { title: "房间链接", text: "房间链接会打开应用并直接带你进入房间，即使应用之前是关闭的。" },
              { title: "更短的房间码", text: "只有 5 个字符，更容易念给别人听。旧的 6 位房间码仍然可用。" },
              { title: "谁发起了投票", text: "一项房间设置，可以显示每次投票是谁发起的。" },
              { title: "结束游戏", text: "房主可以提前结束游戏。" },
              { title: "更多地点", text: "新增一组可玩的地点。" },
              { title: "“离开”按钮", text: "一键离开游戏。" },
            ],
          },
          {
            label: "视觉焕新",
            items: [
              { title: "", text: "全新的房间界面，带可互动的玩家卡片和重新设计的设置。" },
              { title: "", text: "游戏、投票和投票结果界面全部重新设计。投票时能看到是谁发起的，以及投票进行到哪里。" },
              { title: "", text: "发身份时会显示还在等谁，时间也延长到 60 秒。" },
              { title: "", text: "主页卡片的文字会自动适配。" },
              { title: "", text: "所有游戏内界面都使用同样的深色标题栏。" },
              { title: "", text: "离线提示条在每个界面上都一样，不再挡住灵动岛。" },
              { title: "", text: "离线时，“账号”界面会清楚地告诉你。" },
            ],
          },
          {
            label: "改进",
            items: [
              { title: "连接", text: "手机长时间休眠后，应用不会再误报你已离线。" },
              { title: "", text: "离线时，游戏首页每 5 秒自动重试一次，看起来也不再像是你退出了登录。" },
              { title: "", text: "房间、发身份、游戏、投票和结果各环节的实时同步更稳定。" },
              { title: "", text: "游戏计时器以游戏的时钟为准，而不是你的手机。" },
              { title: "", text: "信号中断后能更好地重新连接。" },
              { title: "", text: "注册、重置密码和保存游客账号都更可靠了。" },
              { title: "", text: "“账号”界面的提示更清楚。" },
              { title: "", text: "英语、西班牙语和俄语全面覆盖，包括全部 171 条提示建议。" },
              { title: "", text: "笔记本：选择玩家时键盘不会再自动弹出。" },
              { title: "", text: "提示：点按提示不会再意外换掉它。想要新提示，请用刷新按钮。" },
              { title: "", text: "已适配 iOS 26。" },
            ],
          },
          {
            label: "问题修复",
            items: [
              { title: "", text: "修复了投票和游戏结束同时发生时偶尔出现的混乱。" },
              { title: "", text: "修复了投票被重复计算以及投票在错误时刻结束的问题。" },
              { title: "", text: "修复了弃权的计算方式。“弃权”按钮现在和其他投票按钮放在一起。" },
              { title: "", text: "修复了标题栏遮住猜测结果的问题。" },
              { title: "", text: "修复了打开游戏界面时的闪烁。" },
              { title: "", text: "修复了保存游客账号时把你登出的问题。" },
              { title: "", text: "修复了“账号”界面的邮箱输入框。" },
              { title: "", text: "修复了主页卡片和西班牙语标题中文字被截断的问题。" },
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
          title: '你的特工和宝库',
          text: "打造你自己的卧底头像，并通过游戏赢得新造型。宝库只出售会员：你当房主的房间里和你的“在线游戏”牌桌上可玩全部高级主题包，能用制作器做主题包，还能带领小队。全部可选，也都不会改变游戏玩法。",
        },
        { title: '游戏之夜', text: '定时举办的在线游戏。点击“提醒我”，开始前我们会提醒你。' },
        {
          title: '特工颜色',
          text: '在线游戏和游戏之夜中，陌生人只能看到你的特工颜色，比如“蓝绿色特工”，看不到你的名字。选出你最喜欢的三种颜色。',
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
      launchWeek: '上线周：12 月 8 日（周二）Spy Talk、12 月 11 日（周五）Spy Sketch、12 月 12 日（周六）黑手党模式，均为美国东部时间晚上 8 点至 10 点。',
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
    afterInstall: "安装后，请再次点击邀请链接。",
  },

  joinEvent: {
    label: '公开游戏之夜',
    broken: '这个游戏之夜链接无效',
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
    guest: (purchases: boolean, oldApps: boolean) =>
      `游客账号会在你点击<b>退出登录</b>（在“设置”的“账号与登录”下${oldApps ? '；2.2 之前的版本在“账号”的“账号与安全”下' : ''}）并确认的那一刻被删除。游客无法重新登录，因此无法恢复。${
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

  beta: {
    eyebrow: '第 2 轮内测 · 线上试玩',
    title: '抢先玩',
    lede: '每位确认参加、全程参与这场 1 小时线上集体试玩并提交 5 分钟问卷的玩家，都会通过 PayPal 收到 <b>10 美元谢礼</b>，iPhone 和 Android 玩家一视同仁；本场最有价值的一份问题反馈或建议还可再获得 50 美元奖励。试玩的是免费的社交推理派对游戏 SpySocial。 另外还有上线后依然归你的内测奖励：内测徽章、两个称号、每个等级各 10 封密函和 1 个月会员。',
    /** Short note under the lede and in the rewards: the test's progress does not carry over. */
    reset: '试玩中的对局、经验值和获得的道具会在上线时重置。',
    headsUp: '<b>请注意：</b>App Store 和 Google Play 上的 SpySocial 是旧版本。内测版是全新的、差别很大的版本，需通过我们邮件中的链接安装。',
    facts: ['1 小时，实时进行', '仅限 18 岁以上', '24 个名额', 'iPhone 或 Android'],
    when: {
      label: '时间',
      et: (time: string) => `美东时间（ET）${time}`,
      others: (pacific: string, utc: string) => `美西时间 ${pacific} · UTC\u00a0${utc}`,
      yours: (time: string) => `你的当地时间：${time}`,
      checkIn: (time: string) => `美东时间 ${time} 起在 Discord 语音频道签到。`,
    },
    europe: {
      label: '欧洲 · 可选的第二场',
      time: (cet: string, uk: string) => `欧洲中部时间 ${cet} · 英国时间 ${uk}`,
      note: (date: string) => `仅在欧洲报名人数足够时举行，我们会在 ${date}前确认。`,
    },
    signUp: '立即报名',
    signUpNote: (day: string, time: string) => `约需 2 分钟。报名截止：美东时间 ${day} ${time}。`,
    discord: '加入我们的 Discord',
    closed: '报名已截止。关注我们的 Discord，参加下一次测试。',
    games: {
      eyebrow: '玩什么',
      title: '两种玩法',
      talk: '问答对话。一到两名玩家不知道秘密地点，要想办法混在人群中。',
      sketch: '所有人在同一幅画上添笔。卧底只能假装知道。',
    },
    who: {
      eyebrow: '适合谁',
      title: '我们在找这样的你',
      adults: '<b>仅限 18 岁以上成年人。</b>共 24 个名额。',
      phones: '<b>iPhone（TestFlight）或 Android 手机（Google Play 测试）。</b>特别欢迎 Android 手机：',
      androidLabel: '我们特别想测试的 Android 手机',
      fans: '<b>社交推理游戏爱好者：</b>Among Us、Spyfall、狼人杀/杀人游戏、Blood on the Clocktower、Codenames。新手同样欢迎。',
      mic: '<b>有麦克风更好。</b>只听不说也可以。',
      langs: '<b>游戏支持 10 种语言：</b>',
      langsLabel: '游戏语言',
    },
    ask: {
      eyebrow: '我们的请求',
      title: '玩。说。告诉我们。',
      steps: ['<b>玩满</b>这一小时。', '有任何困惑都<b>说出来</b>。', '结束后<b>填写 5 分钟的问卷</b>。'],
      wantTitle: '我们想了解',
      want: ['能清楚看出轮到谁了吗？', '投票容易理解吗？', '在你的手机上画画顺畅吗？'],
    },
    get: {
      eyebrow: '你能得到',
      title: '上线后依然归你所有的内测奖励',
      items: ['<b>内测徽章</b>', '<b>“内测玩家”</b>和<b>“外勤测试员”</b>称号', '每个等级各 <b>10 封密函</b>', '<b>1 个月</b>会员'],
      prizeTitle: 'PayPal 10 美元谢礼 + 一份 50 美元奖励',
      prize: '10 美元 PayPal 谢礼，感谢你在线上试玩中付出的时间：每位确认参加、全程参与一小时并提交 5 分钟问卷的玩家，会在试玩后 7 天内收到，iPhone 和 Android 玩家一视同仁。仅安装测试版并不能获得。另有一份 50 美元奖励（礼品卡），送给本场最有价值的一份问题反馈或建议，由开发者在一周内选出。',
      seats: (day: string) => `共 24 个名额。谢礼只发给我们通过邮件确认（${day}前）并参加试玩的玩家；其他人将进入下一次测试的候补名单。`,
    },
    friends: {
      eyebrow: '朋友',
      title: '带上朋友',
      text: '<b>在表单里填上朋友的名字</b>，就能坐到同一桌。第 1 轮内测的玩家优先。',
    },
    join: {
      eyebrow: '如何参加',
      title: '四个步骤',
      form: '<link>填写报名表</link>（约 2 分钟）。',
      closes: (day: string, time: string) => `报名截止：美东时间 ${day} ${time}。`,
      email: (day: string) => `我们会在 ${day}前发邮件给你，确认你的名额并发送安装链接。`,
      discord: '<link>加入我们的 Discord</link>：签到在语音频道进行。',
      android: 'Android：表单会询问你 Play 商店使用的 Google 邮箱，因为 Google 要求测试版必须提供。测试结束后即删除。',
      iphone: 'iPhone：通过邮件中的链接，用 TestFlight 安装 SpySocial。',
    },
    fine: '预发布版本。请勿分享其他玩家的名字或聊天内容。你的报名信息将在第 2 轮内测结束后删除。你的 PayPal 邮箱会在谢礼发出后删除。',
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

  launch: {
    railLabel: "SpySocial 2.2 截图",
    shots: {
      talk: "Spy Talk：犀利提问，揪出卧底。",
      sketch: "Spy Sketch：画出秘密词语，识破冒牌货。",
      online: "在线游戏：4 人或 8 人桌，随时开局",
      gamenight: "游戏之夜：仅限当晚才能获得的称号",
      market: "黑市：与其他特工交易物品",
      friends: "好友：添加好友，一起开玩",
    },
    cards: [
      { title: "Spy Sketch", text: "在一块共享白板上画出秘密词语，识破假装知道的卧底。" },
      { title: "在线游戏", text: "点击“开始匹配”，随时加入 4 人或 8 人游戏桌。陌生人只能看到你的特工颜色，看不到你的名字。" },
      { title: "游戏之夜", text: "定时举办的在线之夜，有仅限当晚才能获得的称号。开始前我们会提醒你。" },
      { title: "黑市", text: "和好友交易物品。成年玩家还可以在黑市用玩游戏赚到的情报买卖物品。绝不涉及真钱。" },
      { title: "会员", text: "可选：月度或年度主题包通行证，或终身通行证（只付一次，不会续订）。你当房主的房间里和你的“在线游戏”牌桌上可玩全部高级主题包，还能用制作器做主题包。除此之外不卖任何东西。" },
    ],
    allNotes: "2.2 的全部新内容",
    community: {
      title: "找到你的游戏桌",
      text: "游戏之夜、最新消息，还有正在找局的玩家：快加入 SpySocial 的 Discord。",
      discord: "加入 Discord",
      pressTitle: "媒体与创作者",
      press: "想报道 SpySocial，或在你的频道里玩？请发邮件至 <email/>，主题注明“媒体”。",
    },
    notes: {
      tag: "正式上线",
      summary: "我们迄今最大的更新：Spy Sketch、在线游戏、游戏之夜、练习局、交易、黑市和会员。",
      items: [
        { title: "练习局", text: "和 AI 特工打一局真正的游戏，学会 Spy Talk 和 Spy Sketch，可以当平民，也可以当卧底。每一步我们都会指导，并给整局打出 A 到 F 的评分。" },
        { title: "我的线索", text: "卧底把听到的信息记在线索页上，把可能的地点或词语缩小成候选名单，再从名单里做最后的猜测。" },
        { title: "私密房间规则", text: "可选规则，比如线人：一名暗中认识一名卧底的平民。在“玩法说明”>“功能与设置”里，每条规则都有可以上手的简短演示。" },
        { title: "好友和小队", text: "用好友码或用户名添加好友，关注玩家，组成小队一起找牌桌。只有会员可以组建小队。在 iPhone 和 iPad 上，好友、小队和交易仅限 18 岁及以上玩家。" },
        { title: "密函", text: "封好的密函里有一件给你特工的随机物品，在线游戏获胜、连续游玩和游戏之夜都能获得。有些物品是唯一物品：独一无二，带专属颜色和编号。打开或购买前会显示概率。密函绝不用钱出售。" },
        { title: "情报和交易", text: "情报是游戏里的钱：玩游戏获得，在宝库里使用。情报无法购买，也没有现金价值。账号满 7 天、邮箱已确认并玩过 3 局后，就能和好友交易物品。每笔交易都有 7 天保护。" },
        { title: "社区主题包", text: "在“社区”里浏览玩家做的主题包。会员可以用制作器写自己的主题包并分享。" },
        { title: "10 种语言", text: "英语、西班牙语和俄语，另有测试版的法语、葡萄牙语（巴西）、简体中文、印地语、阿拉伯语、孟加拉语和印尼语。每个人都用自己的语言看游戏。" },
        { title: "通知", text: "好友的邀请和请求、交易、黑市挂单，以及你点了“提醒我”的游戏之夜，都会通知你。" },
      ],
      more: "还有：数据、最高 100 级与威望、成就、称号、边框和庆祝动画、@ 提及、游戏厅里的小游戏、更快的麦克风、手机休眠后顺畅回到游戏，以及每个界面的新外观。",
      newLabel: "2.2 新内容",
      moreLabel: "更多",
    },
  },
}

export default zhHans
