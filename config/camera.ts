export const CAMERA_POSITIONS = {
  overview: [0, 2, 6] as [number, number, number],
  frontWing: [0, 1, 2] as [number, number, number],
  cockpit: [0, 1.3, 0.5] as [number, number, number],
  rearWing: [0, 1.5, -2] as [number, number, number],
} as const;

export const CAMERA_LOOK_AT = [0, 0.5, 0] as [number, number, number];

export const CAMERA_TRANSITION = {
  duration: 2,
  ease: "power3.inOut" as const,
};
