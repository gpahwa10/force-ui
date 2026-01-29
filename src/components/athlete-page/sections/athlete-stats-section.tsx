"use client";

import AthleteStatsCards from "@/components/common/athlete-stats-cards";
import { ExtendedAthleteData } from "@/lib/data/athletes-bank";

interface AthleteStatsSectionProps {
  athlete: ExtendedAthleteData;
  currentPrice: number;
}

export default function AthleteStatsSection({
  athlete,
  currentPrice,
}: AthleteStatsSectionProps) {
  return (
    <section id="athlete-stats">
      <div className="max-w-global border-border-secondary mx-auto w-full border-x">
        <div className="px-global pb-section-md">
          <div className="flex w-full justify-center">
            <div className="w-full">
              <AthleteStatsCards
                indexPrice={currentPrice * 0.12}
                indexPriceChange={athlete.change}
                leagueRank={athlete.rank || 15}
                leagueRankChange={athlete.change}
                performance={athlete.performance || 85}
                performanceChange={athlete.change}
                marketIndex={currentPrice * 0.02}
                marketIndexChange={athlete.change}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

