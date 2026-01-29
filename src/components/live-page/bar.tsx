"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface BarProps {
  score: number;
  maxScore: number;
  type: "team1" | "team2";
  delay?: number;
}

export default function Bar({ score, maxScore, type, delay = 0 }: BarProps) {
  const getBarWidth = (score: number) => {
    if (score === 0) return 0;
    // Calculate width as percentage of max score
    // This ensures bars are proportional to their actual scores
    // Use 90% max width to leave some margin on each side
    return Math.min((score / maxScore) * 90, 90);
  };

  const barWidth = getBarWidth(score);

  return (
    <div
      className={cn(
        "bg-elevation-card-raise relative flex h-[24px] flex-1 rounded-[8px]",
        type === "team1" ? "justify-end" : "justify-start",
      )}
    >
      {score > 0 ? (
        <motion.div
          className={cn(
            "flex h-full max-w-full min-w-[60px] items-center rounded-[8px]",
            type === "team1"
              ? "justify-start bg-[linear-gradient(90deg,#542781_0%,rgba(84,39,129,0.4)_100%)] pl-3"
              : "justify-end bg-[linear-gradient(270deg,#0854AA_0%,rgba(8,84,170,0.4)_100%)] pr-3",
          )}
          initial={{ width: "0%" }}
          animate={{ width: `${barWidth}%` }}
          transition={{
            duration: 0.8,
            delay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <span className="text-sm font-bold whitespace-nowrap text-white">
            {score}
          </span>
        </motion.div>
      ) : (
        <div className="h-full w-full"></div>
      )}
    </div>
  );
}
