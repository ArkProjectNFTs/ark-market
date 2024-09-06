"use client";

import Link from "next/link";
import { useAccount, useStarkProfile } from "@starknet-react/core";
import { formatEther } from "viem";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn } from "@ark-market/ui";
import { Ethereum } from "@ark-market/ui/icons";

import type { Token, TokenMarketData } from "~/types";
import ProfilePicture from "~/components/profile-picture";
import useTokenMarketdata from "~/hooks/useTokenMarketData";
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
  const { data } = useTokenMarketdata({
    collectionAddress: token.collection_address,
    tokenId: token.token_id,
    initialData: tokenMarketData,
  });
  const { data: starkProfile } = useStarkProfile({ address: data.owner });
  const owner =
    starkProfile?.name ??
    ownerOrShortAddress({
      ownerAddress: data.owner,
      address,
    });

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0",
        className,
      )}
    >
      <div className="flex flex-col justify-between p-2 lg:pr-4">
        <p className="text-sm font-medium text-muted-foreground">
          Collection Floor
        </p>
        <div className="font-numbers flex items-center gap-1 text-lg font-medium">
          <Ethereum className="size-5 flex-shrink-0" />
          <div className="min-w-0 flex-1 truncate">
            {data.floor ? formatEther(BigInt(data.floor)) : "_"} ETH
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between p-2 lg:border-l lg:px-4">
        <p className="text-sm font-medium text-muted-foreground">Last sale</p>
        <div className="font-numbers flex items-center gap-1 text-lg">
          <Ethereum className="size-5 flex-shrink-0" />
          <div className="min-w-0 flex-1 truncate">
            {data.last_price ? formatEther(BigInt(data.last_price)) : "_"} ETH
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between p-2 lg:border-l lg:px-4">
        <p className="text-sm font-medium text-muted-foreground">Top offer</p>
        <div className="font-numbers flex items-center gap-1 text-lg">
          <Ethereum className="size-5 flex-shrink-0" />
          <div className="min-w-0 flex-1 truncate">
            {data.has_offer ? formatEther(BigInt(data.top_offer.amount)) : "_"}{" "}
            ETH
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between p-2 lg:border-l lg:pl-4">
        <p className="text-sm font-medium text-muted-foreground">Owner</p>
        <div className="font-numbers flex items-center gap-2 text-lg">
          <ProfilePicture
            address={data.owner}
            className="size-6 flex-shrink-0 rounded-full"
          />
          <div className="min-w-0 flex-1">
            <Link href={`/wallet/${data.owner}`} className="block">
              <p className="truncate font-medium">{owner}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
