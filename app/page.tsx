"use client"

import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DialogueBox } from "@/components/dialogue-box"
import { GameMenu } from "@/components/game-menu"
import { AffectionBar, SincerityBar } from "@/components/affection-bar"
import { ChoiceButtons } from "@/components/choice-buttons"
import { AffectionPopup } from "@/components/affection-popup"
import { SaveLoadModal } from "@/components/save-load-modal"
import { WeatherEffects } from "@/components/weather-effects"
import { BgmPlayer } from "@/components/bgm-player"
import { LyricsSidebar } from "@/components/lyrics-sidebar"
import { Heart, Sparkles } from "lucide-react"
import { 
  storyScenes, 
  getChapterName, 
  getActName,
  moodThemes,
  type SaveData 
} from "@/lib/story-config"

// 根据场景获取背景图片 —— 每幕使用统一的背景
const getBackgroundImage = (act: number) => {
  switch (act) {
    case 1: return "/images/convenience-store.jpg"
    case 2: return "/images/sakura-bg.jpg"
    case 3: return "/images/rainy-apartment.jpg"
    case 4: return "/images/cemetery.jpg"
    default: return "/images/sakura-bg.jpg"
  }
}

// 所有背景图片路径（用于预加载）
const ALL_BG_IMAGES = [
  "/images/convenience-store.jpg",
  "/images/rainy-apartment.jpg",
  "/images/cemetery.jpg",
  "/images/sakura-bg.jpg",
]

