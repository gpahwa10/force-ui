"use client";

interface StatCardProps {
  label: string;
  value: string;
  change: number;
  changeLabel?: string;
}

function StatCard({ label, value, change, changeLabel }: StatCardProps) {
  const isPositive = change >= 0;

  return (
    <div className="bg-elevation-bg flex flex-col items-start gap-5 self-stretch rounded-[9px] p-4">
      {/* Label */}
      <div className="flex items-center gap-1.5 self-stretch">
        <span className="text-text-secondary flex-1 text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
          {label}
        </span>
      </div>

      {/* Value and Change */}
      <div className="flex items-start gap-1.5">
        <span className="text-text-primary text-[16px] leading-[19px] font-medium tracking-[-0.2px]">
          {value}
        </span>
        <div className="flex h-3 items-center gap-1 py-[7px]">
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 0L7.4641 6H0.535898L4 0Z"
              fill={isPositive ? "var(--light-green)" : "var(--neon-pink)"}
              transform={isPositive ? "" : "rotate(180 4 4)"}
            />
          </svg>
          <span
            className={`text-[12px] leading-[12px] font-medium tracking-[-0.1px] ${
              isPositive ? "text-light-green" : "text-neon-pink"
            }`}
          >
            {change}%
          </span>
        </div>
      </div>
    </div>
  );
}

interface PortfolioStatsCardsProps {
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

export default function PortfolioStatsCards({
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
}: PortfolioStatsCardsProps) {
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatPnL = (value: number) => {
    const sign = value >= 0 ? "+" : "";
    return `${sign}${formatCurrency(value)}`;
  };

  return (
    <div className="bg-elevation-card flex shrink-0 flex-col items-start gap-[70px] self-stretch overflow-hidden rounded-2xl p-3 px-3 pt-6 md:px-5 lg:max-w-[296px]">
      {/* Main Content Container */}
      <div className="flex flex-col items-start gap-10 self-stretch">
        {/* Total Balance Section */}
        <div className="flex flex-col items-start gap-4 self-stretch">
          <span className="text-text-primary self-stretch text-[13px] leading-[13px] font-medium tracking-[-0.1px]">
            Total Balance
          </span>
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-start gap-1">
              <span className="text-text-primary text-[32px] leading-[32px] font-medium tracking-[-1px]">
                {formatCurrency(totalBalance)}
              </span>
              <div className="flex h-[21px] items-center gap-1 py-[7px]">
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 0L7.4641 6H0.535898L4 0Z"
                    fill={
                      isPositive ? "var(--light-green)" : "var(--neon-pink)"
                    }
                    transform={isPositive ? "" : "rotate(180 4 4)"}
                  />
                </svg>
                <span
                  className={`text-[12px] leading-[12px] font-medium tracking-[-0.1px] ${
                    isPositive ? "text-light-green" : "text-neon-pink"
                  }`}
                >
                  {totalBalanceChange}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards Section */}
        <div className="flex flex-col items-start gap-1 self-stretch overflow-hidden">
          {/* First Group - Realized and Unrealized PnL */}
          <div className="flex flex-col items-start gap-1 self-stretch">
            <StatCard
              label="Realized PnL (7D)"
              value={formatPnL(realizedPnL)}
              change={realizedPnLChange}
            />
            <StatCard
              label="Unrealized PnL"
              value={formatPnL(unrealizedPnL)}
              change={unrealizedPnLChange}
            />
          </div>

          {/* Second Group - Margin and Trades */}
          <div className="flex flex-col items-start justify-center gap-1 self-stretch">
            <StatCard
              label="Total Margin Used"
              value={formatCurrency(totalMarginUsed)}
              change={totalMarginUsedChange}
            />
            <StatCard
              label="Open Trades"
              value={openTrades.toString()}
              change={openTradesChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
