"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getRandomAthletes,
  getTeamById,
  type ExtendedAthleteData,
} from "@/lib/data/athletes-bank";
import { parsePrice } from "@/lib/formatter";
import Pagination from "@/components/common/pagination";
import FilterPopover from "../common/filter-popover";
import TradeButton from "../common/trade-button";
import FTag from "../common/f-tag";
import { useAppDispatch } from "@/lib/store/hooks";
import { openTradeDialog } from "@/lib/store/slices/tradeDialogSlice";

interface Position {
  id: string;
  athleteName?: string;
  athleteImage?: string;
  teamName?: string;
  teamImage?: string;
  team: string;
  indexPercent: number;
  position: string;
  leverage: string;
  size: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercentage: number;
  fundingRate: string;
  type: "athlete" | "team";
}

interface DiscoverTableProps {
  positions?: Position[];
  first?: string;
  second?: string;
  onClose?: (positionId: string) => void;
  onTradeClick?: (type: "long" | "short") => void;
}

// Generate positions from real athletes
const generatePositionsFromAthletes = (
  athletes: ExtendedAthleteData[],
): Position[] => {
  return athletes.map((athlete) => {
    const team = getTeamById(athlete.teamId);
    const basePrice = parsePrice(athlete.price);
    const entryPrice = basePrice * (0.95 + Math.random() * 0.1); // Random entry price around base
    const currentPrice = basePrice * (0.98 + Math.random() * 0.04); // Current price slightly higher
    const pnl = currentPrice - entryPrice;
    const pnlPercentage = (pnl / entryPrice) * 100;

    return {
      id: athlete.id,
      athleteName: athlete.name,
      athleteImage: athlete.image,
      team: team?.name || "Unknown",
      indexPercent: athlete.percentage,
      position: Math.random() > 0.5 ? "Long" : "Short",
      leverage: `${Math.floor(Math.random() * 5) + 1}x`,
      size: Math.floor(Math.random() * 500) + 100,
      entryPrice: Number(entryPrice.toFixed(2)),
      currentPrice: Number(currentPrice.toFixed(2)),
      pnl: Number(pnl.toFixed(2)),
      pnlPercentage: Number(pnlPercentage.toFixed(2)),
      fundingRate: `#${Math.floor(Math.random() * 50) + 1}`,
      type: "athlete" as const,
    };
  });
};

// Get initial positions from athletes only (both tabs show athletes)
const initialAthletes = getRandomAthletes(10, false); // Get more athletes for both tabs
const defaultPositions = generatePositionsFromAthletes(initialAthletes);

