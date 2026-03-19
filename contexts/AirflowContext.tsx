"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

interface AirflowContextValue {
  isAirflowMode: boolean;
  toggleAirflow: () => void;
}

const AirflowContext = createContext<AirflowContextValue | null>(null);

export function AirflowProvider({ children }: { children: ReactNode }) {
  const [isAirflowMode, setIsAirflowMode] = useState(false);

  const toggleAirflow = useCallback(() => {
    setIsAirflowMode((prev) => !prev);
  }, []);

  const value: AirflowContextValue = {
    isAirflowMode,
    toggleAirflow,
  };

  return (
    <AirflowContext.Provider value={value}>
      {children}
    </AirflowContext.Provider>
  );
}

export function useAirflow(): AirflowContextValue {
  const context = useContext(AirflowContext);
  if (!context) {
    throw new Error("useAirflow must be used within AirflowProvider");
  }
  return context;
}
