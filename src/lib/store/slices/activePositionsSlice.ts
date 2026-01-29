import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Unified Position interface that works for both components
export interface ActivePosition {
  id: string;
  type: "athlete" | "team"; // Distinguish between athlete and team positions
  athleteId?: string; // For linking to athlete data
  athleteName: string; // For athletes: athlete name, for teams: team name
  athleteImage: string; // For athletes: athlete image, for teams: team logo
  team?: string; // Team name (for athlete positions)
  teamId?: string; // Team ID (for athlete positions) or team ID (for team positions)
  indexPercent?: number;
  positionType: string; // "Long" or "Short"
  leverage: number;
  status: string;
  statusColor: "green" | "red" | "yellow";
  pnlAmount: number;
  pnlPercent: number;
  fundingRate: number;
  size: number;
  liquidationPrice: number;
  collateral: number;
  entryPrice: number;
  markPrice: number;
  currentPrice?: number; // Alias for markPrice for compatibility
  isHighlighted?: boolean;
}

interface ActivePositionsState {
  positions: ActivePosition[];
}

const initialState: ActivePositionsState = {
  positions: [],
};

const activePositionsSlice = createSlice({
  name: "activePositions",
  initialState,
  reducers: {
    addPosition: (state, action: PayloadAction<ActivePosition>) => {
      // Check if position already exists (by id)
      const exists = state.positions.some((p) => p.id === action.payload.id);
      if (!exists) {
        state.positions.push(action.payload);
      }
    },
    removePosition: (state, action: PayloadAction<string>) => {
      state.positions = state.positions.filter((p) => p.id !== action.payload);
    },
    updatePosition: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<ActivePosition> }>,
    ) => {
      const index = state.positions.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.positions[index] = {
          ...state.positions[index],
          ...action.payload.updates,
        };
      }
    },
    setPositions: (state, action: PayloadAction<ActivePosition[]>) => {
      state.positions = action.payload;
    },
    clearPositions: (state) => {
      state.positions = [];
    },
  },
});

export const {
  addPosition,
  removePosition,
  updatePosition,
  setPositions,
  clearPositions,
} = activePositionsSlice.actions;
export default activePositionsSlice.reducer;

