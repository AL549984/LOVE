// 剧本配置类型定义
export interface StoryChoice {
  text: string
  nextId: number
  affectionChange: number
}

export interface StoryScene {
  id: number
  background: string
  backgroundImage?: string
  character?: string
  text: string
  choices?: StoryChoice[]
}

export interface SaveData {
  id: number
  sceneId: number
  affection: number
  timestamp: string
  chapterName: string
  screenshot?: string
}

// 游戏剧本数据 - 可根据需要扩展
export const storyScenes: StoryScene[] = [
  {
    id: 1,
    background: "樱花树下",
    character: "???",
    text: "你好，我好像在哪里见过你...",
    choices: [
      { text: "我也有同样的感觉", nextId: 2, affectionChange: 5 },
      { text: "抱歉，我不记得了", nextId: 3, affectionChange: 0 }
    ]
  },
  {
    id: 2,
    background: "樱花树下",
    character: "小樱",
    text: "真的吗？那一定是命运的安排吧。我叫小樱，很高兴认识你。",
    choices: [
      { text: "命运...真是个浪漫的词", nextId: 4, affectionChange: 10 },
      { text: "我叫...", nextId: 4, affectionChange: 5 }
    ]
  },
  {
    id: 3,
    background: "樱花树下",
    character: "小樱",
    text: "没关系的，也许是我记错了。我叫小樱，今天的樱花开得真美呢。",
    choices: [
      { text: "是啊，和你一样美", nextId: 4, affectionChange: 10 },
      { text: "确实很美", nextId: 4, affectionChange: 3 }
    ]
  },
  {
    id: 4,
    background: "樱花树下",
    character: "小樱",
    text: "春天真是让人心情愉悦的季节。你经常来这里吗？",
    choices: [
      { text: "如果能再见到你的话，我会经常来的", nextId: 5, affectionChange: 15 },
      { text: "偶尔会来散步", nextId: 5, affectionChange: 5 }
    ]
  },
  {
    id: 5,
    background: "樱花树下",
    character: "小樱",
    text: "（小樱微微脸红）那...那我们下次再见面吧？",
    choices: [
      { text: "当然，我很期待", nextId: 6, affectionChange: 10 },
      { text: "好的", nextId: 6, affectionChange: 3 }
    ]
  },
  {
    id: 6,
    background: "黄昏的街道",
    character: "小樱",
    text: "那么...明天见。路上小心哦。",
    choices: undefined
  }
]

// 章节名称映射
export const chapterNames: Record<number, string> = {
  1: "序章 - 初遇",
  2: "序章 - 命运的邂逅",
  3: "序章 - 樱花树下",
  4: "序章 - 春日之约",
  5: "序章 - 心跳的预感",
  6: "第一章 - 再见的约定"
}

export function getChapterName(sceneId: number): string {
  return chapterNames[sceneId] || "未知章节"
}
