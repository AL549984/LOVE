"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface DialogueBoxProps {
  characterName?: string
  text: string
  textSpeed?: number
  onTextComplete?: () => void
  isMonologue?: boolean
  mood?: "warm" | "cold" | "dark" | "grief"
  className?: string
}

// 根据氛围获取样式
const getMoodStyles = (mood?: string) => {
  switch (mood) {
    case "cold":
      return {
        bg: "bg-slate-900/85",
        border: "border-slate-500/30",
        text: "text-slate-200/90",
        nameBg: "from-slate-600/40 to-slate-700/30",
        nameText: "text-slate-300",
        nameBorder: "border-slate-500/40",
        cursor: "bg-slate-400/60",
        hint: "text-slate-400/70"
      }
    case "dark":
      return {
        bg: "bg-slate-950/90",
        border: "border-slate-600/40",
        text: "text-slate-300/90",
        nameBg: "from-slate-700/50 to-slate-800/40",
        nameText: "text-slate-400",
        nameBorder: "border-slate-600/50",
        cursor: "bg-slate-500/60",
        hint: "text-slate-500/60"
      }
    case "grief":
      return {
        bg: "bg-slate-800/80",
        border: "border-slate-500/25",
        text: "text-slate-300/85",
        nameBg: "from-slate-600/35 to-slate-700/25",
        nameText: "text-slate-400",
        nameBorder: "border-slate-500/35",
        cursor: "bg-slate-400/50",
        hint: "text-slate-400/60"
      }
    default: // warm
      return {
        bg: "bg-card/80",
        border: "border-primary/20",
        text: "text-foreground/90",
        nameBg: "from-primary/30 to-primary/20",
        nameText: "text-primary",
        nameBorder: "border-primary/30",
        cursor: "bg-primary/60",
        hint: "text-muted-foreground"
      }
  }
}

export function DialogueBox({
  characterName,
  text,
  textSpeed = 100,
  onTextComplete,
  isMonologue = false,
  mood = "warm",
  className
}: DialogueBoxProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const onTextCompleteRef = useRef(onTextComplete)
  const styles = getMoodStyles(mood)
  
  // 更新 ref
  useEffect(() => {
    onTextCompleteRef.current = onTextComplete
  }, [onTextComplete])
  
  useEffect(() => {
    setDisplayedText("")
    setIsComplete(false)
    let index = 0
    
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
        setIsComplete(true)
        onTextCompleteRef.current?.()
      }
    }, textSpeed)
    
    return () => clearInterval(interval)
  }, [text, textSpeed])
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative backdrop-blur-md rounded-2xl p-6 shadow-lg",
        "select-none",
        isComplete ? "cursor-pointer" : "cursor-default",
        styles.bg,
        "border",
        styles.border,
        className
      )}
    >
      {/* 装饰边框 */}
      <div className={cn(
        "absolute inset-0 rounded-2xl border pointer-events-none",
        mood === "warm" ? "border-primary/10" : "border-slate-600/10"
      )} />
      <div className={cn(
        "absolute -inset-0.5 rounded-2xl pointer-events-none",
        mood === "warm" 
          ? "bg-gradient-to-r from-primary/5 via-transparent to-primary/5"
          : "bg-gradient-to-r from-slate-500/3 via-transparent to-slate-500/3"
      )} />
      
      {/* 角色名称 */}
      {characterName && (
        <motion.div 
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="mb-3"
        >
          <span className={cn(
            "inline-block px-4 py-1.5 rounded-full text-sm font-medium shadow-sm",
            "bg-gradient-to-r", styles.nameBg,
            styles.nameText,
            "border", styles.nameBorder,
            isMonologue && "italic"
          )}>
            {isMonologue ? `${characterName}（内心）` : characterName}
          </span>
        </motion.div>
      )}
      
      {/* 对话文字 */}
      <div className={cn(
        "text-lg leading-relaxed min-h-[4rem]",
        styles.text,
        isMonologue && "italic opacity-90"
      )}>
        {displayedText.split('').map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.05 }}
          >
            {char}
          </motion.span>
        ))}
        {!isComplete && (
          <motion.span 
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className={cn("inline-block w-0.5 h-5 ml-1 align-middle", styles.cursor)}
          />
        )}
      </div>
      
      {/* 继续提示 */}
      {isComplete && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 flex justify-end"
        >
          <motion.span 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={cn("text-xs flex items-center gap-1", styles.hint)}
          >
            <span className={cn(
              "inline-block w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 rotate-180",
              mood === "warm" ? "border-t-primary/60" : "border-t-slate-500/60"
            )} />
            点击继续
          </motion.span>
        </motion.div>
      )}
    </motion.div>
  )
}
