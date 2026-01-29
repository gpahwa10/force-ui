"use client";

import LeaderboardHeader from "./leaderboard-header";
import LeaderboardRow from "./leaderboard-row";
import { useState, useMemo } from "react";
import {
  getRandomAthletes,
  getTeamById,
  type ExtendedAthleteData,
} from "@/lib/data/athletes-bank";
import Pagination from "../common/pagination";
import { Table, TableHeader, TableBody } from "@/components/ui/table";
import FilterPopover from "../common/filter-popover";

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
  athleteImage?: string;
};

// Generate leaderboard rows from athletes
const generateLeaderboardRowsFromAthletes = (
  athletes: ExtendedAthleteData[],
): LeaderboardRowT[] => {
  const experienceLevels = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"];

  return athletes.map((athlete, index) => {
    const team = getTeamById(athlete.teamId);
    const rank = index + 1;
    const rankType =
      rank === 1
        ? "gold"
        : rank === 2
          ? "silver"
          : rank === 3
            ? "bronze"
            : "default";

    // Generate random PnL data
    const pnl24hValue = (Math.random() * 200 - 50).toFixed(2);
    const pnl24hPositive = parseFloat(pnl24hValue) >= 0;
    const pnl24hPercent = (Math.random() * 30 - 10).toFixed(1);
    const totalPnl = (Math.random() * 1000 + 100).toFixed(2);
    const openPositions = Math.floor(Math.random() * 10 + 1).toString();
    const winRate = (Math.random() * 40 + 50).toFixed(0);
    const experience =
      experienceLevels[Math.floor(Math.random() * experienceLevels.length)];

    return {
      rank,
      rankType,
      username: athlete.name,
      pnl24h: `${pnl24hPositive ? "+" : ""}$${pnl24hValue}`,
      pnl24hPercent: `${parseFloat(pnl24hPercent) >= 0 ? "+" : ""}${pnl24hPercent}%`,
      pnl24hPositive,
      totalPnl: `$${totalPnl}`,
      openPositions,
      winRate: `${winRate}%`,
      experience,
      teamLogo: team?.logoUrl || "/images/teams/lakers.png",
      teamName: team?.abbreviation || "LAL",
      athleteImage: athlete.image,
    };
  });
};

// Get initial athletes for leaderboard
const initialAthletes = getRandomAthletes(10, false);
const defaultRows = generateLeaderboardRowsFromAthletes(initialAthletes);

