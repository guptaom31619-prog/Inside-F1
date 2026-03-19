/**
 * DRS (Drag Reduction System) animation config.
 * The top flap of the rear wing opens by ~85mm in real F1.
 * We simulate this with a rotation around the leading edge.
 */
export const DRS_CONFIG = {
  /** Flap rotation in radians when DRS is open (~12°) */
  flapOpenAngle: 0.21,
  /** Animation duration in seconds */
  duration: 0.4,
  /** Ease for realistic mechanical motion */
  ease: "power2.inOut" as const,
  /** Emissive color when DRS is active */
  glowColor: "#00d4ff",
  /** Emissive intensity when active */
  glowIntensity: 0.6,
} as const;
