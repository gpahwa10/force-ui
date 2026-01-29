import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function AthletesPerformance() {
  const filters = ["Guards", "Forwards", "Centers"];
  const [selectedFilter, setSelectedFilter] = useState<string>(filters[0]);

  type TrendRow = {
    rank: number;
    name: string;
    team: string;
    score: string;
    scoreTier: "low" | "medium" | "high";
  };

  const trendRows: TrendRow[] = [
    {
      rank: 1,
      name: "Stephen Curry",
      team: "Golden State Warriors",
      score: "234",
      scoreTier: "high",
    },
    {
      rank: 2,
      name: "Luka Dončić",
      team: "Dallas Mavericks",
      score: "234",
      scoreTier: "medium",
    },
    {
      rank: 3,
      name: "Damian Lillard",
      team: "Milwaukee Bucks",
      score: "234",
      scoreTier: "high",
    },
    {
      rank: 4,
      name: "Ja Morant",
      team: "Memphis Grizzlies",
      score: "234",
      scoreTier: "medium",
    },
    {
      rank: 5,
      name: "Tyrese Haliburton",
      team: "Indiana Pacers",
      score: "234",
      scoreTier: "medium",
    },
  ];

  const changeClass = (change: string) =>
    change.startsWith("-") ? "text-base-red" : "text-dark-green";
  return (
    <div className="flex w-full flex-col rounded-[10px] bg-white">
      <Button className="border-light-gray hover:bg-primary-foreground flex h-auto w-full flex-col gap-[16px] border-b bg-white px-[20px]! py-[20px]! hover:cursor-pointer">
        <div className="flex w-full flex-row justify-between gap-[16px]">
          <p className="font-nohemi text-text-primary text-[16px] leading-[100%] font-medium tracking-[2%]">
            Athletes Performance
          </p>
          <ChevronRight
            className="text-text-secondary"
            width={14}
            height={14}
          />
        </div>

        {/* Selectable chips */}
        <div className="flex w-full flex-row gap-[8px]">
          {filters.map((label) => {
            const isSelected = selectedFilter === label;
            return (
              <Button
                key={label}
                onClick={() => setSelectedFilter(label)}
                className={`flex h-fit flex-row items-center justify-center gap-[4px] rounded-[100px] border px-[10px] py-[6px] transition-colors duration-200 ease-out hover:cursor-pointer ${
                  isSelected
                    ? "bg-main border-black/5"
                    : "border-main/7 hover:bg-primary-foreground bg-white"
                }`}
              >
                <p
                  className={`text-[12px] leading-[100%] font-medium tracking-[-1%] ${
                    isSelected ? "text-white" : "text-sub-500"
                  }`}
                >
                  {label}
                </p>
              </Button>
            );
          })}
        </div>
      </Button>

      <div className="flex w-full flex-col">
        {trendRows.map((row, idx) => (
          <div
            key={idx}
            className="border-light-gray hover:bg-primary-foreground flex w-full flex-row items-center gap-[10px] border-t border-b border-transparent px-[20px] py-[16px] transition-colors duration-200 ease-out hover:cursor-pointer"
          >
            <div className="border-disabled-100 flex h-fit w-[32px] flex-row items-center justify-center gap-[4px] rounded-[100px] border bg-white px-[12px] py-[6px]">
              <p className="text-sub-500 text-[12px] leading-[100%] font-medium tracking-[-1%]">
                #{row.rank}
              </p>
            </div>
            <div className="flex flex-col justify-center gap-[8px]">
              <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-2%] text-nowrap">
                {row.name}
              </p>
              <p className="text-text-secondary text-[12px] leading-[100%] tracking-[-1%] text-nowrap">
                {row.team}
              </p>
            </div>
            <div className="flex w-full flex-row justify-end gap-[6px]">
              <div className="bg-nav-button flex h-fit flex-row items-center justify-center gap-[4px] rounded-[100px] px-[8px] py-[4px]">
                <p className="text-sub-500 text-[12px] leading-[100%] font-medium tracking-[-1%]">
                  FT
                </p>
              </div>
              <div
                className={`flex h-fit flex-row items-center justify-center gap-[4px] rounded-[100px] px-[8px] py-[4px] ${
                  row.scoreTier === "high" ? "bg-dark-green" : "bg-base-yellow"
                }`}
              >
                <p className="text-[12px] leading-[100%] font-medium tracking-[-1%] text-white">
                  234
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
