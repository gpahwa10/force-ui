"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import TradeButton from "../common/trade-button";
import { useAppDispatch } from "@/lib/store/hooks";
import { openTradeDialog } from "@/lib/store/slices/tradeDialogSlice";
import { getTeamByName } from "@/lib/data/athletes-bank";
import { type GameTeamData } from "@/lib/data/today-games";

interface GameCardProps {
  id?: string;
  image?: string;
  team1: GameTeamData;
  team2: GameTeamData;
  status: string;
  volume: string;
}

export default function GameCard({
  id,
  image = "/images/moments/basketball-moment.png",
  team1,
  team2,
  status,
  volume,
}: GameCardProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [tradeButtonClicked, setTradeButtonClicked] = useState(false);

  const handleCardClick = () => {
    if (!tradeButtonClicked) {
      router.push(`/live/${id || "game-1"}`);
    }
    setTradeButtonClicked(false);
  };

  const handleTradeClick = (
    teamName: string,
    teamPrice: string,
    teamChange: number,
    type: "long" | "short",
  ) => {
    setTradeButtonClicked(true);
    const team = getTeamByName(teamName);
    if (team) {
      dispatch(
        openTradeDialog({
          tradeType: type,
          mode: "team",
          id: team.id,
          teamPrice: teamPrice,
          teamChange: teamChange,
        }),
      );
    }
    // Reset the flag after a brief delay to prevent navigation
    setTimeout(() => {
      setTradeButtonClicked(false);
    }, 100);
  };

  return (
    <div
      className="bg-elevation-card relative h-auto w-[356px] cursor-pointer overflow-hidden rounded-[14px]"
      onClick={handleCardClick}
    >
      <div className="relative">
        <Image
          src={image}
          className="h-[140px] w-full object-cover "
          alt="NBA Game"
          width={356}
          height={140}
        />
        <div className="absolute top-4 left-4 flex flex-row items-center justify-center gap-2 rounded-lg bg-gray-600/30 backdrop-blur-[20px] px-2 py-1 text-xs text-white">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          Live
        </div>
      </div>
      <div className="grid grid-cols-[auto_auto_auto_1fr] gap-x-3.5 gap-y-1 px-4 py-2">
        {/* Team 1 Row */}
        <div className="contents">
          <p className="text-text-primary text-[20px] font-semibold">
            {team1.score}
          </p>
          <div className="flex flex-row items-center justify-start gap-2">
            <Image src={team1.icon} alt={team1.name} width={18} height={18} />
            <p className="text-text-secondary text-xs font-semibold">
              {team1.name}
            </p>
          </div>
          <span className="text-text-primary flex flex-row items-center gap-2 text-xs font-medium whitespace-nowrap">
            {team1.price}{" "}
            <p
              className={
                team1.change >= 0 ? "text-light-green" : "text-neon-pink"
              }
            >
              {team1.change >= 0 ? "+" : ""}
              {team1.change}%
            </p>
          </span>
          <div
            className="flex flex-row items-center justify-end gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            <TradeButton
              type="long"
              onClick={(e) => {
                e.stopPropagation();
                handleTradeClick(team1.name, team1.price, team1.change, "long");
              }}
            />
            <TradeButton
              type="short"
              onClick={(e) => {
                e.stopPropagation();
                handleTradeClick(
                  team1.name,
                  team1.price,
                  team1.change,
                  "short",
                );
              }}
            />
          </div>
        </div>

        {/* Team 2 Row */}
        <div className="contents">
          <p className="text-text-primary text-[20px] font-semibold">
            {team2.score}
          </p>
          <div className="flex flex-row items-center justify-start gap-2">
            <Image src={team2.icon} alt={team2.name} width={18} height={18} />
            <p className="text-text-secondary text-xs font-semibold">
              {team2.name}
            </p>
          </div>
          <span className="text-text-primary flex flex-row items-center gap-2 text-xs font-medium whitespace-nowrap">
            {team2.price}{" "}
            <p
              className={
                team2.change >= 0 ? "text-light-green" : "text-neon-pink"
              }
            >
              {team2.change >= 0 ? "+" : ""}
              {team2.change}%
            </p>
          </span>
          <div
            className="flex flex-row items-center justify-end gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            <TradeButton
              type="long"
              onClick={(e) => {
                e.stopPropagation();
                handleTradeClick(team2.name, team2.price, team2.change, "long");
              }}
            />
            <TradeButton
              type="short"
              onClick={(e) => {
                e.stopPropagation();
                handleTradeClick(
                  team2.name,
                  team2.price,
                  team2.change,
                  "short",
                );
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between gap-2 px-4 pb-4">
        <h6 className="text-text-secondary text-xs font-medium">{status}</h6>
        <h6 className="text-text-secondary text-xs font-medium">{volume}</h6>
      </div>
    </div>
  );
}
