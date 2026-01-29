import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";

type AthletePriceTrendProps = {
  onOpenPriceTrend?: () => void;
};

export default function AthletePriceTrend({
  onOpenPriceTrend,
}: AthletePriceTrendProps) {
  const filters = ["Guards", "Forwards", "Centers"];
  const [selectedFilter, setSelectedFilter] = useState<string>(filters[0]);
  const router = useRouter();

  type TrendRow = {
    id: string;
    name: string;
    team: string;
    iconSrc: string;
    price: string;
    change: string;
  };

  const trendRows: TrendRow[] = [
    {
      id: "lebron-james",
      name: "LeBron James",
      team: "Los Angeles Lakers",
      iconSrc: "/icons/players/lebron-james.png",
      price: "$102.3",
      change: "+3.27%",
    },
    {
      id: "stephen-curry",
      name: "Stephen Curry",
      team: "Golden State Warriors",
      iconSrc: "/icons/players/stephen-curry.png",
      price: "$101.8",
      change: "+2.94%",
    },
    {
      id: "kevin-durant",
      name: "Kevin Durant",
      team: "Phoenix Suns",
      iconSrc: "/icons/players/kevin-durrant.png",
      price: "$100.6",
      change: "+2.32%",
    },
    {
      id: "lebron-james",
      name: "LeBron James",
      team: "Los Angeles Lakers",
      iconSrc: "/icons/players/lebron-james.png",
      price: "$102.3",
      change: "+3.27%",
    },
    {
      id: "kevin-durant",
      name: "Kevin Durant",
      team: "Phoenix Suns",
      iconSrc: "/icons/players/kevin-durrant.png",
      price: "$100.6",
      change: "+2.32%",
    },
  ];

  const changeClass = (change: string) =>
    change.startsWith("-") ? "text-base-red" : "text-dark-green";

  const onFilterClick = (e: MouseEvent, label: string) => {
    e.stopPropagation();
    setSelectedFilter(label);
  };

  return (
    <div className="flex w-full flex-col rounded-[10px] bg-white">
      <Button
        onClick={() => onOpenPriceTrend?.()}
        className="border-light-gray hover:bg-primary-foreground flex h-auto w-full flex-col gap-[16px] border-b bg-white px-[20px]! py-[20px]! hover:cursor-pointer"
      >
        <div className="flex w-full flex-row justify-between gap-[16px]">
          <p className="font-nohemi text-text-primary text-[16px] leading-[100%] font-medium tracking-[2%]">
            Athlete Price trend
          </p>
          <ChevronRight
            className="text-text-secondary"
            width={14}
            height={14}
          />
        </div>

        <div className="flex w-full flex-row gap-[8px]">
          {filters.map((label) => {
            const isSelected = selectedFilter === label;
            return (
              <Button
                key={label}
                onClick={(e) => onFilterClick(e, label)}
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
            onClick={() => router.push(`/athlete/${row.id}`)}
            className="border-light-gray hover:bg-primary-foreground flex w-full flex-row gap-[10px] border-t border-b border-transparent px-[20px] py-[16px] transition-colors duration-200 ease-out hover:cursor-pointer"
          >
            <Image
              src={row.iconSrc}
              alt={row.name}
              width={40}
              height={40}
              className="max-h-[40px] max-w-[40px] rounded-[6px]"
            />
            <div className="flex flex-col justify-center gap-[8px]">
              <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-2%] text-nowrap">
                {row.name}
              </p>
              <p className="text-text-secondary text-[12px] leading-[100%] tracking-[-1%] text-nowrap">
                {row.team}
              </p>
            </div>
            <div className="flex w-full flex-col items-end justify-center gap-[8px]">
              <p className="text-text-primary text-right text-[14px] leading-[100%] font-medium tracking-[-1%]">
                {row.price}
              </p>
              <p
                className={`text-right text-[12px] leading-[100%] font-medium tracking-[-1%] ${changeClass(
                  row.change,
                )}`}
              >
                {row.change}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
