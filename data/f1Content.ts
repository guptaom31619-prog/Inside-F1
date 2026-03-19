export interface StatCard {
  value: string;
  label: string;
}

export interface InfoBlock {
  title: string;
  body: string;
}

// ─── WHAT IS F1 ──────────────────────────────────────────

export const F1_HERO_STATS: StatCard[] = [
  { value: "370+", label: "km/h Top Speed" },
  { value: "1000+", label: "Horsepower" },
  { value: "5g", label: "Braking Force" },
  { value: "50%+", label: "Thermal Efficiency" },
  { value: "$145M", label: "Budget Cap" },
  { value: "1950", label: "First Season" },
];

export const F1_OVERVIEW: InfoBlock[] = [
  {
    title: "The Pinnacle of Motorsport",
    body: "Formula 1 is the **highest class of international racing** for single-seater open-wheel cars. Governed by the **FIA** (Fédération Internationale de l'Automobile), it is a World Championship where **20 drivers** from **10 teams** compete across **~24 races** on circuits spanning five continents. It combines cutting-edge engineering, athletic excellence, and strategic mastery into one of the **most-watched sports** on the planet.",
  },
  {
    title: "A Brief History",
    body: "The first F1 World Championship race was held at **Silverstone, England, in 1950**. Legends like **Juan Manuel Fangio, Ayrton Senna, Michael Schumacher**, and **Lewis Hamilton** have defined different eras. The sport evolved from dangerous open-road racing into a high-tech spectacle — today's cars are **hybrid-electric engineering marvels** with over **300 sensors** transmitting **1.5 TB of data** per race weekend.",
  },
  {
    title: "Two Championships, One Season",
    body: "There are **two championships** running simultaneously: the **Drivers' Championship** (individual) and the **Constructors' Championship** (team). Points from each Grand Prix are added up across the season. The driver with the most points becomes **World Champion**; the team whose two drivers score the most combined points wins the **Constructors' title**. Both titles carry enormous prestige and hundreds of millions in prize money.",
  },
];

export const POINTS_SYSTEM: { position: string; points: number }[] = [
  { position: "1st", points: 25 },
  { position: "2nd", points: 18 },
  { position: "3rd", points: 15 },
  { position: "4th", points: 12 },
  { position: "5th", points: 10 },
  { position: "6th", points: 8 },
  { position: "7th", points: 6 },
  { position: "8th", points: 4 },
  { position: "9th", points: 2 },
  { position: "10th", points: 1 },
];

export const F1_KEY_CONCEPTS: InfoBlock[] = [
  {
    title: "DRS (Drag Reduction System)",
    body: "A **movable rear wing flap** that opens on designated straights when a driver is **within 1 second** of the car ahead. It reduces aerodynamic drag, adding **~15 km/h** to top speed, making overtaking possible on tracks where it would otherwise be nearly impossible.",
  },
  {
    title: "Pit Stops",
    body: "During a race, cars pull into the pit lane to change tyres. A modern F1 pit stop takes **under 2.5 seconds** to change all four wheels — performed by a crew of **~20 people** working in perfect synchronisation. **When to pit** is one of the most crucial strategic decisions in a race.",
  },
  {
    title: "Tyre Compounds",
    body: "**Pirelli** supplies five dry-weather compounds (**C1** hardest to **C5** softest) plus wet and intermediate tyres. Softer tyres = more grip but faster degradation. Drivers **must use at least two different compounds** during a race, forcing at least one pit stop and adding strategic depth.",
  },
  {
    title: "Safety Car & Flags",
    body: "When there's an incident, a **Safety Car** leads the pack at reduced speed. In severe situations, a **Red Flag** stops the race entirely. **Yellow flags** = danger, **Blue flags** = let faster cars through, **Black & white** = unsportsmanlike conduct warning. The **Virtual Safety Car (VSC)** slows cars via a delta time without bunching the field.",
  },
];

// ─── DRIVERS ─────────────────────────────────────────────

