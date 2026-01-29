"use client";

import { currencyFormatter } from "@/lib/formatter";
import { useState, useMemo } from "react";
import { Line, Area, Bar } from "recharts";
import { TimeRangeSelector, type TimeRange } from "@/components/common/time-range-selector";
import { BaseChart } from "@/components/common/base-chart";

type PnLOverviewChartProps = {
  data?: ChartDataPointT[];
  cumulativePnL?: number;
};

type ChartDataPointT = {
  index: number;
  date: string;
  dateLabel: string;
  dateObj: Date;
  dailyPnL: number;
  cumulativePnL: number;
};


// Tooltip props interface
interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey?: string;
    payload: ChartDataPointT;
  }>;
}

// Format date for tooltip: "12 Aug, 8:00 PM"
const formatTooltipDate = (date: Date): string => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const displayHour = hours > 12 ? hours - 12 : hours || 12;
  const ampm = hours >= 12 ? "PM" : "AM";
  const minutesStr = minutes.toString().padStart(2, "0");

  return `${day} ${month}, ${displayHour}:${minutesStr} ${ampm}`;
};

// Custom tooltip component
const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const data = payload[0]?.payload as ChartDataPointT | undefined;
  if (!data) {
    return null;
  }

  const dailyPnLValue =
    payload.find((p) => p.dataKey === "dailyPnL")?.value ?? data.dailyPnL;
  const cumulativePnLValue =
    payload.find((p) => p.dataKey === "cumulativePnL")?.value ??
    data.cumulativePnL;
  const isPositive = dailyPnLValue >= 0;

  return (
    <div className="w-fit min-w-[133px] rounded-lg bg-white dark:bg-[#262626] px-3 py-2 text-xs shadow-lg">
      <p className="mb-2 text-black dark:text-white">
        {formatTooltipDate(data.dateObj)}
      </p>
      <div className="space-y-1">
        {dailyPnLValue !== undefined && (
          <div className="flex items-center gap-2">
            <div
              className={`flex h-3 w-3 items-center justify-center rounded-full ${
                isPositive ? "bg-[#25AB7A]" : "bg-[#E13F5E]"
              }`}
            >
              <div className="h-1.5 w-1.5 rounded-full bg-white dark:bg-white"></div>
            </div>
            <p className="text-black dark:text-white">
              <span className="text-[#7E7E8C] dark:text-white/60">Daily:</span>{" "}
              {currencyFormatter.format(dailyPnLValue)}
            </p>
          </div>
        )}
        {cumulativePnLValue !== undefined && (
          <div className="flex items-center gap-2">
            <div className="bg-[#375dfb] flex h-3 w-3 items-center justify-center rounded-full">
              <div className="h-1.5 w-1.5 rounded-full bg-white dark:bg-white"></div>
            </div>
            <p className="text-black dark:text-white">
              <span className="text-[#7E7E8C] dark:text-white/60">
                Cumulative:
              </span>{" "}
              {currencyFormatter.format(cumulativePnLValue)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Generate mock data based on time range
const generateMockData = (timeRange: TimeRange): ChartDataPointT[] => {
  const data: ChartDataPointT[] = [];
  const now = new Date();

  let totalDataPoints: number;
  let intervalMinutes: number;
  let startDate: Date;

  // Configure data points based on time range
  // Increased data points to fill chart with bars of width 11
  switch (timeRange) {
    case "1H":
      totalDataPoints = 80; // Increased to fill chart
      intervalMinutes = 0.75; // Adjusted interval
      startDate = new Date(now.getTime() - 60 * 60 * 1000); // 1 hour ago
      break;
    case "6H":
      totalDataPoints = 90; // Increased to fill chart
      intervalMinutes = 4; // Adjusted interval
      startDate = new Date(now.getTime() - 6 * 60 * 60 * 1000); // 6 hours ago
      break;
    case "1D":
      totalDataPoints = 100; // Increased to fill chart
      intervalMinutes = 14.4; // Adjusted interval (1440 minutes / 100)
      startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 1 day ago
      break;
    case "1W":
      totalDataPoints = 110; // Increased to fill chart
      intervalMinutes = 91.6; // Adjusted interval (10080 minutes / 110)
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
      break;
    case "1M":
      totalDataPoints = 120; // Increased to fill chart
      intervalMinutes = 600; // Adjusted interval (30 days * 24 * 60 / 120 = 360 minutes = 6 hours)
      startDate = new Date(now);
      startDate.setDate(startDate.getDate() - 30);
      startDate.setHours(0, 0, 0, 0);
      break;
    case "ALL":
      totalDataPoints = 130; // Increased to fill chart
      intervalMinutes = 4032; // Adjusted interval (365 days * 24 * 60 / 130 ≈ 4032 minutes ≈ 2.8 days)
      startDate = new Date(now);
      startDate.setDate(startDate.getDate() - 365);
      startDate.setHours(0, 0, 0, 0);
      break;
    default:
      totalDataPoints = 80;
      intervalMinutes = 0.75;
      startDate = new Date(now.getTime() - 60 * 60 * 1000);
  }

  // Determine label interval to show more labels (6-8 labels for better visibility)
  const numLabels = Math.min(8, Math.max(4, Math.floor(totalDataPoints / 3)));
  const labelInterval = Math.max(
    1,
    Math.floor((totalDataPoints - 1) / numLabels),
  );

  // Start cumulative PnL around 10K-15K, target range 10K-50K
  let cumulative = 10000 + Math.random() * 5000;
  const targetMax = 50000;
  const targetMin = 10000;
  const targetRange = targetMax - targetMin;

  for (let i = 0; i < totalDataPoints; i++) {
    let currentDate: Date;
    if (timeRange === "1M" || timeRange === "ALL") {
      // For daily/4-hourly data, add days/hours
      currentDate = new Date(startDate);
      if (timeRange === "ALL") {
        currentDate.setDate(startDate.getDate() + i);
      } else {
        currentDate.setHours(startDate.getHours() + i * 4);
      }
    } else {
      currentDate = new Date(
        startDate.getTime() + i * intervalMinutes * 60 * 1000,
      );
    }

    const progress = i / (totalDataPoints - 1);

    let dateString: string = "";
    let dateLabel: string = "";

    // Format date string and label based on time range
    if (timeRange === "1H" || timeRange === "6H" || timeRange === "1D") {
      // Show time format: HH:MM AM/PM
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const displayHour = hours > 12 ? hours - 12 : hours || 12;
      const ampm = hours >= 12 ? "PM" : "AM";
      dateString = `${displayHour}:${minutes.toString().padStart(2, "0")} ${ampm}`;
      // Show label at intervals, but exclude the last data point
      if (i % labelInterval === 0 && i < totalDataPoints - 1) {
        dateLabel = dateString;
      }
    } else if (
      timeRange === "1W" ||
      timeRange === "1M" ||
      timeRange === "ALL"
    ) {
      // For 1W, 1M, ALL: show MM/DD format (days only, no time)
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      dateString = `${month.toString().padStart(2, "0")}/${day.toString().padStart(2, "0")}`;

      // For ALL, show month abbreviation for better readability
      if (timeRange === "ALL") {
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        dateString = `${monthNames[currentDate.getMonth()]}`;
      }

      // Show label at intervals, but exclude the last data point
      if (i % labelInterval === 0 && i < totalDataPoints - 1) {
        dateLabel = dateString;
      }
    } else {
      // Fallback: show MM/DD format
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      dateString = `${month.toString().padStart(2, "0")}/${day.toString().padStart(2, "0")}`;
    }

    // Generate daily PnL with good mix of positive and negative
    // Target cumulative should trend within 10K-50K range
    const targetCumulative =
      targetMin +
      progress * targetRange * (0.6 + Math.sin(progress * Math.PI * 2) * 0.2);
    const deviation = targetCumulative - cumulative;

    // Generate daily PnL that guides toward target but with natural variation
    const baseChange =
      (deviation / Math.max(1, totalDataPoints - i)) *
      (1 + Math.random() * 0.4);

    // Add random variation - ensure we get both gains and losses
    // Make variation MORE dynamic for shorter timeframes to make bars more visible
    const randomValue = Math.random();
    let dailyPnL: number;

    // Base variation amounts - larger for shorter timeframes to make bars visible
    let baseVariation: number;
    if (timeRange === "1H") {
      // For 1H: larger variation to make bars visible (500-2000 range)
      baseVariation = Math.random() * 1500 + 500;
    } else if (timeRange === "6H") {
      // For 6H: good variation (400-1800 range)
      baseVariation = Math.random() * 1400 + 400;
    } else if (timeRange === "1D") {
      // For 1D: moderate variation (300-1500 range)
      baseVariation = Math.random() * 1200 + 300;
    } else {
      // For longer timeframes: standard variation
      baseVariation = Math.random() * 2000 + 300;
    }

    if (randomValue < 0.45) {
      // 45% chance of negative (losses)
      dailyPnL = baseChange * 0.2 - baseVariation;
    } else {
      // 55% chance of positive (gains)
      dailyPnL = baseChange * 0.2 + baseVariation;
    }

    // Add some oscillation for visual interest
    const oscillation = Math.sin(i * 0.1) * (baseVariation * 0.3);
    dailyPnL += oscillation;

    // Update cumulative
    cumulative += dailyPnL;

    // Soft clamp to keep within reasonable bounds (10K-50K with some margin)
    if (cumulative < targetMin - 3000) {
      cumulative = targetMin - 3000 + Math.random() * 2000;
    } else if (cumulative > targetMax + 3000) {
      cumulative = targetMax + 3000 - Math.random() * 2000;
    }

    data.push({
      index: i,
      date: dateString,
      dateLabel,
      dateObj: currentDate,
      dailyPnL: Number(dailyPnL.toFixed(2)),
      cumulativePnL: Number(cumulative.toFixed(2)),
    });
  }

  return data;
};

export default function PnLOverviewChart({
  data: externalData,
  cumulativePnL,
}: PnLOverviewChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("1H");

  // Generate data based on time range
  const chartData = useMemo(() => {
    if (externalData) {
      // Ensure external data has index, dateLabel, and dateObj fields
      return externalData.map((point, index) => ({
        ...point,
        index: point.index ?? index,
        dateLabel: point.dateLabel ?? point.date,
        dateObj: point.dateObj ?? new Date(point.date),
      }));
    }
    return generateMockData(timeRange);
  }, [timeRange, externalData]);

  // Calculate dynamic Y-axis domain and ticks based on data
  const { yAxisDomain, yAxisTicks } = useMemo(() => {
    if (chartData.length === 0) {
      return {
        yAxisDomain: [-10000, 40000] as [number, number],
        yAxisTicks: [-10000, 0, 10000, 20000, 30000, 40000],
      };
    }

    // Find min and max values for both daily PnL and cumulative PnL
    const allValues = chartData.flatMap((d) => [d.dailyPnL, d.cumulativePnL]);
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);

    // Add padding (20% on each side)
    const range = maxValue - minValue;
    const padding = range * 0.2;
    const domainMin = Math.floor((minValue - padding) / 5000) * 5000;
    const domainMax = Math.ceil((maxValue + padding) / 5000) * 5000;

    // Generate ticks
    const tickStep = Math.max(
      5000,
      Math.ceil((domainMax - domainMin) / 5 / 5000) * 5000,
    );
    const ticks: number[] = [];
    for (let tick = domainMin; tick <= domainMax; tick += tickStep) {
      ticks.push(tick);
    }

    return {
      yAxisDomain: [domainMin, domainMax] as [number, number],
      yAxisTicks: ticks,
    };
  }, [chartData]);

  // Get indices where dateLabel is set (non-empty) - these are the points we want to show on X-axis
  const xAxisTicks = useMemo(() => {
    return chartData
      .map((point, index) => ({ index, hasLabel: point.dateLabel !== "" }))
      .filter((item) => item.hasLabel)
      .map((item) => item.index);
  }, [chartData]);

  // Calculate cumulative PnL from data if not provided
  const finalCumulativePnL =
    cumulativePnL ??
    (chartData.length > 0
      ? chartData[chartData.length - 1].cumulativePnL / 1000
      : 12.5);

  // Custom bar color based on positive/negative value
  const getBarColor = (value: number) => {
    return value >= 0 ? "var(--light-green)" : "var(--neon-pink)";
  };

  // Format Y-axis values
  const formatYAxis = (value: number) => {
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    if (value <= -1000) return `-$${Math.abs(value / 1000).toFixed(0)}K`;
    return `$${value.toFixed(0)}`;
  };

  // Fixed bar size of 11 for all data points
  const barSize = 11;

  // No gaps between bars - make them continuous
  const barGap = 0;

  return (
    <div className="bg-elevation-card flex w-full flex-col gap-5 rounded-[20px] p-3 pt-5 md:p-5">
      {/* Header */}
      <div className="border-elevation-bg dark:border-border-secondary flex items-center justify-between border-b pb-5">
        <h2 className="text-text-primary text-[13px] leading-[13px] font-medium tracking-[-0.1px]">
          PnL Overview
        </h2>
      </div>

      {/* Legend and Time Range Selector */}
      <div className="flex flex-col items-start gap-6">
        <div className="flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          {/* Legend */}
          <div className="flex flex-wrap items-start gap-1.5">
            {/* Daily Profit */}
            <div className="border-border-secondary bg-elevation-card flex h-7 items-center gap-2 overflow-hidden rounded-lg border px-3 py-2.5">
              <div className="bg-light-green h-[9px] w-[9px] rounded-full" />
              <span className="text-text-primary text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
                Daily Profit
              </span>
            </div>

            {/* Daily Lost */}
            <div className="border-border-secondary bg-elevation-card flex h-7 items-center gap-2 overflow-hidden rounded-lg border px-3 py-2.5">
              <div className="bg-neon-pink h-[9px] w-[9px] rounded-full" />
              <span className="text-text-primary text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
                Daily Lost
              </span>
            </div>

            {/* Cumulative PNL */}
            <div className="border-border-secondary bg-elevation-card flex h-7 items-center gap-1 overflow-hidden rounded-lg border px-3 py-2.5">
              <span className="text-text-secondary text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
                Cumulative PNL
              </span>
              <span className="text-light-green text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
                ${finalCumulativePnL.toFixed(1)}K
              </span>
            </div>
          </div>

          {/* Time Range Selector */}
          <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
        </div>

        {/* Chart */}
        <div className="h-[250px] w-full md:h-[300px]">
          <BaseChart
            data={chartData}
            margin={{ top: 20, right: 0, bottom: 0, left: 0 }}
            barCategoryGap={0}
            barGap={0}
            xAxisProps={{
              dataKey: "index",
              tick: { fill: "var(--soft-400)", fontSize: 12 },
              tickLine: false,
              axisLine: false,
              tickFormatter: (value) => {
                const dataPoint = chartData[value];
                return dataPoint?.dateLabel || "";
              },
              ticks: xAxisTicks.length > 0 ? xAxisTicks : undefined,
            }}
            tooltipContent={<CustomTooltip />}
            defs={
              <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="rgba(55, 93, 251, 0.2)"
                  stopOpacity={0.5}
                />
                <stop
                  offset="100%"
                  stopColor="rgba(55, 93, 251, 0)"
                  stopOpacity={0.5}
                />
              </linearGradient>
            }
          >
            {/* Area shadow for cumulative PnL line */}
            <Area
              type="monotone"
              dataKey="cumulativePnL"
              stroke="none"
              fill="url(#colorBlue)"
              fillOpacity={1}
              connectNulls={true}
              isAnimationActive={false}
            />
            <Bar
              dataKey="dailyPnL"
              fill="var(--light-green)"
              barSize={barSize}
              shape={(props: unknown) => {
                const barProps = props as {
                  x?: number;
                  y?: number;
                  width?: number;
                  height?: number;
                  payload: ChartDataPointT;
                };
                const {
                  x = 0,
                  y = 0,
                  width = barSize,
                  height = 0,
                  payload,
                } = barProps;
                const color = getBarColor(payload.dailyPnL);

                // Handle both positive and negative bars
                // For negative bars, height is negative, so we adjust y position
                const barHeight = Math.abs(height);
                const barY = height < 0 ? y + height : y;

                return (
                  <rect
                    x={x}
                    y={barY}
                    width={width}
                    height={barHeight}
                    fill={color}
                  />
                );
              }}
            />
            <Line
              type="monotone"
              dataKey="cumulativePnL"
              stroke="var(--base-blue)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
              filter="drop-shadow(0px 8px 10px rgba(55, 93, 251, 0.35))"
            />
          </BaseChart>
        </div>
      </div>
    </div>
  );
}
