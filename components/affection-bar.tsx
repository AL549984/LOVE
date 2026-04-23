"use client"

import { Heart, Sparkle } from "lucide-react"
import { cn } from "@/lib/utils"

interface AffectionBarProps {
  value: number
  maxValue?: number
  characterName?: string
  mood?: "warm" | "cold" | "dark" | "grief"
  className?: string
}

// 根据氛围获取样式
const getMoodStyles = (mood?: string) => {
  switch (mood) {
    case "cold":
    case "dark":
    case "grief":
      return {
        icon: "text-slate-400 fill-slate-400/50",
        text: "text-slate-300/80",
        trackBg: "bg-slate-700/50 border-slate-500/30",
        fillBg: "from-slate-500/70 to-slate-400/80",
        value: "text-slate-400"
      }
    default:
      return {
        icon: "text-primary fill-primary",
        text: "text-foreground/80",
        trackBg: "bg-secondary/60 border-primary/20",
        fillBg: "from-primary/80 to-primary",
        value: "text-muted-foreground"
      }
  }
}

export function AffectionBar({ 
  value, 
  maxValue = 100, 
  characterName = "好感度",
  mood = "warm",
  className 
}: AffectionBarProps) {
  const percentage = Math.min((value / maxValue) * 100, 100)
  const styles = getMoodStyles(mood)
  
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex items-center gap-2">
        <Heart className={cn("w-4 h-4", styles.icon)} />
        <span className={cn("text-sm whitespace-nowrap", styles.text)}>
          {characterName}
        </span>
      </div>
      <div className={cn(
        "flex-1 h-3 rounded-full overflow-hidden backdrop-blur-sm border",
        styles.trackBg
      )}>
        <div 
          className={cn(
            "h-full bg-gradient-to-r rounded-full transition-all duration-500 ease-out",
            styles.fillBg
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className={cn("text-xs min-w-[3rem] text-right", styles.value)}>
        {value}/{maxValue}
      </span>
    </div>
  )
}

// 真心值进度条
interface SincerityBarProps {
  value: number
  maxValue?: number
  mood?: "warm" | "cold" | "dark" | "grief"
  className?: string
}

export function SincerityBar({ 
  value, 
  maxValue = 100, 
  mood = "warm",
  className 
}: SincerityBarProps) {
  const percentage = Math.min((value / maxValue) * 100, 100)
  const canGetTrueEnding = value >= 80
  
  const isWarm = mood === "warm"
  
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex items-center gap-2">
        <Sparkle className={cn(
          "w-4 h-4",
          isWarm 
            ? (canGetTrueEnding ? "text-amber-400 fill-amber-400" : "text-amber-400/60 fill-amber-400/30")
            : "text-slate-400 fill-slate-400/50"
        )} />
        <span className={cn(
          "text-sm whitespace-nowrap",
          isWarm ? "text-foreground/80" : "text-slate-300/80"
        )}>
          真心值
        </span>
      </div>
      <div className={cn(
        "flex-1 h-3 rounded-full overflow-hidden backdrop-blur-sm border",
        isWarm ? "bg-amber-100/30 border-amber-400/20" : "bg-slate-700/50 border-slate-500/30"
      )}>
        <div 
          className={cn(
            "h-full bg-gradient-to-r rounded-full transition-all duration-500 ease-out",
            isWarm ? "from-amber-400/70 to-amber-500/90" : "from-slate-500/70 to-slate-400/80"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className={cn(
        "text-xs min-w-[3rem] text-right",
        canGetTrueEnding && isWarm ? "text-amber-500 font-medium" : (isWarm ? "text-muted-foreground" : "text-slate-400")
      )}>
        {value}/{maxValue}
      </span>
    </div>
  )
}
