import { cn } from "@/lib/utils";
import React from "react";

interface SeparatorProps {
  className?: string;
}

export default function Separator({ className }: SeparatorProps) {
  return (
    <div
      className={cn(
        "dark:bg-border bg-border-secondary max-w-global mx-auto h-px w-full",
        className,
      )}
    ></div>
  );
}
