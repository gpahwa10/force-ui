import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

type TeamSide = { code: string; iconSrc: string };

type FixtureCell = {
  left: TeamSide;
  arena: string;
  scoreLeft: string;
  scoreRight: string;
  timeRange: string;
  right: TeamSide;
};

const fixtures: FixtureCell[] = [
  {
    left: { code: "LAL", iconSrc: "/icons/events/lal.png" },
    arena: "Crypt Arena",
    scoreLeft: "129",
    scoreRight: "119",
    timeRange: "21:00 - 23:45",
    right: { code: "GSW", iconSrc: "/icons/events/gsw.png" },
  },
  {
    left: { code: "BC", iconSrc: "/icons/events/sam-merrill.png" },
    arena: "Crypt Arena",
    scoreLeft: "119",
    scoreRight: "129",
    timeRange: "21:00 - 23:45",
    right: { code: "GSW", iconSrc: "/icons/events/gsw.png" },
  },
  {
    left: { code: "LAL", iconSrc: "/icons/events/lal.png" },
    arena: "Crypt Arena",
    scoreLeft: "129",
    scoreRight: "119",
    timeRange: "21:00 - 23:45",
    right: { code: "BC", iconSrc: "/icons/events/sam-merrill.png" },
  },
];

export default function TodayFixturesSide() {
  return (
    <div className="flex w-full flex-col rounded-[10px] bg-white">
      <Button className="border-light-gray hover:bg-primary-foreground flex h-fit w-full flex-row justify-between gap-[20px] border-b bg-white px-[20px]! py-[20px] hover:cursor-pointer">
        <p className="font-nohemi text-text-primary text-[14px] leading-[100%] font-medium tracking-[2%]">
          Today&apos;s Fixtures
        </p>
        <ChevronRight className="text-text-secondary" width={14} height={14} />
      </Button>
      <div className="flex w-full flex-col rounded-[10px] bg-white">
        {fixtures.map((cell, colIdx) => (
          <div
            key={`cell-${colIdx}`}
            className={`flex w-full flex-col ${
              colIdx === 0 ? "border-light-gray border-r" : ""
            }`}
          >
            <div className="border-light-gray hover:bg-primary-foreground flex w-full flex-row justify-between gap-[14px] border-b p-[20px] transition-colors duration-200 ease-out hover:cursor-pointer">
              {/* Left team */}
              <div className="flex w-full max-w-[91px] flex-col items-center justify-center gap-[10px]">
                <div className="bg-main/3 flex h-[32px] w-[32px] flex-col items-center justify-center gap-[6px] rounded-[7px]">
                  <Image
                    src={cell.left.iconSrc}
                    alt={cell.left.code}
                    width={27}
                    height={17}
                  />
                </div>
                <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-2%]">
                  {cell.left.code}
                </p>
              </div>

              {/* Arena and score */}
              <div className="flex w-[90px] shrink-0 flex-col items-center gap-[10px]">
                <p className="text-text-primary text-[11px] leading-[100%] font-semibold tracking-[-1%]">
                  {cell.arena}
                </p>
                <div className="flex w-full flex-row items-center justify-between">
                  <p
                    className={`text-[16px] leading-[100%] font-semibold tracking-[-2%] ${
                      cell.scoreLeft > cell.scoreRight
                        ? "text-text-primary"
                        : "text-text-secondary"
                    }`}
                  >
                    {cell.scoreLeft}
                  </p>
                  <p className="text-text-primary text-[16px] leading-[100%] font-semibold tracking-[-2%]">
                    :
                  </p>
                  <p
                    className={`text-[16px] leading-[100%] font-semibold tracking-[-2%] ${
                      cell.scoreLeft > cell.scoreRight
                        ? "text-text-secondary"
                        : "text-text-primary"
                    }`}
                  >
                    {cell.scoreRight}
                  </p>
                </div>
                <p className="text-text-secondary text-[11px] leading-[140%] tracking-[-2%]">
                  {cell.timeRange}
                </p>
              </div>

              {/* Right team */}
              <div className="flex w-full max-w-[91px] flex-col items-center justify-center gap-[10px]">
                <div className="bg-main/3 flex h-[32px] w-[32px] flex-col items-center justify-center gap-[6px] rounded-[7px]">
                  <Image
                    src={cell.right.iconSrc}
                    alt={cell.right.code}
                    width={27}
                    height={17}
                  />
                </div>
                <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-2%]">
                  {cell.right.code}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
