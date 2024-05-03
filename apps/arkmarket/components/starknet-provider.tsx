"use client";

import type { PropsWithChildren } from "react";
import { mainnet, sepolia } from "@starknet-react/chains";
import {
  alchemyProvider,
  argent,
  braavos,
  StarknetConfig,
  useInjectedConnectors,
  voyager,
} from "@starknet-react/core";

export function StarknetProvider({ children }: PropsWithChildren) {
  const provider = alchemyProvider({
    apiKey: "ssydbI7745ocbNd_c-xULVsq9xXF947b",
  });
  const { connectors } = useInjectedConnectors({
    recommended: [argent(), braavos()],
    includeRecommended: "onlyIfNoConnectors",
    order: "random",
  });

  return (
    <StarknetConfig
      chains={[mainnet, sepolia]}
      provider={provider}
      connectors={connectors}
      explorer={voyager}
      autoConnect
    >
      {children}
    </StarknetConfig>
  );
}
