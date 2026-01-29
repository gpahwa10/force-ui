"use client";

import { TableRow, TableCell } from "../ui/table";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type ActivePosition } from "@/lib/store/slices/activePositionsSlice";
import FTag from "../common/f-tag";
import MarketCloseDialog from "../portfolio-page/market-close-dialog";
import { useState } from "react";


interface PositionRowProps {
  position: ActivePosition;
  onClose?: () => void;
}

const getAthleteImage = (athleteName: string, athleteImage?: string): string => {
  if (athleteImage) return athleteImage;

  const imageMap: Record<string, string> = {
    "LeBron James": "/icons/athletes/lebron-james.png",
    "Stephen Curry": "/icons/athletes/stephen-curry.png",
    "Giannis Antetok": "/icons/athletes/g-antetokounmpo.png",
    "Kevin Durant": "/icons/athletes/kevin-durant.png",
    "Luka Doncic": "/icons/athletes/luka-doncic.png",
    "Jayson Tatum": "/icons/athletes/jayson-tatum.png",
    "Anthony Davis": "/icons/athletes/anthony-davis.png",
    "Nikola Jokic": "/icons/athletes/nikola-jokic.png",
  };
  return imageMap[athleteName] || "/icons/athletes/logo.png";
};

const getStatusColor = (statusColor: "green" | "red" | "yellow"): string => {
  switch (statusColor) {
    case "green":
      return "text-light-green";
    case "red":
      return "text-base-red";
    case "yellow":
      return "text-yellow-500";
    default:
      return "text-text-secondary";
  }
};

const getBgColor = (athleteName: string): string => {
  const colorMap: Record<string, string> = {
    "LeBron James": "bg-dark-yellow",
    "Stephen Curry": "bg-dark-blue",
    "Giannis Antetok": "bg-dark-yellow",
    "Kevin Durant": "bg-dark-blue",
    "Luka Doncic": "bg-dark-yellow",
    "Jayson Tatum": "bg-dark-blue",
    "Anthony Davis": "bg-dark-yellow",
    "Nikola Jokic": "bg-dark-blue",
  };
  return colorMap[athleteName] || "bg-dark-yellow";
};

export default function PositionRow({ position, onClose }: PositionRowProps) {
  const router = useRouter();
  const athleteImage = getAthleteImage(position.athleteName, position.athleteImage);
  const bgColor = getBgColor(position.athleteName);
  const statusColorClass = getStatusColor(position.statusColor);
  const isPnlPositive = position.pnlPercent >= 0;
  const pnlColor = isPnlPositive ? "text-light-green" : "text-base-red";
  const [openDialogPositionId, setOpenDialogPositionId] = useState<string | null>(null);

  // Determine the link URL based on position type
  const getPositionUrl = () => {
    if (position.type === "team" && position.teamId) {
      return `/team/${position.teamId}`;
    } else if (position.type === "athlete" && position.athleteId) {
      return `/athlete/${position.athleteId}`;
    }
    return "#";
  };

  const handleRowClick = () => {
    const url = getPositionUrl();
    if (url !== "#") {
      router.push(url);
    }
  };

  return (
    <TableRow
      className="bg-elevation-card hover:bg-elevation-card mb-2 rounded-[14px] border-0 transition-colors duration-200 ease-out hover:cursor-pointer"
      onClick={handleRowClick}
    >
      <TableCell className="w-[20%] rounded-tl-[14px] rounded-bl-[14px] px-4 py-3 font-medium">
        <div className="relative flex flex-row items-center gap-2">
          <div
            className={`${bgColor} relative h-8 w-8 overflow-hidden rounded-full`}
          >
            <Image
              src={athleteImage}
              alt={position.athleteName}
              fill
              className="object-cover object-top"
            />
          </div>
          <div>
            <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-2%]">
              {position.athleteName}
            </p>
            <p className="text-text-secondary text-[12px] leading-[100%] font-medium tracking-[-1%]">
              {position.positionType} {position.leverage}x .{" "}
              <span className={statusColorClass}>{position.status}</span>
              {position.type === "athlete" && position.team && (
                <> . <span className="text-text-secondary">{position.team}</span></>
              )}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell className="px-4 py-3">
        <FTag percentage={80} />
      </TableCell>
      <TableCell className="px-4 py-3">
        <div className="text-text-primary flex flex-col items-start justify-start gap-1 text-[12px] leading-[100%] font-medium tracking-[-2%]">
          <span>
            ${Math.abs(position.pnlAmount).toFixed(2)}{" "}
            <span className={pnlColor}>
              ({isPnlPositive ? "+" : ""}
              {position.pnlPercent.toFixed(1)}%)
            </span>
          </span>
          <span className="text-text-secondary">
            Funding{" "}
            <span
              className={
                position.fundingRate >= 0 ? "text-light-green" : "text-base-red"
              }
            >
              {position.fundingRate >= 0 ? "+" : ""}
              {position.fundingRate.toFixed(2)}%
            </span>
          </span>
        </div>
      </TableCell>
      <TableCell className="px-4 py-3">
        <div>
          <p className="text-text-primary text-[12px] leading-[100%] font-medium tracking-[-2%]">
            ${position.size.toFixed(2)}
          </p>
          <p className="text-base-red text-[12px] leading-[100%] font-medium tracking-[-1%]">
            Liq ${position.liquidationPrice.toFixed(2)}
          </p>
        </div>
      </TableCell>
      <TableCell className="text-text-primary w-[10%] px-4 py-3 text-[12px] leading-[100%] font-medium tracking-[-2%]">
        ${position.collateral.toFixed(2)}
      </TableCell>
      <TableCell className="text-text-primary w-[10%] px-4 py-3 text-[12px] leading-[100%] font-medium tracking-[-2%]">
        {position.entryPrice.toFixed(2)}
      </TableCell>
      <TableCell className="text-text-primary w-[10%] px-4 py-3 text-[12px] leading-[100%] font-medium tracking-[-2%]">
        {position.markPrice.toFixed(2)}
      </TableCell>
      <TableCell
        className="w-[40px] rounded-tr-[14px] rounded-br-[14px] px-3 py-3"
        onClick={(e) => e.stopPropagation()}
      >
        <MarketCloseDialog
          position={{
            id: position.id,
            athleteName: position.athleteName,
            athleteImage: athleteImage,
            size: position.size,
            currentPrice: position.currentPrice || position.markPrice,
          }}
          open={openDialogPositionId === position.id}
          onOpenChange={(open) => {
            if (open) {
              setOpenDialogPositionId(position.id);
            } else {
              setOpenDialogPositionId(null);
            }
          }}
          onConfirm={() => {
            onClose?.();
            setOpenDialogPositionId(null);
          }}
          trigger={
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="text-text-secondary hover:text-text-primary text-xs font-semibold leading-3 tracking-[-0.1px] px-2 py-1.5 bg-elevation-button rounded-lg cursor-pointer transition-colors"
            >
              Close
            </button>
          }
        />
      </TableCell>
    </TableRow>
  );
}
