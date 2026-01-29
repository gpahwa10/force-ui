import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export default function TeamsRankings() {
  type RankingRow = {
    rank: number;
    iconSrc: string;
    alt: string;
    team: string;
  };

  const rankings: RankingRow[] = [
    {
      rank: 1,
      iconSrc: "/icons/events/lal.png",
      alt: "LAL",
      team: "Golden State Warriors",
    },
    {
      rank: 2,
      iconSrc: "/icons/events/sam-merrill.png",
      alt: "Sam Merrill",
      team: "Golden State Warriors",
    },
    {
      rank: 3,
      iconSrc: "/icons/events/gsw.png",
      alt: "gsw",
      team: "Golden State Warriors",
    },
    {
      rank: 4,
      iconSrc: "/icons/events/lal.png",
      alt: "LAL",
      team: "Golden State Warriors",
    },
    {
      rank: 5,
      iconSrc: "/icons/events/lal.png",
      alt: "LAL",
      team: "Golden State Warriors",
    },
  ];
  return (
    <div className="flex w-full flex-col rounded-[10px] bg-white">
      <Button className="border-light-gray hover:bg-primary-foreground flex h-auto w-full flex-col gap-[16px] border-b bg-white px-[20px]! py-[20px]! hover:cursor-pointer">
        <div className="flex w-full flex-row justify-between gap-[16px]">
          <p className="font-nohemi text-text-primary text-[16px] leading-[100%] font-medium tracking-[2%]">
            NBA Teams Ranking
          </p>
          <ChevronRight
            className="text-text-secondary"
            width={14}
            height={14}
          />
        </div>
      </Button>

      <div className="flex w-full flex-col">
        {rankings.map((row) => (
          <div
            key={row.rank}
            className="border-light-gray hover:bg-primary-foreground flex flex-row items-center gap-[8px] border-t border-b border-transparent px-[20px] py-[16px] transition-colors duration-200 ease-out hover:cursor-pointer"
          >
            <div className="border-disabled-100 flex h-fit w-[32px] flex-row items-center justify-center gap-[4px] rounded-[100px] border bg-white px-[12px] py-[6px]">
              <p className="text-sub-500 text-[12px] leading-[100%] font-medium tracking-[-1%]">
                #{row.rank}
              </p>
            </div>
            <div className="bg-light-gray flex h-[32px] w-[32px] flex-col items-center justify-center gap-[6px] rounded-[7px]">
              <Image src={row.iconSrc} alt={row.alt} width={27} height={17} />
            </div>
            <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-2%]">
              {row.team}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
