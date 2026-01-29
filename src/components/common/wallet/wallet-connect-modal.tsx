"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useState, useRef } from "react";
import { Search, ArrowLeft, ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import {
  connectWallet,
  setProfileImage,
  disconnectWallet,
  updateProfile,
} from "@/lib/store/slices/profileSlice";

interface WalletConnectScreenProps {
  onWalletChosen?: (walletId: string) => void;
}

type FlowStep = "select-wallet" | "upload-profile";

const walletOptions = [
  { id: "metamask", name: "Metamask" },
  { id: "phantom", name: "Phantom" },
  { id: "walletconnect", name: "Wallet Connect" },
  { id: "rainbow", name: "Rainbow" },
];

export default function WalletConnectScreen({
  onWalletChosen,
}: WalletConnectScreenProps) {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.profile);

  const [currentStep, setCurrentStep] = useState<FlowStep>("select-wallet");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [profileName, setProfileName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredWallets = walletOptions.filter((wallet) =>
    wallet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectWallet = (walletId: string) => {
    setSelectedWallet(walletId);
    setCurrentStep("upload-profile");
  };

  const handleContinueToConnected = () => {
    const name = profile.profileName?.trim() || profileName.trim();
    if (name && selectedWallet) {
      // Connect wallet and update profile in Redux
      const walletAddress = `0x${Math.random().toString(16).substr(2, 40)}`; // Generate mock address
      dispatch(
        connectWallet({
          walletId: selectedWallet,
          walletType: walletOptions.find((w) => w.id === selectedWallet)?.name || selectedWallet,
          walletAddress,
        })
      );
      // Update profile with name and image
      dispatch(
        updateProfile({
          profileName: name,
          profileImage: avatarUrl || profile.profileImage,
          balance: 11234.56,
          change24h: 189.03,
          change24hPercent: 3.27,
        })
      );

      // Reset to select wallet step (connected view will show automatically via profile.isConnected)
      setCurrentStep("select-wallet");
      setSelectedWallet(null);
      setProfileName("");
      setAvatarUrl(null);
      onWalletChosen?.(selectedWallet);
    }
  };

  const handleBackStep = () => {
    if (currentStep === "upload-profile") {
      setCurrentStep("select-wallet");
      setSelectedWallet(null);
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatarUrl(result);
        if (profile.isConnected) {
          dispatch(setProfileImage(result));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    if (avatarUrl && isHoveringAvatar) {
      setAvatarUrl(null);
    } else {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="flex w-full flex-col items-start gap-6">
      {/* Header with Title and Back Button */}
      <div className="flex items-center justify-between gap-2.5 self-stretch px-0">
        {!profile.isConnected && currentStep !== "select-wallet" && (
          <button
            onClick={handleBackStep}
            className="flex h-6 w-6 items-center justify-center rounded-lg bg-elevation-button"
          >
            <ArrowLeft className="text-text-primary h-4 w-4" />
          </button>
        )}
        <div className="flex flex-1 items-center justify-center">
          <h2 className="text-text-primary font-geist text-base font-semibold leading-[19px] tracking-[-0.2px]">
            Account
          </h2>
        </div>
        {!profile.isConnected && currentStep !== "select-wallet" && (
          <div className="h-6 w-6" />
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* Connected View - Show when wallet is connected */}
        {profile.isConnected ? (
          <motion.div
            key="connected"
            className="flex flex-col items-start gap-4 self-stretch pb-[6px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center gap-6 self-stretch">
              {/* Profile Avatar */}
              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
                <motion.button
                  onClick={handleAvatarClick}
                  onMouseEnter={() => setIsHoveringAvatar(true)}
                  onMouseLeave={() => setIsHoveringAvatar(false)}
                  className="relative flex h-14 w-14 items-center justify-center gap-[25px] overflow-hidden rounded-full bg-bg-tertiary hover:bg-bg-tertiary! cursor-pointer"
                  style={{
                    aspectRatio: "1/1",
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  {profile.profileImage || avatarUrl ? (
                    <>
                      <Image
                        src={profile.profileImage || avatarUrl || ""}
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                      {isHoveringAvatar && (
                        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-[rgba(11,11,13,0.30)]">
                          <X className="text-text-secondary h-6 w-6" />
                        </div>
                      )}
                    </>
                  ) : (
                    <ImagePlus className="text-text-secondary h-6 w-6" />
                  )}
                </motion.button>
              </div>

              {/* Profile Name Input */}
              <div className="flex flex-col items-start justify-end gap-[9px] self-stretch">
                <label className="text-text-primary text-center font-geist text-[13px] font-semibold leading-[13px] tracking-[-0.1px]">
                  Username
                </label>
                <Input
                  type="text"
                  value={profile.profileName || ""}
                  onChange={(e) => {
                    dispatch(
                      updateProfile({
                        profileName: e.target.value,
                      })
                    );
                  }}
                  placeholder="Enter your name"
                  className="text-text-primary bg-bg-tertiary dark:bg-bg-tertiary placeholder:text-text-secondary flex items-center gap-1 self-stretch rounded-lg border-none px-4 py-4 font-geist text-[13px] font-normal leading-[15px] tracking-[-0.1px]"
                />
              </div>
            </div>

            {/* Disconnect Button */}
            <button
              onClick={() => {
                dispatch(disconnectWallet());
                setCurrentStep("select-wallet");
                setSelectedWallet(null);
                setProfileName("");
                setAvatarUrl(null);
              }}
              className="flex flex-col cursor-pointer items-center gap-2 self-stretch rounded-lg bg-bg-tertiary px-4 py-3 hover:opacity-80"
            >
              <p className="text-text-primary font-geist text-xs font-semibold leading-3 tracking-[-0.1px]">
                Disconnect Wallet
              </p>
            </button>

            {/* Terms & Privacy Policy */}
            <p className="text-text-secondary self-stretch text-center font-geist text-[11px] font-normal leading-[13px] tracking-[-0.1px]">
              By logging in I agree to the{" "}
              <a href="#" className="underline">
                Terms
              </a>{" "}
              &{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
            </p>
          </motion.div>
        ) : (
          <>
            {/* STEP 1: Select Wallet */}
            {currentStep === "select-wallet" && (
              <motion.div
                key="select-wallet"
                className="flex flex-col items-start gap-4 self-stretch pb-[6px]"
                initial={{ opacity: 0, }}
                animate={{ opacity: 1, }}
                exit={{ opacity: 0, }}
                transition={{ duration: 0.3 }}
              >
                {/* Search Bar */}
                <div className="flex h-8 items-center gap-1 self-stretch overflow-hidden rounded-full bg-bg-tertiary px-[10px] py-[6px]">
                  <div className="flex items-center gap-1">
                    <Search className="text-text-secondary h-[15px] w-[15px]" />
                    <Input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search Wallets"
                      className="text-text-secondary border-none bg-transparent dark:bg-transparent p-0 font-geist text-xs font-medium leading-3 tracking-[-0.1px] opacity-60 placeholder:opacity-60 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>

                {/* Wallet Options */}
                <div className="flex flex-col items-start gap-2 self-stretch">
                  {filteredWallets.map((wallet, index) => (
                    <motion.div
                      key={wallet.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="w-full"
                    >
                      <Button
                        onClick={() => handleSelectWallet(wallet.id)}
                        className="flex items-center cursor-pointer w-full justify-center gap-2.5 self-stretch rounded-lg bg-bg-tertiary hover:bg-bg-tertiary! px-5 py-4 hover:opacity-80"
                      >
                        <span className="text-text-primary font-geist text-xs font-semibold leading-3 tracking-[-0.1px]">
                          {wallet.name}
                        </span>
                      </Button>
                    </motion.div>
                  ))}
                </div>

                {/* Terms & Privacy Policy */}
                <p className="text-text-secondary self-stretch text-center font-geist text-[11px] font-normal leading-[13px] tracking-[-0.1px]">
                  By logging in I agree to the{" "}
                  <a href="#" className="underline">
                    Terms
                  </a>{" "}
                  &{" "}
                  <a href="#" className="underline">
                    Privacy Policy
                  </a>
                </p>
              </motion.div>
            )}

            {/* STEP 2: Upload Profile */}
            {currentStep === "upload-profile" && (
              <motion.div
                key="upload-profile"
                className="flex flex-col items-start gap-6 self-stretch pb-[6px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col items-center gap-6 self-stretch">
                  {/* Avatar Upload */}
                  <div className="relative">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                    <motion.button
                      onClick={handleAvatarClick}
                      onMouseEnter={() => setIsHoveringAvatar(true)}
                      onMouseLeave={() => setIsHoveringAvatar(false)}
                      className="relative flex h-14 w-14 items-center justify-center gap-[25px] overflow-hidden rounded-full bg-bg-tertiary hover:bg-bg-tertiary! cursor-pointer"
                      style={{
                        aspectRatio: "1/1",
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {avatarUrl ? (
                        <>
                          <Image
                            src={avatarUrl}
                            alt="Avatar"
                            fill
                            className="object-cover"
                          />
                          {isHoveringAvatar && (
                            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-[rgba(11,11,13,0.30)]">
                              <X className="text-text-secondary h-6 w-6" />
                            </div>
                          )}
                        </>
                      ) : (
                        <ImagePlus className="text-text-secondary h-6 w-6" />
                      )}
                    </motion.button>
                  </div>

                  {/* Profile Name Input */}
                  <div className="flex flex-col items-start justify-end gap-[9px] self-stretch">
                    <label className="text-text-primary text-center font-geist text-[13px] font-semibold leading-[13px] tracking-[-0.1px]">
                      Username
                    </label>
                    <Input
                      type="text"
                      value={profile.profileName || ""}
                      onChange={(e) => {
                        dispatch(
                          updateProfile({
                            profileName: e.target.value,
                          })
                        );
                      }}
                      placeholder="Enter your name"
                      className="text-text-primary placeholder:text-text-secondary flex items-center gap-1 self-stretch rounded-lg border-none bg-bg-tertiary dark:bg-bg-tertiary px-4 py-4 font-geist text-[13px] font-normal leading-[15px] tracking-[-0.1px]"
                    />
                  </div>
                </div>

                {/* Continue Button */}
                <Button
                  onClick={handleContinueToConnected}
                  disabled={!profile.profileName?.trim()}
                  className={`flex items-center bg-bg-tertiary hover:bg-bg-tertiary! cursor-pointer justify-center gap-2.5 self-stretch rounded-lg px-5 py-4 ${profile.profileName?.trim()
                    ? "hover:opacity-90 "
                    : "opacity-20 "
                    }`}
                >
                  <span className="text-text-primary font-geist text-xs font-semibold leading-3 tracking-[-0.1px]">
                    Continue
                  </span>
                </Button>

                {/* Terms & Privacy Policy */}
                <p className="text-text-secondary self-stretch text-center font-geist text-[11px] font-normal leading-[13px] tracking-[-0.1px]">
                  By logging in I agree to the{" "}
                  <a href="#" className="underline">
                    Terms
                  </a>{" "}
                  &{" "}
                  <a href="#" className="underline">
                    Privacy Policy
                  </a>
                </p>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
