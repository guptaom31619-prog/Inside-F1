"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

interface DRSContextValue {
  isDRSActive: boolean;
  toggleDRS: () => void;
  deactivateDRS: () => void;
}

const DRSContext = createContext<DRSContextValue | null>(null);

export function DRSProvider({ children }: { children: ReactNode }) {
  const [isDRSActive, setIsDRSActive] = useState(false);

  const toggleDRS = useCallback(() => {
    setIsDRSActive((prev) => !prev);
  }, []);

  const deactivateDRS = useCallback(() => {
    setIsDRSActive(false);
  }, []);

  const value: DRSContextValue = {
    isDRSActive,
    toggleDRS,
    deactivateDRS,
  };

  return (
    <DRSContext.Provider value={value}>
      {children}
    </DRSContext.Provider>
  );
}

export function useDRS(): DRSContextValue {
  const context = useContext(DRSContext);
  if (!context) {
    throw new Error("useDRS must be used within DRSProvider");
  }
  return context;
}
