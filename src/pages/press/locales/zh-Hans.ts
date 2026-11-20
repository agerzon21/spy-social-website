import type { PressStrings } from '../strings'

/** Simplified Chinese (zh-Hans): mainland usage, 你, full-width punctuation, a space round Latin words and digits; the app's words (src/help/locales/zh-Hans.ts: 平民 / 卧底, 在线游戏, 黑市, 密函, 情报, 会员). */
const zh: PressStrings = {
  eyebrow: '媒体资料',
  title: '媒体',
  lede: '写给记者和创作者：SpySocial 是什么、关键信息，以及可用于报道的标志和截图。',
  email: '发邮件给团队',
  toAssets: '标志和截图',
  about: {
    eyebrow: '一段话介绍',
    title: '关于 SpySocial',
    short: (day, out) =>
      `SpySocial 是一款免费的虚张声势与推理派对游戏，支持 3 到 21 名玩家，每人用自己的手机或平板。除了卧底，所有人都知道秘密。在 Spy Talk 里，秘密是一个地点，玩家轮流提问和回答。在 Spy Sketch 里，秘密是一个词语，玩家轮流在同一块画板上画出来，卧底则假装自己也知道。最后全桌投票。2.2 版本${out ? '已于' : '将于'} ${day}在 iPhone、iPad 和 Android 上线，带来 Spy Sketch、在线游戏桌、引导教程、游戏之夜、好友、交易和 10 种语言。没有广告，唯一出售的是可选的会员。`,
    moreTitle: '详细介绍',
    sections: [
      {
        title: '两种玩法',
        text: '在 Spy Talk 里，秘密是一个地点。玩家轮流提问和回答，可以打字，也可以用麦克风语音输入。说得太含糊，你会像卧底；说得太直白，卧底就知道你们在哪儿了。在 Spy Sketch 里，秘密是一个词语，大家轮流在同一块画板上画，卧底也跟着画，还要尽量不被抓到。两种玩法都有经典和黑手党两种模式；在黑手党模式中，卧底能看到彼此，还有一个私密聊天。平民投票淘汰所有卧底即获胜。卧底猜中秘密，或一直藏到时间结束，即获胜。',
      },
      {
        title: '游戏方式',
        text: '私密房间最多容纳 21 人，可以用自己的规则和主题包，好友通过二维码、邀请链接或房间号加入。在线游戏会为你匹配 4 人或 8 人的游戏桌，陌生人之间看到的是特工颜色，比如“蓝绿色特工”，而不是名字。游戏之夜是定时举办的线上活动，称号只有当晚才能获得。新玩家先完成约三分钟的引导教程，再和 AI 特工进行练习赛，成绩从 A 到 F 评分。',
      },
      {
        title: '10 种语言',
        text: '英语、西班牙语、俄语、法语、巴西葡萄牙语、印度尼西亚语、印地语、孟加拉语、阿拉伯语和简体中文。同一桌的玩家各自用自己的语言看游戏，聊天会自动翻译。',
      },
      {
        title: '玩出来的奖励',
        text: '玩家打造一位黑色电影风格的特工，通过游戏获得经验值、称号、边框和庆祝动画。密函是通过游戏获得的密封文件，每份打开后得到一件随机物品，打开前会显示概率。玩家可以和好友交换物品，成年玩家还可以在黑市用情报交易；情报是游戏自己的货币，只能通过游戏获得。真钱永远买不到物品、密函或情报，它们也都没有现金价值。收藏品不是 NFT、代币或加密货币。',
      },
      {
        title: '免费，只卖一样东西',
        text: '没有广告。Spy Talk、Spy Sketch、游戏之夜、密函、交易和黑市都免费。唯一出售的是可选的会员：按月或按年的会员，或终身会员（一次付款）。会员房主的房间里和会员的在线游戏桌上，所有人都能玩全部高级主题包；会员还可以使用主题包制作器，获得多 50% 的经验值，并进入会员专属游戏桌。不单独出售主题包或礼包，密函和情报永不出售。',
      },
    ],
  },
  facts: {
    eyebrow: '一览',
    title: '基本信息',
    labels: {
      name: '名称',
      developer: '开发者',
      genre: '类型',
      platforms: '平台',
      players: '玩家人数',
      release: '发布',
      price: '价格',
      membership: '会员',
      languages: '语言',
      age: '年龄',
      website: '网站',
      stores: '下载',
      community: '社区',
      press: '媒体联系',
    },
    developer: 'SpySocial LLC，美国宾夕法尼亚州',
    genre: '社交推理派对游戏',
    platforms: 'iPhone、iPad，以及 Android 手机和平板。iPhone 和 Android 玩家可以一起玩。',
    players: '私密房间 3 到 21 人。在线游戏：4 人或 8 人桌。',
    release: (day, out) =>
      out
        ? `2.2 版本已于 ${day}上线，是 App Store 和 Google Play 上的免费更新。`
        : `2.2 版本将于 ${day}上线。SpySocial 已在 App Store 和 Google Play 上架，2.2 是一次免费更新。`,
    price: '免费下载，免费游玩。没有广告。',
    membership: (month, year, life) =>
      `可选，也是唯一出售的东西：月度会员每月 ${month}，年度会员每年 ${year}（均自动续订直至取消），或终身会员 ${life}，一次付款。以上为美国价格，各国价格不同。不单独出售主题包或礼包。`,
    languages:
      '英语、西班牙语、俄语、法语、巴西葡萄牙语、印度尼西亚语、印地语、孟加拉语、阿拉伯语、简体中文。除前三种外，其余在应用中都标为 Beta。',
    age: '13 岁及以上',
    press: '<email/>，主题注明“媒体”',
  },
  assets: {
    eyebrow: '下载',
    title: '标志和截图',
    sub: '可用于关于 SpySocial 的文章和视频。',
    logoInk: '浅色背景用标志',
    logoCream: '深色背景用标志',
    icon: '应用图标',
    banner: '横幅',
    shotsTitle: '截图',
    shotsSub: '来自 2.2 版本的商店页面，说明文字为本页的语言。如需其他语言的一组截图，请在页面顶部切换语言。',
    file: (what, format) => `${what}，${format}`,
  },
  safety: {
    eyebrow: '写给家长和平台',
    title: '安全',
    points: [
      'SpySocial 面向 13 岁及以上的玩家。',
      '玩家只能在房间或小队里，和其中的人聊天。没有私信。',
      '聊天过滤会屏蔽辱骂和威胁。只要房间里有未满 18 岁的玩家，链接、邮箱地址、电话号码和社交账号就会对所有人屏蔽。',
      '在在线游戏桌上，陌生人看到的是特工颜色，而不是名字。',
      '任何玩家、消息、画作或主题包都可以举报，任何人都可以拉黑。每条举报都会在 24 小时内由真人阅读，涉及儿童安全或未满 18 岁玩家的举报优先处理。',
    ],
  },
  contact: {
    title: '媒体联系',
    text: '采访、评测权限，或想在你的频道里玩 SpySocial：请发邮件至 <email/>，主题注明“媒体”。',
  },
}

export default zh
