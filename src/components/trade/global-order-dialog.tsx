"use client";

import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { closeOrderDialog } from "@/lib/store/slices/orderDialogSlice";
import MarketOrderSuccessDialog from "@/components/athlete-page/market-order-success-dialog";
import LimitOrderSuccessDialog from "@/components/athlete-page/limit-order-success-dialog";
import MarketOrderFailedDialog from "@/components/athlete-page/market-order-failed-dialog";
import LimitOrderFailedDialog from "@/components/athlete-page/limit-order-failed-dialog";

export default function GlobalOrderDialog() {
  const { isOpen, orderType, status, orderDetails, failedOrderDetails } =
    useAppSelector((state) => state.orderDialog);
  const dispatch = useAppDispatch();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      dispatch(closeOrderDialog());
    }
  };

  if (!isOpen || !orderType || !status) {
    return null;
  }

  // Success dialogs
  if (status === "success" && orderDetails) {
    if (orderType === "market") {
      return (
        <MarketOrderSuccessDialog
          open={isOpen}
          onOpenChange={handleOpenChange}
          orderDetails={{
            receiptId: orderDetails.receiptId,
            athleteName: orderDetails.athleteName,
            position: orderDetails.position,
            entryPrice: orderDetails.entryPrice,
            tradeSize: orderDetails.tradeSize || 0,
            liquidationPrice: orderDetails.liquidationPrice,
            fundingRate: orderDetails.fundingRate || "0.018%",
            estimatedPnL: orderDetails.estimatedPnL || "+$0.00 (+0.0%)",
            leverage: orderDetails.leverage,
          }}
        />
      );
    } else {
      return (
        <LimitOrderSuccessDialog
          open={isOpen}
          onOpenChange={handleOpenChange}
          orderDetails={{
            receiptId: orderDetails.receiptId,
            athleteName: orderDetails.athleteName,
            position: orderDetails.position,
            entryPrice: orderDetails.entryPrice,
            orderSize: orderDetails.orderSize || 0,
            limitPrice: orderDetails.limitPrice || orderDetails.entryPrice,
            estimatedFees: orderDetails.estimatedFees || 0,
            liquidationPrice: orderDetails.liquidationPrice,
            leverage: orderDetails.leverage,
          }}
        />
      );
    }
  }

  // Failed dialogs
  if (status === "failed" && failedOrderDetails) {
    if (orderType === "market") {
      return (
        <MarketOrderFailedDialog
          open={isOpen}
          onOpenChange={handleOpenChange}
          errorMessage={failedOrderDetails.errorMessage}
          errorReason={failedOrderDetails.errorReason}
          onRetry={failedOrderDetails.onRetry}
          onDeposit={failedOrderDetails.onDeposit}
        />
      );
    } else {
      return (
        <LimitOrderFailedDialog
          open={isOpen}
          onOpenChange={handleOpenChange}
          athleteName={failedOrderDetails.athleteName || "Unknown"}
          errorMessage={failedOrderDetails.errorMessage}
          errorReason={failedOrderDetails.errorReason}
          onRetry={failedOrderDetails.onRetry}
          onDeposit={failedOrderDetails.onDeposit}
        />
      );
    }
  }

  return null;
}

