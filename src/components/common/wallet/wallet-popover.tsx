"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
} from "@/components/ui/popover";
import { X, Plus, WalletIcon, ArrowDown, ArrowLeft } from "lucide-react";
import { PopoverClose } from "@radix-ui/react-popover";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { setBalance } from "@/lib/store/slices/profileSlice";

type WalletView = "main" | "withdraw" | "topup";

export default function WalletPopover() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.profile);
  const [currentView, setCurrentView] = useState<WalletView>("main");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [open, setOpen] = useState(false);

  // Reset to main view when popover closes
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setTimeout(() => {
        setCurrentView("main");
        setWithdrawAmount("");
        setWalletAddress("");
      }, 200);
    }
  };

  const handleBack = () => {
    setCurrentView("main");
    setWithdrawAmount("");
    setWalletAddress("");
  };

  const handleCopyAddress = async () => {
    const address = profile.walletAddress || "0xA3F1c2sdhu813wkendad123sdaE2F3A";
    await navigator.clipboard.writeText(address);
    // You can add a toast notification here if available
  };

  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(balance);
  };

  const formatChange = (change: number) => {
    const sign = change >= 0 ? "+" : "";
    return `${sign}${formatBalance(change)}`;
  };

  const formatPercent = (percent: number) => {
    const sign = percent >= 0 ? "+" : "";
    return `${sign}${percent.toFixed(2)}%`;
  };

  const isWithdrawDisabled = !withdrawAmount || !walletAddress;

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <div className="flex h-[32px] flex-row items-center justify-center gap-[6px] bg-transparent hover:cursor-pointer">
          <div className="rounded-lg w-[24px] h-[24px] bg-[#FF6F00] flex items-center justify-center text-white">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.625 5V3.125C10.625 2.95924 10.5592 2.80027 10.4419 2.68306C10.3247 2.56585 10.1658 2.5 10 2.5H3.75C3.41848 2.5 3.10054 2.6317 2.86612 2.86612C2.6317 3.10054 2.5 3.41848 2.5 3.75M2.5 3.75C2.5 4.08152 2.6317 4.39946 2.86612 4.63388C3.10054 4.8683 3.41848 5 3.75 5H11.25C11.4158 5 11.5747 5.06585 11.6919 5.18306C11.8092 5.30027 11.875 5.45924 11.875 5.625V7.5M2.5 3.75V11.25C2.5 11.5815 2.6317 11.8995 2.86612 12.1339C3.10054 12.3683 3.41848 12.5 3.75 12.5H11.25C11.4158 12.5 11.5747 12.4342 11.6919 12.3169C11.8092 12.1997 11.875 12.0408 11.875 11.875V10M12.5 7.5V10H10C9.66848 10 9.35054 9.8683 9.11612 9.63388C8.8817 9.39946 8.75 9.08152 8.75 8.75C8.75 8.41848 8.8817 8.10054 9.11612 7.86612C9.35054 7.6317 9.66848 7.5 10 7.5H12.5Z" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-text-primary text-[12px] font-semibold leading-[100%] tracking-tight">
            {formatBalance(profile.balance)}
          </p>
        </div>
      </PopoverTrigger>

      <PopoverContent
        side="bottom"
        align="center"
        sideOffset={0}
        className="!w-[100vw] md:!w-[342px] bg-transparent dark:bg-transparent border-none z-[200] h-fit overflow-hidden rounded-none px-5 shadow-none"
      >
        {/* Header */}
        <div className="bg-white border-border-secondary dark:bg-elevation-container rounded-[20px] shadow-[0_14px_34px_-10px_rgba(11,11,13,0.20)]">
          <div className="flex items-center  gap-2 justify-between px-4 pb-6 pt-6 ">
            {currentView !== "main" && (
              <button
                onClick={handleBack}
                className="bg-elevation-card-raise flex h-6 w-6 items-center justify-center rounded-lg"
              >
                <ArrowLeft className="text-text-primary h-4 w-4" />
              </button>
            )}
            <p className="text-text-secondary font-geist text-sm font-semibold leading-4 tracking-[-0.2px]">
              My Wallet
            </p>
            <PopoverClose asChild>
              <button className="ml-auto">
                <X className="text-text-secondary h-5 w-5" />
              </button>
            </PopoverClose>
          </div>

          {/* Main View */}
          {currentView === "main" && (
            <div className="flex flex-col gap-8 px-4 pb-4">
              {/* USDC Tab */}
              <div className="flex items-start gap-1">
                <div className="bg-elevation-button flex items-center gap-1 rounded-lg px-2 py-2">
                  <span className="text-text-primary font-geist text-xs font-medium leading-3 tracking-[-0.1px]">
                    USDC
                  </span>
                </div>
              </div>

              {/* Balance Section */}
              <div className="flex flex-col justify-center gap-5">
                <div className="flex flex-col justify-center gap-3">
                  <h1 className="text-text-primary font-geist text-[40px] font-medium leading-[44px] tracking-[-1px]">
                    {formatBalance(profile.balance)}
                  </h1>
                  <div className="flex items-center gap-1">
                    <span className="text-success font-geist text-xs font-medium leading-3 tracking-[-0.1px]">
                      {formatChange(profile.change24h)}
                    </span>
                    <div className="bg-success flex items-center justify-center rounded px-[3px] py-[3px]">
                      <span className="font-geist text-xs font-medium leading-3 tracking-[-0.1px] text-[#16161A]">
                        {formatPercent(profile.change24hPercent)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-start gap-1 self-stretch">
                  <button
                    onClick={() => setCurrentView("topup")}
                    className="bg-bg-tertiary flex h-20 flex-1 flex-col items-center justify-center gap-0 rounded-lg px-4 py-3 hover:opacity-80"
                  >
                    <div className="flex flex-1 items-center justify-center gap-2.5 self-stretch">
                      <Plus className="text-text-primary h-5 w-5" />
                    </div>
                    <span className="text-text-secondary self-stretch text-center font-geist text-[11px] font-medium leading-[11px] tracking-[-0.1px]">
                      Topup
                    </span>
                  </button>
                  <button
                    onClick={() => setCurrentView("withdraw")}
                    className="bg-bg-tertiary flex h-20 flex-1 flex-col items-center justify-center gap-0 rounded-lg px-4 py-3 hover:opacity-80"
                  >
                    <div className="flex flex-1 items-center justify-center gap-2.5 self-stretch">
                      <ArrowDown className="text-text-primary h-5 w-5" />
                    </div>
                    <span className="text-text-secondary self-stretch text-center font-geist text-[11px] font-medium leading-[11px] tracking-[-0.1px]">
                      Withdraw
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Withdraw View */}
          {currentView === "withdraw" && (
            <div className="flex flex-col gap-8 px-4 pb-4">
              <div className="flex flex-col items-start gap-6 self-stretch">
                {/* Withdraw Amount Field */}
                <div className="flex flex-col items-start justify-end gap-[9px] self-stretch">
                  <label className="text-text-primary text-center font-geist text-[13px] font-semibold leading-[13px] tracking-[-0.1px]">
                    Withdraw Amount
                  </label>
                  <Input
                    type="text"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="$0.00"
                    className="bg-elevation-button dark:bg-elevation-button text-text-primary placeholder:text-text-secondary flex items-center gap-1 self-stretch rounded-lg border-none px-4 py-4 font-geist text-[13px] font-normal leading-[15px] tracking-[-0.1px]"
                  />
                </div>

                {/* Wallet Address Field */}
                <div className="flex flex-col items-start justify-end gap-[9px] self-stretch">
                  <label className="text-text-primary text-center font-geist text-[13px] font-semibold leading-[13px] tracking-[-0.1px]">
                    Wallet Address
                  </label>
                  <Input
                    type="text"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    placeholder="@walletaddress"
                    className="bg-elevation-button dark:bg-elevation-button text-text-primary placeholder:text-text-secondary flex items-center gap-1 self-stretch rounded-lg border-none px-4 py-4 font-geist text-[13px] font-normal leading-[15px] tracking-[-0.1px]"
                  />
                </div>
              </div>

              {/* Withdraw Button */}
              <Button
                onClick={() => {
                  if (!isWithdrawDisabled) {
                    const amount = parseFloat(withdrawAmount.replace(/[$,]/g, "")) || 0;
                    const newBalance = Math.max(0, profile.balance - amount);
                    dispatch(setBalance(newBalance));
                    setWithdrawAmount("");
                    setWalletAddress("");
                    setCurrentView("main");
                  }
                }}
                disabled={isWithdrawDisabled}
                className={`flex items-center bg-bg-tertiary hover:bg-bg-tertiary! justify-center gap-2.5 self-stretch rounded-lg px-5 py-4 ${isWithdrawDisabled
                  ? " opacity-20"
                  : ""
                  } hover:opacity-90`}
              >
                <span className="text-text-primary font-geist text-xs font-semibold leading-3 tracking-[-0.1px]">
                  Withdraw
                </span>
              </Button>
            </div>
          )}

          {/* Topup View */}
          {currentView === "topup" && (
            <div className="flex flex-col gap-8 px-4 pb-4">
              <div className="flex flex-col items-start gap-6 self-stretch">
                {/* Topup Section */}
                <div className="flex flex-col items-start justify-end gap-[9px] self-stretch">
                  <h3 className="text-text-primary text-center font-geist text-[13px] font-semibold leading-[13px] tracking-[-0.1px]">
                    Topup
                  </h3>
                  <p className="text-text-secondary text-center font-geist text-[13px] font-normal leading-[15px] tracking-[-0.1px]">
                    Send funds to this address
                  </p>
                  <div className="bg-elevation-button flex items-center gap-1 self-stretch rounded-lg px-4 py-4">
                    <span className="text-text-primary text-center font-geist text-[13px] font-normal leading-[15px] tracking-[-0.1px]">
                      {profile.walletAddress || "0xA3F1c2sdhu813wkendad123sdaE2F3A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Copy Address Button */}
              <Button
                onClick={handleCopyAddress}
                className="bg-bg-tertiary hover:bg-bg-tertiary! cursor-pointer flex items-center justify-center gap-2.5 self-stretch rounded-lg px-5 py-4"
              >
                <span className="text-text-primary font-geist text-xs font-semibold leading-3 tracking-[-0.1px]">
                  Copy Address
                </span>
              </Button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
