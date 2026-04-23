// 剧本配置类型定义
export interface StoryChoice {
  text: string
  nextId: number
  affectionChange: number
  sincerityChange?: number // 真心值变化
  isFated?: boolean // 宿命选项（无论选什么结果相同）
}

export interface StoryScene {
  id: number
  act: number // 幕数 1-4
  background: string
  backgroundImage?: string
  character?: string
  characterMood?: "normal" | "happy" | "sad" | "angry" | "blush" | "shock"
  text: string
  choices?: StoryChoice[]
  isMonologue?: boolean // 内心独白
  mood?: "warm" | "cold" | "dark" | "grief" // 场景氛围，影响色调
  weather?: "clear" | "rain" | "storm" | "snow" // 天气效果
  bgm?: string // 背景音乐标识
}

export interface SaveData {
  id: number
  sceneId: number
  affection: number
  sincerity: number
  timestamp: string
  chapterName: string
  screenshot?: string
}

// 场景色调配置
export const moodThemes = {
  warm: {
    overlay: "rgba(255, 240, 245, 0.2)",
    overlayEnd: "rgba(255, 228, 235, 0.4)",
    textBg: "bg-card/80",
    borderColor: "border-primary/30"
  },
  cold: {
    overlay: "rgba(200, 220, 240, 0.3)",
    overlayEnd: "rgba(180, 200, 220, 0.5)",
    textBg: "bg-slate-900/80",
    borderColor: "border-slate-400/30"
  },
  dark: {
    overlay: "rgba(40, 40, 50, 0.4)",
    overlayEnd: "rgba(20, 20, 30, 0.6)",
    textBg: "bg-slate-900/90",
    borderColor: "border-slate-600/40"
  },
  grief: {
    overlay: "rgba(60, 60, 65, 0.3)",
    overlayEnd: "rgba(40, 40, 45, 0.5)",
    textBg: "bg-slate-800/85",
    borderColor: "border-slate-500/30"
  }
}

