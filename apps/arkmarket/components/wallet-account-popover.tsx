/* eslint-disable @next/next/no-img-element */
"use client";

import type { PropsWithChildren } from "react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  useAccount,
  useBalance,
  useDisconnect,
  useStarkProfile,
} from "@starknet-react/core";
import { Copy, HelpCircle, Power, Settings, User, Wallet } from "lucide-react";
import { useCopyToClipboard } from "usehooks-ts";

import EthereumLogo from "@ark-market/ui/components/icons/ethereum-logo";
import StarknetLogo from "@ark-market/ui/components/icons/starknet-logo";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ark-market/ui/components/popover";
import { ThemeTabs } from "@ark-market/ui/components/theme";
import { cn, focusableStyles } from "@ark-market/ui/lib/utils";

import ExternalLink from "./external-link";
import ProfilePicture from "./profile-picture";

const STRK_CONTRACT_ADDRESS =
  "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d";

const popoverItemCommonClassName = cn(
  "flex items-center gap-2 rounded-xs px-1.5 py-2 transition-colors hover:bg-card",
  focusableStyles,
);

export default function WalletAccountPopover({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const { address, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: starkProfile } = useStarkProfile({
    address,
  });
  const isWebWallet = connector?.id === "argentWebWallet";

  // const { data: ethBalance } = useBalance({ address });
  const ethBalance = { formatted: "0.00" };
  const roundedEthBalance =
    ethBalance !== undefined
      ? parseFloat(ethBalance.formatted).toFixed(4)
      : undefined;

  // const { data: strkBalance } = useBalance({
  //   address,
  //   token: STRK_CONTRACT_ADDRESS,
  // });
  const strkBalance = { formatted: "0.00" };
  const roundedStrkBalance =
    strkBalance !== undefined
      ? parseFloat(strkBalance.formatted).toFixed(4)
      : undefined;

  const [, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);

  const shortenedAddress = useMemo(() => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  function closePopover() {
    setOpen(false);
  }

  function handleCopyAddress() {
    if (address === undefined) {
      return;
    }

    copy(address)
      .then(() => {
        setCopied(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [copied]);

  if (address === undefined) {
    // should not happen
    return null;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent side="bottom" align="end" className="mt-3 w-80">
        <div className="flex h-12 items-center gap-4">
          <ProfilePicture address={address} className="size-12 rounded-md" />

          <div className="flex h-full flex-col justify-between">
            <p
              className={cn(
                "text-xl font-semibold",
                starkProfile?.name === undefined && "my-auto",
              )}
            >
              {starkProfile?.name ?? shortenedAddress}
            </p>
            {starkProfile?.name !== undefined && (
              <div className="text- flex items-center gap-2">
                {connector !== undefined && (
                  <div className="flex size-5 items-center justify-center rounded-full bg-white">
                    <img
                      src={connector.icon.dark}
                      alt={`${connector.name}`}
                      className="size-3 rounded-full"
                    />
                  </div>
                )}
                <p className="text-sm">{shortenedAddress}</p>
                <button onClick={handleCopyAddress} className={focusableStyles}>
                  <Copy size={16} className="text-muted-foreground" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="my-5 flex flex-col gap-2">
          <Link
            href={`/wallet/${address}`}
            className={popoverItemCommonClassName}
            onClick={closePopover}
          >
            <User size={24} />
            <p className="font-bold">My items</p>
          </Link>
          {isWebWallet && (
            <ExternalLink
              className={popoverItemCommonClassName}
              href="https://web.argent.xyz"
              onClick={closePopover}
            >
              <Wallet size={24} />
              <p className="font-bold">Web Wallet</p>
            </ExternalLink>
          )}
          <Link
            href="/"
            className={popoverItemCommonClassName}
            onClick={closePopover}
          >
            <Settings size={24} />
            <p className="font-bold">Account settings</p>
          </Link>
          <Link
            href="/"
            className={popoverItemCommonClassName}
            onClick={closePopover}
          >
            <HelpCircle size={24} />
            <p className="font-bold">Support</p>
          </Link>
          <button
            className={cn(popoverItemCommonClassName)}
            onClick={() => disconnect()}
          >
            <Power size={24} />
            <p className="font-bold">Log out</p>
          </button>
        </div>

        <div className="flex h-16 items-center justify-between rounded-t-lg bg-card p-4">
          <div className="flex items-center gap-2.5">
            <EthereumLogo />
            <span className="font-bold">ETH</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <p className="text-sm font-medium">{roundedEthBalance}</p>
            <p className="text-xs text-secondary-foreground">0.00$</p>
          </div>
        </div>
        <div className="mt-0.5 flex h-16 items-center justify-between rounded-b-lg bg-card p-4">
          <div className="flex items-center gap-2.5">
            <StarknetLogo />
            <span className="font-bold">STRK</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <p className="text-sm font-medium">{roundedStrkBalance}</p>
            <p className="text-xs text-secondary-foreground">0.00$</p>
          </div>
        </div>

        <ThemeTabs className="mt-5" />
      </PopoverContent>
    </Popover>
  );
}
