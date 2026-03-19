"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react";

type IntroPhase = "idle" | "running" | "complete";

interface IntroContextValue {
  phase: IntroPhase;
  progress: number;
  startIntro: (onComplete?: () => void) => void;
  onIntroComplete: () => void;
}

const IntroContext = createContext<IntroContextValue | null>(null);

export const introProgressRef = { current: 0 };

export function IntroProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<IntroPhase>("idle");
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef<(() => void) | null>(null);

  const startIntro = useCallback((onComplete?: () => void) => {
    setPhase("running");
    setProgress(0);
    introProgressRef.current = 0;
    onCompleteRef.current = onComplete ?? null;
  }, []);

  const onIntroComplete = useCallback(() => {
    setPhase("complete");
    setProgress(1);
    introProgressRef.current = 1;
    onCompleteRef.current?.();
    onCompleteRef.current = null;
  }, []);

  const value: IntroContextValue = {
    phase,
    progress,
    startIntro,
    onIntroComplete,
  };

  return (
    <IntroContext.Provider value={value}>{children}</IntroContext.Provider>
  );
}

export function useIntro(): IntroContextValue {
  const context = useContext(IntroContext);
  if (!context) {
    throw new Error("useIntro must be used within IntroProvider");
  }
  return context;
}
