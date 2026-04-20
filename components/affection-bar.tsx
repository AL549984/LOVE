"use client"

import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface AffectionBarProps {
  value: number
  maxValue?: number
  characterName?: string
  className?: string
}

export function AffectionBar({ 
  value, 
  maxValue = 100, 
  characterName = "好感度",
  className 
}: AffectionBarProps) {
  const percentage = Math.min((value / maxValue) * 100, 100)
  
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex items-center gap-2">
        <Heart className="w-4 h-4 text-primary fill-primary" />
        <span className="text-sm text-foreground/80 whitespace-nowrap">
          {characterName}
        </span>
      </div>
      <div className="flex-1 h-3 bg-secondary/60 rounded-full overflow-hidden backdrop-blur-sm border border-primary/20">
        <div 
          className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs text-muted-foreground min-w-[3rem] text-right">
        {value}/{maxValue}
      </span>
    </div>
  )
}
