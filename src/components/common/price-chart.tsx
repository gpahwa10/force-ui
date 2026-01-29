"use client";

import ChartTab from "./chart-tab";
import LiveFeedTab from "./live-feed-tab";
import OrderbookTab from "./orderbook-tab";
import TabGroupLarge, { type TabItem } from "./tab-group-large";

interface PriceChartProps {
  indexValue?: number;
  marketValue?: number;
  change24h?: number;
  volume?: string;
  openInterest?: string;
  funding?: number;
  earningToday?: number;
  routeName?: string;
}

export default function PriceChart({
  indexValue,
  change24h,
  volume,
  funding,
  earningToday,
  routeName,
}: PriceChartProps) {
  // Default values moved inside component
  const defaultIndexValue = indexValue ?? 31.5;
  const defaultChange24h = change24h ?? 2.4;
  const defaultVolume = volume ?? "12.5K";
  const defaultFunding = funding ?? -0.03;
  const defaultEarningToday = earningToday ?? 3.27;
  const defaultRouteName = routeName ?? "Partner";

  const tabs: TabItem[] = [
    {
      id: "chart",
      name: "Chart",
      content: (
        <ChartTab
          indexValue={defaultIndexValue}
          change24h={defaultChange24h}
          volume={defaultVolume}
          funding={defaultFunding}
          earningToday={defaultEarningToday}
          routeName={defaultRouteName}
        />
      ),
    },
    {
      id: "live-feed",
      name: "Live Feed",
      content: <LiveFeedTab />,
    },
    {
      id: "orderbook",
      name: "Orderbook",
      content: <OrderbookTab />,
    },
  ];

  return <TabGroupLarge tabs={tabs} defaultTabId="chart" id="price-chart" />;
}
