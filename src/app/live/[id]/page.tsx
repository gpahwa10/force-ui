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
import { getTeamByName } from "@/lib/data/athletes-bank";
import { getGameById, getTeamDataById } from "@/lib/data/today-games";

export default function LivePage() {
  const params = useParams();
  const gameId = params.id as string;
  const game = getGameById(gameId);
  const dispatch = useAppDispatch();

  if (!game) {
    return <NotFound title="404" message="Game not found" />;
  }

  // Get team data for the game
  const team1 = getTeamDataById(gameId, game.team1Id);
  const team2 = getTeamDataById(gameId, game.team2Id);

  if (!team1 || !team2) {
    return <NotFound title="404" message="Team data not found" />;
  }

  // Calculate spread (difference between scores)
  const spread = team1.score - team2.score;
  const spreadText = spread >= 0
    ? `${team1.name.substring(0, 3).toUpperCase()} -${Math.abs(spread).toFixed(1)}`
    : `${team2.name.substring(0, 3).toUpperCase()} -${Math.abs(spread).toFixed(1)}`;

  // Calculate projected final (simple projection based on current pace)
  const projectedTeam1 = Math.round(team1.score * 1.13); // Rough projection
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
            thumbnail={game.thumbnail}
            team1={team1}
            team2={team2}
          />
          <LiveInfoSection
            status={game.status}
            team1={team1}
            team2={team2}
            onTradeClick={handleTradeClick}
          />
          <Separator />
          <LiveStatsSection
            volume={game.volume}
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
