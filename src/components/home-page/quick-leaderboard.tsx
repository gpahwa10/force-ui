import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function QuickLeaderboard() {
  // Leaderboard entries (mirrors your current static rows)
  const entries = [
    {
      rank: 1,
      initials: "SP",
      badgeBg: "bg-lighter-yellow",
      badgeText: "text-darker-yellow",
      name: "ShadowProfit",
      pnl24h: "+$5,290",
      totalPnl: "+$32,740",
      openPositions: "7",
      winRate: "88%",
    },
    {
      rank: 2,
      initials: "NB",
      badgeBg: "bg-lighter-yellow",
      badgeText: "text-darker-yellow",
      name: "NovaBear",
      pnl24h: "-$5,290",
      totalPnl: "-$32,740",
      openPositions: "4",
      winRate: "55%",
    },
    {
      rank: 3,
      initials: "M",
      badgeBg: "bg-light-purple",
      badgeText: "text-dark-purple",
      name: "MarfaX",
      pnl24h: "+$5,290",
      totalPnl: "+$32,740",
      openPositions: "2",
      winRate: "90%",
    },
    {
      rank: 4,
      initials: "ZZ",
      badgeBg: "bg-lighter-green",
      badgeText: "text-darker-green",
      name: "ZenithZone",
      pnl24h: "+$5,290",
      totalPnl: "+$32,740",
      openPositions: "7",
      winRate: "67%",
    },
    {
      rank: 5,
      initials: "CP",
      badgeBg: "bg-lighter-yellow",
      badgeText: "text-darker-yellow",
      name: "CoinPilot",
      pnl24h: "-$3,688",
      totalPnl: "-$32,740",
      openPositions: "4",
      winRate: "88%",
    },
  ];

  const changeColor = (v: string) =>
    v.startsWith("-") ? "text-base-red" : "text-dark-green";

  return (
    <div className="flex w-full flex-col rounded-[10px] bg-white">
      <Button className="border-light-gray hover:bg-primary-foreground flex h-fit w-full flex-row justify-between gap-[20px] border-b bg-white px-[20px]! py-[20px] hover:cursor-pointer">
        <p className="font-nohemi text-text-primary text-[14px] leading-[100%] font-medium tracking-[2%]">
          Quick Leaderboard
        </p>
        <ChevronRight className="text-text-secondary" width={14} height={14} />
      </Button>
      <div className="flex w-full flex-col p-[4px]">
        {/* Header row */}
        <div className="hidden w-full flex-row md:flex">
          <div className="flex w-[6%] flex-col gap-[24px] px-[16px] py-[12px]"></div>
          <div className="flex w-[28%] flex-col gap-[24px] px-[16px] py-[12px]">
            <p className="text-text-secondary text-[12px] leading-[100%] font-medium tracking-[-1%]">
              Trader
            </p>
          </div>
          <div className="flex w-[16%] flex-col gap-[24px] px-[16px] py-[12px]">
            <p className="text-text-secondary text-[12px] leading-[100%] font-medium tracking-[-1%]">
              24h PnL
            </p>
          </div>
          <div className="flex w-[16%] flex-col gap-[24px] px-[16px] py-[12px]">
            <p className="text-text-secondary text-[12px] leading-[100%] font-medium tracking-[-1%]">
              Total PnL
            </p>
          </div>
          <div className="flex w-[18%] flex-col gap-[24px] px-[16px] py-[12px]">
            <p className="text-text-secondary text-[12px] leading-[100%] font-medium tracking-[-1%]">
              Open Positions
            </p>
          </div>
          <div className="flex w-[16%] flex-col gap-[24px] px-[16px] py-[12px]">
            <p className="text-text-secondary text-[12px] leading-[100%] font-medium tracking-[-1%]">
              Win Rate
            </p>
          </div>
        </div>

        {/* Mapped rows with smooth hover */}
        {entries.map((e) => (
          <div
            key={e.rank}
            className="hover:border-main hover:bg-primary-foreground flex w-full flex-col gap-[8px] border-t border-transparent transition-colors duration-200 ease-out md:flex-row md:gap-0"
          >
            {/* Mobile compact header + grid */}
            <div className="border-light-gray flex w-full flex-col gap-2 border-b px-[12px] py-[10px] md:hidden">
              <div className="flex items-center gap-3">
                <div className="border-disabled-100 flex max-w-[32px] flex-row gap-[4px] rounded-[100px] border bg-white px-[8px] py-[6px]">
                  <p className="text-sub-500 text-[12px] leading-[100%] font-medium tracking-[-1%]">
                    #{e.rank}
                  </p>
                </div>
                <div
                  className={`flex h-[26px] w-[26px] flex-row items-center justify-center gap-[10px] rounded-[100px] ${e.badgeBg}`}
                >
                  <p
                    className={`text-center text-[12px] leading-[100%] font-semibold tracking-[-1%] ${e.badgeText}`}
                  >
                    {e.initials}
                  </p>
                </div>
                <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-1%]">
                  {e.name}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div>
                  <p className="text-text-secondary text-[11px] font-medium tracking-[-1%]">
                    24h PnL
                  </p>
                  <p
                    className={`text-[12px] font-medium tracking-[-1%] ${changeColor(
                      e.pnl24h,
                    )}`}
                  >
                    {e.pnl24h}
                  </p>
                </div>
                <div>
                  <p className="text-text-secondary text-[11px] font-medium tracking-[-1%]">
                    Total PnL
                  </p>
                  <p
                    className={`text-[12px] font-medium tracking-[-1%] ${changeColor(
                      e.totalPnl,
                    )}`}
                  >
                    {e.totalPnl}
                  </p>
                </div>
                <div>
                  <p className="text-text-secondary text-[11px] font-medium tracking-[-1%]">
                    Open Positions
                  </p>
                  <p className="text-text-primary text-[12px] font-medium tracking-[-1%]">
                    {e.openPositions}
                  </p>
                </div>
                <div>
                  <p className="text-text-secondary text-[11px] font-medium tracking-[-1%]">
                    Win Rate
                  </p>
                  <p className="text-text-primary text-[12px] font-medium tracking-[-1%]">
                    {e.winRate}
                  </p>
                </div>
              </div>
            </div>
            {/* Rank */}
            <div className="hidden w-[6%] flex-row gap-[24px] py-[12px] pl-[16px] md:flex">
              <div className="border-disabled-100 flex max-w-[32px] flex-row gap-[4px] rounded-[100px] border bg-white px-[8px] py-[6px]">
                <p className="text-sub-500 text-[12px] leading-[100%] font-medium tracking-[-1%]">
                  #{e.rank}
                </p>
              </div>
            </div>

            {/* Trader */}
            <div className="hidden w-[28%] flex-row items-center gap-[12px] px-[16px] py-[12px] md:flex">
              <div
                className={`flex h-[26px] w-[26px] flex-row items-center justify-center gap-[10px] rounded-[100px] ${e.badgeBg}`}
              >
                <p
                  className={`text-center text-[12px] leading-[100%] font-semibold tracking-[-1%] ${e.badgeText}`}
                >
                  {e.initials}
                </p>
              </div>
              <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-1%]">
                {e.name}
              </p>
            </div>

            {/* 24h PnL */}
            <div className="hidden w-[16%] flex-col justify-center gap-[24px] px-[16px] py-[12px] md:flex">
              <p
                className={`text-[12px] leading-[100%] font-medium tracking-[-1%] ${changeColor(
                  e.pnl24h,
                )}`}
              >
                {e.pnl24h}
              </p>
            </div>

            {/* Total PnL */}
            <div className="hidden w-[16%] flex-col justify-center gap-[24px] px-[16px] py-[12px] md:flex">
              <p
                className={`text-[12px] leading-[100%] font-medium tracking-[-1%] ${changeColor(
                  e.totalPnl,
                )}`}
              >
                {e.totalPnl}
              </p>
            </div>

            {/* Open Positions */}
            <div className="flex hidden w-[18%] flex-col justify-center gap-[24px] px-[16px] py-[12px] md:flex">
              <p className="text-text-primary text-[12px] leading-[100%] font-medium tracking-[-1%]">
                {e.openPositions}
              </p>
            </div>

            {/* Win Rate */}
            <div className="flex hidden w-[16%] flex-col justify-center gap-[24px] px-[16px] py-[12px] md:flex">
              <p className="text-text-primary text-[12px] leading-[100%] font-medium tracking-[-1%]">
                {e.winRate}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
