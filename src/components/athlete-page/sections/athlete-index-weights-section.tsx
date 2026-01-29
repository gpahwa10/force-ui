"use client";

import IndexWeights from "@/components/athlete-page/index-weights";

export default function AthleteIndexWeightsSection() {
  return (
    <section id="athlete-index-weights">
      <div className="max-w-global border-border-secondary mx-auto w-full border-x">
        <div className="px-global pb-section-md">
          <IndexWeights />
        </div>
      </div>
    </section>
  );
}

