"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CURRENT_YEAR = new Date().getFullYear();
const START_YEAR = 2000;
const YEARS = Array.from({ length: CURRENT_YEAR - START_YEAR + 1 }, (_, i) => CURRENT_YEAR - i);

interface YearSelectorProps {
  year: number;
  onChange: (year: number) => void;
}

export function YearSelector({ year, onChange }: YearSelectorProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, []);

  return (
    <div ref={ref} className="relative inline-flex">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2.5 sm:px-5 min-h-[44px] rounded-full bg-white/[0.05] border border-white/[0.10] hover:bg-white/[0.08] active:bg-white/[0.08] hover:border-white/[0.16] transition-all"
      >
        <span className="font-display text-sm sm:text-base text-accent tracking-wider">{year}</span>
        <span className="text-[10px] font-body text-white/45 tracking-wider uppercase">Season</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className={`text-white/40 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 z-50 w-60 sm:w-64 max-h-56 overflow-y-auto rounded-xl bg-[#0c0c0c]/95 backdrop-blur-2xl border border-white/[0.10] shadow-2xl p-2 scrollbar-thin"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
          >
            <div className="grid grid-cols-4 gap-1">
              {YEARS.map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => {
                    onChange(y);
                    setOpen(false);
                  }}
                  className={`px-2 py-2.5 sm:py-2 min-h-[40px] rounded-lg text-xs font-body tabular-nums transition-all ${
                    y === year
                      ? "bg-accent/20 text-accent border border-accent/30 font-semibold"
                      : "text-white/55 hover:bg-white/[0.08] active:bg-white/[0.08] hover:text-white/80 active:text-white/80 border border-transparent"
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
