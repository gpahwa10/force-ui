"use client";

import { AnimatePresence, motion } from "framer-motion";
import RankingsSidebarSection from "@/components/discover-page/sections/rankings-sidebar-section";
import DiscoverHeaderSection from "@/components/discover-page/sections/discover-header-section";
import TrendingSection from "@/components/discover-page/sections/trending-section";
import DiscoverTableSection from "@/components/discover-page/sections/discover-table-section";
import Separator from "@/components/common/ui/separator";

export default function DiscoverPage() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="discover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mt-header flex h-fit w-full flex-col overflow-hidden">
          {/* Main content container */}
          <div className="max-w-global mx-auto w-full">
            <div className="grid w-full grid-cols-1 items-start lg:grid-cols-[296px_1fr]">
              <RankingsSidebarSection showPlayerRankings={true} />
              <div className="w-full max-w-full flex-1">
                <DiscoverHeaderSection />
                <Separator />
                <TrendingSection />
                <Separator />
                <DiscoverTableSection first="Athletes" second="Team" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
