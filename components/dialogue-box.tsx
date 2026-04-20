"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface DialogueBoxProps {
  characterName?: string
  text: string
  textSpeed?: number
  onTextComplete?: () => void
  className?: string
}

export function DialogueBox({
  characterName,
  text,
  textSpeed = 50,
  onTextComplete,
  className
}: DialogueBoxProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const onTextCompleteRef = useRef(onTextComplete)
  
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
  
  const handleSkip = () => {
    if (!isComplete) {
      setDisplayedText(text)
      setIsComplete(true)
      onTextCompleteRef.current?.()
    }
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative bg-card/80 backdrop-blur-md border border-primary/20 rounded-2xl p-6 shadow-lg",
        "cursor-pointer select-none",
        className
      )}
      onClick={handleSkip}
    >
      {/* 装饰边框 */}
      <div className="absolute inset-0 rounded-2xl border border-primary/10 pointer-events-none" />
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
      
      {/* 角色名称 */}
      {characterName && (
        <motion.div 
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="mb-3"
        >
          <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-primary/30 to-primary/20 text-primary rounded-full text-sm font-medium border border-primary/30 shadow-sm">
            {characterName}
          </span>
        </motion.div>
      )}
      
      {/* 对话文字 */}
      <div className="text-foreground/90 text-lg leading-relaxed min-h-[4rem]">
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
            className="inline-block w-0.5 h-5 bg-primary/60 ml-1 align-middle"
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
            className="text-xs text-muted-foreground flex items-center gap-1"
          >
            <span className="inline-block w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-primary/60 rotate-180" />
            点击继续
          </motion.span>
        </motion.div>
      )}
    </motion.div>
  )
}
