import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TradeType = "long" | "short";
export type TradeMode = "athlete" | "team";

interface TradeDialogState {
  isOpen: boolean;
  tradeType: TradeType | null;
  mode: TradeMode | null;
  id: string | null;
  teamPrice?: string;
  teamChange?: number;
}

const initialState: TradeDialogState = {
  isOpen: false,
  tradeType: null,
  mode: null,
  id: null,
  teamPrice: undefined,
  teamChange: undefined,
};

const tradeDialogSlice = createSlice({
  name: "tradeDialog",
  initialState,
  reducers: {
    openTradeDialog: (
      state,
      action: PayloadAction<{
        tradeType: TradeType;
        mode: TradeMode;
        id: string;
        teamPrice?: string;
        teamChange?: number;
      }>,
    ) => {
      state.isOpen = true;
      state.tradeType = action.payload.tradeType;
      state.mode = action.payload.mode;
      state.id = action.payload.id;
      state.teamPrice = action.payload.teamPrice;
      state.teamChange = action.payload.teamChange;
    },
    closeTradeDialog: (state) => {
      state.isOpen = false;
      state.tradeType = null;
      state.mode = null;
      state.id = null;
      state.teamPrice = undefined;
      state.teamChange = undefined;
    },
  },
});

export const { openTradeDialog, closeTradeDialog } = tradeDialogSlice.actions;
export default tradeDialogSlice.reducer;

