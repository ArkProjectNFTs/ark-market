"use client";

import { useStarkProfile } from "@starknet-react/core";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn, shortAddress } from "@ark-market/ui";
import { Typography } from "@ark-market/ui/typography";

import CopyButton from "~/components/copy-button";
import ProfilePicture from "~/components/profile-picture";
import PortfolioValue from "./portfolio-value";

interface PortfolioHeaderProps {
  walletAddress: string;
}

export default function PortfolioHeader({
  className,
  walletAddress,
}: PropsWithClassName<PortfolioHeaderProps>) {
  const { data: starkProfile } = useStarkProfile({ address: walletAddress });
  const shortenedAddress = shortAddress(walletAddress);

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
          className="size-8 rounded-xs sm:size-16 sm:rounded-lg"
        />
        <div className="h-full w-full">
          <div className="flex items-center justify-between sm:justify-start">
            <Typography variant="h4">
              {starkProfile?.name ?? shortenedAddress}
            </Typography>
            <div className="ml-2.5 flex items-center gap-4 text-secondary-foreground">
              <CopyButton className="h-6 sm:h-4" textToCopy={walletAddress} />
            </div>
          </div>

          {starkProfile?.name !== undefined && (
            <div>
              <Typography variant="body_s" className="mt-2 hidden sm:block">
                {shortenedAddress}
              </Typography>
            </div>
          )}
        </div>
      </div>
      <PortfolioValue />
    </div>
  );
}
