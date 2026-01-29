"use client";

import React from "react";
import AthletesCard from "../athletes-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import HideExtra from "../hide-extra";
import { getRandomAthletes } from "@/lib/data/athletes-bank";

// Get random trending athletes from the data bank
const trendingItems = getRandomAthletes(10, true);

export default function TodayGames() {
  return (
    <>
      <h3 className="text-text-secondary m-0 mb-2 p-0 text-[14px] font-semibold">
        Trending
      </h3>
      <div className="relative h-[192px] w-full">
        <Swiper
          modules={[Mousewheel]}
          spaceBetween={8}
          slidesPerView="auto"
          mousewheel={{
            forceToAxis: true, // vertical wheel → horizontal
            releaseOnEdges: true,
            sensitivity: 1,
          }}
          className="!absolute top-0 left-0 !w-full overflow-visible!"
        >
          {trendingItems.map((item, index) => (
            <SwiperSlide key={item.id + index} className="w-auto!">
              <AthletesCard athlete={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
