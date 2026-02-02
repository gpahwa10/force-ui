"use client";

import { useMemo, useState } from "react";
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
import type { Quarter } from "./chart-types";
import { useLiveData } from "@/components/providers/live-data-provider";

const QUARTER_TO_PERIOD: Record<Quarter, number> = {
  "1st": 1,
  "2nd": 2,
  "3rd": 3,
  "4th": 4,
};

function getEventPeriod(e: Record<string, unknown>): number | undefined {
  const inner = (e.event ?? e.data ?? e.payload) as Record<string, unknown> | undefined;
  const src = inner && typeof inner === "object" ? inner : e;
  const period =
    e.period ?? e.Period ?? e.quarter ?? e.qtr ?? src?.period ?? src?.Period ?? src?.quarter ?? src?.qtr;
  if (period == null) return undefined;
  const n = typeof period === "number" ? period : parseInt(String(period), 10);
  return Number.isNaN(n) ? undefined : n;
}

export default function LiveFeedTab() {
  const [activeQuarter, setActiveQuarter] = useState<Quarter>("1st");
  const quarters: Quarter[] = ["1st", "2nd", "3rd", "4th"];
  const { theme } = useTheme();
  const { liveEvents } = useLiveData();
  const courtImage = theme === "dark" ? "/icons/court2.svg" : "/icons/court1.svg";

  const selectedPeriod = QUARTER_TO_PERIOD[activeQuarter];

  const playByPlayData = useMemo((): Array<{ time: string; description: string }> => {
    const eventsForPeriod = liveEvents.filter((e) => {
      const period = getEventPeriod(e as Record<string, unknown>);
      return period === selectedPeriod;
    });
    if (!eventsForPeriod.length) {
      return [];
    }
    return eventsForPeriod.map((e) => {
      const raw = e as Record<string, unknown>;
      const inner = (raw.event ?? raw.data ?? raw.payload) as Record<string, unknown> | undefined;
      const src = inner && typeof inner === "object" ? inner : raw;
      const appliedAt =
        e.appliedAt ??
        raw.appliedAt ??
        raw.applied_at ??
        src?.appliedAt ??
        src?.applied_at;
      const clock =
        e.clock ??
        raw.clock ??
        raw.Clock ??
        raw.game_clock ??
        raw.time_remaining ??
        src?.clock ??
        src?.Clock ??
        src?.game_clock ??
        src?.time_remaining;
      const period =
        e.period ?? raw.period ?? raw.Period ?? raw.quarter ?? raw.qtr ?? src?.period ?? src?.Period ?? src?.quarter ?? src?.qtr;
      const timeField = e.time ?? raw.time ?? raw.Time ?? src?.time ?? src?.Time;
      const appliedAtStr =
        appliedAt != null
          ? (() => {
              const d = typeof appliedAt === "string" ? new Date(appliedAt) : new Date(Number(appliedAt));
              if (Number.isNaN(d.getTime())) return "";
              return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
            })()
          : "";
      const clockStr = typeof clock === "string" ? clock : clock != null ? String(clock) : "";
      const periodStr = period != null ? String(period) : "";
      const timeFieldStr = typeof timeField === "string" ? timeField : timeField != null ? String(timeField) : "";
      const time =
        appliedAtStr
          ? appliedAtStr
          : clockStr && periodStr
            ? `Q${periodStr} ${clockStr}`
            : clockStr
              ? clockStr
              : timeFieldStr
                ? timeFieldStr
                : "—";
      return {
        time,
        description: (e.description ?? raw.description ?? inner?.description ?? src?.description ?? "—") as string,
      };
    });
  }, [liveEvents, selectedPeriod]);

  const ROW_HEIGHT_PX = 48;
  const ROW_GAP_PX = 8;
  const HEADER_HEIGHT_PX = 40;
  const VISIBLE_ROWS = 5;
  const tableBodyMaxHeight =
    VISIBLE_ROWS * ROW_HEIGHT_PX + (VISIBLE_ROWS - 1) * ROW_GAP_PX;

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
              {/* Play by Play Table — header fixed, body scrollable, 5 rows visible */}
              <div className="w-full overflow-hidden">
                <div className="bg-elevation-bg flex w-full max-w-full flex-col items-start gap-1 rounded-[14px] p-1">
                  <Table className="w-full table-fixed border-separate border-spacing-0">
                    <TableHeader>
                      <TableRow className="border-0 bg-transparent">
                        <TableHead className="text-text-secondary w-[100px] shrink-0 border-0 px-3 py-2.5 text-[11px] leading-[11px] font-medium tracking-[-0.1px]">
                          Time
                        </TableHead>
                        <TableHead className="text-text-secondary border-0 px-3 py-2.5 text-[11px] leading-[11px] font-medium tracking-[-0.1px]">
                          Description
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                  </Table>
                  <div
                    className="w-full overflow-y-auto overflow-x-auto border-separate border-spacing-y-1"
                    style={{ maxHeight: tableBodyMaxHeight, minHeight: tableBodyMaxHeight }}
                  >
                    <Table className="w-full table-fixed border-separate border-spacing-y-1">
                      <TableBody>
                        {playByPlayData.length > 0 ? (
                          playByPlayData.map((play, index) => (
                            <TableRow
                              key={index}
                              className="bg-elevation-card mb-2 h-12 overflow-hidden rounded-[10px] border-0 transition-colors duration-200 ease-out"
                            >
                              <TableCell className="text-text-primary w-[100px] shrink-0 rounded-tl-[10px] rounded-bl-[10px] px-3 py-4 text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
                                {play.time}
                              </TableCell>
                              <TableCell className="text-text-primary min-w-0 rounded-tr-[10px] rounded-br-[10px] px-3 py-4 text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
                                {play.description}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow className="h-full border-0">
                            <TableCell
                              colSpan={2}
                              className="text-text-secondary border-0 px-3 py-4 text-center text-[12px] leading-[12px] font-medium tracking-[-0.1px]"
                              style={{ height: tableBodyMaxHeight }}
                            >
                              No live events for this period yet.
                            </TableCell>
                          </TableRow>
                        )}
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
