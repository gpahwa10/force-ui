// Athlete Data Bank - Single Source of Truth for all athletes and teams

// ============================================================================
// TEAMS
// ============================================================================

export interface Team {
  id: string;
  name: string;
  abbreviation: string;
  logoUrl: string;
  league: string;
  bgColor?: string;
}

// Teams that have players in the athlete bank
export const TEAMS: Team[] = [
  {
    id: "lakers",
    name: "Lakers",
    abbreviation: "LAL",
    logoUrl: "/images/teams/lakers.png",
    league: "NBA",
    bgColor: "bg-dark-yellow",
  },
  {
    id: "warriors",
    name: "Warriors",
    abbreviation: "GSW",
    logoUrl: "/images/teams/warriors.png",
    league: "NBA",
    bgColor: "bg-dark-blue",
  },
];

// ============================================================================
// ATHLETES
// ============================================================================

/**
 * Extended athlete data with all fields (price, change, percentage, volume, etc.)
 * This is the main interface - all athletes have all data from the start
 * Only teamId is stored - use getTeamById() to get team information
 */
export interface ExtendedAthleteData {
  id: string;
  name: string;
  image: string;
  teamId: string;
  position?: string;
  bgColor?: string;
  price: string;
  change: number;
  percentage: number;
  volume?: string;
  volumeChange?: number;
  performance?: number;
  rank?: number;
}

// BaseAthlete is now an alias for ExtendedAthleteData (backward compatibility)
export type BaseAthlete = ExtendedAthleteData;

// Player interface for backward compatibility (matches teams-and-players.ts structure)
export interface Player {
  id: string;
  name: string;
  teamId: string;
  teamName: string;
  teamAbbreviation: string;
  position?: string;
  imageUrl: string;
  teamImageUrl: string;
  bgColor?: string;
}

// Base athlete data - this is the source of truth
// IDs must match URL slugs (name.toLowerCase().replace(/\s+/g, "-"))
// Only includes players that have images in /images/players/
// All athletes have all data from the start (price, change, percentage, etc.)
// All athletes are randomly assigned to Lakers or Warriors
// Only teamId is stored - use getTeamById() to get team information
export const ATHLETES_BANK: ExtendedAthleteData[] = [
  {
    id: "lebron-james",
    name: "LeBron James",
    image: "/images/players/lebron-james.png",
    teamId: "lakers",
    position: "Forward",
    bgColor: "bg-dark-yellow",
    price: "$105.50",
    change: 2.45,
    percentage: 85,
    volume: "$425.3k",
    volumeChange: 1.8,
    performance: 88,
    rank: 12,
  },
  {
    id: "stephen-curry",
    name: "Stephen Curry",
    image: "/images/players/stephen-curry.png",
    teamId: "warriors",
    position: "Guard",
    bgColor: "bg-dark-blue",
    price: "$98.75",
    change: -1.25,
    percentage: 82,
    volume: "$380.5k",
    volumeChange: -0.5,
    performance: 92,
    rank: 8,
  },
  {
    id: "kevin-durant",
    name: "Kevin Durant",
    image: "/images/players/kevin-durant.png",
    teamId: "warriors",
    position: "Forward",
    bgColor: "bg-dark-blue",
    price: "$112.30",
    change: 4.15,
    percentage: 91,
    volume: "$510.2k",
    volumeChange: 3.2,
    performance: 89,
    rank: 5,
  },
  {
    id: "luka-doncic",
    name: "Luka Doncic",
    image: "/images/players/luka-doncic.png",
    teamId: "lakers",
    position: "Guard",
    bgColor: "bg-dark-yellow",
    price: "$108.90",
    change: 3.6,
    percentage: 88,
    volume: "$495.8k",
    volumeChange: 2.7,
    performance: 90,
    rank: 6,
  },
  {
    id: "jayson-tatum",
    name: "Jayson Tatum",
    image: "/images/players/jayson-tatum.png",
    teamId: "warriors",
    position: "Forward",
    bgColor: "bg-dark-blue",
    price: "$102.40",
    change: 1.9,
    percentage: 84,
    volume: "$445.1k",
    volumeChange: 1.3,
    performance: 87,
    rank: 10,
  },
  {
    id: "giannis-antetokounmpo",
    name: "Giannis Antetok",
    image: "/images/players/giannis-antetokounmpo.png",
    teamId: "lakers",
    position: "Forward",
    bgColor: "bg-dark-yellow",
    price: "$115.80",
    change: 5.2,
    percentage: 94,
    volume: "$585.4k",
    volumeChange: 4.1,
    performance: 93,
    rank: 3,
  },
  {
    id: "anthony-davis",
    name: "Anthony Davis",
    image: "/images/players/anthony-davis.png",
    teamId: "lakers",
    position: "Forward-Center",
    bgColor: "bg-dark-yellow",
    price: "$95.60",
    change: -2.1,
    percentage: 78,
    volume: "$365.7k",
    volumeChange: -1.8,
    performance: 85,
    rank: 18,
  },
  {
    id: "nikola-jokic",
    name: "Nikola Jokic",
    image: "/images/players/nikola-jokic.png",
    teamId: "warriors",
    position: "Center",
    bgColor: "bg-dark-blue",
    price: "$110.25",
    change: 3.85,
    percentage: 90,
    volume: "$520.6k",
    volumeChange: 3.5,
    performance: 91,
    rank: 4,
  },
];

