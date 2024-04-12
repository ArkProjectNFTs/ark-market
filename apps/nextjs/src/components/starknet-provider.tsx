"use client";

import type { PropsWithChildren } from "react";
import { mainnet } from "@starknet-react/chains";
import {
  argent,
  braavos,
  jsonRpcProvider,
  StarknetConfig,
  useInjectedConnectors,
  voyager,
} from "@starknet-react/core";

function rpc() {
  return {
    nodeUrl: `https://starknet-mainnet.public.blastapi.io/rpc/v0.5`,
  };
}

export function StarknetProvider({ children }: PropsWithChildren) {
  const provider = jsonRpcProvider({ rpc });
  const { connectors } = useInjectedConnectors({
    recommended: [argent(), braavos()],
    order: "alphabetical",
  });

  return (
    <StarknetConfig
      chains={[mainnet]}
      provider={provider}
      connectors={connectors}
      explorer={voyager}
      autoConnect
    >
      {children}
    </StarknetConfig>
  );
}
