"use client";

import TodayFixturesSide from "@/components/home-page/today-fixtures-side";
import UpcomingMatchesSide from "@/components/home-page/upcoming-matches-side";

export default function SidebarSection() {
  return (
    <div className="flex w-full flex-col gap-6 pt-6 pb-[24px] md:pb-0 xl:w-[300px]">
      <TodayFixturesSide />
      <UpcomingMatchesSide />
    </div>
  );
}

