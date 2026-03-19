"use client";

import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RichText } from "./RichText";
import { RACE_WEEKEND, RACE_STRATEGY, type RacePhase } from "@/data/f1Content";
import { F1_CIRCUITS } from "@/data/circuits";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const PHASE_LABELS: Record<RacePhase["icon"], string> = {
  practice: "P",
  qualifying: "Q",
  sprint: "S",
  race: "R",
  strategy: "St",
};

const PHASE_COLORS: Record<RacePhase["icon"], string> = {
  practice: "#00d4ff",
  qualifying: "#ff8800",
  sprint: "#a855f7",
  race: "#ff1e1e",
  strategy: "#22c55e",
};

function RaceWeekendChapterInner() {
  const [activePhase, setActivePhase] = useState(0);

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
          RACE <span className="text-accent">WEEKEND</span>
        </h2>
        <p className="text-sm sm:text-base font-body text-white/60 max-w-2xl mx-auto leading-relaxed">
          From Friday practice to Sunday&apos;s <strong className="text-white/90">chequered flag</strong>.
          Here&apos;s how a Grand Prix weekend unfolds.
        </p>
      </motion.div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
        <span className="text-[10px] font-body tracking-[0.25em] uppercase text-white/40">Schedule</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
      </div>

      {/* Timeline */}
      <motion.div variants={stagger}>
        <div className="grid sm:grid-cols-2 gap-3">
          {RACE_WEEKEND.map((phase, i) => {
            const isActive = i === activePhase;
            const phaseColor = PHASE_COLORS[phase.icon];
            return (
              <motion.button
                key={phase.day + phase.title}
                type="button"
                onClick={() => setActivePhase(i)}
                className="relative text-left p-4 sm:p-5 rounded-2xl border backdrop-blur-xl transition-all duration-300"
                style={{
                  background: isActive ? `linear-gradient(135deg, ${phaseColor}14, transparent)` : "rgba(255,255,255,0.03)",
                  borderColor: isActive ? `${phaseColor}50` : "rgba(255,255,255,0.07)",
                }}
                variants={fadeUp}
                whileTap={{ scale: 0.98 }}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="flex items-center justify-center w-9 h-9 rounded-full text-xs font-display font-bold"
                    style={{ background: `${phaseColor}35`, color: phaseColor }}
                  >
                    {PHASE_LABELS[phase.icon]}
                  </span>
                  <div>
                    <span
                      className="text-[10px] font-body tracking-[0.2em] uppercase block transition-colors"
                      style={{ color: isActive ? phaseColor : "rgba(255,255,255,0.40)" }}
                    >
                      {phase.day}
                    </span>
                    <h4
                      className="font-display text-base tracking-tight transition-colors"
                      style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.65)" }}
                    >
                      {phase.title}
                    </h4>
                  </div>
                </div>

                <div className="space-y-1.5 ml-10 sm:ml-12">
                  {phase.sessions.map((session) => (
                    <div key={session} className="flex items-start gap-2">
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[5px] transition-colors"
                        style={{ background: isActive ? phaseColor : "rgba(255,255,255,0.15)" }}
                      />
                      <span className="text-xs font-body text-white/55 leading-snug">{session}</span>
                    </div>
                  ))}
                </div>

                {isActive && (
                  <motion.div
                    className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
                    style={{ background: phaseColor }}
                    layoutId="phase-indicator"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Expanded description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePhase}
            className="mt-4 p-6 rounded-2xl border"
            style={{
              background: `linear-gradient(135deg, ${PHASE_COLORS[RACE_WEEKEND[activePhase].icon]}0d, transparent)`,
              borderColor: `${PHASE_COLORS[RACE_WEEKEND[activePhase].icon]}28`,
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <span
                className="flex items-center justify-center w-7 h-7 rounded-full text-[10px] font-display font-bold"
                style={{
                  background: `${PHASE_COLORS[RACE_WEEKEND[activePhase].icon]}35`,
                  color: PHASE_COLORS[RACE_WEEKEND[activePhase].icon],
                }}
              >
                {PHASE_LABELS[RACE_WEEKEND[activePhase].icon]}
              </span>
              <span className="font-display text-sm text-white">{RACE_WEEKEND[activePhase].title}</span>
            </div>
            <RichText
              text={RACE_WEEKEND[activePhase].description}
              className="text-sm font-body text-white/60 leading-[1.85]"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
        <span className="text-[10px] font-body tracking-[0.25em] uppercase text-white/40">Race Strategy</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
      </div>

      {/* Strategy heading */}
      <motion.div className="text-center -mb-8" variants={fadeUp}>
        <p className="text-sm font-body text-white/60 leading-relaxed">
          F1 is more than just driving fast — it&apos;s a <strong className="text-white/90">chess match at 300 km/h</strong>.
        </p>
      </motion.div>

      {/* Strategy cards */}
      <motion.div className="grid sm:grid-cols-2 gap-3 sm:gap-4" variants={stagger}>
        {RACE_STRATEGY.map((s) => (
          <motion.div
            key={s.title}
            className="group p-4 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] active:bg-white/[0.06] hover:border-white/[0.14] transition-all duration-300"
            variants={fadeUp}
            whileTap={{ scale: 0.99 }}
          >
            <h4 className="font-display text-base tracking-wide text-white mb-2 sm:mb-3 group-hover:text-accent transition-colors">
              {s.title}
            </h4>
            <RichText text={s.body} className="text-[13px] font-body text-white/60 leading-[1.8] sm:leading-[1.85]" />
          </motion.div>
        ))}
      </motion.div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
        <span className="text-[10px] font-body tracking-[0.25em] uppercase text-white/40">The Calendar</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
      </div>

      {/* Circuits heading */}
      <motion.div className="text-center -mb-8" variants={fadeUp}>
        <p className="text-sm font-body text-white/60 leading-relaxed">
          <strong className="text-white/90">{F1_CIRCUITS.length} races</strong> across{" "}
          <strong className="text-white/90">5 continents</strong> — the global F1 calendar.
        </p>
      </motion.div>

      {/* Circuit grid */}
      <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3" variants={stagger}>
        {F1_CIRCUITS.map((circuit, i) => (
          <motion.div
            key={circuit.name}
            className="group relative p-3 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.07] active:bg-white/[0.07] hover:border-white/[0.16] transition-all duration-300 flex flex-col"
            variants={fadeUp}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative w-full h-12 sm:h-16 mb-2 sm:mb-3 flex items-center justify-center opacity-30 group-hover:opacity-70 transition-opacity duration-300">
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={circuit.svgPath} className="text-accent" />
              </svg>
            </div>

            <div className="flex items-start gap-2.5 mb-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://flagcdn.com/w40/${circuit.countryCode}.png`}
                alt={circuit.country}
                width={20}
                height={15}
                className="flex-shrink-0 mt-0.5 rounded-[2px] object-cover"
                loading="lazy"
              />
              <div className="min-w-0">
                <p className="font-display text-xs text-white tracking-wide leading-tight truncate">
                  {circuit.city}
                </p>
                <p className="text-[10px] font-body text-white/40 mt-0.5 truncate">
                  {circuit.country}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-auto pt-2 border-t border-white/[0.06]">
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-display text-white/60 tabular-nums">{circuit.laps}</span>
                <span className="text-[8px] font-body text-white/35 uppercase">laps</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-display text-white/60 tabular-nums">{circuit.length}</span>
              </div>
            </div>

            <div className="absolute top-2 right-2.5 sm:top-2.5 sm:right-3 opacity-40 sm:opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[9px] font-display text-white/30 tabular-nums">R{i + 1}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export const RaceWeekendChapter = memo(RaceWeekendChapterInner);
