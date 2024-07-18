"use client";

import Link from "next/link";
import { useAccount } from "@starknet-react/core";
import { useQuery } from "react-query";
import { formatEther } from "viem";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn, ellipsableStyles } from "@ark-market/ui";
import EthereumLogo2 from "@ark-market/ui/icons/ethereum-logo-2";
import { Separator } from "@ark-market/ui/separator";

import type { Token } from "~/types";
import ProfilePicture from "~/components/profile-picture";
import getToken from "~/lib/getToken";
import ownerOrShortAddress from "~/lib/ownerOrShortAddress";

interface TokenStatsProps {
  token: Token;
}

export default function TokenStats({
  className,
  token,
}: PropsWithClassName<TokenStatsProps>) {
  const { address } = useAccount();
  const { data } = useQuery(
    ["token", token.collection_address, token.token_id],
    () =>
      getToken({
        contractAddress: token.collection_address,
        tokenId: token.token_id,
      }),
    {
      refetchInterval: 5_000,
      initialData: token,
    },
  );

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
          <p className="font-medium">
            {formatEther(BigInt(data?.last_price ?? 0))} ETH
          </p>
        </div>
      </div>
      <Separator orientation="vertical" className="hidden lg:block" />

      <div className="flex w-full flex-col gap-2 rounded-lg bg-card p-3.5 lg:bg-inherit lg:p-0">
        <p className="text-sm font-medium text-muted-foreground">Top offer</p>
        <div className="flex items-center gap-1">
          <EthereumLogo2 className="size-5" />
          <p className="font-medium">
            {formatEther(BigInt(data?.top_offer ?? 0))} ETH
          </p>
        </div>
      </div>
      <Separator orientation="vertical" className="hidden lg:block" />

      <div className="flex w-full flex-col gap-2 rounded-lg bg-card p-3.5 lg:bg-inherit lg:p-0">
        <p className="text-sm font-medium text-muted-foreground">Owner</p>
        <div className="flex items-center gap-2">
          <ProfilePicture
            address={data?.owner ?? token.owner}
            className="size-6 rounded-full"
          />

          <Link href={`/wallet/${data?.owner}`}>
            <p
              className={cn(
                "text-sm font-medium text-muted-foreground",
                ellipsableStyles,
              )}
            >
              {ownerOrShortAddress(address, data?.owner)}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
