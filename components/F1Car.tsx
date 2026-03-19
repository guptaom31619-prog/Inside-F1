"use client";

import { useRef, useMemo, useEffect, memo } from "react";
import { useGLTF, Center } from "@react-three/drei";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import type { Group } from "three";
import type { Mesh, MeshStandardMaterial } from "three";
import gsap from "gsap";
import { CarPartHotspots } from "./CarPartHotspots";
import { CarHoverHandler } from "./CarHoverHandler";
import { ExplodedViewHandler } from "./ExplodedViewHandler";
import { AirflowVisualization } from "./AirflowVisualization";
import { DRSHandler } from "./DRSHandler";
import { useExplodedView } from "@/contexts/ExplodedViewContext";
import { useAirflow } from "@/contexts/AirflowContext";
import { useDRS } from "@/contexts/DRSContext";
import { useCarPart } from "@/contexts/CarPartContext";

const MODEL_PATH = "/models/f1car.glb";
const DRACO_CDN = "https://www.gstatic.com/draco/versioned/decoders/1.5.7/";

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(DRACO_CDN);
dracoLoader.setDecoderConfig({ type: "js" });

function F1CarInner() {
  const groupRef = useRef<Group>(null);
  const carGroupRef = useRef<Group>(null);
  const { scene } = useGLTF(MODEL_PATH, DRACO_CDN);
  const { isExploded } = useExplodedView();
  const { isAirflowMode } = useAirflow();
  const { isDRSActive } = useDRS();
  const { carVisible } = useCarPart();

  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        const materials = Array.isArray(mesh.material)
          ? mesh.material
          : [mesh.material];
        materials.forEach((m) => {
          const mat = m as MeshStandardMaterial;
          if (mat?.isMaterial && "envMapIntensity" in mat) {
            mat.envMapIntensity = 1.4;
            mat.metalness = Math.max(mat.metalness ?? 0, 0.6);
            mat.roughness = Math.min(mat.roughness ?? 0.5, 0.4);
          }
        });
      }
    });
    return clone;
  }, [scene]);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    const targetScale = carVisible ? 0.65 : 0;
    gsap.to(group.scale, {
      x: targetScale,
      y: targetScale,
      z: targetScale,
      duration: 0.6,
      ease: carVisible ? "back.out(1.2)" : "power2.in",
    });
  }, [carVisible]);

  return (
    <Center>
      <group ref={groupRef} scale={0.65}>
        <group ref={carGroupRef}>
          <primitive object={clonedScene} />
        </group>
        <CarPartHotspots />
        <CarHoverHandler carRef={carGroupRef} />
        <ExplodedViewHandler carRef={carGroupRef} isExploded={isExploded} />
        <DRSHandler carRef={carGroupRef} isDRSActive={isDRSActive} />
        <AirflowVisualization enabled={isAirflowMode} />
      </group>
    </Center>
  );
}

export const F1Car = memo(F1CarInner);

useGLTF.preload(MODEL_PATH, DRACO_CDN);
