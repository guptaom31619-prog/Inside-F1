"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import type { Mesh } from "three";
import type { CarPartId } from "@/config/explodedView";
import { EXPLODED_OFFSETS } from "@/config/explodedView";

interface ExplodedViewHandlerProps {
  carRef: React.RefObject<THREE.Group>;
  isExploded: boolean;
}

interface PartOffset {
  x: number;
  y: number;
  z: number;
}

function getPartOffset(mesh: Mesh, part: CarPartId): PartOffset {
  const [ox, oy, oz] = EXPLODED_OFFSETS[part];

  if (part === "wheels") {
    const box = new THREE.Box3().setFromObject(mesh);
    const center = new THREE.Vector3();
    box.getCenter(center);
    const dirX = center.x >= 0 ? 1 : -1;
    const dirZ = center.z >= 0 ? 1 : -1;
    return {
      x: dirX * 0.3,
      y: 0.2,
      z: dirZ * 0.2,
    };
  }

  return { x: ox, y: oy, z: oz };
}

function getPartFromMesh(mesh: Mesh): CarPartId {
  const name = (mesh.name || "").toLowerCase();
  const box = new THREE.Box3().setFromObject(mesh);
  const center = new THREE.Vector3();
  box.getCenter(center);

  if (name.includes("wheel") || name.includes("tread")) return "wheels";
  if (name.includes("suspension")) return "suspension";
  if (name.includes("halo")) return "halo";
  if (name.includes("wing")) {
    return center.z > 0 ? "frontWing" : "rearWing";
  }
  if (name.includes("floor") || name.includes("diffuser")) return "floor";

  if (center.z > 0.9) return "frontWing";
  if (center.z < -0.9) return "rearWing";
  if (center.y < 0.15) return "floor";
  if (center.y > 0.7) return "halo";
  if (Math.abs(center.x) > 0.6 && Math.abs(center.y - 0.3) < 0.4)
    return "suspension";

  return "body";
}

export function ExplodedViewHandler({
  carRef,
  isExploded,
}: ExplodedViewHandlerProps) {
  const originalPositionsRef = useRef<Map<Mesh, THREE.Vector3>>(new Map());
  const partAssignmentsRef = useRef<Map<Mesh, CarPartId>>(new Map());

  useEffect(() => {
    const car = carRef.current;
    if (!car) return;

    const meshes: Mesh[] = [];
    car.traverse((child) => {
      if ((child as Mesh).isMesh) {
        meshes.push(child as Mesh);
      }
    });

    if (originalPositionsRef.current.size === 0) {
      meshes.forEach((mesh) => {
        originalPositionsRef.current.set(mesh, mesh.position.clone());
        partAssignmentsRef.current.set(mesh, getPartFromMesh(mesh));
      });
    }

    const scale = isExploded ? 1 : 0;

    meshes.forEach((mesh) => {
      const part = partAssignmentsRef.current.get(mesh) ?? "body";
      const offset = getPartOffset(mesh, part);
      const original = originalPositionsRef.current.get(mesh);
      if (!original) return;

      const targetX = original.x + offset.x * scale;
      const targetY = original.y + offset.y * scale;
      const targetZ = original.z + offset.z * scale;

      gsap.to(mesh.position, {
        x: targetX,
        y: targetY,
        z: targetZ,
        duration: 1.2,
        ease: "power2.inOut",
      });
    });
  }, [carRef, isExploded]);

  return null;
}