// 完整剧本数据 - 魅魔与纯情男大的故事
export const storyScenes: StoryScene[] = [
  // ========== 第一幕：笨拙的闯入者 ==========
  {
    id: 1,
    act: 1,
    background: "深夜的便利店",
    mood: "warm",
    character: undefined,
    text: "凌晨两点，便利店的白炽灯散发着冷清的光芒。你正准备结账离开，却注意到角落里站着一位气质非凡的女子。",
  },
  {
    id: 2,
    act: 1,
    background: "深夜的便利店",
    mood: "warm",
    character: "神秘女子",
    characterMood: "normal",
    text: "她的眼眸深邃如夜空，嘴角挂着意味深长的微笑，正打量着你。",
    choices: [
      { text: "主动打招呼", nextId: 3, affectionChange: 5, sincerityChange: 5 },
      { text: "假装没看到", nextId: 4, affectionChange: 0, sincerityChange: 0 }
    ]
  },
  {
    id: 3,
    act: 1,
    background: "深夜的便利店",
    mood: "warm",
    character: "神秘女子",
    characterMood: "normal",
    text: "（她挑了挑眉，似乎有些意外）“哦？还有人会主动搭讪我...有意思。”",
  },
  {
    id: 4,
    act: 1,
    background: "深夜的便利店",
    mood: "warm", 
    character: "神秘女子",
    characterMood: "normal",
    text: "她缓步走近你，一股若有若无的幽香飘来。“小弟弟，深夜一个人逛便利店，不害怕吗？”",
    choices: [
      { text: "“姐姐，我看你脸色不好，是不是胃不舒服？”", nextId: 5, affectionChange: 15, sincerityChange: 20 },
      { text: "“不害怕，倒是姐姐你一个人也很危险吧？”", nextId: 6, affectionChange: 5, sincerityChange: 10 }
    ]
  },
  {
    id: 5,
    act: 1,
    background: "深夜的便利店",
    mood: "warm",
    character: "神秘女子",
    characterMood: "shock",
    text: "（她愣了一下，显然没料到这个回答）“...什么？”",
  },
  {
    id: 6,
    act: 1,
    background: "深夜的便利店",
    mood: "warm",
    character: "你",
    text: "你从书包里掏出一罐温热的牛奶，笨拙地递了过去。",
    choices: [
      { text: "“这个给你，暖暖胃。”", nextId: 7, affectionChange: 20, sincerityChange: 25 }
    ]
  },
  {
    id: 7,
    act: 1,
    background: "深夜的便利店",
    mood: "warm",
    character: "姐姐",
    characterMood: "shock",
    text: "她接过牛奶，眼中闪过一丝复杂的神色。这个男孩...怎么和她见过的那些人都不一样？",
  },
  {
    id: 8,
    act: 1,
    background: "昏暗的公寓楼下",
    mood: "warm",
    character: "姐姐",
    characterMood: "normal",
    text: "“你知不知道，只要我勾勾手指，你的灵魂就属于我了？”",
    choices: [
      { text: "“那...那我可以把灵魂洗干净点再给你吗？怕你嫌弃。”", nextId: 9, affectionChange: 25, sincerityChange: 30 },
      { text: "“姐姐你在说什么？我听不懂...”", nextId: 10, affectionChange: 10, sincerityChange: 15 }
    ]
  },
  {
    id: 9,
    act: 1,
    background: "昏暗的公寓楼下",
    mood: "warm",
    character: "姐姐",
    characterMood: "shock",
    text: "（她愣住了，许久才轻声笑了出来）“你这个人...真的很奇怪。”",
  },
  {
    id: 10,
    act: 1,
    background: "昏暗的公寓楼下",
    mood: "warm",
    character: "姐姐",
    characterMood: "normal",
    text: "她蹲下身，鞋带散开了。你二话不说蹲在地上，笨拙地帮她系紧。",
  },
  {
    id: 11,
    act: 1,
    background: "昏暗的公寓楼下",
    mood: "warm",
    character: "姐姐",
    characterMood: "blush",
    isMonologue: true,
    text: "（这个男孩...他的灵魂，怎么会如此干净透明？）",
  },
  
  // ========== 第二幕：纯情的"感化" ==========
  {
    id: 12,
    act: 2,
    background: "校园操场",
    mood: "warm",
    character: undefined,
    text: "从那天起，你们开始频繁见面。她总是用戏谑的眼神看着你，而你只是傻傻地对她好。",
  },
  {
    id: 13,
    act: 2,
    background: "寒冷的清晨",
    mood: "warm",
    character: "你",
    text: "冬天的早晨，你在寒风中排了两个小时的队，只为买到她随口提过的一家生煎包。",
    choices: [
      { text: "冻得鼻尖通红，但还是嘿嘿傻笑", nextId: 14, affectionChange: 20, sincerityChange: 25 }
    ]
  },
  {
    id: 14,
    act: 2,
    background: "寒冷的清晨",
    mood: "warm",
    character: "姐姐",
    characterMood: "shock",
    text: "“你...你是傻子吗？就为了这个？”",
  },
  {
    id: 15,
    act: 2,
    background: "寒冷的清晨",
    mood: "warm",
    character: "你",
    text: "“姐姐你说好吃嘛，我就想让你尝尝。趁热吃！”",
  },
  {
    id: 16,
    act: 2,
    background: "电影院",
    mood: "warm",
    character: undefined,
    text: "你带她去看最普通的爱情电影。她本以为会很无聊，却发现自己看着看着，视线总是不自觉地移向你。",
  },
  {
    id: 17,
    act: 2,
    background: "电影院",
    mood: "warm",
    character: "你",
    characterMood: "blush",
    text: "电影散场后，你深吸一口气，双手握拳，紧张得像要上战场。",
    choices: [
      { text: "鼓起勇气告白", nextId: 18, affectionChange: 30, sincerityChange: 35 }
    ]
  },
  {
    id: 18,
    act: 2,
    background: "电影院门口",
    mood: "warm",
    character: "你",
    characterMood: "blush",
    text: "“我...我以后能一直给你买牛奶吗？”（手抖得像筛糠）",
  },
  {
    id: 19,
    act: 2,
    background: "电影院门口",
    mood: "warm",
    character: "姐姐",
    characterMood: "blush",
    isMonologue: true,
    text: "（第一次...她感到的“饱腹感”不是来源于欲望，而是来源于被珍视。）",
  },
  {
    id: 20,
    act: 2,
    background: "电影院门口",
    mood: "warm",
    character: "姐姐",
    characterMood: "blush",
    text: "“...好。”（她收敛了气息，第一次想做一个普通的女孩）",
  },

  // ========== 第二幕续：月色与悸动 ==========

  // 【第一场：深夜的公寓阳台】
  {
    id: 38,
    act: 2,
    background: "深夜的公寓阳台",
    mood: "warm",
    weather: "snow",
    character: undefined,
    text: "窗外是静谧的夜色，雪花纷纷扬扬地飘落。两人并肩坐在阳台的地毯上，谁都没有说话。",
  },
  {
    id: 39,
    act: 2,
    background: "深夜的公寓阳台",
    mood: "warm",
    weather: "snow",
    character: "姐姐",
    characterMood: "normal",
    text: "（看着窗外，眼神深邃）“在这个世界待久了，总觉得月亮都长得一样。”",
  },
  {
    id: 40,
    act: 2,
    background: "深夜的公寓阳台",
    mood: "warm",
    weather: "snow",
    character: "你",
    characterMood: "blush",
    text: "你有些害羞，不敢直视她，悄悄转过头去。",
    choices: [
      { text: "“其实……今晚的月色真美。”", nextId: 41, affectionChange: 15, sincerityChange: 15 }
    ]
  },
  {
    id: 41,
    act: 2,
    background: "深夜的公寓阳台",
    mood: "warm",
    weather: "snow",
    character: "姐姐",
    characterMood: "happy",
    text: "（轻笑，带着一丝调侃）“书读得不少嘛。既然月亮这么美，要不要赌一把？”",
  },
  {
    id: 42,
    act: 2,
    background: "深夜的公寓阳台",
    mood: "warm",
    weather: "snow",
    character: "你",
    characterMood: "shock",
    text: "（愣住）“赌什么？”",
  },
  {
    id: 43,
    act: 2,
    background: "深夜的公寓阳台",
    mood: "warm",
    weather: "snow",
    character: "姐姐",
    characterMood: "blush",
    text: "（凑近你的耳廓，气息如兰）“我赢了，就送我最喜欢的东西。”",
  },
  {
    id: 44,
    act: 2,
    background: "深夜的公寓阳台",
    mood: "warm",
    weather: "snow",
    character: "你",
    characterMood: "normal",
    text: "（看着窗外飘起的细雪，有些苦恼地挠头）“冰天雪地，我去哪儿给你摘鲜花？”",
  },
  {
    id: 45,
    act: 2,
    background: "深夜的公寓阳台",
    mood: "warm",
    weather: "snow",
    character: "姐姐",
    characterMood: "normal",
    text: "（定定地看着你的眼睛，声音变轻）“我赢了。”",
  },
  {
    id: 46,
    act: 2,
    background: "深夜的公寓阳台",
    mood: "warm",
    weather: "snow",
    character: "姐姐",
    characterMood: "blush",
    isMonologue: true,
    text: "（你已经把自己输给我了。）",
  },

  // 【第二场：男主的书桌前】
  {
    id: 47,
    act: 2,
    background: "男主的房间",
    mood: "warm",
    character: undefined,
    text: "灯光昏黄。姐姐百无聊赖地在房间里闲逛，无意中翻开了书桌上的剧本草稿。",
  },
  {
    id: 48,
    act: 2,
    background: "男主的房间",
    mood: "warm",
    character: "姐姐",
    characterMood: "happy",
    text: "（指着剧本，调侃道）“恋爱没怎么谈过，吻戏倒是写得挺逼真啊。”",
  },
  {
    id: 49,
    act: 2,
    background: "男主的房间",
    mood: "warm",
    character: undefined,
    text: "你被拆穿后有些羞恼，伸手去抢剧本。推搡间，你意外地顺势压在了姐姐身上。你歪着头，戴着厚重黑框眼镜的脸，鼻尖几乎触碰到她的。",
  },
  {
    id: 50,
    act: 2,
    background: "男主的房间",
    mood: "warm",
    character: "姐姐",
    characterMood: "happy",
    text: "（微微仰头，一脸傲娇）“那当然了，没吃过猪肉还没见过猪跑吗？”",
  },
  {
    id: 51,
    act: 2,
    background: "男主的房间",
    mood: "warm",
    character: "你",
    text: "你沉默片刻，眼神逐渐变得炽热。你缓缓伸手，取下了黑框眼镜，放在一旁。",
  },
  {
    id: 52,
    act: 2,
    background: "男主的房间",
    mood: "warm",
    character: "姐姐",
    characterMood: "shock",
    text: "（心跳漏了一拍）“你...你干嘛？”",
  },
  {
    id: 53,
    act: 2,
    background: "男主的房间",
    mood: "warm",
    character: "你",
    text: "（声音低沉，凑得极近）",
    choices: [
      { text: "“想喂你吃猪肉。”", nextId: 54, affectionChange: 20, sincerityChange: 20 }
    ]
  },
  {
    id: 54,
    act: 2,
    background: "男主的房间",
    mood: "warm",
    character: undefined,
    text: "你吻了上去。姐姐原本调笑的表情凝固了，身体变得僵硬，手心渗汗，拳头死死地捏紧。这是她从未体会过的、不带魔力蛊惑的纯粹悸动。",
  },

  // 【第三场：清晨的公园长椅】
  {
    id: 55,
    act: 2,
    background: "清晨的公园",
    mood: "warm",
    weather: "clear",
    character: undefined,
    text: "晨雾未散。你排了两个小时的队，怀里揣着热腾腾的生煎包，在公园的长椅上等她。",
  },
  {
    id: 56,
    act: 2,
    background: "清晨的公园",
    mood: "warm",
    weather: "clear",
    character: "姐姐",
    characterMood: "normal",
    text: "（看着你冻得通红的鼻尖）“笨蛋，至于吗？”",
  },
  {
    id: 57,
    act: 2,
    background: "清晨的公园",
    mood: "warm",
    weather: "clear",
    character: "你",
    characterMood: "happy",
    text: "（傻笑，伸出手比划了一个圆圈）“姐姐，把手圈起来，放在眼前就只能看见自己喜欢的。”",
  },
  {
    id: 58,
    act: 2,
    background: "清晨的公园",
    mood: "warm",
    weather: "clear",
    character: "姐姐",
    characterMood: "happy",
    text: "（照做，圆圈里正对着你那张冻憨了的脸）“……看见了，一个笨蛋。”",
  },
  {
    id: 59,
    act: 2,
    background: "清晨的公园",
    mood: "warm",
    weather: "clear",
    character: "你",
    text: "（认真地看着她）",
    choices: [
      { text: "“以前觉得遥不可及的人才值得追逐，遇到你之后才发现，她不是我的白月光，但你是我的小太阳。”", nextId: 60, affectionChange: 15, sincerityChange: 15 }
    ]
  },
  {
    id: 60,
    act: 2,
    background: "清晨的公园",
    mood: "warm",
    weather: "clear",
    character: "姐姐",
    characterMood: "normal",
    text: "（心口微震，避开视线）“这种情话，也是在剧本里学的？”",
  },
  {
    id: 61,
    act: 2,
    background: "清晨的公园",
    mood: "warm",
    weather: "clear",
    character: "你",
    characterMood: "blush",
    text: "（低下头，声音很小却坚定）“不……是昨晚睡觉时想到的。只是一醒来，就好想见到你。”",
  },
  {
    id: 62,
    act: 2,
    background: "清晨的公园",
    mood: "warm",
    weather: "clear",
    character: "姐姐",
    characterMood: "blush",
    isMonologue: true,
    text: "（沉默良久，眼底的魅惑气息彻底收敛，变回了纯真少女的模样）",
  },
  {
    id: 63,
    act: 2,
    background: "清晨的公园",
    mood: "warm",
    weather: "clear",
    character: "你",
    characterMood: "blush",
    text: "（深吸一口气）",
    choices: [
      { text: "“姐姐，我喜欢你。”", nextId: 21, affectionChange: 25, sincerityChange: 30 }
    ]
  },

  // ========== 第三幕：残酷的谎言 ==========
  {
    id: 21,
    act: 3,
    background: "医院走廊",
    mood: "cold",
    weather: "rain",
    character: undefined,
    text: "命运总是残忍的。当一切都在向好的方向发展时，你却收到了那张诊断书。",
  },
  {
    id: 22,
    act: 3,
    background: "医院走廊",
    mood: "cold",
    weather: "rain",
    character: "你",
    isMonologue: true,
    text: "（癌症晚期...原来我的时间，已经不多了。）",
  },
  {
    id: 23,
    act: 3,
    background: "医院走廊",
    mood: "cold",
    weather: "rain",
    character: "你",
    isMonologue: true,
    text: "（我不能让她知道。她...她应该去找一个能陪她一辈子的人。）",
  },
  {
    id: 24,
    act: 3,
    background: "暴雨中的公寓",
    mood: "dark",
    weather: "storm",
    character: undefined,
    text: "你带着一个陌生女生出现在她面前，眼神刻意变得冰冷。",
  },
  {
    id: 25,
    act: 3,
    background: "暴雨中的公寓",
    mood: "dark",
    weather: "storm",
    character: "姐姐",
    characterMood: "shock",
    text: "“你...这是什么意思？”",
    choices: [
      { text: "“别再缠着我了。”", nextId: 26, affectionChange: -50, sincerityChange: 0, isFated: true },
      { text: "（无论你怎么选，都无法改变接下来的话）", nextId: 26, affectionChange: -50, sincerityChange: 0, isFated: true }
    ]
  },
  {
    id: 26,
    act: 3,
    background: "暴雨中的公寓",
    mood: "dark",
    weather: "storm",
    character: "你",
    characterMood: "angry",
    text: "“你这种随便的女人，我玩腻了。其实我也没那么单纯，我只是想试试'攻略'姐姐是什么感觉。”",
  },
  {
    id: 27,
    act: 3,
    background: "暴雨中的公寓",
    mood: "dark",
    weather: "storm",
    character: "姐姐",
    characterMood: "sad",
    text: "（她的眼眶瞬间湿润了）“你看着我的眼睛...再说一遍。”",
  },
  {
    id: 28,
    act: 3,
    background: "暴雨中的公寓",
    mood: "dark",
    weather: "storm",
    character: "你",
    isMonologue: true,
    text: "（死死攥住口袋里的病历单，指甲陷入掌心的肉里）",
  },
  {
    id: 29,
    act: 3,
    background: "暴雨中的公寓",
    mood: "dark",
    weather: "storm",
    character: "你",
    characterMood: "angry",
    text: "“滚。”",
  },
  
  // ========== 第四幕：永恒的缺席 ==========
  {
    id: 30,
    act: 4,
    background: "墓园",
    mood: "grief",
    weather: "clear",
    character: undefined,
    text: "三个月后——",
  },
  {
    id: 31,
    act: 4,
    background: "墓园",
    mood: "grief",
    character: "室友",
    text: "她通过你室友留下的日记，终于知道了真相。",
  },
  {
    id: 32,
    act: 4,
    background: "墓园",
    mood: "grief",
    character: undefined,
    isMonologue: true,
    text: "日记最后一行写着：“如果可以，我希望能骗她一辈子，让她觉得我是个混蛋，然后忘了我。”",
  },
  {
    id: 33,
    act: 4,
    background: "墓园",
    mood: "grief",
    character: undefined,
    text: "魅魔姐姐褪去了所有华丽的装束，穿着素雅的黑裙，半蹲在墓碑前。",
  },
  {
    id: 34,
    act: 4,
    background: "墓园",
    mood: "grief",
    character: "姐姐",
    characterMood: "sad",
    text: "她的手指颤抖着抚摸照片上那个笑得傻乎乎的男孩。墓碑前，放着一罐已经冷掉的牛奶。",
  },
  {
    id: 35,
    act: 4,
    background: "墓园",
    mood: "grief",
    character: "姐姐",
    characterMood: "sad",
    isMonologue: true,
    text: "“你真是...这个世界上最笨、最蠢的骗子。”",
  },
  {
    id: 36,
    act: 4,
    background: "墓园",
    mood: "grief",
    character: "姐姐",
    characterMood: "sad",
    isMonologue: true,
    text: "“你赢了，我这辈子都没法再看向别人了。”",
  },
  {
    id: 37,
    act: 4,
    background: "墓园",
    mood: "grief",
    character: undefined,
    text: "【True End - 永恒的缺席】",
  }
]

