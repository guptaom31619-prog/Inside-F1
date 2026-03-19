"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { CarPart } from "@/data/carParts";

interface InfoPanelProps {
  part: CarPart | null;
  onClose?: () => void;
}

export function InfoPanel({ part, onClose }: InfoPanelProps) {
  return (
    <AnimatePresence mode="wait">
      {part && (
        <>
          {/* Desktop — right panel */}
          <motion.div
            key={`desktop-${part.id}`}
            className="hidden md:block fixed right-3 top-24 bottom-16 w-80 lg:w-96 z-40 pointer-events-auto"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-full flex flex-col rounded-2xl bg-black/60 backdrop-blur-2xl border border-white/[0.10] shadow-2xl overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-accent via-accent/60 to-transparent flex-shrink-0" />
              <div className="flex items-start justify-between gap-3 p-5 pb-0">
                <div>
                  <span className="text-[10px] font-body tracking-[0.2em] uppercase text-accent/70 mb-1 block">
                    {part.category === "internal" ? "Internal Component" : "External Component"}
                  </span>
                  <h3 className="font-display text-xl tracking-wide text-white leading-tight">
                    {part.name}
                  </h3>
                </div>
                {onClose && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.10] transition-all duration-200 border border-white/[0.08] mt-0.5"
                    aria-label="Close"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              <div className="flex-1 overflow-y-auto scrollbar-thin p-5 pt-4">
                <p className="text-sm text-white/65 leading-[1.85] font-body">
                  {part.description}
                </p>
              </div>
              {onClose && (
                <div className="flex-shrink-0 p-4 pt-0">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-2.5 rounded-xl text-xs font-body tracking-[0.12em] uppercase text-white/60 bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.10] hover:text-white transition-all duration-200"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Mobile — bottom sheet */}
          <motion.div
            key={`mobile-${part.id}`}
            className="md:hidden fixed inset-x-0 bottom-0 z-50 pointer-events-auto"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="max-h-[55vh] flex flex-col rounded-t-2xl bg-[#0c0c0c]/95 backdrop-blur-2xl border-t border-white/[0.12] shadow-2xl overflow-hidden">
              <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>
              <div className="h-1 w-full bg-gradient-to-r from-accent via-accent/60 to-transparent flex-shrink-0" />
              <div className="flex items-start justify-between gap-3 px-5 pt-4 pb-0 flex-shrink-0">
                <div>
                  <span className="text-[10px] font-body tracking-[0.2em] uppercase text-accent/70 mb-1 block">
                    {part.category === "internal" ? "Internal Component" : "External Component"}
                  </span>
                  <h3 className="font-display text-lg tracking-wide text-white leading-tight">
                    {part.name}
                  </h3>
                </div>
                {onClose && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white/50 active:text-white active:bg-white/[0.10] transition-all duration-200 border border-white/[0.08]"
                    aria-label="Close"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              <div className="flex-1 overflow-y-auto scrollbar-thin p-5 pt-3 pb-safe">
                <p className="text-sm text-white/65 leading-[1.85] font-body">
                  {part.description}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
