"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export type TimeRangeT = "1H" | "6H" | "1D" | "1W" | "ALL";

type LivePerformanceDataPointT = {
  index: number;
  time: string;
  timeLabel: string;
  date: Date;
  greenLine: number;
  redLine: number;
};

interface LivePerformanceChartProps {
  timeRange?: TimeRangeT;
}

type TooltipProps = {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    payload: LivePerformanceDataPointT;
  }>;
};

// Format date for tooltip: "12 Aug, 8:00 PM"
const formatTooltipDate = (date: Date): string => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const greenValue = payload.find((p) => p.dataKey === "greenLine")?.value ?? data.greenLine;
    const redValue = payload.find((p) => p.dataKey === "redLine")?.value ?? data.redLine;

    return (
      <div className="bg-[#262626]/80 rounded-lg py-2 px-3 shadow-lg">
        <p className="text-white text-xs mb-2">
          {formatTooltipDate(data.date)}
        </p>
        <div className="space-y-1">
          {greenValue !== undefined && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#2d9f75] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              </div>
              <p className="text-white text-xs font-medium">
                {greenValue.toFixed(1)}%
              </p>
            </div>
          )}
          {redValue !== undefined && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#df1c41] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              </div>
              <p className="text-white text-xs font-medium">
                {redValue.toFixed(1)}%
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

// Generate mock data based on time range
const generateMockData = (timeRange: TimeRangeT): LivePerformanceDataPointT[] => {
  const data: LivePerformanceDataPointT[] = [];
  const now = new Date();

  let totalDataPoints: number;
  let intervalMinutes: number;
  let startDate: Date;

  // Configure data points based on time range
  switch (timeRange) {
    case "1H":
      totalDataPoints = 60; // 1 hour = 60 minutes (minute data)
      intervalMinutes = 1;
      startDate = new Date(now.getTime() - 60 * 60 * 1000); // 1 hour ago
      break;
    case "6H":
      totalDataPoints = 72; // 6 hours = 72 data points (5-minute intervals: 6 * 60 / 5)
      intervalMinutes = 5;
      startDate = new Date(now.getTime() - 6 * 60 * 60 * 1000); // 6 hours ago
      break;
    case "1D":
      totalDataPoints = 96; // 1 day = 96 data points (15-minute intervals: 24 * 60 / 15)
      intervalMinutes = 15;
      startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 1 day ago
      break;
    case "1W":
      totalDataPoints = 168; // 1 week = 168 data points (hourly: 7 * 24)
      intervalMinutes = 60;
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
      break;
    case "ALL":
      totalDataPoints = 365; // 1 year = 365 days (daily data)
      startDate = new Date(now);
      startDate.setDate(startDate.getDate() - 365);
      startDate.setHours(0, 0, 0, 0);
      intervalMinutes = 24 * 60; // Daily
      break;
    default:
      totalDataPoints = 60;
      intervalMinutes = 1;
      startDate = new Date(now.getTime() - 60 * 60 * 1000);
  }

  // Determine label interval to show exactly 4 labels
  // We want 4 labels, so we divide the data points into 4 segments
  // Exclude the last data point to avoid right edge
  const labelInterval = Math.max(1, Math.floor((totalDataPoints - 1) / 4));

  let greenValue = 0;
  let redValue = 0;
  let greenStepCounter = 0;
  let redStepCounter = 0;

  for (let i = 0; i < totalDataPoints; i++) {
    let currentDate: Date;
    if (timeRange === "ALL") {
      // For daily data, add days
      currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
    } else {
      currentDate = new Date(
        startDate.getTime() + i * intervalMinutes * 60 * 1000
      );
    }

    const progress = i / (totalDataPoints - 1);

    let timeString: string;
    let timeLabel: string = "";

    // Format time string based on time range
    if (timeRange === "1H") {
      // Minute-level: show HH:MM AM/PM
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const displayHour = hours > 12 ? hours - 12 : hours || 12;
      const ampm = hours >= 12 ? "PM" : "AM";
      timeString = `${displayHour}:${minutes
        .toString()
        .padStart(2, "0")} ${ampm}`;
      // Show label at intervals, but exclude the last data point (to avoid right edge)
      if (i % labelInterval === 0 && i < totalDataPoints - 1) {
        timeLabel = timeString;
      }
    } else if (timeRange === "6H") {
      // 5-minute intervals: show HH:MM AM/PM
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const displayHour = hours > 12 ? hours - 12 : hours || 12;
      const ampm = hours >= 12 ? "PM" : "AM";
      timeString = `${displayHour}:${minutes
        .toString()
        .padStart(2, "0")} ${ampm}`;
      // Show label at intervals, but exclude the last data point (to avoid right edge)
      if (i % labelInterval === 0 && i < totalDataPoints - 1) {
        timeLabel = timeString;
      }
    } else if (timeRange === "1D") {
      // 15-minute intervals: show HH:MM AM/PM
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const displayHour = hours > 12 ? hours - 12 : hours || 12;
      const ampm = hours >= 12 ? "PM" : "AM";
      timeString = `${displayHour}:${minutes
        .toString()
        .padStart(2, "0")} ${ampm}`;
      // Show label at intervals, but exclude the last data point (to avoid right edge)
      if (i % labelInterval === 0 && i < totalDataPoints - 1) {
        timeLabel = timeString;
      }
    } else if (timeRange === "1W") {
      // Hourly data but show day labels (MM/DD)
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      timeString = `${month}/${day}`;
      // Show label at intervals, but exclude the last data point (to avoid right edge)
      // Show label when it's at the calculated interval (which will align with days approximately)
      if (i % labelInterval === 0 && i < totalDataPoints - 1) {
        timeLabel = timeString;
      }
    } else {
      // Daily: show MM/DD
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      timeString = `${month}/${day}`;
      // Show label at intervals, but exclude the last data point (to avoid right edge)
      if (i % labelInterval === 0 && i < totalDataPoints - 1) {
        timeLabel = timeString;
      }
    }

    // Green line: step pattern with smooth upward trend
    greenStepCounter++;
    if (greenStepCounter >= 4 + Math.floor(Math.random() * 4)) {
      const greenBase = progress * 11;
      const sineVariation = Math.sin(i * 0.1) * 0.4;
      const randomVariation = (Math.random() - 0.5) * 0.8;
      greenValue = Math.max(
        0,
        Math.min(16, greenBase + sineVariation + randomVariation)
      );
      greenStepCounter = 0;
    }

    // Red line: step pattern, stays lower than green
    redStepCounter++;
    if (redStepCounter >= 3 + Math.floor(Math.random() * 4)) {
      const redBase = progress * 7;
      const sineVariation = Math.sin(i * 0.12) * 0.5;
      const randomVariation = (Math.random() - 0.5) * 1.0;
      let newRedValue = Math.max(
        0,
        Math.min(16, redBase + sineVariation + randomVariation)
      );

      if (newRedValue >= greenValue) {
        newRedValue = Math.max(0, greenValue - 0.5);
      }
      redValue = newRedValue;
      redStepCounter = 0;
    }

    data.push({
      index: i,
      time: timeString,
      timeLabel,
      date: currentDate,
      greenLine: Number(greenValue.toFixed(2)),
      redLine: Number(redValue.toFixed(2)),
    });
  }

  return data;
};

export default function LivePerformanceChart({
  timeRange = "ALL",
}: LivePerformanceChartProps) {
  const chartData = generateMockData(timeRange);

  // Get indices where timeLabel is set (non-empty) - these are the points we want to show on X-axis
  const xAxisTicks = chartData
    .map((point, index) => ({ index, hasLabel: point.timeLabel !== "" }))
    .filter((item) => item.hasLabel)
    .map((item) => item.index);

  return (
    <div className="w-full h-[240px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 0, bottom: 20, left: 10 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            vertical={false}
            horizontal={true}
            yAxisId="right"
          />
          <XAxis
            dataKey="index"
            tick={{ fill: "#868c98", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => {
              const dataPoint = chartData[value];
              return dataPoint?.timeLabel || "";
            }}
            ticks={xAxisTicks.length > 0 ? xAxisTicks : undefined}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, 16]}
            ticks={[0, 4, 8, 12, 16]}
            tickFormatter={(value) => `${value}%`}
            tick={{ fill: "#868c98", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            yAxisId="right"
            type="linear"
            dataKey="greenLine"
            stroke="#2d9f75"
            strokeWidth={1}
            dot={false}
            activeDot={{ r: 4 }}
            connectNulls={true}
          />
          <Line
            yAxisId="right"
            type="linear"
            dataKey="redLine"
            stroke="#df1c41"
            strokeWidth={1}
            dot={false}
            activeDot={{ r: 4 }}
            connectNulls={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
