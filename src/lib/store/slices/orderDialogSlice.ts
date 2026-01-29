import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type OrderType = "market" | "limit";
export type OrderStatus = "success" | "failed";

interface OrderDetails {
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
}

interface FailedOrderDetails {
  athleteName?: string;
  errorMessage?: string;
  errorReason?: "wallet_not_connected" | "duplicate_trade" | "insufficient_margin" | "network_error";
  onRetry?: () => void;
  onDeposit?: () => void;
}

interface OrderDialogState {
  isOpen: boolean;
  orderType: OrderType | null;
  status: OrderStatus | null;
  orderDetails: OrderDetails | null;
  failedOrderDetails: FailedOrderDetails | null;
}

const initialState: OrderDialogState = {
  isOpen: false,
  orderType: null,
  status: null,
  orderDetails: null,
  failedOrderDetails: null,
};

const orderDialogSlice = createSlice({
  name: "orderDialog",
  initialState,
  reducers: {
    showOrderSuccessDialog: (
      state,
      action: PayloadAction<{
        orderType: OrderType;
        orderDetails: OrderDetails;
      }>,
    ) => {
      state.isOpen = true;
      state.orderType = action.payload.orderType;
      state.status = "success";
      state.orderDetails = action.payload.orderDetails;
      state.failedOrderDetails = null;
    },
    showOrderFailedDialog: (
      state,
      action: PayloadAction<{
        orderType: OrderType;
        failedOrderDetails: FailedOrderDetails;
      }>,
    ) => {
      state.isOpen = true;
      state.orderType = action.payload.orderType;
      state.status = "failed";
      state.failedOrderDetails = action.payload.failedOrderDetails;
      state.orderDetails = null;
    },
    closeOrderDialog: (state) => {
      state.isOpen = false;
      state.orderType = null;
      state.status = null;
      state.orderDetails = null;
      state.failedOrderDetails = null;
    },
  },
});

export const {
  showOrderSuccessDialog,
  showOrderFailedDialog,
  closeOrderDialog,
} = orderDialogSlice.actions;
export default orderDialogSlice.reducer;

