import type { CarPart } from "@/data/carParts";
import type { Chapter } from "@/data/chapters";

const CAMERA_EVENTS = {
  overview: "f1:camera:overview",
  frontWing: "f1:camera:frontWing",
  cockpit: "f1:camera:cockpit",
  rearWing: "f1:camera:rearWing",
  part: "f1:camera:part",
  chapter: "f1:camera:chapter",
} as const;

export function goToChapter(chapter: Chapter): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(CAMERA_EVENTS.chapter, { detail: chapter })
    );
  }
}

export function goToPart(part: CarPart): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(CAMERA_EVENTS.part, { detail: part })
    );
  }
}

export function goToOverview(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CAMERA_EVENTS.overview));
  }
}

export function goToFrontWing(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CAMERA_EVENTS.frontWing));
  }
}

export function goToCockpit(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CAMERA_EVENTS.cockpit));
  }
}

export function goToRearWing(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CAMERA_EVENTS.rearWing));
  }
}

export { CAMERA_EVENTS };
