"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TrendingCard from "../athletes-card";
import {
  getRandomAthletes,
  type ExtendedAthleteData,
} from "@/lib/data/athletes-bank";
import AthleteTableRow from "../athlete-table-row";
import { useAppDispatch } from "@/lib/store/hooks";
import { openTradeDialog } from "@/lib/store/slices/tradeDialogSlice";
import TabGroup from "../tab-group";
import ViewMode from "../view-mode";

// Use ExtendedAthleteData as the interface
interface AthleteData extends ExtendedAthleteData {
  volume: string;
  volumeChange: number;
  performance: number;
  rank: number;
}

// Get random athletes from the data bank
const athletesData1 = getRandomAthletes(6, false);
const athletesData2 = getRandomAthletes(4, false);
const athletesData3 = getRandomAthletes(7, false);
const athletesData4 = getRandomAthletes(4, false);
const athletesData5 = getRandomAthletes(5, false);
const athletesData6 = getRandomAthletes(7, false);

export default function AthletesTable() {
  const [activeTab, setActiveTab] = useState("athletes");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const dispatch = useAppDispatch();

  const tabs = [
    {
      label: "Athletes",
      value: "athletes",
      data: athletesData1,
    },
    {
      label: "Teams",
      value: "teams",
      data: athletesData2,
    },
    {
      label: "Guards",
      value: "guards",
      data: athletesData3,
    },
    {
      label: "Forwards",
      value: "forwards",
      data: athletesData4,
    },
    {
      label: "Trending",
      value: "trending",
      data: athletesData5,
    },
    {
      label: "Volume",
      value: "volume",
      data: athletesData6,
    },
  ];

  const athletesData = tabs.find((tab) => tab.value === activeTab)?.data;

  return (
    <section id="athletes-table" className="w-full">
      <div className="max-w-global border-border-secondary mx-auto w-full overflow-hidden border-x">
        <div className="py-section-md">
          <div className="flex flex-col gap-2">
            <div className="px-global flex w-full flex-row items-center justify-between gap-2 sm:flex-row sm:justify-between sm:gap-2">
              <TabGroup
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabs={tabs}
              />
              <ViewMode viewMode={viewMode} setViewMode={setViewMode} />
            </div>
            {viewMode === "list" ? (
              <div className="w-full overflow-x-auto">
                <Table className="px-global w-full table-auto border-separate border-spacing-y-1">
                  <TableHeader>
                    <TableRow className="border-0">
                      <TableHead className="text-muted-foreground border-0 px-4 py-3 text-[12px] leading-[100%] font-medium tracking-[-1%] whitespace-nowrap">
                        Player
                      </TableHead>
                      <TableHead className="text-muted-foreground border-0 px-4 py-3 text-[12px] leading-[100%] font-medium tracking-[-1%] whitespace-nowrap">
                        {/* F Tag */}
                      </TableHead>
                      <TableHead className="text-muted-foreground border-0 px-4 py-3 text-[12px] leading-[100%] tracking-[-1%] whitespace-nowrap">
                        Chart
                      </TableHead>
                      <TableHead className="text-muted-foreground border-0 px-4 py-3 text-[12px] leading-[100%] tracking-[-1%] whitespace-nowrap">
                        Price
                      </TableHead>
                      <TableHead className="text-muted-foreground border-0 px-4 py-3 text-[12px] leading-[100%] tracking-[-1%] whitespace-nowrap">
                        Volume
                      </TableHead>
                      <TableHead className="text-muted-foreground border-0 px-4 py-3 text-[12px] leading-[100%] tracking-[-1%] whitespace-nowrap">
                        Performance
                      </TableHead>
                      <TableHead className="text-muted-foreground border-0 px-4 py-3 text-[12px] leading-[100%] tracking-[-1%] whitespace-nowrap">
                        Rank
                      </TableHead>
                      <TableHead className="text-muted-foreground border-0 px-4 py-3 text-[12px] leading-[100%] tracking-[-1%] whitespace-nowrap">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {athletesData?.map((athlete) => (
                      <AthleteTableRow
                        key={athlete.id}
                        athlete={athlete as AthleteData}
                        onTradeClick={(type) => {
                          dispatch(
                            openTradeDialog({
                              tradeType: type,
                              mode: "athlete",
                              id: athlete.id,
                            }),
                          );
                        }}
                      />
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="mt-4 w-full overflow-x-auto sm:mt-0">
                <div className="px-global flex flex-row gap-2 overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {athletesData?.map((athlete) => (
                    <div key={athlete.id} className="shrink-0">
                      <TrendingCard athlete={athlete} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
