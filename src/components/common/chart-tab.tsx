"use client";

import { useState, useMemo } from "react";
import React from "react";
import { Line, Area, ReferenceLine, Customized } from "recharts";
import { TimeRangeSelector, type TimeRange } from "@/components/common/time-range-selector";
import { BaseChart } from "@/components/common/base-chart";
import {
  generateChartData,
  generateEvents,
  formatTooltipDate,
} from "./chart-utils";
import {
  CustomTooltip,
  CustomCursor,
  CustomEventDot,
} from "./chart-components";
import type {
  ChartDataPoint,
  ChartEvent,
} from "@/components/common/chart-types";

interface ChartTabProps {
  indexValue?: number;
  change24h?: number;
  volume?: string;
  funding?: number;
  earningToday?: number;
  routeName?: string;
  isLivePage?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GradientOverlay = (props: any) => {
  const { width, height } = props;
  return (
    <rect
      x={0}
      y={0}
      width={width}
      height={height}
      fill="url(#fadeSides)"
      style={{ pointerEvents: "none" }}
    />
  );
};

export default function ChartTab({
  indexValue = 31.5,
  change24h = 2.4,
  volume = "12.5K",
  funding = -0.03,
  earningToday = 3.27,
  routeName = "Partner",
  isLivePage = false,
}: ChartTabProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("1H");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredEventIndex, setHoveredEventIndex] = useState<number | null>(
    null,
  );

  const chartData = generateChartData(timeRange);
  const events = useMemo(
    () => generateEvents(timeRange, chartData),
    [timeRange, chartData],
  );

  // Create a Set of event indices for efficient lookup in custom dot component
  const eventIndices = useMemo(
    () => new Set(events.map((e) => e.index)),
    [events],
  );

