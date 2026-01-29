"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TEAMS, ATHLETES_BANK } from "@/lib/data/athletes-bank";

interface RankingCardProps {
  rank: number;
  name: string;
  imageUrl?: string;
  type: "team" | "player";
  id: string;
}

function RankingCard({ rank, name, imageUrl, type, id }: RankingCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (type === "team") {
      router.push(`/team/${id}`);
    } else {
      router.push(`/athlete/${id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="ranking-card bg-elevation-button flex h-full w-full cursor-pointer items-center gap-2 rounded-[14px] p-2 transition-colors duration-200"
    >
      <span className="rank-number text-text-secondary w-[14px] text-[11px] leading-[11px] font-medium tracking-[-0.1px]">
        #{rank}
      </span>
      {type === "team" && imageUrl && (
        <div className="team-badge relative flex h-6 w-6 items-center justify-center">
          <Image
            src={imageUrl}
            alt={name}
            width={24}
            height={24}
            className="w-full h-full object-cover object-top"
          />
        </div>
      )}
      {type === "player" && (
        <div
          className="player-avatar relative flex h-6 w-6 bg-bg-primary items-center justify-center overflow-hidden rounded-full"

        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              width={31}
              height={42}
              className="w-full h-full object-cover object-top"
              style={{
                filter: "drop-shadow(16px 10.4px 11.2px rgba(0, 0, 0, 0.25))",
              }}
            />
          ) : (
            <span className="text-[10px] font-bold text-white">
              {name.charAt(0)}
            </span>
          )}
        </div>
      )}
      <span className="player-name text-text-primary flex-1 text-xs leading-3 font-medium tracking-[-0.1px]">
        {name}
      </span>
    </div>
  );
}

interface RankingsSidebarProps {
  showPlayerRankings?: boolean;
}

export default function RankingsSidebar({
  showPlayerRankings = true,
}: RankingsSidebarProps) {
  // Team Rankings - Using actual teams from data bank
  const teamRankings = TEAMS.slice(0, 5).map((team, index) => ({
    rank: index + 1,
    id: team.id,
    name: team.name,
    imageUrl: team.logoUrl,
  }));

  // Player Rankings - Top ranked athletes from bank
  const topAthletes = [...ATHLETES_BANK]
    .sort((a, b) => (a.rank || 99) - (b.rank || 99))
    .slice(0, 5);

  const playerRankings = topAthletes.map((athlete, index) => ({
    rank: index + 1,
    id: athlete.id,
    name: athlete.name,
    imageUrl: athlete.image,
  }));

  return (
    <div className="rankings-sidebar bg-elevation-card flex h-full w-full flex-col gap-6 rounded-2xl p-5">
      {/* Team Rankings Section */}
      <section className="team-rankings-section flex flex-col gap-2">
        <div className="section-header flex items-center justify-between">
          <h3 className="section-title text-text-secondary text-xs leading-3 font-medium tracking-[-0.1px]">
            Team Rankings
          </h3>
          <button
            className="arrow-button bg-elevation-card flex h-6 w-6 items-center justify-center rounded"
            aria-label="View all team rankings"
          >
            <ChevronRight
              className="text-text-secondary h-[15px] w-[15px]"
              strokeWidth={1.25}
            />
          </button>
        </div>
        <div className="rankings-list flex flex-col gap-1">
          {teamRankings.map((team) => (
            <RankingCard
              key={`team-${team.id}`}
              rank={team.rank}
              id={team.id}
              name={team.name}
              imageUrl={team.imageUrl}
              type="team"
            />
          ))}
        </div>
      </section>

      {/* Player Rankings Section */}
      {showPlayerRankings && (
        <section className="player-rankings-section flex flex-col gap-2">
          <div className="section-header flex items-center justify-between">
            <h3 className="section-title text-text-secondary text-xs leading-3 font-medium tracking-[-0.1px]">
              Player Rankings
            </h3>
            <button
              className="arrow-button bg-elevation-card flex h-6 w-6 items-center justify-center rounded"
              aria-label="View all player rankings"
            >
              <ChevronRight
                className="text-text-secondary h-[15px] w-[15px]"
                strokeWidth={1.25}
              />
            </button>
          </div>
          <div className="rankings-list flex flex-col gap-1">
            {playerRankings.map((player) => (
              <RankingCard
                key={`player-${player.id}`}
                rank={player.rank}
                id={player.id}
                name={player.name}
                imageUrl={player.imageUrl}
                type="player"
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
