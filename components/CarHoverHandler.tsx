"use client";

import { useRef, useCallback, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { Mesh, MeshStandardMaterial } from "three";
import { useCarPart } from "@/contexts/CarPartContext";
import { getCarPartFromMesh } from "@/utils/meshToPart";
import { goToPart } from "@/utils/cameraControls";

const HIGHLIGHT_COLOR = new THREE.Color("#ff1e1e");
const HIGHLIGHT_INTENSITY = 0.2;
const BRIGHTNESS_BOOST = 0.12;
const LERP_SPEED = 10;

interface CarHoverHandlerProps {
  carRef: React.RefObject<THREE.Group>;
}

export function CarHoverHandler({ carRef }: CarHoverHandlerProps) {
  const { setHoveredPart, selectPart, clickEnabled } = useCarPart();
  const { camera, pointer, raycaster, gl } = useThree();
  const hoveredRef = useRef<Mesh | null>(null);
  const hoveredPartRef = useRef<import("@/data/carParts").CarPart | null>(null);
  const animatingRef = useRef<Mesh | null>(null);
  const intensityRef = useRef(0);

  useEffect(() => {
    const handleClick = () => {
      if (!clickEnabled) return;
      const part = hoveredPartRef.current;
      if (part) {
        selectPart(part);
        goToPart(part);
      }
    };
    const canvas = gl.domElement;
    canvas.addEventListener("click", handleClick);
    return () => canvas.removeEventListener("click", handleClick);
  }, [gl.domElement, selectPart, clickEnabled]);

  const applyHighlight = useCallback(
    (mesh: Mesh, intensity: number) => {
      const materials = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];

      materials.forEach((m) => {
        const mat = m as MeshStandardMaterial;
        if (mat?.isMaterial && "emissive" in mat) {
          mat.emissive.copy(HIGHLIGHT_COLOR);
          mat.emissiveIntensity = intensity;
          if ("envMapIntensity" in mat) {
            mat.envMapIntensity = 1.4 + intensity * BRIGHTNESS_BOOST * 3;
          }
        }
      });
    },
    []
  );

  useFrame((_, delta) => {
    const car = carRef.current;
    if (!car) return;

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObject(car, true);

    const hit = intersects.find((i) => i.object instanceof THREE.Mesh);
    const newHovered = hit ? (hit.object as Mesh) : null;

    const part = newHovered ? getCarPartFromMesh(newHovered) : null;
    hoveredPartRef.current = part;

    if (newHovered !== hoveredRef.current) {
      hoveredRef.current = newHovered;
      document.body.style.cursor = newHovered ? "pointer" : "default";
      setHoveredPart(part);
      if (newHovered) {
        animatingRef.current = newHovered;
      }
    }

    const target = newHovered ? 1 : 0;
    intensityRef.current +=
      (target - intensityRef.current) * Math.min(LERP_SPEED * delta, 1);

    const mesh = animatingRef.current;
    if (mesh) {
      const intensity = intensityRef.current * HIGHLIGHT_INTENSITY;
      applyHighlight(mesh, intensity);
      if (intensityRef.current < 0.005 && !newHovered) {
        animatingRef.current = null;
      }
    }
  });

  return null;
}
