"use client";

import Image from "next/image";
interface StatCardProps {
  label: string;
  value: string;
  change: number;
  type: "%" | "x";
}

interface AthleteStatsCardsProps {
  indexPrice: number;
  indexPriceChange: number;
  leagueRank: number;
  leagueRankChange: number;
  performance: number;
  performanceChange: number;
  marketIndex: number;
  marketIndexChange: number;
}

function StatCard({ label, value, change, type }: StatCardProps) {
  const isPositive = change >= 0;

  return (
    <div className="bg-elevation-card flex flex-1 flex-col gap-[24px] rounded-[14px] p-[16px] whitespace-nowrap sm:gap-[32px] sm:p-[18px] md:gap-[46px] md:p-[20px]">
      <p className="text-text-secondary text-[12px] font-medium sm:text-[14px]">
        {label}
      </p>
      <span className="flex flex-row items-center gap-1">
        <h1 className="text-text-primary text-[24px] font-medium sm:text-[28px] md:text-[32px]">
          {value}
        </h1>
        {isPositive ? (
          <Image
            src="/icons/arrow_up.png"
            alt="arrow-up"
            width={12}
            height={16}
          />
        ) : (
          <Image
            src="/icons/arrow_down.png"
            alt="arrow-down"
            width={12}
            height={16}
          />
        )}
        <p
          className={`text-[12px] font-medium sm:text-[14px] ${isPositive ? "text-light-green" : "text-base-red"}`}
        >
          {change}
        </p>
      </span>
    </div>
  );
}

export default function AthleteStatsCards({
  indexPrice,
  indexPriceChange,
  leagueRank,
  leagueRankChange,
  performance,
  performanceChange,
  marketIndex,
  marketIndexChange,
}: AthleteStatsCardsProps) {
  return (
    <div className="flex w-full flex-row flex-wrap gap-[12px] sm:gap-[16px]">
      <StatCard
        label="League Rank"
        value={`#${leagueRank}`}
        change={leagueRankChange}
        type="%"
      />
      <StatCard
        label="Performance"
        value={`${performance.toFixed(1)}%`}
        change={performanceChange}
        type="%"
      />
      <StatCard
        label="Narrative Multiple"
        value={`${marketIndex}x`}
        change={marketIndexChange}
        type="x"
      />
    </div>
  );
}
