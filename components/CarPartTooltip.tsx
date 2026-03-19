"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCarPart } from "@/contexts/CarPartContext";

export function CarPartTooltip() {
  const { hoveredPart } = useCarPart();

  return (
    <AnimatePresence>
      {hoveredPart && (
        <motion.div
          className="pointer-events-none fixed left-1/2 bottom-28 sm:bottom-24 -translate-x-1/2 z-50 hidden sm:block"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.15 }}
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] backdrop-blur-2xl border border-white/[0.1] shadow-lg">
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-xs font-body text-white/90 tracking-wide">
              {hoveredPart.name}
            </span>
            <span className="text-[9px] text-white/20 tracking-wider uppercase">
              {hoveredPart.category}
            </span>
            <span className="text-[9px] text-white/35 tracking-wider uppercase">
              Click
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
