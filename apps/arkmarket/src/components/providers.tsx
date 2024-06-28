"use client";

import type { PropsWithChildren } from "react";
import { ArkProvider } from "@ark-project/react";
import { QueryClient, QueryClientProvider } from "react-query";

import { ThemeProvider } from "@ark-market/ui/theme";

import { StarknetProvider } from "./starknet-provider";

export default function Providers({ children }: PropsWithChildren) {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <StarknetProvider>
        <ArkProvider
          config={{
            starknetNetwork: "mainnet",
            arkchainNetwork: "mainnet",
          }}
        >
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </ArkProvider>
      </StarknetProvider>
    </ThemeProvider>
  );
}
