import { configureStore } from "@reduxjs/toolkit";
import tradeDialogReducer from "./slices/tradeDialogSlice";
import profileReducer from "./slices/profileSlice";
import orderDialogReducer from "./slices/orderDialogSlice";
import activePositionsReducer from "./slices/activePositionsSlice";

export const store = configureStore({
  reducer: {
    tradeDialog: tradeDialogReducer,
    profile: profileReducer,
    orderDialog: orderDialogReducer,
    activePositions: activePositionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

