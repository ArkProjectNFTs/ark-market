/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo } from "react";
import { useAccount, useNetwork, useStarkProfile } from "@starknet-react/core";

import { Button } from "@ark-market/ui/components/button";
import WalletIcon from "@ark-market/ui/components/icons/wallet-icon";

import useBlockies from "~/hooks/useBlockies";
import ConnectWalletModal from "./connect-wallet-modal";
import WalletAccountPopover from "./wallet-account-popover";
import WrongNetworkModal from "./wrong-network-modal";

export function UserNav() {
  const { address, chainId } = useAccount();
  const { chain } = useNetwork();
  const { data: starkProfile } = useStarkProfile({ address });

  const shortenedAddress = useMemo(() => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  const { blockiesImageSrc } = useBlockies({ address });
  const isWrongNetwork = chainId !== chain.id && chainId !== undefined;

  if (address === undefined) {
    return (
      <ConnectWalletModal>
        <Button variant="secondary">
          <WalletIcon />
          Connect wallet
        </Button>
      </ConnectWalletModal>
    );
  }

  if (isWrongNetwork) {
    return (
      <WrongNetworkModal>
        <Button variant="secondary">
          <WalletIcon />
          Wrong network
        </Button>
      </WrongNetworkModal>
    );
  }

  return (
    <WalletAccountPopover>
      <Button className="gap-3" variant="secondary">
        {starkProfile?.name ? (
          <img
            className="size-8 rounded-full"
            alt="Starknet Id profile"
            src={starkProfile?.profilePicture}
          />
        ) : (
          <img
            className="size-8 rounded-full"
            src={blockiesImageSrc}
            alt="Blockies"
          />
        )}
        {starkProfile?.name ?? shortenedAddress}
      </Button>
    </WalletAccountPopover>
    // </div>
  );
}
