"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useIntro } from "@/contexts/IntroContext";
import { dispatchIntroStart, dispatchIntroComplete } from "@/utils/introEvents";
import { playEngineSound } from "@/utils/engineSound";

const FADE_IN_DURATION = 0.8;
const FADE_OUT_DURATION = 1.2;

type EngineHandle = { stop: (fadeDuration?: number) => void };

export function IntroSequence() {
  const { phase, onIntroComplete } = useIntro();
  const overlayRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);
  const engineRef = useRef<EngineHandle | null>(null);

  useEffect(() => {
    if (phase !== "running") return;

    let tl: gsap.core.Timeline | null = null;

    const id = requestAnimationFrame(() => {
      const line1 = line1Ref.current;
      const line2 = line2Ref.current;
      const overlay = overlayRef.current;
      if (!overlay || !line1 || !line2) return;

      const startEngine = () => {
        try {
          engineRef.current = playEngineSound(0.18);
        } catch {
          /* AudioContext may be blocked */
        }
      };

      const stopEngine = () => {
        engineRef.current?.stop(FADE_OUT_DURATION);
        engineRef.current = null;
      };

      dispatchIntroStart();

      tl = gsap.timeline({
        onComplete: () => {
          stopEngine();
          dispatchIntroComplete();
          onIntroComplete();
        },
      });

      tl.set(overlay, { opacity: 0 })
        .to(overlay, {
          opacity: 1,
          duration: FADE_IN_DURATION,
          ease: "power2.inOut",
        })
        .add(() => startEngine(), "-=0.4")
        .set(line1, { opacity: 0, y: 20 }, "+=0.5")
        .to(line1, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
        .set(line2, { opacity: 0, y: 20 }, "+=1.0")
        .to(line2, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
        .to(
          overlay,
          {
            opacity: 0,
            duration: FADE_OUT_DURATION,
            ease: "power2.inOut",
          },
          "+=1.2"
        );
    });

    return () => {
      cancelAnimationFrame(id);
      tl?.kill();
      engineRef.current?.stop(0.3);
      engineRef.current = null;
    };
  }, [phase, onIntroComplete]);

  if (phase !== "running") return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center px-6 pointer-events-auto"
    >
      <div className="text-center max-w-2xl">
        <p
          ref={line1Ref}
          className="font-display text-2xl sm:text-3xl md:text-4xl text-white tracking-wide opacity-0"
        >
          This is a Formula 1 car.
        </p>
        <p
          ref={line2Ref}
          className="font-body text-lg sm:text-xl md:text-2xl text-white/80 mt-4 opacity-0"
        >
          The fastest racing machine on earth.
        </p>
      </div>
    </div>
  );
}
