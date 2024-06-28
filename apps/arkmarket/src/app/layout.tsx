import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { cn } from "@ark-market/ui";
import { Toaster } from "@ark-market/ui/toast";

import SiteHeader from "~/components/site-header";

import "~/app/globals.css";

import type { PropsWithChildren } from "react";

import DataFooter from "~/components/data-footer";
import Footer from "~/components/footer";
import Providers from "~/components/providers";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export const metadata: Metadata = {
  metadataBase: new URL(
    // eslint-disable-next-line no-restricted-properties
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
          // pb used as padding for DataFooter, which is position: fixed
          "min-h-screen overscroll-y-none bg-background font-sans text-foreground antialiased lg:pb-10",
          inter.variable,
        )}
      >
        <Providers>
          <div className="flex-col md:flex">
            <SiteHeader />
            {children}
            <SpeedInsights />
          </div>
          <Toaster richColors />
          <Footer />
          <DataFooter className="fixed bottom-0 hidden w-full lg:flex" />
        </Providers>
      </body>
    </html>
  );
}
