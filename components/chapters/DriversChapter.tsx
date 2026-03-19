"use client";

import { useState, useEffect, useCallback, useRef, memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { RichText } from "./RichText";
import { YearSelector } from "./YearSelector";
import { fetchDriverStandings, type DriverStanding } from "@/services/f1Api";
import { DRIVER_OVERVIEW, DRIVER_FACTS } from "@/data/f1Content";

const CURRENT_YEAR = new Date().getFullYear();
const PODIUM_COLORS = ["#FFD700", "#C0C0C0", "#CD7F32"];

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

function DriversChapterInner() {
  const [year, setYear] = useState(CURRENT_YEAR);
  const [standings, setStandings] = useState<DriverStanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const imgFallbacks = useRef<Set<string>>(new Set());

  const loadStandings = useCallback((y: number) => {
    setLoading(true);
    setError(false);
    fetchDriverStandings(y)
      .then((data) => {
        setStandings(data);
        if (!data.length) setError(true);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadStandings(year); }, [year, loadStandings]);

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
          THE <span className="text-accent">DRIVERS</span>
        </h2>
        <p className="text-sm sm:text-base font-body text-white/60 max-w-2xl mx-auto leading-relaxed">
          20 of the most <strong className="text-white/90">elite athletes</strong> on the planet.
          What it takes to race and who&apos;s on the grid.
        </p>
      </motion.div>

      {/* Stat cards */}
      <motion.div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3" variants={stagger}>
        {DRIVER_FACTS.map((s) => (
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
        <span className="text-[10px] font-body tracking-[0.25em] uppercase text-white/40">What it Takes</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
      </div>

      {/* Educational blocks */}
      <motion.div className="space-y-3 sm:space-y-4" variants={stagger}>
        {DRIVER_OVERVIEW.map((block) => (
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

      {/* Divider + Year Selector */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
        <YearSelector year={year} onChange={setYear} />
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
      </div>

      {/* Live standings */}
      {loading ? (
        <div className="flex flex-col items-center gap-3 py-12">
          <div className="w-6 h-6 border-2 border-accent/40 border-t-accent rounded-full animate-spin" />
          <span className="text-xs font-body text-white/40 tracking-wider">Loading standings...</span>
        </div>
      ) : error ? (
        <motion.div className="text-center py-10" variants={fadeUp}>
          <p className="text-sm font-body text-white/50 mb-3">
            Standings data not yet available for {year}.
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
        <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3" variants={stagger}>
          {standings.slice(0, 20).map((s) => {
            const isPodium = s.position <= 3;
            const podiumColor = isPodium ? PODIUM_COLORS[s.position - 1] : undefined;
            const teamColor = `#${s.driver.team_colour}`;

            return (
              <motion.div
                key={`${year}-${s.driver.name_acronym}`}
                className="group rounded-2xl bg-white/[0.04] border overflow-hidden hover:border-white/[0.18] hover:bg-white/[0.07] transition-all duration-300"
                variants={fadeUp}
                whileHover={{ y: -3 }}
                style={{ borderColor: isPodium ? `${podiumColor}50` : "rgba(255,255,255,0.08)" }}
              >
                <div className="h-1 w-full" style={{ background: teamColor }} />
                <div className="p-3 sm:p-4 flex flex-col items-center gap-2">
                  <span
                    className="font-display text-lg sm:text-xl tabular-nums font-bold"
                    style={{ color: podiumColor ?? "rgba(255,255,255,0.35)" }}
                  >
                    P{s.position}
                  </span>
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden ring-2 ring-white/15">
                    <Image
                      src={
                        imgFallbacks.current.has(s.driver.name_acronym)
                          ? `https://ui-avatars.com/api/?name=${encodeURIComponent(s.driver.full_name)}&background=333&color=fff&size=80`
                          : s.driver.headshot_url
                      }
                      alt={s.driver.full_name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 48px, 56px"
                      unoptimized
                      loading="lazy"
                      onError={(e) => {
                        if (!imgFallbacks.current.has(s.driver.name_acronym)) {
                          imgFallbacks.current.add(s.driver.name_acronym);
                          const target = e.currentTarget;
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(s.driver.full_name)}&background=333&color=fff&size=80`;
                        }
                      }}
                    />
                  </div>
                  <div className="text-center">
                    <p className="font-display text-xs text-white tracking-wide">
                      {s.driver.last_name.toUpperCase()}
                    </p>
                    <p className="text-[10px] text-white/45 font-body mt-0.5">{s.driver.team_name}</p>
                  </div>
                  <div className="flex items-center gap-1.5 mt-auto">
                    <span className="font-display text-base tabular-nums font-bold" style={{ color: teamColor }}>
                      {s.points}
                    </span>
                    <span className="text-[9px] text-white/35 uppercase font-body">pts</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );
}

export const DriversChapter = memo(DriversChapterInner);
