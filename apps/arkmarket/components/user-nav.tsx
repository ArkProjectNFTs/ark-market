"use client";

import { useMemo } from "react";
import Image from "next/image";
import { useAccount, useStarkName } from "@starknet-react/core";

import { Button } from "@ark-market/ui/components/button";

import ConnectWalletModal from "./connect-wallet-modal";
import WalletAccountModal from "./wallet-account-modal";

export function UserNav() {
  const { address } = useAccount();
  const { data: starkName } = useStarkName({ address });

  const shortenedAddress = useMemo(() => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  if (address === undefined) {
    return (
      <ConnectWalletModal>
        <Button>Connect wallet</Button>
      </ConnectWalletModal>
    );
  }

  return (
    <WalletAccountModal>
      <Button className="gap-3">
        <Image
          className="aspect-square"
          src="/01.png"
          width={24}
          height={24}
          alt="avatar"
        />
        {starkName ?? shortenedAddress}
      </Button>
    </WalletAccountModal>
  );
}
