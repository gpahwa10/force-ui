"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

// Inline types (no dependency on @/lib/api/live-game-types)
export interface GameStateTeam {
  points: number;
  team_name?: string;
  team_alias?: string;
  quarters?: number[] | { q1?: number; q2?: number; q3?: number; q4?: number };
  [key: string]: unknown;
}
export interface GameStatePayload {
  type: string;
  gameId: string;
  sequence?: number;
  teams: Record<string, GameStateTeam>;
  [key: string]: unknown;
}
export interface PlayerIndexRow {
  playerId?: string;
  player_id?: string;
  teamId?: string;
  team_id?: string;
  team_name?: string;
  team_alias?: string;
  name?: string;
  pts?: number;
  ast?: number;
  reb?: number;
  index?: number;
  price?: number | string;
  indexChange?: number;
  index_change?: number;
  indexChangePct?: number;
  index_change_pct?: number;
  min?: number;
  minutes?: number;
  /** 1-based rank by index (higher index = better rank). Set by assignRanksByIndex. */
  rank?: number;
  /** When true, player is on court (from game_state.players). Used to filter live index to on-court only. */
  on_court?: boolean;
  [key: string]: unknown;
}

/**
 * Assigns rank to rows by index: higher index = better (lower) rank number.
 * Rows must be sorted by index descending (best first). Uses competition ranking: ties get the same rank, next rank skips (e.g. 1, 2, 2, 4).
 */
export function assignRanksByIndex<T extends { index?: number }>(
  rows: T[]
): (T & { rank: number })[] {
  const sorted = [...rows].sort((a, b) => (b.index ?? -Infinity) - (a.index ?? -Infinity));
  let currentRank = 0;
  let lastIndex: number | undefined;
  return sorted.map((row, i) => {
    const idx = row.index;
    if (idx !== lastIndex) {
      currentRank = i + 1;
      lastIndex = idx;
    }
    return { ...row, rank: currentRank };
  }) as (T & { rank: number })[];
}

/** Build Live Player Index Board rows from game_state (players + indices + teams). Enriches team_name/team_alias from payload.teams when index has team_id but null team_name. */
export function gameStateToPlayerIndex(payload: GameStatePayload): PlayerIndexRow[] {
  const players = payload.players as Record<string, Record<string, unknown>> | undefined;
  const indices = payload.indices as Array<Record<string, unknown>> | undefined;
  const teams = payload.teams as Record<string, Record<string, unknown>> | undefined;
  if (!indices || !Array.isArray(indices)) return [];
  const playersMap = players && typeof players === "object" ? players : {};
  const teamsMap = teams && typeof teams === "object" ? teams : {};
  const rows: PlayerIndexRow[] = indices.map((idx) => {
    const playerId = (idx.player_id ?? idx.playerId) as string | undefined;
    const player = playerId ? (playersMap[playerId] as Record<string, unknown> | undefined) : undefined;
    const teamId = (idx.team_id ?? player?.team_id ?? idx.teamId ?? player?.teamId) as string | undefined;
    const team = teamId ? (teamsMap[teamId] as Record<string, unknown> | undefined) : undefined;
    const pts = (player?.points ?? idx.pts) as number | undefined;
    const ast = (player?.assists ?? idx.ast) as number | undefined;
    const reb = (player?.rebounds ?? idx.reb) as number | undefined;
    const min = (player?.minutes ?? idx.minutes ?? idx.min) as number | undefined;
    const indexFinal = (idx.index_final ?? idx.index) as number | undefined;
    const name = (idx.player_name ?? player?.player_name ?? idx.name ?? playerId) as string | undefined;
    const teamName = (idx.team_name ?? team?.team_name) as string | undefined;
    const teamAlias = (idx.team_alias ?? team?.team_alias) as string | undefined;
    const indexChange = (idx.index_change ?? idx.indexChange ?? player?.index_change) as number | undefined;
    const indexChangePct = (idx.index_change_pct ?? idx.indexChangePct) as number | undefined;
    const price = (idx.price ?? player?.price) as number | string | undefined;
    const onCourt = player?.on_court as boolean | undefined;
    return {
      player_id: playerId,
      playerId: playerId,
      name,
      player_name: name,
      team_id: teamId,
      teamId: teamId,
      team_name: teamName ?? undefined,
      team_alias: teamAlias ?? undefined,
      pts,
      ast,
      reb,
      index: indexFinal,
      minutes: min,
      min,
      price,
      indexChange,
      index_change: indexChange,
      indexChangePct,
      index_change_pct: indexChangePct,
      on_court: onCourt,
    } as PlayerIndexRow;
  });
  const onCourtOnly =
    players && typeof players === "object"
      ? rows.filter((row) => row.on_court === true)
      : rows;
  return onCourtOnly.sort((a, b) => (b.index ?? 0) - (a.index ?? 0));
}
export interface TeamIndexRow {
  teamId?: string;
  team_id?: string;
  team_name?: string;
  pts?: number;
  ast?: number;
  reb?: number;
  [key: string]: unknown;
}
export interface LiveEventRow {
  time?: string;
  appliedAt?: string;
  seq?: number;
  type?: string;
  stat?: string;
  player?: string;
  player_name?: string;
  delta?: number;
  clock?: string;
  period?: number | string;
  description?: string;
  teamId?: string;
  team_id?: string;
  [key: string]: unknown;
}

