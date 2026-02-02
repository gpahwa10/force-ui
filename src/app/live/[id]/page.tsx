"use client";

import { AnimatePresence, motion } from "motion/react";
import { useParams } from "next/navigation";
import LiveAthletesTable from "@/components/common/sections/live-athletes-table";
import NotFound from "@/components/common/not-found";
import Trending from "@/components/common/sections/trending";
import Separator from "@/components/common/ui/separator";
import LiveTabs from "@/components/live-page/live-tabs";
import LiveBannerSection from "@/components/live-page/sections/live-banner-section";
import LiveInfoSection from "@/components/live-page/sections/live-info-section";
import LiveStatsSection from "@/components/live-page/sections/live-stats-section";
import ScoreBreakdownSection from "@/components/live-page/sections/score-breakdown-section";
import OrderbookSection from "@/components/live-page/sections/orderbook-section";
import { useAppDispatch } from "@/lib/store/hooks";
import { openTradeDialog } from "@/lib/store/slices/tradeDialogSlice";
import { getTeamByName, getTeamById } from "@/lib/data/athletes-bank";
import { getGameById, getTeamDataById, type GameTeamData } from "@/lib/data/today-games";
import { useLiveData } from "@/components/providers/live-data-provider";
import { useEffect, useMemo } from "react";

const DEFAULT_THUMBNAIL = "/icons/matches/match1.svg";

function liveStateToTeamData(
  teamId: string,
  points: number,
  teamName?: string
): GameTeamData {
  const team = getTeamById(teamId);
  return {
    id: teamId,
    slug: teamId,
    score: points,
    icon: team?.logoUrl ?? "/images/teams/lakers.png",
    name: teamName ?? team?.name ?? teamId,
    price: "$—",
    change: 0,
  };
}

export default function LivePage() {
  const params = useParams();
  const gameId = params.id as string;
  const dispatch = useAppDispatch();
  const { setGameId, currentGameState, gameStates } = useLiveData();

  useEffect(() => {
    setGameId(gameId);
    return () => setGameId(null);
  }, [gameId, setGameId]);

  const { game, team1, team2, thumbnail, status, volume } = useMemo(() => {
    const livePayload = gameId ? gameStates.get(gameId) ?? currentGameState : null;
    if (livePayload && livePayload.gameId === gameId) {
      const teamIds = Object.keys(livePayload.teams);
      if (teamIds.length >= 2) {
        const [id1, id2] = teamIds;
        const t1 = livePayload.teams[id1];
        const t2 = livePayload.teams[id2];
        if (t1 != null && t2 != null) {
          return {
            game: { id: gameId, thumbnail: DEFAULT_THUMBNAIL } as { id: string; thumbnail: string },
            team1: liveStateToTeamData(id1, t1.points ?? 0, t1.team_name),
            team2: liveStateToTeamData(id2, t2.points ?? 0, t2.team_name),
            thumbnail: DEFAULT_THUMBNAIL,
            status: "Live",
            volume: "$—",
          };
        }
      }
    }
    const staticGame = getGameById(gameId);
    if (!staticGame) {
      return { game: null, team1: null, team2: null, thumbnail: "", status: "", volume: "" };
    }
    const t1 = getTeamDataById(gameId, staticGame.team1Id);
    const t2 = getTeamDataById(gameId, staticGame.team2Id);
    return {
      game: staticGame,
      team1: t1 ?? undefined,
      team2: t2 ?? undefined,
      thumbnail: staticGame.thumbnail,
      status: staticGame.status,
      volume: staticGame.volume,
    };
  }, [gameId, currentGameState, gameStates]);

  if (!game || !team1 || !team2) {
    return <NotFound title="404" message="Game not found" />;
  }

  // Calculate spread (difference between scores)
  const spread = team1.score - team2.score;
  const spreadText = spread >= 0
    ? `${team1.name.substring(0, 3).toUpperCase()} -${Math.abs(spread).toFixed(1)}`
    : `${team2.name.substring(0, 3).toUpperCase()} -${Math.abs(spread).toFixed(1)}`;

  const projectedTeam1 = Math.round(team1.score * 1.13);
  const projectedTeam2 = Math.round(team2.score * 1.13);
  const projectedFinal = `${team1.name.substring(0, 3).toUpperCase()} ${projectedTeam1} - ${projectedTeam2} ${team2.name.substring(0, 3).toUpperCase()}`;

  const handleTradeClick = (
    teamName: string,
    teamPrice: string,
    teamChange: number,
    type: "long" | "short",
  ) => {
    const team = getTeamByName(teamName);
    if (team) {
      dispatch(
        openTradeDialog({
          tradeType: type,
          mode: "team",
          id: team.id,
          teamPrice: teamPrice,
          teamChange: teamChange,
        }),
      );
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="live"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <main className="pt-header">
          <LiveBannerSection
            thumbnail={thumbnail}
            team1={team1}
            team2={team2}
          />
          <LiveInfoSection
            status={status}
            team1={team1}
            team2={team2}
            onTradeClick={handleTradeClick}
          />
          <Separator />
          <LiveStatsSection
            volume={volume}
            spreadText={spreadText}
            projectedFinal={projectedFinal}
          />
          <Separator />
          <ScoreBreakdownSection />
          <Separator />
          <LiveTabs />
          <Separator />
          <OrderbookSection team1={team1} team2={team2} />
          <Separator />
          <Trending />
          <Separator />
          <LiveAthletesTable />
        </main>
      </motion.div>
    </AnimatePresence>
  );
}
