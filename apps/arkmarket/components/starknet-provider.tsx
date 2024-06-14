"use client";

import type { PropsWithChildren } from "react";
import { mainnet } from "@starknet-react/chains";
import {
  alchemyProvider,
  argent,
  braavos,
  StarknetConfig,
  useInjectedConnectors,
  voyager,
} from "@starknet-react/core";
import { ArgentMobileConnector } from "starknetkit/argentMobile";
import { WebWalletConnector } from "starknetkit/webwallet";

import { env } from "~/env";

export function StarknetProvider({ children }: PropsWithChildren) {
  const provider = alchemyProvider({
    apiKey: "ssydbI7745ocbNd_c-xULVsq9xXF947b",
  });
  const { connectors: injectedConnectors } = useInjectedConnectors({
    recommended: [argent(), braavos()],
    includeRecommended: "onlyIfNoConnectors",
    order: "alphabetical",
  });

  const connectors = [
    ...injectedConnectors,
    new WebWalletConnector({ url: "https://web.argent.xyz" }),
    new ArgentMobileConnector({
      projectId: env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
      dappName: "Ark Market",
    }),
  ];

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
