"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface MarketOrderFailedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  errorMessage?: string;
  errorReason?: "wallet_not_connected" | "duplicate_trade" | "insufficient_margin" | "network_error";
  onRetry?: () => void;
  onDeposit?: () => void;
}

export default function MarketOrderFailedDialog({
  open,
  onOpenChange,
  errorMessage,
  errorReason,
  onRetry,
  onDeposit,
}: MarketOrderFailedDialogProps) {
  const handleRetry = () => {
    onRetry?.();
    onOpenChange(false);
  };

  const handleDeposit = () => {
    onDeposit?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex max-w-[420px] flex-col items-center justify-center gap-[40px] rounded-[20px] bg-white p-5 pb-[20px] pt-[32px] dark:bg-bg-secondary sm:max-w-[420px]"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Market Order Failed</DialogTitle>

        {/* Error Icon and Message */}
        <div className="flex flex-col items-center gap-[28px]">
          {/* Error Icon */}
          <div className="flex w-[60px] items-center justify-center gap-2.5 rounded-full bg-red-500/10 p-2.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E13F5E]">
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 4.5L4.5 12.5M4.5 4.5L12.5 12.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Title and Description */}
          <div className="flex flex-col items-center gap-[16px] self-stretch">
            <h2 className="text-text-primary text-2xl leading-6 font-medium tracking-[-0.6px]">
              Market Order Failed
            </h2>
            <p className="text-text-secondary w-full max-w-[328px] text-center text-sm leading-[1.4] font-normal tracking-[-0.2px]">
              {errorMessage || "We couldn't process your market order due to a temporary network issue. Please try again."}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex w-full items-start gap-2 self-stretch">
          {errorReason !== "duplicate_trade" && (
            <Button
              variant="outline"
              className="flex flex-1 items-center justify-center gap-2.5 rounded-lg border border-stroke-primary bg-white px-5 py-4 text-text-primary dark:border-[#2C2C33] dark:bg-elevation-card dark:text-white"
              onClick={errorReason === "wallet_not_connected" ? handleRetry : handleDeposit}
            >
              <span className="text-xs leading-3 font-semibold tracking-[-0.1px]">
                {errorReason === "wallet_not_connected" ? "Connect Wallet" : "Deposit Funds"}
              </span>
            </Button>
          )}
          {errorReason !== "wallet_not_connected" && (
            <Button
              className="flex flex-1 items-center justify-center gap-2.5 rounded-lg bg-bg-inverse-primary px-5 py-4 text-text-inverse-primary dark:bg-white dark:text-[#101012]"
              onClick={handleRetry}
            >
              <span className="text-xs leading-3 font-semibold tracking-[-0.1px]">
                {errorReason === "duplicate_trade" ? "Close Existing Position" : "Retry Order"}
              </span>
            </Button>
          )}
          {errorReason === "wallet_not_connected" && (
            <Button
              className="flex flex-1 items-center justify-center gap-2.5 rounded-lg bg-bg-inverse-primary px-5 py-4 text-text-inverse-primary dark:bg-white dark:text-[#101012]"
              onClick={() => onOpenChange(false)}
            >
              <span className="text-xs leading-3 font-semibold tracking-[-0.1px]">
                Close
              </span>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
