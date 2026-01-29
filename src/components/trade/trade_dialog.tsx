import { X } from "lucide-react";
import React, { useState, useEffect, useMemo } from "react";
import { DialogClose } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import Image from "next/image";
import {
  getTeamById,
  getAthleteById,
  type ExtendedAthleteData,
  type Team,
} from "@/lib/data/athletes-bank";
import { parsePrice } from "@/lib/formatter";
interface TradeDialogProps {
  type: string;
  mode: "athlete" | "team";
  id: string;
  teamPrice?: string;
  teamChange?: number;
  onOrderConfirm?: (orderData: {
    orderType: "market" | "limit";
    receiptId: string;
    athleteName: string;
    position: string;
    entryPrice: number;
    tradeSize?: number;
    orderSize?: number;
    limitPrice?: number;
    liquidationPrice: number;
    fundingRate?: string;
    estimatedPnL?: string;
    estimatedFees?: number;
    leverage: number;
  }) => void;
}

const TradeDialog = ({
  type,
  mode,
  id,
  teamPrice,
  teamChange,
  onOrderConfirm,
}: TradeDialogProps) => {
  // Fetch athlete or team data based on mode and id
  const athlete = useMemo<ExtendedAthleteData | null>(() => {
    if (mode === "athlete") {
      return getAthleteById(id) || null;
    }
    return null;
  }, [mode, id]);

  const team = useMemo<Team | null>(() => {
    if (mode === "team") {
      return getTeamById(id) || null;
    }
    return null;
  }, [mode, id]);

  const defaultPrice = 102.3;
  const initialPrice = athlete?.price
    ? parsePrice(athlete.price)
    : teamPrice
      ? parsePrice(teamPrice)
      : defaultPrice;

  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [orderSize, setOrderSize] = useState<string>("50.00");
  const [limitPrice, setLimitPrice] = useState<string>(initialPrice.toFixed(2));
  const [leverage, setLeverage] = useState<number>(6);
  const [entryPrice, setEntryPrice] = useState<number>(initialPrice);
  const [estimatedFees, setEstimatedFees] = useState<number>(0);
  const [liquidationPrice, setLiquidationPrice] = useState<number>(0);
  const [orderSizeNum, setOrderSizeNum] = useState<number>(50);
  const [marginRequired, setMarginRequired] = useState<number>(0);

  // Update entry price when athlete or team changes
  useEffect(() => {
    if (athlete?.price) {
      const newPrice = parsePrice(athlete.price);
      setEntryPrice(newPrice);
      // Update limit price if it's still at default or empty
      if (limitPrice === "50.00" || parseFloat(limitPrice) === 0 || limitPrice === initialPrice.toFixed(2)) {
        setLimitPrice(newPrice.toFixed(2));
      }
    } else if (teamPrice) {
      const newPrice = parsePrice(teamPrice);
      setEntryPrice(newPrice);
      // Update limit price if it's still at default or empty
      if (limitPrice === "50.00" || parseFloat(limitPrice) === 0 || limitPrice === initialPrice.toFixed(2)) {
        setLimitPrice(newPrice.toFixed(2));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [athlete?.price, teamPrice]);

  // Calculate derived values when inputs change
  useEffect(() => {
    const size = parseFloat(orderSize) || 0;
    setOrderSizeNum(size);

    // Calculate margin required (order value / leverage)
    const margin = size / leverage;
    setMarginRequired(margin);

    // Calculate estimated fees (typically 0.1% of order size)
    const fees = size * 0.001;
    setEstimatedFees(fees);

    // Calculate liquidation price based on leverage and entry price
    // For limit orders, use limit price; for market orders, use entry price
    const priceForLiquidation = orderType === "limit" ? (parseFloat(limitPrice) || entryPrice) : entryPrice;

    // For long: liquidation = entryPrice * (1 - 1/leverage)
    // For short: liquidation = entryPrice * (1 + 1/leverage)
    if (type === "long") {
      const liqPrice = priceForLiquidation * (1 - 1 / leverage);
      setLiquidationPrice(liqPrice);
    } else {
      const liqPrice = priceForLiquidation * (1 + 1 / leverage);
      setLiquidationPrice(liqPrice);
    }
  }, [orderSize, leverage, entryPrice, type, orderType, limitPrice]);

  const handleOrderSizeChange = (value: string) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setOrderSize(value);
    }
  };

  const handleLimitPriceChange = (value: string) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setLimitPrice(value);
      // Update entry price when limit price changes
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue > 0) {
        setEntryPrice(numValue);
      }
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

  const calculateEstimatedPnL = (): string => {
    // Calculate a sample PnL (e.g., 5% gain)
    const pnlAmount = orderSizeNum * 0.05;
    const pnlPercent = 5.0;
    const sign = pnlAmount >= 0 ? "+" : "";
    return `${sign}$${pnlAmount.toFixed(2)} (${sign}${pnlPercent.toFixed(1)}%)`;
  };

  const handleConfirmOrder = () => {
    // Generate receipt ID for this order
    const receiptId = generateReceiptId();

    // Prepare order data
    const athleteName = athlete?.name || team?.name || "Unknown";
    const position = `${type === "long" ? "Long" : "Short"} ${leverage}x`;

    const orderData = {
      orderType,
      receiptId,
      athleteName,
      position,
      entryPrice,
      liquidationPrice,
      leverage,
      ...(orderType === "market"
        ? {
          tradeSize: orderSizeNum,
          fundingRate: "0.018%",
          estimatedPnL: calculateEstimatedPnL(),
        }
        : {
          orderSize: orderSizeNum,
          limitPrice: parseFloat(limitPrice) || entryPrice,
          estimatedFees,
        }),
    };

    // Call the callback to handle order confirmation
    if (onOrderConfirm) {
      onOrderConfirm(orderData);
    }
  };

  return (
    <div className="bg-elevation-container flex w-full max-w-[342px] flex-col gap-7 rounded-[20px] p-4 pt-6 shadow-[0_14px_34px_-10px_rgba(11,11,13,0.05)]">
      {/* Header */}
      <div className="relative">
        <h2 className="text-text-primary text-base leading-[19px] font-semibold tracking-[-0.2px]">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </h2>
        <DialogClose asChild>
          <button className="hover:text-text-secondary absolute top-0 right-0 cursor-pointer p-0 text-[#AAAABD]">
            <X className="h-5 w-5" />
          </button>
        </DialogClose>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-5">
        {/* Market/Limit Tabs */}
        <div className="flex items-start gap-1">
          <button
            onClick={() => setOrderType("market")}
            className={`flex items-center gap-1 rounded-lg px-2 py-2 ${orderType === "market" ? "bg-bg-tertiary" : "bg-transparent"
              }`}
          >
            <span
              className={`text-xs leading-3 font-medium tracking-[-0.1px] ${orderType === "market"
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
              // Set limit price to current entry price when switching to limit order
              if (limitPrice === "50.00" || parseFloat(limitPrice) === 0) {
                setLimitPrice(entryPrice.toFixed(2));
              }
            }}
            className={`flex items-center gap-1 rounded-lg px-2 py-2 ${orderType === "limit" ? "bg-bg-tertiary" : "bg-transparent"
              }`}
          >
            <span
              className={`text-xs leading-3 font-medium tracking-[-0.1px] ${orderType === "limit"
                ? "text-text-primary"
                : "text-text-secondary"
                }`}
            >
              Limit
            </span>
          </button>
        </div>

        {/* Player/Team Info and Order Size */}
        <div className="flex flex-col gap-4">
          {/* Player/Team Info */}
          {athlete && (
            <div className="flex items-center gap-2">
              <div className="bg-bg-primary relative h-8 w-8 overflow-hidden rounded-full">
                <Image
                  src={athlete.image || "/icons/athletes/logo.png"}
                  alt={athlete.name}
                  width={32}
                  height={32}
                  className="object-cover object-top"
                />
              </div>
              <div className="flex flex-col justify-center gap-1">
                <p className="text-text-primary text-[13px] leading-[13px] font-semibold tracking-[-0.1px]">
                  {athlete.name}
                </p>
                <p className="text-text-secondary text-xs leading-3 font-medium tracking-[-0.1px]">
                  {getTeamById(athlete.teamId)?.name || ""}
                </p>
              </div>
            </div>
          )}
          {team && (
            <div className="flex items-center gap-2">
              <div className="bg-bg-primary relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full">
                <Image
                  src={team.logoUrl || "/icons/leagues/nba-new.png"}
                  alt={team.name}
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center gap-1">
                <p className="text-text-primary text-[13px] leading-[13px] font-semibold tracking-[-0.1px]">
                  {team.name}
                </p>
                <p className="text-text-secondary text-xs leading-3 font-medium tracking-[-0.1px]">
                  {team.league}
                </p>
              </div>
            </div>
          )}

          {/* Order Size Input */}
          <div className="flex flex-col gap-2">
            <div className="bg-elevation-card-raise flex items-center gap-1 self-stretch rounded-[12px] px-3 py-3">
              <span className="text-xl leading-[22px] font-medium tracking-[-0.4px] text-[#AAAABD]">
                $
              </span>
              <input
                type="text"
                value={orderSize}
                onChange={(e) => handleOrderSizeChange(e.target.value)}
                className="text-text-primary w-full bg-transparent text-xl leading-[22px] font-medium tracking-[-0.4px] outline-none"
                placeholder="0"
                style={{ width: `${Math.max(orderSize.length, 2)}ch` }}
              />
            </div>
          </div>

          {/* Limit Price Input (only shown for limit orders) */}
          {orderType === "limit" && (
            <div className="flex flex-col gap-2">
              <span className="text-text-primary text-[13px] leading-[13px] font-medium tracking-[-0.1px]">
                Limit Price
              </span>
              <div className="bg-elevation-card-raise flex items-center gap-1 self-stretch rounded-[12px] px-3 py-3">
                <span className="text-xl leading-[22px] font-medium tracking-[-0.4px] text-[#AAAABD]">
                  $
                </span>
                <input
                  type="text"
                  value={limitPrice}
                  onChange={(e) => handleLimitPriceChange(e.target.value)}
                  className="text-text-primary w-full bg-transparent text-xl leading-[22px] font-medium tracking-[-0.4px] outline-none"
                  placeholder={"0"}
                />
              </div>
            </div>
          )}
        </div>

        {/* Leverage */}
        <div className="flex flex-col gap-3.5">
          <span className="text-text-primary text-[13px] leading-[13px] font-medium tracking-[-0.1px]">
            Leverage
          </span>
          <div className="flex items-center gap-4">
            <div className="flex min-w-0 flex-1 flex-col gap-3.5">
              <Slider
                value={[leverage]}
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
            <div className="bg-elevation-container flex h-10 w-[30px] shrink-0 items-center justify-center gap-1 rounded-lg px-4 py-[13px] sm:w-[50px]">
              <span className="text-text-primary flex-1 text-[13px] leading-[13px] font-semibold tracking-[-0.1px]">
                {leverage}x
              </span>
            </div>
          </div>
        </div>

        {/* Summary Details */}
        <div className="flex flex-col">
          <div className="summary-row">
            <span className="summary-label">Side</span>
            <span
              className={`text-[13px] leading-[13px] font-medium tracking-[-0.1px] ${type === "long" ? "text-success" : "text-[#E13F5E]"
                }`}
            >
              {type === "long" ? "Long" : "Short"}
            </span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Order Value</span>
            <span className="summary-value">${orderSizeNum.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Margin Required</span>
            <span className="summary-value">${marginRequired.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Leverage</span>
            <span className="summary-value">{leverage}x</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Est. Fees</span>
            <span className="summary-value">${estimatedFees.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Liq Price</span>
            <span className="summary-value">
              ${liquidationPrice.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="flex flex-col gap-4 pb-1.5">
          <button
            onClick={handleConfirmOrder}
            disabled={orderSizeNum <= 0}
            className="flex items-center cursor-pointer justify-center gap-2.5 self-stretch rounded-lg bg-[#101012] px-5 py-4 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="text-xs leading-3 font-semibold tracking-[-0.1px] text-white">
              Confirm {orderType === "market" ? "Market" : "Limit"} Order
            </span>
          </button>
          <p className="self-stretch text-center text-[11px] leading-[13px] font-normal tracking-[-0.1px] text-[#AAAABD]">
            Order will execute immediately at the best avail price.
          </p>
        </div>
      </div>

      <style jsx>{`
        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 6px 0;
          border-radius: 4px;
        }
        .summary-label {
          color: #aaaabd;
          font-size: 13px;
          font-weight: 400;
          line-height: 15px;
          letter-spacing: -0.1px;
        }
        .summary-value {
          color: #101012;
          font-size: 13px;
          font-weight: 500;
          line-height: 13px;
          letter-spacing: -0.1px;
        }
      `}</style>
    </div>
  );
};

export default TradeDialog;