export default function VisualNovelPage() {
  const [currentSceneId, setCurrentSceneId] = useState(1)
  const [affection, setAffection] = useState(20)
  const [sincerity, setSincerity] = useState(0) // 真心值
  const [isTextComplete, setIsTextComplete] = useState(false)
  const [showChoices, setShowChoices] = useState(false)
  
  // 好感度提升动画
  const [showAffectionPopup, setShowAffectionPopup] = useState(false)
  const [affectionChange, setAffectionChange] = useState(0)
  
  // 存档系统
  const [saveModalOpen, setSaveModalOpen] = useState(false)
  const [saveModalMode, setSaveModalMode] = useState<"save" | "load">("save")
  const [saves, setSaves] = useState<(SaveData | null)[]>([null, null, null, null, null, null])
  
  const currentScene = storyScenes.find(s => s.id === currentSceneId) || storyScenes[0]
  const currentChapter = getChapterName(currentSceneId)
  const currentAct = getActName(currentScene.act)
  const mood = currentScene.mood || "warm"
  const theme = moodThemes[mood]
  
  // 预加载所有背景图片
  useEffect(() => {
    ALL_BG_IMAGES.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])
  
  // 加载存档数据
  useEffect(() => {
    const savedData = localStorage.getItem("visual-novel-saves")
    if (savedData) {
      try {
        setSaves(JSON.parse(savedData))
      } catch {
        // 忽略解析错误
      }
    }
  }, [])
  
  const handleChoice = (nextId: number, affectionChangeValue: number, sincerityChangeValue: number = 0) => {
    setShowChoices(false)
    
    if (affectionChangeValue > 0) {
      setAffectionChange(affectionChangeValue)
      setShowAffectionPopup(true)
      setTimeout(() => setShowAffectionPopup(false), 1500)
    }
    
    setAffection(prev => Math.max(0, Math.min(prev + affectionChangeValue, 100)))
    setSincerity(prev => Math.max(0, Math.min(prev + sincerityChangeValue, 100)))
    setCurrentSceneId(nextId)
    setIsTextComplete(false)
  }
  
  const handleTextComplete = useCallback(() => {
    setIsTextComplete(true)
  }, [])
  
  const handleDialogueClick = () => {
    if (isTextComplete && currentScene.choices && currentScene.choices.length > 0) {
      // 有选项时点击弹出选择框
      setShowChoices(true)
    } else if (isTextComplete && !currentScene.choices) {
      // 无选项时点击进入下一场景（按数组顺序）
      const currentIndex = storyScenes.findIndex(s => s.id === currentSceneId)
      const nextScene = storyScenes[currentIndex + 1]
      if (nextScene) {
        setCurrentSceneId(nextScene.id)
        setIsTextComplete(false)
      }
    }
  }
  
  // 存档功能
  const handleSave = (slotId: number) => {
    const newSave: SaveData = {
      id: slotId,
      sceneId: currentSceneId,
      affection: affection,
      sincerity: sincerity,
      timestamp: new Date().toISOString(),
      chapterName: currentChapter
    }
    
    const newSaves = [...saves]
    newSaves[slotId - 1] = newSave
    setSaves(newSaves)
    localStorage.setItem("visual-novel-saves", JSON.stringify(newSaves))
    setSaveModalOpen(false)
  }
  
  const handleLoad = (slotId: number) => {
    const save = saves.find(s => s?.id === slotId)
    if (save) {
      setCurrentSceneId(save.sceneId)
      setAffection(save.affection)
      setSincerity(save.sincerity)
      setIsTextComplete(false)
      setShowChoices(false)
      setSaveModalOpen(false)
    }
  }
  
  const handleDelete = (slotId: number) => {
    const newSaves = [...saves]
    newSaves[slotId - 1] = null
    setSaves(newSaves)
    localStorage.setItem("visual-novel-saves", JSON.stringify(newSaves))
  }
  
  const handleReset = () => {
    setCurrentSceneId(1)
    setAffection(20)
    setSincerity(0)
    setIsTextComplete(false)
    setShowChoices(false)
  }
  
  const openSaveModal = () => {
    setSaveModalMode("save")
    setSaveModalOpen(true)
  }
  
  const openLoadModal = () => {
    setSaveModalMode("load")
    setSaveModalOpen(true)
  }
  
  const choices = currentScene.choices?.map(choice => ({
    text: choice.text,
    isFated: choice.isFated,
    onClick: () => handleChoice(choice.nextId, choice.affectionChange, choice.sincerityChange || 0)
  }))
  
  const bgImage = getBackgroundImage(currentScene.act)
  
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* 背景图片区域 - 带有氛围色调 */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={bgImage + mood}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(to bottom, ${theme.overlay}, ${theme.overlayEnd}), url("${bgImage}")`,
            backgroundSize: "contain",
            backgroundPosition: "center center",
            backgroundColor: "#0a0a0f"
          }}
        />
      </AnimatePresence>
      
      {/* 天气效果 */}
      <WeatherEffects weather={currentScene.weather} />

      {/* BGM 播放器 */}
      <BgmPlayer act={currentScene.act} mood={mood} />
      
      {/* 樱花飘落效果（仅在温暖场景） */}
      {mood === "warm" && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-5">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-fall"
              style={{
                left: `${(i * 8.3 + 3.7) % 100}%`,
                animationDelay: `${(i * 0.42) % 5}s`,
                animationDuration: `${8 + (i * 0.33) % 4}s`
              }}
            >
              <Sparkles className="w-4 h-4 text-primary/40" />
            </div>
          ))}
        </div>
      )}
      
      {/* 场景标题与章节名 */}
      <div className="absolute top-6 left-6 z-10 space-y-2">
        <motion.div 
          key={currentAct}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className={`flex items-center gap-2 px-4 py-2 backdrop-blur-sm rounded-full ${
            mood === "warm" 
              ? "bg-card/70 border border-primary/20" 
              : "bg-slate-900/70 border border-slate-500/30"
          }`}
        >
          <Heart className={`w-4 h-4 ${mood === "warm" ? "text-primary fill-primary/50" : "text-slate-400 fill-slate-400/30"}`} />
          <span className={`text-sm ${mood === "warm" ? "text-foreground/80" : "text-slate-300/80"}`}>
            {currentScene.background}
          </span>
        </motion.div>
        <motion.div
          key={currentChapter}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className={`px-4 py-1.5 backdrop-blur-sm rounded-full ${
            mood === "warm"
              ? "bg-primary/20 border border-primary/30"
              : "bg-slate-800/50 border border-slate-500/30"
          }`}
        >
          <span className={`text-xs ${mood === "warm" ? "text-primary" : "text-slate-400"}`}>
            {currentChapter}
          </span>
        </motion.div>
      </div>
      
      {/* 歌词侧边栏 */}
      <LyricsSidebar act={currentScene.act} mood={mood} />

      {/* 右上角菜单 */}
      <div className="absolute top-6 right-6 z-20">
        <GameMenu 
          onSave={openSaveModal}
          onLoad={openLoadModal}
          onReset={handleReset}
        />
      </div>
      
      {/* 好感度提升特效 */}
      <AffectionPopup 
        isVisible={showAffectionPopup} 
        value={affectionChange} 
      />
      
      {/* 选择肢组件 */}
      <ChoiceButtons 
        choices={choices || []}
        isVisible={showChoices && isTextComplete}
        mood={mood}
      />
      
      {/* 存档/读档弹窗 */}
      <SaveLoadModal
        isOpen={saveModalOpen}
        mode={saveModalMode}
        saves={saves}
        currentSceneId={currentSceneId}
        currentAffection={affection}
        currentChapter={currentChapter}
        onClose={() => setSaveModalOpen(false)}
        onSave={handleSave}
        onLoad={handleLoad}
        onDelete={handleDelete}
      />
      
      {/* 角色立绘区域 */}
      <div className="absolute bottom-56 left-1/2 -translate-x-1/2 w-full max-w-md h-80 flex items-end justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className={`w-48 h-72 rounded-full blur-2xl ${
            mood === "warm" 
              ? "bg-gradient-to-t from-primary/10 to-transparent" 
              : "bg-gradient-to-t from-slate-500/10 to-transparent"
          }`} />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
            <span className={`text-xs ${mood === "warm" ? "text-muted-foreground/50" : "text-slate-500/50"}`}>
              角色立绘区域
            </span>
          </div>
        </motion.div>
      </div>
      
      {/* 底部界面 */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 space-y-3">
        {/* 数值条 */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto space-y-2"
        >
          <AffectionBar 
            value={affection} 
            characterName="姐姐" 
            mood={mood}
            className={`backdrop-blur-sm rounded-full px-4 py-2 border ${
              mood === "warm" 
                ? "bg-card/60 border-primary/20" 
                : "bg-slate-900/60 border-slate-500/30"
            }`}
          />
          <SincerityBar 
            value={sincerity}
            mood={mood}
            className={`backdrop-blur-sm rounded-full px-4 py-2 border ${
              mood === "warm" 
                ? "bg-card/60 border-amber-400/20" 
                : "bg-slate-900/60 border-slate-500/30"
            }`}
          />
        </motion.div>
        
        {/* 对话框 */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto"
          onClick={handleDialogueClick}
        >
          <DialogueBox
            characterName={currentScene.character}
            text={currentScene.text}
            onTextComplete={handleTextComplete}
            isMonologue={currentScene.isMonologue}
            mood={mood}
          />
        </motion.div>
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
