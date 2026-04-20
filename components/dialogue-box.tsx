"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface DialogueBoxProps {
  characterName?: string
  text: string
  choices?: { text: string; onClick: () => void }[]
  onTextComplete?: () => void
  className?: string
}

export function DialogueBox({
  characterName,
  text,
  choices,
  onTextComplete,
  className
}: DialogueBoxProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  
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
        onTextComplete?.()
      }
    }, 50)
    
    return () => clearInterval(interval)
  }, [text, onTextComplete])
  
  const handleSkip = () => {
    setDisplayedText(text)
    setIsComplete(true)
    onTextComplete?.()
  }
  
  return (
    <div 
      className={cn(
        "bg-card/80 backdrop-blur-md border border-primary/20 rounded-2xl p-6 shadow-lg",
        className
      )}
      onClick={!isComplete ? handleSkip : undefined}
    >
      {characterName && (
        <div className="mb-3">
          <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary rounded-full text-sm font-medium border border-primary/30">
            {characterName}
          </span>
        </div>
      )}
      
      <div className="text-foreground/90 text-lg leading-relaxed min-h-[4rem] cursor-pointer">
        {displayedText}
        {!isComplete && (
          <span className="inline-block w-0.5 h-5 bg-primary/60 ml-1 animate-pulse" />
        )}
      </div>
      
      {isComplete && choices && choices.length > 0 && (
        <div className="mt-6 space-y-3">
          {choices.map((choice, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation()
                choice.onClick()
              }}
              className="w-full text-left px-5 py-3 bg-secondary/60 hover:bg-primary/20 border border-primary/20 hover:border-primary/40 rounded-xl text-foreground/80 hover:text-primary transition-all duration-300"
            >
              <span className="text-primary/60 mr-2">{index + 1}.</span>
              {choice.text}
            </button>
          ))}
        </div>
      )}
      
      {isComplete && !choices && (
        <div className="mt-4 flex justify-end">
          <span className="text-xs text-muted-foreground animate-pulse">
            点击继续...
          </span>
        </div>
      )}
    </div>
  )
}
