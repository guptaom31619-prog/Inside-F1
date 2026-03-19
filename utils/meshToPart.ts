import * as THREE from "three";
import type { Mesh } from "three";
import { carParts } from "@/data/carParts";
import type { CarPart } from "@/data/carParts";

function getPartIdFromMesh(mesh: Mesh): string | null {
  const name = (mesh.name || "").toLowerCase();
  const box = new THREE.Box3().setFromObject(mesh);
  const center = new THREE.Vector3();
  box.getCenter(center);
  const size = new THREE.Vector3();
  box.getSize(size);

  // --- Name-based detection (highest priority) ---
  if (name.includes("steering") || name.includes("steer")) return "steering-wheel";
  if (name.includes("mirror")) return "mirrors";
  if (name.includes("brake") || name.includes("caliper") || name.includes("disc")) return "brakes";
  if (name.includes("gearbox") || name.includes("gear_box") || name.includes("transmission")) return "gearbox";
  if (name.includes("battery") || name.includes("ers") || name.includes("mgu")) return "energy-recovery";
  if (name.includes("cockpit") || name.includes("monocoque") || name.includes("tub")) return "cockpit";
  if (name.includes("nose")) return "nose-cone";
  if (name.includes("engine_cover") || name.includes("shark") || name.includes("airbox")) return "engine-cover";
  if (name.includes("bargeboard")) return "sidepods";
  if (name.includes("suspension") || name.includes("wishbone")) return "suspension";
  if (name.includes("halo")) return "halo";
  if (name.includes("diffuser")) return "diffuser";
  if (name.includes("sidepod") || name.includes("pod")) return "sidepods";
  if (name.includes("floor") || name.includes("plank")) return "floor";

  if (name.includes("tyre") || name.includes("tire") || name.includes("wheel") || name.includes("tread") || name.includes("rim")) {
    if (center.z > 0) return "front-tyres";
    return "rear-tyres";
  }

  if (name.includes("wing")) {
    return center.z > 0 ? "front-wing" : "rear-wing";
  }

  // --- Position-based fallback ---
  const absX = Math.abs(center.x);

  // Wheels/tyres by position: large objects near the corners
  if (absX > 0.5 && (center.y < 0.35) && size.x > 0.15) {
    if (center.z > 0.3) return "front-tyres";
    if (center.z < -0.3) return "rear-tyres";
  }

  // Front area
  if (center.z > 1.2) return "front-wing";
  if (center.z > 0.7 && center.y < 0.5 && absX < 0.4) return "nose-cone";

  // Rear area
  if (center.z < -1.4 && center.y > 0.3) return "rear-wing";
  if (center.z < -1.3 && center.y < 0.4) return "diffuser";

  // Cockpit region
  if (center.y > 0.7 && center.z > -0.2 && center.z < 0.8 && absX < 0.3) return "halo";
  if (center.y > 0.4 && center.y < 0.8 && center.z > 0.0 && center.z < 0.6 && absX < 0.25) return "cockpit";

  // Floor
  if (center.y < 0.1) return "floor";

  // Sidepods
  if (absX > 0.4 && center.z < 0.2 && center.z > -1.2 && center.y > 0.1 && center.y < 0.6) return "sidepods";

  // Mirrors — small objects at sidepod height, outboard
  if (absX > 0.45 && center.y > 0.5 && center.y < 0.8 && center.z > -0.2 && center.z < 0.4 && size.x < 0.3) return "mirrors";

  // Engine cover — top rear
  if (center.z < 0 && center.z > -1.3 && center.y > 0.5 && absX < 0.35) return "engine-cover";

  // Suspension area
  if (absX > 0.4 && center.y > 0.1 && center.y < 0.5 && (center.z > 0.5 || center.z < -0.5)) return "suspension";

  // Central rear = power unit / gearbox
  if (center.z < -0.3 && center.z > -1.3 && absX < 0.4 && center.y > 0.1 && center.y < 0.5) return "power-unit";

  return null;
}

export function getCarPartFromMesh(mesh: Mesh): CarPart | null {
  const partId = getPartIdFromMesh(mesh);
  if (!partId) return null;
  return carParts.find((p) => p.id === partId) ?? null;
}
