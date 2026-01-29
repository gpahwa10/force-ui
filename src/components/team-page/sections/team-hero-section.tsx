"use client";

import TeamBanner from "@/components/team-page/team-banner";
import TradingPanel from "@/components/common/trading-panel";
import { Team } from "@/lib/data/athletes-bank";

interface TeamHeroSectionProps {
  team: Team;
  indexPrice: number;
  percentile: number;
  performance: number;
  marketIndex: number;
  currentPrice: number;
  onFollow?: () => void;
  onNotify?: () => void;
  onPlaceOrder: (
    type: "long" | "short",
    orderSize: number,
    leverage: number,
  ) => void;
}

export default function TeamHeroSection({
  team,
  indexPrice,
  percentile,
  performance,
  marketIndex,
  currentPrice,
  onFollow,
  onNotify,
  onPlaceOrder,
}: TeamHeroSectionProps) {
  return (
    <section id="team-hero">
      <div className="max-w-global border-border-secondary mx-auto w-full border-x">
        <div className="px-global py-section-md">
          <div className="flex w-full flex-col gap-4 lg:flex-row">
            <TeamBanner
              name={team.name}
              league={team.league}
              abbreviation={team.abbreviation}
              logoUrl={team.logoUrl}
              bgColor={team.bgColor}
              isLive={true}
              indexPrice={indexPrice}
              percentile={percentile}
              performance={performance}
              marketIndex={marketIndex}
              onFollow={onFollow}
              onNotify={onNotify}
            />
            <div className="flex h-full min-h-0 w-full flex-col overflow-y-hidden hover:overflow-y-auto lg:w-[360px]">
              <TradingPanel
                athleteName={team.name}
                currentPrice={currentPrice}
                onPlaceOrder={onPlaceOrder}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

