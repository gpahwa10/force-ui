"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface AthleteData {
  id: string;
  name: string;
  bgColor: string;
  team: string;
  league: string;
  imageUrl: string;
  price: number;
  priceChange: number;
  percentile: number;
}

const mockAthletes: AthleteData[] = [
  {
    id: "lebron",
    name: "LeBron James",
    bgColor: "bg-dark-yellow",
    team: "Los Angeles Lakers",
    league: "NBA",
    imageUrl: "/icons/players/lebron-james.png",
    price: 102.3,
    priceChange: 3.27,
    percentile: 91,
  },
  {
    id: "curry",
    name: "Stephen Curry",
    bgColor: "bg-dark-blue",
    team: "Golden State Warriors",
    league: "NBA",
    imageUrl: "/icons/players/stephen-curry.png",
    price: 101.8,
    priceChange: 2.94,
    percentile: 90,
  },
  {
    id: "durant",
    name: "Kevin Durant",
    bgColor: "bg-dark-purple",
    team: "Phoenix Suns",
    league: "NBA",
    imageUrl: "/icons/players/kevin-durrant.png",
    price: 100.6,
    priceChange: 2.32,
    percentile: 88,
  },
  {
    id: "giannis",
    name: "Giannis Antetok",
    bgColor: "bg-dark-green",
    team: "Milwaukee Bucks",
    league: "NBA",
    imageUrl: "/icons/players/giannis-antetokounmpo.png",
    price: 103.4,
    priceChange: 3.41,
    percentile: 92,
  },
];

export default function AthleteUpdateCard() {
  return (
    <div className="md:bg-soft-500 backdrop-blur-0 rounded-lg bg-transparent p-0 md:p-[45px_40px_0px_40px] md:backdrop-blur-[22px] lg:p-[45px_80px_0px_80px] xl:p-[45px_194px_0px_194px]">
      <div className="border-inactive flex w-full flex-col gap-3 rounded-t-xl border bg-white p-4 md:rounded-t-2xl md:p-5 lg:p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-nohemi text-text-primary text-[15px] leading-[100%] font-medium tracking-[1%] md:text-[16px]">
            Athlete Update
          </h3>
          <button className="font-inter text-text-secondary hover:text-text-primary flex cursor-pointer items-center gap-1 text-[11px] leading-[100%] tracking-[1%] transition-colors md:text-[12px]">
            Explore
            <ChevronRight className="text-text-secondary h-[13px] w-[13px] md:h-[14px] md:w-[14px]" />
          </button>
        </div>

        {/* Athletes list */}
        <div className="flex flex-col">
          {mockAthletes.map((athlete) => {
            const isPositive = athlete.priceChange >= 0;

            return (
              <div
                key={athlete.id}
                className="border-light-gray hover:bg-active-hover/30 flex cursor-pointer flex-col justify-between gap-3 border-b py-3 transition-colors md:flex-row md:items-center md:gap-3 md:py-3.5 lg:gap-[14px] lg:py-4"
              >
                {/* Left: Athlete info */}
                <div className="flex items-center gap-2 md:gap-2.5 lg:gap-3">
                  <div
                    className={`relative h-10 w-10 rounded-md md:h-11 md:w-11 lg:h-12 lg:w-12 ${athlete.bgColor} shrink-0 overflow-hidden`}
                  >
                    <Image
                      src="/icons/athletes/logo.png"
                      alt="Logo"
                      fill
                      className="object-cover object-top opacity-8 mix-blend-screen"
                    />
                    <Image
                      src={athlete.imageUrl}
                      alt={athlete.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="flex flex-col gap-2 md:gap-2 lg:gap-2.5">
                    <span className="font-inter text-text-primary text-[14px] leading-[14px] font-medium tracking-[-0.14px] md:text-[14px] lg:text-[15px] lg:leading-[15px] lg:tracking-[-0.15px]">
                      {athlete.name}
                    </span>
                    <span className="font-inter text-text-secondary text-[12px] leading-[12px] font-normal md:text-[12px] lg:text-[13px] lg:leading-[13px]">
                      {athlete.team} ({athlete.league})
                    </span>
                  </div>
                </div>

                {/* Right: Price and stats */}
                <div className="flex flex-row items-start justify-between gap-2 md:flex-col md:items-end md:justify-start md:gap-2 lg:gap-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-inter text-text-primary text-[14px] leading-[14px] font-medium tracking-[-0.14px] md:text-[14px] lg:text-[15px] lg:leading-[15px] lg:tracking-[-0.15px]">
                      ${athlete.price.toFixed(1)} ELO
                    </span>
                    <span
                      className={cn(
                        "font-inter text-[12px] leading-[12px] font-medium md:text-[12px] lg:text-[13px] lg:leading-[13px]",
                        isPositive ? "text-success" : "text-error",
                      )}
                    >
                      {isPositive ? "+" : ""}
                      {athlete.priceChange.toFixed(2)}%
                    </span>
                  </div>
                  <div className="bg-soft-500/30 flex items-center gap-1 rounded px-1 py-0.5 md:bg-transparent md:px-1.5">
                    <span className="text-[10px] leading-[10px] tracking-[-0.1px] md:text-[10px] lg:text-[11px] lg:leading-[11px] lg:tracking-[-0.11px]">
                      🏅
                    </span>
                    <span className="font-inter text-text-secondary text-[10px] leading-[10px] whitespace-nowrap md:text-[10px] lg:text-[11px] lg:leading-[11px]">
                      {athlete.percentile}st Percentile
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
