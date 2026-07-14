"use client";

import { useEffect, useCallback, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import {
  CAMERA_POSITIONS,
  CAMERA_LOOK_AT,
  CAMERA_TRANSITION,
} from "@/config/camera";
import { CAMERA_EVENTS } from "@/utils/cameraControls";
import type { CarPart } from "@/data/carParts";
import type { Chapter } from "@/data/chapters";

const TRANSITION_START = "f1:camera:transition:start";
const TRANSITION_END = "f1:camera:transition:end";

export function CameraRig() {
  const { camera } = useThree();
  const lookAtTarget = useRef<THREE.Vector3>(new THREE.Vector3(...CAMERA_LOOK_AT));

  const animateTo = useCallback(
    (position: [number, number, number]) => {
      window.dispatchEvent(new CustomEvent(TRANSITION_START));

      gsap.to(lookAtTarget.current, {
        x: CAMERA_LOOK_AT[0],
        y: CAMERA_LOOK_AT[1],
        z: CAMERA_LOOK_AT[2],
        duration: CAMERA_TRANSITION.duration,
        ease: CAMERA_TRANSITION.ease,
      });

      gsap.to(camera.position, {
        x: position[0],
        y: position[1],
        z: position[2],
        duration: CAMERA_TRANSITION.duration,
        ease: CAMERA_TRANSITION.ease,
        onUpdate: () => {
          camera.lookAt(lookAtTarget.current);
          camera.updateProjectionMatrix();
        },
        onComplete: () => {
          camera.lookAt(lookAtTarget.current);
          window.dispatchEvent(new CustomEvent(TRANSITION_END));
        },
      });
    },
    [camera]
  );

  useEffect(() => {
    const handleOverview = () => animateTo(CAMERA_POSITIONS.overview);
    const handleFrontWing = () => animateTo(CAMERA_POSITIONS.frontWing);
    const handleCockpit = () => animateTo(CAMERA_POSITIONS.cockpit);
    const handleRearWing = () => animateTo(CAMERA_POSITIONS.rearWing);
    const handlePart = (e: Event) => {
      const part = (e as CustomEvent<CarPart>).detail;
      if (!part?.cameraPosition) return;
      animateTo(part.cameraPosition);
    };
    const handleChapter = (e: Event) => {
      const chapter = (e as CustomEvent<Chapter>).detail;
      if (!chapter?.cameraPosition) return;
      animateTo(chapter.cameraPosition);
    };

    window.addEventListener(CAMERA_EVENTS.overview, handleOverview);
    window.addEventListener(CAMERA_EVENTS.frontWing, handleFrontWing);
    window.addEventListener(CAMERA_EVENTS.cockpit, handleCockpit);
    window.addEventListener(CAMERA_EVENTS.rearWing, handleRearWing);
    window.addEventListener(CAMERA_EVENTS.part, handlePart);
    window.addEventListener(CAMERA_EVENTS.chapter, handleChapter);

    return () => {
      window.removeEventListener(CAMERA_EVENTS.overview, handleOverview);
      window.removeEventListener(CAMERA_EVENTS.frontWing, handleFrontWing);
      window.removeEventListener(CAMERA_EVENTS.cockpit, handleCockpit);
      window.removeEventListener(CAMERA_EVENTS.rearWing, handleRearWing);
      window.removeEventListener(CAMERA_EVENTS.part, handlePart);
      window.removeEventListener(CAMERA_EVENTS.chapter, handleChapter);
    };
  }, [animateTo]);

  return null;
}
