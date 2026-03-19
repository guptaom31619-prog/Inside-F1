import type { Vector3Tuple } from "three";

/**
 * Streamline paths for aerodynamic visualization.
 * Each path flows from front wing (positive Z) over the car to the rear.
 * Coordinates match car's local space (car scaled 0.65, centered).
 */
export const AIRFLOW_PATHS: Vector3Tuple[][] = [
  // Central flow over cockpit
  [
    [0, 0.35, 1.6],
    [0, 0.55, 0.8],
    [0, 0.7, 0],
    [0, 0.6, -0.8],
    [0, 0.5, -1.6],
  ],
  // Left inner
  [
    [-0.35, 0.3, 1.6],
    [-0.4, 0.5, 0.8],
    [-0.45, 0.65, 0],
    [-0.4, 0.55, -0.8],
    [-0.35, 0.45, -1.6],
  ],
  // Right inner
  [
    [0.35, 0.3, 1.6],
    [0.4, 0.5, 0.8],
    [0.45, 0.65, 0],
    [0.4, 0.55, -0.8],
    [0.35, 0.45, -1.6],
  ],
  // Left outer
  [
    [-0.7, 0.25, 1.5],
    [-0.75, 0.45, 0.6],
    [-0.8, 0.55, -0.2],
    [-0.75, 0.5, -1],
    [-0.7, 0.4, -1.5],
  ],
  // Right outer
  [
    [0.7, 0.25, 1.5],
    [0.75, 0.45, 0.6],
    [0.8, 0.55, -0.2],
    [0.75, 0.5, -1],
    [0.7, 0.4, -1.5],
  ],
  // Lower left (around sidepod)
  [
    [-0.5, 0.1, 1.4],
    [-0.55, 0.2, 0.5],
    [-0.6, 0.25, -0.4],
    [-0.55, 0.2, -1.2],
    [-0.5, 0.15, -1.5],
  ],
  // Lower right
  [
    [0.5, 0.1, 1.4],
    [0.55, 0.2, 0.5],
    [0.6, 0.25, -0.4],
    [0.55, 0.2, -1.2],
    [0.5, 0.15, -1.5],
  ],
  // Top center (over halo)
  [
    [0, 0.9, 1.2],
    [0, 1.0, 0.4],
    [0, 1.05, -0.4],
    [0, 0.95, -1.2],
  ],
];

export const AIRFLOW_CONFIG = {
  particlesPerPath: 24,
  flowSpeed: 0.35,
  particleSize: 0.06,
  color: "#00d4ff",
  opacity: 0.95,
  lineWidth: 2,
  lineOpacity: 0.5,
} as const;