export default function DiscoverTable({
  positions = defaultPositions,
  first = " Forwards ",
  second = " Backwards ",
  onClose,
  onTradeClick,
}: DiscoverTableProps) {
  const [tabType, setTabType] = useState<"Forwards" | "Backwards">("Forwards");
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleTradeClick = (type: "long" | "short", position: Position) => {
    if (position.type === "athlete") {
      dispatch(openTradeDialog({ tradeType: type, mode: "athlete", id: position.id }));
    } else {
      // For teams, we need to get team data and open team trade dialog
      const team = getTeamById(position.id);
      if (team) {
        // Mock team price and change for now - in real app this would come from team data
        const teamPrice = `$${position.currentPrice.toFixed(2)}`;
        const teamChange = position.pnlPercentage;
        dispatch(openTradeDialog({
          tradeType: type,
          mode: "team",
          id: team.id,
          teamPrice,
          teamChange,
        }));
      }
    }
  };

  // Filter positions based on tab type and search query
  const filteredPositions = useMemo(() => {
    // First filter to only show athletes
    let filtered = positions.filter((position) => position.type === "athlete");

    // Then filter by tab type (Forwards = Long positions, Backwards = Short positions)
    if (tabType === "Forwards") {
      filtered = filtered.filter((position) => position.position === "Long");
    } else {
      filtered = filtered.filter((position) => position.position === "Short");
    }

    // Then filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (position) =>
          (position.athleteName?.toLowerCase().includes(query)) ||
          position.team.toLowerCase().includes(query),
      );
    }

    return filtered;
  }, [positions, tabType, searchQuery]);

  return (
    <div className="bg-elevation-card flex flex-col items-start gap-5 self-stretch overflow-hidden rounded-[20px] px-3 pt-1 pb-3 md:px-5">
      {/* Tabs and Header Actions */}
      <div className="flex flex-wrap items-center justify-center gap-4 self-stretch border-b">
        {/* Tab Type (Forwards/Backwards) */}
        <div className="flex items-center gap-0">
          <button
            onClick={() => setTabType("Forwards")}
            className={`flex w-[100px] items-center justify-center gap-2.5 border-b-2 px-0 py-5 ${tabType === "Forwards"
              ? "border-border-secondary"
              : "border-elevation-bg"
              }`}
          >
            <span
              className={`text-[13px] leading-[13px] font-medium tracking-[-0.1px] ${tabType === "Forwards"
                ? "text-text-primary"
                : "text-text-secondary"
                }`}
            >
              {first}
            </span>
          </button>
          <button
            onClick={() => setTabType("Backwards")}
            className={`flex w-[100px] items-center justify-center gap-2.5 border-b-2 px-0 py-5 ${tabType === "Backwards"
              ? "border-border-secondary"
              : "border-elevation-bg"
              }`}
          >
            <span
              className={`text-[13px] leading-[13px] font-medium tracking-[-0.1px] ${tabType === "Backwards"
                ? "text-text-primary"
                : "text-text-secondary"
                }`}
            >
              {second}
            </span>
          </button>
        </div>



        {/* Search and Filter */}
        <div className="flex flex-1 items-center justify-end gap-2">
          {/* Search */}
          <div className="bg-elevation-bg flex h-8 flex-1 items-center gap-1 overflow-hidden rounded-full px-3 py-1.5 pl-2.5 sm:max-w-[204px]">
            <div className="flex items-center gap-1">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.125 13.125L9.375 9.375M1.875 6.25C1.875 6.82453 1.98816 7.39344 2.20803 7.92424C2.42789 8.45504 2.75015 8.93734 3.15641 9.34359C3.56266 9.74985 4.04496 10.0721 4.57576 10.292C5.10656 10.5118 5.67547 10.625 6.25 10.625C6.82453 10.625 7.39344 10.5118 7.92424 10.292C8.45504 10.0721 8.93734 9.74985 9.34359 9.34359C9.74985 8.93734 10.0721 8.45504 10.292 7.92424C10.5118 7.39344 10.625 6.82453 10.625 6.25C10.625 5.67547 10.5118 5.10656 10.292 4.57576C10.0721 4.04496 9.74985 3.56266 9.34359 3.15641C8.93734 2.75015 8.45504 2.42789 7.92424 2.20803C7.39344 1.98816 6.82453 1.875 6.25 1.875C5.67547 1.875 5.10656 1.98816 4.57576 2.20803C4.04496 2.42789 3.56266 2.75015 3.15641 3.15641C2.75015 3.56266 2.42789 4.04496 2.20803 4.57576C1.98816 5.10656 1.875 5.67547 1.875 6.25Z"
                  stroke="currentColor"
                  className="text-text-secondary"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="text-text-secondary placeholder:text-text-secondary w-full bg-transparent text-[12px] leading-[12px] font-medium tracking-[-0.1px] placeholder:opacity-60 focus:outline-none"
              />
            </div>
          </div>

          <FilterPopover />
        </div>
      </div>

      {/* Table */}
      <div className="bg-elevation-bg flex flex-col items-start gap-1 self-stretch rounded-[14px] p-1">
        <div className="w-full overflow-x-auto">
          <Table className="w-full table-auto border-separate border-spacing-y-1">
            <TableHeader>
              <TableRow className="border-0 bg-transparent">
                <TableHead className="text-text-secondary w-[260px] border-0 px-3 py-2.5 text-[11px] leading-[11px] font-medium tracking-[-0.1px]">
                  Athlete / Index
                </TableHead>
                <TableHead className="text-text-secondary flex-1 border-0 px-3 py-2.5 text-[11px] leading-[11px] font-medium tracking-[-0.1px]">
                  Position
                </TableHead>
                <TableHead className="text-text-secondary flex-1 border-0 px-3 py-2.5 text-[11px] leading-[11px] font-medium tracking-[-0.1px]">
                  Size
                </TableHead>
                <TableHead className="text-text-secondary flex-1 border-0 px-3 py-2.5 text-[11px] leading-[11px] font-medium tracking-[-0.1px]">
                  Entry/$
                </TableHead>
                <TableHead className="text-text-secondary flex-1 border-0 px-3 py-2.5 text-[11px] leading-[11px] font-medium tracking-[-0.1px]">
                  Current/$
                </TableHead>
                <TableHead className="text-text-secondary w-[110px] border-0 px-3 py-2.5 text-[11px] leading-[11px] font-medium tracking-[-0.1px]">
                  PnL (Unrealized)
                </TableHead>
                <TableHead className="text-text-secondary flex-1 border-0 px-3 py-2.5 text-[11px] leading-[11px] font-medium tracking-[-0.1px]">
                  Fun Rate
                </TableHead>
                <TableHead className="text-text-secondary flex-1 border-0 px-3 py-2.5 text-[11px] leading-[11px] font-medium tracking-[-0.1px]">
                  <span className="px-2">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPositions.map((position) => (
                <TableRow
                  key={position.id}
                  onClick={() => {
                    router.push(`/athlete/${position.id}`);
                  }}
                  className="bg-elevation-card hover:bg-elevation-card mb-2 overflow-hidden rounded-[14px] border-0 transition-colors duration-200 ease-out hover:cursor-pointer"
                >
                  {/* Athlete / Index */}
                  <TableCell className="w-[20%] rounded-tl-[14px] rounded-bl-[14px] px-3 py-3">
                    <div className="flex items-center gap-3 pr-[30px]">
                      <div className="flex flex-1 items-center gap-2">
                        <div className="relative aspect-square h-8 w-8 overflow-hidden rounded-[29.463px] bg-gray-200">
                          <Image
                            src={position.athleteImage!}
                            alt={position.athleteName!}
                            fill
                            className="object-cover object-top"
                          />
                        </div>
                        <div className="flex flex-col items-start justify-center gap-1">
                          <span className="text-text-primary text-[13px] leading-[13px] font-semibold tracking-[-0.1px]">
                            {position.athleteName}
                          </span>
                          <span className="text-text-secondary text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
                            {position.team}
                          </span>
                        </div>
                      </div>
                      <FTag percentage={position.indexPercent} />
                    </div>
                  </TableCell>

                  {/* Position */}
                  <TableCell className="text-text-primary px-3 py-3 text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
                    {position.position} {position.leverage}
                  </TableCell>

                  {/* Size */}
                  <TableCell className="text-text-primary px-3 py-3 text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
                    ${position.size}
                  </TableCell>

                  {/* Entry/$ */}
                  <TableCell className="text-text-primary px-3 py-3 text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
                    ${position.entryPrice.toFixed(2)}
                  </TableCell>

                  {/* Current/$ */}
                  <TableCell className="text-text-primary px-3 py-3 text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
                    ${position.currentPrice.toFixed(2)}
                  </TableCell>

                  {/* PnL (Unrealized) */}
                  <TableCell className="w-[15%] px-3 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <span className="text-text-primary text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
                          {position.pnl >= 0 ? "+" : ""}$
                          {position.pnl.toFixed(2)}
                        </span>
                        <div className="flex items-center justify-center gap-px">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 2.5V9.5M6 2.5L9 5.5M6 2.5L3 5.5"
                              stroke="currentColor"
                              className={
                                position.pnl >= 0
                                  ? "text-dark-green"
                                  : "text-neon-pink"
                              }
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              transform={
                                position.pnl < 0 ? "rotate(180 6 6)" : ""
                              }
                            />
                          </svg>
                          <span
                            className={`text-[12px] leading-[12px] font-medium tracking-[-0.1px] ${position.pnl >= 0
                              ? "text-light-green"
                              : "text-neon-pink"
                              }`}
                          >
                            {position.pnlPercentage >= 0 ? "+" : ""}
                            {position.pnlPercentage}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Fun Rate */}
                  <TableCell className="text-text-primary w-[8%] px-3 py-3 text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
                    {position.fundingRate}
                  </TableCell>

                  <TableCell
                    className="w-[1%] rounded-tr-[14px] rounded-br-[14px] px-4 py-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex flex-row items-center gap-1">
                      <TradeButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTradeClick("long", position);
                        }}
                        type="long"
                      />
                      <TradeButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTradeClick("short", position);
                        }}
                        type="short"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <Pagination filteredPositions={filteredPositions} positions={positions} />
    </div>
  );
}