// 章节名称映射
export const chapterNames: Record<number, string> = {
  1: "第一幕 - 笨拙的闯入者",
  2: "第一幕 - 深夜便利店",
  3: "第一幕 - 初次相遇",
  4: "第一幕 - 奇怪的对话",
  5: "第一幕 - 温热的牛奶",
  6: "第一幕 - 温热的牛奶",
  7: "第一幕 - 复杂的神色",
  8: "第一幕 - 灵魂的约定",
  9: "第一幕 - 奇怪的人",
  10: "第一幕 - 系鞋带",
  11: "第一幕 - 干净的灵魂",
  12: "第二幕 - 纯情的感化",
  13: "第二幕 - 寒冬的排队",
  14: "第二幕 - 生煎包",
  15: "第二幕 - 傻傻的笑",
  16: "第二幕 - 电影约会",
  17: "第二幕 - 鼓起勇气",
  18: "第二幕 - 笨拙的告白",
  19: "第二幕 - 饱腹感",
  20: "第二幕 - 想做普通女孩",
  21: "第三幕 - 残酷的谎言",
  22: "第三幕 - 诊断书",
  23: "第三幕 - 不能让她知道",
  24: "第三幕 - 暴雨中的决裂",
  25: "第三幕 - 什么意思",
  26: "第三幕 - 最伤人的话",
  27: "第三幕 - 再说一遍",
  28: "第三幕 - 攥紧的病历单",
  29: "第三幕 - 滚",
  30: "第四幕 - 永恒的缺席",
  31: "第四幕 - 日记的真相",
  32: "第四幕 - 最后一行",
  33: "第四幕 - 素雅的黑裙",
  34: "第四幕 - 冷掉的牛奶",
  35: "第四幕 - 最笨的骗子",
  36: "第四幕 - 再也无法看向别人",
  37: "True End",
  38: "第二幕 - 深夜的阳台",
  39: "第二幕 - 月亮的独白",
  40: "第二幕 - 月色真美",
  41: "第二幕 - 赌一把",
  42: "第二幕 - 赌什么",
  43: "第二幕 - 最喜欢的东西",
  44: "第二幕 - 冰天雪地",
  45: "第二幕 - 我赢了",
  46: "第二幕 - 输给你了",
  47: "第二幕 - 书桌前的秘密",
  48: "第二幕 - 剧本里的吻戏",
  49: "第二幕 - 意外的亲近",
  50: "第二幕 - 没见过猪跑吗",
  51: "第二幕 - 摘下眼镜",
  52: "第二幕 - 你干嘛",
  53: "第二幕 - 喂你吃猪肉",
  54: "第二幕 - 纯粹的悸动",
  55: "第二幕 - 清晨的公园",
  56: "第二幕 - 笨蛋",
  57: "第二幕 - 比划一个圆",
  58: "第二幕 - 看见笨蛋",
  59: "第二幕 - 你是我的小太阳",
  60: "第二幕 - 剧本里学的",
  61: "第二幕 - 好想见到你",
  62: "第二幕 - 纯真的少女",
  63: "第二幕 - 我喜欢你"
}

export function getChapterName(sceneId: number): string {
  return chapterNames[sceneId] || "未知章节"
}

export function getActName(act: number): string {
  const actNames: Record<number, string> = {
    1: "第一幕：笨拙的闯入者",
    2: "第二幕：纯情的感化",
    3: "第三幕：残酷的谎言",
    4: "第四幕：永恒的缺席"
  }
  return actNames[act] || ""
}

// 检查是否能达成真结局（需要真心值 > 80）
export function canGetTrueEnding(sincerity: number): boolean {
  return sincerity >= 80
}
