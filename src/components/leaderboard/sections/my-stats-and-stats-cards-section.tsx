"use client";

import MyStatsCard from "@/components/leaderboard/my-stats-card";
import StatCard from "@/components/leaderboard/stat-card";

interface StatCardData {
  title: string;
  value: string;
  percent: string;
  isPositive: boolean;
}

interface MyStatsAndStatsCardsSectionProps {
  statCards?: StatCardData[];
}

const defaultStatCards: StatCardData[] = [
  {
    title: "Total Open Interest",
    value: "$18.4",
    percent: "2.84",
    isPositive: true,
  },
  {
    title: "Funding Rate (Avg)",
    value: "+0.012%",
    percent: "2.84",
    isPositive: true,
  },
  {
    title: "Avg Trade Size",
    value: "$1,420",
    percent: "2.84",
    isPositive: true,
  },
  {
    title: "Total Trades (24H)",
    value: "31,782",
    percent: "2.84",
    isPositive: true,
  },
];

export default function MyStatsAndStatsCardsSection({
  statCards = defaultStatCards,
}: MyStatsAndStatsCardsSectionProps) {
  return (
    <section id="my-stats-and-stats-cards">
      <div className="max-w-global border-border-secondary mx-auto w-full border-x">
        <div className="py-section-md px-global">
          <div className="flex w-full flex-col items-start gap-4">
            {/* My Stats and 4 Stats Cards Row */}
            <div className="flex w-full items-start gap-4">
              <MyStatsCard />
            </div>

            {/* 4 Stats Cards */}
            <div className="flex w-full flex-wrap items-center justify-center gap-4 overflow-hidden">
              {statCards.map((card, index) => (
                <StatCard key={index} {...card} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

