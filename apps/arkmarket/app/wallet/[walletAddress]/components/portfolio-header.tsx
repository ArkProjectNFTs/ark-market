"use client";

import { useMemo } from "react";
import { useStarkProfile } from "@starknet-react/core";
import { CopyIcon } from "lucide-react";

import EtherIcon from "@ark-market/ui/components/icons/ether-icon";
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
    <div className="flex items-center gap-28 border-b border-border bg-background px-4 py-6">
      <div className="flex items-center gap-4">
        <ProfilePicture
          address={walletAddress}
          className="size-16 rounded-lg"
        />
        <div className="h-full">
          <div className="flex items-center">
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
              <p className="mt-2 text-sm">{shortenedAddress}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="text-sm text-secondary-foreground">Portfolio value</p>
        <div className="flex items-center gap-1">
          <EtherIcon />
          <p className="text-xl font-semibold">
            0.00 <span className="text-secondary-foreground">ETH</span>
          </p>
        </div>
      </div>
    </div>
  );
}
