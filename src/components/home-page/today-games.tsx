"use client";

import React, { useMemo } from "react";
import GameCard from "./game-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import {
  todayGames,
  getTeamDataById,
  type GameTeamData,
} from "@/lib/data/today-games";
import { useLiveData } from "@/components/providers/live-data-provider";
import { getTeamById } from "@/lib/data/athletes-bank";

const DEFAULT_THUMBNAILS = [
  "/icons/matches/match1.svg",
  "/icons/matches/match2.svg",
  "/icons/matches/match3.svg",
  "/icons/matches/match4.svg",
  "/icons/matches/match1.svg",
];

function liveGameStateToDisplay(
  gameId: string,
  team1Id: string,
  team2Id: string,
  team1Points: number,
  team2Points: number,
  team1Name?: string,
  team2Name?: string,
  thumbnailIndex = 0
): {
  id: string;
  image: string;
  team1: GameTeamData;
  team2: GameTeamData;
  status: string;
  volume: string;
} | null {
  const t1 = getTeamById(team1Id);
  const t2 = getTeamById(team2Id);
  const team1: GameTeamData = {
    id: team1Id,
    slug: team1Id,
    score: team1Points,
    icon: t1?.logoUrl ?? "/images/teams/lakers.png",
    name: team1Name ?? t1?.name ?? team1Id,
    price: "$—",
    change: 0,
  };
  const team2: GameTeamData = {
    id: team2Id,
    slug: team2Id,
    score: team2Points,
    icon: t2?.logoUrl ?? "/images/teams/warriors.png",
    name: team2Name ?? t2?.name ?? team2Id,
    price: "$—",
    change: 0,
  };
  return {
    id: gameId,
    image: DEFAULT_THUMBNAILS[thumbnailIndex % DEFAULT_THUMBNAILS.length],
    team1,
    team2,
    status: "Live",
    volume: "$—",
  };
}

export default function TodayGames() {
  const { gameStates } = useLiveData();

  const displayGames = useMemo((): Array<{
    id: string;
    image: string;
    team1: GameTeamData;
    team2: GameTeamData;
    status: string;
    volume: string;
  }> => {
    if (gameStates.size > 0) {
      const out: Array<{
        id: string;
        image: string;
        team1: GameTeamData;
        team2: GameTeamData;
        status: string;
        volume: string;
      }> = [];
      let idx = 0;
      gameStates.forEach((payload, gameId) => {
        const teamIds = Object.keys(payload.teams);
        if (teamIds.length < 2) return;
        const [team1Id, team2Id] = teamIds;
        const t1 = payload.teams[team1Id];
        const t2 = payload.teams[team2Id];
        if (!t1 || !t2) return;
        const row = liveGameStateToDisplay(
          gameId,
          team1Id,
          team2Id,
          t1.points ?? 0,
          t2.points ?? 0,
          t1.team_name,
          t2.team_name,
          idx
        );
        if (row) {
          out.push(row);
          idx += 1;
        }
      });
      return out;
    }
    return todayGames.map((game) => {
      const team1 = getTeamDataById(game.id, game.team1Id);
      const team2 = getTeamDataById(game.id, game.team2Id);
      if (!team1 || !team2) return null;
      return {
        id: game.id,
        image: game.thumbnail,
        team1,
        team2,
        status: game.status,
        volume: game.volume,
      };
    }).filter((g): g is NonNullable<typeof g> => g != null);
  }, [gameStates]);

  return (
    <section id="today-games" className="">
      <div className="max-w-global border-border-secondary mx-auto w-full overflow-hidden border-x">
        <div className="px-global py-section-md">
          <h3 className="text-text-secondary m-0 mb-2 p-0 text-[14px] font-semibold">
            Todays Games
          </h3>
          <Swiper
            modules={[Mousewheel]}
            spaceBetween={8}
            slidesPerView="auto"
            mousewheel={{
              forceToAxis: true,
              releaseOnEdges: true,
              sensitivity: 1,
            }}
            className="overflow-visible! pb-0!"
          >
            {displayGames.map((game) => (
              <SwiperSlide key={game.id} className="w-[356px]!">
                <GameCard
                  id={game.id}
                  image={game.image}
                  team1={game.team1}
                  team2={game.team2}
                  status={game.status}
                  volume={game.volume}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
