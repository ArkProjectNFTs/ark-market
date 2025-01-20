"use client";

import type { Connector } from "@starknet-react/core";
import type { PropsWithChildren } from "react";
import { sepolia } from "@starknet-react/chains";
import {
  argent,
  braavos,
  StarknetConfig,
  useInjectedConnectors,
  voyager,
} from "@starknet-react/core";
import { ArgentMobileConnector } from "starknetkit/argentMobile";
import { WebWalletConnector } from "starknetkit/webwallet";

import { env } from "~/env";
import getProvider from "~/lib/getProvider";

export function StarknetProvider({ children }: PropsWithChildren) {
  const provider = getProvider();
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
      icons: [],
      description: "Ark Market, Starknet NFT Marketplace",
    }),
  ] as Connector[];

  return (
    <StarknetConfig
      chains={[sepolia]}
      provider={provider}
      connectors={connectors}
      explorer={voyager}
      autoConnect
    >
      {children}
    </StarknetConfig>
  );
}
