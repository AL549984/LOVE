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
    text: "（她挑了挑眉，似乎有些意外）"哦？还有人会主动搭讪我...有意思。"",
  },
  {
    id: 4,
    act: 1,
    background: "深夜的便利店",
    mood: "warm", 
    character: "神秘女子",
    characterMood: "normal",
    text: "她缓步走近你，一股若有若无的幽香飘来。"小弟弟，深夜一个人逛便利店，不害怕吗？"",
    choices: [
      { text: ""姐姐，我看你脸色不好，是不是胃不舒服？"", nextId: 5, affectionChange: 15, sincerityChange: 20 },
      { text: ""不害怕，倒是姐姐你一个人也很危险吧？"", nextId: 6, affectionChange: 5, sincerityChange: 10 }
    ]
  },
  {
    id: 5,
    act: 1,
    background: "深夜的便利店",
    mood: "warm",
    character: "神秘女子",
    characterMood: "shock",
    text: "（她愣了一下，显然没料到这个回答）"...什么？"",
  },
  {
    id: 6,
    act: 1,
    background: "深夜的便利店",
    mood: "warm",
    character: "你",
    text: "你从书包里掏出一罐温热的牛奶，笨拙地递了过去。",
    choices: [
      { text: ""这个给你，暖暖胃。"", nextId: 7, affectionChange: 20, sincerityChange: 25 }
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
    text: ""你知不知道，只要我勾勾手指，你的灵魂就属于我了？"",
    choices: [
      { text: ""那...那我可以把灵魂洗干净点再给你吗？怕你嫌弃。"", nextId: 9, affectionChange: 25, sincerityChange: 30 },
      { text: ""姐姐你在说什么？我听不懂..."", nextId: 10, affectionChange: 10, sincerityChange: 15 }
    ]
  },
  {
    id: 9,
    act: 1,
    background: "昏暗的公寓楼下",
    mood: "warm",
    character: "姐姐",
    characterMood: "shock",
    text: "（她愣住了，许久才轻声笑了出来）"你这个人...真的很奇怪。"",
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
    text: ""你...你是傻子吗？就为了这个？"",
  },
  {
    id: 15,
    act: 2,
    background: "寒冷的清晨",
    mood: "warm",
    character: "你",
    text: ""姐姐你说好吃嘛，我就想让你尝尝。趁热吃！"",
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
    text: ""我...我以后能一直给你买牛奶吗？"（手抖得像筛糠）",
  },
  {
    id: 19,
    act: 2,
    background: "电影院门口",
    mood: "warm",
    character: "姐姐",
    characterMood: "blush",
    isMonologue: true,
    text: "（第一次...她感到的"饱腹感"不是来源于欲望，而是来源于被珍视。）",
  },
  {
    id: 20,
    act: 2,
    background: "电影院门口",
    mood: "warm",
    character: "姐姐",
    characterMood: "blush",
    text: ""...好。"（她收敛了气息，第一次想做一个普通的女孩）",
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
    text: ""你...这是什么意思？"",
    choices: [
      { text: ""别再缠着我了。"", nextId: 26, affectionChange: -50, sincerityChange: 0, isFated: true },
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
    text: ""你这种随便的女人，我玩腻了。其实我也没那么单纯，我只是想试试'攻略'姐姐是什么感觉。"",
  },
  {
    id: 27,
    act: 3,
    background: "暴雨中的公寓",
    mood: "dark",
    weather: "storm",
    character: "姐姐",
    characterMood: "sad",
    text: "（她的眼眶瞬间湿润了）"你看着我的眼睛...再说一遍。"",
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
    text: ""滚。"",
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
    text: "日记最后一行写着："如果可以，我希望能骗她一辈子，让她觉得我是个混蛋，然后忘了我。"",
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
    text: ""你真是...这个世界上最笨、最蠢的骗子。"",
  },
  {
    id: 36,
    act: 4,
    background: "墓园",
    mood: "grief",
    character: "姐姐",
    characterMood: "sad",
    isMonologue: true,
    text: ""你赢了，我这辈子都没法再看向别人了。"",
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
  37: "True End"
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