export const DRIVER_OVERVIEW: InfoBlock[] = [
  {
    title: "Who Are F1 Drivers?",
    body: "F1 drivers are among the **fittest athletes on the planet**. They endure up to **6g forces** under braking (fighter pilots experience similar), lose **2–4 kg of bodyweight** per race through sweat, and maintain heart rates averaging **160–170 bpm** for nearly 2 hours. Their neck muscles must support their head (~7 kg) plus helmet (~1 kg) under extreme g-forces in every corner.",
  },
  {
    title: "The Path to F1",
    body: "Most drivers start **karting between ages 5–8**, then progress through junior formulae: **Formula 4 → Formula 3 → Formula 2**. To earn an **FIA Super Licence** (mandatory for F1), a driver must be at least **18 years old** and accumulate **40 licence points** from results in recognised championships. Only **~20 people in the world** hold a current F1 race seat.",
  },
  {
    title: "The Drivers' World Championship",
    body: "Points are awarded to the **top 10 finishers** of each Grand Prix (**25-18-15-12-10-8-6-4-2-1**) plus **1 bonus point** for the fastest lap (if finishing in the top 10). **Sprint races** award points to the top 8. The driver with the highest cumulative points at season end is crowned **World Drivers' Champion** — the most prestigious individual title in motorsport.",
  },
];

export const DRIVER_FACTS: StatCard[] = [
  { value: "6g", label: "Peak Braking Force" },
  { value: "170", label: "Avg Heart Rate (bpm)" },
  { value: "50ms", label: "Reaction Time" },
  { value: "3kg", label: "Weight Lost per Race" },
  { value: "300+", label: "Gear Changes / Race" },
  { value: "80+", label: "Laps of Concentration" },
];

// ─── TEAMS / CONSTRUCTORS ────────────────────────────────

export const TEAM_OVERVIEW: InfoBlock[] = [
  {
    title: "What is a Constructor?",
    body: "In F1, a 'constructor' is a team that **designs and builds its own car**. Unlike most racing series, F1 teams must manufacture their own chassis. Each constructor fields **two cars** and employs **800–1,200 people** including aerodynamicists, engineers, mechanics, strategists, and data scientists. Factories run **24/7** during the season.",
  },
  {
    title: "The Constructors' Championship",
    body: "Both drivers' points are combined for the team total. The Constructors' Championship is worth **hundreds of millions** in prize money — the difference between finishing 4th and 5th can be **$30–40M in revenue**. This money funds next year's development, creating a **virtuous cycle** where success breeds more success.",
  },
  {
    title: "The $145M Budget Cap",
    body: "Since 2021, F1 enforces a **$145M annual cost cap** (excluding driver salaries and marketing). Before the cap, top teams spent over **$400M** while smaller teams survived on **$120M**. The cap has led to **closer racing** and more competitive midfield battles — the gap between the best and worst cars has shrunk dramatically.",
  },
  {
    title: "Power Unit Suppliers",
    body: "Only **four manufacturers** build F1 power units: **Ferrari, Mercedes, Renault/Alpine**, and **Honda/Red Bull Powertrains**. Customer teams pay **~$15M per season** for their power units. Engine development is heavily restricted to control costs, with tokens limiting changes between seasons. From 2026, new regulations introduce **fully sustainable fuels**.",
  },
];

export const TEAM_FACTS: StatCard[] = [
  { value: "1000+", label: "Employees per Team" },
  { value: "$145M", label: "Budget Cap" },
  { value: "300+", label: "Sensors per Car" },
  { value: "1.5TB", label: "Data per Weekend" },
  { value: "80K+", label: "Parts per Car" },
  { value: "4", label: "Engine Suppliers" },
];

// ─── RACE WEEKEND ────────────────────────────────────────

export interface RacePhase {
  day: string;
  title: string;
  sessions: string[];
  description: string;
  icon: "practice" | "qualifying" | "race" | "sprint" | "strategy";
}

