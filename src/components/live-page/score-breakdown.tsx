"use client";

import { motion } from "motion/react";
import Bar from "./bar";
import LiveDot from "@/components/common/live-dot";
import { useState } from "react";

export interface QuarterScore {
  quarter: string;
  team1Score: number;
  team2Score: number;
  isCurrent?: boolean;
}

export default function ScoreBreakdown({}) {
  // Score breakdown data
  const [quarterScores, setQuarterScores] = useState<QuarterScore[]>([
    { quarter: "Q1", team1Score: 31, team2Score: 23 },
    { quarter: "Q2", team1Score: 27, team2Score: 34 },
    { quarter: "Q3", team1Score: 21, team2Score: 30 },
    { quarter: "Q4", team1Score: 8, team2Score: 12, isCurrent: true },
  ]);

  // Calculate max score for scaling bars
  const maxScore = Math.max(
    ...quarterScores.map((q) => Math.max(q.team1Score, q.team2Score)),
    30, // minimum max to ensure bars are visible
  );
  return (
    <div className="w-full ">
      <div className="border-border-secondary bg-elevation-container w-full rounded-2xl border p-6">
        <motion.div
          className="flex w-full flex-col gap-3"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {quarterScores.map((quarter, index) => (
            <motion.div
              key={index}
              className="flex w-full flex-row items-center gap-2"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
            >
              <Bar
                score={quarter.team1Score}
                maxScore={maxScore}
                type="team1"
                delay={index * 0.1}
              />
              {/* Quarter Label */}
              <div className="flex min-w-[70px] shrink-0 items-center justify-center gap-1.5">
                <span className="text-text-secondary text-[12px] font-medium">
                  {quarter.quarter}
                </span>
                {quarter.isCurrent && <LiveDot />}
              </div>
              <Bar
                score={quarter.team2Score}
                maxScore={maxScore}
                type="team2"
                delay={index * 0.1 + 0.05}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
