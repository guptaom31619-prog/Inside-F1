"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import type { Mesh } from "three";
import type { MeshStandardMaterial } from "three";
import { DRS_CONFIG } from "@/config/drs";

interface DRSHandlerProps {
  carRef: React.RefObject<THREE.Group>;
  isDRSActive: boolean;
}

function findRearWingFlapMeshes(car: THREE.Group): Mesh[] {
  const candidates: { mesh: Mesh; centerY: number; nameMatch: boolean }[] = [];
  const box = new THREE.Box3();
  const center = new THREE.Vector3();

  car.traverse((child) => {
    if ((child as Mesh).isMesh) {
      const mesh = child as Mesh;
      const name = (mesh.name || "").toLowerCase();
      box.setFromObject(mesh);
      box.getCenter(center);
      if (center.z < -0.7) {
        const nameMatch =
          name.includes("flap") ||
          name.includes("drs") ||
          name.includes("wing") ||
          name.includes("rear");
        candidates.push({
          mesh,
          centerY: center.y,
          nameMatch,
        });
      }
    }
  });

  if (candidates.length === 0) return [];

  candidates.sort((a, b) => {
    if (a.nameMatch !== b.nameMatch) return a.nameMatch ? -1 : 1;
    return b.centerY - a.centerY;
  });
  const topY = candidates[0].centerY;
  return candidates
    .filter((c) => c.centerY >= topY - 0.2)
    .map((c) => c.mesh);
}

function ensureMaterialClone(mesh: Mesh): void {
  if (Array.isArray(mesh.material)) {
    mesh.material = mesh.material.map((m) =>
      (m as MeshStandardMaterial).clone()
    ) as MeshStandardMaterial[];
  } else {
    mesh.material = (mesh.material as MeshStandardMaterial).clone();
  }
}

export function DRSHandler({ carRef, isDRSActive }: DRSHandlerProps) {
  const flapMeshesRef = useRef<Mesh[]>([]);
  const originalRotationsRef = useRef<Map<Mesh, { x: number; y: number; z: number }>>(new Map());
  const materialClonedRef = useRef(false);

  useEffect(() => {
    const car = carRef.current;
    if (!car) return;

    if (flapMeshesRef.current.length === 0) {
      const meshes = findRearWingFlapMeshes(car);
      flapMeshesRef.current = meshes;
      meshes.forEach((mesh) => {
        originalRotationsRef.current.set(mesh, {
          x: mesh.rotation.x,
          y: mesh.rotation.y,
          z: mesh.rotation.z,
        });
      });
    }

    const meshes = flapMeshesRef.current;
    if (meshes.length === 0) return;

    if (!materialClonedRef.current) {
      meshes.forEach(ensureMaterialClone);
      materialClonedRef.current = true;
    }

    const targetAngle = isDRSActive ? DRS_CONFIG.flapOpenAngle : 0;

    meshes.forEach((mesh) => {
      const original = originalRotationsRef.current.get(mesh);
      if (!original) return;

      gsap.to(mesh.rotation, {
        x: original.x + targetAngle,
        duration: DRS_CONFIG.duration,
        ease: DRS_CONFIG.ease,
      });

      const materials = Array.isArray(mesh.material)
        ? (mesh.material as MeshStandardMaterial[])
        : [mesh.material as MeshStandardMaterial];

      materials.forEach((mat) => {
        if (!mat.emissive) return;
        gsap.to(mat, {
          emissiveIntensity: isDRSActive ? DRS_CONFIG.glowIntensity : 0,
          duration: DRS_CONFIG.duration,
          ease: DRS_CONFIG.ease,
        });
        if (isDRSActive) {
          mat.emissive.set(DRS_CONFIG.glowColor);
        }
      });
    });
  }, [carRef, isDRSActive]);

  return null;
}
