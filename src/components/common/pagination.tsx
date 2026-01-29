import React from "react";

export default function Pagination<T>({
  filteredPositions,
  positions,
}: {
  filteredPositions: T[];
  positions: T[];
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 self-stretch sm:justify-between">
      <div className="flex items-center gap-1">
        <span className="text-text-secondary text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
          Showing
        </span>
        <span className="text-text-primary text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
          1-{filteredPositions.length}
        </span>
        <span className="text-text-secondary text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
          of
        </span>
        <span className="text-text-primary text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
          {positions.length}
        </span>
      </div>

      <div className="flex w-[244px] items-center justify-between">
        {/* Left Arrow */}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <path
            d="M7.5 3L4.5 6L7.5 9"
            stroke="#AAAABD"
            strokeWidth="1.28571"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          <button className="flex h-7 w-7 items-center justify-center gap-1 rounded-lg bg-[#F7F7F7] px-2 py-2">
            <span className="text-[12px] leading-[12px] font-medium tracking-[-0.1px] text-[#101012]">
              1
            </span>
          </button>
          <button className="flex h-7 w-7 items-center justify-center gap-1 rounded-lg px-2 py-2">
            <span className="text-[12px] leading-[12px] font-medium tracking-[-0.1px] text-[#7E7E8C]">
              2
            </span>
          </button>
          <button className="flex h-7 w-7 items-center justify-center gap-1 rounded-lg px-2 py-2">
            <span className="text-[12px] leading-[12px] font-medium tracking-[-0.1px] text-[#7E7E8C]">
              3
            </span>
          </button>
          <button className="flex h-7 w-7 items-center justify-center gap-1 rounded-lg px-2 py-2">
            <span className="text-[12px] leading-[12px] font-medium tracking-[-0.1px] text-[#7E7E8C]">
              ...
            </span>
          </button>
          <button className="flex h-7 w-7 items-center justify-center gap-1 rounded-lg px-2 py-2">
            <span className="text-[12px] leading-[12px] font-medium tracking-[-0.1px] text-[#7E7E8C]">
              5
            </span>
          </button>
        </div>

        {/* Right Arrow */}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <path
            d="M4.5 3L7.5 6L4.5 9"
            stroke="#AAAABD"
            strokeWidth="1.28571"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
