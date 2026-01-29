"use client";

import { ReactNode } from "react";
import {
  ComposedChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface BaseChartProps {
  data: any[];
  children: ReactNode;
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
  barCategoryGap?: number;
  barGap?: number;
  onMouseMove?: (state: any) => void;
  onMouseLeave?: () => void;
  showGrid?: boolean;
  gridProps?: {
    strokeDasharray?: string;
    stroke?: string;
    vertical?: boolean;
    horizontal?: boolean;
  };
  xAxisProps?: {
    dataKey?: string;
    tick?: any;
    tickLine?: boolean;
    axisLine?: boolean;
    tickFormatter?: (value: any) => string;
    ticks?: number[];
    hide?: boolean;
    type?: "number" | "category";
    interval?: "preserveStartEnd" | number;
  };
  yAxisProps?: {
    tickFormatter?: (value: number) => string;
    tick?: any;
    tickLine?: boolean;
    axisLine?: boolean;
    domain?: [number, number];
    ticks?: number[];
    hide?: boolean;
  };
  tooltipContent?: any;
  tooltipCursor?: any;
  defs?: ReactNode;
}

export function BaseChart({
  data,
  children,
  margin = { top: 20, right: 0, bottom: 0, left: 0 },
  barCategoryGap = 0,
  barGap = 0,
  onMouseMove,
  onMouseLeave,
  showGrid = true,
  gridProps = {
    strokeDasharray: "3 3",
    stroke: "var(--border-secondary)",
    vertical: false,
    horizontal: true,
  },
  xAxisProps,
  yAxisProps,
  tooltipContent,
  tooltipCursor,
  defs,
}: BaseChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={data}
        margin={margin}
        barCategoryGap={barCategoryGap}
        barGap={barGap}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {defs && <defs>{defs}</defs>}
        {showGrid && (
          <CartesianGrid
            strokeDasharray={gridProps.strokeDasharray}
            stroke={gridProps.stroke}
            vertical={gridProps.vertical}
            horizontal={gridProps.horizontal}
          />
        )}
        {xAxisProps && !xAxisProps.hide && (
          <XAxis
            dataKey={xAxisProps.dataKey}
            tick={xAxisProps.tick}
            tickLine={xAxisProps.tickLine}
            axisLine={xAxisProps.axisLine}
            tickFormatter={xAxisProps.tickFormatter}
            ticks={xAxisProps.ticks}
            type={xAxisProps.type}
            interval={xAxisProps.interval}
          />
        )}
        {xAxisProps?.hide && (
          <XAxis
            dataKey={xAxisProps.dataKey}
            hide={true}
            tick={false}
            axisLine={false}
            type={xAxisProps.type}
            interval={xAxisProps.interval}
          />
        )}
        {yAxisProps && !yAxisProps.hide && (
          <YAxis
            tickFormatter={yAxisProps.tickFormatter}
            tick={yAxisProps.tick}
            tickLine={yAxisProps.tickLine}
            axisLine={yAxisProps.axisLine}
            domain={yAxisProps.domain}
            ticks={yAxisProps.ticks}
          />
        )}
        {yAxisProps?.hide && (
          <YAxis
            domain={yAxisProps.domain}
            hide={true}
            tick={false}
            axisLine={false}
          />
        )}
        {tooltipContent && (
          <Tooltip content={tooltipContent} cursor={tooltipCursor} />
        )}
        {children}
      </ComposedChart>
    </ResponsiveContainer>
  );
}
