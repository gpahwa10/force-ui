"use client";

import type { OrderbookEntry } from "./chart-types";

// Default data for team 1
const defaultTeam1Bids: OrderbookEntry[] = [
  { price: "58¢", size: "$3,200", barWidth: 80 },
  { price: "57¢", size: "$3,200", barWidth: 35 },
  { price: "56¢", size: "$3,200", barWidth: 25 },
  { price: "55¢", size: "$3,200", barWidth: 58 },
];

const defaultTeam1Asks: OrderbookEntry[] = [
  { price: "59¢", size: "$3,200", barWidth: 80 },
  { price: "60¢", size: "$3,200", barWidth: 35 },
  { price: "61¢", size: "$3,200", barWidth: 25 },
  { price: "61¢", size: "$3,200", barWidth: 58 },
];

// Default data for team 2
const defaultTeam2Bids: OrderbookEntry[] = [
  { price: "62¢", size: "$4,500", barWidth: 75 },
  { price: "61¢", size: "$4,200", barWidth: 42 },
  { price: "60¢", size: "$3,800", barWidth: 30 },
  { price: "59¢", size: "$3,500", barWidth: 55 },
];

const defaultTeam2Asks: OrderbookEntry[] = [
  { price: "63¢", size: "$4,500", barWidth: 75 },
  { price: "64¢", size: "$4,200", barWidth: 42 },
  { price: "65¢", size: "$3,800", barWidth: 30 },
  { price: "66¢", size: "$3,500", barWidth: 55 },
];

interface OrderbookTabProps {
  bids?: OrderbookEntry[];
  asks?: OrderbookEntry[];
  spread?: string;
  teamName?: string;
}

export default function OrderbookTab({
  bids,
  asks,
  spread,
  teamName,
}: OrderbookTabProps = {}) {
  // Use provided data or default to team 1 data
  const bidsData = bids || defaultTeam1Bids;
  const asksData = asks || defaultTeam1Asks;
  const spreadValue = spread || "$0.02";
  return (
    <div className="">
      <div className="flex w-full flex-col items-start gap-2.5">
        {/* Header Row */}
        <div className="mx-auto flex w-full max-w-[95%] items-start gap-5 md:max-w-[98%]">
          {/* Bids Header */}
          <div className="flex flex-1 items-center gap-4 overflow-hidden rounded-[14px] px-0 py-2.5">
            <div className="w-[294.614px] text-[13px] leading-[13px] font-medium tracking-[-0.1px]">
              <span className="text-text-primary">Bids </span>
              <span className="text-text-secondary">(YES)</span>
            </div>
          </div>

          {/* Spread */}
          <div className="flex flex-1 items-center justify-center gap-1 overflow-hidden rounded-[14px] px-0 py-2.5">
            <span className="text-text-secondary text-center text-[13px] leading-[13px] font-medium tracking-[-0.1px]">
              Spread
            </span>
            <span className="text-text-primary text-center text-[13px] leading-[13px] font-medium tracking-[-0.1px]">
              {spreadValue}
            </span>
          </div>

          {/* Asks Header */}
          <div className="flex flex-1 items-center justify-end gap-4 overflow-hidden rounded-[14px] px-0 py-2.5">
            <div className="w-[294.614px] text-right text-[13px] leading-[13px] font-medium tracking-[-0.1px]">
              <span className="text-text-primary">Asks </span>
              <span className="text-text-secondary">(YES)</span>
            </div>
          </div>
        </div>

        {/* Order Book Content */}
        <div className="flex w-full items-start gap-3 md:gap-5">
          {/* Bids Column (Left) */}
          <div className="flex flex-1 flex-col items-start gap-5">
            <div className="bg-elevation-bg flex w-full flex-col items-start gap-1 rounded-[14px] p-1">
              {/* Column Headers */}
              <div className="flex h-[27px] w-full items-center overflow-hidden rounded-[14px] px-3.5 py-2.5">
                <div className="text-text-secondary flex-1 text-[11px] leading-[11px] font-medium tracking-[-0.1px]">
                  Price
                </div>
                <div className="flex flex-1 items-center justify-center gap-2.5">
                  <div className="text-text-secondary flex-1 text-right text-[11px] leading-[11px] font-medium tracking-[-0.1px]">
                    Size
                  </div>
                </div>
              </div>

              {/* Bid Rows */}
              {bidsData.map((bid, index) => (
                <div
                  key={`bid-${index}`}
                  className="bg-elevation-card relative flex h-[46px] w-full items-center justify-between overflow-hidden rounded-[10px] px-3.5"
                >
                  <div className="text-text-primary relative z-10 flex-1 text-[14px] leading-[16px] font-medium tracking-[-0.2px]">
                    {bid.price}
                  </div>
                  <div className="relative flex flex-1 items-center justify-center gap-1 self-stretch py-4 pr-0 pl-3">
                    <div
                      className="bg-light-green absolute right-[-14px] h-[46px]"
                      style={{
                        width: `${bid.barWidth}%`,
                        opacity: 0.15,
                      }}
                    />
                    <div className="text-light-green relative z-10 flex-1 text-right font-['Inter'] text-[13px] leading-[100%] font-medium tracking-[-0.13px]">
                      {bid.size}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Asks Column (Right) */}
          <div className="flex flex-1 flex-col items-start gap-5">
            <div className="bg-elevation-bg flex w-full flex-col items-start gap-1 rounded-[14px] p-1">
              {/* Column Headers */}
              <div className="flex h-[27px] w-full items-center overflow-hidden rounded-[14px] px-3.5 py-2.5">
                <div className="flex flex-1 items-center gap-2.5">
                  <div className="text-text-secondary text-right text-[11px] leading-[11px] font-medium tracking-[-0.1px]">
                    Size
                  </div>
                </div>
                <div className="text-text-secondary text-[11px] leading-[11px] font-medium tracking-[-0.1px]">
                  Price
                </div>
              </div>

              {/* Ask Rows */}
              {asksData.map((ask, index) => (
                <div
                  key={`ask-${index}`}
                  className="bg-elevation-card relative flex h-[46px] w-full items-center justify-between overflow-hidden rounded-[10px] pr-3.5"
                >
                  <div className="relative flex flex-1 items-center justify-center gap-1 self-stretch py-4 pr-0 pl-3">
                    <div
                      className="bg-neon-pink absolute left-0 h-[46px]"
                      style={{
                        width: `${ask.barWidth}%`,
                        opacity: 0.15,
                      }}
                    />
                    <div className="text-neon-pink relative z-10 flex-1 font-['Inter'] text-[13px] leading-[100%] font-medium tracking-[-0.13px]">
                      {ask.size}
                    </div>
                  </div>
                  <div className="text-text-primary relative z-10 flex-1 text-right text-[14px] leading-[16px] font-medium tracking-[-0.2px]">
                    {ask.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
