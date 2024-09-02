"use client";

import Link from "next/link";
import { useAccount, useStarkProfile } from "@starknet-react/core";
import { useQuery } from "react-query";
import { formatEther } from "viem";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn, ellipsableStyles } from "@ark-market/ui";
import { Ethereum } from "@ark-market/ui/icons";
import { Separator } from "@ark-market/ui/separator";

import type { Token, TokenMarketData } from "~/types";
import ProfilePicture from "~/components/profile-picture";
import getCollection from "~/lib/getCollection";
import getTokenMarketData from "~/lib/getTokenMarketData";
import ownerOrShortAddress from "~/lib/ownerOrShortAddress";

interface TokenStatsProps {
  token: Token;
  tokenMarketData: TokenMarketData;
}

export default function TokenStats({
  className,
  token,
  tokenMarketData,
}: PropsWithClassName<TokenStatsProps>) {
  const { address } = useAccount();
  const { data } = useQuery(
    ["tokenMarketData", token.collection_address, token.token_id],
    () =>
      getTokenMarketData({
        contractAddress: token.collection_address,
        tokenId: token.token_id,
      }),
    {
      refetchInterval: 5_000,
      initialData: tokenMarketData,
    },
  );

  const { data: collection, isLoading } = useQuery(
    ["collection", token.collection_address],
    () =>
      getCollection({
        collectionAddress: token.collection_address,
      }),
    {
      refetchInterval: 5_000,
    },
  );
  const { data: starkProfile } = useStarkProfile({
    address: data?.owner ?? tokenMarketData.owner,
  });

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
        <div className="font-numbers flex min-h-6 items-center gap-1 text-xl font-medium">
          <Ethereum className="size-5" />
          {isLoading || <>{formatEther(BigInt(collection?.floor ?? 0))} ETH</>}
          {/* TODO @YohanTz: Proper color */}
          {/* <p className={cn("text-sm font-semibold text-green-500")}>+ {"_"}%</p> */}
        </div>
      </div>
      <Separator orientation="vertical" className="hidden lg:block" />
      <div className="flex w-full flex-col gap-2 rounded-lg bg-card p-3.5 lg:bg-inherit lg:p-0">
        <p className="text-sm font-medium text-muted-foreground">Last sale</p>
        <div className="font-numbers flex items-center gap-1 text-xl">
          <Ethereum className="size-5" />
          <p className="font-medium">
            {formatEther(BigInt(data?.last_price ?? 0))} ETH
          </p>
        </div>
      </div>
      <Separator orientation="vertical" className="hidden lg:block" />
      <div className="flex w-full flex-col gap-2 rounded-lg bg-card p-3.5 lg:bg-inherit lg:p-0">
        <p className="text-sm font-medium text-muted-foreground">Top offer</p>
        <div className="font-numbers flex items-center gap-1 text-xl">
          <Ethereum className="size-5" />
          <p className="font-medium">
            {formatEther(BigInt(data?.top_offer.amount ?? 0))} ETH
          </p>
        </div>
      </div>
      <Separator orientation="vertical" className="hidden lg:block" />
      <div className="flex w-full flex-col gap-2 rounded-lg bg-card p-3.5 lg:bg-inherit lg:p-0">
        <p className="text-sm font-medium text-muted-foreground">Owner</p>
        <div className="font-numbers flex items-center gap-2 text-xl">
          <ProfilePicture
            address={data?.owner ?? tokenMarketData.owner}
            className="size-6 rounded-full"
          />
          <Link href={`/wallet/${data?.owner}`}>
            <p className={cn("font-medium", ellipsableStyles)}>
              {starkProfile?.name ??
                ownerOrShortAddress({
                  ownerAddress: data?.owner ?? tokenMarketData.owner,
                  address,
                })}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
