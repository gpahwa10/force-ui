"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useState } from "react";
import LivePerformanceChart, { TimeRangeT } from "./live-performance-chart";
import {
  commaFormatterDecimals2,
  currencyFormatter,
  moneyFormatter,
} from "@/lib/formatter";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import MarketModal from "./market-modal";
import Link from "next/link";

const timeRanges: TimeRangeT[] = ["1H", "6H", "1D", "1W", "ALL"];

type PlayerDataT = {
  name: string;
  team: string;
  teamAbbr: string;
  playerIconSrc: string;
  teamIconSrc: string;
  price: number;
  change24h: number;
  volume24h: number;
  news: string;
  priceTrendLabel: string;
};

const players: PlayerDataT[] = [
  {
    name: "LeBron James",
    team: "Los Angeles Lakers",
    teamAbbr: "LAL",
    playerIconSrc: "/icons/players/lebron-james.png",
    teamIconSrc: "/icons/events/lal.png",
    price: 124.6,
    change24h: 3.42,
    volume24h: 1245678,
    news: "The Lakers have been on a 4-game winning streak, driven by strong performances from LeBron James and Anthony Davis.",
    priceTrendLabel: "LeBron Price Trend",
  },
  {
    name: "Stephen Curry",
    team: "Golden State Warriors",
    teamAbbr: "GSW",
    playerIconSrc: "/icons/players/stephen-curry.png",
    teamIconSrc: "/icons/events/lal.png",
    price: 118.3,
    change24h: 2.94,
    volume24h: 987432,
    news: "Curry's exceptional three-point shooting has led the Warriors to three consecutive victories, boosting market confidence.",
    priceTrendLabel: "Curry Price Trend",
  },
  {
    name: "Kevin Durant",
    team: "Phoenix Suns",
    teamAbbr: "PHX",
    playerIconSrc: "/icons/players/kevin-durrant.png",
    teamIconSrc: "/icons/events/lal.png",
    price: 115.8,
    change24h: 2.32,
    volume24h: 856234,
    news: "Durant's consistent scoring and leadership have positioned the Suns as strong contenders in the Western Conference.",
    priceTrendLabel: "Durant Price Trend",
  },
  {
    name: "Giannis Antetok",
    team: "Milwaukee Bucks",
    teamAbbr: "MIL",
    playerIconSrc: "/icons/players/lebron-james.png",
    teamIconSrc: "/icons/events/lal.png",
    price: 112.4,
    change24h: 1.87,
    volume24h: 743891,
    news: "The Greek Freak's dominant performances continue to drive the Bucks' success, with impressive stats across the board.",
    priceTrendLabel: "Giannis Price Trend",
  },
  {
    name: "Luka Doncic",
    team: "Dallas Mavericks",
    teamAbbr: "DAL",
    playerIconSrc: "/icons/players/lebron-james.png",
    teamIconSrc: "/icons/events/lal.png",
    price: 109.7,
    change24h: 1.65,
    volume24h: 692156,
    news: "Doncic's triple-double performances have been instrumental in the Mavericks' recent surge up the standings.",
    priceTrendLabel: "Luka Price Trend",
  },
];

