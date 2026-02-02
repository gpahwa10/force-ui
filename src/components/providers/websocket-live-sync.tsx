"use client";

import { useEffect, useRef } from "react";
import { useWebSocket } from "@/lib/api/use-websocket";
import { useLiveData } from "@/components/providers/live-data-provider";
import type {
  GameStatePayload,
  PlayerIndexRow,
  TeamIndexRow,
  LiveEventRow,
} from "@/components/providers/live-data-provider";

function isGameStatePayload(
  msg: unknown
): msg is GameStatePayload {
  return (
    typeof msg === "object" &&
    msg !== null &&
    "type" in msg &&
    (msg as { type: string }).type === "game_state" &&
    "gameId" in msg &&
    "teams" in msg
  );
}

function isPlayerIndexMessage(
  msg: unknown
): msg is { type: string; players: PlayerIndexRow[] } {
  return (
    typeof msg === "object" &&
    msg !== null &&
    "type" in msg &&
    (msg as { type: string }).type === "player_index" &&
    "players" in msg &&
    Array.isArray((msg as { players: unknown }).players)
  );
}

function isTeamIndexMessage(
  msg: unknown
): msg is { type: string; teams: TeamIndexRow[] } {
  return (
    typeof msg === "object" &&
    msg !== null &&
    "type" in msg &&
    (msg as { type: string }).type === "team_index" &&
    "teams" in msg &&
    Array.isArray((msg as { teams: unknown }).teams)
  );
}

function isLiveEventsMessage(
  msg: unknown
): msg is { type: string; events: LiveEventRow[] } {
  return (
    typeof msg === "object" &&
    msg !== null &&
    "type" in msg &&
    (msg as { type: string }).type === "live_events" &&
    "events" in msg &&
    Array.isArray((msg as { events: unknown }).events)
  );
}

function isLiveEventMessage(msg: unknown): msg is { type: string; event?: LiveEventRow } & Record<string, unknown> {
  return (
    typeof msg === "object" &&
    msg !== null &&
    "type" in msg &&
    (msg as { type: string }).type === "live_event"
  );
}

function getLiveEventPayload(
  msg: { type: string; event?: LiveEventRow } & Record<string, unknown>
): LiveEventRow {
  const inner = msg.event ?? msg.data ?? msg.payload;
  if (inner && typeof inner === "object") return inner as LiveEventRow;
  return msg as LiveEventRow;
}

export function WebSocketLiveSync() {
  const { lastMessage, messageHistory } = useWebSocket({ connect: true });
  const {
    dispatchGameState,
    dispatchPlayerIndex,
    dispatchTeamIndex,
    dispatchLiveEvents,
    appendLiveEvent,
  } = useLiveData();
  const lastProcessedRef = useRef<string | null>(null);

  // Process last message when it changes
  useEffect(() => {
    if (!lastMessage) return;
    if (lastProcessedRef.current === lastMessage) return;
    lastProcessedRef.current = lastMessage;
    try {
      const parsed = JSON.parse(lastMessage) as unknown;
      if (isGameStatePayload(parsed)) {
        dispatchGameState(parsed);
      } else if (isPlayerIndexMessage(parsed)) {
        dispatchPlayerIndex(parsed.players);
      } else if (isTeamIndexMessage(parsed)) {
        dispatchTeamIndex(parsed.teams);
      } else if (isLiveEventsMessage(parsed)) {
        dispatchLiveEvents(parsed.events);
      } else if (isLiveEventMessage(parsed)) {
        appendLiveEvent(getLiveEventPayload(parsed));
      }
    } catch {
      // Ignore non-JSON or invalid messages
    }
  }, [
    lastMessage,
    dispatchGameState,
    dispatchPlayerIndex,
    dispatchTeamIndex,
    dispatchLiveEvents,
    appendLiveEvent,
  ]);

  // On mount, replay recent message history so we don't miss messages received before mount
  const hasReplayedRef = useRef(false);
  useEffect(() => {
    if (hasReplayedRef.current) return;
    hasReplayedRef.current = true;
    messageHistory.forEach((raw) => {
      try {
        const parsed = JSON.parse(raw) as unknown;
        if (isGameStatePayload(parsed)) {
          dispatchGameState(parsed);
        } else if (isPlayerIndexMessage(parsed)) {
          dispatchPlayerIndex(parsed.players);
        } else if (isTeamIndexMessage(parsed)) {
          dispatchTeamIndex(parsed.teams);
        } else if (isLiveEventsMessage(parsed)) {
          dispatchLiveEvents(parsed.events);
        } else if (isLiveEventMessage(parsed)) {
          appendLiveEvent(getLiveEventPayload(parsed));
        }
      } catch {
        // skip
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