// ============================================================================
// UTILITY FUNCTIONS - TEAMS
// ============================================================================

/**
 * Get a team by ID
 */
export function getTeamById(id: string): Team | undefined {
  return TEAMS.find((team) => team.id === id);
}

/**
 * Get all teams
 */
export function getAllTeams(): Team[] {
  return TEAMS;
}

/**
 * Get a team by name
 */
export function getTeamByName(name: string): Team | undefined {
  return TEAMS.find((team) => team.name === name);
}

// ============================================================================
// UTILITY FUNCTIONS - ATHLETES
// ============================================================================

/**
 * Get all athletes from the bank
 */
export function getAllAthletes(): ExtendedAthleteData[] {
  return ATHLETES_BANK;
}

/**
 * Get a random athlete from the bank (deterministic - cycles through athletes)
 */
export function getRandomAthlete(): ExtendedAthleteData {
  // Deterministic: just return first athlete (or cycle through)
  return ATHLETES_BANK[0];
}

/**
 * Get athletes from the bank (deterministic - always returns same results)
 * Always returns ExtendedAthleteData with all fields
 * @param count Number of athletes to return
 * @param allowDuplicates Whether to allow duplicate athletes (default: true)
 */
export function getRandomAthletes(
  count: number,
  allowDuplicates: boolean = true,
): ExtendedAthleteData[] {
  if (allowDuplicates) {
    // Cycle through athletes deterministically
    const result: ExtendedAthleteData[] = [];
    for (let i = 0; i < count; i++) {
      result.push(ATHLETES_BANK[i % ATHLETES_BANK.length]);
    }
    return result;
  } else {
    // Return first N athletes (deterministic order)
    return ATHLETES_BANK.slice(0, Math.min(count, ATHLETES_BANK.length));
  }
}

/**
 * Get an athlete by ID
 */
export function getAthleteById(id: string): ExtendedAthleteData | undefined {
  return ATHLETES_BANK.find((athlete) => athlete.id === id);
}

/**
 * Get athletes by team ID
 */
export function getAthletesByTeamId(teamId: string): ExtendedAthleteData[] {
  return ATHLETES_BANK.filter((athlete) => athlete.teamId === teamId);
}

// ============================================================================
// BACKWARD COMPATIBILITY - PLAYER INTERFACE
// ============================================================================

/**
 * Convert ExtendedAthleteData to Player interface (for backward compatibility)
 */
export function athleteToPlayer(athlete: ExtendedAthleteData): Player {
  const team = getTeamById(athlete.teamId);
  return {
    id: athlete.id,
    name: athlete.name,
    teamId: athlete.teamId,
    teamName: team?.name || "",
    teamAbbreviation: team?.abbreviation || "",
    position: athlete.position,
    imageUrl: athlete.image,
    teamImageUrl: team?.logoUrl || "/icons/leagues/nba-new.png",
    bgColor: athlete.bgColor,
  };
}

/**
 * Get a player by ID (for backward compatibility)
 */
export function getPlayerById(id: string): Player | undefined {
  const athlete = getAthleteById(id);
  return athlete ? athleteToPlayer(athlete) : undefined;
}

/**
 * Get players by team ID (for backward compatibility)
 */
export function getPlayersByTeamId(teamId: string): Player[] {
  return getAthletesByTeamId(teamId).map(athleteToPlayer);
}

// ============================================================================
// LEGACY FUNCTIONS (deprecated - use getRandomAthletes instead)
// ============================================================================
