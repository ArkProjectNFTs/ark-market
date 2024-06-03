"use client";

import { useMemo } from "react";
import Image from "next/image";
import { useAccount, useBalance, useStarkName } from "@starknet-react/core";

import { Button } from "@ark-market/ui/components/button";
import WalletIcon from "@ark-market/ui/components/icons/wallet-icon";

import ConnectWalletModal from "./connect-wallet-modal";
import WalletAccountDropdown from "./wallet-account-dropdown";

const STRK_CONTRACT_ADDRESS =
  "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d";

export function UserNav() {
  const { address } = useAccount();
  const { data: starkName } = useStarkName({ address });

  const { data: ethBalance } = useBalance({ address });
  const roundedEthBalance =
    ethBalance !== undefined
      ? parseFloat(ethBalance.formatted).toFixed(4)
      : undefined;

  const { data: strkBalance } = useBalance({
    address,
    token: STRK_CONTRACT_ADDRESS,
  });
  const roundedStrkBalance =
    strkBalance !== undefined
      ? parseFloat(strkBalance.formatted).toFixed(4)
      : undefined;

  const shortenedAddress = useMemo(() => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  if (address === undefined) {
    return (
      <ConnectWalletModal>
        <Button>
          <WalletIcon />
          Connect wallet
        </Button>
      </ConnectWalletModal>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {roundedEthBalance !== undefined && (
        <div className="flex h-9 items-center rounded-md border p-2">
          <span className="text-sm text-muted-foreground">
            {roundedEthBalance} ETH
          </span>
        </div>
      )}
      {roundedStrkBalance !== undefined && (
        <div className="flex h-9 items-center rounded-md border p-2">
          <span className="text-sm text-muted-foreground">
            {roundedStrkBalance} STRK
          </span>
        </div>
      )}

      <WalletAccountDropdown>
        <Button className="gap-3 p-2">
          <Image
            className="aspect-square"
            src="/01.png"
            width={24}
            height={24}
            alt="avatar"
          />
          {starkName ?? shortenedAddress}
        </Button>
      </WalletAccountDropdown>
    </div>
  );
}
