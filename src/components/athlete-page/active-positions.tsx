"use client";

import { useRef, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
} from "../ui/table";
import PositionRow from "./position-row";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { removePosition, setPositions, type ActivePosition } from "@/lib/store/slices/activePositionsSlice";

interface ActivePositionsProps {
  // Optional prop for backward compatibility, but will use Redux state
  positions?: ActivePosition[];
  onClose?: (position: ActivePosition) => void;
}

// Default positions for initialization (mix of athletes and teams)
const defaultPositions: ActivePosition[] = [
  {
    id: "lebron-james-1",
    type: "athlete",
    athleteId: "lebron-james",
    athleteName: "LeBron James",
    athleteImage: "/icons/athletes/lebron-james.png",
    team: "Los Angeles Lakers",
    teamId: "lakers",
    positionType: "Long",
    leverage: 3,
    status: "Healthy",
    statusColor: "green",
    pnlAmount: 72.14,
    pnlPercent: 14.1,
    fundingRate: 1.5,
    size: 500.0,
    liquidationPrice: 96.5,
    collateral: 150.0,
    entryPrice: 102.3,
    markPrice: 116.9,
    currentPrice: 116.9,
  },
  {
    id: "stephen-curry-1",
    type: "athlete",
    athleteId: "stephen-curry",
    athleteName: "Stephen Curry",
    athleteImage: "/icons/athletes/stephen-curry.png",
    team: "Golden State Warriors",
    teamId: "warriors",
    positionType: "Long",
    leverage: 3,
    status: "Healthy",
    statusColor: "green",
    pnlAmount: 72.14,
    pnlPercent: 14.1,
    fundingRate: 1.5,
    size: 500.0,
    liquidationPrice: 96.5,
    collateral: 150.0,
    entryPrice: 102.3,
    markPrice: 116.9,
    currentPrice: 116.9,
    isHighlighted: true,
  },
  {
    id: "lakers-team-1",
    type: "team",
    teamId: "lakers",
    athleteName: "Los Angeles Lakers",
    athleteImage: "/icons/leagues/nba-new.png",
    positionType: "Long",
    leverage: 4,
    status: "Healthy",
    statusColor: "green",
    pnlAmount: 125.5,
    pnlPercent: 18.2,
    fundingRate: 1.8,
    size: 800.0,
    liquidationPrice: 92.5,
    collateral: 200.0,
    entryPrice: 98.5,
    markPrice: 116.5,
    currentPrice: 116.5,
  },
  {
    id: "giannis-antetok-1",
    type: "athlete",
    athleteId: "giannis-antetokounmpo",
    athleteName: "Giannis Antetok",
    athleteImage: "/icons/athletes/g-antetokounmpo.png",
    team: "Milwaukee Bucks",
    teamId: "bucks",
    positionType: "Long",
    leverage: 3,
    status: "Healthy",
    statusColor: "green",
    pnlAmount: 72.14,
    pnlPercent: 14.1,
    fundingRate: 1.5,
    size: 500.0,
    liquidationPrice: 96.5,
    collateral: 150.0,
    entryPrice: 102.3,
    markPrice: 116.9,
    currentPrice: 116.9,
  },
  {
    id: "warriors-team-1",
    type: "team",
    teamId: "warriors",
    athleteName: "Golden State Warriors",
    athleteImage: "/icons/leagues/nba-new.png",
    positionType: "Short",
    leverage: 2,
    status: "Warning",
    statusColor: "yellow",
    pnlAmount: -35.2,
    pnlPercent: -6.5,
    fundingRate: -0.8,
    size: 450.0,
    liquidationPrice: 108.5,
    collateral: 225.0,
    entryPrice: 105.2,
    markPrice: 98.3,
    currentPrice: 98.3,
  },
  {
    id: "kevin-durant-1",
    type: "athlete",
    athleteId: "kevin-durant",
    athleteName: "Kevin Durant",
    athleteImage: "/icons/athletes/kevin-durant.png",
    team: "Phoenix Suns",
    teamId: "suns",
    positionType: "Long",
    leverage: 5,
    status: "Healthy",
    statusColor: "green",
    pnlAmount: 85.2,
    pnlPercent: 18.5,
    fundingRate: 1.8,
    size: 750.0,
    liquidationPrice: 94.2,
    collateral: 250.0,
    entryPrice: 105.5,
    markPrice: 125.0,
    currentPrice: 125.0,
  },
];

