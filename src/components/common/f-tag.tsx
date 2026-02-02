import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface FTagProps {
  percentage?: number;
  className?: string;
}
export default function FTag({ percentage = 80, className }: FTagProps) {
  return (
    <div
      className={cn(
        "bg-elevation-button text-text-secondary flex max-w-fit flex-row items-center justify-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
        className,
      )}
    >
      <Image src="/icons/game/f.svg" alt="Long" width={10} height={11} />
      {percentage.toFixed(2)}%
    </div>
  );
}
