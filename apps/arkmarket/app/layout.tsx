import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Toaster } from "@ark-market/ui/components/toast";
import { cn } from "@ark-market/ui/lib/utils";

import SiteHeader from "~/components/site-header";

import "@ark-market/ui/globals.css";

import type { PropsWithChildren } from "react";

import Providers from "~/components/providers";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_ENV === "production"
      ? "https://market.arkproject.dev"
      : "http://localhost:3000",
  ),
  title: "Ark Market",
  description: "Simple monorepo with starknet marketplace",
  openGraph: {
    title: "Ark Market",
    description: "Simple monorepo with starknet marketplace",
    url: "https://market.arkproject.dev",
    siteName: "Ark Market",
  },
  twitter: {
    card: "summary_large_image",
    site: "@ArkProjectNFTs",
    creator: "@ArkProjectNFTs",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-sans",
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen overscroll-y-none bg-background font-sans text-foreground antialiased",
          inter.variable,
        )}
      >
        <Providers>
          <div className="flex-col md:flex">
            <SiteHeader />
            {children}
            <SpeedInsights />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
