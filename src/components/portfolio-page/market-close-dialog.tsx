"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";

interface MarketCloseDialogProps {
  trigger?: React.ReactNode;
  position: {
    id: string;
    athleteName: string;
    athleteImage: string;
    size: number;
    currentPrice: number;
  };
  onConfirm?: (positionId: string, closePercentage: number) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function MarketCloseDialog({
  trigger,
  position,
  onConfirm,
  open,
  onOpenChange,
}: MarketCloseDialogProps) {
  const [closePercentage, setClosePercentage] = useState<number>(100);

  const handleMarketClose = () => {
    onConfirm?.(position.id, closePercentage);
    onOpenChange?.(false);
  };

  const leverage = Math.round(closePercentage);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className="flex max-w-[calc(100%-2rem)] flex-col items-center justify-center gap-8 rounded-[20px] bg-bg-secondary p-[20px] pb-[20px] pt-[40px] sm:max-w-[420px]"
        showCloseButton={false}
      >
        {/* Header Section */}
        <div className="flex flex-col items-center gap-7">
          <div className="flex flex-col items-center gap-4 self-stretch">
            <h2 className="text-text-primary text-center text-base font-semibold leading-[19px] tracking-[-0.2px]">
              Market Close
            </h2>
            <p className="text-text-secondary max-w-[328px] text-center text-sm font-normal leading-[18px] tracking-[-0.1px]">
              This will attempt to immediately close the position
            </p>
          </div>
        </div>

        {/* Position Details */}
        <div className="flex w-full flex-col items-start gap-[10px] self-stretch">
          {/* Athlete Card */}
          <div className="bg-elevation-bg flex w-full items-center gap-2 self-stretch rounded-[14px] p-3">
            <div className="relative aspect-square h-6 w-6 overflow-hidden rounded-full bg-gray-200">
              <Image
                src={position.athleteImage}
                alt={position.athleteName}
                fill
                className="object-cover object-top"
              />
            </div>
            <span className="text-text-primary text-[13px] font-medium leading-[13px] tracking-[-0.1px]">
              {position.athleteName}
            </span>
          </div>

          {/* Details Rows */}
          <div className="flex w-full flex-col items-start self-stretch px-3">
            {/* Size Row */}
            <div className="flex items-center gap-2 self-stretch rounded py-1.5">
              <span className="text-text-tertiary flex-1 text-[13px] font-normal leading-[15px] tracking-[-0.1px]">
                Size
              </span>
              <span className="text-text-primary flex-1 text-right text-[13px] font-medium leading-[13px] tracking-[-0.1px]">
                {position.size.toFixed(2)} USD
              </span>
            </div>

            {/* Price Row */}
            <div className="flex items-center gap-2 self-stretch rounded py-1.5">
              <span className="text-text-tertiary flex-1 text-[13px] font-normal leading-[15px] tracking-[-0.1px]">
                Price
              </span>
              <span className="text-text-primary flex-1 text-right text-[13px] font-medium leading-[13px] tracking-[-0.1px]">
                Market
              </span>
            </div>
          </div>
        </div>

        {/* Slider Section */}
        <div className="flex w-full flex-col items-start gap-6 self-stretch">
          <div className="flex items-center gap-4 self-stretch">
            <div className="flex flex-1 flex-col items-start gap-3.5">
              <Slider
                value={[closePercentage]}
                onValueChange={(value) => setClosePercentage(value[0])}
                min={20}
                max={100}
                step={20}
                showLabels={true}
                labels={["20%", "40%", "60%", "80%", "100%"]}
                className="w-full"
              />
            </div>
            <div className="bg-elevation-button flex h-10 w-[66px] items-center justify-center gap-1 rounded-lg px-4 py-3">
              <span className="text-text-primary flex-1 text-[13px] font-semibold leading-[13px] tracking-[-0.1px]">
                {leverage}x
              </span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleMarketClose}
            className="bg-bg-inverse-primary text-text-inverse-primary flex w-full items-center justify-center gap-2.5 self-stretch rounded-lg px-5 py-4 transition-opacity hover:opacity-90"
          >
            <span className="text-xs font-semibold leading-3 tracking-[-0.1px]">
              Market Close
            </span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
