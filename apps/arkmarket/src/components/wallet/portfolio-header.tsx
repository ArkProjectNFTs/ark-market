"use client";

import { useStarkProfile } from "@starknet-react/core";

import { shortAddress } from "@ark-market/ui";

import CopyButton from "~/components/copy-button";
import ProfilePicture from "~/components/profile-picture";
import PortfolioValue from "./portfolio-value";

interface PortfolioHeaderProps {
  walletAddress: string;
}

export default function PortfolioHeader({
  walletAddress,
}: PortfolioHeaderProps) {
  const { data: starkProfile } = useStarkProfile({ address: walletAddress });
  const shortenedAddress = shortAddress(walletAddress);

  return (
    <div className="flex flex-col gap-4 border-border bg-background px-5 pb-5 pt-3.5 sm:flex-row sm:items-center sm:justify-between sm:border-b sm:pb-6 sm:pt-6 md:justify-start md:gap-4">
      <div className="flex items-center gap-4">
        <ProfilePicture
          address={walletAddress}
          className="size-8 rounded-xs sm:rounded-lg lg:size-16"
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
      <PortfolioValue address={walletAddress} />
    </div>
  );
}
