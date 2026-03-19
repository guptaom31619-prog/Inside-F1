"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Chapter } from "@/data/chapters";
import { chapters } from "@/data/chapters";
import { goToChapter } from "@/utils/cameraControls";

interface ChapterContextValue {
  currentChapter: Chapter;
  chapterIndex: number;
  isFirst: boolean;
  isLast: boolean;
  nextChapter: () => void;
  prevChapter: () => void;
  goToChapterIndex: (index: number) => void;
}

const ChapterContext = createContext<ChapterContextValue | null>(null);

export function ChapterProvider({ children }: { children: ReactNode }) {
  const [chapterIndex, setChapterIndex] = useState(0);
  const currentChapter = chapters[chapterIndex];

  const nextChapter = useCallback(() => {
    if (chapterIndex < chapters.length - 1) {
      const next = chapterIndex + 1;
      setChapterIndex(next);
      goToChapter(chapters[next]);
    }
  }, [chapterIndex]);

  const prevChapter = useCallback(() => {
    if (chapterIndex > 0) {
      const prev = chapterIndex - 1;
      setChapterIndex(prev);
      goToChapter(chapters[prev]);
    }
  }, [chapterIndex]);

  const goToChapterIndex = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, chapters.length - 1));
    setChapterIndex(clamped);
    goToChapter(chapters[clamped]);
  }, []);

  const value: ChapterContextValue = {
    currentChapter,
    chapterIndex,
    isFirst: chapterIndex === 0,
    isLast: chapterIndex === chapters.length - 1,
    nextChapter,
    prevChapter,
    goToChapterIndex,
  };

  return (
    <ChapterContext.Provider value={value}>{children}</ChapterContext.Provider>
  );
}

export function useChapter(): ChapterContextValue {
  const context = useContext(ChapterContext);
  if (!context) {
    throw new Error("useChapter must be used within ChapterProvider");
  }
  return context;
}
