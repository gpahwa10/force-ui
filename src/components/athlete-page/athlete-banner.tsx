"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import SearchBar from "@/components/common/search-bar";
import Link from "next/link";
import { ExtendedAthleteData, getTeamById } from "@/lib/data/athletes-bank";
import LiveDot from "../common/live-dot";
import { parsePrice } from "@/lib/formatter";

export default function AthleteBanner({
  athlete,
}: {
  athlete: ExtendedAthleteData;
}) {
  const team = getTeamById(athlete.teamId);
  const price = parsePrice(athlete.price);
  const performance = athlete.performance || 85;
  const percentile = athlete.percentage || 80;
  const isLive = true;
  const marketIndex = useMemo(() => price * 0.02, [price]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFollow = () => {
    // Follow athlete logic
  };

  const handleNotify = () => {
    // Notification logic
  };

  return (
    <div className="bg-elevation-card flex w-full flex-1 flex-col overflow-hidden rounded-[20px]">
      {/* Hero Image Section */}
      <div className="relative flex min-h-[300px] flex-1 shrink-0 flex-col items-start overflow-hidden p-5">
        {/* Background Image */}
        <div className="pointer-events-none absolute right-0 bottom-0 z-0 h-full w-full">
          <Image
            src={athlete.image}
            alt={athlete.name}
            width={363}
            height={539}
            className="absolute top-5 left-1/2 h-full w-[363px] -translate-x-1/2 object-cover object-top"
            style={{
              maskImage:
                "linear-gradient(180deg,rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%)",
            }}
          />

          <div
            className="absolute right-0 bottom-0 -z-10 h-full w-full dark:brightness-30"
            style={{
              background: `linear-gradient(180deg, rgba(16, 16, 18, 0.35) 0%, rgba(16, 16, 18, 0.00) 100%), #AFAFBC`,
            }}
          ></div>
        </div>

        {/* Header Content */}
        <div className="relative z-10 flex w-full items-center gap-2 md:gap-4">
          <div className="flex flex-1 items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="bg-elevation-bg flex h-6 w-6 items-center justify-center gap-2.5 rounded-lg">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.875 7.5H3.125M3.125 7.5L6.875 11.25M3.125 7.5L6.875 3.75"
                    stroke="currentColor"
                    className="text-text-primary"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-[12px] leading-[12px] font-medium tracking-[-0.1px] text-white">
                Back to Live
              </span>
            </Link>
          </div>
          <div className="flex h-7 items-center gap-2 rounded-lg bg-[rgba(16,16,18,0.20)] px-2.5 backdrop-blur-[10px]">
            <LiveDot className="h-1.5 w-1.5" />
            <span className="text-[12px] leading-[12px] font-medium tracking-[-0.1px] text-white">
              Live
            </span>
          </div>
          <div
            className="bg-elevation-bg h-[18px] w-px"
            style={{ opacity: 0.3 }}
          />
          <div className="flex items-start gap-1.5">
            <button
              onClick={handleFollow}
              className="bg-elevation-button flex h-7 cursor-pointer items-center justify-center gap-2 rounded-lg px-2.5 py-3"
            >
              <span className="text-text-primary text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
                Follow
              </span>
            </button>
            <button
              onClick={handleNotify}
              className="bg-elevation-button flex h-7 w-7 cursor-pointer items-center justify-center gap-[7.692px] rounded-lg"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_5126_8535)">
                  <path
                    d="M7.29232 9.91667H2.33398C2.65187 9.73666 2.92304 9.48453 3.12568 9.18057C3.32831 8.87662 3.45675 8.52933 3.50065 8.16667V6.41667C3.53539 5.67646 3.77091 4.95966 4.18195 4.34309C4.593 3.72652 5.16408 3.23343 5.83398 2.91667C5.83398 2.60725 5.9569 2.3105 6.17569 2.09171C6.39449 1.87292 6.69123 1.75 7.00065 1.75C7.31007 1.75 7.60682 1.87292 7.82561 2.09171C8.0444 2.3105 8.16732 2.60725 8.16732 2.91667C8.83722 3.23343 9.4083 3.72652 9.81935 4.34309C10.2304 4.95966 10.4659 5.67646 10.5006 6.41667V7M5.25065 9.91667V10.5C5.25059 10.755 5.30628 11.007 5.4138 11.2382C5.52133 11.4695 5.6781 11.6744 5.87314 11.8388C6.06818 12.0031 6.29678 12.1228 6.54293 12.1895C6.78908 12.2562 7.04683 12.2683 7.29815 12.2249M9.33398 11.0833H12.834M11.084 9.33333V12.8333"
                    stroke="currentColor"
                    className="text-text-primary"
                    strokeWidth="1.225"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_5126_8535">
                    <rect width="14" height="14" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col items-start justify-between gap-7 p-[30px_20px] md:gap-10">
        {/* Title and Price */}
        <div className="flex w-full items-center justify-between gap-2.5">
          <div className="flex flex-1 flex-col items-start">
            <h1 className="text-text-primary text-[24px] leading-[100%] font-medium tracking-[-1px] md:text-[32px]">
              {athlete.name}
            </h1>
            <div className="flex items-start">
              <h2
                className="text-text-secondary text-[24px] leading-[100%] font-medium tracking-[-1px] md:text-[32px]"
                style={{ opacity: 0.65 }}
              >
                {team?.name || ""} (NBA)
              </h2>
            </div>
          </div>
          <div className="flex flex-col items-start gap-1 md:gap-3">
            <span className="text-text-secondary w-[128.847px] text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
              Index Price
            </span>
            <div className="flex items-center justify-between gap-1">
              <span className="text-text-primary text-[24px] leading-[100%] font-medium tracking-[-1px] md:text-[32px]">
                ${price.toFixed(2)}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 3.3335V12.6668M8 3.3335L12 7.3335M8 3.3335L4 7.3335"
                  stroke="currentColor"
                  className="text-dark-green"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-1.5">
          {/* LAL • LeBron J Dropdown */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button className="border-border-secondary bg-elevation-card hover:bg-elevation-card-raise flex h-7 items-center gap-2 rounded-lg border px-2 transition-colors">
                <div className="flex items-center gap-1">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="dark:opacity-90"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.4474 13.7147C16.0745 12.8589 16.5254 11.8872 16.7741 10.8558C15.8527 10.9982 14.9753 11.3468 14.2074 11.8755C14.6474 12.4685 15.0608 13.0883 15.4474 13.7147ZM11.5208 16.5802C12.6608 16.2003 13.6808 15.574 14.5274 14.7677C14.1141 14.0745 13.6741 13.3948 13.1941 12.7485C12.2408 13.768 11.6208 15.1008 11.5274 16.5802H11.5208ZM12.9741 3.75883C12.9741 5.598 12.3741 7.29733 11.3608 8.6835C12.0741 9.36317 12.7474 10.0762 13.3741 10.8358C14.438 10.0855 15.6784 9.62401 16.9741 9.4965C16.9874 9.32983 17.0008 9.16983 17.0008 8.99667C17.0008 5.94467 15.2874 3.29233 12.7741 1.94633C12.9008 2.53267 12.9741 3.13917 12.9741 3.75883ZM3.25406 3.44567C5.86739 4.505 8.27406 5.97133 10.3741 7.78383C11.1741 6.64433 11.6408 5.25817 11.6408 3.75883C11.6408 2.92338 11.4894 2.09483 11.1941 1.31333C10.4941 1.11333 9.76072 1 9.00072 1C6.74072 1 4.70739 1.93967 3.25406 3.44567ZM4.58739 12.1487C3.46072 12.1487 2.39406 11.922 1.41406 11.5223C2.47406 14.701 5.46739 17 9.00072 17C9.40072 17 9.78739 16.96 10.1741 16.9067C10.2008 14.8808 11.0274 13.0417 12.3608 11.6955C11.7808 10.9958 11.1608 10.3362 10.5074 9.70967C8.98739 11.2223 6.90072 12.1553 4.59406 12.1553L4.58739 12.1487Z"
                      fill="#FDB927"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.51351 8.80351C7.39707 6.97775 4.98169 5.53055 2.37351 4.52551C1.50684 5.79818 1.00018 7.33751 1.00018 8.99684C1.00018 9.28351 1.02018 9.57001 1.04684 9.84984C2.08684 10.4562 3.29351 10.8095 4.58684 10.8095C6.50018 10.8095 8.24018 10.043 9.51351 8.79701V8.80351Z"
                      fill="#FDB927"
                    />
                  </svg>

                  <div className="flex items-center gap-1">
                    <span className="text-text-primary text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
                      {team?.abbreviation || "LAL"}
                    </span>
                    <span className="text-text-primary text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
                      •{" "}
                    </span>
                    <span className="text-text-primary text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
                      {athlete.name.split(" ")[0]}{" "}
                      {athlete.name.split(" ")[1]?.[0] || ""}
                    </span>
                  </div>
                </div>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="currentColor"
                    className="text-text-secondary"
                    strokeWidth="1.28571"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </DialogTrigger>
            <DialogContent className="bg-elevation-bg w-[90vw] max-w-[500px] rounded-[16px] gap-0 p-0 [&>button]:hidden">
              <SearchBar
                teamImageUrl={team?.logoUrl || ""}
                name={athlete.name}
                onClose={() => setIsDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>

          {/* 91st Badge */}
          <div className="border-border-secondary bg-elevation-card flex h-7 w-[60px] items-center gap-1 overflow-hidden rounded-lg border px-2 py-2.5">
            <div className="relative flex h-4 w-4 flex-shrink-0 items-center justify-center overflow-hidden p-[1px_0]">
              <span className="text-soft-400 absolute top-[1px] left-0 h-[14px] w-4 flex-shrink-0 text-center text-[16px] leading-[100%] font-normal tracking-[-0.16px]">
                🏅{" "}
              </span>
            </div>
            <span className="text-text-primary text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
              {percentile}st
            </span>
          </div>

          {/* Lakers Badge */}
          <Link href={`/team/${athlete.teamId}`}>
            <div className="border-border-secondary bg-elevation-card flex h-7 flex-col items-start justify-center gap-2.5 rounded-lg border px-2 py-2.5">
              <div className="flex items-center gap-2">
                <div className="relative flex h-[19.201px] w-[19.201px] items-center justify-center">
                  <Image
                    src={team?.logoUrl || ""}
                    alt={team?.name || ""}
                    width={19}
                    height={19}
                    className="absolute top-0 left-0 h-[19px] w-[19px] flex-shrink-0"
                  />
                </div>
                <span className="text-text-primary text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
                  {team?.name || ""}
                </span>
              </div>
            </div>
          </Link>

          {/* F 80.6% Badge */}
          <div className="border-border-secondary bg-elevation-card flex h-7 items-center justify-center gap-1 rounded-lg border px-2.5 py-0">
            <svg
              width="7"
              height="9"
              viewBox="0 0 7 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0H7V2.14348H3.24584V3.51531H6.46107V5.67104H3.24584V8.78215H0V0Z"
                fill="currentColor"
                className="text-text-secondary"
              />
            </svg>
            <span className="text-text-primary text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
              {performance}%
            </span>
          </div>

          {/* 500 Badge */}
          <div className="border-border-secondary bg-elevation-card flex h-7 items-center justify-center gap-1 rounded-lg border px-2.5 py-0">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.5 9.5V6.5C4.5 6.36739 4.44732 6.24021 4.35355 6.14645C4.25979 6.05268 4.13261 6 4 6H2C1.86739 6 1.74021 6.05268 1.64645 6.14645C1.55268 6.24021 1.5 6.36739 1.5 6.5V9.5C1.5 9.63261 1.55268 9.75979 1.64645 9.85355C1.74021 9.94732 1.86739 10 2 10M4.5 9.5C4.5 9.63261 4.44732 9.75979 4.35355 9.85355C4.25979 9.94732 4.13261 10 4 10H2M4.5 9.5C4.5 9.63261 4.55268 9.75979 4.64645 9.85355C4.74021 9.94732 4.86739 10 5 10H7C7.13261 10 7.25979 9.94732 7.35355 9.85355C7.44732 9.75979 7.5 9.63261 7.5 9.5M4.5 9.5V4.5C4.5 4.36739 4.55268 4.24021 4.64645 4.14645C4.74021 4.05268 4.86739 4 5 4H7C7.13261 4 7.25979 4.05268 7.35355 4.14645C7.44732 4.24021 7.5 4.36739 7.5 4.5V9.5M2 10H9M7.5 9.5C7.5 9.63261 7.55268 9.75979 7.64645 9.85355C7.74021 9.94732 7.86739 10 8 10H10C10.1326 10 10.2598 9.94732 10.3536 9.85355C10.4473 9.75979 10.5 9.63261 10.5 9.5V2.5C10.5 2.36739 10.4473 2.24021 10.3536 2.14645C10.2598 2.05268 10.1326 2 10 2H8C7.86739 2 7.74021 2.05268 7.64645 2.14645C7.55268 2.24021 7.5 2.36739 7.5 2.5V9.5Z"
                stroke="currentColor"
                className="text-text-secondary"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-text-primary text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
              {Math.round(marketIndex * 25)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