  return (
    <div className="flex flex-col items-start gap-5 self-stretch ">
      {/* Top Section - Price and Time Range */}
      <div className="flex flex-col items-start justify-between gap-2 self-stretch md:flex-row md:items-end">
        {/* Left - Price and Stats */}
        <div className="flex flex-col items-start gap-2">
          {/* Price */}
          <div className="flex items-start gap-1">
            <span className="text-text-primary text-[40px] leading-[44px] font-medium tracking-[-1px]">
              {indexValue}
            </span>
            <div className="flex items-center gap-1 py-[7px]">
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 0L7.4641 6H0.535898L4 0Z"
                  fill={change24h >= 0 ? "#25AB7A" : "#E13F5E"}
                  transform={change24h >= 0 ? "" : "rotate(180 4 4)"}
                />
              </svg>
              <span
                className={`text-[13px] leading-[13px] font-medium tracking-[-0.1px] ${change24h >= 0 ? "text-[#25AB7A]" : "text-[#E13F5E]"
                  }`}
              >
                {change24h.toFixed(1)}%
              </span>
            </div>
          </div>
          {/* Stats Badges */}
          <div className="flex flex-wrap items-start gap-1.5">
            {/* Earning Today */}
            <div className="border-secondary dark:border-border bg-elevation-card flex h-7 items-center gap-1 overflow-hidden rounded-[8px] border py-2.5 pr-3 pl-2">
              <div className="flex items-center gap-[3.714px]">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_5159_9246)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.5153 4.72849C12.0012 7.56988 10.8061 11.3766 7.39256 11.9296C2.92282 12.892 -0.0591976 7.52888 3.29892 4.38466C3.47833 4.2107 3.97246 3.76027 4.17869 3.61559C4.17869 3.91666 4.44929 6.2485 4.87248 6.07217C6.61356 6.07217 7.08086 3.01345 6.84065 1.20703C8.40761 2.01183 9.73503 3.13294 10.5153 4.72849Z"
                      stroke="#25AB7A"
                      strokeWidth="1.23845"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_5159_9246">
                      <rect width="13" height="13" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <span className="text-[12px] leading-[12px] font-medium tracking-[-0.1px] text-[#25AB7A]">
                +${earningToday.toFixed(2)}
              </span>
              <span className="text-text-primary text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
                Earning Today
              </span>
            </div>
            {/* Funding */}
            <div className="border-secondary dark:border-border bg-elevation-card flex h-7 items-center gap-1 overflow-hidden rounded-lg border px-3 py-2.5">
              <span className="text-text-secondary text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
                Funding
              </span>
              <span
                className={`text-[12px] leading-[12px] font-medium tracking-[-0.1px] ${funding >= 0 ? "text-[#25AB7A]" : "text-[#E13F5E]"
                  }`}
              >
                {funding >= 0 ? "+" : ""}
                {funding.toFixed(2)}%
              </span>
            </div>
            {/* Vol */}
            <div className="border-secondary dark:border-border bg-elevation-card flex h-7 items-center gap-1 overflow-hidden rounded-lg border px-3 py-2.5">
              <span className="text-text-secondary text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
                Vol
              </span>
              <span className="text-text-primary text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
                {volume}
              </span>
            </div>
            {/* Route */}
            <div className="border-secondary dark:border-border bg-elevation-card flex h-7 items-center gap-1 overflow-hidden rounded-lg border py-2.5 pr-3 pl-2">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_5159_9257)">
                  <path
                    d="M6 8V6M6 4H6.005M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z"
                    stroke="#7E7E8C"
                    strokeWidth="1.02857"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_5159_9257">
                    <rect width="12" height="12" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span className="text-text-secondary text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
                Route:
              </span>
              <span className="text-text-primary text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
                {routeName}
              </span>
            </div>
          </div>
        </div>

        {/* Right - Time Range Selector */}
        <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
      </div>

      {/* Chart */}
      <div
        className="relative z-10 h-[250px] w-full overflow-hidden rounded-[8px] sm:h-[280px] md:h-[312px]"
        id="price-chart-container"
      >
        {/* Dotted background for live page */}
        {isLivePage && (
          <div
            className="absolute inset-0 z-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: "url('/icons/dotted.png')",
              backgroundRepeat: "repeat",
              backgroundSize: "auto",
            }}
          />
        )}
        <BaseChart
          data={chartData}
          margin={{ top: 0, right: 25, bottom: 0, left: 0 }}
          showGrid={false}
          onMouseMove={(state) => {
            const index = (state as { activeTooltipIndex?: number })
              ?.activeTooltipIndex;
            if (index !== undefined && typeof index === "number") {
              setActiveIndex(index);
            }
          }}
          onMouseLeave={() => setActiveIndex(null)}
          xAxisProps={{
            dataKey: "time",
            hide: true,
            type: "category",
            interval: "preserveStartEnd",
          }}
          yAxisProps={{
            domain: [27, 36],
            hide: true,
          }}
          tooltipContent={
            <CustomTooltip events={events} chartData={chartData} />
          }
          tooltipCursor={CustomCursor}
          defs={
            <>
              <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="rgba(225, 63, 94, 0.2)"
                  stopOpacity={0.5}
                />
                <stop
                  offset="50%"
                  stopColor="rgba(123, 35, 51, 0)"
                  stopOpacity={0.5}
                />
              </linearGradient>
              <linearGradient id="fadeSides" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity={1} />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity={0} />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity={1} />
              </linearGradient>
            </>
          }
        >
          {/* Reference lines on hover - horizontal lines for each value */}
          {activeIndex !== null && chartData[activeIndex] && (
            <>
              {!isLivePage ? (
                <>
                  <ReferenceLine
                    y={chartData[activeIndex].redLine}
                    stroke="#FC3970"
                    strokeDasharray="2 2"
                    strokeWidth={1}
                    strokeOpacity={0.4}
                  />
                  <ReferenceLine
                    y={chartData[activeIndex].greenLine}
                    stroke="#16A34A"
                    strokeDasharray="2 2"
                    strokeWidth={1}
                    strokeOpacity={0.4}
                  />
                </>
              ) : (
                <>
                  <ReferenceLine
                    y={chartData[activeIndex].line3}
                    stroke="#FDB927"
                    strokeDasharray="2 2"
                    strokeWidth={1}
                    strokeOpacity={0.4}
                  />
                  <ReferenceLine
                    y={chartData[activeIndex].line4}
                    stroke="#3B87DD"
                    strokeDasharray="2 2"
                    strokeWidth={1}
                    strokeOpacity={0.4}
                  />
                  <ReferenceLine
                    y={chartData[activeIndex].line5}
                    stroke="#AD8D46"
                    strokeDasharray="2 2"
                    strokeWidth={1}
                    strokeOpacity={0.4}
                  />
                  <ReferenceLine
                    y={chartData[activeIndex].line6}
                    stroke="#21446C"
                    strokeDasharray="2 2"
                    strokeWidth={1}
                    strokeOpacity={0.4}
                  />
                </>
              )}
            </>
          )}

          {/* Area shadows */}
          {!isLivePage ? (
            <>
              <Area
                type="linear"
                dataKey="redLine"
                stroke="none"
                fill="url(#colorRed)"
                fillOpacity={1}
                connectNulls={true}
                isAnimationActive={false}
              />
              <Area
                type="monotone"
                dataKey="greenLine"
                stroke="none"
                fill="url(#colorGreen)"
                fillOpacity={1}
                connectNulls={true}
                isAnimationActive={false}
              />
            </>
          ) : null}

          <Customized component={GradientOverlay} />

          {!isLivePage ? (
            <>
              {/* Red line - linear connections with edges (#FC3970) */}
              <Line
                type="linear"
                dataKey="redLine"
                stroke="#FC3970"
                strokeWidth={2}
                dot={(props: {
                  cx?: number;
                  cy?: number;
                  payload?: ChartDataPoint;
                  index?: number;
                }) => (
                  <CustomEventDot
                    key={`dot-${props.index}`}
                    id={`dot-${props.index}`}
                    cx={props.cx}
                    cy={props.cy}
                    index={props.index}
                    eventIndices={eventIndices}
                    onMouseEnter={(index) => {
                      const eventIdx = events.findIndex((e) => e.index === index);
                      if (eventIdx !== -1) setHoveredEventIndex(eventIdx);
                    }}
                    onMouseLeave={() => setHoveredEventIndex(null)}
                  />
                )}
                activeDot={{
                  r: 5,
                  fill: "#FC3970",
                  stroke: "white",
                  strokeWidth: 2,
                }}
                connectNulls={true}
              />

              {/* Green line - smooth (#16A34A) */}
              <Line
                type="monotone"
                dataKey="greenLine"
                stroke="#16A34A"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "#16A34A",
                  stroke: "white",
                  strokeWidth: 2,
                }}
                connectNulls={true}
              />
            </>
          ) : (
            <>
              {/* Line 3 - #FDB927 */}
              <Line
                type="monotone"
                dataKey="line3"
                stroke="#FDB927"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "#FDB927",
                  stroke: "white",
                  strokeWidth: 2,
                }}
                connectNulls={true}
              />
              {/* Line 4 - #3B87DD */}
              <Line
                type="monotone"
                dataKey="line4"
                stroke="#3B87DD"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "#3B87DD",
                  stroke: "white",
                  strokeWidth: 2,
                }}
                connectNulls={true}
              />
              {/* Line 5 - #AD8D46 */}
              <Line
                type="monotone"
                dataKey="line5"
                stroke="#AD8D46"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 10,
                  fill: "#AD8D46",
                  stroke: "white",
                  strokeWidth: 2,
                }}
                connectNulls={true}
              />
              {/* Line 6 - #21446C */}
              <Line
                type="monotone"
                dataKey="line6"
                stroke="#21446C"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "#21446C",
                  stroke: "white",
                  strokeWidth: 2,
                }}
                connectNulls={true}
              />
            </>
          )}
        </BaseChart>

        {/* Event tooltips overlay - positioned relative to chart container */}
        {events.map((event, idx) => {
          const dataPoint = chartData[event.index];
          if (!dataPoint) return null;

          const isHovered = hoveredEventIndex === idx;
          if (!isHovered) return null;

          // Calculate position for tooltip based on chart dimensions
          const chartHeight = 312;
          const yMin = 27;
          const yMax = 36;
          const yRange = yMax - yMin;
          const getYPosition = (value: number) => {
            const normalizedValue = (yMax - value) / yRange;
            return normalizedValue * chartHeight;
          };

          const getXPosition = (index: number) => {
            const totalPoints = chartData.length;
            return totalPoints > 1 ? (index / (totalPoints - 1)) * 100 : 0;
          };

          const xPos = getXPosition(event.index);
          const yPos = getYPosition(dataPoint.redLine);
          const TOOLTIP_HEIGHT = 70;
          const MARKER_SIZE = 8;
          const showTooltipBelow = yPos < TOOLTIP_HEIGHT + 20;

          return (
            <div
              key={`event-tooltip-${idx}`}
              className="pointer-events-none absolute z-50"
              style={{
                left: `${xPos}%`,
                top: showTooltipBelow
                  ? `${yPos + MARKER_SIZE / 2 + 10}px`
                  : "auto",
                bottom: showTooltipBelow
                  ? "auto"
                  : `${chartHeight - yPos + MARKER_SIZE / 2 + 10}px`,
                transform: "translateX(-50%)",
              }}
            >
              <div className=" rounded-lg w-fit bg-white dark:bg-[#262626] px-3 py-2 whitespace-nowrap shadow-lg">
                <p className="mb-1 text-center text-[11px] font-medium text-black/60 dark:text-[#9ca3af]">
                  {event.time} — &ldquo;{event.title}&rdquo;
                </p>
                <p className="text-center text-[11px] font-normal text-black dark:text-white">
                  {event.description} Index jumps {event.impact} instantly.
                </p>
              </div>
            </div>
          );
        })}

        {/* Value labels at the end of each line */}
        {chartData.length > 0 &&
          (() => {
            const chartHeight = 312;
            const topMargin = 0;
            const bottomMargin = 0;
            const chartAreaHeight = chartHeight - topMargin - bottomMargin;
            const yMin = 27;
            const yMax = 36;
            const yRange = yMax - yMin;

            // Calculate Y position for a given value (matching Recharts' internal calculation)
            const getYPosition = (value: number) => {
              // Invert Y axis: higher values are at the top
              // Recharts uses: y = topMargin + (yMax - value) / (yMax - yMin) * chartAreaHeight
              const normalizedValue = (yMax - value) / yRange;
              return topMargin + normalizedValue * chartAreaHeight;
            };

            const lastDataPoint = chartData[chartData.length - 1];

            if (!isLivePage) {
              const redY = getYPosition(lastDataPoint.redLine);
              const greenY = getYPosition(lastDataPoint.greenLine);

              return (
                <>
                  {/* Red line label box */}
                  <div
                    className="absolute z-10 flex items-center justify-center rounded p-1"
                    style={{
                      right: "0px",
                      top: `${redY}px`,
                      transform: "translateY(-50%)",
                      backgroundColor: "#FC3970",
                    }}
                  >
                    <p className="text-[10px] font-medium whitespace-nowrap text-white">
                      {lastDataPoint.redLine.toFixed(1)}
                    </p>
                  </div>

                  {/* Green line label box */}
                  <div
                    className="absolute z-10 flex items-center justify-center rounded p-1"
                    style={{
                      right: "0px",
                      top: `${greenY}px`,
                      transform: "translateY(-50%)",
                      backgroundColor: "#16A34A",
                    }}
                  >
                    <p className="text-[10px] font-medium whitespace-nowrap text-white">
                      {lastDataPoint.greenLine.toFixed(1)}
                    </p>
                  </div>
                </>
              );
            } else {
              const line3Y = getYPosition(lastDataPoint.line3 || 0);
              const line4Y = getYPosition(lastDataPoint.line4 || 0);
              const line5Y = getYPosition(lastDataPoint.line5 || 0);
              const line6Y = getYPosition(lastDataPoint.line6 || 0);

              return (
                <>
                  {/* Line 3 label box */}
                  <div
                    className="absolute z-10 flex items-center justify-center rounded p-1"
                    style={{
                      right: "0px",
                      top: `${line3Y}px`,
                      transform: "translateY(-50%)",
                      backgroundColor: "#FDB927",
                    }}
                  >
                    <p className="text-[10px] font-medium whitespace-nowrap text-white">
                      {lastDataPoint.line3?.toFixed(1) || "0.0"}
                    </p>
                  </div>

                  {/* Line 4 label box */}
                  <div
                    className="absolute z-10 flex items-center justify-center rounded p-1"
                    style={{
                      right: "0px",
                      top: `${line4Y}px`,
                      transform: "translateY(-50%)",
                      backgroundColor: "#3B87DD",
                    }}
                  >
                    <p className="text-[10px] font-medium whitespace-nowrap text-white">
                      {lastDataPoint.line4?.toFixed(1) || "0.0"}
                    </p>
                  </div>

                  {/* Line 5 label box */}
                  <div
                    className="absolute z-10 flex items-center justify-center rounded p-1"
                    style={{
                      right: "0px",
                      top: `${line5Y}px`,
                      transform: "translateY(-50%)",
                      backgroundColor: "#AD8D46",
                    }}
                  >
                    <p className="text-[10px] font-medium whitespace-nowrap text-white">
                      {lastDataPoint.line5?.toFixed(1) || "0.0"}
                    </p>
                  </div>

                  {/* Line 6 label box */}
                  <div
                    className="absolute z-10 flex items-center justify-center rounded p-1"
                    style={{
                      right: "0px",
                      top: `${line6Y}px`,
                      transform: "translateY(-50%)",
                      backgroundColor: "#21446C",
                    }}
                  >
                    <p className="text-[10px] font-medium whitespace-nowrap text-white">
                      {lastDataPoint.line6?.toFixed(1) || "0.0"}
                    </p>
                  </div>
                </>
              );
            }
          })()}

        {/* Hover indicator - time label */}
        {activeIndex !== null && chartData[activeIndex] && (
          <div className="border-light-gray absolute bottom-[10px] left-1/2 z-20 -translate-x-1/2 transform rounded-[6px] border bg-white/90 px-[12px] py-[6px] shadow-lg backdrop-blur-sm">
            <p className="text-text-primary text-[12px] font-medium tracking-[-0.12px]">
              {chartData[activeIndex].time}
            </p>
          </div>
        )}
      </div>

      {/* X-axis time labels */}
      <div className="flex w-full items-center justify-between gap-1 overflow-hidden md:px-5">
        {chartData
          .map((point, index) => ({ point, index }))
          .filter(({ point }) => point.timeLabel !== "")
          .map(({ point, index }) => {
            // Check if this time label matches the hovered data point
            const isActive =
              activeIndex !== null &&
              chartData[activeIndex] &&
              chartData[activeIndex].time === point.time;

            return (
              <p
                key={`${point.time}-${index}`}
                className={`text-center text-[10px] leading-none font-normal tracking-[-0.12px] transition-colors sm:text-[11px] md:text-[12px] ${isActive
                  ? "text-text-primary font-medium"
                  : "text-text-secondary"
                  }`}
              >
                {point.timeLabel}
              </p>
            );
          })}
      </div>

      {/* Legend buttons for live page */}
      {isLivePage && (
        <div className="flex w-full items-center justify-start gap-1.5 mt-[20px] flex-wrap">
          {/* Lakers Index */}
          <button className="border-secondary dark:border-border bg-elevation-card flex h-7 items-center gap-1 overflow-hidden rounded-[8px] border px-3 py-2.5">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FDB927" }} />
            <span className="text-text-primary text-[12px] leading-[12px] font-medium tracking-[-0.1px]">Lakers Index</span>
          </button>

          {/* Lakers Market */}
          <button className="border-secondary dark:border-border bg-elevation-card flex h-7 items-center gap-1 overflow-hidden rounded-[8px] border px-3 py-2.5">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#AD8D46" }} />
            <span className="text-text-primary text-[12px] leading-[12px] font-medium tracking-[-0.1px]">Lakers Market</span>
          </button>

          {/* Warriors Index */}
          <button className="border-secondary dark:border-border bg-elevation-card flex h-7 items-center gap-1 overflow-hidden rounded-[8px] border px-3 py-2.5">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#3B87DD" }} />
            <span className="text-text-primary text-[12px] leading-[12px] font-medium tracking-[-0.1px]">Warriors Index</span>
          </button>

          {/* Warriors Market */}
          <button className="border-secondary dark:border-border bg-elevation-card flex h-7 items-center gap-1 overflow-hidden rounded-[8px] border px-3 py-2.5">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#21446C" }} />
            <span className="text-text-primary text-[12px] leading-[12px] font-medium tracking-[-0.1px]">Warriors Market</span>
          </button>
        </div>
      )}
    </div>
  );
}
