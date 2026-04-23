"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useMemo } from "react"

interface WeatherEffectsProps {
  weather?: "clear" | "rain" | "storm" | "snow"
  className?: string
}

// 确定性伪随机数生成，避免 SSR/CSR 不一致
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

export function WeatherEffects({ weather, className }: WeatherEffectsProps) {
  const rainDrops = useMemo(() => {
    const count = weather === "storm" ? 80 : 40
    return [...Array(count)].map((_, i) => ({
      left: `${seededRandom(i + 1) * 100}%`,
      height: `${20 + seededRandom(i + 100) * 30}px`,
      animationDelay: `${seededRandom(i + 200) * 2}s`,
      duration: weather === "storm"
        ? 0.4 + seededRandom(i + 300) * 0.3
        : 0.6 + seededRandom(i + 300) * 0.4,
      delay: seededRandom(i + 400) * 2
    }))
  }, [weather])

  const snowFlakes = useMemo(() => {
    return [...Array(50)].map((_, i) => ({
      left: `${seededRandom(i + 500) * 100}%`,
      xDir: seededRandom(i + 600) > 0.5 ? 30 : -30,
      duration: 4 + seededRandom(i + 700) * 3,
      delay: seededRandom(i + 800) * 5
    }))
  }, [])

  if (!weather || weather === "clear") return null
  
  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden z-10", className)}>
      {/* 雨天效果 */}
      {(weather === "rain" || weather === "storm") && (
        <>
          {/* 雨滴 */}
          {rainDrops.map((drop, i) => (
            <motion.div
              key={`rain-${i}`}
              className="absolute w-0.5 bg-gradient-to-b from-transparent via-slate-400/40 to-slate-400/60"
              style={{
                left: drop.left,
                height: drop.height,
                animationDelay: drop.animationDelay
              }}
              animate={{
                y: ["0vh", "110vh"],
                opacity: [0, 0.6, 0.6, 0]
              }}
              transition={{
                duration: drop.duration,
                repeat: Infinity,
                ease: "linear",
                delay: drop.delay
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
          {snowFlakes.map((flake, i) => (
            <motion.div
              key={`snow-${i}`}
              className="absolute w-2 h-2 rounded-full bg-white/70"
              style={{
                left: flake.left,
              }}
              animate={{
                y: ["0vh", "110vh"],
                x: [0, flake.xDir, 0],
                opacity: [0, 0.8, 0.8, 0]
              }}
              transition={{
                duration: flake.duration,
                repeat: Infinity,
                ease: "linear",
                delay: flake.delay
              }}
            />
          ))}
        </>
      )}
    </div>
  )
}
