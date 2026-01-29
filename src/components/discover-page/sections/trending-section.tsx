"use client";

import TrendingWithoutPx from "@/components/common/sections/trending-withoutpx";

export default function TrendingSection() {
  return (
    <section className="w-full overflow-hidden">
      <div className="max-w-global border-border-secondary mx-auto w-full overflow-hidden border-x">
        <div className="px-global py-section-md">
          <TrendingWithoutPx />
        </div>
      </div>
    </section>
  );
}

