"use client"

import { useState, useCallback } from "react"
import { DialogueBox } from "@/components/dialogue-box"
import { GameMenu } from "@/components/game-menu"
import { AffectionBar } from "@/components/affection-bar"
import { Heart, Sparkles } from "lucide-react"

// 游戏剧本数据
const storyScenes = [
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
    choices: undefined
  }
]

export default function VisualNovelPage() {
  const [currentSceneId, setCurrentSceneId] = useState(1)
  const [affection, setAffection] = useState(20)
  const [isTextComplete, setIsTextComplete] = useState(false)
  const [showSaveNotification, setShowSaveNotification] = useState(false)
  
  const currentScene = storyScenes.find(s => s.id === currentSceneId) || storyScenes[0]
  
  const handleChoice = (nextId: number, affectionChange: number) => {
    setAffection(prev => Math.min(prev + affectionChange, 100))
    setCurrentSceneId(nextId)
    setIsTextComplete(false)
  }
  
  const handleTextComplete = useCallback(() => {
    setIsTextComplete(true)
  }, [])
  
  const handleSave = () => {
    setShowSaveNotification(true)
    setTimeout(() => setShowSaveNotification(false), 2000)
  }
  
  const handleReset = () => {
    setCurrentSceneId(1)
    setAffection(20)
    setIsTextComplete(false)
  }
  
  const choices = currentScene.choices?.map(choice => ({
    text: choice.text,
    onClick: () => handleChoice(choice.nextId, choice.affectionChange)
  }))
  
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* 背景图片区域 */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(255,240,245,0.2), rgba(255,228,235,0.4)), url("/images/sakura-bg.jpg")`
        }}
      />
      
      {/* 樱花飘落效果 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          >
            <Sparkles className="w-4 h-4 text-primary/40" />
          </div>
        ))}
      </div>
      
      {/* 场景标题 */}
      <div className="absolute top-6 left-6 z-10">
        <div className="flex items-center gap-2 px-4 py-2 bg-card/70 backdrop-blur-sm border border-primary/20 rounded-full">
          <Heart className="w-4 h-4 text-primary fill-primary/50" />
          <span className="text-sm text-foreground/80">{currentScene.background}</span>
        </div>
      </div>
      
      {/* 右上角菜单 */}
      <div className="absolute top-6 right-6 z-20">
        <GameMenu 
          onSave={handleSave}
          onLoad={() => {}}
          onReset={handleReset}
        />
      </div>
      
      {/* 存档提示 */}
      {showSaveNotification && (
        <div className="absolute top-20 right-6 z-30 px-4 py-2 bg-primary/20 border border-primary/40 rounded-lg backdrop-blur-sm animate-in fade-in slide-in-from-top-2 duration-300">
          <span className="text-sm text-primary">存档成功</span>
        </div>
      )}
      
      {/* 角色立绘区域（占位） */}
      <div className="absolute bottom-48 left-1/2 -translate-x-1/2 w-full max-w-md h-96 flex items-end justify-center">
        <div className="relative">
          {/* 角色轮廓提示 */}
          <div className="w-48 h-72 rounded-full bg-gradient-to-t from-primary/10 to-transparent blur-2xl" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
            <span className="text-xs text-muted-foreground/50">角色立绘区域</span>
          </div>
        </div>
      </div>
      
      {/* 底部界面 */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 space-y-4">
        {/* 好感度条 */}
        <div className="max-w-2xl mx-auto">
          <AffectionBar 
            value={affection} 
            characterName="小樱" 
            className="bg-card/60 backdrop-blur-sm rounded-full px-4 py-2 border border-primary/20"
          />
        </div>
        
        {/* 对话框 */}
        <div className="max-w-3xl mx-auto">
          <DialogueBox
            characterName={currentScene.character}
            text={currentScene.text}
            choices={isTextComplete ? choices : undefined}
            onTextComplete={handleTextComplete}
          />
        </div>
      </div>
      
      {/* 自定义动画样式 */}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </main>
  )
}
