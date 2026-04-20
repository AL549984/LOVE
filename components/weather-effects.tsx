"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface WeatherEffectsProps {
  weather?: "clear" | "rain" | "storm" | "snow"
  className?: string
}

export function WeatherEffects({ weather, className }: WeatherEffectsProps) {
  if (!weather || weather === "clear") return null
  
  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden z-10", className)}>
      {/* 雨天效果 */}
      {(weather === "rain" || weather === "storm") && (
        <>
          {/* 雨滴 */}
          {[...Array(weather === "storm" ? 80 : 40)].map((_, i) => (
            <motion.div
              key={`rain-${i}`}
              className="absolute w-0.5 bg-gradient-to-b from-transparent via-slate-400/40 to-slate-400/60"
              style={{
                left: `${Math.random() * 100}%`,
                height: `${20 + Math.random() * 30}px`,
                animationDelay: `${Math.random() * 2}s`
              }}
              animate={{
                y: ["0vh", "110vh"],
                opacity: [0, 0.6, 0.6, 0]
              }}
              transition={{
                duration: weather === "storm" ? 0.4 + Math.random() * 0.3 : 0.6 + Math.random() * 0.4,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 2
              }}
            />
          ))}
          
          {/* 暴风雨闪电效果 */}
          {weather === "storm" && (
            <motion.div
              className="absolute inset-0 bg-white/20"
              animate={{
                opacity: [0, 0, 0, 0.8, 0, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                times: [0, 0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 1]
              }}
            />
          )}
          
          {/* 雨天雾气效果 */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-500/5 to-slate-700/10" />
        </>
      )}
      
      {/* 雪天效果 */}
      {weather === "snow" && (
        <>
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={`snow-${i}`}
              className="absolute w-2 h-2 rounded-full bg-white/70"
              style={{
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: ["0vh", "110vh"],
                x: [0, Math.random() > 0.5 ? 30 : -30, 0],
                opacity: [0, 0.8, 0.8, 0]
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5
              }}
            />
          ))}
        </>
      )}
    </div>
  )
}
