"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// 每幕对应的 BGM 文件路径
const actBgmMap: Record<number, string> = {
  1: "/bgm/act1.mp3",
  2: "/bgm/act2.mp3",
  3: "/bgm/act3.mp3",
  4: "/bgm/act4.mp3",
}

interface BgmPlayerProps {
  act: number
  mood?: "warm" | "cold" | "dark" | "grief"
}

export function BgmPlayer({ act, mood = "warm" }: BgmPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const currentBgmRef = useRef<string>("")
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const targetVolume = 0.4

  // 淡出当前音频
  const fadeOut = useCallback((audio: HTMLAudioElement, onComplete: () => void) => {
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
    
    const step = audio.volume / 20 // 20 步完成淡出
    fadeIntervalRef.current = setInterval(() => {
      if (audio.volume > step) {
        audio.volume = Math.max(0, audio.volume - step)
      } else {
        audio.volume = 0
        audio.pause()
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
        onComplete()
      }
    }, 50) // 50ms * 20 = 1s 淡出
  }, [])

  // 淡入新音频
  const fadeIn = useCallback((audio: HTMLAudioElement) => {
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
    
    audio.volume = 0
    const step = targetVolume / 20
    fadeIntervalRef.current = setInterval(() => {
      if (audio.volume < targetVolume - step) {
        audio.volume = Math.min(targetVolume, audio.volume + step)
      } else {
        audio.volume = targetVolume
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
      }
    }, 50) // 50ms * 20 = 1s 淡入
  }, [])

  // 切换 BGM
  useEffect(() => {
    const bgmSrc = actBgmMap[act]
    if (!bgmSrc || bgmSrc === currentBgmRef.current) return
    if (!hasInteracted) return

    const switchBgm = () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
      }

      const audio = new Audio(bgmSrc)
      audio.loop = true
      audio.volume = 0
      audio.muted = isMuted
      audioRef.current = audio
      currentBgmRef.current = bgmSrc

      audio.play().then(() => {
        setIsPlaying(true)
        fadeIn(audio)
      }).catch(() => {
        // 自动播放被阻止时忽略
      })
    }

    if (audioRef.current && !audioRef.current.paused) {
      fadeOut(audioRef.current, switchBgm)
    } else {
      switchBgm()
    }
  }, [act, hasInteracted, isMuted, fadeIn, fadeOut])

  // 用户首次点击页面后开始播放
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true)
      }
    }
    
    document.addEventListener("click", handleFirstInteraction, { once: true })
    document.addEventListener("keydown", handleFirstInteraction, { once: true })
    
    return () => {
      document.removeEventListener("click", handleFirstInteraction)
      document.removeEventListener("keydown", handleFirstInteraction)
    }
  }, [hasInteracted])

  // 清理
  useEffect(() => {
    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
      }
    }
  }, [])

  // 静音切换
  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const newMuted = !prev
      if (audioRef.current) {
        audioRef.current.muted = newMuted
      }
      return newMuted
    })
  }, [])

  const isDark = mood === "cold" || mood === "dark" || mood === "grief"

  return (
    <motion.button
      onClick={toggleMute}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className={`fixed bottom-6 right-6 z-30 p-3 rounded-full backdrop-blur-sm border transition-colors ${
        isDark
          ? "bg-slate-900/60 border-slate-500/30 hover:bg-slate-800/70 text-slate-300"
          : "bg-card/60 border-primary/20 hover:bg-card/80 text-primary"
      }`}
      title={isMuted ? "取消静音" : "静音"}
    >
      <AnimatePresence mode="wait">
        {isMuted ? (
          <motion.div
            key="muted"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <VolumeX className="w-5 h-5" />
          </motion.div>
        ) : (
          <motion.div
            key="unmuted"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <Volume2 className="w-5 h-5" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
