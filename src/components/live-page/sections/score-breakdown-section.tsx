"use client";

import TabGroupLarge from "@/components/common/tab-group-large";
import ScoreBreakdown from "@/components/live-page/score-breakdown";
import LiveFeedTab from "@/components/common/live-feed-tab";
import OrderbookTab from "@/components/common/orderbook-tab";
import ChartTab from "@/components/common/chart-tab";

export default function ScoreBreakdownSection() {
  return (
    <section id="score-breakdown">
      <div className="max-w-global border-border-secondary mx-auto w-full border-x">
        <div className="py-section-md px-global">
          <div className="flex w-full flex-col items-center justify-center">
            <TabGroupLarge
              defaultTabId="score-breakdown"
              tabs={[
                {
                  id: "score-breakdown",
                  name: "Score Breakdown",
                  content: (
                    <div className="w-full">
                      <ScoreBreakdown />
                    </div>
                  ),
                },
                {
                  id: "live-feed",
                  name: "Live Events",
                  content: (
                    <div className="w-full">
                      <LiveFeedTab />
                    </div>
                  ),
                },
                {
                  id: "orderbook",
                  name: "Orders",
                  content: (
                    <div className="w-full">
                      <OrderbookTab />
                    </div>
                  ),
                },
                {
                  id: "chart",
                  name: "Chart",
                  content: (
                    <div className="w-full">
                      <ChartTab isLivePage={true} />
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

