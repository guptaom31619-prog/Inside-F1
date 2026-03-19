export interface F1Driver {
  driver_number: number;
  full_name: string;
  name_acronym: string;
  team_name: string;
  team_colour: string;
  headshot_url: string;
  first_name: string;
  last_name: string;
}

export interface DriverStanding {
  position: number;
  driver: F1Driver;
  points: number;
  wins: number;
}

export interface ConstructorStanding {
  position: number;
  name: string;
  colour: string;
  points: number;
  wins: number;
  drivers: string[];
}

function avatarUrl(name: string): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=333&color=fff&size=80`;
}

function buildF1HeadshotUrl(firstName: string, lastName: string): string {
  const cleanFirst = firstName.replace(/[^a-zA-Z]/g, "");
  const cleanLast = lastName.replace(/[^a-zA-Z]/g, "");
  const code = (cleanFirst.slice(0, 3) + cleanLast.slice(0, 3)).toUpperCase();
  const initial = cleanFirst.charAt(0).toUpperCase();
  return `https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/${initial}/${code}/${code.toLowerCase()}01.png.transform/1col/image.png`;
}

const TEAM_COLOURS: Record<string, string> = {
  "red bull": "3671C6",
  mercedes: "27F4D2",
  ferrari: "E8002D",
  mclaren: "FF8000",
  "aston martin": "229971",
  alpine: "FF87BC",
  williams: "64C4FF",
  haas: "B6BABD",
  rb: "6692FF",
  alphatauri: "4E7C9B",
  "alfa romeo": "C92D4B",
  "racing point": "F596C8",
  renault: "FFF500",
  "toro rosso": "469BFF",
  sauber: "52E252",
  cadillac: "1E6B35",
};

function getTeamColour(teamName: string): string {
  const lower = teamName.toLowerCase();
  for (const [key, val] of Object.entries(TEAM_COLOURS)) {
    if (lower.includes(key)) return val;
  }
  return "888888";
}

interface ErgastDriver {
  givenName: string;
  familyName: string;
  code?: string;
  permanentNumber?: string;
}

interface ErgastConstructor {
  name: string;
  constructorId: string;
}

interface ErgastStanding {
  position: string;
  points: string;
  wins: string;
  Driver: ErgastDriver;
  Constructors: ErgastConstructor[];
}

interface ErgastConstructorStanding {
  position: string;
  points: string;
  wins: string;
  Constructor: ErgastConstructor;
}

// ─── Cache with TTL ──────────────────────────────────────

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const CACHE_TTL = 10 * 60 * 1000; // 10 minutes
const driverCache = new Map<number, CacheEntry<DriverStanding[]>>();
const constructorCacheMap = new Map<number, CacheEntry<ConstructorStanding[]>>();
let headshotCache: CacheEntry<F1Driver[]> | null = null;

function getCached<T>(cache: Map<number, CacheEntry<T>>, key: number): T | null {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) return entry.data;
  return null;
}

function setCache<T>(cache: Map<number, CacheEntry<T>>, key: number, data: T) {
  cache.set(key, { data, timestamp: Date.now() });
}

// ─── Fetch with retry + timeout ──────────────────────────

async function fetchWithRetry(
  url: string,
  retries = 2,
  timeoutMs = 8000
): Promise<Response> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timer);

      if (res.status === 429) {
        const wait = Math.min(2000 * (attempt + 1), 6000);
        await new Promise((r) => setTimeout(r, wait));
        continue;
      }

      if (!res.ok && attempt < retries) {
        await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
        continue;
      }

      return res;
    } catch (err) {
      if (attempt === retries) throw err;
      await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
    }
  }
  throw new Error("Max retries exceeded");
}

// ─── Headshot fetcher (cached separately) ────────────────

async function getHeadshots(): Promise<F1Driver[]> {
  if (headshotCache && Date.now() - headshotCache.timestamp < CACHE_TTL) {
    return headshotCache.data;
  }
  try {
    const res = await fetchWithRetry(
      "https://api.openf1.org/v1/drivers?session_key=latest",
      1,
      5000
    );
    if (!res.ok) return [];
    const data: F1Driver[] = await res.json();
    headshotCache = { data, timestamp: Date.now() };
    return data;
  } catch {
    return [];
  }
}

// ─── In-flight dedup ─────────────────────────────────────

const inflightDrivers = new Map<number, Promise<DriverStanding[]>>();
const inflightConstructors = new Map<number, Promise<ConstructorStanding[]>>();

// ─── Driver Standings ────────────────────────────────────

export async function fetchDriverStandings(year: number = 2025): Promise<DriverStanding[]> {
  const cached = getCached(driverCache, year);
  if (cached) return cached;

  const inflight = inflightDrivers.get(year);
  if (inflight) return inflight;

  const promise = _fetchDriverStandings(year);
  inflightDrivers.set(year, promise);
  try {
    return await promise;
  } finally {
    inflightDrivers.delete(year);
  }
}

async function _fetchDriverStandings(year: number): Promise<DriverStanding[]> {
  try {
    const res = await fetchWithRetry(
      `https://api.jolpi.ca/ergast/f1/${year}/driverstandings/`
    );
    if (!res.ok) return [];

    const json = await res.json();
    const lists = json?.MRData?.StandingsTable?.StandingsLists;
    if (!lists?.length) return [];

    const ergastStandings: ErgastStanding[] = lists[0].DriverStandings;
    if (!ergastStandings?.length) return [];

    const headshots = await getHeadshots();

    const standings: DriverStanding[] = ergastStandings.map((s) => {
      const teamName = s.Constructors?.[0]?.name ?? "Unknown";
      const firstName = s.Driver.givenName;
      const lastName = s.Driver.familyName;
      const code = s.Driver.code ?? lastName.slice(0, 3).toUpperCase();
      const fullName = `${firstName} ${lastName}`;

      const liveDriver = headshots.find(
        (d) => d.name_acronym === code || d.last_name === lastName
      );

      return {
        position: parseInt(s.position, 10),
        points: parseFloat(s.points),
        wins: parseInt(s.wins, 10),
        driver: {
          driver_number: parseInt(s.Driver.permanentNumber || "0", 10),
          full_name: fullName,
          name_acronym: code,
          team_name: teamName,
          team_colour: liveDriver?.team_colour ?? getTeamColour(teamName),
          headshot_url:
            liveDriver?.headshot_url ||
            buildF1HeadshotUrl(firstName, lastName),
          first_name: firstName,
          last_name: lastName,
        },
      };
    });

    setCache(driverCache, year, standings);
    return standings;
  } catch {
    return [];
  }
}

