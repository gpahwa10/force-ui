"use client";

import React, { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface StatRow {
  name: string;
  description: string;
  weight: string;
  current: string;
  trend: number;
  isPositiveTrend: boolean;
}

interface IndexWeightTableProps {
  stats?: StatRow[];
}

interface MetricInfoData {
  metric: string;
  description: string;
  metricValue: string;
}

// Function to generate metric info data for a stat
const getMetricInfoData = (stat: StatRow): MetricInfoData[] => {
  return [
    {
      metric: "Baseline Value",
      description: "Average over last 30 days",
      metricValue: stat.current,
    },
    {
      metric: "Average (Period)",
      description: "Current selected time range",
      metricValue: stat.current,
    },
    {
      metric: "Standard Deviation (Period)",
      description: "Game-to-game scrolling volatility.",
      metricValue: `${stat.trend}%`,
    },
    {
      metric: "Relevance",
      description: "Strong impact on overall index score.",
      metricValue: `High(${stat.weight})`,
    },
  ];
};

// Default stats data
const defaultStats: StatRow[] = [
  {
    name: "Points per Game (PPG)",
    description: "Average points scored per game this season",
    weight: "45%",
    current: "27.4",
    trend: 3.27,
    isPositiveTrend: true,
  },
  {
    name: "Assists per Game (APG)",
    description: "Average assists per game — measures playmaking impact.",
    weight: "15%",
    current: "8.2",
    trend: 3.27,
    isPositiveTrend: true,
  },
  {
    name: "Rebounds per Game (RPG)",
    description: "Total rebounds per game (offensive + defensive).",
    weight: "15%",
    current: "7.6",
    trend: 3.2,
    isPositiveTrend: false,
  },
  {
    name: "Steals per Game (SPG)",
    description: "Defensive pressure and possession gains.",
    weight: "15%",
    current: "8.2",
    trend: 3.27,
    isPositiveTrend: true,
  },
  {
    name: "Blocks per Game (BPG)",
    description: "Defensive pressure and possession gains.",
    weight: "15%",
    current: "7.6",
    trend: 3.2,
    isPositiveTrend: false,
  },
  {
    name: "Turnovers per Game (TOPG)",
    description: "Defensive pressure and possession gains.",
    weight: "15%",
    current: "7.6",
    trend: 3.2,
    isPositiveTrend: false,
  },
  {
    name: "Field Goal % (FG%)",
    description: "Overall shooting efficiency.",
    weight: "15%",
    current: "7.6",
    trend: 3.27,
    isPositiveTrend: true,
  },
  {
    name: "3-Point % (3P%)",
    description: "Efficiency from beyond the arc.",
    weight: "15%",
    current: "7.6",
    trend: 3.27,
    isPositiveTrend: true,
  },
  {
    name: "Free Throw % (FT%)",
    description: "Reliability at the line.",
    weight: "15%",
    current: "7.6",
    trend: 3.2,
    isPositiveTrend: false,
  },
];

// Stats data for different tabs
const tabStats: Record<string, StatRow[]> = {
  "combined-scores": [
    {
      name: "Points per Game (PPG)",
      description: "Average points scored per game this season",
      weight: "45%",
      current: "27.4",
      trend: 3.27,
      isPositiveTrend: true,
    },
    {
      name: "Assists per Game (APG)",
      description: "Average assists per game — measures playmaking impact.",
      weight: "15%",
      current: "8.2",
      trend: 3.27,
      isPositiveTrend: true,
    },
    {
      name: "Rebounds per Game (RPG)",
      description: "Total rebounds per game (offensive + defensive).",
      weight: "15%",
      current: "7.6",
      trend: 3.2,
      isPositiveTrend: false,
    },
    {
      name: "Steals per Game (SPG)",
      description: "Defensive pressure and possession gains.",
      weight: "15%",
      current: "8.2",
      trend: 3.27,
      isPositiveTrend: true,
    },
    {
      name: "Blocks per Game (BPG)",
      description: "Defensive pressure and possession gains.",
      weight: "15%",
      current: "7.6",
      trend: 3.2,
      isPositiveTrend: false,
    },
    {
      name: "Turnovers per Game (TOPG)",
      description: "Defensive pressure and possession gains.",
      weight: "15%",
      current: "7.6",
      trend: 3.2,
      isPositiveTrend: false,
    },
    {
      name: "Field Goal % (FG%)",
      description: "Overall shooting efficiency.",
      weight: "15%",
      current: "7.6",
      trend: 3.27,
      isPositiveTrend: true,
    },
    {
      name: "3-Point % (3P%)",
      description: "Efficiency from beyond the arc.",
      weight: "15%",
      current: "7.6",
      trend: 3.27,
      isPositiveTrend: true,
    },
    {
      name: "Free Throw % (FT%)",
      description: "Reliability at the line.",
      weight: "15%",
      current: "7.6",
      trend: 3.2,
      isPositiveTrend: false,
    },
  ],
  offensive: [
    {
      name: "Points per Game (PPG)",
      description: "Average points scored per game this season",
      weight: "50%",
      current: "29.8",
      trend: 4.15,
      isPositiveTrend: true,
    },
    {
      name: "Assists per Game (APG)",
      description: "Average assists per game — measures playmaking impact.",
      weight: "20%",
      current: "9.5",
      trend: 2.85,
      isPositiveTrend: true,
    },
    {
      name: "Field Goal % (FG%)",
      description: "Overall shooting efficiency.",
      weight: "18%",
      current: "52.3",
      trend: 1.92,
      isPositiveTrend: true,
    },
    {
      name: "3-Point % (3P%)",
      description: "Efficiency from beyond the arc.",
      weight: "12%",
      current: "38.7",
      trend: 2.45,
      isPositiveTrend: true,
    },
    {
      name: "Free Throw % (FT%)",
      description: "Reliability at the line.",
      weight: "10%",
      current: "85.2",
      trend: 1.35,
      isPositiveTrend: false,
    },
    {
      name: "Offensive Rebounds (ORB)",
      description: "Second chance opportunities created.",
      weight: "8%",
      current: "2.4",
      trend: 0.85,
      isPositiveTrend: true,
    },
    {
      name: "Points in Paint (PIP)",
      description: "Scoring efficiency near the basket.",
      weight: "12%",
      current: "14.6",
      trend: 3.12,
      isPositiveTrend: true,
    },
  ],
  defensive: [
    {
      name: "Rebounds per Game (RPG)",
      description: "Total rebounds per game (offensive + defensive).",
      weight: "30%",
      current: "10.2",
      trend: 2.75,
      isPositiveTrend: false,
    },
    {
      name: "Steals per Game (SPG)",
      description: "Defensive pressure and possession gains.",
      weight: "25%",
      current: "1.8",
      trend: 0.45,
      isPositiveTrend: true,
    },
    {
      name: "Blocks per Game (BPG)",
      description: "Defensive pressure and possession gains.",
      weight: "20%",
      current: "1.2",
      trend: 0.25,
      isPositiveTrend: false,
    },
    {
      name: "Defensive Rating (DRTG)",
      description: "Points allowed per 100 possessions.",
      weight: "15%",
      current: "108.5",
      trend: 2.15,
      isPositiveTrend: true,
    },
    {
      name: "Defensive Rebounds (DRB)",
      description: "Controlling the defensive glass.",
      weight: "10%",
      current: "7.8",
      trend: 1.85,
      isPositiveTrend: false,
    },
    {
      name: "Opponent FG%",
      description: "Limiting opponent shooting efficiency.",
      weight: "12%",
      current: "42.3",
      trend: 1.65,
      isPositiveTrend: true,
    },
    {
      name: "Deflections per Game",
      description: "Disrupting opponent passing lanes.",
      weight: "8%",
      current: "3.4",
      trend: 0.55,
      isPositiveTrend: true,
    },
  ],
  impact: [
    {
      name: "Player Efficiency Rating (PER)",
      description: "Overall player performance metric.",
      weight: "35%",
      current: "24.8",
      trend: 2.95,
      isPositiveTrend: true,
    },
    {
      name: "Win Shares (WS)",
      description: "Estimated wins contributed by player.",
      weight: "25%",
      current: "8.5",
      trend: 1.75,
      isPositiveTrend: true,
    },
    {
      name: "Box Plus/Minus (BPM)",
      description: "Player's contribution per 100 possessions.",
      weight: "20%",
      current: "+6.2",
      trend: 1.45,
      isPositiveTrend: true,
    },
    {
      name: "Value Over Replacement (VORP)",
      description: "Value over replacement-level player.",
      weight: "15%",
      current: "4.8",
      trend: 0.95,
      isPositiveTrend: true,
    },
    {
      name: "Usage Rate (USG%)",
      description: "Percentage of team plays used by player.",
      weight: "10%",
      current: "28.5",
      trend: 1.25,
      isPositiveTrend: false,
    },
    {
      name: "True Shooting % (TS%)",
      description: "Shooting efficiency accounting for 2s, 3s, FTs.",
      weight: "12%",
      current: "58.7",
      trend: 2.35,
      isPositiveTrend: true,
    },
    {
      name: "Net Rating",
      description: "Team's point differential per 100 possessions.",
      weight: "8%",
      current: "+8.4",
      trend: 1.85,
      isPositiveTrend: true,
    },
  ],
};

export default function IndexWeightTable({
  stats,
}: IndexWeightTableProps) {
  const [activeTab, setActiveTab] = useState("combined-scores");

  // Use tab-specific stats or provided stats or default
  const displayStats = stats || tabStats[activeTab] || defaultStats;

  const tabs = [
    {
      label: "Combined Scores",
      value: "combined-scores",
    },
    {
      label: "Offensive",
      value: "offensive",
    },
    {
      label: "Defensive",
      value: "defensive",
    },
    {
      label: "Impact",
      value: "impact",
    },
  ];

  return (
    <div className="w-full rounded-[20px] bg-elevation-card p-5">
      {/* Tabs */}
      <div className="mb-5 flex flex-wrap items-start gap-1.5">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`flex items-center gap-1 rounded-lg px-2 py-2 transition-colors ${activeTab === tab.value
              ? "bg-bg-tertiary"
              : "hover:bg-bg-tertiary/50"
              }`}
          >
            <div
              className={`font-['Geist'] text-[12px] font-medium leading-[12px] tracking-[-0.1px] ${activeTab === tab.value
                ? "text-text-primary"
                : "text-text-secondary"
                }`}
            >
              {tab.label}
            </div>
          </button>
        ))}
      </div>

      {/* Table Container */}
      <div className="flex flex-col gap-1 rounded-[14px] bg-elevation-bg p-1">
        {/* Table Header */}
        <div className="flex items-center gap-3 rounded-[14px] px-3 py-2.5 sm:gap-5">
          <div className="w-full text-[11px] font-medium leading-[11px] tracking-[-0.11px] text-text-secondary sm:w-[278px]">
            Time
          </div>
          <div className="hidden flex-1 text-[11px] font-medium leading-[11px] tracking-[-0.11px] text-text-secondary sm:block">
            Play
          </div>
          <div className="hidden w-[100px] text-[11px] font-medium leading-[11px] tracking-[-0.11px] text-text-secondary sm:block">
            Weight
          </div>
          <div className="hidden w-[100px] text-[11px] font-medium leading-[11px] tracking-[-0.11px] text-text-secondary sm:block">
            Current
          </div>
          <div className="hidden w-[100px] text-[11px] font-medium leading-[11px] tracking-[-0.11px] text-text-secondary sm:block">
            Trend
          </div>
        </div>

        {/* Table Rows */}
        {displayStats.map((stat, index) => (
          <div
            key={index}
            className="flex min-h-[48px] flex-col gap-2 rounded-[10px] bg-elevation-card px-3 py-4 sm:flex-row sm:items-center sm:gap-5"
          >
            {/* Name */}
            <div className="w-full font-['Geist'] text-[12px] font-medium leading-[12px] tracking-[-0.1px] text-text-primary sm:w-[278px]">
              {stat.name}
            </div>

            {/* Description */}
            <div className="flex-1 font-['Geist'] text-[12px] font-medium leading-[12px] tracking-[-0.1px] text-text-secondary">
              {stat.description}
            </div>

            {/* Weight, Current, and Trend in a row on mobile */}
            <div className="flex items-center gap-3 sm:contents">
              {/* Weight */}
              <div className="font-['Geist'] text-[12px] font-medium leading-[12px] tracking-[-0.1px] text-text-primary sm:w-[100px]">
                <span className="text-text-secondary sm:hidden">Weight: </span>
                {stat.weight}
              </div>

              {/* Current */}
              <div className="font-['Geist'] text-[12px] font-medium leading-[12px] tracking-[-0.1px] text-text-primary sm:w-[100px]">
                <span className="text-text-secondary sm:hidden">Current: </span>
                {stat.current}
              </div>

              {/* Trend */}
              <div className="flex w-[100px] items-center gap-0.5">
                <div className="flex w-14 shrink-0 items-center gap-0.5">
                  {/* Arrow Icon */}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0"
                  >
                    {stat.isPositiveTrend ? (
                      <path
                        d="M6 2.5V9.5M6 2.5L9 5.5M6 2.5L3 5.5"
                        stroke="#20C26E"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    ) : (
                      <path
                        d="M6 9.5V2.5M6 9.5L9 6.5M6 9.5L3 6.5"
                        stroke="#E13F5E"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}
                  </svg>

                  {/* Percentage */}
                  <div
                    className={`font-['Geist'] text-[12px] font-medium leading-[12px] tracking-[-0.1px] ${stat.isPositiveTrend
                      ? "text-[#20C26E]"
                      : "text-[#E13F5E]"
                      }`}
                  >
                    {stat.trend}%
                  </div>
                </div>

                {/* Info Icon */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="ml-2 flex h-[16px] w-[16px] shrink-0 cursor-pointer items-center justify-center rounded-full">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0 text-text-secondary"
                      >
                        <path
                          d="M8.00033 14.6719C4.31833 14.6719 1.33366 11.6872 1.33366 8.00521C1.33227 6.25489 2.01929 4.57425 3.24639 3.32611C4.47349 2.07798 6.14222 1.3625 7.89231 1.33414C9.64239 1.30578 11.3334 1.96682 12.6003 3.17454C13.8672 4.38226 14.6083 6.03977 14.6637 7.78921L14.667 8.00521L14.6643 8.19187C14.5657 11.7872 11.6203 14.6719 8.00033 14.6719ZM7.99366 6.00521L8.07832 6.00054C8.24036 5.98127 8.3897 5.90324 8.49805 5.78123C8.6064 5.65923 8.66625 5.50172 8.66625 5.33854C8.66625 5.17537 8.6064 5.01786 8.49805 4.89585C8.38969 4.77385 8.24036 4.69582 8.07832 4.67654L8.00032 4.67188L7.91566 4.67654C7.75362 4.69582 7.60429 4.77385 7.49593 4.89585C7.38758 5.01786 7.32773 5.17537 7.32773 5.33854C7.32773 5.50172 7.38758 5.65923 7.49593 5.78123C7.60429 5.90324 7.75363 5.98127 7.91566 6.00054L7.99366 6.00521ZM8.00033 11.3385C8.16361 11.3385 8.32122 11.2786 8.44324 11.1701C8.56526 11.0616 8.64322 10.912 8.66233 10.7499L8.66699 10.6719L8.66699 8.00521L8.66232 7.92721C8.64305 7.76518 8.56502 7.61584 8.44301 7.50748C8.32101 7.39913 8.1635 7.33928 8.00032 7.33928C7.83715 7.33928 7.67964 7.39913 7.55763 7.50748C7.43563 7.61584 7.3576 7.76518 7.33832 7.92721L7.33366 8.00521L7.33366 10.6719L7.33832 10.7499C7.35743 10.912 7.43539 11.0616 7.55741 11.1701C7.67943 11.2786 7.83704 11.3385 8.00033 11.3385Z"
                          fill="currentColor"
                          opacity="0.4"
                        />
                      </svg>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="border-border-secondary text-text-primary bg-elevation-card [&>*[data-side]]:bg-elevation-card rounded-[10px] border p-4 text-[12px] leading-[100%] font-medium tracking-[-1%]">
                    <div className="flex flex-col gap-4">
                      <h4 className="text-text-primary">
                        {stat.name}
                      </h4>
                      {getMetricInfoData(stat).map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="flex flex-col gap-1"
                          >
                            <span className="text-text-secondary flex flex-row text-[12px] leading-none font-medium tracking-[0.28px]">
                              {item.metric}:{" "}
                              <p className="text-text-primary">
                                {item.metricValue}
                              </p>
                            </span>
                            <span className="text-text-secondary text-[12px] leading-none font-medium tracking-[0.28px]">
                              {item.description}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
