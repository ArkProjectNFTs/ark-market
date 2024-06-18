"use client";

import { useMemo } from "react";
import {
  useAccount,
  useBalance,
  useNetwork,
  useStarkProfile,
} from "@starknet-react/core";

import { Button } from "@ark-market/ui/components/button";
import EthereumLogo from "@ark-market/ui/components/icons/ethereum-logo";
import WalletIcon from "@ark-market/ui/components/icons/wallet-icon";
import { Separator } from "@ark-market/ui/components/separator";

import ConnectWalletModal from "./connect-wallet-modal";
import ProfilePicture from "./profile-picture";
import WalletAccountPopover from "./wallet-account-popover";
import WrongNetworkModal from "./wrong-network-modal";

export function UserNav() {
  const { address, chainId } = useAccount();
  const { chain } = useNetwork();
  const { data: starkProfile } = useStarkProfile({ address });

  const { data: ethBalance } = useBalance({ address });
  // const ethBalance = { formatted: '0.00" };

  const shortenedAddress = useMemo(() => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  const isWrongNetwork = chainId !== chain.id && chainId !== undefined;

  const roundedEthBalance =
    ethBalance !== undefined
      ? parseFloat(ethBalance.formatted).toFixed(4)
      : undefined;

  if (address === undefined) {
    return (
      <ConnectWalletModal>
        <Button variant="default" size="sm">
          <div className="hidden items-center gap-2.5 md:flex">
            <WalletIcon />
            Connect wallet
          </div>
          <p className="md:hidden">Connect</p>
        </Button>
      </ConnectWalletModal>
    );
  }

  if (isWrongNetwork) {
    return (
      <WrongNetworkModal>
        <Button variant="default" size="sm">
          <div className="hidden items-center gap-2.5 md:flex">
            <WalletIcon />
            Wrong network
          </div>
          <p className="md:hidden">Wrong network</p>
        </Button>
      </WrongNetworkModal>
    );
  }

  return (
    <WalletAccountPopover>
      <Button className="gap-1.5 !pl-2 md:gap-3" variant="secondary" size="sm">
        <EthereumLogo className="hidden size-6 sm:block md:size-8" />
        <p className="hidden sm:block">
          {roundedEthBalance}
          <span className="text-muted-foreground"> ETH</span>
        </p>
        <Separator
          orientation="vertical"
          className="hidden bg-background sm:block"
        />
        <ProfilePicture
          className="size-6 rounded-full md:size-8"
          address={address}
        />
        {starkProfile?.name ?? shortenedAddress}
      </Button>
    </WalletAccountPopover>
  );
}
