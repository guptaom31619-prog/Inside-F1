"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { RichText } from "./RichText";
import { YearSelector } from "./YearSelector";
import { fetchConstructorStandings, type ConstructorStanding } from "@/services/f1Api";
import { TEAM_OVERVIEW, TEAM_FACTS } from "@/data/f1Content";

const CURRENT_YEAR = new Date().getFullYear();

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

function TeamsChapterInner() {
  const [year, setYear] = useState(CURRENT_YEAR);
  const [teams, setTeams] = useState<ConstructorStanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadStandings = useCallback((y: number) => {
    setLoading(true);
    setError(false);
    fetchConstructorStandings(y)
      .then((data) => {
        setTeams(data);
        if (!data.length) setError(true);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadStandings(year); }, [year, loadStandings]);

  const maxPoints = teams[0]?.points || 1;

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
          THE <span className="text-accent">TEAMS</span>
        </h2>
        <p className="text-sm sm:text-base font-body text-white/60 max-w-2xl mx-auto leading-relaxed">
          10 constructors, <strong className="text-white/90">thousands of engineers</strong>, and
          billions of dollars. The teams are the backbone of Formula 1.
        </p>
      </motion.div>

      {/* Stat cards */}
      <motion.div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3" variants={stagger}>
        {TEAM_FACTS.map((s) => (
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
        <span className="text-[10px] font-body tracking-[0.25em] uppercase text-white/40">How Teams Work</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
      </div>

      {/* Educational blocks */}
      <motion.div className="grid sm:grid-cols-2 gap-3 sm:gap-4" variants={stagger}>
        {TEAM_OVERVIEW.map((block) => (
          <motion.div
            key={block.title}
            className="group p-4 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] active:bg-white/[0.06] hover:border-white/[0.14] transition-all duration-300"
            variants={fadeUp}
          >
            <h4 className="font-display text-base tracking-wide text-white mb-2 sm:mb-3 group-hover:text-accent transition-colors">
              {block.title}
            </h4>
            <RichText text={block.body} className="text-[13px] font-body text-white/60 leading-[1.8] sm:leading-[1.85]" />
          </motion.div>
        ))}
      </motion.div>

      {/* Divider + Year Selector */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
        <YearSelector year={year} onChange={setYear} />
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
      </div>

      {/* Constructor standings */}
      {loading ? (
        <div className="flex flex-col items-center gap-3 py-12">
          <div className="w-6 h-6 border-2 border-accent/40 border-t-accent rounded-full animate-spin" />
          <span className="text-xs font-body text-white/40 tracking-wider">Loading standings...</span>
        </div>
      ) : error ? (
        <motion.div className="text-center py-10" variants={fadeUp}>
          <p className="text-sm font-body text-white/50 mb-3">
            Constructor standings not yet available for {year}.
          </p>
          <button
            type="button"
            onClick={() => loadStandings(year)}
            className="text-xs font-body tracking-wider uppercase text-accent/80 hover:text-accent transition-colors"
          >
            Try again
          </button>
        </motion.div>
      ) : (
        <motion.div className="space-y-2.5" variants={stagger}>
          {teams.slice(0, 10).map((t, i) => {
            const teamColor = `#${t.colour}`;
            const barWidth = Math.max(8, (t.points / maxPoints) * 100);
            const isTop3 = i < 3;

            return (
              <motion.div
                key={`${year}-${t.name}`}
                className="group flex items-center gap-2.5 sm:gap-4 p-3 sm:p-4 rounded-xl border hover:bg-white/[0.06] active:bg-white/[0.06] transition-all duration-300"
                variants={fadeUp}
                whileTap={{ scale: 0.99 }}
                style={{
                  background: isTop3 ? `linear-gradient(90deg, ${teamColor}0d, transparent)` : "rgba(255,255,255,0.03)",
                  borderColor: isTop3 ? `${teamColor}30` : "rgba(255,255,255,0.06)",
                }}
              >
                <span
                  className="w-6 sm:w-8 text-right font-display text-base sm:text-xl tabular-nums font-bold flex-shrink-0"
                  style={{ color: isTop3 ? teamColor : "rgba(255,255,255,0.3)" }}
                >
                  {t.position}
                </span>
                <div className="w-1 sm:w-1.5 h-8 sm:h-10 rounded-full flex-shrink-0" style={{ background: teamColor }} />
                <div className="flex-1 min-w-0">
                  <p className="font-display text-xs sm:text-sm text-white tracking-wide truncate group-hover:text-white transition-colors">
                    {t.name}
                  </p>
                  <p className="text-[11px] sm:text-xs text-white/45 font-body truncate mt-0.5">{t.drivers.join("  /  ")}</p>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                  <div className="w-16 sm:w-28 h-2 sm:h-2.5 rounded-full bg-white/[0.06] overflow-hidden hidden sm:block">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${teamColor}, ${teamColor}99)` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${barWidth}%` }}
                      transition={{ duration: 0.8, delay: 0.2 + i * 0.05, ease: [0.22, 1, 0.36, 1] as const }}
                    />
                  </div>
                  <span className="font-display text-sm sm:text-lg tabular-nums font-bold min-w-[40px] sm:min-w-[52px] text-right" style={{ color: teamColor }}>
                    {t.points}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );
}

export const TeamsChapter = memo(TeamsChapterInner);
