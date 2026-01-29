"use client";

import { useState } from "react";
import { Search, Filter, MoreVertical, ArrowUp } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SearchIcon, ListFilterIcon } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { tr } from "date-fns/locale";
interface HistoricalTrade {
  id: string;
  date: string;
  athleteName: string;
  athleteImage: string;
  athleteBgColor: string;
  league: string;
  side: string;
  size: number;
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  pnlPercentage: number;
}

interface HistoricalTradesTableProps {
  trades?: HistoricalTrade[];
}

// Mock data - In production, this would come from an API
const mockTrades: HistoricalTrade[] = [
  {
    id: "1",
    date: "21/10",
    athleteName: "LeBron James",
    athleteImage: "/images/players/lebron-james.png",
    athleteBgColor: "bg-dark-yellow",
    league: "NBA",
    side: "Long",
    size: 250,
    entryPrice: 12.1,
    exitPrice: 12.1,
    pnl: 87.5,
    pnlPercentage: 3.6,
  },
  {
    id: "2",
    date: "21/10",
    athleteName: "Steph Curry",
    athleteImage: "/images/players/stephen-curry.png",
    athleteBgColor: "bg-dark-blue",
    league: "NBA",
    side: "Long",
    size: 250,
    entryPrice: 12.1,
    exitPrice: 12.1,
    pnl: 87.5,
    pnlPercentage: 3.6,
  },
  {
    id: "3",
    date: "21/10",
    athleteName: "Kevin Durant",
    athleteImage: "/images/players/kevin-durant.png",
    athleteBgColor: "bg-base-purple",
    league: "NBA",
    side: "Long",
    size: 250,
    entryPrice: 12.1,
    exitPrice: 12.1,
    pnl: 87.5,
    pnlPercentage: 3.6,
  },
];

function formatShortDate(dateStr: string): string {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const parts = dateStr.split("/");
  if (parts.length < 2) return dateStr;
  const day = parseInt(parts[0], 10);
  const monthIndex = parseInt(parts[1], 10) - 1;
  if (
    Number.isNaN(day) ||
    Number.isNaN(monthIndex) ||
    monthIndex < 0 ||
    monthIndex > 11
  ) {
    return dateStr;
  }
  return `${months[monthIndex]} ${day}`;
}

