"use client";

import AthleteBanner from "@/components/athlete-page/athlete-banner";
import TradingPanel from "@/components/common/trading-panel";
import { ExtendedAthleteData } from "@/lib/data/athletes-bank";

interface AthleteBannerSectionProps {
  athlete: ExtendedAthleteData;
  currentPrice: number;
  onPlaceOrder: (
    type: "long" | "short",
    orderSize: number,
    leverage: number,
  ) => void;
}

export default function AthleteBannerSection({
  athlete,
  currentPrice,
  onPlaceOrder,
}: AthleteBannerSectionProps) {
  return (
    <section id="athlete-banner">
      <div className="max-w-global border-border-secondary mx-auto w-full border-x">
        <div className="px-global py-section-md">
          <div className="flex w-full flex-col items-stretch justify-center gap-[16px] md:gap-[24px] lg:flex-row lg:gap-[16px]">
            <AthleteBanner athlete={athlete} />
            <div className="flex h-full min-h-0 w-full flex-col lg:w-[360px]">
              <TradingPanel
                athleteName={athlete.name}
                currentPrice={currentPrice}
                onPlaceOrder={onPlaceOrder}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

