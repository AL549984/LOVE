"use client"

import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface Choice {
  text: string
  onClick: () => void
  isFated?: boolean // 宿命选项
}

interface ChoiceButtonsProps {
  choices: Choice[]
  isVisible: boolean
  mood?: "warm" | "cold" | "dark" | "grief"
  className?: string
}

// 根据氛围获取按钮样式
const getMoodStyles = (mood?: string) => {
  switch (mood) {
    case "cold":
      return {
        bg: "bg-slate-800/90",
        border: "border-slate-500/40",
        hoverBorder: "hover:border-slate-400/60",
        text: "text-slate-200",
        accent: "text-slate-400",
        glow: "rgba(148, 163, 184, 0.3)",
        numberBg: "bg-slate-600/30"
      }
    case "dark":
      return {
        bg: "bg-slate-900/95",
        border: "border-slate-600/50",
        hoverBorder: "hover:border-slate-500/70",
        text: "text-slate-300",
        accent: "text-slate-500",
        glow: "rgba(100, 116, 139, 0.3)",
        numberBg: "bg-slate-700/40"
      }
    case "grief":
      return {
        bg: "bg-slate-800/85",
        border: "border-slate-500/35",
        hoverBorder: "hover:border-slate-400/55",
        text: "text-slate-300",
        accent: "text-slate-400",
        glow: "rgba(120, 130, 140, 0.25)",
        numberBg: "bg-slate-600/35"
      }
    default: // warm
      return {
        bg: "bg-card/90",
        border: "border-primary/30",
        hoverBorder: "hover:border-primary/60",
        text: "text-foreground/90",
        accent: "text-primary",
        glow: "rgba(244, 114, 182, 0.4)",
        numberBg: "bg-primary/20"
      }
  }
}

export function ChoiceButtons({ choices, isVisible, mood = "warm", className }: ChoiceButtonsProps) {
  const styles = getMoodStyles(mood)
  const isFated = choices.some(c => c.isFated)
  
  return (
    <AnimatePresence>
      {isVisible && choices.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "fixed inset-0 flex items-center justify-center z-40",
            mood === "dark" || mood === "cold" 
              ? "bg-slate-950/20 backdrop-blur-[2px]" 
              : "bg-foreground/10 backdrop-blur-[2px]",
            className
          )}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex flex-col gap-4 w-full max-w-md px-6"
          >
            {/* 宿命提示 */}
            {isFated && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-2"
              >
                <span className="text-slate-400 text-sm italic">
                  ...无论你怎么选择，命运都已注定...
                </span>
              </motion.div>
            )}
            
            {choices.map((choice, index) => (
              <motion.button
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: `0 0 30px ${styles.glow}`
                }}
                whileTap={{ scale: 0.98 }}
                onClick={choice.onClick}
                className={cn(
                  "relative group px-8 py-5 rounded-2xl",
                  styles.bg, "backdrop-blur-md",
                  "border-2", styles.border,
                  styles.text, "text-lg font-medium",
                  "transition-all duration-300 ease-out",
                  styles.hoverBorder, "hover:bg-opacity-95",
                  "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent",
                  mood === "warm" ? "focus:ring-primary/50" : "focus:ring-slate-500/50",
                  choice.isFated && "opacity-80"
                )}
              >
                {/* 背景光晕效果 */}
                <div className={cn(
                  "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                  mood === "warm" 
                    ? "bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0"
                    : "bg-gradient-to-r from-slate-400/0 via-slate-400/5 to-slate-400/0"
                )} />
                
                {/* 边框光晕 */}
                <div className={cn(
                  "absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 -z-10",
                  mood === "warm"
                    ? "bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20"
                    : "bg-gradient-to-r from-slate-500/15 via-slate-400/25 to-slate-500/15"
                )} />
                
                {/* 序号装饰 */}
                <span className={cn(
                  "absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition-colors",
                  styles.numberBg, styles.accent,
                  "group-hover:bg-opacity-50"
                )}>
                  {index + 1}
                </span>
                
                {/* 选项文字 */}
                <span className="relative pl-8 block text-left">
                  {choice.text}
                </span>
                
                {/* 右侧箭头 */}
                <motion.span 
                  className={cn(
                    "absolute right-4 top-1/2 -translate-y-1/2 transition-colors",
                    mood === "warm" ? "text-primary/50 group-hover:text-primary" : "text-slate-500 group-hover:text-slate-400"
                  )}
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                >
                  →
                </motion.span>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
