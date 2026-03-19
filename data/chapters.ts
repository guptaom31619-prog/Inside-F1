export interface Chapter {
  id: string;
  number: number;
  title: string;
  description: string;
  cameraPosition: [number, number, number];
}

export const chapters: Chapter[] = [
  {
    id: "what-is-f1",
    number: 1,
    title: "What is Formula 1",
    description:
      "The pinnacle of motorsport. Twenty drivers, ten teams, and the fastest racing cars on Earth. Formula 1 combines cutting-edge engineering with human skill at speeds exceeding 370 km/h.",
    cameraPosition: [0, 2, 6],
  },
  {
    id: "the-f1-car",
    number: 2,
    title: "The F1 Car",
    description:
      "A masterpiece of engineering. Every surface is designed for aerodynamics. The hybrid power unit delivers over 1000 horsepower. Explore the car's key components and understand what makes it so fast.",
    cameraPosition: [0, 1.2, 3],
  },
  {
    id: "drivers",
    number: 3,
    title: "Drivers",
    description:
      "The best drivers in the world. Split-second reactions, physical endurance, and mental fortitude. These athletes push the limits of human performance every lap.",
    cameraPosition: [0, 1.5, 5],
  },
  {
    id: "teams",
    number: 4,
    title: "Teams",
    description:
      "Ten constructors, each with hundreds of engineers, designers, and strategists. The battle for the Constructors' Championship is as fierce as the fight for the Drivers' title.",
    cameraPosition: [0, 2, 5.5],
  },
  {
    id: "race-weekend",
    number: 5,
    title: "Race Weekend",
    description:
      "Practice, Qualifying, and the Grand Prix. Three days of action culminating in the main event. Strategy, tire management, and pit stops decide the outcome.",
    cameraPosition: [0, 2.2, 6],
  },
];
