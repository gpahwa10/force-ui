"use client";

import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import AthleteBannerSection from "@/components/athlete-page/sections/athlete-banner-section";
import AthleteStatsSection from "@/components/athlete-page/sections/athlete-stats-section";
import AthletePriceChartSection from "@/components/athlete-page/sections/athlete-price-chart-section";
import AthleteIndexWeightsSection from "@/components/athlete-page/sections/athlete-index-weights-section";
import AthleteActivePositionsSection from "@/components/athlete-page/sections/athlete-active-positions-section";
import { getAthleteById } from "@/lib/data/athletes-bank";
import { parsePrice } from "@/lib/formatter";
import NotFound from "@/components/common/not-found";

export default function AthletePage() {
  const params = useParams();
  const athleteId = params.id as string;

  const athlete = getAthleteById(athleteId);

  if (!athlete) {
    return <NotFound title="404" message="Player not found" />;
  }

  const price = parsePrice(athlete.price);

  const handlePlaceOrder = (
    type: "long" | "short",
    orderSize: number,
    leverage: number,
  ) => {
    // Order placement logic - dialogs are handled by TradingPanel component
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="athlete"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="overflow-x-hidden"
      >
        <main className="pt-header flex w-full flex-col justify-center overflow-x-hidden">
          <AthleteBannerSection
            athlete={athlete}
            currentPrice={price}
            onPlaceOrder={handlePlaceOrder}
          />
          <AthleteStatsSection athlete={athlete} currentPrice={price} />
          <AthletePriceChartSection />
          <AthleteIndexWeightsSection />
          <AthleteActivePositionsSection />
        </main>
      </motion.div>
    </AnimatePresence>
  );
}
