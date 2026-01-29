"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp, BellPlus } from "lucide-react";

interface TeamBannerProps {
  name: string;
  league: string;
  abbreviation: string;
  logoUrl: string;
  bgColor?: string;
  isLive?: boolean;
  indexPrice: number;
  percentile: number;
  performance: number;
  marketIndex: number;
  onFollow?: () => void;
  onNotify?: () => void;
}

export default function TeamBanner({
  name,
  league,
  abbreviation,
  logoUrl,
  isLive = true,
  indexPrice,
  percentile,
  performance,
  marketIndex,
  onFollow,
  onNotify,
}: TeamBannerProps) {
  return (
    <div className="bg-elevation-card flex flex-1 flex-col overflow-hidden rounded-[20px]">
      <div
        className="relative flex h-[300px] w-full flex-1 shrink-0 items-center justify-center overflow-hidden rounded-t-[20px] sm:h-[350px] md:h-[400px] lg:h-auto lg:min-h-[400px] lg:flex-1 lg:rounded-md"
        style={{
          background:
            "linear-gradient(180deg, rgba(16, 16, 18, 0.35) 0%, rgba(16, 16, 18, 0) 100%), #AFAFBC",
        }}
      >
        {/* Team Logo */}
        <div className="relative z-10">
          <Image
            src={logoUrl}
            alt={name}
            width={327}
            height={202}
            className="h-auto object-contain"
          />
        </div>

        {/* Back Button */}
        <div className="absolute top-4 left-4 z-30 flex flex-row items-center justify-center gap-2">
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

        {/* Header Actions */}
        <div className="absolute top-4 right-4 z-30 flex flex-row items-center justify-center gap-2">
          {isLive && (
            <div className="flex h-7 items-center gap-2 rounded-lg bg-[rgba(16,16,18,0.20)] px-2.5 backdrop-blur-[10px]">
              <div className="bg-light-green h-1.5 w-1.5 rounded-full"></div>
              <span className="text-[12px] leading-[12px] font-medium tracking-[-0.1px] text-white">
                Live
              </span>
            </div>
          )}
          {isLive && (
            <div
              className="bg-elevation-bg h-[18px] w-px"
              style={{ opacity: 0.3 }}
            />
          )}
          <div className="flex items-start gap-1.5">
            <button
              onClick={onFollow}
              className="bg-elevation-button flex h-7 cursor-pointer items-center justify-center gap-2 rounded-lg px-2.5 py-3"
            >
              <span className="text-text-primary text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
                Follow
              </span>
            </button>
            <button
              onClick={onNotify}
              className="bg-elevation-button flex h-7 w-7 cursor-pointer items-center justify-center gap-[7.692px] rounded-lg"
            >
              <BellPlus className="text-text-primary h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="from-elevation-card pointer-events-none absolute right-0 bottom-0 left-0 z-20 h-[40%] bg-gradient-to-t to-transparent"></div>
      </div>

      {/* Team Info Section */}
      <div className="mb-[24px] flex shrink-0 flex-col gap-4 px-[16px] sm:mb-[32px] sm:flex-row sm:items-end sm:justify-between sm:px-[20px] md:mb-[44px] md:px-[24px] lg:px-[30px]">
        <div className="flex flex-col">
          <h1 className="text-text-primary text-[24px] leading-[100%] font-medium tracking-[-2%] sm:text-[28px] md:text-[32px]">
            {name}
          </h1>
          <h2 className="text-text-secondary mt-1 text-[18px] leading-[100%] font-medium tracking-[-2%] sm:text-[20px] md:text-[24px] lg:text-[32px]">
            {league}
          </h2>
        </div>
        <div className="flex flex-col items-start sm:items-end">
          <p className="text-text-secondary mb-1 text-[12px] sm:text-[14px]">
            Index Price:
          </p>
          <span className="flex flex-row items-center gap-1">
            <h1 className="text-text-primary text-[24px] font-medium sm:text-[28px] md:text-[32px]">
              ${indexPrice.toFixed(2)}
            </h1>
            <ArrowUp className="text-light-green h-[16px] w-[12px] sm:h-[20px] sm:w-[15px]" />
          </span>
        </div>
      </div>

      {/* Badges Section */}
      <div className="flex shrink-0 flex-row flex-wrap items-start justify-start gap-1.5 px-[16px] pb-[16px] sm:px-[20px] sm:pb-[18px] md:px-[24px] md:pb-[30px] lg:px-[30px]">
        {/* Percentile Badge */}
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

        {/* Team Badge */}
        <div className="border-border-secondary bg-elevation-card flex h-7 flex-col items-start justify-center gap-2.5 rounded-lg border px-2 py-2.5">
          <div className="flex items-center gap-2">
            <div className="relative flex h-[19.201px] w-[19.201px] items-center justify-center">
              <Image
                src={logoUrl}
                alt={abbreviation}
                width={19}
                height={19}
                className="absolute top-0 left-0 h-[19px] w-[19px] flex-shrink-0"
              />
            </div>
            <span className="text-text-primary text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
              {abbreviation}
            </span>
          </div>
        </div>

        {/* Performance Badge */}
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
            {performance.toFixed(1)}%
          </span>
        </div>

        {/* Market Index Badge */}
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
  );
}
