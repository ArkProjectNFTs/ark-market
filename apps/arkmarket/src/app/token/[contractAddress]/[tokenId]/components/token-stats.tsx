"use client";

import { useMemo } from "react";
import Link from "next/link";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn, ellipsableStyles, formatUnits } from "@ark-market/ui";
import EthereumLogo2 from "@ark-market/ui/icons/ethereum-logo-2";
import { Separator } from "@ark-market/ui/separator";

import type { TokenInfosApiResponse } from "../queries/getTokenData";
import ProfilePicture from "~/components/profile-picture";

interface TokenStatsProps {
  tokenInfos: TokenInfosApiResponse["data"];
}

export default function TokenStats({
  className,
  tokenInfos,
}: PropsWithClassName<TokenStatsProps>) {
  const shortenedAddress = useMemo(() => {
    return `${tokenInfos.owner.slice(0, 7)}...${tokenInfos.owner.slice(-4)}`;
  }, [tokenInfos.owner]);

  return (
    <div
      className={cn(
        "grid grid-cols-2 items-center justify-between gap-2 md:grid-cols-4 lg:flex lg:h-14 lg:gap-4",
        className,
      )}
    >
      <div className="flex w-full flex-col gap-2 rounded-lg bg-card p-3.5 lg:bg-inherit lg:p-0">
        <p className="text-sm font-medium text-muted-foreground">
          Collection Floor
        </p>
        <div className="flex items-center gap-1 font-medium">
          <EthereumLogo2 className="size-5" />
          <p>{"_"} ETH</p>
          {/* TODO @YohanTz: Proper color */}
          <p className={cn("text-sm font-semibold text-green-500")}>+ {"_"}%</p>
        </div>
      </div>
      <Separator orientation="vertical" className="hidden lg:block" />

      <div className="flex w-full flex-col gap-2 rounded-lg bg-card p-3.5 lg:bg-inherit lg:p-0">
        <p className="text-sm font-medium text-muted-foreground">Last sale</p>
        <div className="flex items-center gap-1">
          <EthereumLogo2 className="size-5" />
          <p className="font-medium">{"_"} ETH</p>
        </div>
      </div>
      <Separator orientation="vertical" className="hidden lg:block" />

      <div className="flex w-full flex-col gap-2 rounded-lg bg-card p-3.5 lg:bg-inherit lg:p-0">
        <p className="text-sm font-medium text-muted-foreground">Top offer</p>
        <div className="flex items-center gap-1">
          <EthereumLogo2 className="size-5" />
          <p className="font-medium">
            {formatUnits(BigInt(tokenInfos.top_offer ?? "0"), 18)} ETH
          </p>
        </div>
      </div>
      <Separator orientation="vertical" className="hidden lg:block" />

      <div className="flex w-full flex-col gap-2 rounded-lg bg-card p-3.5 lg:bg-inherit lg:p-0">
        <p className="text-sm font-medium text-muted-foreground">Owner</p>
        <div className="flex items-center gap-2">
          <ProfilePicture
            address={tokenInfos.owner}
            className="size-6 rounded-full"
          />

          <Link href={`/wallet/${tokenInfos.owner}`}>
            <p
              className={cn(
                "text-sm font-medium text-muted-foreground",
                ellipsableStyles,
              )}
            >
              {shortenedAddress}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
