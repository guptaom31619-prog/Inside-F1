"use client";

import { motion } from "framer-motion";

interface NavigationProps {
  onHomeClick?: () => void;
  showHome?: boolean;
}

export function Navigation({ onHomeClick, showHome }: NavigationProps) {
  return (
    <motion.nav
      className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-5 md:px-8 md:py-6 pt-safe pointer-events-none"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="flex items-center gap-2.5 sm:gap-3">
        <div className="w-1 h-4 sm:h-5 bg-accent rounded-full" />
        <span className="font-display text-sm sm:text-base tracking-[0.15em] text-white">
          INSIDE F1
        </span>
      </div>

      {showHome && onHomeClick && (
        <motion.button
          type="button"
          onClick={onHomeClick}
          className="pointer-events-auto flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2 min-h-[44px] rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm text-white/50 hover:text-white active:text-white hover:bg-white/[0.08] active:bg-white/[0.08] hover:border-white/20 transition-all duration-300"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          whileTap={{ scale: 0.97 }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="font-body text-[10px] sm:text-[11px] tracking-[0.15em] uppercase">Home</span>
        </motion.button>
      )}
    </motion.nav>
  );
}
