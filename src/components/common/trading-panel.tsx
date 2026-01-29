"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { useAppDispatch } from "@/lib/store/hooks";
import {
  showOrderSuccessDialog,
  showOrderFailedDialog,
} from "@/lib/store/slices/orderDialogSlice";

interface TradingPanelProps {
  athleteName: string;
  currentPrice: number;
  onPlaceOrder: (
    type: "long" | "short",
    orderSize: number,
    leverage: number,
  ) => void;
  // Test mode props (for testing different scenarios)
  simulateSuccess?: boolean; // If true, always show success
  simulateFailure?: boolean; // If true, always show failure
  simulateNetworkError?: boolean; // If true, show network error for market orders
  simulateInsufficientMargin?: boolean; // If true, show insufficient margin for limit orders
  availableMargin?: number; // Available margin for validation
}

export default function TradingPanel({
  athleteName,
  currentPrice,
  onPlaceOrder,
  simulateSuccess = false,
  simulateFailure = false,
  simulateNetworkError = false,
  simulateInsufficientMargin = false,
  availableMargin = 1000, // Default available margin
}: TradingPanelProps) {
  const [activeTab, setActiveTab] = useState<"long" | "short">("long");
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [orderSize, setOrderSize] = useState<string>("50.00");
  const [limitPrice, setLimitPrice] = useState<string>(currentPrice.toFixed(2));
  const [leverage, setLeverage] = useState<number>(6);

  const dispatch = useAppDispatch();

  const orderSizeNum = parseFloat(orderSize) || 0;
  const limitPriceNum = parseFloat(limitPrice) || currentPrice;
  const orderValue = orderSizeNum * leverage;
  const marginRequired = orderSizeNum;
  const estimatedFees = orderValue * 0.001; // 0.1% fee
  const liquidationPrice =
    activeTab === "long"
      ? (orderType === "limit" ? limitPriceNum : currentPrice) * (1 - 1 / leverage)
      : (orderType === "limit" ? limitPriceNum : currentPrice) * (1 + 1 / leverage);

  const handleOrderSizeChange = (value: string) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setOrderSize(value);
    }
  };

  const handleLimitPriceChange = (value: string) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setLimitPrice(value);
    }
  };

  const generateReceiptId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "#";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleConfirmOrder = () => {
    const receiptId = generateReceiptId();
    const position = `${activeTab === "long" ? "Long" : "Short"} ${leverage}x`;

    // Simulate order processing logic
    if (simulateSuccess) {
      // Force success scenario
      if (orderType === "market") {
        dispatch(
          showOrderSuccessDialog({
            orderType: "market",
            orderDetails: {
              receiptId,
              athleteName,
              position,
              entryPrice: currentPrice,
              tradeSize: orderSizeNum,
              liquidationPrice,
              fundingRate: "0.018%",
              estimatedPnL: "+$82.50 (+32.8%)",
              leverage,
            },
          }),
        );
      } else {
        dispatch(
          showOrderSuccessDialog({
            orderType: "limit",
            orderDetails: {
              receiptId,
              athleteName,
              position,
              entryPrice: currentPrice,
              orderSize: orderSizeNum,
              limitPrice: limitPriceNum,
              estimatedFees,
              liquidationPrice,
              leverage,
            },
          }),
        );
      }
      onPlaceOrder(activeTab, orderSizeNum, leverage);
      return;
    }

    if (simulateFailure) {
      // Force failure scenario
      if (orderType === "market") {
        dispatch(
          showOrderFailedDialog({
            orderType: "market",
            failedOrderDetails: {
              onRetry: () => {
                // Retry market order logic
              },
              onDeposit: () => {
                // Open deposit page logic
              },
            },
          }),
        );
      } else {
        dispatch(
          showOrderFailedDialog({
            orderType: "limit",
            failedOrderDetails: {
              athleteName,
              onRetry: () => {
                // Retry limit order logic
              },
              onDeposit: () => {
                // Open deposit page logic
              },
            },
          }),
        );
      }
      return;
    }

    // Normal flow - check conditions
    if (orderType === "market") {
      // Simulate network error randomly (10% chance) or if flag is set
      if (simulateNetworkError || Math.random() < 0.1) {
        dispatch(
          showOrderFailedDialog({
            orderType: "market",
            failedOrderDetails: {
              onRetry: () => {
                // Retry market order logic
              },
              onDeposit: () => {
                // Open deposit page logic
              },
            },
          }),
        );
      } else {
        // Market order success
        dispatch(
          showOrderSuccessDialog({
            orderType: "market",
            orderDetails: {
              receiptId,
              athleteName,
              position,
              entryPrice: currentPrice,
              tradeSize: orderSizeNum,
              liquidationPrice,
              fundingRate: "0.018%",
              estimatedPnL: "+$82.50 (+32.8%)",
              leverage,
            },
          }),
        );
        onPlaceOrder(activeTab, orderSizeNum, leverage);
      }
    } else {
      // Limit order - check margin
      if (simulateInsufficientMargin || marginRequired > availableMargin) {
        dispatch(
          showOrderFailedDialog({
            orderType: "limit",
            failedOrderDetails: {
              athleteName,
              onRetry: () => {
                // Retry limit order logic
              },
              onDeposit: () => {
                // Open deposit page logic
              },
            },
          }),
        );
      } else {
        // Limit order success
        dispatch(
          showOrderSuccessDialog({
            orderType: "limit",
            orderDetails: {
              receiptId,
              athleteName,
              position,
              entryPrice: currentPrice,
              orderSize: orderSizeNum,
              limitPrice: limitPriceNum,
              estimatedFees,
              liquidationPrice,
              leverage,
            },
          }),
        );
        onPlaceOrder(activeTab, orderSizeNum, leverage);
      }
    }
  };

  return (
    <div className="bg-elevation-card flex w-full flex-col gap-5 rounded-[20px] p-5 lg:max-w-[357px]">
      {/* Long/Short Tabs */}
      <div className="flex w-full items-start">
        <button
          onClick={() => setActiveTab("long")}
          className={`flex flex-1 cursor-pointer items-center justify-center gap-2.5 border-b-2 px-0 pt-1.5 pb-5 ${activeTab === "long" ? "border-border-secondary" : "border-border"
            }`}
        >
          <span
            className={`text-[13px] leading-[13px] font-medium tracking-[-0.1px] ${activeTab === "long" ? "text-text-primary" : "text-text-secondary"
              }`}
          >
            Long
          </span>
        </button>
        <button
          onClick={() => setActiveTab("short")}
          className={`flex flex-1 cursor-pointer items-center justify-center gap-2.5 border-b-2 px-0 pt-1.5 pb-5 ${activeTab === "short" ? "border-border-secondary" : "border-border"
            }`}
        >
          <span
            className={`text-[13px] leading-[13px] font-medium tracking-[-0.1px] ${activeTab === "short"
              ? "text-text-primary"
              : "text-text-secondary"
              }`}
          >
            Short
          </span>
        </button>
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col justify-between gap-8">
        {/* Top Section */}
        <div className="flex flex-col gap-6">
          {/* Market/Limit Selection */}
          <div className="flex items-start gap-1">
            <button
              onClick={() => setOrderType("market")}
              className={`flex items-center gap-1 rounded-lg px-2 py-2 ${orderType === "market" ? "bg-bg-tertiary" : "bg-transparent"
                }`}
            >
              <span
                className={`text-[12px] leading-[12px] font-medium tracking-[-0.1px] ${orderType === "market"
                  ? "text-text-primary"
                  : "text-text-secondary"
                  }`}
              >
                Market
              </span>
            </button>
            <button
              onClick={() => {
                setOrderType("limit");
                // Set limit price to current price when switching to limit order
                if (limitPrice === "50.00" || parseFloat(limitPrice) === 0) {
                  setLimitPrice(currentPrice.toFixed(2));
                }
              }}
              className={`flex items-center gap-1 rounded-lg px-2 py-2 ${orderType === "limit" ? "bg-bg-tertiary" : "bg-transparent"
                }`}
            >
              <span
                className={`text-[12px] leading-[12px] font-medium tracking-[-0.1px] ${orderType === "limit"
                  ? "text-text-primary"
                  : "text-text-secondary"
                  }`}
              >
                Limit
              </span>
            </button>
          </div>

          {/* Amount Input */}
          <div className="bg-elevation-button flex items-center gap-1 rounded-lg px-4 py-4">
            <span className="text-text-secondary text-[20px] leading-[22px] font-medium tracking-[-0.4px]">
              $
            </span>
            <input
              type="text"
              value={orderSize}
              onChange={(e) => handleOrderSizeChange(e.target.value)}
              className="text-text-primary bg-transparent text-[20px] leading-[22px] font-medium tracking-[-0.4px] outline-none"
              placeholder="0"
            />
          </div>

          {/* Limit Price Input (only shown for limit orders) */}
          {orderType === "limit" && (
            <div className="flex flex-col gap-2">
              <span className="text-text-primary text-[13px] leading-[13px] font-medium tracking-[-0.1px]">
                Limit Price
              </span>
              <div className="bg-elevation-button flex items-center gap-1 rounded-lg px-4 py-4">
                <span className="text-text-secondary text-[20px] leading-[22px] font-medium tracking-[-0.4px]">
                  $
                </span>
                <input
                  type="text"
                  value={limitPrice}
                  onChange={(e) => handleLimitPriceChange(e.target.value)}
                  className="text-text-primary bg-transparent text-[20px] leading-[22px] font-medium tracking-[-0.4px] outline-none"
                  placeholder={"0"}
                />
              </div>
            </div>
          )}

          {/* Leverage Section */}
          <div className="flex flex-col gap-3.5">
            <span className="text-text-primary text-[13px] leading-[13px] font-medium tracking-[-0.1px]">
              Leverage
            </span>
            <div className="flex items-center gap-4">
              <div className="flex flex-1 flex-col gap-3.5">
                <Slider
                  defaultValue={[6]}
                  min={1}
                  max={10}
                  step={1}
                  showLabels={true}
                  labels={[
                    "1x",
                    "2x",
                    "3x",
                    "4x",
                    "5x",
                    "6x",
                    "7x",
                    "8x",
                    "9x",
                    "10x",
                  ]}
                  onValueChange={(value) => setLeverage(value[0])}
                />
              </div>
              <div className="bg-elevation-card-raise flex h-10 w-[50px] items-center gap-1 rounded-lg px-4 py-3">
                <span className="text-text-primary flex-1 text-[13px] leading-[13px] font-semibold tracking-[-0.1px]">
                  {leverage}x
                </span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between rounded px-0 py-1.5">
              <span className="text-text-secondary text-[13px] leading-[15px] font-normal tracking-[-0.1px]">
                Side
              </span>
              <span
                className={`text-[13px] leading-[13px] font-medium tracking-[-0.1px] ${activeTab === "long" ? "text-light-green" : "text-[#E13F5E]"
                  }`}
              >
                {activeTab === "long" ? "Long" : "Short"}
              </span>
            </div>
            <div className="flex items-center justify-between rounded px-0 py-1.5">
              <span className="text-text-secondary text-[13px] leading-[15px] font-normal tracking-[-0.1px]">
                Order Value
              </span>
              <span className="text-text-primary text-[13px] leading-[13px] font-medium tracking-[-0.1px]">
                ${orderValue.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between rounded px-0 py-1.5">
              <span className="text-text-secondary text-[13px] leading-[15px] font-normal tracking-[-0.1px]">
                Margin Required
              </span>
              <span className="text-text-primary text-[13px] leading-[13px] font-medium tracking-[-0.1px]">
                ${marginRequired.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between rounded px-0 py-1.5">
              <span className="text-text-secondary text-[13px] leading-[15px] font-normal tracking-[-0.1px]">
                Leverage
              </span>
              <span className="text-text-primary text-[13px] leading-[13px] font-medium tracking-[-0.1px]">
                {leverage}x
              </span>
            </div>
            <div className="flex items-center justify-between rounded px-0 py-1.5">
              <span className="text-text-secondary text-[13px] leading-[15px] font-normal tracking-[-0.1px]">
                Est. Fees
              </span>
              <span className="text-text-primary text-[13px] leading-[13px] font-medium tracking-[-0.1px]">
                ${estimatedFees.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between rounded px-0 py-1.5">
              <span className="text-text-secondary text-[13px] leading-[15px] font-normal tracking-[-0.1px]">
                Liq Price
              </span>
              <span className="text-text-primary text-[13px] leading-[13px] font-medium tracking-[-0.1px]">
                ${liquidationPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-4 pb-1.5">
          <button
            onClick={handleConfirmOrder}
            disabled={orderSizeNum <= 0}
            className="bg-text-primary cursor-pointer flex items-center justify-center gap-2.5 rounded-lg px-5 py-4 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="text-bg-primary text-[12px] leading-[12px] font-semibold tracking-[-0.1px]">
              Confirm {orderType === "market" ? "Market" : "Limit"} Order
            </span>
          </button>
          <p className="text-text-secondary text-center text-[11px] leading-[13px] font-normal tracking-[-0.1px]">
            Order will execute immediately at the best avail price.
          </p>
        </div>
      </div>

    </div>
  );
}
