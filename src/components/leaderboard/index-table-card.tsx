"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import IndexHeader from "./index-header";
import IndexRow from "./index-row";

type IndexRowT = {
  team: string;
  teamSrc: string;
  long: string;
  short: string;
  openInterest: string;
  funRate: string;
};

export default function IndexTableCard({
  rows,
  onOpen,
}: {
  rows: IndexRowT[];
  onOpen?: () => void;
}) {
  return (
    <div className="flex w-full flex-col rounded-[10px] bg-white">
      <Button
        className="border-light-gray hover:bg-primary-foreground flex h-fit w-full flex-row justify-between gap-[20px] border-b bg-white px-[20px]! py-[20px] hover:cursor-pointer"
        onClick={onOpen}
      >
        <p className="font-nohemi text-text-primary text-[14px] leading-[100%] font-medium tracking-[2%]">
          Performance Breakdown
        </p>
        <ChevronRight className="text-text-secondary" width={14} height={14} />
      </Button>
      <div className="flex w-full flex-col overflow-x-auto px-2 pb-2">
        <IndexHeader />
        {rows.map((r, i) => (
          <IndexRow
            key={i}
            team={r.team}
            teamSrc={r.teamSrc}
            long={r.long}
            short={r.short}
            openInterest={r.openInterest}
            funRate={r.funRate}
          />
        ))}
      </div>
    </div>
  );
}