export default function ActivePositions({
  positions: propPositions,
  onClose,
}: ActivePositionsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const positions = useAppSelector((state) => state.activePositions.positions);

  // Initialize with default positions if Redux state is empty
  useEffect(() => {
    if (positions.length === 0 && propPositions) {
      // If props provided, use them
      dispatch(setPositions(propPositions));
    } else if (positions.length === 0) {
      // Otherwise use defaults
      dispatch(setPositions(defaultPositions));
    }
  }, [dispatch, positions.length, propPositions]);

  const handleClose = (position: ActivePosition) => {
    dispatch(removePosition(position.id));
    onClose?.(position);
  };

  return (
    <div className="bg-elevation-card mb-[16px] flex flex-col gap-1 rounded-[20px] p-[10px] last:mb-0 sm:p-[14px] md:p-[16px]">
      <h2 className="text-text-primary px-2 pt-2 text-[13px] leading-none font-medium tracking-[-0.01em]">
        Active Positions
      </h2>
      <div className="bg-elevation-bg mt-4 w-full overflow-x-auto rounded-[14px] px-1">
        <div className="relative flex items-center gap-2">
          <div ref={scrollContainerRef} className="flex-1 overflow-hidden">
            <Table className="w-full min-w-full table-auto border-separate border-spacing-y-1 !px-0">
              <TableHeader>
                <TableRow className="border-0">
                  <TableHead className="text-text-secondary border-0 px-4 py-3 text-[12px] leading-[100%] font-medium tracking-[-1%] whitespace-nowrap">
                    Player
                  </TableHead>
                  <TableHead className="text-text-secondary border-0 px-4 py-3 text-[12px] leading-[100%] tracking-[-1%]">
                    {/* ftag */}
                  </TableHead>
                  <TableHead className="text-text-secondary border-0 px-4 py-3 text-[12px] leading-[100%] tracking-[-1%] whitespace-nowrap">
                    PnL(Real-time)
                  </TableHead>
                  <TableHead className="text-text-secondary border-0 px-4 py-3 text-[12px] leading-[100%] tracking-[-1%] whitespace-nowrap">
                    Size
                  </TableHead>
                  <TableHead className="text-text-secondary border-0 px-4 py-3 text-[12px] leading-[100%] tracking-[-1%] whitespace-nowrap">
                    Collateral
                  </TableHead>
                  <TableHead className="text-text-secondary border-0 px-4 py-3 text-[12px] leading-[100%] tracking-[-1%] whitespace-nowrap">
                    Entry
                  </TableHead>
                  <TableHead className="text-text-secondary border-0 px-4 py-3 text-[12px] leading-[100%] tracking-[-1%] whitespace-nowrap">
                    Mark
                  </TableHead>
                  <TableHead className="text-text-secondary border-0 px-4 py-3 text-[12px] leading-[100%] tracking-[-1%] whitespace-nowrap">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {positions.map((position) => (
                  <PositionRow
                    key={position.id}
                    position={position}
                    onClose={() => handleClose(position)}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
    // <div className="backdrop-blur-[22px] bg-white rounded-[10px] flex flex-col w-full">
    //   {/* Header */}
    //   <div className="flex gap-[12px] items-center px-[16px] sm:px-[20px] md:px-[24px] py-[16px] sm:py-[18px] md:py-[20px]">
    //     <h3 className="flex-1 font-nohemi font-medium text-[14px] sm:text-[15px] md:text-[16px] text-text-primary tracking-[0.32px] leading-none font-500">
    //       Active positions
    //     </h3>
    //   </div>

    //   {/* Content */}
    //   <div className="flex flex-col pb-[4px] px-[4px] overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    //     {/* Table Header */}
    //     <div className="flex gap-[12px] md:gap-[16px] items-center px-[12px] md:px-[16px] py-[12px] font-medium text-[11px] md:text-[12px] text-[#868c98] tracking-[-0.12px] leading-none min-w-[750px]">
    //       <p className="w-[160px] md:w-[204px]">Athlete</p>
    //       <p className="w-[120px] md:w-[148px]">PnL (Real-time)</p>
    //       <p className="w-[90px] md:w-[108px]">Size</p>
    //       <p className="flex-1 min-w-[70px]">Collateral</p>
    //       <p className="flex-1 min-w-[60px]">Entry</p>
    //       <p className="flex-1 min-w-[60px]">Mark</p>
    //       <p className="flex-1 min-w-[60px] text-center">Close</p>
    //     </div>

    //     {/* Table Rows */}
    //     {positions.map((position, index) => {
    //       const isPnlPositive = position.pnlAmount >= 0;
    //       const pnlColor = isPnlPositive ? "text-light-green" : "text-base-red";

    //       return (
    //         <div
    //           key={index}
    //           className="flex gap-[12px] md:gap-[16px] items-center p-[12px] md:p-[16px] font-medium relative hover:border-t hover:border-main hover:bg-linear-to-r hover:from-main/3 hover:to-main/3 transition-all min-w-[750px]"
    //         >
    //           {/* Athlete Column */}
    //           <div className="flex flex-col gap-[6px] md:gap-[8px] w-[160px] md:w-[204px]">
    //             <p className="font-medium text-[12px] md:text-[14px] text-text-primary tracking-[-0.14px] leading-none">
    //               {position.athleteName}
    //             </p>
    //             <p className="font-medium text-[10px] md:text-[12px] text-text-secondary tracking-[-0.12px] leading-none">
    //               {position.positionType} {position.leverage}× ·{" "}
    //               <span className={getStatusColor(position.statusColor)}>
    //                 {position.status}
    //               </span>
    //             </p>
    //           </div>

    //           {/* PnL Column */}
    //           <div className="flex flex-col gap-[6px] md:gap-[8px] w-[120px] md:w-[148px]">
    //             <p
    //               className={`font-medium text-[10px] md:text-[12px] tracking-[-0.12px] leading-none ${pnlColor}`}
    //             >
    //               {isPnlPositive ? "+" : ""}$
    //               {Math.abs(position.pnlAmount).toFixed(2)} (
    //               {isPnlPositive ? "+" : ""}
    //               {position.pnlPercent.toFixed(1)}%)
    //             </p>
    //             <p
    //               className={`font-medium text-[10px] md:text-[12px] tracking-[-0.12px] leading-none ${pnlColor}`}
    //             >
    //               Funding {position.fundingRate >= 0 ? "+" : ""}
    //               {position.fundingRate.toFixed(2)}%
    //             </p>
    //           </div>

    //           {/* Size Column */}
    //           <div className="flex flex-col gap-[6px] md:gap-[8px] w-[90px] md:w-[108px]">
    //             <p className="font-medium text-[10px] md:text-[12px] text-text-primary tracking-[-0.12px] leading-none">
    //               ${position.size.toFixed(2)}
    //             </p>
    //             <p className="font-medium text-[10px] md:text-[12px] text-neon-pink tracking-[-0.12px] leading-none">
    //               Liq ${position.liquidationPrice.toFixed(2)}
    //             </p>
    //           </div>

    //           {/* Collateral */}
    //           <p className="flex-1 min-w-[70px] font-medium text-[10px] md:text-[12px] text-text-primary tracking-[-0.12px] leading-none">
    //             ${position.collateral.toFixed(2)}
    //           </p>

    //           {/* Entry */}
    //           <p className="flex-1 min-w-[60px] font-medium text-[10px] md:text-[12px] text-text-primary tracking-[-0.12px] leading-none">
    //             {position.entryPrice.toFixed(2)}
    //           </p>

    //           {/* Mark */}
    //           <p className="flex-1 min-w-[60px] font-medium text-[10px] md:text-[12px] text-text-primary tracking-[-0.12px] leading-none">
    //             {position.markPrice.toFixed(2)}
    //           </p>

    //           {/* Close */}
    //           <button
    //             onClick={() => onClose?.(position)}
    //             className="flex-1 min-w-[60px] font-medium text-[10px] md:text-[12px] text-text-secondary tracking-[-0.12px] leading-none hover:text-text-primary transition-colors cursor-pointer"
    //           >
    //             Close
    //           </button>
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>
  );
}
