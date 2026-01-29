"use client";

import PortfolioHeader from "@/components/portfolio-page/portfolio-header";

interface PortfolioHeaderSectionProps {
  onExportTrades?: () => void;
  onDepositWithdraw?: () => void;
  onSettings?: () => void;
}

export default function PortfolioHeaderSection({
  onExportTrades,
  onDepositWithdraw,
  onSettings,
}: PortfolioHeaderSectionProps) {
  return (
    <PortfolioHeader
      onExportTrades={onExportTrades}
      onDepositWithdraw={onDepositWithdraw}
      onSettings={onSettings}
    />
  );
}

