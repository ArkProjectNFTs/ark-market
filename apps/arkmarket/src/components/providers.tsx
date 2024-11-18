"use client";

import type { PropsWithChildren } from "react";
import { ArkQueryClient, ArkQueryClientProvider, ArkProvider } from "@ark-project/react";

import { ThemeProvider } from "@ark-market/ui/theme";

import { StarknetProvider } from "./starknet-provider";

const queryClient = new ArkQueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    },
  },
});

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <StarknetProvider>
        <ArkQueryClientProvider client={queryClient}>
          <ArkProvider config={{ starknetNetwork: "mainnet" }}>
            {children}
          </ArkProvider>
        </ArkQueryClientProvider>
      </StarknetProvider>
    </ThemeProvider>
  );
}
