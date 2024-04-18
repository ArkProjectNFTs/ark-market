import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { Toaster } from "@ark-market/ui/components/toast";
import { cn } from "@ark-market/ui/lib/utils";

import { Header } from "~/components/header";

import "@ark-market/ui/globals.css";

import type { PropsWithChildren } from "react";

import Providers from "~/components/providers";

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

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <Providers>
          <div className="flex-col md:flex">
            <Header />
            <div className="flex-1 pt-16">{children}</div>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
