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

/** Live stats from WebSocket: PTS, AST, REB, Index, $ (price), Δ, % change, Min */
export interface LiveStats {
  pts?: number;
  ast?: number;
  reb?: number;
  index?: number;
  /** Dollar value = player price */
  price?: string | number;
  indexChange?: number;
  indexChangePct?: number;
  min?: number;
}

interface AthleteTableRowProps {
  athlete: ExtendedAthleteData & {
    volume: string;
    volumeChange: number;
    performance: number;
    rank: number;
  };
  onTradeClick: (type: "long" | "short") => void;
  /** When provided, PTS/AST/REB/Index/$/Δ/%/Min are shown from live data */
  liveStats?: LiveStats;
  /** When true, show PTS, AST, REB, Index, $, Δ, % change, Min columns */
  showLiveColumns?: boolean;
  /** When provided, show this instead of getTeamById(athlete.teamId)?.abbreviation (e.g. live team name from WebSocket) */
  teamDisplayName?: string;
}

function formatPrice(v: string | number | undefined): string {
  if (v === undefined) return "—";
  if (typeof v === "number") return `$${v.toFixed(2)}`;
  return String(v);
}

export default function AthleteTableRow({
  athlete,
  onTradeClick,
  liveStats,
  showLiveColumns = false,
  teamDisplayName,
}: AthleteTableRowProps) {
  const router = useRouter();
  const hasLive = showLiveColumns && liveStats;
  const hasLiveStats = !!liveStats;
  const priceDisplay = hasLiveStats && liveStats.price !== undefined
    ? (typeof liveStats.price === "string" ? liveStats.price : formatPrice(liveStats.price))
    : hasLive && liveStats.price !== undefined
      ? formatPrice(liveStats.price)
      : athlete.price;
  const changeVal = hasLive && liveStats.indexChangePct !== undefined ? liveStats.indexChangePct : athlete.change;
  const deltaVal = hasLiveStats && liveStats.indexChange !== undefined ? liveStats.indexChange : null;
  const changeColor = (deltaVal != null ? deltaVal >= 0 : changeVal >= 0) ? "text-light-green" : "text-neon-pink";
  const volumeChangeColor =
    athlete.volumeChange >= 0 ? "text-light-green" : "text-red-500";
  const changeSign = (deltaVal != null ? deltaVal >= 0 : changeVal >= 0) ? "+" : "";
  const volumeChangeSign = athlete.volumeChange >= 0 ? "+" : "";
  const indexPct = athlete.percentage;
  const teamLabel = teamDisplayName ?? getTeamById(athlete.teamId)?.abbreviation ?? "";
  const performanceDisplay = hasLiveStats && liveStats.index !== undefined
    ? typeof liveStats.index === "number"
      ? liveStats.index.toFixed(2)
      : "—"
    : athlete.performance;
  const volumeDisplay = hasLiveStats ? "—" : athlete.volume;
  const volumeChangeDisplay = hasLiveStats ? "—" : `${volumeChangeSign}${athlete.volumeChange.toFixed(2)}%`;

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
              {teamLabel}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell className="px-4 py-3">
        <FTag percentage={hasLiveStats && liveStats.index !== undefined ? liveStats.index as number : athlete.percentage} className="w-fit" />
      </TableCell>
      {hasLive && (
        <>
          <TableCell className="text-text-primary px-4 py-3 text-[12px] font-medium">
            {liveStats.pts ?? "—"}
          </TableCell>
          <TableCell className="text-text-primary px-4 py-3 text-[12px] font-medium">
            {liveStats.ast ?? "—"}
          </TableCell>
          <TableCell className="text-text-primary px-4 py-3 text-[12px] font-medium">
            {liveStats.reb ?? "—"}
          </TableCell>
          <TableCell className="text-text-primary px-4 py-3 text-[12px] font-medium">
            {liveStats.index ?? "—"}
          </TableCell>
        </>
      )}
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
            {priceDisplay}
          </p>
          {hasLiveStats && deltaVal != null ? (
            <div className={`flex items-center gap-1 ${changeColor}`}>
              {deltaVal >= 0 ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0" aria-hidden>
                  <path d="M6 2.5V9.5M6 2.5L9 5.5M6 2.5L3 5.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0" aria-hidden>
                  <path d="M6 9.5V2.5M6 9.5L9 6.5M6 9.5L3 6.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              <span className="text-[12px] font-medium tracking-[-1%]">
                {deltaVal >= 0 ? "+" : ""}
                {typeof deltaVal === "number" ? deltaVal.toFixed(2) : deltaVal}
              </span>
            </div>
          ) : hasLiveStats ? (
            <p className="text-text-secondary text-[12px] leading-[100%] font-medium tracking-[-1%]">—</p>
          ) : (
            <p className={`${changeColor} text-[12px] leading-[100%] font-medium tracking-[-1%]`}>
              {changeSign}
              {typeof changeVal === "number" ? changeVal.toFixed(2) : "0.00"}%
            </p>
          )}
        </div>
      </TableCell>
      {hasLive && (
        <TableCell className="px-4 py-3">
          <div className="flex flex-col gap-0.75">
            <p className="text-text-primary text-[12px] font-medium">
              {liveStats.indexChange != null ? (liveStats.indexChange >= 0 ? "+" : "") + liveStats.indexChange.toFixed(2) : "—"}
            </p>
          </div>
        </TableCell>
      )}
      {hasLive && (
        <TableCell className="text-text-primary px-4 py-3 text-[12px] font-medium">
          {liveStats.min ?? "—"}
        </TableCell>
      )}
      <TableCell className="px-4 py-3">
        <div className="flex flex-col gap-0.75">
          <p className="text-text-primary text-[12px] leading-[100%] font-medium tracking-[-2%]">
            {volumeDisplay}
          </p>
          <p
            className={`${volumeChangeColor} text-[12px] leading-[100%] font-medium tracking-[-1%]`}
          >
            {volumeChangeDisplay}
          </p>
        </div>
      </TableCell>
      <TableCell className="text-text-primary px-4 py-3">
        {hasLiveStats ? (liveStats.index !== undefined ? performanceDisplay : "—") : `${athlete.performance}%`}
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
