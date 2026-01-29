"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export default function LiveDot({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("bg-light-green h-1 w-1 shrink-0 rounded-full", className)}
      animate={{ opacity: [1, 0.4, 1] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
