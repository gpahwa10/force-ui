"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PortfolioStatsCardsSection from "@/components/portfolio-page/sections/portfolio-stats-cards-section";
import PortfolioHeaderSection from "@/components/portfolio-page/sections/portfolio-header-section";
import PnLOverviewChartSection from "@/components/portfolio-page/sections/pnl-overview-chart-section";
import OpenPositionsTableSection from "@/components/portfolio-page/sections/open-positions-table-section";
import { useAppSelector } from "@/lib/store/hooks";

export default function PortfolioPage() {
  const profile = useAppSelector((state) => state.profile);
  const activePositions = useAppSelector((state) => state.activePositions.positions);

  // Calculate portfolio data from Redux state
  const portfolioData = useMemo(() => {
    // Calculate unrealized PnL (sum of all position PnL)
    const unrealizedPnL = activePositions.reduce((sum, position) => sum + position.pnlAmount, 0);

    // Calculate total margin used (sum of all collateral)
    const totalMarginUsed = activePositions.reduce((sum, position) => sum + position.collateral, 0);

    // Count open trades
    const openTrades = activePositions.length;

    // Calculate unrealized PnL change (percentage change)
    const unrealizedPnLChange = activePositions.length > 0
      ? (unrealizedPnL / totalMarginUsed) * 100
      : 0;

    // For now, realized PnL is 0 (would need historical trades data)
    // In production, this would come from closed positions/historical trades
    const realizedPnL = 0;
    const realizedPnLChange = 0;

    // Total margin used change (percentage)
    const totalMarginUsedChange = totalMarginUsed > 0 ? 5.0 : 0; // Mock for now

    // Open trades change (mock for now - could track previous count)
    const openTradesChange = 0;

    return {
      totalBalance: profile.balance,
      totalBalanceChange: profile.change24h,
      realizedPnL,
      realizedPnLChange,
      unrealizedPnL: Number(unrealizedPnL.toFixed(2)),
      unrealizedPnLChange: Number(unrealizedPnLChange.toFixed(2)),
      totalMarginUsed: Number(totalMarginUsed.toFixed(2)),
      totalMarginUsedChange,
      openTrades,
      openTradesChange,
    };
  }, [profile.balance, profile.change24h, activePositions]);
  const handleExportTrades = () => {
    console.log("Export trades to CSV");
    // TODO: Implement CSV export
    alert("Exporting trades to CSV...");
  };

  const handleDepositWithdraw = () => {
    console.log("Deposit / Withdraw");
    // TODO: Implement deposit/withdraw modal
    alert("Opening Deposit / Withdraw modal...");
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="portfolio"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mt-header flex w-full flex-col overflow-hidden">
          {/* Main content container */}
          <div className="max-w-global border-border-secondary mx-auto flex w-full flex-col border-x">
            <div className="px-global py-section-md">
              <div className="flex flex-col gap-5 lg:flex-row">
                <PortfolioStatsCardsSection
                  totalBalance={portfolioData.totalBalance}
                  totalBalanceChange={portfolioData.totalBalanceChange}
                  realizedPnL={portfolioData.realizedPnL}
                  realizedPnLChange={portfolioData.realizedPnLChange}
                  unrealizedPnL={portfolioData.unrealizedPnL}
                  unrealizedPnLChange={portfolioData.unrealizedPnLChange}
                  totalMarginUsed={portfolioData.totalMarginUsed}
                  totalMarginUsedChange={portfolioData.totalMarginUsedChange}
                  openTrades={portfolioData.openTrades}
                  openTradesChange={portfolioData.openTradesChange}
                  isPositive={portfolioData.totalBalanceChange >= 0}
                />

                <div className="flex flex-1 flex-col gap-5">
                  <PortfolioHeaderSection
                    onExportTrades={handleExportTrades}
                    onDepositWithdraw={handleDepositWithdraw}
                  />

                  <PnLOverviewChartSection />

                  <OpenPositionsTableSection />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
