"use client";

import { type ReactNode } from "react";
import { LiveDataProvider } from "@/components/providers/live-data-provider";
import { WebSocketLiveSync } from "@/components/providers/websocket-live-sync";

export function LiveProviders({ children }: { children: ReactNode }) {
  return (
    <LiveDataProvider>
      <WebSocketLiveSync />
      {children}
    </LiveDataProvider>
  );
}
