"use client";

import Image from "next/image";
import Link from "next/link";
import LiveDot from "@/components/common/live-dot";
import TradeButton from "@/components/common/trade-button";
import { GameTeamData } from "@/lib/data/today-games";

interface LiveInfoSectionProps {
  status: string;
  team1: GameTeamData;
  team2: GameTeamData;
  onTradeClick: (
    teamName: string,
    teamPrice: string,
    teamChange: number,
    type: "long" | "short",
  ) => void;
}

export default function LiveInfoSection({
  status,
  team1,
  team2,
  onTradeClick,
}: LiveInfoSectionProps) {
  return (
    <section id="live-info">
      <div className="max-w-global border-border-secondary mx-auto w-full border-x">
        <div className="flex flex-col items-center justify-center gap-[1.25rem] overflow-hidden px-[1.25rem] py-[1.25rem]">
          {/* Header Section */}
          <div className="flex flex-col items-center gap-[0.75rem]">
            <div className="flex flex-col items-center justify-center gap-[0.5rem]">
              {/* Live Tag */}
              <div className="flex items-center gap-[0.375rem] rounded-lg bg-elevation-button px-[0.5rem] py-[0.375rem] backdrop-blur-[0.625rem]">
                <LiveDot />
                <span className="text-text-primary text-[0.6875rem] font-medium leading-[0.6875rem] tracking-[-0.00625rem]">
                  Live
                </span>
              </div>
              {/* Quarter Status */}
              <p className="text-text-secondary text-[0.6875rem] font-medium leading-[0.6875rem] tracking-[-0.00625rem]">
                {status}
              </p>
            </div>

            {/* Teams Container */}
            <div className="flex w-full max-w-[69rem] items-center gap-[1.5rem] flex-row">
              {/* Team 1 Container */}
              <div className="flex flex-1 flex-col items-end gap-[1rem]">
                {/* Score Row */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-[0.5rem]">
                  <Link
                    href={`/team/${team1.slug}`}
                    className="flex items-center gap-[0.5rem]"
                  >
                    <h4 className="text-text-secondary text-[0.875rem] font-medium leading-[1rem] tracking-[-0.0125rem]">
                      {team1.name}
                    </h4>
                    <div className="flex h-[2rem] w-[2rem] items-center justify-center">
                      <Image
                        src={team1.icon}
                        alt={team1.name}
                        width={32}
                        height={32}
                        className="h-[2rem] w-[2rem]"
                      />
                    </div>
                  </Link>
                  <div className="w-[6.25rem] text-right">
                    <h1 className="font-inter text-text-primary text-[3rem] font-semibold leading-[100%] tracking-[-0.04rem]">
                      {team1.score}
                    </h1>
                  </div>
                </div>

                {/* Price and Buttons Row */}
                <div className="flex flex-col items-end gap-[0.75rem]">
                  {/* Price Container */}
                  <div className="flex h-[1.3125rem] items-center justify-end gap-[0.25rem]">
                    <span className="text-text-primary text-center text-[0.875rem] font-semibold leading-[1rem] tracking-[-0.0125rem]">
                      {team1.price}
                    </span>
                    <span
                      className={`text-center text-[0.875rem] font-semibold leading-[1rem] tracking-[-0.0125rem] ${
                        team1.change >= 0
                          ? "text-light-green"
                          : "text-neon-pink"
                      }`}
                    >
                      {team1.change >= 0 ? "+" : ""}
                      {team1.change.toFixed(2)}%
                    </span>
                  </div>

                  {/* Trade Buttons */}
                  <div className="flex w-[8.75rem] items-start gap-[0.25rem]">
                    <TradeButton
                      type="long"
                      className="w-[3.9375rem]"
                      onClick={() =>
                        onTradeClick(team1.name, team1.price, team1.change, "long")
                      }
                    />
                    <TradeButton
                      type="short"
                      className="w-[3.9375rem]"
                      onClick={() =>
                        onTradeClick(team1.name, team1.price, team1.change, "short")
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="bg-border-secondary h-[0.0625rem] w-full md:h-auto md:w-[0.0625rem] md:self-stretch"></div>

              <div className="flex flex-1 flex-col items-start gap-[1rem]">
                <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-[0.5rem]">
                  <div className="w-[6.25rem]">
                    <h1 className="font-inter text-text-primary text-[3rem] font-semibold leading-[100%] tracking-[-0.04rem]">
                      {team2.score}
                    </h1>
                  </div>
                  <Link
                    href={`/team/${team2.slug}`}
                    className="flex items-center gap-[0.5rem]"
                  >
                    <div className="flex h-[2rem] w-[2rem] items-center justify-center">
                      <Image
                        src={team2.icon}
                        alt={team2.name}
                        width={32}
                        height={32}
                        className="h-[2rem] w-[2rem]"
                      />
                    </div>
                    <h4 className="text-text-secondary text-[0.875rem] font-medium leading-[1rem] tracking-[-0.0125rem]">
                      {team2.name}
                    </h4>
                  </Link>
                </div>

                {/* Price and Buttons Row */}
                <div className="flex flex-col items-start gap-[0.75rem]">
                  {/* Price Container */}
                  <div className="flex h-[1.3125rem] items-center gap-[0.25rem]">
                    <span className="text-text-primary text-center text-[0.875rem] font-semibold leading-[1rem] tracking-[-0.0125rem]">
                      {team2.price}
                    </span>
                    <span
                      className={`text-center text-[0.875rem] font-semibold leading-[1rem] tracking-[-0.0125rem] ${
                        team2.change >= 0 ? "text-light-green" : "text-neon-pink"
                      }`}
                    >
                      {team2.change >= 0 ? "+" : ""}
                      {team2.change.toFixed(2)}%
                    </span>
                  </div>

                  {/* Trade Buttons */}
                  <div className="flex w-[8.75rem] items-start gap-[0.25rem]">
                    <TradeButton
                      type="long"
                      className="w-[3.9375rem]"
                      onClick={() =>
                        onTradeClick(team2.name, team2.price, team2.change, "long")
                      }
                    />
                    <TradeButton
                      type="short"
                      className="w-[3.9375rem]"
                      onClick={() =>
                        onTradeClick(team2.name, team2.price, team2.change, "short")
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

