"use client";

import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";

const MIN_DISPLAY_MS = 1800;
const FADE_OUT_MS = 500;

const LOADING_TIPS = [
  "Loading 3D model…",
  "Preparing the paddock…",
  "Warming up the engine…",
  "Calculating aero forces…",
];

export function LoadingScreen() {
  const { active, progress } = useProgress();
  const [visible, setVisible] = useState(true);
  const [canHide, setCanHide] = useState(false);
  const [tip, setTip] = useState(LOADING_TIPS[0]);

  useEffect(() => {
    setTip(LOADING_TIPS[Math.floor(Math.random() * LOADING_TIPS.length)]);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setCanHide(true), MIN_DISPLAY_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!active && canHide) {
      const t = setTimeout(() => setVisible(false), FADE_OUT_MS);
      return () => clearTimeout(t);
    }
  }, [active, canHide]);

  if (!visible) return null;

  const displayProgress = Math.min(100, Math.round(progress));
  const isDone = !active && canHide;

  return (
    <AnimatePresence>
      {!isDone ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="w-full max-w-xs px-8 flex flex-col items-center">
            <div className="flex items-center gap-2.5 mb-10">
              <div className="w-1 h-6 bg-accent rounded-full" />
              <h2 className="font-display text-xl tracking-[0.15em] text-white">
                INSIDE F1
              </h2>
            </div>

            <div className="w-full h-[2px] overflow-hidden rounded-full bg-white/[0.06] mb-4">
              <motion.div
                className="h-full bg-accent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${displayProgress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            <div className="flex items-center justify-between w-full">
              <p className="font-body text-[10px] tracking-wider text-white/20">
                {tip}
              </p>
              <p className="font-body text-[10px] tracking-[0.25em] tabular-nums text-white/30">
                {displayProgress}%
              </p>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
