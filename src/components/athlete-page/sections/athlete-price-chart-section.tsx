"use client";

import PriceChart from "@/components/common/price-chart";

export default function AthletePriceChartSection() {
  return (
    <section id="athlete-price-chart">
      <div className="max-w-global border-border-secondary mx-auto w-full border-x">
        <div className="px-global pb-section-md">
          <PriceChart />
        </div>
      </div>
    </section>
  );
}

