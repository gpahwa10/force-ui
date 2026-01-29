"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface MetricData {
  metric: string;
  weight: string;
  current: string | number;
  trend: number;
}

const metricsData: MetricData[] = [
  {
    metric: "Points per Game (PPG)",
    weight: "45%",
    current: "27.4",
    trend: 3.2,
  },
  {
    metric: "Assists per Game (APG)",
    weight: "15%",
    current: "8.2",
    trend: -5.32,
  },
  {
    metric: "Rebounds per Game (RPG)",
    weight: "15%",
    current: "7.8",
    trend: 3.2,
  },
  {
    metric: "Steals per Game (SPG)",
    weight: "10%",
    current: "7.8",
    trend: -5.32,
  },
  {
    metric: "Blocks per Game (BPG)",
    weight: "10%",
    current: "7.8",
    trend: 3.2,
  },
  {
    metric: "Turnovers per Game (TOPG)",
    weight: "10%",
    current: "7.8",
    trend: 3.2,
  },
  { metric: "Field Goal % (FG%)", weight: "10%", current: "7.8", trend: 3.2 },
  { metric: "3-Point % (3P%)", weight: "10%", current: "7.8", trend: 3.2 },
  { metric: "Free Throw % (FT%)", weight: "10%", current: "7.8", trend: 3.2 },
];

export default function IndexComponentsTable() {
  return (
    <div className="border-inactive overflow-hidden rounded-xl border bg-white md:rounded-2xl">
      {/* Wrapper for horizontal scroll on mobile */}
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Header */}
          <div className="border-inactive flex w-full flex-row border-b px-3 py-2.5 md:px-4 md:py-3">
            <div className="text-text-secondary w-[50%] text-[11px] font-medium tracking-[-1%] md:w-[70%] md:text-xs">
              Metric
            </div>
            <div className="text-text-secondary w-[17%] text-[11px] font-medium tracking-[-1%] md:w-[10%] md:text-xs">
              Weight
            </div>
            <div className="text-text-secondary w-[17%] text-[11px] font-medium tracking-[-1%] md:w-[10%] md:text-xs">
              Current
            </div>
            <div className="text-text-secondary w-[16%] text-[11px] font-medium tracking-[-1%] md:w-[10%] md:text-xs">
              Trend
            </div>
          </div>

          {/* Rows */}
          <div className="">
            {metricsData.map((metric, index) => {
              const isPositive = metric.trend >= 0;

              return (
                <div
                  key={index}
                  className="hover:bg-active-hover flex w-full flex-row px-3 py-3 transition-colors md:px-4 md:py-4"
                >
                  <div className="text-text-primary w-[50%] text-[13px] font-medium md:w-[70%] md:text-sm">
                    {metric.metric}
                  </div>
                  <div className="text-text-primary w-[17%] text-[13px] font-medium md:w-[10%] md:text-sm">
                    {metric.weight}
                  </div>
                  <div className="text-text-primary w-[17%] text-[13px] font-medium md:w-[10%] md:text-sm">
                    {metric.current}
                  </div>
                  <div
                    className={cn(
                      "flex w-[16%] flex-row items-center gap-px text-[13px] font-medium md:w-[10%] md:text-sm",
                      isPositive ? "text-success" : "text-error",
                    )}
                  >
                    {isPositive ? (
                      <Image
                        src="/icons/learn/green-arrow.svg"
                        alt="up-arrow"
                        width={12}
                        height={12}
                      />
                    ) : (
                      <Image
                        src="/icons/learn/red-arrow.svg"
                        alt="down-arrow"
                        width={12}
                        height={12}
                      />
                    )}
                    {metric.trend.toFixed(2)}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
