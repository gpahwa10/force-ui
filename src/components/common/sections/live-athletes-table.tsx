"use client";

import { useEffect, useMemo, useState } from "react";
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
import TabGroup from "../tab-group";
import ViewMode from "../view-mode";
import { useAppDispatch } from "@/lib/store/hooks";
import { openTradeDialog } from "@/lib/store/slices/tradeDialogSlice";
import { useLiveData } from "@/components/providers/live-data-provider";
import type { PlayerIndexRow } from "@/components/providers/live-data-provider";

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

const DEFAULT_IMAGE = "/images/players/lebron-james.png";

/** Get display team name from a player index row (from WebSocket). */
function getTeamDisplayName(row: PlayerIndexRow): string {
  return (row.team_name ?? row.team_alias ?? (row as Record<string, unknown>).teamName ?? row.team_id ?? row.teamId ?? "—") as string;
}

/** Get tab value for filtering (team_id or team_name so we can match). */
function getTeamTabValue(row: PlayerIndexRow): string {
  const id = row.team_id ?? row.teamId;
  const name = row.team_name ?? row.team_alias;
  return (id ?? name ?? "unknown") as string;
}

/** Price from index: (index_final / 100) * 10, updated with every game_state. */
function priceFromIndex(indexFinal: number): number {
  return (indexFinal / 100) * 10;
}

/** Build AthleteData + liveStats from WebSocket row: name, team, index from live; price = (index_final/100)*10; indexChange for Δ (red/green); unavailable as "—". */
function rowToAthleteData(
  row: PlayerIndexRow,
  index: number,
  staticFallback: AthleteData
): AthleteData & { teamDisplayName: string; liveStats: { index?: number; indexChange?: number; price: number | string } } {
  const id = (row.player_id ?? row.playerId ?? `player-${index}`) as string;
  const name = (row.name ?? row.player_name ?? (row as Record<string, unknown>).playerName ?? id) as string;
  const teamDisplayName = getTeamDisplayName(row);
  const indexVal = row.index ?? (row as Record<string, unknown>).index_final;
  const indexChangeVal = row.indexChange ?? row.index_change ?? (row as Record<string, unknown>).indexChange;
  const indexNum = typeof indexVal === "number" ? indexVal : undefined;
  const price = indexNum !== undefined ? priceFromIndex(indexNum) : ("—" as const);
  const rank = (row as PlayerIndexRow & { rank?: number }).rank ?? staticFallback.rank;
  return {
    ...staticFallback,
    id,
    name,
    teamId: (row.team_id ?? row.teamId ?? staticFallback.teamId) as string,
    teamDisplayName,
    rank,
    liveStats: {
      index: indexNum,
      indexChange: typeof indexChangeVal === "number" ? indexChangeVal : undefined,
      price,
    },
  } as AthleteData & { teamDisplayName: string; liveStats: { index?: number; indexChange?: number; price: number | string } };
}

export default function LiveAthletesTable() {
  const [activeTab, setActiveTab] = useState("all-players");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const dispatch = useAppDispatch();
  const { playerIndex } = useLiveData();

  const hasLivePlayers = playerIndex.length > 0;

  const { tabsForGroup, listData } = useMemo(() => {
    if (hasLivePlayers) {
      const uniqueTeams = new Map<string, string>();
      playerIndex.forEach((row) => {
        const value = getTeamTabValue(row);
        const label = getTeamDisplayName(row);
        if (value && !uniqueTeams.has(value)) uniqueTeams.set(value, label);
      });
      const teamTabs = Array.from(uniqueTeams.entries()).map(([value, label]) => ({ label, value }));
      const tabs = [{ label: "All Players", value: "all-players" }, ...teamTabs];
      const filtered =
        activeTab === "all-players"
          ? playerIndex
          : playerIndex.filter((row) => getTeamTabValue(row) === activeTab);
      const data = filtered.map((row, i) => rowToAthleteData(row, i, athletesData1[0] as AthleteData));
      return {
        tabsForGroup: tabs.map((t) => ({ label: t.label, value: t.value })),
        listData: data,
      };
    }
    const tabs = [
      { label: "All Players", value: "all-players", data: athletesData1 },
      { label: "Lakers", value: "lakers", data: athletesData2 },
      { label: "Warriors", value: "warriors", data: athletesData3 },
    ];
    const data = tabs.find((tab) => tab.value === activeTab)?.data as AthleteData[] | undefined;
    return {
      tabsForGroup: tabs.map((t) => ({ label: t.label, value: t.value })),
      listData: data ?? [],
    };
  }, [hasLivePlayers, playerIndex, activeTab]);

  useEffect(() => {
    const values = new Set(tabsForGroup.map((t) => t.value));
    if (!values.has(activeTab)) setActiveTab("all-players");
  }, [tabsForGroup, activeTab]);

  const athletesData = listData;

  return (
    <section id="athletes-table" className="w-full">
      <div className="max-w-global border-border-secondary mx-auto w-full overflow-hidden border-x">
        <div className="py-section-md">
          <div className="flex flex-col gap-2">
            <div className="px-global flex w-full flex-row items-center justify-between gap-2 sm:flex-row sm:justify-between sm:gap-2">
              <TabGroup
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabs={tabsForGroup}
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
                    {athletesData?.map((athlete) => {
                      const ext = athlete as AthleteData & {
                        teamDisplayName?: string;
                        liveStats?: { index?: number; indexChange?: number; price: number | string };
                      };
                      return (
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
                          teamDisplayName={ext.teamDisplayName}
                          liveStats={ext.liveStats}
                        />
                      );
                    })}
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
