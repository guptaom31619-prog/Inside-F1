"use client";

import { motion } from "framer-motion";
import { useChapter } from "@/contexts/ChapterContext";
import { chapters } from "@/data/chapters";

export function ChapterOverlay() {
  const { chapterIndex, goToChapterIndex } = useChapter();

  return (
    <motion.div
      className="pointer-events-auto max-w-[calc(100vw-2rem)]"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center gap-1 rounded-full bg-black/50 backdrop-blur-2xl border border-white/[0.10] p-1 shadow-2xl overflow-x-auto scrollbar-hide">
        {chapters.map((ch, i) => {
          const isActive = i === chapterIndex;
          return (
            <motion.button
              key={ch.id}
              type="button"
              onClick={() => goToChapterIndex(i)}
              className={`relative flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 min-h-[40px] rounded-full text-[11px] sm:text-xs font-body tracking-wider transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                isActive
                  ? "bg-white/[0.12] text-white shadow-lg"
                  : "text-white/50 hover:text-white/80 active:text-white/80 hover:bg-white/[0.06] active:bg-white/[0.06]"
              }`}
              whileTap={{ scale: 0.96 }}
            >
              <span
                className={`font-display text-[10px] transition-colors duration-300 ${
                  isActive ? "text-accent" : "text-white/35"
                }`}
              >
                {ch.number}
              </span>
              <span className="hidden md:inline">{ch.title}</span>
              <span className="md:hidden">{ch.title.split(" ").slice(0, 2).join(" ")}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
