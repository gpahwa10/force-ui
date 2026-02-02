// Top-level font setup + RootLayout
import type { Metadata } from "next";
import {
  Inter,
  Plus_Jakarta_Sans,
  Lexend_Deca,
  Geist,
  Geist_Mono,
} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import ClientHeader from "@/components/common/app-header";
import AppFooter from "@/components/common/app-footer";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { StoreProvider } from "@/components/providers/store-provider";
import { LiveProviders } from "@/components/providers/live-providers";
import GlobalTradeDialog from "@/components/trade/global-trade-dialog";
import GlobalOrderDialog from "@/components/trade/global-order-dialog";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Force",
  description: "Force - The Future of Sports Trading.",
};

// RootLayout (server component)
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} bg-bg-primary pb-footer font-sans antialiased`}
      >
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <LiveProviders>
              <ClientHeader />
              {children}
              <AppFooter />
              <GlobalTradeDialog />
              <GlobalOrderDialog />
            </LiveProviders>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
