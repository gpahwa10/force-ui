"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TableCell, TableRow } from "@/components/ui/table";
import FTag from "./f-tag";
import TradeButton from "./trade-button";
import {
  type ExtendedAthleteData,
  getTeamById,
} from "@/lib/data/athletes-bank";

interface AthleteTableRowProps {
  athlete: ExtendedAthleteData & {
    volume: string;
    volumeChange: number;
    performance: number;
    rank: number;
  };
  onTradeClick: (type: "long" | "short") => void;
}

export default function AthleteTableRow({
  athlete,
  onTradeClick,
}: AthleteTableRowProps) {
  const router = useRouter();
  const changeColor = athlete.change >= 0 ? "text-light-green" : "text-red-500";
  const volumeChangeColor =
    athlete.volumeChange >= 0 ? "text-light-green" : "text-red-500";
  const changeSign = athlete.change >= 0 ? "+" : "";
  const volumeChangeSign = athlete.volumeChange >= 0 ? "+" : "";

  return (
    <TableRow
      onClick={() => router.push(`/athlete/${athlete.id}`)}
      className="bg-elevation-card hover:bg-elevation-card mb-2 overflow-hidden rounded-[14px] border-0 transition-colors duration-200 ease-out hover:cursor-pointer"
    >
      <TableCell className="w-[1%] rounded-tl-[14px] rounded-bl-[14px] px-4 py-3">
        <div className="relative flex w-fit flex-row items-center gap-2 font-medium">
          <div className="bg-bg-primary relative h-8 w-8 overflow-hidden rounded-full">
            <Image
              src={athlete.image}
              alt={athlete.name}
              width={32}
              height={32}
              className="object-cover object-top"
            />
          </div>
          <div className="flex flex-col gap-0.75">
            <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-2%]">
              {athlete.name}
            </p>
            <p className="text-text-secondary text-[12px] leading-[100%] font-medium tracking-[-1%]">
              {getTeamById(athlete.teamId)?.abbreviation || ""}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell className="px-4 py-3">
        <FTag percentage={athlete.percentage} className="w-fit" />
      </TableCell>
      <TableCell className="px-4 py-3">
        <Image
          src="/icons/game/chart.png"
          alt="Chart"
          width={100}
          height={25}
        />
      </TableCell>
      <TableCell className="px-4 py-3">
        <div className="flex flex-col gap-0.75">
          <p className="text-text-primary text-[12px] leading-[100%] font-medium tracking-[-2%]">
            {athlete.price}
          </p>
          <p
            className={`${changeColor} text-[12px] leading-[100%] font-medium tracking-[-1%]`}
          >
            {changeSign}
            {athlete.change.toFixed(2)}%
          </p>
        </div>
      </TableCell>
      <TableCell className="px-4 py-3">
        <div className="flex flex-col gap-0.75">
          <p className="text-text-primary text-[12px] leading-[100%] font-medium tracking-[-2%]">
            {athlete.volume}
          </p>
          <p
            className={`${volumeChangeColor} text-[12px] leading-[100%] font-medium tracking-[-1%]`}
          >
            {volumeChangeSign}
            {athlete.volumeChange.toFixed(2)}%
          </p>
        </div>
      </TableCell>
      <TableCell className="text-text-primary px-4 py-3">
        {athlete.performance}%
      </TableCell>
      <TableCell className="text-text-primary px-4 py-3">
        #{athlete.rank}
      </TableCell>
      <TableCell
        className="w-[1%] rounded-tr-[14px] rounded-br-[14px] px-4 py-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row items-center gap-1">
          <TradeButton
            onClick={(e) => {
              e.stopPropagation();
              onTradeClick("long");
            }}
            type="long"
          />
          <TradeButton
            onClick={(e) => {
              e.stopPropagation();
              onTradeClick("short");
            }}
            type="short"
          />
        </div>
      </TableCell>
    </TableRow>
  );
}
