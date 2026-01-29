"use client";

import { useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import type { Quarter, PlayData } from "./chart-types";

const lakersLogo = "/icons/events/lal.png";
const warriorsLogo = "/icons/events/sam-merrill.png";

const playByPlayData: PlayData[] = [
  {
    time: "12:00",
    play: "Jalen Duren vs. Jarrett Allen",
    playUpdate: "Evan Mobley gains possession",
    teamLogo: lakersLogo,
    score1: 0,
    score2: 0,
    relevance: 3.2,
    isPositiveTrend: true,
  },
  {
    time: "12:00",
    play: "Sam Merrill bad pass",
    playUpdate: "Ausar Thompson steals",
    teamLogo: warriorsLogo,
    score1: 0,
    score2: 0,
    relevance: 3.27,
    isPositiveTrend: true,
  },
  {
    time: "12:00",
    play: "Jalen Duren vs. Jarrett Allen",
    playUpdate: "Evan Mobley gains possession",
    teamLogo: lakersLogo,
    score1: 0,
    score2: 0,
    relevance: 3.2,
    isPositiveTrend: false,
  },
  {
    time: "12:00",
    play: "Sam Merrill bad pass",
    playUpdate: "Ausar Thompson steals",
    teamLogo: warriorsLogo,
    score1: 0,
    score2: 0,
    relevance: 3.27,
    isPositiveTrend: true,
  },
];

export default function LiveFeedTab() {
  const [activeQuarter, setActiveQuarter] = useState<Quarter>("1st");
  const quarters: Quarter[] = ["1st", "2nd", "3rd", "4th"];
  const { theme } = useTheme();
  const courtImage = theme === "dark" ? "/icons/court2.svg" : "/icons/court1.svg";

  return (
    <div className="flex w-full flex-col items-start justify-center gap-5">
      {/* Quarter Tabs */}
      <div className="flex w-full items-center gap-4">
        <div className="flex w-full flex-col items-start gap-4">
          <div className="flex items-start gap-1">
            {quarters.map((quarter) => (
              <button
                key={quarter}
                onClick={() => setActiveQuarter(quarter)}
                className={`flex items-center gap-1 rounded-lg px-2 py-2 ${activeQuarter === quarter ? "bg-elevation-button" : ""
                  }`}
              >
                <span
                  className={`text-[12px] leading-[12px] font-medium tracking-[-0.1px] ${activeQuarter === quarter
                    ? "text-text-primary"
                    : "text-text-secondary"
                    }`}
                >
                  {quarter}
                </span>
              </button>
            ))}
          </div>
          <div className="flex w-full flex-col items-stretch gap-4 lg:flex-row">
            <div className="flex flex-1 flex-col items-center justify-center gap-5 lg:flex-row">
              {/* Play by Play Table */}
              <div className="w-full overflow-hidden">
                <div className="bg-elevation-bg flex w-full max-w-full flex-col items-start gap-1 overflow-x-auto rounded-[14px] p-1">
                  <div className="w-full overflow-x-auto">
                    <Table className="w-full table-auto border-separate border-spacing-y-1">
                      <TableHeader>
                        <TableRow className="border-0 bg-transparent">
                          <TableHead className="text-text-secondary border-0 px-3 py-2.5 text-[11px] leading-[11px] font-medium tracking-[-0.1px]">
                            Time
                          </TableHead>
                          <TableHead className="text-text-secondary border-0 px-3 py-2.5 text-[11px] leading-[11px] font-medium tracking-[-0.1px]">
                            Play
                          </TableHead>
                          <TableHead className="text-text-secondary border-0 px-3 py-2.5 text-[11px] leading-[11px] font-medium tracking-[-0.1px]">
                            Relevance
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {playByPlayData.map((play, index) => (
                          <TableRow
                            key={index}
                            className="bg-elevation-card mb-2 h-12 overflow-hidden rounded-[10px] border-0 transition-colors duration-200 ease-out"
                          >
                            <TableCell className="text-text-primary w-[100px] rounded-tl-[10px] rounded-bl-[10px] px-3 py-4 text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
                              {play.time}
                            </TableCell>
                            <TableCell className="flex-1px-3 py-4">
                              <div className="flex items-center gap-4">
                                <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                                  <Image
                                    src={play.teamLogo}
                                    alt={play.play}
                                    width={24}
                                    height={24}
                                    className="h-6 w-6"
                                  />
                                </div>
                                <div className="text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
                                  <span className="text-text-primary">
                                    {play.play}{" "}
                                  </span>
                                  <span className="text-text-secondary">
                                    {" "}
                                    ({play.playUpdate})
                                  </span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-text-primary flex-1 rounded-tr-[10px] w-[100px] rounded-br-[10px] px-3 py-4">
                              {play.relevance !== undefined ? (
                                <div className="flex items-center gap-0.5">
                                  <div className="flex w-14 shrink-0 items-center gap-0.5">
                                    {/* Arrow Icon */}
                                    <svg
                                      width="12"
                                      height="12"
                                      viewBox="0 0 12 12"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="shrink-0"
                                    >
                                      {play.isPositiveTrend !== false ? (
                                        <path
                                          d="M6 2.5V9.5M6 2.5L9 5.5M6 2.5L3 5.5"
                                          stroke="#20C26E"
                                          strokeWidth="1.25"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      ) : (
                                        <path
                                          d="M6 9.5V2.5M6 9.5L9 6.5M6 9.5L3 6.5"
                                          stroke="#E13F5E"
                                          strokeWidth="1.25"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      )}
                                    </svg>

                                    {/* Percentage */}
                                    <div
                                      className={`text-[12px] leading-[12px] font-medium tracking-[-0.1px] ${play.isPositiveTrend !== false
                                        ? "text-[#20C26E]"
                                        : "text-[#E13F5E]"
                                        }`}
                                    >
                                      {play.relevance}%
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <span className="text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
                                  -
                                </span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative aspect-512/299 w-auto shrink-0 overflow-hidden rounded-[14px] md:min-w-[500px]">
              <Image src={courtImage} alt="Live Feed" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
