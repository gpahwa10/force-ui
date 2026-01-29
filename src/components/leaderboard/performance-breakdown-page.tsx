import { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";

interface TeamPerformance {
  rank: number;
  name: string;
  logo: string;
  league: string;
  tradingVolume: string;
  totalTrades: number;
  avgTradeSize: string;
  topTraders: number;
  change24h: string;
  isPositive: boolean;
}

interface AthletePerformance {
  rank: number;
  name: string;
  image: string;
  team: string;
  tradingVolume: string;
  totalTrades: number;
  avgTradeSize: string;
  priceChange: string;
  isPositive: boolean;
  backgroundColor: string;
}

const teamsData: TeamPerformance[] = [
  {
    rank: 1,
    name: "Los Angeles Lakers",
    logo: "/icons/events/lal.png",
    league: "NBA",
    tradingVolume: "$2.4M",
    totalTrades: 8420,
    avgTradeSize: "$285",
    topTraders: 142,
    change24h: "+12.4%",
    isPositive: true,
  },
  {
    rank: 2,
    name: "Golden State Warriors",
    logo: "/icons/events/gsw.png",
    league: "NBA",
    tradingVolume: "$2.1M",
    totalTrades: 7320,
    avgTradeSize: "$287",
    topTraders: 128,
    change24h: "+8.7%",
    isPositive: true,
  },
  {
    rank: 3,
    name: "Boston Celtics",
    logo: "/icons/events/sam-merrill.png",
    league: "NBA",
    tradingVolume: "$1.9M",
    totalTrades: 6820,
    avgTradeSize: "$289",
    topTraders: 115,
    change24h: "+7.2%",
    isPositive: true,
  },
];

const athletesData: AthletePerformance[] = [
  {
    rank: 1,
    name: "LeBron James",
    image: "/icons/athletes/lebron-james.png",
    team: "Los Angeles Lakers",
    tradingVolume: "$845K",
    totalTrades: 2940,
    avgTradeSize: "$287",
    priceChange: "+15.2%",
    isPositive: true,
    backgroundColor: "bg-dark-yellow",
  },
  {
    rank: 2,
    name: "Stephen Curry",
    image: "/icons/athletes/stephen-curry.png",
    team: "Golden State Warriors",
    tradingVolume: "$782K",
    totalTrades: 2730,
    avgTradeSize: "$286",
    priceChange: "+11.8%",
    isPositive: true,
    backgroundColor: "bg-dark-blue",
  },
  {
    rank: 3,
    name: "Anthony Davis",
    image: "/icons/athletes/anthony-davis.png",
    team: "Los Angeles Lakers",
    tradingVolume: "$487K",
    totalTrades: 1690,
    avgTradeSize: "$288",
    priceChange: "+6.7%",
    isPositive: true,
    backgroundColor: "bg-forest-green",
  },
  {
    rank: 4,
    name: "Luka Dončić",
    image: "/icons/athletes/luka-doncic.png",
    team: "Dallas Mavericks",
    tradingVolume: "$456K",
    totalTrades: 1580,
    avgTradeSize: "$289",
    priceChange: "-2.3%",
    isPositive: false,
    backgroundColor: "bg-dark-blue",
  },
];

export default function PerformanceBreakdownPage({
  onBack,
}: {
  onBack?: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"teams" | "athletes">("teams");

  return (
    <div className="flex w-[1020px] flex-col overflow-y-auto overscroll-contain pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex w-full flex-col gap-5 pt-6">
        {/* Header */}
        <div className="flex w-full flex-row items-center gap-4">
          <Button
            lip="on"
            className="border-main/7 hover:bg-primary-foreground flex h-8 w-8 flex-row items-center justify-center gap-2 rounded-[7px] border bg-white px-0 hover:cursor-pointer"
            onClick={onBack}
          >
            <Image
              src="/icons/arrow-left.svg"
              width={14}
              height={14}
              alt="Arrow Left"
            />
          </Button>

          <p className="font-nohemi text-text-primary text-[20px] leading-[100%] font-medium tracking-[2%]">
            Performance Breakdown
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-row gap-2">
          <Button
            onClick={() => setActiveTab("teams")}
            className={`flex h-fit flex-row items-center justify-center gap-1 rounded-[100px] border px-4 py-2 transition-colors duration-200 ease-out hover:cursor-pointer ${
              activeTab === "teams"
                ? "bg-main border-black/5"
                : "border-main/7 hover:bg-primary-foreground bg-white"
            }`}
          >
            <p
              className={`text-[12px] leading-[100%] font-medium tracking-[-1%] ${
                activeTab === "teams" ? "text-white" : "text-sub-500"
              }`}
            >
              Top Teams
            </p>
          </Button>
          <Button
            onClick={() => setActiveTab("athletes")}
            className={`flex h-fit flex-row items-center justify-center gap-1 rounded-[100px] border px-4 py-2 transition-colors duration-200 ease-out hover:cursor-pointer ${
              activeTab === "athletes"
                ? "bg-main border-black/5"
                : "border-main/7 hover:bg-primary-foreground bg-white"
            }`}
          >
            <p
              className={`text-[12px] leading-[100%] font-medium tracking-[-1%] ${
                activeTab === "athletes" ? "text-white" : "text-sub-500"
              }`}
            >
              Top Athletes
            </p>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="mt-6 flex w-full flex-col">
        {activeTab === "teams" ? (
          <div className="flex w-full flex-col rounded-[10px] bg-white">
            {/* Table Header */}
            <div className="border-light-gray flex w-full flex-row gap-4 border-b px-5 py-3">
              <p className="text-text-secondary w-[8%] text-[12px] leading-[100%] font-medium tracking-[-1%]">
                Rank
              </p>
              <p className="text-text-secondary w-[25%] text-[12px] leading-[100%] font-medium tracking-[-1%]">
                Team
              </p>
              <p className="text-text-secondary w-[12%] text-[12px] leading-[100%] font-medium tracking-[-1%]">
                24H Volume
              </p>
              <p className="text-text-secondary w-[12%] text-[12px] leading-[100%] font-medium tracking-[-1%]">
                Total Trades
              </p>
              <p className="text-text-secondary w-[13%] text-[12px] leading-[100%] font-medium tracking-[-1%]">
                Avg Trade Size
              </p>
              <p className="text-text-secondary w-[12%] text-[12px] leading-[100%] font-medium tracking-[-1%]">
                Top Traders
              </p>
              <p className="text-text-secondary w-[12%] text-right text-[12px] leading-[100%] font-medium tracking-[-1%]">
                24H Change
              </p>
            </div>

            {/* Table Rows */}
            {teamsData.map((team) => (
              <div
                key={team.rank}
                className="border-light-gray hover:bg-primary-foreground flex w-full flex-row gap-4 border-b px-5 py-4 transition-colors duration-200 last:border-b-0"
              >
                <div className="flex w-[8%] items-center">
                  <p className="text-text-primary text-[13px] leading-[100%] font-medium tracking-[-1%]">
                    #{team.rank}
                  </p>
                </div>
                <div className="flex w-[25%] flex-row items-center gap-2.5">
                  <div className="bg-primary-foreground flex h-8 w-8 items-center justify-center overflow-hidden rounded-full">
                    <Image
                      src={team.logo}
                      alt={team.name}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-text-primary text-[13px] leading-[100%] font-medium tracking-[-1%]">
                      {team.name}
                    </p>
                    <p className="text-text-secondary text-[11px] leading-[100%] font-medium tracking-[-1%]">
                      {team.league}
                    </p>
                  </div>
                </div>
                <div className="flex w-[12%] items-center">
                  <p className="text-text-primary text-[13px] leading-[100%] font-medium tracking-[-1%]">
                    {team.tradingVolume}
                  </p>
                </div>
                <div className="flex w-[12%] items-center">
                  <p className="text-text-primary text-[13px] leading-[100%] font-medium tracking-[-1%]">
                    {team.totalTrades.toLocaleString()}
                  </p>
                </div>
                <div className="flex w-[13%] items-center">
                  <p className="text-text-primary text-[13px] leading-[100%] font-medium tracking-[-1%]">
                    {team.avgTradeSize}
                  </p>
                </div>
                <div className="flex w-[12%] items-center">
                  <p className="text-text-primary text-[13px] leading-[100%] font-medium tracking-[-1%]">
                    {team.topTraders}
                  </p>
                </div>
                <div className="flex w-[12%] items-center justify-end">
                  <p
                    className={`text-[13px] leading-[100%] font-medium tracking-[-1%] ${
                      team.isPositive ? "text-success-500" : "text-error-500"
                    }`}
                  >
                    {team.change24h}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex w-full flex-col rounded-[10px] bg-white">
            {/* Table Header */}
            <div className="border-light-gray flex w-full flex-row gap-4 border-b px-5 py-3">
              <p className="text-text-secondary w-[8%] text-[12px] leading-[100%] font-medium tracking-[-1%]">
                Rank
              </p>
              <p className="text-text-secondary w-[27%] text-[12px] leading-[100%] font-medium tracking-[-1%]">
                Athlete
              </p>
              <p className="text-text-secondary w-[13%] text-[12px] leading-[100%] font-medium tracking-[-1%]">
                24H Volume
              </p>
              <p className="text-text-secondary w-[13%] text-[12px] leading-[100%] font-medium tracking-[-1%]">
                Total Trades
              </p>
              <p className="text-text-secondary w-[13%] text-[12px] leading-[100%] font-medium tracking-[-1%]">
                Avg Trade Size
              </p>
              <p className="text-text-secondary w-[13%] text-right text-[12px] leading-[100%] font-medium tracking-[-1%]">
                Price Change
              </p>
            </div>

            {/* Table Rows */}
            {athletesData.map((athlete) => (
              <div
                key={athlete.rank}
                className="border-light-gray hover:bg-primary-foreground flex w-full flex-row gap-4 border-b px-5 py-4 transition-colors duration-200 last:border-b-0"
              >
                <div className="flex w-[8%] items-center">
                  <p className="text-text-primary text-[13px] leading-[100%] font-medium tracking-[-1%]">
                    #{athlete.rank}
                  </p>
                </div>
                <div className="flex w-[27%] flex-row items-center gap-2.5">
                  <div
                    className={`relative h-10 w-10 rounded-md ${athlete.backgroundColor} overflow-hidden`}
                  >
                    <Image
                      src="/icons/athletes/logo.png"
                      alt="Logo"
                      fill
                      className="object-cover object-top opacity-8 mix-blend-screen"
                    />
                    <Image
                      src={athlete.image}
                      alt={athlete.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-text-primary text-[13px] leading-[100%] font-medium tracking-[-1%]">
                      {athlete.name}
                    </p>
                    <p className="text-text-secondary text-[11px] leading-[100%] font-medium tracking-[-1%]">
                      {athlete.team}
                    </p>
                  </div>
                </div>
                <div className="flex w-[13%] items-center">
                  <p className="text-text-primary text-[13px] leading-[100%] font-medium tracking-[-1%]">
                    {athlete.tradingVolume}
                  </p>
                </div>
                <div className="flex w-[13%] items-center">
                  <p className="text-text-primary text-[13px] leading-[100%] font-medium tracking-[-1%]">
                    {athlete.totalTrades.toLocaleString()}
                  </p>
                </div>
                <div className="flex w-[13%] items-center">
                  <p className="text-text-primary text-[13px] leading-[100%] font-medium tracking-[-1%]">
                    {athlete.avgTradeSize}
                  </p>
                </div>
                <div className="flex w-[13%] items-center justify-end">
                  <p
                    className={`text-[13px] leading-[100%] font-medium tracking-[-1%] ${
                      athlete.isPositive ? "text-success-500" : "text-error-500"
                    }`}
                  >
                    {athlete.priceChange}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
