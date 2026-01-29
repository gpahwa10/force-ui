"use client";

import TeamPositionsTable from "@/components/team-page/team-table";

interface TeamPositionsTableSectionProps {
  first?: string;
  second?: string;
}

export default function TeamPositionsTableSection({
  first = "Forwards",
  second = "Backwards",
}: TeamPositionsTableSectionProps) {
  return (
    <section>
      <div className="max-w-global border-border-secondary mx-auto w-full border-x">
        <div className="px-global pb-section-md">
          <TeamPositionsTable first={first} second={second} />
        </div>
      </div>
    </section>
  );
}

