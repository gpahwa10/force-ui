"use client";

import RankingsSidebar from "@/components/discover-page/rankings-sidebar";

interface RankingsSidebarSectionProps {
  showPlayerRankings?: boolean;
}

export default function RankingsSidebarSection({
  showPlayerRankings = true,
}: RankingsSidebarSectionProps) {
  return (
    <div className="px-global py-section-md border-border-secondary h-full w-full shrink-0 border-l lg:w-[296px] lg:px-1 lg:py-1">
      <RankingsSidebar showPlayerRankings={showPlayerRankings} />
    </div>
  );
}

