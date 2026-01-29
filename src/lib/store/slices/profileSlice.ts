import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProfileState {
  isConnected: boolean;
  balance: number;
  profileImage: string | null;
  profileName: string;
  walletId: string | null;
  walletAddress: string | null;
  walletType: string | null;
  change24h: number;
  change24hPercent: number;
}

const initialState: ProfileState = {
  isConnected: false,
  balance: 0,
  profileImage: null,
  profileName: "",
  walletId: null,
  walletAddress: null,
  walletType: null,
  change24h: 0,
  change24hPercent: 0,
};

// Load initial state from localStorage if available
if (typeof window !== "undefined") {
  const savedProfile = localStorage.getItem("profile");
  if (savedProfile) {
    try {
      const parsed = JSON.parse(savedProfile);
      Object.assign(initialState, parsed);
    } catch (e) {
      console.error("Failed to parse saved profile:", e);
    }
  }
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    connectWallet: (
      state,
      action: PayloadAction<{
        walletId: string;
        walletType: string;
        walletAddress?: string;
      }>,
    ) => {
      state.isConnected = true;
      state.walletId = action.payload.walletId;
      state.walletType = action.payload.walletType;
      if (action.payload.walletAddress) {
        state.walletAddress = action.payload.walletAddress;
      }
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("walletConnected", "1");
        localStorage.setItem("profile", JSON.stringify(state));
      }
    },
    disconnectWallet: (state) => {
      state.isConnected = false;
      state.walletId = null;
      state.walletType = null;
      state.walletAddress = null;
      state.profileName = "";
      state.profileImage = null;
      state.balance = 0;
      state.change24h = 0;
      state.change24hPercent = 0;
      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("walletConnected");
        localStorage.removeItem("profile");
      }
    },
    updateProfile: (
      state,
      action: PayloadAction<Partial<Omit<ProfileState, "isConnected" | "walletId" | "walletType" | "walletAddress">>>,
    ) => {
      Object.assign(state, action.payload);
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("profile", JSON.stringify(state));
      }
    },
    setProfileName: (state, action: PayloadAction<string>) => {
      state.profileName = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("profile", JSON.stringify(state));
      }
    },
    setProfileImage: (state, action: PayloadAction<string | null>) => {
      state.profileImage = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("profile", JSON.stringify(state));
      }
    },
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("profile", JSON.stringify(state));
      }
    },
    updateBalance: (
      state,
      action: PayloadAction<{
        balance: number;
        change24h?: number;
        change24hPercent?: number;
      }>,
    ) => {
      state.balance = action.payload.balance;
      if (action.payload.change24h !== undefined) {
        state.change24h = action.payload.change24h;
      }
      if (action.payload.change24hPercent !== undefined) {
        state.change24hPercent = action.payload.change24hPercent;
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("profile", JSON.stringify(state));
      }
    },
    setWalletAddress: (state, action: PayloadAction<string>) => {
      state.walletAddress = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("profile", JSON.stringify(state));
      }
    },
    deductBalance: (state, action: PayloadAction<number>) => {
      state.balance = Math.max(0, state.balance - action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("profile", JSON.stringify(state));
      }
    },
  },
});

export const {
  connectWallet,
  disconnectWallet,
  updateProfile,
  setProfileName,
  setProfileImage,
  setBalance,
  updateBalance,
  setWalletAddress,
  deductBalance,
} = profileSlice.actions;

export default profileSlice.reducer;

