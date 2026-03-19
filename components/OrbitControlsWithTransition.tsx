"use client";

import { useState, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import { useCarPart } from "@/contexts/CarPartContext";

const TRANSITION_START = "f1:camera:transition:start";
const TRANSITION_END = "f1:camera:transition:end";

export function OrbitControlsWithTransition() {
  const [transitioning, setTransitioning] = useState(false);
  const { selectedPart } = useCarPart();

  useEffect(() => {
    const handleStart = () => setTransitioning(true);
    const handleEnd = () => setTransitioning(false);

    window.addEventListener(TRANSITION_START, handleStart);
    window.addEventListener(TRANSITION_END, handleEnd);

    return () => {
      window.removeEventListener(TRANSITION_START, handleStart);
      window.removeEventListener(TRANSITION_END, handleEnd);
    };
  }, []);

  const isZoomed = !!selectedPart;

  return (
    <OrbitControls
      enabled={!transitioning}
      enablePan={false}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2.2}
      minDistance={isZoomed ? 0.5 : 4}
      maxDistance={isZoomed ? 6 : 12}
      enableZoom={!isZoomed}
    />
  );
}
