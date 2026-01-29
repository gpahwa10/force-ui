"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface LimitOrderSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderDetails: {
    receiptId: string;
    athleteName: string;
    position: string;
    entryPrice: number;
    orderSize: number;
    limitPrice: number;
    estimatedFees: number;
    liquidationPrice: number;
    leverage: number;
  };
}

export default function LimitOrderSuccessDialog({
  open,
  onOpenChange,
  orderDetails,
}: LimitOrderSuccessDialogProps) {
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex max-w-[420px] flex-col items-center justify-center gap-[32px] rounded-[20px] bg-white p-5 pb-[20px] pt-[32px] dark:bg-bg-secondary sm:max-w-[420px]"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Limit Order Successful</DialogTitle>

        {/* Success Icon and Message */}
        <div className="flex flex-col items-center gap-[28px]">
          {/* Success Icon */}
          <div className="flex w-[60px] items-center justify-center gap-2.5 rounded-full bg-green-500/10 p-2.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25AB7A]">
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.1615 4.25L6.36979 12.0417L2.82812 8.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="dark:stroke-[#101012]"
                />
              </svg>
            </div>
          </div>

          {/* Title and Description */}
          <div className="flex flex-col items-center gap-[16px] self-stretch">
            <h2 className="text-text-primary text-2xl leading-6 font-medium tracking-[-0.6px]">
              Limit Order Successful
            </h2>
            <p className="text-text-secondary w-full max-w-[328px] text-center text-sm leading-[1.4] font-normal tracking-[-0.2px]">
              Your limit order for{" "}
              <span className="text-text-primary font-medium">
                {orderDetails.athleteName} (NBA)
              </span>{" "}
              has been placed at{" "}
              <span className="text-text-primary font-medium">
                ${orderDetails.limitPrice.toFixed(2)}
              </span>{" "}
              with{" "}
              <span className="text-text-primary font-medium">
                {orderDetails.leverage}x leverage
              </span>
              .
            </p>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="flex w-full flex-col items-start gap-6">
          <div className="flex w-full flex-col items-center justify-center self-stretch overflow-hidden rounded-[14px] border border-stroke-primary bg-white dark:border-[#2C2C33] dark:bg-elevation-card">
            {/* First Section */}
            <div className="flex w-full flex-col items-start self-stretch overflow-hidden">
              <div className="flex w-full flex-col items-start gap-3 self-stretch p-[16px] ">
                <div className="flex w-full flex-col items-start self-stretch">
                  {/* Receipt ID */}
                  <div className="flex w-full items-center gap-2 self-stretch rounded px-0 py-[6px]">
                    <div className="text-text-tertiary flex-1 text-[13px] leading-[15px] font-normal tracking-[-0.1px]">
                      Receipt ID
                    </div>
                    <div className="text-text-primary flex-1 text-right text-[13px] leading-[13px] font-medium tracking-[-0.1px]">
                      {orderDetails.receiptId}
                    </div>
                  </div>

                  {/* Athlete / Team */}
                  <div className="flex w-full items-center gap-2 self-stretch rounded px-0 py-[6px]">
                    <div className="text-text-tertiary flex-1 text-[13px] leading-[15px] font-normal tracking-[-0.1px]">
                      Athlete / Team
                    </div>
                    <div className="text-text-primary flex-1 text-right text-[13px] leading-[13px] font-medium tracking-[-0.1px]">
                      {orderDetails.athleteName} (NBA)
                    </div>
                  </div>

                  {/* Position */}
                  <div className="flex w-full items-center gap-2 self-stretch rounded px-0 py-[6px]">
                    <div className="text-text-tertiary flex-1 text-[13px] leading-[15px] font-normal tracking-[-0.1px]">
                      Position
                    </div>
                    <div className="text-text-primary flex-1 text-right text-[13px] leading-[13px] font-medium tracking-[-0.1px]">
                      {orderDetails.position}
                    </div>
                  </div>

                  {/* Entry Price */}
                  <div className="flex w-full items-center gap-2 self-stretch rounded px-0 py-[6px]">
                    <div className="text-text-tertiary flex-1 text-[13px] leading-[15px] font-normal tracking-[-0.1px]">
                      Entry Price
                    </div>
                    <div className="text-text-primary flex-1 text-right text-[13px] leading-[13px] font-medium tracking-[-0.1px]">
                      ${orderDetails.entryPrice.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-black/5 w-[95%] mx-auto" />

            {/* Second Section */}
            <div className="flex w-full flex-col items-start self-stretch overflow-hidden">
              <div className="flex w-full flex-col items-start gap-3 self-stretch p-[16px]">
                <div className="flex w-full flex-col items-start self-stretch">
                  {/* Order Size */}
                  <div className="flex w-full items-center gap-2 self-stretch rounded px-0 py-[6px]">
                    <div className="text-text-tertiary flex-1 text-[13px] leading-[15px] font-normal tracking-[-0.1px]">
                      Order Size
                    </div>
                    <div className="text-text-primary flex-1 text-right text-[13px] leading-[13px] font-medium tracking-[-0.1px]">
                      ${orderDetails.orderSize.toFixed(2)}
                    </div>
                  </div>

                  {/* Limit Price */}
                  <div className="flex w-full items-center gap-2 self-stretch rounded px-0 py-[6px]">
                    <div className="text-text-tertiary flex-1 text-[13px] leading-[15px] font-normal tracking-[-0.1px]">
                      Limit Price
                    </div>
                    <div className="text-text-primary flex-1 text-right text-[13px] leading-[13px] font-medium tracking-[-0.1px]">
                      ${orderDetails.limitPrice.toFixed(2)}
                    </div>
                  </div>

                  {/* Est. Fees */}
                  <div className="flex w-full items-center gap-2 self-stretch rounded px-0 py-[6px]">
                    <div className="text-text-tertiary flex-1 text-[13px] leading-[15px] font-normal tracking-[-0.1px]">
                      Est. Fees
                    </div>
                    <div className="text-text-primary flex-1 text-right text-[13px] leading-[13px] font-medium tracking-[-0.1px]">
                      ${orderDetails.estimatedFees.toFixed(2)}
                    </div>
                  </div>

                  {/* Liq. Price */}
                  <div className="flex w-full items-center gap-2 self-stretch rounded px-0 py-[6px]">
                    <div className="text-text-tertiary flex-1 text-[13px] leading-[15px] font-normal tracking-[-0.1px]">
                      Liq. Price
                    </div>
                    <div className="text-text-primary flex-1 text-right text-[13px] leading-[13px] font-medium tracking-[-0.1px]">
                      ${orderDetails.liquidationPrice.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex w-full items-start gap-2 self-stretch">
            <Button
              variant="secondary"
              className="flex flex-1 items-center justify-center gap-2.5 rounded-lg bg-bg-tertiary px-5 py-4 text-text-primary dark:bg-bg-tertiary dark:text-white"
              onClick={() => {
                // Track performance action
                onOpenChange(false);
              }}
            >
              <span className="text-xs leading-3 font-semibold tracking-[-0.1px]">
                Track Performance
              </span>
            </Button>
            <Button
              className="flex flex-1 items-center justify-center gap-2.5 rounded-lg bg-bg-inverse-primary px-5 py-4 text-text-inverse-primary dark:bg-white dark:text-[#101012]"
              onClick={() => {
                onOpenChange(false);
                router.push("/portfolio");
              }}
            >
              <span className="text-xs leading-3 font-semibold tracking-[-0.1px]">
                View in Portfolio
              </span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
