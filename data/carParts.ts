export interface CarPart {
  id: string;
  name: string;
  description: string;
  category: "external" | "internal";
  cameraPosition: [number, number, number];
  highlightColor: string;
  hotspotPosition: [number, number, number];
}

export const carParts: CarPart[] = [
  // ─── External Components ──────────────────────────────
  {
    id: "front-wing",
    name: "Front Wing",
    category: "external",
    description:
      "The front wing generates crucial downforce at the front of the car, balancing the rear and enabling precise steering. Its complex multi-element design is optimized through thousands of CFD simulations to maximize airflow to the underbody and around the tires.",
    cameraPosition: [0, 1, 2.5],
    highlightColor: "#ff1e1e",
    hotspotPosition: [0, 0.4, 1.8],
  },
  {
    id: "nose-cone",
    name: "Nose Cone",
    category: "external",
    description:
      "The nose cone is the frontmost structure of the chassis. It channels air towards the underbody and must pass strict FIA crash tests. Its shape directs airflow under the car to maximize ground effect while meeting safety regulations for frontal impact absorption.",
    cameraPosition: [0, 0.8, 2.2],
    highlightColor: "#ff1e1e",
    hotspotPosition: [0, 0.35, 1.4],
  },
  {
    id: "rear-wing",
    name: "Rear Wing",
    category: "external",
    description:
      "The rear wing produces the majority of the car's downforce, pushing the tires into the track for maximum grip through corners. Teams run different wing angles depending on the circuit—higher downforce for twisty tracks, lower for straights. The DRS flap on top opens on straights to reduce drag.",
    cameraPosition: [0, 1.5, -2.5],
    highlightColor: "#ff1e1e",
    hotspotPosition: [0, 0.6, -1.8],
  },
  {
    id: "halo",
    name: "Halo",
    category: "external",
    description:
      "The Halo is a titanium structure that protects the driver's head from impacts and flying debris. Introduced in 2018, it can withstand the weight of a London double-decker bus (12 tonnes). It has saved lives in multiple serious crashes including Grosjean's Bahrain fireball in 2020.",
    cameraPosition: [0, 1.8, 0.3],
    highlightColor: "#ff1e1e",
    hotspotPosition: [0, 1.2, 0.2],
  },
  {
    id: "sidepods",
    name: "Sidepods",
    category: "external",
    description:
      "Sidepods house the radiators and intercoolers that manage cooling for the power unit and energy recovery systems. Their shape dramatically affects aerodynamic performance—teams experiment with radical designs like Ferrari's sculpted inlets and Mercedes' slim 'zero-pod' concept.",
    cameraPosition: [1.2, 0.8, -0.5],
    highlightColor: "#ff1e1e",
    hotspotPosition: [0.9, 0.5, -0.3],
  },
  {
    id: "engine-cover",
    name: "Engine Cover",
    category: "external",
    description:
      "The engine cover (bodywork above the power unit) includes the shark fin and rear cooling outlet. The air intake above the driver's head feeds the turbocharger. The shark fin stabilizes the car in crosswinds and directs clean airflow to the rear wing for maximum downforce.",
    cameraPosition: [-0.8, 1.4, -0.6],
    highlightColor: "#ff1e1e",
    hotspotPosition: [0, 0.75, -0.6],
  },
  {
    id: "floor",
    name: "Floor & Underbody",
    category: "external",
    description:
      "The floor is the single most important aerodynamic surface on a modern F1 car. Venturi tunnels carved into the underbody accelerate air, creating a massive low-pressure zone that sucks the car to the track. Teams spend over 60% of their aero development budget on the floor alone.",
    cameraPosition: [0, 0.3, 0],
    highlightColor: "#ff1e1e",
    hotspotPosition: [0, -0.2, 0],
  },
  {
    id: "diffuser",
    name: "Diffuser",
    category: "external",
    description:
      "Located at the rear underside, the diffuser expands airflow from the underbody tunnels back to ambient pressure, creating a powerful suction effect. A well-designed diffuser can generate up to 40% of total downforce. Its performance is highly sensitive to ride height and rake angle.",
    cameraPosition: [0, 0.8, -2.2],
    highlightColor: "#ff1e1e",
    hotspotPosition: [0, 0.2, -1.8],
  },
  {
    id: "front-tyres",
    name: "Front Tyres",
    category: "external",
    description:
      "Pirelli supplies five dry compounds from C1 (hardest) to C5 (softest), each offering a different grip-degradation tradeoff. Front tyres are narrower than rears (305mm vs 405mm) and must endure up to 5g lateral force in high-speed corners. Tyre temperature management is critical—optimal grip window is just 10°C wide.",
    cameraPosition: [0.8, 0.5, 1.8],
    highlightColor: "#ff8800",
    hotspotPosition: [0.6, 0.2, 1.3],
  },
  {
    id: "rear-tyres",
    name: "Rear Tyres",
    category: "external",
    description:
      "The wider rear tyres (405mm) deliver the power unit's 1000+ HP to the track. They endure massive longitudinal forces during acceleration out of corners. Rear tyre wear is the primary factor in pit stop strategy—drivers must balance attacking pace with preserving their rubber for the long stints.",
    cameraPosition: [-0.8, 0.5, -1.5],
    highlightColor: "#ff8800",
    hotspotPosition: [-0.6, 0.2, -1.2],
  },
  {
    id: "mirrors",
    name: "Wing Mirrors",
    category: "external",
    description:
      "F1 mirrors are far more than reflective surfaces—they're carefully shaped aerodynamic elements. Teams use them to direct airflow around the sidepods and towards the rear of the car. FIA mandates minimum mirror sizes for safety, but teams push the rules to extract every aerodynamic advantage.",
    cameraPosition: [1.0, 1.0, 0.2],
    highlightColor: "#ff1e1e",
    hotspotPosition: [0.55, 0.65, 0.15],
  },

  // ─── Internal / Mechanical Components ─────────────────
  {
    id: "power-unit",
    name: "Power Unit",
    category: "internal",
    description:
      "The 1.6L turbocharged V6 is the heart of a hybrid system producing over 1000 HP. The MGU-K recovers braking energy and the MGU-H harvests turbo heat—together adding ~160 HP. Thermal efficiency exceeds 50%, making F1 power units the most efficient internal combustion engines ever built. Each driver is limited to 3 per season.",
    cameraPosition: [0, 1, -0.8],
    highlightColor: "#ff1e1e",
    hotspotPosition: [0, 0.5, -0.5],
  },
  {
    id: "suspension",
    name: "Suspension",
    category: "internal",
    description:
      "F1 cars use push-rod (front) or pull-rod (rear) suspension with carbon fibre wishbones. Internal torsion bars and dampers are housed inside the chassis for aerodynamic cleanliness. The system must handle 5g+ cornering loads while keeping the floor at the precise ride height needed for ground effect to work.",
    cameraPosition: [0.8, 0.5, 1.5],
    highlightColor: "#ff1e1e",
    hotspotPosition: [0.6, 0.4, 1.2],
  },
  {
    id: "brakes",
    name: "Brakes",
    category: "internal",
    description:
      "Carbon-carbon brake discs operate at temperatures up to 1000°C, glowing red under heavy braking. Drivers experience up to 6g deceleration—slowing from 300 km/h to 80 km/h in under 4 seconds. Brake-by-wire on the rear axle integrates with the MGU-K energy recovery system for maximum efficiency.",
    cameraPosition: [0.9, 0.4, 1.5],
    highlightColor: "#ff4400",
    hotspotPosition: [0.65, 0.15, 1.3],
  },
  {
    id: "cockpit",
    name: "Cockpit & Monocoque",
    category: "internal",
    description:
      "The survival cell (monocoque) is a carbon fibre tub that protects the driver in crashes. It must withstand 25g frontal and 15g lateral impacts in FIA tests. The cockpit is extremely tight—drivers sit in a custom-moulded seat in a semi-reclined position with their legs raised above their hips.",
    cameraPosition: [0.4, 1.5, 0.6],
    highlightColor: "#ff1e1e",
    hotspotPosition: [0, 0.7, 0.3],
  },
  {
    id: "steering-wheel",
    name: "Steering Wheel",
    category: "internal",
    description:
      "The most complex component the driver interacts with. It contains 20+ buttons, rotary dials, and paddles controlling engine modes, differential settings, brake bias, ERS deployment, radio, DRS, and pit speed limiter. It costs around $50,000 and has an integrated display showing real-time telemetry data.",
    cameraPosition: [0, 1.2, 0.8],
    highlightColor: "#00d4ff",
    hotspotPosition: [0, 0.65, 0.5],
  },
  {
    id: "energy-recovery",
    name: "Energy Recovery System",
    category: "internal",
    description:
      "The ERS harvests energy through two motor-generator units. The MGU-K captures kinetic energy during braking (up to 120kW), while the MGU-H converts exhaust heat from the turbocharger. Combined, they store energy in a lithium-ion battery and deploy it for an extra ~160 HP boost per lap, lasting approximately 33 seconds.",
    cameraPosition: [-0.6, 0.8, -0.4],
    highlightColor: "#00ff88",
    hotspotPosition: [-0.3, 0.4, -0.4],
  },
  {
    id: "gearbox",
    name: "Gearbox",
    category: "internal",
    description:
      "The 8-speed seamless-shift gearbox changes gears in under 50 milliseconds—faster than a human blink. It's a structural element of the car, with the rear suspension bolting directly to it. Made from carbon fibre and titanium, it must survive 6 race weekends. A single unit costs upwards of $500,000.",
    cameraPosition: [0, 0.8, -1.2],
    highlightColor: "#ff1e1e",
    hotspotPosition: [0, 0.35, -1.0],
  },
];
