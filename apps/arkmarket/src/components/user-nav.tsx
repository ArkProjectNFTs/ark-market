"use client";

import { useAccount, useNetwork, useStarkProfile } from "@starknet-react/core";

import { cn, ellipsableStyles, shortAddress } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import EthereumLogo from "@ark-market/ui/icons/ethereum-logo";
import WalletIcon from "@ark-market/ui/icons/wallet-icon";
import { Separator } from "@ark-market/ui/separator";

import { ETH } from "~/constants/tokens";
import useBalance from "~/hooks/useBalance";
import ConnectWalletModal from "./connect-wallet-modal";
import ProfilePicture from "./profile-picture";
import WalletAccountModal from "./wallet-account-modal";
import WalletAccountPopover from "./wallet-account-popover";
import WrongNetworkModal from "./wrong-network-modal";

export function UserNav() {
  const { address, chainId } = useAccount();
  const { data: ethBalance } = useBalance({ token: ETH });
  const { chain } = useNetwork();
  const { data: starkProfile } = useStarkProfile({ address });

  const isWrongNetwork = chainId !== chain.id && chainId !== undefined;
  const nameOrShortAddress =
    starkProfile?.name ?? shortAddress(address ?? "0x");
  const roundedEthBalance = parseFloat(ethBalance.formatted ?? "0").toFixed(4);

  if (!address) {
    return (
      <ConnectWalletModal>
        <Button variant="default" size="md">
          <div className="hidden items-center gap-2.5 lg:flex">
            <WalletIcon />
            Connect wallet
          </div>
          <p className="lg:hidden">Connect</p>
        </Button>
      </ConnectWalletModal>
    );
  }

  if (isWrongNetwork) {
    return (
      <WrongNetworkModal>
        <Button variant="default" size="md">
          <div className="hidden items-center gap-2.5 lg:flex">
            <WalletIcon />
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
          <EthereumLogo className="size-6 flex-shrink-0 lg:size-8" />
          <p>
            {roundedEthBalance}
            <span className="text-muted-foreground"> ETH</span>
          </p>
          <Separator orientation="vertical" className="bg-background" />
          <ProfilePicture
            className="size-6 rounded-full lg:size-8"
            address={address}
          />
          {nameOrShortAddress}
        </Button>
      </WalletAccountPopover>

      <WalletAccountModal>
        <Button
          className="gap-1.5 !pl-2 sm:hidden"
          size="md"
          variant="secondary"
        >
          <ProfilePicture className="size-6 rounded-full" address={address} />
          <span className={cn("max-w-16 sm:max-w-none", ellipsableStyles)}>
            {nameOrShortAddress}
          </span>
        </Button>
      </WalletAccountModal>
    </>
  );
}
