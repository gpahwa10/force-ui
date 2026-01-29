"use client";

import TabGroupLarge from "@/components/common/tab-group-large";
import OrderbookTab from "@/components/common/orderbook-tab";
import { GameTeamData } from "@/lib/data/today-games";
import type { OrderbookEntry } from "@/components/common/chart-types";

interface OrderbookSectionProps {
  team1: GameTeamData;
  team2: GameTeamData;
  team1Bids?: OrderbookEntry[];
  team1Asks?: OrderbookEntry[];
  team1Spread?: string;
  team2Bids?: OrderbookEntry[];
  team2Asks?: OrderbookEntry[];
  team2Spread?: string;
}

export default function OrderbookSection({
  team1,
  team2,
  team1Bids,
  team1Asks,
  team1Spread = "$0.02",
  team2Bids,
  team2Asks,
  team2Spread = "$0.03",
}: OrderbookSectionProps) {
  const team1Slug = team1.name.toLowerCase().replace(/\s+/g, "-");
  const team2Slug = team2.name.toLowerCase().replace(/\s+/g, "-");

  // Default data for team 1
  const defaultTeam1Bids: OrderbookEntry[] = [
    { price: "58¢", size: "$3,200", barWidth: 80 },
    { price: "57¢", size: "$3,200", barWidth: 35 },
    { price: "56¢", size: "$3,200", barWidth: 25 },
    { price: "55¢", size: "$3,200", barWidth: 58 },
  ];

  const defaultTeam1Asks: OrderbookEntry[] = [
    { price: "59¢", size: "$3,200", barWidth: 80 },
    { price: "60¢", size: "$3,200", barWidth: 35 },
    { price: "61¢", size: "$3,200", barWidth: 25 },
    { price: "61¢", size: "$3,200", barWidth: 58 },
  ];

  // Default data for team 2
  const defaultTeam2Bids: OrderbookEntry[] = [
    { price: "62¢", size: "$4,500", barWidth: 75 },
    { price: "61¢", size: "$4,200", barWidth: 42 },
    { price: "60¢", size: "$3,800", barWidth: 30 },
    { price: "59¢", size: "$3,500", barWidth: 55 },
  ];

  const defaultTeam2Asks: OrderbookEntry[] = [
    { price: "63¢", size: "$4,500", barWidth: 75 },
    { price: "64¢", size: "$4,200", barWidth: 42 },
    { price: "65¢", size: "$3,800", barWidth: 30 },
    { price: "66¢", size: "$3,500", barWidth: 55 },
  ];

  return (
    <section id="orderbook">
      <div className="max-w-global border-border-secondary mx-auto w-full border-x">
        <div className="py-section-md px-global">
          <div className="flex w-full flex-col items-center justify-center">
            <h3 className="text-text-secondary m-0 mb-[16px] p-0 w-full text-left text-[14px] font-semibold">
              Order book
            </h3>
            <TabGroupLarge
              defaultTabId={team1Slug}
              tabs={[
                {
                  id: team1Slug,
                  name: team1.name,
                  content: (
                    <div className="w-full">
                      <OrderbookTab
                        bids={team1Bids || defaultTeam1Bids}
                        asks={team1Asks || defaultTeam1Asks}
                        spread={team1Spread}
                        teamName={team1.name}
                      />
                    </div>
                  ),
                },
                {
                  id: team2Slug,
                  name: team2.name,
                  content: (
                    <div className="w-full">
                      <OrderbookTab
                        bids={team2Bids || defaultTeam2Bids}
                        asks={team2Asks || defaultTeam2Asks}
                        spread={team2Spread}
                        teamName={team2.name}
                      />
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

