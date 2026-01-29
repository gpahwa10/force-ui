"use client";

import PortfolioStatsCards from "@/components/portfolio-page/portfolio-stats-cards";

interface PortfolioStatsCardsSectionProps {
  totalBalance: number;
  totalBalanceChange: number;
  realizedPnL: number;
  realizedPnLChange: number;
  unrealizedPnL: number;
  unrealizedPnLChange: number;
  totalMarginUsed: number;
  totalMarginUsedChange: number;
  openTrades: number;
  openTradesChange: number;
  isPositive: boolean;
}

export default function PortfolioStatsCardsSection({
  totalBalance,
  totalBalanceChange,
  realizedPnL,
  realizedPnLChange,
  unrealizedPnL,
  unrealizedPnLChange,
  totalMarginUsed,
  totalMarginUsedChange,
  openTrades,
  openTradesChange,
  isPositive,
}: PortfolioStatsCardsSectionProps) {
  return (
    <PortfolioStatsCards
      totalBalance={totalBalance}
      totalBalanceChange={totalBalanceChange}
      realizedPnL={realizedPnL}
      realizedPnLChange={realizedPnLChange}
      unrealizedPnL={unrealizedPnL}
      unrealizedPnLChange={unrealizedPnLChange}
      totalMarginUsed={totalMarginUsed}
      totalMarginUsedChange={totalMarginUsedChange}
      openTrades={openTrades}
      openTradesChange={openTradesChange}
      isPositive={isPositive}
    />
  );
}