export const RACE_WEEKEND: RacePhase[] = [
  {
    day: "Friday",
    title: "Practice Sessions",
    sessions: ["Free Practice 1 (60 min)", "Free Practice 2 (60 min)"],
    description:
      "Practice is where the race weekend begins. Teams run through their programme: testing **tyre compounds**, gathering data on **car balance and degradation**, trying different setup configurations (**wing angles, ride height, suspension**), and letting drivers learn the track's **braking points and racing lines**. Every lap generates gigabytes of data analysed in real-time by engineers at the track and back at the factory.",
    icon: "practice",
  },
  {
    day: "Saturday",
    title: "Qualifying",
    sessions: [
      "Q1 (18 min) — All 20 drivers, bottom 5 eliminated",
      "Q2 (15 min) — 15 drivers, bottom 5 eliminated",
      "Q3 (12 min) — Top 10 shootout for pole position",
    ],
    description:
      "Qualifying is a **three-part knockout system** that determines the starting grid. In **Q1**, all 20 drivers set their fastest laps — the **slowest five are eliminated** (P16–P20). **Q2** eliminates the next five (P11–P15). The final ten battle in **Q3** for **pole position**. The driver with the fastest Q3 lap starts on pole — a massive advantage worth approximately **0.3 seconds per lap** in clean air.",
    icon: "qualifying",
  },
  {
    day: "Saturday*",
    title: "Sprint (Select Weekends)",
    sessions: [
      "Sprint Shootout (Qualifying for Sprint)",
      "Sprint Race (~100 km, 1/3 race distance)",
    ],
    description:
      "At **6 selected weekends** per season, a Sprint race replaces one practice session. It's a shorter race (**~30 minutes**) with points for the **top 8** (8-7-6-5-4-3-2-1) and **no mandatory pit stop**. Sprint weekends have their own qualifying format on Friday, with the main qualifying on Saturday morning and the Sprint race Saturday afternoon. They add extra jeopardy and a **second competitive race**.",
    icon: "sprint",
  },
  {
    day: "Sunday",
    title: "The Grand Prix",
    sessions: [
      "Formation Lap — Drivers warm tyres and systems",
      "Race Start — Five red lights, then lights out!",
      "Pit Stops — Tyre changes and strategy plays",
      "Chequered Flag — Top 10 score points",
    ],
    description:
      "The main event. Races are approximately **305 km** (about 50–70 laps). It begins with the iconic **five-light start sequence**. Strategy revolves around **when to pit**, which **tyre compounds** to use, and how aggressively to push. Drivers must manage tyre degradation, fuel, brake temperatures, and energy recovery while racing **wheel-to-wheel at 300+ km/h**. Points: **25-18-15-12-10-8-6-4-2-1** to the top 10, plus **1 bonus point** for fastest lap. The top three celebrate on the **podium** with champagne.",
    icon: "race",
  },
];

export const RACE_STRATEGY: InfoBlock[] = [
  {
    title: "Tyre Strategy",
    body: "The most common strategic choice. A **'one-stop'** strategy means pitting once (**Medium → Hard**), while a **'two-stop'** means pitting twice (**Soft → Medium → Soft**). Softer tyres are faster but degrade quicker. Teams simulate **millions of scenarios** before and during each race to find the optimal window.",
  },
  {
    title: "Undercuts & Overcuts",
    body: "An **'undercut'** means pitting **before your rival** to get fresh tyres and use their speed advantage to jump ahead. An **'overcut'** is the opposite — staying out **longer on older tyres**, hoping the rival gets stuck in traffic. These are the **chess moves** of F1 racing.",
  },
  {
    title: "Weather & Safety Cars",
    body: "**Rain transforms F1 into chaos.** Intermediate and full wet tyres exist, but transition timing is critical — pit too early and you lose time, too late and you crash. **Safety Car periods** neutralise the race and allow **'free' pit stops**, often completely reshuffling the order. The best strategists thrive in changing conditions.",
  },
  {
    title: "Flags & Penalties",
    body: "**Yellow** = danger (slow down). **Blue** = let faster cars through. **Red** = race stopped. Time penalties (**5s, 10s**) are added to race time or served during a pit stop. **Drive-through** and **stop-go** penalties are more severe. Accumulating **12 penalty points** in a 12-month period results in a **race ban**.",
  },
];
