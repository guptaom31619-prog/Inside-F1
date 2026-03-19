"use client";

import { useMemo, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { carParts, type CarPart } from "@/data/carParts";
import { useCarPart } from "@/contexts/CarPartContext";
import { goToPart, goToOverview } from "@/utils/cameraControls";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.02, delayChildren: 0.1 } },
};
const fadeIn = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const } },
};

function PartsListSidebarInner() {
  const { selectedPart, selectPart, clearSelection } = useCarPart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const external = useMemo(() => carParts.filter((p) => p.category === "external"), []);
  const internal = useMemo(() => carParts.filter((p) => p.category === "internal"), []);

  const handlePartClick = (part: CarPart) => {
    if (selectedPart?.id === part.id) {
      clearSelection();
      goToOverview();
      return;
    }
    selectPart(part);
    goToPart(part);
    setMobileOpen(false);
  };

  const handleReset = () => {
    clearSelection();
    goToOverview();
  };

  const partsContent = (
    <>
      <div className="sticky top-0 z-10 bg-black/70 backdrop-blur-xl border-b border-white/[0.08] px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-display tracking-[0.18em] uppercase text-white/60">
            Car Parts
          </span>
          <div className="flex items-center gap-3">
            <AnimatePresence>
              {selectedPart && (
                <motion.button
                  type="button"
                  onClick={handleReset}
                  className="text-[10px] font-body tracking-wider uppercase text-accent/80 hover:text-accent active:text-accent transition-colors"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  Reset
                </motion.button>
              )}
            </AnimatePresence>
            <button
              type="button"
              className="md:hidden text-white/40 active:text-white/70 p-1"
              onClick={() => setMobileOpen(false)}
              aria-label="Close parts list"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="p-2 space-y-1">
        <div className="px-2 pt-2 pb-1">
          <span className="text-[9px] font-body tracking-[0.2em] uppercase text-white/35">
            External
          </span>
        </div>
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-0.5">
          {external.map((part) => (
            <PartItem
              key={part.id}
              part={part}
              isActive={selectedPart?.id === part.id}
              onClick={() => handlePartClick(part)}
            />
          ))}
        </motion.div>

        <div className="mx-2 my-2 h-px bg-white/[0.08]" />

        <div className="px-2 pt-1 pb-1">
          <span className="text-[9px] font-body tracking-[0.2em] uppercase text-white/35">
            Internal
          </span>
        </div>
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-0.5">
          {internal.map((part) => (
            <PartItem
              key={part.id}
              part={part}
              isActive={selectedPart?.id === part.id}
              onClick={() => handlePartClick(part)}
            />
          ))}
        </motion.div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <motion.div
        className="hidden md:flex absolute left-3 top-24 bottom-16 z-20 w-52 pointer-events-auto flex-col"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex-1 overflow-y-auto scrollbar-thin rounded-2xl bg-black/50 backdrop-blur-2xl border border-white/[0.10] shadow-2xl">
          {partsContent}
        </div>
      </motion.div>

      {/* Mobile toggle button */}
      <motion.button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed left-3 bottom-20 z-20 pointer-events-auto flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-full bg-black/60 backdrop-blur-2xl border border-white/[0.12] shadow-2xl text-white/60 active:text-white active:bg-white/[0.08] transition-all pb-safe"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open parts list"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <span className="text-[10px] font-body tracking-[0.15em] uppercase">Parts</span>
      </motion.button>

      {/* Mobile bottom drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="md:hidden fixed inset-0 z-40 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="md:hidden fixed bottom-0 left-0 right-0 z-50 pointer-events-auto max-h-[65vh] overflow-y-auto scrollbar-thin rounded-t-2xl bg-[#0c0c0c]/95 backdrop-blur-2xl border-t border-white/[0.12] shadow-2xl pb-safe"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>
              {partsContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

interface PartItemProps {
  part: CarPart;
  isActive: boolean;
  onClick: () => void;
}

function PartItem({ part, isActive, onClick }: PartItemProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-3 py-2.5 min-h-[44px] md:min-h-0 rounded-xl text-left transition-all duration-200 ${
        isActive
          ? "bg-accent/12 border border-accent/25"
          : "border border-transparent hover:bg-white/[0.06] active:bg-white/[0.06]"
      }`}
      variants={fadeIn}
      whileTap={{ scale: 0.97 }}
    >
      <div
        className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-200"
        style={{
          background: isActive ? "var(--accent)" : "rgba(255,255,255,0.25)",
        }}
      />
      <span
        className={`text-xs font-body tracking-wide transition-colors duration-200 truncate ${
          isActive ? "text-white" : "text-white/55"
        }`}
      >
        {part.name}
      </span>
    </motion.button>
  );
}

export const PartsListSidebar = memo(PartsListSidebarInner);
