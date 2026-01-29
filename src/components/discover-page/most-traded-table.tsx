"use client";

import MostTradedHeader from "./most-traded-header";
import MostTradedRow from "./most-traded-row";
import { useRouter } from "next/navigation";

type MostTradedRowT = {
  id?: string | number;
  athleteSrc: string;
  athleteName: string;
  athleteTeam: string;
  athleteColor: string;
  trades: string;
  funding: string;
  openInterest: string;
};

export default function MostTradedTable({ rows }: { rows: MostTradedRowT[] }) {
  const router = useRouter();
  const toSlug = (s: string) => s.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col p-1 w-full">
      <MostTradedHeader />
      {rows.map((row, index) => (
        <MostTradedRow
          key={index}
          athleteSrc={row.athleteSrc}
          athleteName={row.athleteName}
          athleteTeam={row.athleteTeam}
          athleteColor={row.athleteColor}
          trades={row.trades}
          funding={row.funding}
          openInterest={row.openInterest}
          onClick={() =>
            router.push(`/athlete/${row.id ?? toSlug(row.athleteName)}`)
          }
        />
      ))}
    </div>
  );
}
