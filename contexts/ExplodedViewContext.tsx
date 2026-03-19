"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

interface ExplodedViewContextValue {
  isExploded: boolean;
  toggleExploded: () => void;
}

const ExplodedViewContext = createContext<ExplodedViewContextValue | null>(null);

export function ExplodedViewProvider({ children }: { children: ReactNode }) {
  const [isExploded, setIsExploded] = useState(false);

  const toggleExploded = useCallback(() => {
    setIsExploded((prev) => !prev);
  }, []);

  const value: ExplodedViewContextValue = {
    isExploded,
    toggleExploded,
  };

  return (
    <ExplodedViewContext.Provider value={value}>
      {children}
    </ExplodedViewContext.Provider>
  );
}

export function useExplodedView(): ExplodedViewContextValue {
  const context = useContext(ExplodedViewContext);
  if (!context) {
    throw new Error("useExplodedView must be used within ExplodedViewProvider");
  }
  return context;
}
