"use client";

import type { PropsWithChildren } from "react";
import { ArkProvider } from "@ark-project/react";
import { QueryClient, QueryClientProvider } from "react-query";

import { ThemeProvider } from "@ark-market/ui/components/theme";

import { StarknetProvider } from "./starknet-provider";

const config = {
  arkchainNetwork: "mainnet" as const,
};

export default function Providers({ children }: PropsWithChildren) {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <StarknetProvider>
        <ArkProvider config={config}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </ArkProvider>
      </StarknetProvider>
    </ThemeProvider>
  );
}
