"use client";

import { useRef } from "react";
import { carParts } from "@/data/carParts";
import { goToPart } from "@/utils/cameraControls";
import { useCarPart } from "@/contexts/CarPartContext";

const HOTSPOT_RADIUS = 0.22;

export function CarPartHotspots() {
  const { selectPart, selectedPart, clickEnabled } = useCarPart();

  const handlePartClick = (part: (typeof carParts)[number]) => {
    if (!clickEnabled) return;
    selectPart(part);
    goToPart(part);
  };

  return (
    <group>
      {carParts.map((part) => (
        <PartHotspot
          key={part.id}
          part={part}
          isSelected={selectedPart?.id === part.id}
          onClick={() => handlePartClick(part)}
        />
      ))}
    </group>
  );
}

function PartHotspot({
  part,
  isSelected,
  onClick,
}: {
  part: (typeof carParts)[number];
  isSelected: boolean;
  onClick: () => void;
}) {
  const meshRef = useRef<import("three").Mesh>(null);

  return (
    <group position={part.hotspotPosition}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <sphereGeometry args={[HOTSPOT_RADIUS, 16, 16]} />
        <meshBasicMaterial
          color={part.highlightColor}
          transparent
          opacity={0}
        />
      </mesh>
      {isSelected && (
        <>
          <pointLight
            color={part.highlightColor}
            intensity={2}
            distance={3}
            decay={2}
          />
          <mesh>
            <sphereGeometry args={[HOTSPOT_RADIUS * 1.5, 32, 32]} />
            <meshBasicMaterial
              color={part.highlightColor}
              transparent
              opacity={0.2}
            />
          </mesh>
        </>
      )}
    </group>
  );
}
