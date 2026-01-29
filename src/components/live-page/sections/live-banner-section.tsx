"use client";

import Image from "next/image";
import { GameTeamData } from "@/lib/data/today-games";

interface LiveBannerSectionProps {
  thumbnail: string;
  team1: GameTeamData;
  team2: GameTeamData;
}

export default function LiveBannerSection({
  thumbnail,
  team1,
  team2,
}: LiveBannerSectionProps) {
  return (
    <section id="live-banner">
      <div className="max-w-global border-border-secondary mx-auto w-full border-x">
        <div className="relative h-[120px] w-full sm:h-[152px] md:h-[212px]">
          <Image
            src={thumbnail}
            fill
            alt={`${team1.name} vs ${team2.name}`}
            className="h-full w-full object-cover object-[top_10%]"
          />
        </div>
      </div>
    </section>
  );
}

