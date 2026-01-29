"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LeaderboardHeaderSectionProps {
  selectedTimeRange?: string;
  selectedSortBy?: string;
  onTimeRangeChange?: (value: string) => void;
  onSortByChange?: (value: string) => void;
}

export default function LeaderboardHeaderSection({
  selectedTimeRange: externalTimeRange,
  selectedSortBy: externalSortBy,
  onTimeRangeChange,
  onSortByChange,
}: LeaderboardHeaderSectionProps) {
  const [internalTimeRange, setInternalTimeRange] = useState("all");
  const [internalSortBy, setInternalSortBy] = useState("pnl");

  const selectedTimeRange = externalTimeRange ?? internalTimeRange;
  const selectedSortBy = externalSortBy ?? internalSortBy;

  const handleTimeRangeChange = (value: string) => {
    if (onTimeRangeChange) {
      onTimeRangeChange(value);
    } else {
      setInternalTimeRange(value);
    }
  };

  const handleSortByChange = (value: string) => {
    if (onSortByChange) {
      onSortByChange(value);
    } else {
      setInternalSortBy(value);
    }
  };

  const timeRangeOptions = [
    { value: "24h", label: "24H" },
    { value: "7d", label: "7D" },
    { value: "30d", label: "30D" },
    { value: "all", label: "All Time" },
  ];

  const sortByOptions = [
    { value: "pnl", label: "PnL" },
    { value: "rank", label: "Rank" },
    { value: "winrate", label: "Win Rate" },
    { value: "positions", label: "Open Positions" },
  ];

  return (
    <section id="leaderboard-header">
      <div className="max-w-global border-border-secondary mx-auto w-full border-x">
        <div className="py-section-md px-global">
          <div className="flex w-full flex-wrap items-center justify-between gap-4">
            <h1 className="text-text-primary text-xl leading-6 font-medium tracking-[-0.6px] sm:text-2xl">
              Leaderboard
            </h1>
            <div className="flex items-start gap-1.5">
              {/* Time Range Dropdown */}
              <Select value={selectedTimeRange} onValueChange={handleTimeRangeChange}>
                <SelectTrigger className="">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  {timeRangeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* Sort By Dropdown */}
              <Select value={selectedSortBy} onValueChange={handleSortByChange}>
                <SelectTrigger className="">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  {sortByOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

