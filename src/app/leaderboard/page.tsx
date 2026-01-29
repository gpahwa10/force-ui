"use client";

import { useState } from "react";
import LeaderboardHeaderSection from "@/components/leaderboard/sections/leaderboard-header-section";
import MyStatsAndStatsCardsSection from "@/components/leaderboard/sections/my-stats-and-stats-cards-section";
import LeaderboardTableSection from "@/components/leaderboard/sections/leaderboard-table-section";

export default function LeaderboardPage() {
  const statCards = [
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

  const leaderboardRows = [
    {
      rank: 1,
      rankType: "gold" as const,
      username: "ShadowProfit",
      pnl24h: "+$72.14",
      pnl24hPercent: "+14.1%",
      pnl24hPositive: true,
      totalPnl: "$500.00",
      openPositions: "7",
      winRate: "88%",
      experience: "Bronze",
      teamLogo:
        "https://api.builder.io/api/v1/image/assets/TEMP/5a905c84044bb645c9a2489ccd10258988c83ddc?width=44",
      teamName: "LAL",
    },
    {
      rank: 2,
      rankType: "silver" as const,
      username: "ShadowProfit",
      pnl24h: "+$72.14",
      pnl24hPercent: "+14.1%",
      pnl24hPositive: true,
      totalPnl: "$500.00",
      openPositions: "7",
      winRate: "88%",
      experience: "Bronze",
      teamLogo:
        "https://api.builder.io/api/v1/image/assets/TEMP/5a905c84044bb645c9a2489ccd10258988c83ddc?width=44",
      teamName: "LAL",
    },
    {
      rank: 3,
      rankType: "bronze" as const,
      username: "ShadowProfit",
      pnl24h: "+$72.14",
      pnl24hPercent: "+14.1%",
      pnl24hPositive: true,
      totalPnl: "$500.00",
      openPositions: "7",
      winRate: "88%",
      experience: "Bronze",
      teamLogo:
        "https://api.builder.io/api/v1/image/assets/TEMP/5a905c84044bb645c9a2489ccd10258988c83ddc?width=44",
      teamName: "LAL",
    },
    {
      rank: 4,
      rankType: "default" as const,
      username: "ShadowProfit",
      pnl24h: "+$72.14",
      pnl24hPercent: "+14.1%",
      pnl24hPositive: true,
      totalPnl: "$500.00",
      openPositions: "7",
      winRate: "88%",
      experience: "Bronze",
      teamLogo:
        "https://api.builder.io/api/v1/image/assets/TEMP/5a905c84044bb645c9a2489ccd10258988c83ddc?width=44",
      teamName: "LAL",
    },
    {
      rank: 6,
      rankType: "default" as const,
      username: "ShadowProfit",
      pnl24h: "+$72.14",
      pnl24hPercent: "+14.1%",
      pnl24hPositive: true,
      totalPnl: "$500.00",
      openPositions: "7",
      winRate: "88%",
      experience: "Bronze",
      teamLogo:
        "https://api.builder.io/api/v1/image/assets/TEMP/5a905c84044bb645c9a2489ccd10258988c83ddc?width=44",
      teamName: "LAL",
    },
    {
      rank: 7,
      rankType: "default" as const,
      username: "ShadowProfit",
      pnl24h: "+$72.14",
      pnl24hPercent: "+14.1%",
      pnl24hPositive: true,
      totalPnl: "$500.00",
      openPositions: "7",
      winRate: "88%",
      experience: "Bronze",
      teamLogo:
        "https://api.builder.io/api/v1/image/assets/TEMP/5a905c84044bb645c9a2489ccd10258988c83ddc?width=44",
      teamName: "LAL",
    },
    {
      rank: 8,
      rankType: "default" as const,
      username: "ShadowProfit",
      pnl24h: "+$72.14",
      pnl24hPercent: "+14.1%",
      pnl24hPositive: true,
      totalPnl: "$500.00",
      openPositions: "7",
      winRate: "88%",
      experience: "Bronze",
      teamLogo:
        "https://api.builder.io/api/v1/image/assets/TEMP/5a905c84044bb645c9a2489ccd10258988c83ddc?width=44",
      teamName: "LAL",
    },
    {
      rank: 9,
      rankType: "default" as const,
      username: "ShadowProfit",
      pnl24h: "+$72.14",
      pnl24hPercent: "+14.1%",
      pnl24hPositive: true,
      totalPnl: "$500.00",
      openPositions: "7",
      winRate: "88%",
      experience: "Bronze",
      teamLogo:
        "https://api.builder.io/api/v1/image/assets/TEMP/5a905c84044bb645c9a2489ccd10258988c83ddc?width=44",
      teamName: "LAL",
    },
    {
      rank: 10,
      rankType: "default" as const,
      username: "ShadowProfit",
      pnl24h: "+$72.14",
      pnl24hPercent: "+14.1%",
      pnl24hPositive: true,
      totalPnl: "$500.00",
      openPositions: "7",
      winRate: "88%",
      experience: "Bronze",
      teamLogo:
        "https://api.builder.io/api/v1/image/assets/TEMP/5a905c84044bb645c9a2489ccd10258988c83ddc?width=44",
      teamName: "LAL",
    },
  ];

  // Time Range options
  const [selectedTimeRange, setSelectedTimeRange] = useState("all");

  // Sort By options
  const [selectedSortBy, setSelectedSortBy] = useState("pnl");

  return (
    <div className="pt-header flex w-full flex-col items-stretch">
      <LeaderboardHeaderSection
        selectedTimeRange={selectedTimeRange}
        selectedSortBy={selectedSortBy}
        onTimeRangeChange={setSelectedTimeRange}
        onSortByChange={setSelectedSortBy}
      />
      <MyStatsAndStatsCardsSection statCards={statCards} />
      <LeaderboardTableSection rows={leaderboardRows} />
    </div>
  );
}
