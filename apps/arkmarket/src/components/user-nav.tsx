"use client";

import { useAccount, useNetwork, useStarkProfile } from "@starknet-react/core";

import { cn, ellipsableStyles, shortAddress } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import { Ethereum, Wallet } from "@ark-market/ui/icons";
import { Separator } from "@ark-market/ui/separator";

import { ETH } from "~/constants/tokens";
import useBalance from "~/hooks/useBalance";
import ConnectWalletModal from "./connect-wallet-modal";
import ProfilePicture from "./profile-picture";
import WalletAccountModal from "./wallet-account-modal";
import WalletAccountPopover from "./wallet-account-popover";
import WrongNetworkModal from "./wrong-network-modal";

export function UserNav() {
  const { chain } = useNetwork();
  const { address, chainId } = useAccount();
  const { data: ethBalance } = useBalance({ address, token: ETH });
  const { data: starkProfile } = useStarkProfile({ address });
  const isWrongNetwork = chainId && chainId !== chain.id;
  const nameOrShortAddress =
    starkProfile?.name ?? shortAddress(address ?? "0x");

  if (!address) {
    return (
      <ConnectWalletModal>
        <Button variant="default" size="md">
          <div className="hidden items-center gap-2.5 md:flex">
            <Wallet />
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
            <Wallet />
            Wrong network
          </div>
          <p className="lg:hidden">Wrong network</p>
        </Button>
      </WrongNetworkModal>
    );
  }

  return (
    <>
      <WalletAccountPopover>
        <Button
          className="hidden gap-1.5 !pl-3.5 sm:inline-flex lg:gap-3"
          variant="secondary"
          size="md"
        >
          <Ethereum className="size-6 flex-shrink-0 md:size-8" />
          <p>
            {ethBalance?.rounded}
            <span className="text-muted-foreground"> ETH</span>
          </p>
          <Separator orientation="vertical" className="bg-background" />
          <ProfilePicture address={address} />
          {nameOrShortAddress}
        </Button>
      </WalletAccountPopover>

      <WalletAccountModal>
        <Button
          className="gap-1.5 !pl-2 sm:hidden"
          size="md"
          variant="secondary"
        >
          <ProfilePicture address={address} />
          <span className={cn("max-w-16 sm:max-w-none", ellipsableStyles)}>
            {nameOrShortAddress}
          </span>
        </Button>
      </WalletAccountModal>
    </>
  );
}
