"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import TradeDialog from "./trade_dialog";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { closeTradeDialog } from "@/lib/store/slices/tradeDialogSlice";
import { showOrderSuccessDialog, showOrderFailedDialog } from "@/lib/store/slices/orderDialogSlice";
import { addPosition, type ActivePosition } from "@/lib/store/slices/activePositionsSlice";
import { deductBalance } from "@/lib/store/slices/profileSlice";
import { getAthleteById, getTeamById } from "@/lib/data/athletes-bank";

export default function GlobalTradeDialog() {
  const { isOpen, tradeType, mode, id, teamPrice, teamChange } =
    useAppSelector((state) => state.tradeDialog);
  const profile = useAppSelector((state) => state.profile);
  const activePositions = useAppSelector((state) => state.activePositions.positions);
  const dispatch = useAppDispatch();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      dispatch(closeTradeDialog());
    }
  };

  const handleOrderConfirm = (orderData: {
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
  }) => {
    // Check wallet connection
    if (!profile.isConnected) {
      dispatch(closeTradeDialog());
      dispatch(
        showOrderFailedDialog({
          orderType: orderData.orderType,
          failedOrderDetails: {
            athleteName: orderData.athleteName,
            errorMessage: "Your wallet is not connected. Please connect your wallet to place a trade.",
            errorReason: "wallet_not_connected",
            onRetry: () => {
              // Open wallet connect dialog
            },
          },
        }),
      );
      return;
    }

    // Get athlete or team data
    const athlete = mode === "athlete" && id ? getAthleteById(id) : null;
    const team = mode === "team" && id ? getTeamById(id) : null;

    // Calculate margin required (order size / leverage)
    const orderSize = orderData.tradeSize || orderData.orderSize || 0;
    const marginRequired = orderSize / orderData.leverage;

    // Check for duplicate trade
    const positionType = tradeType === "long" ? "Long" : "Short";
    const targetId = mode === "athlete" ? athlete?.id : team?.id;

    const duplicatePosition = activePositions.find(
      (pos) =>
        ((mode === "athlete" && pos.athleteId === targetId) ||
          (mode === "team" && pos.teamId === targetId)) &&
        pos.positionType === positionType &&
        pos.leverage === orderData.leverage,
    );

    if (duplicatePosition) {
      dispatch(closeTradeDialog());
      dispatch(
        showOrderFailedDialog({
          orderType: orderData.orderType,
          failedOrderDetails: {
            athleteName: orderData.athleteName,
            errorMessage: `You already have an open ${positionType} position for ${orderData.athleteName} with ${orderData.leverage}x leverage. Please close the existing position before opening a new one.`,
            errorReason: "duplicate_trade",
            onRetry: () => {
              // Close existing position first
            },
          },
        }),
      );
      return;
    }

    // Check if user has enough balance
    if (profile.balance < marginRequired) {
      dispatch(closeTradeDialog());
      dispatch(
        showOrderFailedDialog({
          orderType: orderData.orderType,
          failedOrderDetails: {
            athleteName: orderData.athleteName,
            errorMessage: `You don't have enough available balance. Required: $${marginRequired.toFixed(2)}, Available: $${profile.balance.toFixed(2)}`,
            errorReason: "insufficient_margin",
            onRetry: () => {
              // Retry order logic
            },
            onDeposit: () => {
              // Deposit funds logic
            },
          },
        }),
      );
      return;
    }

    // Deduct balance from wallet
    dispatch(deductBalance(marginRequired));

    // Create position data
    const positionId = `${mode}-${id}-${Date.now()}`;
    const athleteName = athlete?.name || team?.name || orderData.athleteName;
    const athleteImage = athlete?.image || team?.logoUrl || "";
    const teamName = athlete ? getTeamById(athlete.teamId)?.name : (team?.name || "");
    const teamId = athlete?.teamId || team?.id || "";
    const indexPercent = athlete?.percentage || 0;

    // Create ActivePosition
    const newPosition: ActivePosition = {
      id: positionId,
      type: mode as "athlete" | "team", // "athlete" or "team"
      athleteId: athlete?.id,
      athleteName,
      athleteImage,
      team: teamName,
      teamId,
      indexPercent,
      positionType,
      leverage: orderData.leverage,
      status: "Healthy",
      statusColor: "green",
      pnlAmount: 0, // Initially 0, will update with real-time data
      pnlPercent: 0,
      fundingRate: parseFloat(orderData.fundingRate?.replace("%", "").trim() || "0"),
      size: orderSize,
      liquidationPrice: orderData.liquidationPrice,
      collateral: marginRequired,
      entryPrice: orderData.entryPrice,
      markPrice: orderData.entryPrice, // Initially same as entry, will update
      currentPrice: orderData.entryPrice,
    };

    // Add position to Redux
    dispatch(addPosition(newPosition));

    // Close the trade dialog first
    dispatch(closeTradeDialog());

    // Show the order success dialog using Redux
    dispatch(
      showOrderSuccessDialog({
        orderType: orderData.orderType,
        orderDetails: {
          receiptId: orderData.receiptId,
          athleteName: orderData.athleteName,
          position: orderData.position,
          entryPrice: orderData.entryPrice,
          tradeSize: orderData.tradeSize,
          orderSize: orderData.orderSize,
          limitPrice: orderData.limitPrice,
          liquidationPrice: orderData.liquidationPrice,
          fundingRate: orderData.fundingRate,
          estimatedPnL: orderData.estimatedPnL,
          estimatedFees: orderData.estimatedFees,
          leverage: orderData.leverage,
        },
      }),
    );
  };

  return (
    <>
      {tradeType && mode && id && (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogContent
            showCloseButton={false}
            className="mx-auto border-0 bg-transparent p-0 shadow-none"
          >
            <TradeDialog
              type={tradeType}
              mode={mode}
              id={id}
              teamPrice={teamPrice}
              teamChange={teamChange}
              onOrderConfirm={handleOrderConfirm}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
