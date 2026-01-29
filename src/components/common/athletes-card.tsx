"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import TradeButton from "./trade-button";
import FTag from "./f-tag";
import { useAppDispatch } from "@/lib/store/hooks";
import { openTradeDialog } from "@/lib/store/slices/tradeDialogSlice";
import { ExtendedAthleteData, getTeamById } from "@/lib/data/athletes-bank";

export default function AthletesCard({
  athlete,
}: {
  athlete: ExtendedAthleteData;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [tradeButtonClicked, setTradeButtonClicked] = useState(false);

  const handleCardClick = () => {
    if (!tradeButtonClicked) {
      router.push(`/athlete/${athlete.id}`);
    }
    setTradeButtonClicked(false);
  };

  const handleTradeClick = (type: "long" | "short") => {
    setTradeButtonClicked(true);
    dispatch(
      openTradeDialog({
        tradeType: type,
        mode: "athlete",
        id: athlete.id,
      }),
    );
    // Reset the flag after a brief delay to prevent navigation
    setTimeout(() => {
      setTradeButtonClicked(false);
    }, 100);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-elevation-card relative flex h-auto cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[14px] pt-[24px] pr-[20px] pb-[20px] pl-[20px]"
    >
      <FTag
        percentage={athlete.percentage}
        className="absolute top-2 right-2"
      />
      <Image
        src={athlete.image}
        className="bg-bg-primary h-10 w-10 shrink-0 rounded-full object-cover object-top"
        alt={athlete.name}
        width={40}
        height={40}
      />
      <div className="flex flex-col items-center justify-center pt-2">
        <span className="text-text-primary max-w-[100%] truncate text-sm font-semibold">
          {athlete.name}
        </span>
        <p className="text-text-secondary text-xs font-medium">
          {getTeamById(athlete.teamId)?.abbreviation || ""}
        </p>
      </div>
      <span className="flex flex-row items-center justify-center gap-1 pt-1.5 font-medium">
        <p className="text-text-primary text-xs">{athlete.price}</p>
        <p
          className={`text-xs ${
            athlete.change >= 0 ? "text-light-green" : "text-neon-pink"
          }`}
        >
          {athlete.change >= 0 ? "+" : ""}
          {athlete.change}%
        </p>
      </span>
      <div
        className="flex flex-row items-center justify-between gap-1 pt-2.5"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <TradeButton
          onClick={(e) => {
            e.stopPropagation();
            handleTradeClick("long");
          }}
          type="long"
          className="w-[63px]"
        />
        <TradeButton
          onClick={(e) => {
            e.stopPropagation();
            handleTradeClick("short");
          }}
          type="short"
          className="w-[63px]"
        />
      </div>
    </div>
  );
}
