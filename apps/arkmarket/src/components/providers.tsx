"use client";

import type { PropsWithChildren } from "react";
import {
  ArkProvider,
  ArkQueryClient,
  ArkQueryClientProvider,
} from "@ark-project/react";

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
          <ArkProvider config={{ starknetNetwork: "sepolia" }}>
            {children}
          </ArkProvider>
        </ArkQueryClientProvider>
      </StarknetProvider>
    </ThemeProvider>
  );
}
