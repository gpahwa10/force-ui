"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
} from "@/components/ui/popover";
import { X, Plus } from "lucide-react";

export default function BalancePopover() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          lip="on"
          className="hover:bg-primary-foreground flex h-[32px] flex-row items-center justify-center gap-[6px] rounded-[100px] border border-black/5 bg-white pr-[10px] pl-[4px] hover:cursor-pointer"
        >
          <div className="bg-main flex h-[24px] w-[24px] flex-row items-center justify-center gap-[10px] rounded-[100px]">
            <Image
              src="/logo-black.png"
              alt="Vibranium"
              width={14}
              height={13}
            />
          </div>
          <p className="text-text-primary text-[12px] leading-[100%] font-semibold tracking-tight">
            0
          </p>
        </Button>
      </PopoverTrigger>
      <PopoverAnchor asChild>
        <div className="pointer-events-none absolute top-[56px] right-[30px] h-[1px] w-[1px]" />
      </PopoverAnchor>
      <PopoverContent
        side="bottom"
        align="end"
        sideOffset={0}
        className="z-200 h-fit w-[404px] overflow-hidden rounded-[10px] border-black/5 bg-white p-0"
      >
        <Button className="border-light-gray hover:bg-primary-foreground flex h-fit w-full flex-row justify-between gap-[20px] rounded-t-[10px] rounded-b-none border-b bg-white px-[20px]! py-[20px] hover:cursor-pointer">
          <div className="flex flex-row items-center gap-[10px]">
            <div className="bg-main flex h-[24px] w-[24px] flex-row items-center justify-center gap-[10px] rounded-[100px]">
              <Image
                src="/logo-black.png"
                alt="Vibranium"
                width={14}
                height={13}
              />
            </div>
            <p className="font-nohemi text-text-primary text-[14px] leading-[100%] font-medium tracking-[2%]">
              My Wallet
            </p>
          </div>
          <X className="text-text-secondary" width={14} height={14} />
        </Button>

        <div className="flex w-full flex-col gap-[20px] rounded-[10px] bg-white p-[20px]">
          <div className="flex w-full flex-col items-center gap-[10px]">
            <p className="text-text-secondary text-[12px] leading-[130%] tracking-[-1%]">
              Current Balance
            </p>
            <p className="text-text-primary text-[24px] leading-[100%] font-semibold tracking-[-2%]">
              0
            </p>
            <p className="text-text-secondary text-[12px] leading-[130%] tracking-[-1%]">
              1 coin = 1 USD
            </p>
          </div>

          <div className="flex w-full flex-col gap-[10px]">
            <Button className="bg-main border-main flex h-[40px] flex-row items-center justify-center gap-[8px] rounded-[8px] border px-[16px] text-white hover:cursor-pointer">
              <Plus className="text-white" width={16} height={16} />
              <p className="text-[14px] leading-[140%] font-medium tracking-[-1%]">
                Topup
              </p>
            </Button>
            <Button className="border-main/7 text-text-primary hover:bg-primary-foreground flex h-[40px] flex-row items-center justify-center gap-[8px] rounded-[8px] border bg-white px-[16px] hover:cursor-pointer">
              <Image
                src="/icons/notifications/down-arrow.svg"
                alt="down-arrow"
                width={16}
                height={16}
              />
              <p className="text-[14px] leading-[140%] font-medium tracking-[-1%]">
                Withdraw
              </p>
            </Button>
            <Button className="border-main/7 text-text-primary hover:bg-primary-foreground flex h-[40px] flex-row items-center justify-center gap-[8px] rounded-[8px] border bg-white px-[16px] hover:cursor-pointer">
              <Image
                src="/icons/notifications/up-arrow.svg"
                alt="up-arrow"
                width={16}
                height={16}
              />
              <p className="text-[14px] leading-[140%] font-medium tracking-[-1%]">
                Transfer
              </p>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