// ─── Constructor Standings ───────────────────────────────

export async function fetchConstructorStandings(year: number = 2025): Promise<ConstructorStanding[]> {
  const cached = getCached(constructorCacheMap, year);
  if (cached) return cached;

  const inflight = inflightConstructors.get(year);
  if (inflight) return inflight;

  const promise = _fetchConstructorStandings(year);
  inflightConstructors.set(year, promise);
  try {
    return await promise;
  } finally {
    inflightConstructors.delete(year);
  }
}

async function _fetchConstructorStandings(year: number): Promise<ConstructorStanding[]> {
  try {
    const res = await fetchWithRetry(
      `https://api.jolpi.ca/ergast/f1/${year}/constructorstandings/`
    );
    if (!res.ok) return [];

    const json = await res.json();
    const lists = json?.MRData?.StandingsTable?.StandingsLists;
    if (!lists?.length) return [];

    const ergast: ErgastConstructorStanding[] = lists[0].ConstructorStandings;
    if (!ergast?.length) return [];

    const driverStandings = await fetchDriverStandings(year);

    const results: ConstructorStanding[] = ergast.map((c) => {
      const teamName = c.Constructor.name;
      const teamDrivers = driverStandings
        .filter((d) => d.driver.team_name === teamName)
        .map((d) => d.driver.last_name);

      return {
        position: parseInt(c.position, 10),
        name: teamName,
        colour: getTeamColour(teamName),
        points: parseFloat(c.points),
        wins: parseInt(c.wins, 10),
        drivers: teamDrivers.length ? teamDrivers : ["—"],
      };
    });

    setCache(constructorCacheMap, year, results);
    return results;
  } catch {
    return [];
  }
}
