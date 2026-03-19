"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { CarPart } from "@/data/carParts";

interface CarPartContextValue {
  selectedPart: CarPart | null;
  hoveredPart: CarPart | null;
  clickEnabled: boolean;
  carVisible: boolean;
  setSelectedPart: (part: CarPart | null) => void;
  setHoveredPart: (part: CarPart | null) => void;
  setClickEnabled: (enabled: boolean) => void;
  setCarVisible: (visible: boolean) => void;
  selectPart: (part: CarPart) => void;
  clearSelection: () => void;
}

const CarPartContext = createContext<CarPartContextValue | null>(null);

export function CarPartProvider({ children }: { children: ReactNode }) {
  const [selectedPart, setSelectedPart] = useState<CarPart | null>(null);
  const [hoveredPart, setHoveredPart] = useState<CarPart | null>(null);
  const [clickEnabled, setClickEnabled] = useState(false);
  const [carVisible, setCarVisible] = useState(true);

  const selectPart = useCallback((part: CarPart) => {
    setSelectedPart(part);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedPart(null);
  }, []);

  const value: CarPartContextValue = {
    selectedPart,
    hoveredPart,
    clickEnabled,
    carVisible,
    setSelectedPart,
    setHoveredPart,
    setClickEnabled,
    setCarVisible,
    selectPart,
    clearSelection,
  };

  return (
    <CarPartContext.Provider value={value}>{children}</CarPartContext.Provider>
  );
}

export function useCarPart(): CarPartContextValue {
  const context = useContext(CarPartContext);
  if (!context) {
    throw new Error("useCarPart must be used within CarPartProvider");
  }
  return context;
}
