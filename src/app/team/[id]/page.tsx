"use client";

import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { getTeamById } from "@/lib/data/athletes-bank";
import NotFound from "@/components/common/not-found";
import TeamHeroSection from "@/components/team-page/sections/team-hero-section";
import TeamStatsSection from "@/components/team-page/sections/team-stats-section";
import TeamChartSection from "@/components/team-page/sections/team-chart-section";
import TeamPositionsTableSection from "@/components/team-page/sections/team-positions-table-section";

export default function TeamPage() {
  const params = useParams();
  const teamId = params.id as string;

  const team = getTeamById(teamId);

  // Mock data for team stats - in production, this would come from an API
  const teamStats = {
    indexPrice: 12.45,
    indexPriceChange: 3.0,
    leagueRank: 27,
    leagueRankChange: 3.0,
    performance: 80.6,
    performanceChange: 31,
    marketIndex: 1.8,
    marketIndexChange: 31,
    currentPrice: 12.45,
  };

  if (!team) {
    return <NotFound title="404" message="Team not found" />;
  }

  const handlePlaceOrder = (
    type: "long" | "short",
    orderSize: number,
    leverage: number,
  ) => {
    // Order placement logic - dialogs are handled by TradingPanel component
  };

  const handleFollow = () => {
    // Follow team logic
  };

  const handleNotify = () => {
    // Notification logic
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="team"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="pt-header min-h-screen w-full">
          {/* Main Content */}
          <div className="w-full">
            <div className="flex w-full flex-col">
              <TeamHeroSection
                team={team}
                indexPrice={teamStats.indexPrice}
                percentile={91}
                performance={teamStats.performance}
                marketIndex={teamStats.marketIndex}
                currentPrice={teamStats.currentPrice}
                onFollow={handleFollow}
                onNotify={handleNotify}
                onPlaceOrder={handlePlaceOrder}
              />
              <TeamStatsSection
                indexPrice={teamStats.indexPrice}
                indexPriceChange={teamStats.indexPriceChange}
                leagueRank={teamStats.leagueRank}
                leagueRankChange={teamStats.leagueRankChange}
                performance={teamStats.performance}
                performanceChange={teamStats.performanceChange}
                marketIndex={teamStats.marketIndex}
                marketIndexChange={teamStats.marketIndexChange}
              />
              <TeamChartSection />
              <TeamPositionsTableSection first="Forwards" second="Backwards" />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
