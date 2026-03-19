"use client";

import { motion } from "framer-motion";

interface ToolItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
  activeColor?: string;
}

interface ToolBarProps {
  items: ToolItem[];
}

export function ToolBar({ items }: ToolBarProps) {
  return (
    <motion.div
      className="flex items-center gap-1.5 rounded-full bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] p-1.5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {items.map((item) => (
        <motion.button
          key={item.id}
          type="button"
          onClick={item.onClick}
          className={`relative group flex items-center justify-center w-11 h-11 sm:w-10 sm:h-10 rounded-full transition-all duration-300 ${
            item.active
              ? "bg-white/[0.12] text-white"
              : "text-white/50 hover:text-white/80 active:text-white/80 hover:bg-white/[0.06] active:bg-white/[0.06]"
          }`}
          style={
            item.active && item.activeColor
              ? { color: item.activeColor }
              : undefined
          }
          whileTap={{ scale: 0.92 }}
          aria-label={item.label}
        >
          {item.icon}
          <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-body tracking-wider uppercase text-white/70 bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 border border-white/[0.06] hidden sm:block">
            {item.label}
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
}

export function IconExplode() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L12 6M12 18L12 22M2 12L6 12M18 12L22 12" />
      <path d="M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function IconAirflow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2" />
      <path d="M12.59 19.41A2 2 0 1 0 14 16H2" />
      <path d="M17.73 7.73A2.5 2.5 0 1 1 19.5 12H2" />
    </svg>
  );
}

export function IconDRS() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 18V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1" />
      <path d="M4 18h16" />
      <path d="M20 7l-3 4h3l-3 4" />
    </svg>
  );
}
