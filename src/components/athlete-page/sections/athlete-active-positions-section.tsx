"use client";

import ActivePositions from "@/components/athlete-page/active-positions";

export default function AthleteActivePositionsSection() {
  return (
    <section id="athlete-active-positions">
      <div className="max-w-global border-border-secondary mx-auto w-full border-x">
        <div className="px-global pb-section-md">
          <ActivePositions />
        </div>
      </div>
    </section>
  );
}

