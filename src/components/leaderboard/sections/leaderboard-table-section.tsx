"use client";

import LeaderboardTableCard from "@/components/leaderboard/leaderboard-table-card";

type LeaderboardRowT = {
  rank: number;
  rankType: "gold" | "silver" | "bronze" | "default";
  username: string;
  pnl24h: string;
  pnl24hPercent: string;
  pnl24hPositive: boolean;
  totalPnl: string;
  openPositions: string;
  winRate: string;
  experience: string;
  teamLogo: string;
  teamName: string;
};

interface LeaderboardTableSectionProps {
  rows: LeaderboardRowT[];
}

export default function LeaderboardTableSection({
  rows,
}: LeaderboardTableSectionProps) {
  return (
    <section id="leaderboard-table">
      <div className="max-w-global border-border-secondary mx-auto w-full border-x">
        <div className="py-section-md px-global">
          <LeaderboardTableCard rows={rows} />
        </div>
      </div>
    </section>
  );
}