export default function LivePerformanceCard() {
  const [timeRange, setTimeRange] = useState<TimeRangeT>("ALL");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openSide, setOpenSide] = useState<"long" | "short" | null>(null);

  const currentPlayer = players[currentIndex];
  const nextPlayer = players[(currentIndex + 1) % players.length];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + players.length) % players.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % players.length);
  };

  return (
    <div className="flex w-full flex-col rounded-[10px] bg-white">
      <Button
        asChild
        className="border-light-gray hover:bg-primary-foreground flex h-fit w-full flex-row justify-between gap-[20px] border-b bg-white px-[20px]! py-[20px] hover:cursor-pointer"
      >
        <Link href="/athlete/lebron-james">
          <p className="font-nohemi text-text-primary text-sm leading-[100%] font-medium tracking-[2%]">
            Live Performance
          </p>
          <ChevronRight
            className="text-text-secondary"
            width={14}
            height={14}
          />
        </Link>
      </Button>

      <div className="p-5">
        <div className="flex flex-col gap-y-6 lg:flex-row lg:gap-x-12">
          <div className="flex w-full shrink-0 flex-col gap-y-5 transition-opacity duration-300 lg:w-[260px]">
            <div className="flex items-center gap-x-3">
              <div className="h-11 w-11 rounded-lg bg-[#0A0D14]/3 px-1 py-2.5">
                <Image
                  className="aspect-auto w-full object-contain"
                  src={currentPlayer.teamIconSrc}
                  width={100}
                  height={100}
                  alt={currentPlayer.teamAbbr}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-x-2">
                  <div className="bg-dark-green h-1.5 w-1.5 rounded-full" />
                  <p className="text-dark-green text-xs font-medium">
                    Realtime Market
                  </p>
                </div>

                <p className="text-text-primary text-base font-semibold">
                  {currentPlayer.teamAbbr}
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="space-y-2.5">
                <p className="text-text-secondary text-[11px] font-medium">
                  Price
                </p>
                <p className="text-text-primary text-sm font-semibold">
                  {currencyFormatter.format(currentPlayer.price)}
                </p>
              </div>

              <div className="space-y-2.5">
                <p className="text-text-secondary text-[11px] font-medium">
                  24H Change
                </p>
                <p
                  className={`text-sm font-semibold ${
                    currentPlayer.change24h >= 0
                      ? "text-dark-green"
                      : "text-base-red"
                  }`}
                >
                  {currentPlayer.change24h >= 0 ? "+" : ""}
                  {commaFormatterDecimals2.format(currentPlayer.change24h)}%
                </p>
              </div>

              <div className="space-y-2.5">
                <p className="text-text-secondary text-[11px] font-medium">
                  24H Volume
                </p>
                <p className="text-text-primary text-sm font-semibold">
                  {moneyFormatter.format(currentPlayer.volume24h)}
                </p>
              </div>
            </div>

            <Dialog
              open={openSide !== null}
              onOpenChange={(open) => {
                if (!open) setOpenSide(null);
              }}
            >
              <div className="flex gap-x-2.5">
                <DialogTrigger asChild>
                  <Button
                    lip="on"
                    onClick={() => setOpenSide("long")}
                    className="bg-base-purple hover:bg-base-purple/90 cursor-pointer rounded-lg px-12 py-2.5 text-sm font-medium text-white"
                  >
                    Long
                  </Button>
                </DialogTrigger>
                <DialogTrigger asChild>
                  <Button
                    lip="on"
                    onClick={() => setOpenSide("short")}
                    className="bg-base-orange hover:bg-base-orange/90 cursor-pointer rounded-lg px-12 py-2.5 text-sm font-medium text-white"
                  >
                    Short
                  </Button>
                </DialogTrigger>
              </div>
              <DialogContent
                className="max-h-[700px] w-[400px] overflow-y-hidden overscroll-contain bg-white px-0 py-0 [-ms-overflow-style:none] [scrollbar-width:none] hover:overflow-y-auto [&::-webkit-scrollbar]:hidden"
                showCloseButton={false}
              >
                <MarketModal type={openSide ?? "long"} />
              </DialogContent>
            </Dialog>

            <div className="space-y-1 text-[11px]">
              <p className="text-text-secondary line-clamp-2 font-light">
                <span className="text-text-primary font-semibold">News: </span>
                {currentPlayer.news}
              </p>

              <button className="text-text-primary flex cursor-pointer items-center gap-x-1 text-xs font-medium underline-offset-4 hover:underline">
                More Details{" "}
                <ChevronRight className="mt-0.5 aspect-auto w-3.5" />
              </button>
            </div>
          </div>

          <div className="flex w-full min-w-0 flex-1 flex-col gap-y-4">
            <div className="flex justify-between">
              <div className="flex items-center gap-x-2">
                <Image
                  src="/icons/live-performance/chart-line.svg"
                  className="h-[14px] w-[14px]"
                  width={14}
                  height={14}
                  alt="chart-line"
                />
                <div className="text-text-primary text-xs font-semibold">
                  Performances
                </div>
              </div>

              <div className="flex items-center gap-1">
                {timeRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                      timeRange === range
                        ? "bg-soft-gray text-text-primary"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            <LivePerformanceChart timeRange={timeRange} />
          </div>
        </div>

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <button
              onClick={handlePrevious}
              className="group hover:bg-primary-foreground relative flex aspect-square w-8 cursor-pointer items-center justify-center overflow-visible rounded-lg border border-[#0A0D14]/7 transition-colors duration-200 after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[0_3px_0_0_rgba(10,13,20,0.06),inset_0_-2px_0_0_rgba(255,255,255,0.18)] after:content-['']"
            >
              <ChevronLeft className="group-hover:text-text-primary aspect-auto w-3.5 text-[#989A9E]" />
            </button>

            <p className="text-text-secondary text-[11px]">
              {currentPlayer.priceTrendLabel}
            </p>
          </div>

          <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-x-2">
            {players.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`cursor-pointer rounded-full transition-all duration-200 hover:opacity-80 ${
                  index === currentIndex
                    ? "bg-main h-[5px] w-[11px]"
                    : "h-[5px] w-[5px] bg-[#E2E4E9]"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-x-4">
            <p className="text-text-secondary text-[11px]">
              {nextPlayer.name} Price
            </p>

            <button
              onClick={handleNext}
              className="group hover:bg-primary-foreground relative flex aspect-square w-8 cursor-pointer items-center justify-center overflow-visible rounded-lg border border-[#0A0D14]/7 transition-colors duration-200 after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[0_3px_0_0_rgba(10,13,20,0.06),inset_0_-2px_0_0_rgba(255,255,255,0.18)] after:content-['']"
            >
              <ChevronRight className="group-hover:text-text-primary aspect-auto w-3.5 text-[#989A9E]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