export default function LeaderboardTableCard({
  rows = defaultRows,
}: {
  rows?: LeaderboardRowT[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const totalPages = 12;

  // Filter rows based on search query
  const filteredRows = useMemo(() => {
    if (!searchQuery.trim()) {
      return rows;
    }
    const query = searchQuery.toLowerCase();
    return rows.filter(
      (row) =>
        row.username.toLowerCase().includes(query) ||
        row.teamName.toLowerCase().includes(query),
    );
  }, [rows, searchQuery]);

  const renderPageNumbers = () => {
    const pages = [];

    // Always show first page
    pages.push(
      <button
        key={1}
        onClick={() => setCurrentPage(1)}
        className={`flex h-7 w-7 items-center justify-center gap-1 rounded-lg px-2 py-2 ${
          currentPage === 1 ? "bg-elevation-bg" : ""
        }`}
      >
        <span
          className={`text-xs leading-3 font-medium tracking-[-0.1px] ${
            currentPage === 1 ? "text-text-primary" : "text-text-secondary"
          }`}
        >
          1
        </span>
      </button>,
    );

    // Show pages 2, 3, 4
    for (let i = 2; i <= 4; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`flex h-7 w-7 items-center justify-center gap-1 rounded-lg px-2 py-2 ${
            currentPage === i ? "bg-elevation-bg" : ""
          }`}
        >
          <span
            className={`text-xs leading-3 font-medium tracking-[-0.1px] ${
              currentPage === i ? "text-text-primary" : "text-text-secondary"
            }`}
          >
            {i}
          </span>
        </button>,
      );
    }

    // Ellipsis
    pages.push(
      <div
        key="ellipsis"
        className="flex h-7 w-7 items-center justify-center gap-1 rounded-lg px-2 py-2"
      >
        <span className="text-text-secondary text-xs leading-3 font-medium tracking-[-0.1px]">
          ...
        </span>
      </div>,
    );

    // Last page
    pages.push(
      <button
        key={totalPages}
        onClick={() => setCurrentPage(totalPages)}
        className={`flex h-7 w-7 items-center justify-center gap-1 rounded-lg px-2 py-2 ${
          currentPage === totalPages ? "bg-elevation-bg" : ""
        }`}
      >
        <span
          className={`text-xs leading-3 font-medium tracking-[-0.1px] ${
            currentPage === totalPages
              ? "text-text-primary"
              : "text-text-secondary"
          }`}
        >
          {totalPages}
        </span>
      </button>,
    );

    return pages;
  };

  return (
    <div className="bg-elevation-card flex flex-col items-start gap-3 self-stretch overflow-hidden rounded-[20px] px-4 pt-1 pb-3 sm:gap-5 md:px-5">
      {/* Header with Search and Filter */}
      <div className="flex flex-col items-stretch justify-between self-stretch sm:flex-row sm:items-center">
        <div className="flex items-center gap-2.5 py-5">
          <span className="text-text-primary text-[13px] leading-[13px] font-medium tracking-[-0.1px]">
            Leaderboard Table
          </span>
        </div>
        <div className="flex flex-1 items-center justify-end gap-2">
          {/* Search Input */}
          <div className="bg-elevation-bg flex h-8 flex-1 shrink-0 items-center gap-1 overflow-hidden rounded-full px-3 py-1.5 sm:max-w-[204px]">
            <div className="flex items-center gap-1">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path
                  d="M13.125 13.125L9.375 9.375M1.875 6.25C1.875 6.82453 1.98816 7.39344 2.20803 7.92424C2.42789 8.45504 2.75015 8.93734 3.15641 9.34359C3.56266 9.74985 4.04496 10.0721 4.57576 10.292C5.10656 10.5118 5.67547 10.625 6.25 10.625C6.82453 10.625 7.39344 10.5118 7.92424 10.292C8.45504 10.0721 8.93734 9.74985 9.34359 9.34359C9.74985 8.93734 10.0721 8.45504 10.292 7.92424C10.5118 7.39344 10.625 6.82453 10.625 6.25C10.625 5.67547 10.5118 5.10656 10.292 4.57576C10.0721 4.04496 9.74985 3.56266 9.34359 3.15641C8.93734 2.75015 8.45504 2.42789 7.92424 2.20803C7.39344 1.98816 6.82453 1.875 6.25 1.875C5.67547 1.875 5.10656 1.98816 4.57576 2.20803C4.04496 2.42789 3.56266 2.75015 3.15641 3.15641C2.75015 3.56266 2.42789 4.04496 2.20803 4.57576C1.98816 5.10656 1.875 5.67547 1.875 6.25Z"
                  stroke="currentColor"
                  className="text-text-secondary"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="text-text-secondary placeholder:text-text-secondary w-full bg-transparent text-xs leading-3 font-medium tracking-[-0.1px] placeholder:opacity-60 focus:outline-none"
              />
            </div>
          </div>
          {/* Filter Button */}
          <FilterPopover />
        </div>
      </div>

      {/* Table */}
      <div className="bg-elevation-bg flex flex-col items-start gap-1 self-stretch rounded-[14px] px-1">
        <div className="w-full overflow-x-auto">
          <Table className="w-full min-w-[717px] table-auto border-separate border-spacing-y-1">
            <TableHeader>
              <LeaderboardHeader />
            </TableHeader>
            <TableBody>
              {filteredRows.map((r, i) => (
                <LeaderboardRow key={i} {...r} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Pagination filteredPositions={filteredRows} positions={defaultRows} />
    </div>
  );
}
