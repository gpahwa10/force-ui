"use client";

import React from "react";
import GameCard from "./game-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import { todayGames, getTeamDataById } from "@/lib/data/today-games";

export default function TodayGames() {
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
              forceToAxis: true, // vertical wheel → horizontal
              releaseOnEdges: true,
              sensitivity: 1,
            }}
            className="overflow-visible! pb-0!"
          >
            {todayGames.map((game) => {
              const team1 = getTeamDataById(game.id, game.team1Id);
              const team2 = getTeamDataById(game.id, game.team2Id);
              
              if (!team1 || !team2) return null;
              
              return (
                <SwiperSlide key={game.id} className="w-[356px]!">
                  <GameCard
                    id={game.id}
                    image={game.thumbnail}
                    team1={team1}
                    team2={team2}
                    status={game.status}
                    volume={game.volume}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
