import { useState, useMemo } from "react";
import { Button } from "../ui/button";
import { Search, ChevronDown } from "lucide-react";
import Image from "next/image";
import AthleteCard from "../home-page/athlete-card";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const athletesData = [
  {
    id: 1,
    athleteName: "LeBron James",
    athleteImage: "/icons/athletes/lebron-james.png",
    team: "Los Angeles Lakers",
    price: "$102.3 ELO",
    percentage: "+3.27%",
    backgroundColor: "bg-dark-yellow",
    isPositive: true,
  },
  {
    id: 2,
    athleteName: "Stephen Curry",
    athleteImage: "/icons/athletes/stephen-curry.png",
    team: "Golden State Warriors",
    price: "$102.3 ELO",
    percentage: "+3.27%",
    backgroundColor: "bg-dark-blue",
    isPositive: true,
  },
  {
    id: 3,
    athleteName: "Kevin Durant",
    athleteImage: "/icons/athletes/kevin-durant.png",
    team: "Phoenix Suns",
    price: "$102.3 ELO",
    percentage: "-3.27%",
    backgroundColor: "bg-dark-violet",
    isPositive: false,
  },
  {
    id: 4,
    athleteName: "G. Antetokounmpo",
    athleteImage: "/icons/athletes/g-antetokounmpo.png",
    team: "Milwaukee Bucks",
    price: "$102.3 ELO",
    percentage: "+3.27%",
    backgroundColor: "bg-forest-green",
    isPositive: true,
  },
  {
    id: 5,
    athleteName: "Jayson Tatum",
    athleteImage: "/icons/athletes/jayson-tatum.png",
    team: "Boston Celtics",
    price: "$102.3 ELO",
    percentage: "+3.27%",
    backgroundColor: "bg-dark-yellow",
    isPositive: true,
  },
  {
    id: 6,
    athleteName: "Luka Dončić",
    athleteImage: "/icons/athletes/luka-doncic.png",
    team: "Dallas Mavericks",
    price: "$102.3 ELO",
    percentage: "+3.27%",
    backgroundColor: "bg-dark-blue",
    isPositive: true,
  },
  {
    id: 7,
    athleteName: "Anthony Davis",
    athleteImage: "/icons/athletes/anthony-davis.png",
    team: "Los Angeles Lakers",
    price: "$102.3 ELO",
    percentage: "-1.89%",
    backgroundColor: "bg-dark-violet",
    isPositive: false,
  },
  {
    id: 8,
    athleteName: "LeBron James",
    athleteImage: "/icons/athletes/lebron-james.png",
    team: "Los Angeles Lakers",
    price: "$102.3 ELO",
    percentage: "+3.27%",
    backgroundColor: "bg-forest-green",
    isPositive: true,
  },
  {
    id: 9,
    athleteName: "Stephen Curry",
    athleteImage: "/icons/athletes/stephen-curry.png",
    team: "Golden State Warriors",
    price: "$102.3 ELO",
    percentage: "+3.27%",
    backgroundColor: "bg-dark-yellow",
    isPositive: true,
  },
  {
    id: 10,
    athleteName: "Kevin Durant",
    athleteImage: "/icons/athletes/kevin-durant.png",
    team: "Phoenix Suns",
    price: "$102.3 ELO",
    percentage: "-3.27%",
    backgroundColor: "bg-dark-blue",
    isPositive: false,
  },
  {
    id: 11,
    athleteName: "G. Antetokounmpo",
    athleteImage: "/icons/athletes/g-antetokounmpo.png",
    team: "Milwaukee Bucks",
    price: "$102.3 ELO",
    percentage: "+3.27%",
    backgroundColor: "bg-dark-violet",
    isPositive: true,
  },
  {
    id: 12,
    athleteName: "Jayson Tatum",
    athleteImage: "/icons/athletes/jayson-tatum.png",
    team: "Boston Celtics",
    price: "$98.5 ELO",
    percentage: "+2.15%",
    backgroundColor: "bg-forest-green",
    isPositive: true,
  },
];

