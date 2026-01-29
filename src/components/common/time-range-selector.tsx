"use client";

import { useState } from "react";

export type TimeRange = "1H" | "6H" | "1D" | "1W" | "1M" | "ALL";

interface TimeRangeSelectorProps {
  value: TimeRange;
  onChange: (range: TimeRange) => void;
  timeRanges?: TimeRange[];
}

export function TimeRangeSelector({
  value,
  onChange,
  timeRanges = ["1H", "6H", "1D", "1W", "1M", "ALL"],
}: TimeRangeSelectorProps) {
  return (
    <div className="flex items-start gap-1">
      {timeRanges.map((range) => (
        <button
          key={range}
          onClick={() => onChange(range)}
          className={`flex items-center gap-1 overflow-hidden rounded-lg px-2 py-2 ${
            value === range ? "bg-bg-tertiary" : ""
          }`}
        >
          <span
            className={`text-[12px] leading-[12px] font-medium tracking-[-0.1px] ${
              value === range
                ? "text-text-primary"
                : "text-text-secondary"
            }`}
          >
            {range}
          </span>
        </button>
      ))}
    </div>
  );
}
