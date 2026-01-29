"use client";

import PriceTrendPage from "@/components/home-page/price-trend-page";

interface PriceTrendPageSectionProps {
  onBack: () => void;
}

export default function PriceTrendPageSection({
  onBack,
}: PriceTrendPageSectionProps) {
  return <PriceTrendPage onBack={onBack} />;
}

