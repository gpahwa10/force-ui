"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import WalletConnectScreen from "@/components/common/wallet/wallet-connect-modal";
import { cn } from "@/lib/utils";

interface WalletConnectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onWalletConnected?: () => void;
  trigger?: React.ReactNode;
  variant?: "desktop" | "mobile";
  onCloseMobileSheet?: () => void;
}

export default function WalletConnectDialog({
  open,
  onOpenChange,
  onWalletConnected,
  trigger,
  variant = "desktop",
  onCloseMobileSheet,
}: WalletConnectDialogProps) {
  const handleWalletChosen = () => {
    // Wallet connection is now handled in Redux via wallet-connect-modal
    onWalletConnected?.();
    onOpenChange(false);
    onCloseMobileSheet?.();
  };

  // Use Sheet for mobile, Dialog for desktop
  if (variant === "mobile") {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        {trigger && (
          <SheetTrigger asChild>
            <div onClick={() => onOpenChange(true)}>{trigger}</div>
          </SheetTrigger>
        )}
        <SheetContent
          side="bottom"
          className="bg-elevation-container h-[90vh] max-h-[90vh] overflow-auto rounded-t-[20px] border-none p-4"
        >
          <WalletConnectScreen onWalletChosen={handleWalletChosen} />
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop Dialog
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <div onClick={() => onOpenChange(true)}>
          {trigger}
        </div>
      )}
      <DialogContent
        className="z-[200] w-[374px] max-w-[90vw] rounded-[20px] border-none bg-elevation-container p-4 shadow-[0_14px_34px_-10px_rgba(11,11,13,0.05)] [&>button]:text-text-tertiary [&>button]:opacity-100 [&>button]:hover:opacity-70"
        showCloseButton={true}
      >
        <WalletConnectScreen onWalletChosen={handleWalletChosen} />
      </DialogContent>
    </Dialog>
  );
}
