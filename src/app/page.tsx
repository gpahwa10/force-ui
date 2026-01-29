"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import TodayGamesSection from "@/components/home-page/sections/today-games-section";
import TrendingSection from "@/components/home-page/sections/trending-section";
import AthletesTableSection from "@/components/home-page/sections/athletes-table-section";
import PriceTrendPageSection from "@/components/home-page/sections/price-trend-page-section";
import SidebarSection from "@/components/home-page/sections/sidebar-section";
import Separator from "@/components/common/ui/separator";

// Add a global type for the window flag
declare global {
  interface Window {
    __onboardingDone?: boolean;
  }
}

export default function Page() {
  // Splash should only show if onboarding is not done
  const [showSplash, setShowSplash] = useState<boolean>(() => {
    return typeof window === "undefined" ? true : !window.__onboardingDone;
  });
  const [onboardingDone, setOnboardingDone] = useState<boolean>(() => {
    return typeof window !== "undefined" && !!window.__onboardingDone;
  });

  useEffect(() => {
    if (!onboardingDone && showSplash) {
      const t = setTimeout(() => setShowSplash(false), 1200);
      return () => clearTimeout(t);
    }
  }, [onboardingDone, showSplash]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (onboardingDone) {
      window.dispatchEvent(new Event("onboardingComplete"));
    }
  }, [onboardingDone]);

  // Controls whether the Price Trend page is visible
  const [showPriceTrendPage, setShowPriceTrendPage] = useState<boolean>(false);

  // Broadcast visibility to the header
  useEffect(() => {
    if (typeof window !== "undefined") {
      (
        window as { __priceTrendPageVisible?: boolean }
      ).__priceTrendPageVisible = showPriceTrendPage;
      window.dispatchEvent(
        new CustomEvent("priceTrendPage", {
          detail: { visible: showPriceTrendPage },
        }),
      );
    }
  }, [showPriceTrendPage]);

  return (
    <AnimatePresence>
      <motion.div
        key="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={`pt-header min-h-0 w-full overflow-hidden`}>
          <main>
            {!showPriceTrendPage ? (
              <>
                <TodayGamesSection />
                <Separator />
                <TrendingSection />
                <Separator />
                <AthletesTableSection />
              </>
            ) : (
              <>
                <PriceTrendPageSection
                  onBack={() => setShowPriceTrendPage(false)}
                />
                <SidebarSection />
              </>
            )}
          </main>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
