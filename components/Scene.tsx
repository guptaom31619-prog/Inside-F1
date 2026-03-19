"use client";

import { Suspense, useState, useCallback, memo } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, PerformanceMonitor, BakeShadows } from "@react-three/drei";
import { F1Car } from "./F1Car";
import { CameraRig } from "./CameraRig";
import { IntroCamera } from "./IntroCamera";
import { SceneLights } from "./SceneLights";
import { OrbitControlsWithTransition } from "./OrbitControlsWithTransition";

function SceneInner() {
  const [dpr, setDpr] = useState(1.5);

  const handlePerformanceChange = useCallback((factor: number) => {
    setDpr(Math.round((0.5 + 1.5 * factor) * 10) / 10);
  }, []);

  return (
    <div className="absolute inset-0 z-0 w-full h-full">
      <Canvas
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0, 2, 6], fov: 45 }}
        dpr={[1, Math.min(2, dpr)]}
        resize={{ scroll: false, debounce: { scroll: 0, resize: 100 } }}
        shadows
        flat
      >
        <Suspense
          fallback={
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshBasicMaterial color="#ff1e1e" wireframe />
            </mesh>
          }
        >
          <color attach="background" args={["#050505"]} />

          <PerformanceMonitor
            factor={1}
            step={0.1}
            onIncline={() => handlePerformanceChange(1)}
            onDecline={() => handlePerformanceChange(0.5)}
            onChange={({ factor }) => handlePerformanceChange(factor)}
            onFallback={() => handlePerformanceChange(0.5)}
          >
            <CameraRig />
            <IntroCamera />
            <SceneLights />

            <Environment preset="studio" />

            <ContactShadows
              position={[0, -1.5, 0]}
              opacity={0.4}
              scale={12}
              blur={2}
              far={4}
              resolution={256}
            />

            <F1Car />
            <OrbitControlsWithTransition />
            <BakeShadows />
          </PerformanceMonitor>
        </Suspense>
      </Canvas>
    </div>
  );
}

export const Scene = memo(SceneInner);
