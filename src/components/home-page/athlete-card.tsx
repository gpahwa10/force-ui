"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import MarketModal from "./market-modal";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AthleteCardProps {
  index?: number;
  id?: string | number;
  athleteName: string;
  athleteImage: string;
  team: string;
  price: string;
  percentage: string;
  backgroundColor?: string;
  isPositive?: boolean;
  mode?: "grid" | "list";
  volume?: string; // used in list mode
}

export default function AthleteCard({
  index,
  id,
  athleteName,
  athleteImage,
  team,
  price,
  percentage,
  backgroundColor = "bg-dark-yellow",
  isPositive = true,
  mode = "grid",
  volume,
}: AthleteCardProps) {
  const [openSide, setOpenSide] = useState<"long" | "short" | null>(null);
  const router = useRouter();
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

  if (mode === "list") {
    return (
      <div
        className="hover:bg-primary-foreground flex w-full flex-row items-center gap-8 rounded-[10px] border border-black/5 bg-white p-5 transition-colors duration-200 hover:cursor-pointer"
        onClick={() => id && router.push(`/athlete/${id}`)}
      >
        {index !== undefined && (
          <div className="flex w-[4%] flex-row items-center">
            <div className="border-light-gray flex w-8 flex-row items-center justify-center gap-1 rounded-[100px] border bg-white py-1.5">
              <p className="text-sub-500 text-center text-[12px] leading-[100%] font-medium tracking-[-1%]">
                #{index}
              </p>
            </div>
          </div>
        )}
        <div
          className={`flex flex-row ${
            index !== undefined ? "w-[51%]" : "w-[55%]"
          } items-center gap-4`}
        >
          <div
            className={`relative h-12 w-12 rounded-md ${backgroundColor} overflow-hidden`}
          >
            <Image
              src="/icons/athletes/logo.png"
              alt="Logo"
              fill
              className="object-cover object-top opacity-8 mix-blend-screen"
            />
            <Image
              src={athleteImage}
              alt={athleteName}
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="flex w-fit flex-col gap-2">
            <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-2%] text-nowrap">
              {athleteName}
            </p>
            <p className="text-text-secondary text-[12px] leading-[100%] tracking-[-1%] text-nowrap">
              {team}
            </p>
          </div>
        </div>

        <p className="text-text-primary w-[10.5%] text-[14px] leading-[100%] font-medium tracking-[-1%]">
          {price}
        </p>
        <p
          className={`w-[10.5%] text-[14px] leading-[100%] font-medium tracking-[-1%] ${
            isPositive ? "text-light-green" : "text-neon-pink"
          }`}
        >
          {percentage}
        </p>
        <p className="text-light-green w-[10.5%] text-[14px] leading-[100%] font-medium tracking-[-1%]">
          {volume ?? "-"}
        </p>
        <Dialog
          open={openSide !== null}
          onOpenChange={(open) => {
            if (!open) setOpenSide(null);
          }}
        >
          <div className="flex w-[13.5%] flex-row items-center gap-2.5">
            <DialogTrigger asChild>
              <Button
                lip="on"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenSide("long");
                }}
                className="bg-main border-main flex h-8 flex-row items-center justify-center gap-2 rounded-[7px] border px-3 py-2.5 hover:cursor-pointer"
              >
                <p className="text-[12px] leading-[130%] font-medium tracking-[-1%] text-white">
                  Long
                </p>
              </Button>
            </DialogTrigger>
            <DialogTrigger asChild>
              <Button
                lip="on"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenSide("short");
                }}
                className="border-main/7 hover:bg-primary-foreground flex h-8 flex-row items-center justify-center gap-2 rounded-[7px] border bg-white px-3 py-2.5 hover:cursor-pointer"
              >
                <p className="text-dark-900 text-[12px] leading-[130%] font-medium tracking-[-1%]">
                  Short
                </p>
              </Button>
            </DialogTrigger>
          </div>
          <DialogContent
            fullscreen={isMobile}
            className={
              isMobile
                ? "z-[200] overflow-auto"
                : "max-h-[700px] w-[400px] overflow-y-hidden overscroll-contain bg-white px-0 py-0 [-ms-overflow-style:none] [scrollbar-width:none] hover:overflow-y-auto [&::-webkit-scrollbar]:hidden"
            }
            showCloseButton={false}
          >
            <MarketModal type={openSide ?? "long"} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // grid mode
  return (
    <div
      className="flex w-[340px] flex-col gap-1 rounded-[10px] bg-white p-1 hover:cursor-pointer md:w-full"
      onClick={() => id && router.push(`/athlete/${id}`)}
    >
      <div
        className={`relative h-[210px] w-full rounded-md ${backgroundColor} overflow-hidden`}
      >
        <Image
          src="/icons/athletes/logo.png"
          alt="Logo"
          fill
          className="object-cover object-top opacity-8 mix-blend-screen"
        />
        <Image
          src={athleteImage}
          alt={athleteName}
          fill
          className="object-cover object-top"
        />
      </div>
      <div className="flex w-full min-w-0 flex-col gap-3 p-3 sm:gap-4 sm:p-4">
        <div className="flex w-full min-w-0 flex-col gap-2">
          <p className="text-text-primary truncate text-[14px] leading-[100%] font-medium tracking-[-2%] sm:text-[14px]">
            {athleteName}
          </p>
          <p className="text-text-secondary truncate text-[12px] leading-[100%] tracking-[-1%]">
            {team}
          </p>
        </div>
        <div className="flex w-full flex-row items-center justify-between">
          <p className="text-text-primary text-[12px] leading-[100%] font-medium tracking-[-1%]">
            {price}
          </p>
          <p
            className={`text-[12px] leading-[100%] font-medium tracking-[-1%] ${
              isPositive ? "text-light-green" : "text-neon-pink"
            }`}
          >
            {percentage}
          </p>
        </div>
      </div>
    </div>
  );
}
