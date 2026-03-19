"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { RichText } from "./RichText";
import {
  F1_HERO_STATS,
  F1_OVERVIEW,
  POINTS_SYSTEM,
  F1_KEY_CONCEPTS,
} from "@/data/f1Content";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

function WhatIsF1Inner() {
  return (
    <motion.div
      className="flex flex-col gap-10 sm:gap-14 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10 pb-28 sm:pb-24"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      {/* Hero */}
      <motion.div className="text-center" variants={fadeUp}>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight text-white mb-5 leading-[0.95]">
          WHAT IS <span className="text-accent">FORMULA 1</span>
        </h2>
        <p className="text-sm sm:text-base font-body text-white/60 max-w-2xl mx-auto leading-relaxed">
          The world&apos;s fastest, most technologically advanced, and most-watched motorsport.
          Here&apos;s <strong className="text-white/90">everything you need to know</strong>.
        </p>
      </motion.div>

      {/* Stats strip */}
      <motion.div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3" variants={stagger}>
        {F1_HERO_STATS.map((s) => (
          <motion.div
            key={s.label}
            className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-accent/30 active:border-accent/30 hover:bg-white/[0.07] active:bg-white/[0.07] transition-all duration-300"
            variants={fadeUp}
            whileTap={{ scale: 0.97 }}
          >
            <span className="font-display text-xl sm:text-2xl md:text-3xl text-white">{s.value}</span>
            <span className="text-[9px] sm:text-[10px] font-body tracking-[0.12em] uppercase text-white/50 mt-1 sm:mt-1.5 text-center leading-tight">
              {s.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
        <span className="text-[10px] font-body tracking-[0.25em] uppercase text-white/40">Overview</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
      </div>

      {/* Overview blocks */}
      <motion.div className="space-y-3 sm:space-y-4" variants={stagger}>
        {F1_OVERVIEW.map((block) => (
          <motion.div
            key={block.title}
            className="group p-4 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] active:bg-white/[0.06] hover:border-white/[0.14] transition-all duration-300"
            variants={fadeUp}
          >
            <h4 className="font-display text-base sm:text-lg tracking-wide text-white mb-2 sm:mb-3 group-hover:text-accent transition-colors">
              {block.title}
            </h4>
            <RichText text={block.body} className="text-[13px] sm:text-sm font-body text-white/60 leading-[1.8] sm:leading-[1.85]" />
          </motion.div>
        ))}
      </motion.div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
        <span className="text-[10px] font-body tracking-[0.25em] uppercase text-white/40">Points System</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
      </div>

      {/* Points system */}
      <motion.div variants={fadeUp}>
        <motion.p className="text-sm font-body text-white/60 mb-8 text-center leading-relaxed" variants={fadeUp}>
          Points are awarded to the <strong className="text-white/90">top 10 finishers</strong> of every Grand Prix.
        </motion.p>
        <motion.div className="flex items-end justify-center gap-1.5 sm:gap-2 md:gap-3 overflow-x-auto scrollbar-hide px-2" variants={stagger}>
          {POINTS_SYSTEM.map((p, i) => {
            const height = Math.max(28, (p.points / 25) * 100);
            const isTop3 = i < 3;
            const podiumColors = ["#FFD700", "#C0C0C0", "#CD7F32"];
            return (
              <motion.div
                key={p.position}
                className="flex flex-col items-center gap-1.5 sm:gap-2 flex-shrink-0"
                variants={fadeUp}
              >
                <span className="font-display text-xs sm:text-sm md:text-base tabular-nums font-bold" style={{ color: isTop3 ? podiumColors[i] : "rgba(255,255,255,0.6)" }}>
                  {p.points}
                </span>
                <motion.div
                  className="w-7 sm:w-9 md:w-14 rounded-t-xl"
                  style={{
                    height,
                    background: isTop3
                      ? `linear-gradient(to top, ${podiumColors[i]}55, ${podiumColors[i]}22)`
                      : "linear-gradient(to top, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
                    border: `1px solid ${isTop3 ? podiumColors[i] + "44" : "rgba(255,255,255,0.08)"}`,
                    borderBottom: "none",
                  }}
                  initial={{ height: 0 }}
                  animate={{ height }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] as const }}
                />
                <span className="text-[11px] font-body text-white/50 tabular-nums">{p.position}</span>
              </motion.div>
            );
          })}
        </motion.div>
        <motion.p className="text-xs font-body text-white/40 mt-6 text-center leading-relaxed" variants={fadeUp}>
          +1 bonus point for the <strong className="text-white/60">fastest lap</strong> (if in top 10). Sprint races: 8-7-6-5-4-3-2-1.
        </motion.p>
      </motion.div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
        <span className="text-[10px] font-body tracking-[0.25em] uppercase text-white/40">Key Concepts</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
      </div>

      {/* Key concepts */}
      <motion.div className="grid sm:grid-cols-2 gap-3 sm:gap-4" variants={stagger}>
        {F1_KEY_CONCEPTS.map((c) => (
          <motion.div
            key={c.title}
            className="group p-4 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] active:bg-white/[0.06] hover:border-white/[0.14] transition-all duration-300"
            variants={fadeUp}
            whileTap={{ scale: 0.99 }}
          >
            <h4 className="font-display text-base tracking-wide text-white mb-2 sm:mb-3 group-hover:text-accent transition-colors">
              {c.title}
            </h4>
            <RichText text={c.body} className="text-[13px] font-body text-white/60 leading-[1.8] sm:leading-[1.85]" />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export const WhatIsF1 = memo(WhatIsF1Inner);
