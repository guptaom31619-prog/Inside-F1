"use client";

import { lazy, Suspense, memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useChapter } from "@/contexts/ChapterContext";

const WhatIsF1 = lazy(() =>
  import("./WhatIsF1").then((m) => ({ default: m.WhatIsF1 }))
);
const DriversChapter = lazy(() =>
  import("./DriversChapter").then((m) => ({ default: m.DriversChapter }))
);
const TeamsChapter = lazy(() =>
  import("./TeamsChapter").then((m) => ({ default: m.TeamsChapter }))
);
const RaceWeekendChapter = lazy(() =>
  import("./RaceWeekendChapter").then((m) => ({ default: m.RaceWeekendChapter }))
);

const CHAPTER_MAP: Record<string, React.LazyExoticComponent<React.FC>> = {
  "what-is-f1": WhatIsF1,
  drivers: DriversChapter,
  teams: TeamsChapter,
  "race-weekend": RaceWeekendChapter,
};

function ChapterFallback() {
  return (
    <div className="flex items-center justify-center h-full pt-32">
      <div className="w-5 h-5 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
    </div>
  );
}

function ChapterContentInner() {
  const { currentChapter } = useChapter();
  const Component = CHAPTER_MAP[currentChapter.id];

  if (!Component) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentChapter.id}
        className="absolute inset-0 top-20 sm:top-24 md:top-28 bottom-0 z-15 pointer-events-auto overflow-y-auto scrollbar-thin scroll-smooth-touch"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Suspense fallback={<ChapterFallback />}>
          <Component />
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export const ChapterContent = memo(ChapterContentInner);
