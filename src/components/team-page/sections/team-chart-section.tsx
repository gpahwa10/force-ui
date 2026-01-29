"use client";

import PriceChart from "@/components/common/price-chart";

export default function TeamChartSection() {
  return (
    <section id="team-chart">
      <div className="max-w-global border-border-secondary mx-auto w-full border-x">
        <div className="px-global pb-section-md">
          <div className="flex w-full justify-center">
            <div className="w-full">
              <PriceChart />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

