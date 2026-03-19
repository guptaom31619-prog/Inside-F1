"use client";

import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { INTRO_EVENTS } from "@/utils/introEvents";
import { CAMERA_LOOK_AT } from "@/config/camera";

const INTRO_DURATION = 5;
const RADIUS = 5.5;
const START_ANGLE = 0;
const END_ANGLE = Math.PI * 0.85;

export function IntroCamera() {
  const { camera } = useThree();
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const handleIntroStart = () => {
      animationRef.current?.kill();
      const startX = RADIUS * Math.cos(START_ANGLE);
      const startZ = RADIUS * Math.sin(START_ANGLE);
      camera.position.set(startX, 2, startZ);
      camera.lookAt(...CAMERA_LOOK_AT);

      const obj = { angle: START_ANGLE };
      animationRef.current = gsap.to(obj, {
        angle: END_ANGLE,
        duration: INTRO_DURATION,
        ease: "power2.inOut",
        onUpdate: () => {
          camera.position.x = RADIUS * Math.cos(obj.angle);
          camera.position.z = RADIUS * Math.sin(obj.angle);
          camera.position.y = 2 + Math.sin(obj.angle * 0.5) * 0.3;
          camera.lookAt(...CAMERA_LOOK_AT);
          camera.updateProjectionMatrix();
        },
      });
    };

    window.addEventListener(INTRO_EVENTS.start, handleIntroStart);
    return () => {
      window.removeEventListener(INTRO_EVENTS.start, handleIntroStart);
      animationRef.current?.kill();
    };
  }, [camera]);

  return null;
}
