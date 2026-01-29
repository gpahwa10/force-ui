"use client";

import TrendingNowHeader from "./trending-now-header";
import TrendingNowRow from "./trending-now-row";
import { useRouter } from "next/navigation";

type TrendingRow = {
  id?: string | number;
  athleteSrc: string;
  athleteName: string;
  athleteTeam: string;
  athleteColor: string;
  currentPrice: string;
  change: string;
  volume: string;
};

export default function TrendingNowTable({ rows }: { rows: TrendingRow[] }) {
  const router = useRouter();
  const toSlug = (s: string) => s.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col p-1 w-full">
      <TrendingNowHeader />
      {rows.map((row, index) => (
        <TrendingNowRow
          key={index}
          athleteSrc={row.athleteSrc}
          athleteName={row.athleteName}
          athleteTeam={row.athleteTeam}
          athleteColor={row.athleteColor}
          currentPrice={row.currentPrice}
          change={row.change}
          volume={row.volume}
          onClick={() => router.push(`/athlete/${row.id ?? toSlug(row.athleteName)}`)}
        />
      ))}
    </div>
  );
}
