import { TableRow, TableHead } from "@/components/ui/table";

export default function LeaderboardHeader() {
  return (
    <TableRow className="border-0 bg-transparent">
      {/* Rank */}
      <TableHead className="text-text-secondary w-10 border-0 px-3 py-2.5 text-[11px] leading-[11px] font-medium tracking-[-0.1px]">
        Rank
      </TableHead>

      {/* Player */}
      <TableHead className="text-text-secondary w-[200px] border-0 px-3 py-2.5 text-[11px] leading-[11px] font-medium tracking-[-0.1px]">
        Player
      </TableHead>

      {/* 24H PnL */}
      <TableHead className="text-text-secondary w-[140px] border-0 px-3 py-2.5 text-[11px] leading-[11px] font-medium tracking-[-0.1px]">
        24H PnL
      </TableHead>

      {/* Total PnL */}
      <TableHead className="text-text-secondary flex-1 border-0 px-3 py-2.5 text-[11px] leading-[11px] font-medium tracking-[-0.1px]">
        Total PnL
      </TableHead>

      {/* Open Positions */}
      <TableHead className="text-text-secondary flex-1 border-0 px-3 py-2.5 text-[11px] leading-[11px] font-medium tracking-[-0.1px]">
        Open Positions
      </TableHead>

      {/* Win Rate */}
      <TableHead className="text-text-secondary flex-1 border-0 px-3 py-2.5 text-[11px] leading-[11px] font-medium tracking-[-0.1px]">
        Win Rate
      </TableHead>

      {/* Experience */}
      <TableHead className="text-text-secondary flex-1 border-0 px-3 py-2.5 text-[11px] leading-[11px] font-medium tracking-[-0.1px]">
        Experience
      </TableHead>

      {/* Mark */}
      <TableHead className="text-text-secondary flex-1 border-0 px-3 py-2.5 text-[11px] leading-[11px] font-medium tracking-[-0.1px]">
        Mark
      </TableHead>
    </TableRow>
  );
}
