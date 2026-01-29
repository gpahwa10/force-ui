"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getAllAthletes } from "@/lib/data/athletes-bank";

const formatChange = (n: number) => `${n > 0 ? "+" : ""}${n.toFixed(2)}%`;

// Format athlete name to short form (e.g., "LeBron James" -> "L. James")
const formatAthleteName = (fullName: string): string => {
  const parts = fullName.split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}. ${parts.slice(1).join(" ")}`;
  }
  return fullName;
};

export default function Ticker() {
  const athletes = getAllAthletes();

  return (
    <div className="ticker-track flex shrink-0 whitespace-nowrap will-change-transform">
      {athletes.map((athlete, idx) => (
        <Link
          key={`ticker-${athlete.id}-${idx}`}
          href={`/athlete/${athlete.id}`}
          className="text-text-secondary hover:text-text-primary mr-[24px] flex items-center gap-[8px] font-mono text-[11px] leading-[100%] font-medium tracking-[-0.05em] transition-colors"
        >
          <span>{formatAthleteName(athlete.name)}</span>
          <span
            className={cn(
              athlete.change >= 0 ? "text-light-green" : "text-neon-pink",
            )}
          >
            {formatChange(athlete.change)}
          </span>
        </Link>
      ))}
    </div>
  );
}
