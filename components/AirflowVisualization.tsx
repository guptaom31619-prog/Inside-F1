"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { AIRFLOW_PATHS, AIRFLOW_CONFIG } from "@/config/airflow";

interface AirflowVisualizationProps {
  enabled: boolean;
}

function lerpPath(path: [number, number, number][], t: number): [number, number, number] {
  if (path.length < 2) return path[0] ?? [0, 0, 0];
  const scaled = t * (path.length - 1);
  const i = Math.min(Math.floor(scaled), path.length - 2);
  const local = scaled - i;
  const a = path[i];
  const b = path[i + 1];
  return [
    a[0] + (b[0] - a[0]) * local,
    a[1] + (b[1] - a[1]) * local,
    a[2] + (b[2] - a[2]) * local,
  ];
}

export function AirflowVisualization({ enabled }: AirflowVisualizationProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const phasesRef = useRef<Float32Array | null>(null);
  const colorsRef = useRef<Float32Array | null>(null);

  const { positions, colors, particleCount } = useMemo(() => {
    const count = AIRFLOW_PATHS.length * AIRFLOW_CONFIG.particlesPerPath;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const baseColor = new THREE.Color(AIRFLOW_CONFIG.color);

    let idx = 0;
    AIRFLOW_PATHS.forEach((path) => {
      for (let i = 0; i < AIRFLOW_CONFIG.particlesPerPath; i++) {
        const phase = i / AIRFLOW_CONFIG.particlesPerPath;
        const pos = lerpPath(path, phase);
        positions[idx * 3] = pos[0];
        positions[idx * 3 + 1] = pos[1];
        positions[idx * 3 + 2] = pos[2];
        colors[idx * 3] = baseColor.r;
        colors[idx * 3 + 1] = baseColor.g;
        colors[idx * 3 + 2] = baseColor.b;
        idx++;
      }
    });

    const phases = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      phases[i] = (i % AIRFLOW_CONFIG.particlesPerPath) / AIRFLOW_CONFIG.particlesPerPath;
    }
    phasesRef.current = phases;
    colorsRef.current = colors;

    return { positions, colors, particleCount: count };
  }, []);

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geom;
  }, [positions, colors]);

  useFrame((_, delta) => {
    if (!enabled || !pointsRef.current || !phasesRef.current || !colorsRef.current) return;

    const posAttr = pointsRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const colAttr = pointsRef.current.geometry.getAttribute("color") as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;
    const colArray = colAttr.array as Float32Array;

    const baseColor = new THREE.Color(AIRFLOW_CONFIG.color);
    const headColor = new THREE.Color("#ffffff");

    for (let i = 0; i < particleCount; i++) {
      let phase = phasesRef.current[i];
      phase += AIRFLOW_CONFIG.flowSpeed * delta;
      if (phase >= 1) phase -= 1;
      phasesRef.current[i] = phase;

      const pathIdx = Math.floor(i / AIRFLOW_CONFIG.particlesPerPath);
      const path = AIRFLOW_PATHS[pathIdx];
      const pos = lerpPath(path, phase);

      posArray[i * 3] = pos[0];
      posArray[i * 3 + 1] = pos[1];
      posArray[i * 3 + 2] = pos[2];

      const brightness = phase < 0.15 ? phase / 0.15 : phase > 0.85 ? (1 - phase) / 0.15 : 1;
      const c = baseColor.clone().lerp(headColor, brightness * 0.3);
      colArray[i * 3] = c.r;
      colArray[i * 3 + 1] = c.g;
      colArray[i * 3 + 2] = c.b;
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
  });

  if (!enabled) return null;

  return (
    <group>
      {/* Bright core lines */}
      {AIRFLOW_PATHS.map((path, i) => (
        <Line
          key={`core-${i}`}
          points={path.map((p) => [p[0], p[1], p[2]] as [number, number, number])}
          color={AIRFLOW_CONFIG.color}
          lineWidth={AIRFLOW_CONFIG.lineWidth}
          transparent
          opacity={AIRFLOW_CONFIG.lineOpacity}
          depthWrite={false}
        />
      ))}
      {/* Wider glow lines behind */}
      {AIRFLOW_PATHS.map((path, i) => (
        <Line
          key={`glow-${i}`}
          points={path.map((p) => [p[0], p[1], p[2]] as [number, number, number])}
          color={AIRFLOW_CONFIG.color}
          lineWidth={AIRFLOW_CONFIG.lineWidth * 3}
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      ))}
      {/* Animated particles */}
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          size={AIRFLOW_CONFIG.particleSize}
          vertexColors
          transparent
          opacity={AIRFLOW_CONFIG.opacity}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
