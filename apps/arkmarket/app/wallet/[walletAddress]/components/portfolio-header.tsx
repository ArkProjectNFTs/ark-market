"use client";

import { useMemo } from "react";
import { useStarkProfile } from "@starknet-react/core";
import { CopyIcon } from "lucide-react";

import EthereumLogo2 from "@ark-market/ui/components/icons/ethereum-logo-2";
import { focusableStyles } from "@ark-market/ui/lib/utils";

import ProfilePicture from "~/components/profile-picture";

interface PortfolioHeaderProps {
  walletAddress: string;
}

export default function PortfolioHeader({
  walletAddress,
}: PortfolioHeaderProps) {
  const shortenedAddress = useMemo(() => {
    return `${walletAddress.slice(0, 7)}...${walletAddress.slice(-10)}`;
  }, [walletAddress]);

  const { data: starkProfile } = useStarkProfile({
    address: walletAddress,
  });

  return (
    <div className="flex flex-col gap-5 border-b border-border bg-background px-4 py-6 sm:flex-row sm:items-center sm:justify-between md:justify-start md:gap-28">
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
              <button className={focusableStyles}>
                <CopyIcon size={16} />
              </button>
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
