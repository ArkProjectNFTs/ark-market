"use client";

import { useMemo } from "react";
import Image from "next/image";
import { useAccount, useBalance, useStarkName } from "@starknet-react/core";

import { Button } from "@ark-market/ui/components/button";
import WalletIcon from "@ark-market/ui/components/icons/wallet-icon";

import ConnectWalletModal from "./connect-wallet-modal";
import WalletAccountPopover from "./wallet-account-popover";

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
        <Button variant="secondary">
          <WalletIcon />
          Connect wallet
        </Button>
      </ConnectWalletModal>
    );
  }

  return (
    // <div className="flex items-center gap-4">
    //   {roundedEthBalance !== undefined && (
    //     <div className="flex h-9 items-center rounded-md border p-2">
    //       <span className="text-sm text-muted-foreground">
    //         {roundedEthBalance} ETH
    //       </span>
    //     </div>
    //   )}
    //   {roundedStrkBalance !== undefined && (
    //     <div className="flex h-9 items-center rounded-md border p-2">
    //       <span className="text-sm text-muted-foreground">
    //         {roundedStrkBalance} STRK
    //       </span>
    //     </div>
    //   )}
    <WalletAccountPopover>
      <Button className="gap-3" variant="secondary">
        <div className="size-8 rounded-full bg-black" />
        {starkName ?? shortenedAddress}
      </Button>
    </WalletAccountPopover>
    // </div>
  );
}
