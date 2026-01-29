"use client";

import AthleteStatsCards from "@/components/common/athlete-stats-cards";

interface TeamStatsSectionProps {
  indexPrice: number;
  indexPriceChange: number;
  leagueRank: number;
  leagueRankChange: number;
  performance: number;
  performanceChange: number;
  marketIndex: number;
  marketIndexChange: number;
}

export default function TeamStatsSection({
  indexPrice,
  indexPriceChange,
  leagueRank,
  leagueRankChange,
  performance,
  performanceChange,
  marketIndex,
  marketIndexChange,
}: TeamStatsSectionProps) {
  return (
    <section id="team-stats">
      <div className="max-w-global border-border-secondary mx-auto w-full border-x">
        <div className="px-global pb-section-md">
          <div className="flex w-full justify-center">
            <div className="w-full">
              <AthleteStatsCards
                indexPrice={indexPrice}
                indexPriceChange={indexPriceChange}
                leagueRank={leagueRank}
                leagueRankChange={leagueRankChange}
                performance={performance}
                performanceChange={performanceChange}
                marketIndex={marketIndex}
                marketIndexChange={marketIndexChange}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

