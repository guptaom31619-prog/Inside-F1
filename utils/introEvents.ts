export const INTRO_EVENTS = {
  start: "f1:intro:start",
  complete: "f1:intro:complete",
} as const;

const TRANSITION_START = "f1:camera:transition:start";
const TRANSITION_END = "f1:camera:transition:end";

export function dispatchIntroStart(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(TRANSITION_START));
    window.dispatchEvent(new CustomEvent(INTRO_EVENTS.start));
  }
}

export function dispatchIntroComplete(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(TRANSITION_END));
    window.dispatchEvent(new CustomEvent(INTRO_EVENTS.complete));
  }
}
