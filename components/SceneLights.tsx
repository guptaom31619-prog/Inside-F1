"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { INTRO_EVENTS } from "@/utils/introEvents";

export function SceneLights() {
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const directionalRef = useRef<THREE.DirectionalLight>(null);
  const fillRef = useRef<THREE.DirectionalLight>(null);
  const pointRef = useRef<THREE.PointLight>(null);
  const accentRef = useRef<THREE.PointLight>(null);

  useEffect(() => {
    const handleIntroStart = () => {
      [ambientRef, directionalRef, fillRef, pointRef, accentRef].forEach(
        (ref) => {
          if (ref.current) ref.current.intensity = 0;
        }
      );

      gsap.to(
        {},
        {
          duration: 2.5,
          ease: "power2.in",
          onUpdate: function () {
            const t = this.progress();
            if (ambientRef.current) ambientRef.current.intensity = t * 0.2;
            if (directionalRef.current)
              directionalRef.current.intensity = t * 1.4;
            if (fillRef.current) fillRef.current.intensity = t * 0.5;
            if (pointRef.current) pointRef.current.intensity = t * 0.4;
            if (accentRef.current) accentRef.current.intensity = t * 0.2;
          },
        }
      );
    };

    window.addEventListener(INTRO_EVENTS.start, handleIntroStart);
    return () => {
      window.removeEventListener(INTRO_EVENTS.start, handleIntroStart);
    };
  }, []);

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.2} />
      <directionalLight
        ref={directionalRef}
        position={[6, 10, 6]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={20}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-bias={-0.0001}
      />
      <directionalLight ref={fillRef} position={[-5, 5, -3]} intensity={0.5} />
      <pointLight
        ref={pointRef}
        position={[0, 5, 3]}
        intensity={0.4}
        color="#ffffff"
      />
      <pointLight
        ref={accentRef}
        position={[-3, 2, 2]}
        intensity={0.2}
        color="#ff1e1e"
      />
    </>
  );
}
