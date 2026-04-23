"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Music } from "lucide-react"
import { useState } from "react"

const actLyrics: Record<number, string[]> = {
  1: [
    "自动门 铃声打碎了凌晨两点",
    "货架前 你眼波流转 像深邃的荒原",
    "你俯身 准备好 抛出致命的红线",
    "我却只 盯着你 苍白如纸的侧脸",
    "",
    "\"别闹了，先把这杯温牛奶喝完\"",
    "我蹲下 替你系好 散落的鞋带尖",
    "没看见 你的眼里 闪过一丝 荒诞的震撼",
    "在这个 浑浊世界 撞见 灵魂的初见",
  ],
  2: [
    "生煎包的白气 氤氲了冬日长街",
    "两小时的等待 只为换你 眉眼的一弯月",
    "你问我 什么是永远 我只会说 递牛奶的直觉",
    "阳台的雪 落进 谁精心布置的 猎杀情节",
    "",
    "你轻声说\"赌一把\" 输赢却 不必再写",
    "眼镜摘下的瞬间 呼吸 终于 发生了重叠",
    "没有 蛊惑的魔力 只有 剧烈的心跳声 决堤荒野",
    "\"你不是 谁的白月光 却是我 唯一的 太阳宫殿\"",
  ],
  3: [
    "白色的病历单 在口袋里 揉成了 废铁",
    "指甲掐进掌心 替我 吞下 灵魂的呜咽",
    "我牵着 陌生的手 站在你 必经的 台阶",
    "吐出 最脏的词汇 亲手 撕毁 我们的 契约",
    "",
    "\"玩腻了\"\"快滚吧\" 每一个字 都在滴血",
    "你看向我的眼神 像星辰 一颗颗 熄灭",
    "这是 逃不掉的 宿命 选哪一个 都是 永别",
    "我必须 做个混蛋 才能 让你 走得 坚决",
  ],
  4: [
    "褪去 华丽的伪装 换上 寂静的黑裙",
    "日记本 枯萎的字迹 揭穿了 最后的 迷信",
    "\"如果可以 骗她一辈子 让我 做唯一的 罪人\"",
    "墓碑上的 傻笑 还在 嘲讽 命运的 不公允",
    "",
    "冷掉的牛奶 放在 冰凉的 石碑中心",
    "你真是 世界上 最笨 最蠢 最烂的 骗子身影",
    "你赢了 我再也 没法看向 别人 那些 凡庸的风景",
    "我带着 你的温度 在这 人间 孤身 远行",
  ],
}

const moodColors = {
  warm: {
    bg: "bg-card/40",
    border: "border-primary/20",
    title: "text-primary",
    text: "text-foreground/60",
    icon: "text-primary/60",
    highlight: "text-foreground/80",
    scrollbar: "scrollbar-thumb-primary/20",
  },
  cold: {
    bg: "bg-slate-900/40",
    border: "border-slate-500/20",
    title: "text-slate-300",
    text: "text-slate-400/60",
    icon: "text-slate-400/60",
    highlight: "text-slate-300/80",
    scrollbar: "scrollbar-thumb-slate-500/20",
  },
  dark: {
    bg: "bg-slate-900/50",
    border: "border-slate-600/20",
    title: "text-slate-300",
    text: "text-slate-500/60",
    icon: "text-slate-500/60",
    highlight: "text-slate-400/80",
    scrollbar: "scrollbar-thumb-slate-600/20",
  },
  grief: {
    bg: "bg-slate-800/40",
    border: "border-slate-500/20",
    title: "text-slate-300",
    text: "text-slate-400/60",
    icon: "text-slate-400/60",
    highlight: "text-slate-300/80",
    scrollbar: "scrollbar-thumb-slate-500/20",
  },
}

interface LyricsSidebarProps {
  act: number
  mood?: "warm" | "cold" | "dark" | "grief"
}

export function LyricsSidebar({ act, mood = "warm" }: LyricsSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const lyrics = actLyrics[act] || []
  const colors = moodColors[mood]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={act}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 30 }}
        transition={{ duration: 0.6 }}
        className={`absolute top-24 right-6 z-10 w-56 backdrop-blur-md rounded-2xl border ${colors.bg} ${colors.border} overflow-hidden`}
      >
        {/* 标题栏 */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`w-full flex items-center gap-2 px-4 py-3 border-b ${colors.border} hover:bg-white/5 transition-colors cursor-pointer`}
        >
          <Music className={`w-3.5 h-3.5 ${colors.icon}`} />
          <span className={`text-xs font-medium ${colors.title} tracking-wide`}>
            第{["一", "二", "三", "四"][act - 1]}幕 · 歌词
          </span>
          <motion.span
            animate={{ rotate: collapsed ? -90 : 0 }}
            className={`ml-auto text-xs ${colors.icon}`}
          >
            ▾
          </motion.span>
        </button>

        {/* 歌词内容 */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <motion.div
                className="px-4 py-3 max-h-[60vh] overflow-y-auto space-y-1.5 scrollbar-thin"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      delayChildren: 0.5,
                      staggerChildren: 3,
                    },
                  },
                }}
              >
                {lyrics.map((line, i) =>
                  line === "" ? (
                    <motion.div
                      key={i}
                      className="h-2"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                      }}
                    />
                  ) : (
                    <motion.p
                      key={`${act}-${i}`}
                      variants={{
                        hidden: { opacity: 0, y: 8 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`text-xs leading-relaxed font-serif ${
                        line.startsWith('"') || line.startsWith('"')
                          ? colors.highlight
                          : colors.text
                      }`}
                    >
                      {line}
                    </motion.p>
                  )
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}
