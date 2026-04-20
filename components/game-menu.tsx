"use client"

import { Settings, Save, FolderOpen, Volume2, VolumeX, RotateCcw } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface GameMenuProps {
  onSave?: () => void
  onLoad?: () => void
  onReset?: () => void
  className?: string
}

export function GameMenu({ onSave, onLoad, onReset, className }: GameMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  
  return (
    <div className={cn("relative", className)}>
      <div className="flex items-center gap-2">
        {/* 快捷按钮 */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-2.5 bg-card/70 backdrop-blur-sm border border-primary/20 rounded-full hover:bg-primary/20 hover:border-primary/40 transition-all duration-300 group"
          title={isMuted ? "开启音效" : "静音"}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
          ) : (
            <Volume2 className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
          )}
        </button>
        
        <button
          onClick={onSave}
          className="p-2.5 bg-card/70 backdrop-blur-sm border border-primary/20 rounded-full hover:bg-primary/20 hover:border-primary/40 transition-all duration-300 group"
          title="存档"
        >
          <Save className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
        </button>
        
        <button
          onClick={onLoad}
          className="p-2.5 bg-card/70 backdrop-blur-sm border border-primary/20 rounded-full hover:bg-primary/20 hover:border-primary/40 transition-all duration-300 group"
          title="读档"
        >
          <FolderOpen className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
        </button>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "p-2.5 bg-card/70 backdrop-blur-sm border border-primary/20 rounded-full hover:bg-primary/20 hover:border-primary/40 transition-all duration-300 group",
            isOpen && "bg-primary/20 border-primary/40"
          )}
          title="设置"
        >
          <Settings className={cn(
            "w-5 h-5 text-muted-foreground group-hover:text-primary transition-transform duration-300",
            isOpen && "rotate-90 text-primary"
          )} />
        </button>
      </div>
      
      {/* 设置面板 */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-3 w-64 bg-card/90 backdrop-blur-md border border-primary/20 rounded-2xl p-4 shadow-xl z-50">
          <h3 className="text-sm font-medium text-primary mb-4 pb-2 border-b border-primary/20">
            游戏设置
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">文字速度</label>
              <input 
                type="range" 
                min="1" 
                max="5" 
                defaultValue="3"
                className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer accent-primary"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">背景音乐</label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                defaultValue="70"
                className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer accent-primary"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">音效</label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                defaultValue="80"
                className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer accent-primary"
              />
            </div>
            
            <button
              onClick={onReset}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 mt-2 bg-destructive/10 hover:bg-destructive/20 text-destructive/80 rounded-lg transition-colors text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              重新开始
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
