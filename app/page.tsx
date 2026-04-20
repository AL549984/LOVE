"use client"

import { useState, useCallback, useEffect } from "react"
import { motion } from "framer-motion"
import { DialogueBox } from "@/components/dialogue-box"
import { GameMenu } from "@/components/game-menu"
import { AffectionBar } from "@/components/affection-bar"
import { ChoiceButtons } from "@/components/choice-buttons"
import { AffectionPopup } from "@/components/affection-popup"
import { SaveLoadModal } from "@/components/save-load-modal"
import { Heart, Sparkles } from "lucide-react"
import { storyScenes, getChapterName, type SaveData } from "@/lib/story-config"

export default function VisualNovelPage() {
  const [currentSceneId, setCurrentSceneId] = useState(1)
  const [affection, setAffection] = useState(20)
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
  
  const handleChoice = (nextId: number, affectionChangeValue: number) => {
    setShowChoices(false)
    
    if (affectionChangeValue > 0) {
      setAffectionChange(affectionChangeValue)
      setShowAffectionPopup(true)
      setTimeout(() => setShowAffectionPopup(false), 1500)
    }
    
    setAffection(prev => Math.min(prev + affectionChangeValue, 100))
    setCurrentSceneId(nextId)
    setIsTextComplete(false)
  }
  
  const handleTextComplete = useCallback(() => {
    setIsTextComplete(true)
    // 延迟显示选择肢
    if (currentScene.choices && currentScene.choices.length > 0) {
      setTimeout(() => setShowChoices(true), 300)
    }
  }, [currentScene.choices])
  
  const handleDialogueClick = () => {
    if (isTextComplete && !currentScene.choices) {
      // 无选项时点击进入下一场景
      const nextScene = storyScenes.find(s => s.id === currentSceneId + 1)
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
    onClick: () => handleChoice(choice.nextId, choice.affectionChange)
  }))
  
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* 背景图片区域 */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
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
      
      {/* 场景标题与章节名 */}
      <div className="absolute top-6 left-6 z-10 space-y-2">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-2 px-4 py-2 bg-card/70 backdrop-blur-sm border border-primary/20 rounded-full"
        >
          <Heart className="w-4 h-4 text-primary fill-primary/50" />
          <span className="text-sm text-foreground/80">{currentScene.background}</span>
        </motion.div>
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="px-4 py-1.5 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full"
        >
          <span className="text-xs text-primary">{currentChapter}</span>
        </motion.div>
      </div>
      
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
      <div className="absolute bottom-48 left-1/2 -translate-x-1/2 w-full max-w-md h-96 flex items-end justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="w-48 h-72 rounded-full bg-gradient-to-t from-primary/10 to-transparent blur-2xl" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
            <span className="text-xs text-muted-foreground/50">角色立绘区域</span>
          </div>
        </motion.div>
      </div>
      
      {/* 底部界面 */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 space-y-4">
        {/* 好感度条 */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <AffectionBar 
            value={affection} 
            characterName="小樱" 
            className="bg-card/60 backdrop-blur-sm rounded-full px-4 py-2 border border-primary/20"
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
