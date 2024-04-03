import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { ThemeProvider, ThemeToggle } from "@ark-market/ui/components/theme";
import { Toaster } from "@ark-market/ui/components/toast";
import { cn } from "@ark-market/ui/lib/utils";

import "@ark-market/ui/globals.css";

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

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {props.children}

          <div className="absolute bottom-4 right-4">
            <ThemeToggle />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
