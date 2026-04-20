"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Save, FolderOpen, Trash2, Heart, Clock, Sparkle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SaveData } from "@/lib/story-config"

interface SaveLoadModalProps {
  isOpen: boolean
  mode: "save" | "load"
  saves: (SaveData | null)[]
  currentSceneId: number
  currentAffection: number
  currentChapter: string
  onClose: () => void
  onSave: (slotId: number) => void
  onLoad: (slotId: number) => void
  onDelete: (slotId: number) => void
  className?: string
}

export function SaveLoadModal({
  isOpen,
  mode,
  saves,
  currentSceneId,
  currentAffection,
  currentChapter,
  onClose,
  onSave,
  onLoad,
  onDelete,
  className
}: SaveLoadModalProps) {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString("zh-CN", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center p-4",
            "bg-foreground/20 backdrop-blur-sm",
            className
          )}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-card/95 backdrop-blur-md border border-primary/30 rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* 标题栏 */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-primary/20 bg-gradient-to-r from-primary/10 to-transparent">
              <div className="flex items-center gap-3">
                {mode === "save" ? (
                  <Save className="w-5 h-5 text-primary" />
                ) : (
                  <FolderOpen className="w-5 h-5 text-primary" />
                )}
                <h2 className="text-lg font-semibold text-foreground">
                  {mode === "save" ? "存档" : "读档"}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-primary/20 transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* 存档格子 */}
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {saves.map((save, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      "relative group rounded-2xl overflow-hidden",
                      "border-2 border-primary/20 hover:border-primary/50",
                      "transition-all duration-300",
                      "bg-gradient-to-br from-secondary/50 to-secondary/30"
                    )}
                  >
                    {save ? (
                      // 有存档的格子
                      <div className="relative">
                        {/* 截图预览区域 */}
                        <div 
                          className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
                        >
                          <div className="text-center">
                            <Heart className="w-8 h-8 text-primary/40 mx-auto mb-1" />
                            <span className="text-xs text-primary/60">存档 {index + 1}</span>
                          </div>
                        </div>
                        
                        {/* 存档信息 */}
                        <div className="p-3 space-y-1.5">
                          <p className="text-sm font-medium text-foreground/90 truncate">
                            {save.chapterName}
                          </p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Heart className="w-3 h-3 text-primary fill-primary" />
                              {save.affection}
                            </span>
                            <span className="flex items-center gap-1">
                              <Sparkle className="w-3 h-3 text-amber-400 fill-amber-400/50" />
                              {save.sincerity}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatTime(save.timestamp)}
                            </span>
                          </div>
                        </div>

                        {/* 操作按钮 */}
                        <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                          <button
                            onClick={() => mode === "save" ? onSave(save.id) : onLoad(save.id)}
                            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                          >
                            {mode === "save" ? "覆盖" : "读取"}
                          </button>
                          <button
                            onClick={() => onDelete(save.id)}
                            className="p-2 bg-destructive/80 text-white rounded-lg hover:bg-destructive transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      // 空存档格子
                      <button
                        onClick={() => mode === "save" ? onSave(index + 1) : undefined}
                        disabled={mode === "load"}
                        className={cn(
                          "w-full aspect-[4/3] flex flex-col items-center justify-center gap-2",
                          "text-muted-foreground",
                          mode === "save" 
                            ? "hover:text-primary hover:bg-primary/10 cursor-pointer" 
                            : "cursor-not-allowed opacity-50"
                        )}
                      >
                        <div className="w-12 h-12 rounded-full border-2 border-dashed border-current flex items-center justify-center">
                          {mode === "save" ? (
                            <Save className="w-5 h-5" />
                          ) : (
                            <span className="text-lg">?</span>
                          )}
                        </div>
                        <span className="text-sm">
                          {mode === "save" ? "新建存档" : "空存档位"}
                        </span>
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 当前状态提示 */}
            {mode === "save" && (
              <div className="px-6 pb-6">
                <div className="flex items-center justify-between px-4 py-3 bg-secondary/50 rounded-xl text-sm">
                  <span className="text-muted-foreground">当前进度</span>
                  <span className="text-foreground/80">{currentChapter}</span>
                  <span className="flex items-center gap-1 text-primary">
                    <Heart className="w-3 h-3 fill-primary" />
                    {currentAffection}
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
