import { getTeamById } from "./athletes-bank";

export interface GameTeamData {
  id: string;
  slug: string;
  score: number;
  icon: string;
  name: string;
  price: string;
  change: number;
}

export interface GameData {
  id: string;
  thumbnail: string;
  team1Id: string;
  team1Score: number;
  team1Price: string;
  team1Change: number;
  team2Id: string;
  team2Score: number;
  team2Price: string;
  team2Change: number;
  status: string;
  volume: string;
}

export const todayGames: GameData[] = [
  {
    id: "1",
    thumbnail: "/icons/matches/match1.svg",
    team1Id: "lakers",
    team1Score: 113,
    team1Price: "$124.32",
    team1Change: 3.27,
    team2Id: "warriors",
    team2Score: 105,
    team2Price: "$124.32",
    team2Change: -1.26,
    status: "Q4 | 10:00",
    volume: "$606.19k Vol.",
  },
  {
    id: "2",
    thumbnail: "/icons/matches/match2.svg",
    team1Id: "lakers",
    team1Score: 98,
    team1Price: "$124.32",
    team1Change: 3.27,
    team2Id: "warriors",
    team2Score: 87,
    team2Price: "$124.32",
    team2Change: -1.26,
    status: "Q4 | 10:00",
    volume: "$606.19k Vol.",
  },
  {
    id: "3",
    thumbnail: "/icons/matches/match3.svg",
    team1Id: "lakers",
    team1Score: 127,
    team1Price: "$124.32",
    team1Change: 3.27,
    team2Id: "warriors",
    team2Score: 119,
    team2Price: "$124.32",
    team2Change: -1.26,
    status: "Q4 | 10:00",
    volume: "$606.19k Vol.",
  },
  {
    id: "4",
    thumbnail: "/icons/matches/match4.svg",
    team1Id: "lakers",
    team1Score: 92,
    team1Price: "$124.32",
    team1Change: 3.27,
    team2Id: "warriors",
    team2Score: 101,
    team2Price: "$124.32",
    team2Change: -1.26,
    status: "Q4 | 10:00",
    volume: "$606.19k Vol.",
  },
  {
    id: "5",
    thumbnail: "/icons/matches/match1.svg",
    team1Id: "lakers",
    team1Score: 108,
    team1Price: "$124.32",
    team1Change: 3.27,
    team2Id: "warriors",
    team2Score: 95,
    team2Price: "$124.32",
    team2Change: -1.26,
    status: "Q4 | 10:00",
    volume: "$606.19k Vol.",
  },
];

/**
 * Get a game by ID
 */
export function getGameById(id: string): GameData | undefined {
  return todayGames.find((game) => game.id === id);
}

/**
 * Get team data for a specific game and team
 * Combines team information with game-specific data (score, price, change)
 */
export function getTeamDataById(
  gameId: string,
  teamId: string,
): GameTeamData | undefined {
  const game = getGameById(gameId);
  if (!game) return undefined;

  const team = getTeamById(teamId);
  if (!team) return undefined;

  // Determine if this is team1 or team2
  const isTeam1 = game.team1Id === teamId;
  const isTeam2 = game.team2Id === teamId;

  if (!isTeam1 && !isTeam2) return undefined;

  return {
    id: team.id,
    slug: team.id, // Team ID is used as slug for routing
    score: isTeam1 ? game.team1Score : game.team2Score,
    icon: team.logoUrl,
    name: team.name,
    price: isTeam1 ? game.team1Price : game.team2Price,
    change: isTeam1 ? game.team1Change : game.team2Change,
  };
}