export default function AthleteRankingPage({
  onBack,
}: {
  onBack?: () => void;
}) {
  const filters = ["All", "Guards", "Forwards", "Centers"];
  const [selectedFilter, setSelectedFilter] = useState<string>(filters[0]);
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  // If/when filters are implemented, replace this with actual filtered array
  const filteredData = useMemo(() => {
    return athletesData;
  }, [selectedFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Reset to page 1 when filter changes
  // Note: not resetting on view mode change to preserve current page between grid/list
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => setCurrentPage(1), [selectedFilter]);

  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));
  const goPage = (n: number) => setCurrentPage(n);

  return (
    <div className="flex w-[1020px] flex-col overflow-y-auto overscroll-contain pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex w-full flex-col gap-5 pt-6">
        <div className="flex w-full flex-row items-center gap-4">
          <Button
            className="border-main/7 hover:bg-primary-foreground flex h-8 w-8 flex-row items-center justify-center gap-2 rounded-[7px] border bg-white px-0 hover:cursor-pointer"
            onClick={onBack}
          >
            <Image
              src="/icons/arrow-left.svg"
              width={14}
              height={14}
              alt="Arrow Left"
            />
          </Button>

          <p className="font-nohemi text-text-primary text-[20px] leading-[100%] font-medium tracking-[2%]">
            Athlete NBA Ranking
          </p>
        </div>
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-row gap-2">
            {filters.map((label) => {
              const isSelected = selectedFilter === label;
              return (
                <Button
                  key={label}
                  onClick={() => setSelectedFilter(label)}
                  className={`flex h-fit flex-row items-center justify-center gap-1 rounded-[100px] border px-4 py-2 transition-colors duration-200 ease-out hover:cursor-pointer ${
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
          <div className="flex flex-row gap-1.5">
            <div className="flex h-9 w-[280px] flex-row items-center gap-2.5 rounded-[7px] border border-black/5 bg-white py-1.5 pr-4 pl-2.5">
              <Search
                width={12}
                height={12}
                color="var(--main)"
                className="shrink-0"
              />
              <input
                type="text"
                placeholder="Search Anything..."
                aria-label="Search"
                className="placeholder:text-disabled-300 h-[18px] flex-1 border-0 bg-transparent px-0 text-[12px] leading-[100%] tracking-tight text-[#0a0d14] outline-none"
              />
            </div>
            <Button className="border-main/7 hover:bg-primary-foreground flex h-9 w-9 flex-row items-center justify-center gap-2.5 border bg-white px-0 hover:cursor-pointer">
              <Image
                src="/icons/filter-icon.svg"
                alt="Filter Icon"
                width={16}
                height={16}
              />
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button className="border-main/7 hover:bg-primary-foreground flex h-9 flex-row items-center justify-center gap-2 rounded-[7px] border bg-white px-4 py-2 hover:cursor-pointer">
                  <span className="text-text-primary text-[12px] leading-[100%] font-medium tracking-[-1%]">
                    Last 24hr
                  </span>
                  <ChevronDown width={16} height={16} color="var(--main)" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-2">
                <div className="flex flex-col gap-1">
                  <Button className="hover:bg-primary-foreground text-text-primary h-auto w-full justify-start bg-white px-3 py-2 text-[12px] font-medium">
                    Last 24hr
                  </Button>
                  <Button className="hover:bg-primary-foreground text-sub-500 h-auto w-full justify-start bg-white px-3 py-2 text-[12px] font-medium">
                    Last 7 days
                  </Button>
                  <Button className="hover:bg-primary-foreground text-sub-500 h-auto w-full justify-start bg-white px-3 py-2 text-[12px] font-medium">
                    Last 30 days
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <div className="border-main/7 flex h-9 w-fit flex-row items-center gap-1 rounded-[7px] border bg-white p-1">
              <Button
                onClick={() => setViewMode("list")}
                className={`flex h-7 w-7 flex-row items-center justify-center gap-2.5 px-0 transition-colors duration-200 hover:cursor-pointer ${
                  viewMode === "list"
                    ? "bg-main rounded-[7px]"
                    : "hover:bg-primary-foreground bg-white"
                }`}
              >
                <Image
                  src={
                    viewMode === "list"
                      ? "/icons/list-white.svg"
                      : "/icons/list.svg"
                  }
                  alt="list-icon"
                  width={18}
                  height={18}
                />
              </Button>
              <Button
                onClick={() => setViewMode("grid")}
                className={`flex h-7 w-7 flex-row items-center justify-center gap-2.5 px-0 transition-colors duration-200 hover:cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-main rounded-[7px]"
                    : "hover:bg-primary-foreground bg-white"
                }`}
              >
                <Image
                  src={
                    viewMode === "grid"
                      ? "/icons/layout-grid.svg"
                      : "/icons/layout-grid-gray.svg"
                  }
                  alt="layout-grid-icon"
                  width={18}
                  height={18}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex w-full flex-col gap-5">
        {viewMode === "grid" ? (
          <div className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {paginatedData.map((athlete) => (
              <AthleteCard
                key={athlete.id}
                id={athlete.id}
                mode={viewMode}
                athleteName={athlete.athleteName}
                athleteImage={athlete.athleteImage}
                team={athlete.team}
                price={athlete.price}
                percentage={athlete.percentage}
                backgroundColor={athlete.backgroundColor}
                isPositive={athlete.isPositive}
              />
            ))}
          </div>
        ) : (
          <div className="flex w-full flex-col gap-1">
            <div className="flex w-full flex-row gap-8 px-5 py-3">
              <div className="flex w-[4%] flex-col items-center"></div>
              <p className="text-text-secondary w-[51%] text-[12px] leading-[100%] font-medium tracking-[-1%]">
                Athlete Name
              </p>
              <p className="text-text-secondary w-[10.5%] text-[12px] leading-[100%] font-medium tracking-[-1%]">
                Current Price
              </p>
              <p className="text-text-secondary w-[10.5%] text-[12px] leading-[100%] font-medium tracking-[-1%]">
                24H Change
              </p>
              <p className="text-text-secondary w-[10.5%] text-[12px] leading-[100%] font-medium tracking-[-1%]">
                24H Volume
              </p>
              <p className="text-text-secondary w-[13.5%] text-[12px] leading-[100%] font-medium tracking-[-1%]">
                Quick Trade
              </p>
            </div>

            {paginatedData.map((athlete, index) => (
              <AthleteCard
                key={`list-${athlete.id}`}
                id={athlete.id}
                index={index + 1}
                mode="list"
                athleteName={athlete.athleteName}
                athleteImage={athlete.athleteImage}
                team={athlete.team}
                price={athlete.price}
                percentage={athlete.percentage}
                backgroundColor={athlete.backgroundColor}
                isPositive={athlete.isPositive}
                volume="$128.4K"
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-2 flex w-full items-center justify-center">
            <div className="flex flex-row items-center gap-5">
              <Button
                onClick={goPrev}
                disabled={currentPage === 1}
                className="border-main/7 hover:bg-primary-foreground flex h-8 w-8 flex-row items-center justify-center gap-2 rounded-[7px] border bg-white px-0 hover:cursor-pointer disabled:opacity-40"
              >
                <Image
                  src="/icons/arrow-left.svg"
                  width={14}
                  height={14}
                  alt="Prev"
                />
              </Button>

              <div className="flex flex-row items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (n) => {
                    const isActive = n === currentPage;
                    return (
                      <Button
                        key={`page-${n}`}
                        onClick={() => goPage(n)}
                        className={`h-8 min-w-8 rounded-[7px] border px-2 transition-colors duration-200 ${
                          isActive
                            ? "bg-main border-black/5"
                            : "border-main/7 hover:bg-primary-foreground bg-white"
                        }`}
                      >
                        <span
                          className={`text-[12px] leading-[100%] font-medium tracking-[-1%] ${
                            isActive ? "text-white" : "text-sub-500"
                          }`}
                        >
                          {n}
                        </span>
                      </Button>
                    );
                  },
                )}
              </div>

              <Button
                onClick={goNext}
                disabled={currentPage === totalPages}
                className="border-main/7 hover:bg-primary-foreground flex h-8 w-8 flex-row items-center justify-center gap-2 rounded-[7px] border bg-white px-0 hover:cursor-pointer disabled:opacity-40"
              >
                <Image
                  src="/icons/arrow-left.svg"
                  width={14}
                  height={14}
                  alt="Next"
                  className="rotate-180"
                />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
