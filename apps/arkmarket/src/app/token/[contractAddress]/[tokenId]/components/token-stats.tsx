"use client";

import { useMemo } from "react";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn, formatNumber } from "@ark-market/ui";
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
    if (tokenInfos.owner === null) {
      return undefined;
    }
    return `${tokenInfos.owner.slice(0, 7)}...${tokenInfos.owner.slice(-10)}`;
  }, [tokenInfos.owner]);

  return (
    <div
      className={cn("flex h-14 items-center justify-between gap-4", className)}
    >
      <div className="flex w-full flex-col gap-2 rounded-lg">
        <p className="text-sm font-medium text-muted-foreground">
          Collection Floor
        </p>
        <div className="flex items-center gap-1 font-medium">
          <EthereumLogo2 className="size-5" />
          <p>{"_"} ETH</p>
          {/* TODO @YohanTz: Proper color */}
          <p
            className={cn(
              "text-sm font-semibold",
              1 < 0 ? "text-red-500" : "text-green-500",
            )}
          >
            + {"_"}%
          </p>
        </div>
      </div>
      <Separator orientation="vertical" />

      <div className="flex w-full flex-col gap-2 rounded-lg">
        <p className="text-sm font-medium text-muted-foreground">Last sale</p>
        <div className="flex items-center gap-1">
          <EthereumLogo2 className="size-5" />
          <p className="font-medium">{"_"} ETH</p>
        </div>
      </div>
      <Separator orientation="vertical" />

      <div className="flex w-full flex-col gap-2 rounded-lg">
        <p className="text-sm font-medium text-muted-foreground">Top offer</p>
        <div className="flex items-center gap-1">
          <EthereumLogo2 className="size-5" />
          <p className="font-medium">
            {formatNumber(BigInt(tokenInfos.top_offer ?? "0"))} ETH
          </p>
        </div>
      </div>
      <Separator orientation="vertical" />

      <div className="flex w-full flex-col gap-2 rounded-lg">
        <p className="text-sm font-medium text-muted-foreground">Owner</p>
        <div className="flex items-center gap-2">
          {tokenInfos.owner !== null && (
            <ProfilePicture
              address={tokenInfos.owner}
              className="size-6 rounded-full"
            />
          )}

          <p className="text-sm font-medium text-muted-foreground">
            {shortenedAddress ?? "_"}
          </p>
        </div>
      </div>
    </div>
  );
}
