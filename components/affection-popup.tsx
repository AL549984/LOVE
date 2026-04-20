"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface AffectionPopupProps {
  isVisible: boolean
  value: number
  className?: string
}

export function AffectionPopup({ isVisible, value, className }: AffectionPopupProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.8 }}
          transition={{ 
            duration: 0.5,
            ease: [0.34, 1.56, 0.64, 1]
          }}
          className={cn(
            "fixed top-24 right-6 z-50 flex items-center gap-2",
            "px-4 py-2 rounded-full",
            "bg-gradient-to-r from-primary/30 to-accent/30",
            "backdrop-blur-md border border-primary/40",
            "shadow-lg shadow-primary/20",
            className
          )}
        >
          {/* 跳动的爱心 */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1, 1.2, 1],
            }}
            transition={{
              duration: 0.8,
              times: [0, 0.2, 0.4, 0.6, 1],
              ease: "easeInOut"
            }}
          >
            <Heart className="w-5 h-5 text-primary fill-primary" />
          </motion.div>
          
          {/* 数值文字 */}
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-primary font-bold text-sm"
          >
            +{value}
          </motion.span>
          
          {/* 小爱心粒子效果 */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                opacity: 1, 
                scale: 0,
                x: 0,
                y: 0
              }}
              animate={{ 
                opacity: 0, 
                scale: 1,
                x: (Math.random() - 0.5) * 60,
                y: -30 - Math.random() * 40
              }}
              transition={{ 
                duration: 1,
                delay: 0.1 + i * 0.1,
                ease: "easeOut"
              }}
              className="absolute left-1/2 top-1/2"
            >
              <Heart className="w-3 h-3 text-primary/60 fill-primary/60" />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
