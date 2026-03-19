import type { Vector3 } from "three";

export type CarPartId =
  | "frontWing"
  | "rearWing"
  | "floor"
  | "halo"
  | "suspension"
  | "wheels"
  | "body";

export interface PartConfig {
  id: CarPartId;
  offset: Vector3;
  distance: number;
}

export const EXPLODED_OFFSETS: Record<CarPartId, [number, number, number]> = {
  frontWing: [0, 0, 0.4],
  rearWing: [0, 0, -0.4],
  floor: [0, -0.25, 0],
  halo: [0, 0.35, 0],
  suspension: [0, 0.15, 0],
  wheels: [0, 0, 0],
  body: [0, 0, 0],
};

export const EXPLODED_DISTANCE = 0.35;
