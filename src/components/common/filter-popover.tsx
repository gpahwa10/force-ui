"use client";

import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

type SortOption = {
  label: string;
  value: string;
};

const sortOptions: SortOption[] = [
  { label: "Rank", value: "rank" },
  { label: "24H PnL", value: "pnl24h" },
  { label: "Total PnL", value: "totalPnl" },
  { label: "Open Positions", value: "openPositions" },
  { label: "Win Rate", value: "winRate" },
  { label: "Experience", value: "experience" },
];

export default function FilterPopover() {
  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="bg-elevation-bg hover:bg-elevation-button grid h-8 w-8 cursor-pointer place-items-center rounded-lg transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M9.99967 11.3333C10.3679 11.3333 10.6663 11.6318 10.6663 12C10.6663 12.3682 10.3679 12.6666 9.99967 12.6666H5.99967C5.63148 12.6666 5.33301 12.3682 5.33301 12C5.33301 11.6318 5.63148 11.3333 5.99967 11.3333H9.99967ZM11.9997 7.33331C12.3679 7.33331 12.6663 7.63179 12.6663 7.99998C12.6663 8.36817 12.3679 8.66665 11.9997 8.66665H3.99967C3.63148 8.66665 3.33301 8.36817 3.33301 7.99998C3.33301 7.63179 3.63148 7.33331 3.99967 7.33331H11.9997ZM13.9997 3.33331C14.3679 3.33331 14.6663 3.63179 14.6663 3.99998C14.6663 4.36817 14.3679 4.66665 13.9997 4.66665H1.99967C1.63148 4.66665 1.33301 4.36817 1.33301 3.99998C1.33301 3.63179 1.63148 3.33331 1.99967 3.33331H13.9997Z"
              fill="currentColor"
              className="text-text-secondary"
            />
          </svg>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-elevation-card border-border-secondary w-[240px] p-4"
        align="end"
      >
        <div className="flex flex-col gap-4">
          {/* Sort By Section */}
          <div className="flex flex-col gap-4">
            <h3 className="text-text-primary text-[13px] leading-[13px] font-medium tracking-[-0.1px]">
              Sort By
            </h3>
            <div className="flex flex-col gap-1">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedSort(option.value)}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-left transition-colors ${
                    selectedSort === option.value
                      ? "bg-elevation-button text-text-primary"
                      : "text-text-secondary hover:bg-elevation-bg hover:text-text-primary bg-transparent"
                  }`}
                >
                  <span className="text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
                    {option.label}
                  </span>
                  {selectedSort === option.value && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 3L4.5 8.5L2 6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-light-green"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Direction */}
          {selectedSort && (
            <div className="flex flex-col gap-2">
              <h3 className="text-text-primary text-[13px] leading-[13px] font-medium tracking-[-0.1px]">
                Order
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setSortDirection("asc")}
                  className={`flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-1 transition-colors ${
                    sortDirection === "asc"
                      ? "bg-elevation-button text-text-primary"
                      : "bg-elevation-bg text-text-secondary hover:bg-elevation-button hover:text-text-primary"
                  }`}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 2.5V9.5M6 2.5L9 5.5M6 2.5L3 5.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
                    Ascending
                  </span>
                </button>
                <button
                  onClick={() => setSortDirection("desc")}
                  className={`flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-1 transition-colors ${
                    sortDirection === "desc"
                      ? "bg-elevation-button text-text-primary"
                      : "bg-elevation-bg text-text-secondary hover:bg-elevation-button hover:text-text-primary"
                  }`}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 9.5V2.5M6 9.5L9 6.5M6 9.5L3 6.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
                    Descending
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="border-border-secondary flex gap-2 border-t pt-2">
            <Button
              variant="outline"
              className="bg-elevation-bg border-border-secondary text-text-primary hover:bg-elevation-button h-8 flex-1 px-2 py-1"
              onClick={() => {
                setSelectedSort(null);
                setSortDirection("desc");
              }}
            >
              <span className="text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
                Reset
              </span>
            </Button>
            <Button
              className="bg-elevation-button text-text-primary hover:bg-elevation-button/80 h-8 flex-1 px-2 py-1"
              onClick={() => {
                // Sort functionality would go here
              }}
            >
              <span className="text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
                Apply
              </span>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
