"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import MissedMomentsRow from "@/components/discover-page/missed-moments-row";
import { useEffect, useState } from "react";

type MomentEvent = {
  eventSrc: string;
  eventAlt: string;
  title: string;
  description: string;
  volume: string;
  percentage: string;
  timeAgo: string;
};

export default function MissedMomentsTable({
  events,
}: {
  events: MomentEvent[];
}) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () =>
      setIsMobile(
        typeof window !== "undefined" &&
          window.matchMedia("(max-width: 768px)").matches,
      );
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const visibleEvents = isMobile ? events.slice(0, 3) : events;

  return (
    <div className="flex w-full flex-col rounded-[10px] bg-white">
      <Button
        asChild
        className="border-light-gray hover:bg-primary-foreground flex h-fit w-full flex-row justify-between gap-[20px] border-b bg-white px-[20px]! py-[20px] hover:cursor-pointer"
      >
        <a target="_blank" href="https://www.nba.com/news/category/top-stories">
          <p className="font-nohemi text-text-primary text-[14px] leading-[100%] font-medium tracking-[2%]">
            Moments You Missed
          </p>
          <ChevronRight
            className="text-text-secondary"
            width={14}
            height={14}
          />
        </a>
      </Button>
      <div className="grid w-full grid-cols-1 md:grid-cols-2">
        {visibleEvents.map((event, index) => (
          <div
            key={index}
            className={index % 2 === 0 ? "border-light-gray border-r" : ""}
          >
            <MissedMomentsRow
              eventSrc={event.eventSrc}
              eventAlt={event.eventAlt}
              title={event.title}
              description={event.description}
              volume={event.volume}
              percentage={event.percentage}
              timeAgo={event.timeAgo}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
