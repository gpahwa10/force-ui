"use client";

import DiscoverTable from "@/components/discover-page/discover-table";

interface DiscoverTableSectionProps {
  first?: string;
  second?: string;
}

export default function DiscoverTableSection({
  first = "Athletes",
  second = "Team",
}: DiscoverTableSectionProps) {
  return (
    <section>
      <div className="max-w-global border-border-secondary mx-auto w-full border-x">
        <div className="px-global py-section-md">
          <DiscoverTable first={first} second={second} />
        </div>
      </div>
    </section>
  );
}