export interface QuarterScore {
  quarter: string;
  team1Score: number;
  team2Score: number;
  isCurrent?: boolean;
}

interface LiveDataState {
  gameId: string | null;
  gameStates: Map<string, GameStatePayload>;
  playerIndex: PlayerIndexRow[];
  teamIndex: TeamIndexRow[];
  liveEvents: LiveEventRow[];
  quarterScores: QuarterScore[] | null;
}

type LiveDataAction =
  | { type: "SET_GAME_ID"; gameId: string | null }
  | { type: "GAME_STATE"; payload: GameStatePayload }
  | { type: "PLAYER_INDEX"; players: PlayerIndexRow[] }
  | { type: "TEAM_INDEX"; teams: TeamIndexRow[] }
  | { type: "LIVE_EVENTS"; events: LiveEventRow[] }
  | { type: "APPEND_EVENT"; event: LiveEventRow };

/** Game clock entry: period-wise scores (home_points, away_points per period). */
export interface GameClockEntry {
  period?: number;
  clock_seconds?: number;
  clock?: string;
  home_points?: number;
  away_points?: number;
  last_updated?: string;
  [key: string]: unknown;
}

/** Build quarter scores from game_state.game_clock (period-wise home_points / away_points). */
function getQuarterScoresFromGameClock(payload: GameStatePayload): QuarterScore[] | null {
  const raw = payload.game_clock as GameClockEntry[] | undefined;
  if (!raw || !Array.isArray(raw) || raw.length === 0) return null;
  const currentPeriod =
    typeof payload.period === "number"
      ? payload.period
      : raw.length > 0
        ? (raw[raw.length - 1]?.period as number | undefined)
        : undefined;
  const quarters: QuarterScore[] = [
    { quarter: "Q1", team1Score: 0, team2Score: 0 },
    { quarter: "Q2", team1Score: 0, team2Score: 0 },
    { quarter: "Q3", team1Score: 0, team2Score: 0 },
    { quarter: "Q4", team1Score: 0, team2Score: 0 },
  ];
  for (const entry of raw) {
    const period = entry.period as number | undefined;
    if (period == null || period < 1 || period > 4) continue;
    const home = typeof entry.home_points === "number" ? entry.home_points : 0;
    const away = typeof entry.away_points === "number" ? entry.away_points : 0;
    quarters[period - 1] = {
      quarter: `Q${period}`,
      team1Score: home,
      team2Score: away,
      isCurrent: period === currentPeriod,
    };
  }
  if (currentPeriod != null && currentPeriod >= 1 && currentPeriod <= 4 && !quarters[currentPeriod - 1].isCurrent) {
    quarters[currentPeriod - 1].isCurrent = true;
  }
  return quarters;
}

function getQuarterScores(state: GameStatePayload): QuarterScore[] | null {
  const fromGameClock = getQuarterScoresFromGameClock(state);
  if (fromGameClock) return fromGameClock;
  const teamIds = Object.keys(state.teams);
  if (teamIds.length < 2) return null;
  const [id1, id2] = teamIds;
  const t1 = state.teams[id1];
  const t2 = state.teams[id2];
  if (!t1 || !t2) return null;
  const q1 = t1.quarters;
  const q2 = t2.quarters;
  if (!q1 || !q2) return null;
  const arr1 = Array.isArray(q1) ? q1 : [q1.q1, q1.q2, q1.q3, q1.q4].filter((n) => typeof n === "number") as number[];
  const arr2 = Array.isArray(q2) ? q2 : [q2.q1, q2.q2, q2.q3, q2.q4].filter((n) => typeof n === "number") as number[];
  if (arr1.length < 4 || arr2.length < 4) return null;
  return [
    { quarter: "Q1", team1Score: arr1[0] ?? 0, team2Score: arr2[0] ?? 0 },
    { quarter: "Q2", team1Score: arr1[1] ?? 0, team2Score: arr2[1] ?? 0 },
    { quarter: "Q3", team1Score: arr1[2] ?? 0, team2Score: arr2[2] ?? 0 },
    { quarter: "Q4", team1Score: arr1[3] ?? 0, team2Score: arr2[3] ?? 0, isCurrent: true },
  ];
}

