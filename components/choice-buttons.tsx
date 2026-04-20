"use client"

import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface Choice {
  text: string
  onClick: () => void
}

interface ChoiceButtonsProps {
  choices: Choice[]
  isVisible: boolean
  className?: string
}

export function ChoiceButtons({ choices, isVisible, className }: ChoiceButtonsProps) {
  return (
    <AnimatePresence>
      {isVisible && choices.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "fixed inset-0 flex items-center justify-center z-40 bg-foreground/10 backdrop-blur-[2px]",
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
            {choices.map((choice, index) => (
              <motion.button
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 0 30px rgba(244, 114, 182, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
                onClick={choice.onClick}
                className={cn(
                  "relative group px-8 py-5 rounded-2xl",
                  "bg-card/90 backdrop-blur-md",
                  "border-2 border-primary/30",
                  "text-foreground/90 text-lg font-medium",
                  "transition-all duration-300 ease-out",
                  "hover:border-primary/60 hover:bg-card/95",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-transparent"
                )}
              >
                {/* 背景光晕效果 */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* 边框光晕 */}
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 -z-10" />
                
                {/* 序号装饰 */}
                <span className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-primary/20 text-primary text-sm font-bold group-hover:bg-primary/30 transition-colors">
                  {index + 1}
                </span>
                
                {/* 选项文字 */}
                <span className="relative pl-8 block text-left">
                  {choice.text}
                </span>
                
                {/* 右侧箭头 */}
                <motion.span 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/50 group-hover:text-primary transition-colors"
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
