"use client";

interface PortfolioHeaderProps {
  onSettings?: () => void;
  onExportTrades?: () => void;
  onDepositWithdraw?: () => void;
}

export default function PortfolioHeader({
  onSettings,
  onExportTrades,
  onDepositWithdraw,
}: PortfolioHeaderProps) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 self-stretch sm:flex-row">
      {/* Title */}
      <h1 className="text-xl leading-[24px] font-medium tracking-[-0.6px] text-[#101012] md:text-[24px]">
        Portfolio
      </h1>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-start gap-1.5">
        {/* Settings Button */}
        <button
          onClick={onSettings}
          className="bg-elevation-button flex h-7 items-center justify-center gap-2 rounded-lg py-0 pr-2.5 pl-2"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="aspect-square"
          >
            <path
              d="M9.9375 3.13528C10.1093 3.23301 10.252 3.37477 10.3509 3.54596C10.4498 3.71715 10.5012 3.9116 10.5 4.10928V7.75128C10.5 8.15578 10.2785 8.52878 9.921 8.72528L6.546 10.8603C6.37868 10.9521 6.19088 11.0003 6 11.0003C5.80912 11.0003 5.62132 10.9521 5.454 10.8603L2.079 8.72528C1.90408 8.6297 1.75806 8.48887 1.65621 8.31752C1.55435 8.14618 1.5004 7.95061 1.5 7.75128V4.10878C1.5 3.70428 1.7215 3.33178 2.079 3.13528L5.454 1.14528C5.62627 1.0503 5.81978 1.00049 6.0165 1.00049C6.21322 1.00049 6.40673 1.0503 6.579 1.14528L9.954 3.13528H9.9375Z"
              stroke="#7E7E8C"
              strokeWidth="1.28571"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.5 6.00024C4.5 6.39807 4.65804 6.7796 4.93934 7.06091C5.22064 7.34221 5.60218 7.50024 6 7.50024C6.39783 7.50024 6.77936 7.34221 7.06066 7.06091C7.34197 6.7796 7.5 6.39807 7.5 6.00024C7.5 5.60242 7.34197 5.22089 7.06066 4.93958C6.77936 4.65828 6.39783 4.50024 6 4.50024C5.60218 4.50024 5.22064 4.65828 4.93934 4.93958C4.65804 5.22089 4.5 5.60242 4.5 6.00024Z"
              stroke="#7E7E8C"
              strokeWidth="1.28571"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-text-primary text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
            Settings
          </span>
        </button>

        {/* Export Trades Button */}
        <button
          onClick={onExportTrades}
          className="bg-elevation-button flex h-7 items-center justify-center gap-2 rounded-lg py-0 pr-2.5 pl-2"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="aspect-square"
          >
            <path
              d="M7 1.5V3.5C7 3.63261 7.05268 3.75979 7.14645 3.85355C7.24022 3.94732 7.36739 4 7.5 4H9.5M7 1.5H3.5C3.23478 1.5 2.98043 1.60536 2.79289 1.79289C2.60536 1.98043 2.5 2.23478 2.5 2.5V9.5C2.5 9.76522 2.60536 10.0196 2.79289 10.2071C2.98043 10.3946 3.23478 10.5 3.5 10.5H5.75M7 1.5L9.5 4M9.5 4V6.5M7 9.5H10.5M10.5 9.5L9 8M10.5 9.5L9 11"
              stroke="#7E7E8C"
              strokeWidth="1.28571"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-text-primary text-[12px] leading-[12px] font-medium tracking-[-0.1px]">
            Export Trades (CSV)
          </span>
        </button>

        {/* Deposit / Withdraw Button */}
        <button
          onClick={onDepositWithdraw}
          className="flex h-7 items-center justify-center gap-2 rounded-lg bg-[#101012] py-0 pr-2.5 pl-2"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="aspect-square"
          >
            <path
              d="M6 2.5V9.5M2.5 6H9.5"
              stroke="#AAAABD"
              strokeWidth="1.28571"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[12px] leading-[12px] font-medium tracking-[-0.1px] text-white">
            Deposit / Withdraw
          </span>
        </button>
      </div>
    </div>
  );
}
