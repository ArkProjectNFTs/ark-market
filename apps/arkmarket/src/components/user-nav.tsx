"use client";

import { useMemo } from "react";
import { useAccount, useNetwork, useStarkProfile } from "@starknet-react/core";

import { Button } from "@ark-market/ui/button";
import EthereumLogo from "@ark-market/ui/icons/ethereum-logo";
import WalletIcon from "@ark-market/ui/icons/wallet-icon";
import { Separator } from "@ark-market/ui/separator";

import ConnectWalletModal from "./connect-wallet-modal";
import ProfilePicture from "./profile-picture";
import WalletAccountModal from "./wallet-account-modal";
import WalletAccountPopover from "./wallet-account-popover";
import WrongNetworkModal from "./wrong-network-modal";

export function UserNav() {
  const { address, chainId } = useAccount();
  const { chain } = useNetwork();
  const { data: starkProfile } = useStarkProfile({ address });

  // const { data: ethBalance } = useBalance({ address });
  const ethBalance = { formatted: "0.00" };

  const shortenedAddress = useMemo(() => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  const isWrongNetwork = chainId !== chain.id && chainId !== undefined;

  const roundedEthBalance =
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    ethBalance !== undefined
      ? parseFloat(ethBalance.formatted).toFixed(4)
      : undefined;

  if (address === undefined) {
    return (
      <ConnectWalletModal>
        <Button variant="default" size="md">
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
        <Button variant="default" size="md">
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
    <>
      <WalletAccountPopover>
        <Button
          className="hidden gap-1.5 !pl-2 sm:inline-flex md:gap-3"
          variant="secondary"
          size="md"
        >
          <EthereumLogo className="size-6 md:size-8" />
          <p>
            {roundedEthBalance}
            <span className="text-muted-foreground"> ETH</span>
          </p>
          <Separator orientation="vertical" className="bg-background" />
          <ProfilePicture
            className="size-6 rounded-full md:size-8"
            address={address}
          />
          {starkProfile?.name ?? shortenedAddress}
        </Button>
      </WalletAccountPopover>

      <WalletAccountModal>
        <Button
          className="gap-1.5 !pl-2 sm:hidden"
          size="md"
          variant="secondary"
        >
          <ProfilePicture className="size-6 rounded-full" address={address} />
          {starkProfile?.name ?? shortenedAddress}
        </Button>
      </WalletAccountModal>
    </>
  );
}
