"use client";

import { useMemo } from "react";
import { useStarkProfile } from "@starknet-react/core";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn } from "@ark-market/ui";
import EthereumLogo2 from "@ark-market/ui/icons/ethereum-logo-2";

import CopyButton from "~/components/copy-button";
import ProfilePicture from "~/components/profile-picture";

interface PortfolioHeaderProps {
  walletAddress: string;
}

export default function PortfolioHeader({
  className,
  walletAddress,
}: PropsWithClassName<PortfolioHeaderProps>) {
  const shortenedAddress = useMemo(() => {
    return `${walletAddress.slice(0, 7)}...${walletAddress.slice(-10)}`;
  }, [walletAddress]);

  const { data: starkProfile } = useStarkProfile({
    address: walletAddress,
  });

  return (
    <div
      className={cn(
        "flex flex-col gap-4 border-border bg-background px-5 pb-5 pt-3.5 sm:flex-row sm:items-center sm:justify-between sm:border-b sm:pb-6 sm:pt-6 md:justify-start md:gap-28",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        <ProfilePicture
          address={walletAddress}
          className="rounded-xs size-8 sm:size-16 sm:rounded-lg"
        />
        <div className="h-full w-full">
          <div className="flex items-center justify-between sm:justify-start">
            <p className="text-xl font-semibold">
              {starkProfile?.name ?? shortenedAddress}
            </p>
            <div className="ml-2.5 flex items-center gap-4 text-secondary-foreground">
              <CopyButton className="h-6 sm:h-4" textToCopy={walletAddress} />
            </div>
          </div>

          {starkProfile?.name !== undefined && (
            <div>
              <p className="mt-2 hidden text-sm sm:block">{shortenedAddress}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex rounded-lg bg-card py-2 pl-1 pr-4">
        <div className="flex items-center gap-1">
          <EthereumLogo2 />
          <div className="flex flex-col gap-1.5">
            <p className="text-sm text-secondary-foreground">Portfolio value</p>
            <p className="text-xl font-semibold">
              0.00 <span className="text-secondary-foreground">ETH</span>
            </p>
          </div>
        </div>

        <div className="ml-10 hidden items-end sm:flex">
          <span className="text-muted-foreground">$00,00</span>
        </div>
      </div>
    </div>
  );
}
