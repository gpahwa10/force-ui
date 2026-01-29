"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { X, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MarketModal from "./market-modal";

export default function BestAthlete() {
  const [openDialog, setOpenDialog] = useState<number | null>(null);
  const [openSide, setOpenSide] = useState<"long" | "short" | null>(null);
  const [selectedMobileIndex, setSelectedMobileIndex] = useState<number | null>(
    null,
  );

  // Rows data (same content you have, now centralized)
  const athletes = [
    {
      name: "LeBron James",
      team: "Los Angeles Lakers",
      iconSrc: "/icons/players/lebron-james.png",
      price: "$102.3",
      change: "+23%",
      volume: "$123.4k",
    },
    {
      name: "Stephen Curry",
      team: "Golden State Warriors",
      iconSrc: "/icons/players/stephen-curry.png",
      price: "$102.3",
      change: "-23%",
      volume: "$123.4k",
    },
    {
      name: "Kevin Durant",
      team: "Phoenix Suns",
      iconSrc: "/icons/players/kevin-durrant.png",
      price: "$102.3",
      change: "-23%",
      volume: "$123.4k",
    },
    {
      name: "LeBron James",
      team: "Los Angeles Lakers",
      iconSrc: "/icons/players/lebron-james.png",
      price: "$102.3",
      change: "+23%",
      volume: "$123.4k",
    },
    {
      name: "Kevin Durant",
      team: "Phoenix Suns",
      iconSrc: "/icons/players/kevin-durrant.png",
      price: "$102.3",
      change: "+23%",
      volume: "$123.4k",
    },
  ];

  const changeClass = (change: string) =>
    change.startsWith("-") ? "text-base-red" : "text-dark-green";

  return (
    <div className="flex w-full flex-col rounded-[10px] bg-white">
      <Button className="border-light-gray hover:bg-primary-foreground flex h-fit w-full flex-row justify-between gap-[20px] border-b bg-white px-[20px]! py-[20px] hover:cursor-pointer">
        <p className="font-nohemi text-text-primary text-[14px] leading-[100%] font-medium tracking-[2%]">
          Best Athletes to Trade
        </p>
        <ChevronRight className="text-text-secondary" width={14} height={14} />
      </Button>
      <div className="flex w-full flex-col p-[4px]">
        <div className="hidden w-full flex-row md:flex">
          <div className="w-[30%] gap-[24px] px-[16px] py-[12px]">
            <p className="text-text-secondary text-[12px] leading-[100%] font-medium tracking-[-1%]">
              Athlete Name
            </p>
          </div>
          <div className="w-[17%] gap-[24px] px-[16px] py-[12px]">
            <p className="text-text-secondary text-[12px] leading-[100%] font-medium tracking-[-1%]">
              Current Price
            </p>
          </div>
          <div className="w-[17%] gap-[24px] px-[16px] py-[12px]">
            <p className="text-text-secondary text-[12px] leading-[100%] font-medium tracking-[-1%]">
              24h Change
            </p>
          </div>
          <div className="w-[17%] gap-[24px] px-[16px] py-[12px]">
            <p className="text-text-secondary text-[12px] leading-[100%] font-medium tracking-[-1%]">
              24h Volume
            </p>
          </div>
          <div className="w-[21%] gap-[24px] px-[16px] py-[12px]">
            <p className="text-text-secondary text-[12px] leading-[100%] font-medium tracking-[-1%]">
              Quick Trade
            </p>
          </div>
        </div>

        {athletes.map((row, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedMobileIndex(idx)}
            className={`flex w-full flex-col gap-[8px] transition-colors duration-200 ease-out md:flex-row md:gap-0 ${
              idx >= 3 ? "hidden md:flex" : ""
            } md:hover:bg-primary-foreground md:border-b-0 ${
              selectedMobileIndex === idx ? "bg-primary-foreground" : ""
            }`}
          >
            <div className="flex w-full flex-col gap-3 px-[16px] py-[12px] md:hidden">
              <div className="flex items-center justify-between gap-[10px]">
                <div className="flex flex-row gap-[10px]">
                  <Image
                    src={row.iconSrc}
                    alt={row.name}
                    width={32}
                    height={32}
                    className="max-h-[32px] max-w-[32px] rounded-[6px]"
                  />
                  <div className="flex flex-col gap-[8px]">
                    <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-2%]">
                      {row.name}
                    </p>
                    <p className="text-text-secondary text-[12px] leading-[100%] tracking-[-1%]">
                      {row.team}
                    </p>
                  </div>
                </div>
                <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-2%]">
                  {row.price}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p
                  className={`text-[14px] leading-[100%] font-medium tracking-[-2%] ${changeClass(
                    row.change,
                  )}`}
                >
                  {row.change}
                </p>
                <p
                  className={`text-[14px] leading-[100%] font-medium tracking-[-2%] ${changeClass(
                    row.change,
                  )}`}
                >
                  {row.volume}
                </p>
              </div>
            </div>

            <div className="hidden w-full flex-row gap-[10px] rounded-[10px] px-[16px] py-[12px] md:flex md:w-[30%]">
              <Image
                src={row.iconSrc}
                alt={row.name}
                width={32}
                height={32}
                className="max-h-[32px] max-w-[32px] rounded-[6px]"
              />
              <div className="flex flex-col gap-[8px]">
                <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-2%]">
                  {row.name}
                </p>
                <p className="text-text-secondary text-[12px] leading-[100%] tracking-[-1%]">
                  {row.team}
                </p>
              </div>
            </div>

            <div className="hidden w-full flex-col gap-[6px] px-[16px] py-[12px] md:flex md:w-[17%] md:flex-row md:gap-[16px]">
              <p className="text-text-secondary text-[11px] leading-[100%] font-medium tracking-[-1%] md:hidden">
                Current Price
              </p>
              <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-2%]">
                {row.price}
              </p>
            </div>

            <div className="hidden w-full flex-col gap-[6px] px-[16px] py-[12px] md:flex md:w-[17%] md:flex-row md:gap-[16px]">
              <p className="text-text-secondary text-[11px] leading-[100%] font-medium tracking-[-1%] md:hidden">
                24h Change
              </p>
              <p
                className={`text-[14px] leading-[100%] font-medium tracking-[-2%] ${changeClass(
                  row.change,
                )}`}
              >
                {row.change}
              </p>
            </div>

            <div className="hidden w-full flex-col gap-[6px] px-[16px] py-[12px] md:flex md:w-[17%] md:flex-row md:gap-[16px]">
              <p className="text-text-secondary text-[11px] leading-[100%] font-medium tracking-[-1%] md:hidden">
                24h Volume
              </p>
              <p
                className={`text:[14px] leading-[100%] font-medium tracking-[-2%] ${changeClass(
                  row.change,
                )}`}
              >
                {row.volume}
              </p>
            </div>

            <div className="flex hidden w-full flex-row items-center gap-[8px] px-[16px] py-[12px] md:flex md:w-[21%]">
              <Dialog
                open={openDialog === idx && openSide === "long"}
                onOpenChange={(open) => {
                  if (!open) setOpenSide(null);
                  setOpenDialog(open ? idx : null);
                }}
              >
                <DialogTrigger asChild>
                  <Button
                    lip="on"
                    onClick={() => setOpenSide("long")}
                    className="bg-main border-main flex h-[32px] flex-row items-center justify-center gap-[8px] rounded-[7px] border px-[12px] py-[10px] hover:cursor-pointer"
                  >
                    <p className="text-[12px] leading-[130%] font-medium tracking-[-1%] text-white">
                      Long
                    </p>
                  </Button>
                </DialogTrigger>
                <DialogContent
                  className="max-h-[700px] w-[400px] overflow-y-hidden overscroll-contain bg-white px-0 py-0 [-ms-overflow-style:none] [scrollbar-width:none] hover:overflow-y-auto [&::-webkit-scrollbar]:hidden"
                  showCloseButton={false}
                >
                  <MarketModal type="long" />
                </DialogContent>
              </Dialog>

              <Dialog
                open={openDialog === idx && openSide === "short"}
                onOpenChange={(open) => {
                  if (!open) setOpenSide(null);
                  setOpenDialog(open ? idx : null);
                }}
              >
                <DialogTrigger asChild>
                  <Button
                    lip="on"
                    onClick={() => setOpenSide("short")}
                    className="border-main/7 hover:bg-primary-foreground flex h-[32px] flex-row items-center justify-center gap-[8px] rounded-[7px] border bg-white px-[12px] py-[10px] hover:cursor-pointer"
                  >
                    <p className="text-dark-900 text-[12px] leading-[130%] font-medium tracking-[-1%]">
                      Short
                    </p>
                  </Button>
                </DialogTrigger>
                <DialogContent
                  className="max-h-[700px] w-[400px] overflow-y-hidden overscroll-contain bg-white px-0 py-0 [-ms-overflow-style:none] [scrollbar-width:none] hover:overflow-y-auto [&::-webkit-scrollbar]:hidden"
                  showCloseButton={false}
                >
                  <MarketModal type="short" />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
        <div className="flex w-full gap-2 px-[16px] pb-[16px] md:hidden">
          <Button
            lip="on"
            disabled={selectedMobileIndex === null}
            onClick={() => {
              if (selectedMobileIndex !== null) {
                setOpenSide("long");
                setOpenDialog(selectedMobileIndex);
              }
            }}
            className="bg-main border-main flex h-[40px] w-1/2 items-center justify-center rounded-[7px] border px-[12px] py-[10px] text-white disabled:opacity-50"
          >
            Long
          </Button>
          <Button
            lip="on"
            disabled={selectedMobileIndex === null}
            onClick={() => {
              if (selectedMobileIndex !== null) {
                setOpenSide("short");
                setOpenDialog(selectedMobileIndex);
              }
            }}
            className="border-main/7 hover:bg-primary-foreground text-text-primary flex h-[40px] w-1/2 items-center justify-center rounded-[7px] border bg-white px-[12px] py-[10px] disabled:opacity-50"
          >
            Short
          </Button>
        </div>
        <Dialog
          open={openDialog !== null && openSide !== null}
          onOpenChange={(open) => {
            if (!open) {
              setOpenSide(null);
              setOpenDialog(null);
            }
          }}
        >
          <DialogContent
            className="max-h-[700px] w-[400px] overflow-y-hidden overscroll-contain bg-white px-0 py-0 [-ms-overflow-style:none] [scrollbar-width:none] hover:overflow-y-auto [&::-webkit-scrollbar]:hidden"
            showCloseButton={false}
          >
            <MarketModal type={openSide ?? "long"} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