function liveDataReducer(state: LiveDataState, action: LiveDataAction): LiveDataState {
  switch (action.type) {
    case "SET_GAME_ID":
      return { ...state, gameId: action.gameId };
    case "GAME_STATE": {
      const next = new Map(state.gameStates);
      const existing = next.get(action.payload.gameId);
      if (
        !existing ||
        (action.payload.sequence != null &&
          action.payload.sequence > (existing.sequence ?? -1))
      ) {
        next.set(action.payload.gameId, action.payload);
      }
      const quarterScores = getQuarterScores(action.payload);
      return {
        ...state,
        gameStates: next,
        quarterScores: quarterScores ?? state.quarterScores,
      };
    }
    case "PLAYER_INDEX":
      return { ...state, playerIndex: action.players };
    case "TEAM_INDEX":
      return { ...state, teamIndex: action.teams };
    case "LIVE_EVENTS":
      return { ...state, liveEvents: action.events };
    case "APPEND_EVENT":
      return { ...state, liveEvents: [action.event, ...state.liveEvents].slice(0, 200) };
    default:
      return state;
  }
}

const initialState: LiveDataState = {
  gameId: null,
  gameStates: new Map(),
  playerIndex: [],
  teamIndex: [],
  liveEvents: [],
  quarterScores: null,
};

interface LiveDataContextValue extends LiveDataState {
  setGameId: (gameId: string | null) => void;
  dispatchGameState: (payload: GameStatePayload) => void;
  dispatchPlayerIndex: (players: PlayerIndexRow[]) => void;
  dispatchTeamIndex: (teams: TeamIndexRow[]) => void;
  dispatchLiveEvents: (events: LiveEventRow[]) => void;
  appendLiveEvent: (event: LiveEventRow) => void;
  currentGameState: GameStatePayload | null;
}

const LiveDataContext = createContext<LiveDataContextValue | null>(null);

export function LiveDataProvider({
  children,
  gameId: initialGameId = null,
}: {
  children: ReactNode;
  gameId?: string | null;
}) {
  const [state, dispatch] = useReducer(liveDataReducer, {
    ...initialState,
    gameId: initialGameId,
  });

  const setGameId = useCallback((gameId: string | null) => {
    dispatch({ type: "SET_GAME_ID", gameId });
  }, []);

  const dispatchGameState = useCallback((payload: GameStatePayload) => {
    dispatch({ type: "GAME_STATE", payload });
  }, []);

  const dispatchPlayerIndex = useCallback((players: PlayerIndexRow[]) => {
    dispatch({ type: "PLAYER_INDEX", players });
  }, []);

  const dispatchTeamIndex = useCallback((teams: TeamIndexRow[]) => {
    dispatch({ type: "TEAM_INDEX", teams });
  }, []);

  const dispatchLiveEvents = useCallback((events: LiveEventRow[]) => {
    dispatch({ type: "LIVE_EVENTS", events });
  }, []);

  const appendLiveEvent = useCallback((event: LiveEventRow) => {
    dispatch({ type: "APPEND_EVENT", event });
  }, []);

  const currentGameState = useMemo(() => {
    if (!state.gameId) return null;
    return state.gameStates.get(state.gameId) ?? null;
  }, [state.gameId, state.gameStates]);

  /** Derive playerIndex from current/latest game_state so UI updates when new stats arrive over WebSocket. */
  const playerIndex = useMemo((): PlayerIndexRow[] => {
    const gameState = state.gameId
      ? state.gameStates.get(state.gameId)
      : Array.from(state.gameStates.values())[0];
    if (gameState) {
      const fromGame = gameStateToPlayerIndex(gameState);
      if (fromGame.length > 0) return assignRanksByIndex(fromGame);
    }
    return state.playerIndex;
  }, [state.gameStates, state.gameId, state.playerIndex]);

  const value = useMemo<LiveDataContextValue>(
    () => ({
      ...state,
      playerIndex,
      setGameId,
      dispatchGameState,
      dispatchPlayerIndex,
      dispatchTeamIndex,
      dispatchLiveEvents,
      appendLiveEvent,
      currentGameState,
    }),
    [
      state.gameId,
      state.gameStates,
      state.teamIndex,
      state.liveEvents,
      state.quarterScores,
      playerIndex,
      setGameId,
      dispatchGameState,
      dispatchPlayerIndex,
      dispatchTeamIndex,
      dispatchLiveEvents,
      appendLiveEvent,
      currentGameState,
    ]
  );

  return (
    <LiveDataContext.Provider value={value}>
      {children}
    </LiveDataContext.Provider>
  );
}

export function useLiveData(): LiveDataContextValue {
  const ctx = useContext(LiveDataContext);
  if (!ctx) {
    return {
      ...initialState,
      setGameId: () => {},
      dispatchGameState: () => {},
      dispatchPlayerIndex: () => {},
      dispatchTeamIndex: () => {},
      dispatchLiveEvents: () => {},
      appendLiveEvent: () => {},
      currentGameState: null,
    };
  }
  return ctx;
}