export default function HistoricalTradesTable({
  trades = mockTrades,
}: HistoricalTradesTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex w-full flex-col rounded-[20px] bg-white p-[16px]">
      <div className="flex w-full flex-row items-center justify-between p-[16px] md:p-5">
        <h2 className="font-nohemi text-text-primary text-[14px] leading-none font-medium tracking-[0.28px]">
          Historical Trades
        </h2>
        <div className="flex flex-row items-center gap-[10px]">
          <div className="bg-page-background flex flex-row items-center gap-[10px] rounded-full">
            {/* Search Input */}
            <div className="flex h-[32px] flex-1 flex-row items-center gap-[10px] py-[6px] pr-[16px] pl-[10px] md:w-[204px]">
              <SearchIcon
                width={15}
                height={15}
                className="text-text-primary shrink-0"
              />{" "}
              <input
                type="text"
                placeholder="Search"
                aria-label="Search"
                className="placeholder:text-disabled-300 h-[18px] flex-1 border-0 bg-transparent px-0 text-[12px] leading-[100%] tracking-tight text-[#0a0d14] outline-none"
              />
            </div>
          </div>

          {/* Filter Button */}
          <Button className="bg-page-background flex h-[32px] w-[32px] items-center gap-[6px] rounded-[8px] border-none px-[12px] py-[10px] transition-colors hover:bg-gray-50 md:gap-[8px] md:px-[16px]">
            <ListFilterIcon className="text-text-primary h-[16px] w-[16px] shrink-0" />
          </Button>
        </div>
      </div>
      <div className="bg-light-gray flex h-[1px] w-full items-center justify-between"></div>
      <div className="bg-page-background w-full overflow-x-auto rounded-[20px]">
        <Table className="w-full min-w-full table-auto border-separate border-spacing-y-2 px-2">
          <TableHeader>
            <TableRow className="border-0">
              <TableHead className="text-muted-foreground px-4 py-3 text-[12px] font-medium whitespace-nowrap">
                Date
              </TableHead>
              <TableHead className="text-muted-foreground px-4 py-3 text-[12px] whitespace-nowrap">
                Athlete/Index
              </TableHead>
              <TableHead className="text-muted-foreground px-4 py-3 text-[12px] whitespace-nowrap">
                Side
              </TableHead>
              <TableHead className="text-muted-foreground px-4 py-3 text-[12px] whitespace-nowrap">
                Size
              </TableHead>
              <TableHead className="text-muted-foreground px-4 py-3 text-[12px] whitespace-nowrap">
                Entry/$
              </TableHead>
              <TableHead className="text-muted-foreground px-4 py-3 text-[12px] whitespace-nowrap">
                Exit/$
              </TableHead>
              <TableHead className="text-muted-foreground px-4 py-3 text-[12px] whitespace-nowrap">
                PnL (Realized)
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {trades.map((trade) => (
              <TableRow
                key={trade.id}
                className="border-0 hover:bg-transparent"
              >
                {/* Date */}
                <TableCell className="mx-2 rounded-l-[14px] bg-white px-4 py-3 text-[12px] font-medium">
                  {formatShortDate(trade.date)}
                </TableCell>
                <TableCell className="mx-2 bg-white px-4 py-3 text-[12px] font-medium">
                  <div className="flex items-center gap-[10px] px-[4px] py-[6px]">
                    <div
                      className={`relative h-8 w-8 rounded-md ${trade.athleteBgColor} overflow-hidden`}
                    >
                      <Image
                        src="/icons/athletes/logo.png"
                        alt="Logo"
                        fill
                        className="object-cover object-top opacity-8 mix-blend-screen"
                      />
                      <Image
                        src={trade.athleteImage}
                        alt={trade.athleteName}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <span className="text-text-primary flex flex-col text-[14px] font-medium">
                      <span className="text-text-primary">
                        {trade.athleteName}
                      </span>
                      <span className="text-text-secondary">
                        ({trade.league})
                      </span>
                    </span>
                    <div className="bg-league-card text-text-secondary flex flex-row items-center justify-center gap-2 rounded-full px-2 py-1 text-xs font-medium">
                      <Image
                        src="/icons/game/f.svg"
                        alt="Flag"
                        width={8}
                        height={10}
                      />
                      <span>80%</span>
                    </div>
                  </div>
                </TableCell>

                {/* Position */}
                <TableCell className="text-text-primary mx-2 bg-white px-4 py-3 text-[12px] font-medium">
                  {trade.side}
                </TableCell>

                {/* Size */}
                <TableCell className="mx-2 bg-white px-4 py-3 text-[12px] font-medium">
                  ${trade.size.toFixed(2)}
                </TableCell>

                {/* Entry */}
                <TableCell className="mx-2 bg-white px-4 py-3 text-[12px] font-medium">
                  ${trade.entryPrice.toFixed(2)}
                </TableCell>

                {/* Current */}
                <TableCell className="mx-2 bg-white px-4 py-3 text-[12px] font-medium">
                  ${trade.exitPrice.toFixed(2)}
                </TableCell>
                {/* PNL */}
                <TableCell className="mx-2 bg-white px-4 py-3 text-[12px] font-medium">
                  <div className="flex items-center gap-1">
                    <span className="text-text-primary">
                      {trade.pnl >= 0 ? "+" : "-"}$
                      {Math.abs(trade.pnl).toFixed(2)}
                    </span>
                    <span
                      className={`${
                        trade.pnl >= 0 ? "text-dark-green" : "text-base-red"
                      }`}
                    >
                      {Math.abs(trade.pnlPercentage).toFixed(1)}%
                    </span>
                  </div>
                </TableCell>

                {/* Funding */}
                {/* <TableCell className="bg-white px-4 py-3 text-text-primary">
                  {trade.fundingRate.toFixed(2)}%
                </TableCell> */}

                {/* Menu */}
                <TableCell className="mx-2 w-[1%] rounded-r-[14px] bg-white px-4 py-3 text-[12px] font-medium">
                  <div className="flex justify-end">
                    <button className="rounded-[6px] p-[8px] transition-colors hover:bg-gray-50">
                      <MoreVertical className="text-text-secondary h-[16px] w-[16px]" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
    // <div className="bg-white rounded-[10px] flex flex-col w-full">
    //   {/* Header */}
    //   <div className="flex flex-col md:flex-row md:items-center justify-between p-[16px] md:p-5 gap-3 border-b border-light-gray">
    //     <h2 className="font-nohemi font-medium text-[14px] text-text-primary tracking-[0.28px] leading-none">
    //       Historical Trades
    //     </h2>

    //     {/* Search and Filter */}
    //     <div className="flex items-center gap-[10px]">
    //       {/* Search Input */}
    //       <div className="flex flex-row items-center flex-1 md:w-[170px] h-[32px] rounded-[7px] border border-black/5 py-[6px] pr-[16px] pl-[10px] gap-[10px] bg-white">
    //         <Search
    //           width={12}
    //           height={12}
    //           color="var(--main)"
    //           className="shrink-0"
    //         />
    //         <input
    //           type="text"
    //           placeholder="Search here..."
    //           aria-label="Search"
    //           className="flex-1 h-[18px] bg-transparent border-0 outline-none px-0 text-[12px] leading-[100%] tracking-tight placeholder:text-disabled-300 text-[#0a0d14]"
    //         />
    //       </div>

    //       {/* Filter Button */}
    //       <button className="bg-white border border-main/7 rounded-[8px] h-[32px] w-[32px] flex items-center justify-center hover:bg-gray-50 transition-colors relative overflow-visible after:content-[''] after:absolute after:inset-0 after:rounded-[inherit] after:pointer-events-none after:shadow-[0_3px_0_0_rgba(10,13,20,0.06),inset_0_-2px_0_0_rgba(255,255,255,0.18)] shrink-0">
    //         <Image
    //           src="/icons/filter-icon.svg"
    //           alt="Filter"
    //           width={18}
    //           height={18}
    //         />
    //       </button>
    //     </div>
    //   </div>

    //   {/* Table - Horizontal Scroll on Mobile */}
    //   <div className="flex flex-col overflow-x-auto">
    //     {/* Table Header */}
    //     <div className="flex items-center px-[4px] min-w-[1300px]">
    //       <div className="flex items-center px-[16px] py-[12px] w-[100px]">
    //         <p className="font-medium text-[12px] text-text-secondary tracking-[-0.12px] leading-none">
    //           Date
    //         </p>
    //       </div>
    //       <div className="flex items-center px-[16px] py-[12px] w-[396px]">
    //         <p className="font-medium text-[12px] text-text-secondary tracking-[-0.12px] leading-none">
    //           Athlete Name
    //         </p>
    //       </div>
    //       <div className="flex items-center px-[16px] py-[12px] w-[160px]">
    //         <p className="font-medium text-[12px] text-text-secondary tracking-[-0.12px] leading-none">
    //           Side
    //         </p>
    //       </div>
    //       <div className="flex items-center px-[16px] py-[12px] w-[160px]">
    //         <p className="font-medium text-[12px] text-text-secondary tracking-[-0.12px] leading-none">
    //           Size
    //         </p>
    //       </div>
    //       <div className="flex items-center px-[16px] py-[12px] w-[160px]">
    //         <p className="font-medium text-[12px] text-text-secondary tracking-[-0.12px] leading-none">
    //           Entry/$
    //         </p>
    //       </div>
    //       <div className="flex items-center px-[16px] py-[12px] w-[160px]">
    //         <p className="font-medium text-[12px] text-text-secondary tracking-[-0.12px] leading-none">
    //           Exit/$
    //         </p>
    //       </div>
    //       <div className="flex items-center px-[16px] py-[12px] w-[160px]">
    //         <p className="font-medium text-[12px] text-text-secondary tracking-[-0.12px] leading-none">
    //           PnL (Realized)
    //         </p>
    //       </div>
    //       <div className="w-[56px]" />
    //     </div>

    //     {/* Table Rows */}
    //     {trades.map((trade, index) => (
    //       <div key={trade.id} className="flex items-center px-[4px] min-w-[1300px]">
    //         {/* Date */}
    //         <div className="flex items-center px-[16px] py-[12px] w-[100px]">
    //           <p className="font-medium text-[14px] text-text-primary tracking-[-0.14px] leading-none">
    //             {formatShortDate(trade.date)}
    //           </p>
    //         </div>

    //         {/* Athlete Name */}
    //         <div className="flex items-center gap-[10px] px-[16px] py-[12px] w-[396px]">
    //           <div
    //             className={`relative w-8 h-8 rounded-md ${trade.athleteBgColor} overflow-hidden`}
    //           >
    //             <Image
    //               src="/icons/athletes/logo.png"
    //               alt="Logo"
    //               fill
    //               className="object-cover object-top opacity-8 mix-blend-screen"
    //             />
    //             <Image
    //               src={trade.athleteImage}
    //               alt={trade.athleteName}
    //               fill
    //               className="object-cover object-top"
    //             />
    //           </div>
    //           <p className="font-medium text-[14px] text-text-primary tracking-[-0.14px] leading-none">
    //             {trade.athleteName} ({trade.league})
    //           </p>
    //         </div>

    //         {/* Side */}
    //         <div className="flex items-center px-[16px] py-[12px] w-[160px]">
    //           <p className="font-medium text-[14px] text-text-primary tracking-[-0.14px] leading-none">
    //             {trade.side}
    //           </p>
    //         </div>

    //         {/* Size */}
    //         <div className="flex items-center px-[16px] py-[12px] w-[160px]">
    //           <p className="font-medium text-[14px] text-text-primary tracking-[-0.14px] leading-none">
    //             ${trade.size}
    //           </p>
    //         </div>

    //         {/* Entry/$ */}
    //         <div className="flex items-center px-[16px] py-[12px] w-[160px]">
    //           <p className="font-medium text-[14px] text-text-primary tracking-[-0.14px] leading-none">
    //             ${trade.entryPrice.toFixed(2)}
    //           </p>
    //         </div>

    //         {/* Exit/$ */}
    //         <div className="flex items-center px-[16px] py-[12px] w-[160px]">
    //           <p className="font-medium text-[14px] text-text-primary tracking-[-0.14px] leading-none">
    //             ${trade.exitPrice.toFixed(2)}
    //           </p>
    //         </div>

    //         {/* PnL (Realized) */}
    //         <div className="flex items-center px-[16px] py-[12px] w-[160px]">
    //           <div className="flex items-center gap-[3px]">
    //             <p className="font-medium text-[14px] tracking-[-0.14px] leading-none text-text-primary">
    //               {trade.pnl >= 0 ? "+" : ""}${Math.abs(trade.pnl).toFixed(2)}
    //             </p>
    //             <div className="flex items-center gap-[1px]">
    //               {trade.pnl >= 0 ? (
    //                 <ArrowUp className="w-[14px] h-[14px] text-dark-green" />
    //               ) : (
    //                 <ArrowUp className="w-[14px] h-[14px] text-base-red rotate-180" />
    //               )}
    //               <p
    //                 className={`font-medium text-[14px] tracking-[-0.14px] leading-none ${
    //                   trade.pnl >= 0 ? "text-dark-green" : "text-base-red"
    //                 }`}
    //               >
    //                 {Math.abs(trade.pnlPercentage).toFixed(1)}%
    //               </p>
    //             </div>
    //           </div>
    //         </div>

    //         {/* Menu */}
    //         <div className="flex items-center justify-center w-[56px]">
    //           <button className="p-[8px] hover:bg-gray-50 rounded-[6px] transition-colors">
    //             <MoreVertical className="w-[16px] h-[16px] text-text-secondary" />
    //           </button>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
}
