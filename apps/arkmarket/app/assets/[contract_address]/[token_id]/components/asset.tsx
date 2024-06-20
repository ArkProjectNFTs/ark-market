"use client";

import React from "react";
import Link from "next/link";
import { useOrderType } from "@ark-project/react";
import { useAccount } from "@starknet-react/core";
import { MoveLeft } from "lucide-react";
import { useQuery } from "react-query";

import { Button } from "@ark-market/ui/components/button";
import { areAddressesEqual } from "@ark-market/ui/lib/utils";

import { getTokenData, getTokenMarketData } from "../data";
import AssetsInfos from "./asset-infos";
import BestOffer from "./best-offer";
import CreateListing from "./create-listing";
import Listing from "./listing";
import Activity from "./token-activity";
import TokenMedia from "./token-media";
import TokenOffers from "./token-offers";

interface AssetProps {
  collection: any;
  params: any;
}

const Asset: React.FC<AssetProps> = ({ params }) => {
  const { address } = useAccount();
  const { data: tokenMarketData }: any = useQuery(
    "tokenMarketData",
    () =>
      getTokenMarketData({
        contract_address: params.contract_address,
        token_id: params.token_id,
      }),
    {
      refetchInterval: 10000,
    },
  );

  const {
    data: tokenData,
    isLoading,
    error,
  }: any = useQuery(
    "tokenMetadata",
    () => getTokenData(params.contract_address, params.token_id),
    {
      refetchInterval: 10000,
    },
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  const token = tokenData.result;
  const isOwner = areAddressesEqual(token.owner, address);

  return (
    <div className="grid min-h-[700px] grid-cols-3 grid-rows-3 gap-6">
      <div className="col-span-1 row-span-3 flex flex-col space-y-5">
        <div className="flex flex-col space-y-2">
          <Link href={`/collection/${params.contract_address}`}>
            <Button>
              <MoveLeft className="mr-2 h-4 w-4" />
              Back to collection
            </Button>
          </Link>
          <div className="text-xl font-bold">#{token.token_id}</div>
        </div>
        <div className="overflow-hidden rounded-md">
          <TokenMedia token={token} />
        </div>
      </div>
      <div className="col-span-2 row-span-3 space-y-4">
        <AssetsInfos token={token} tokenMarketData={tokenMarketData} />
        {tokenMarketData?.is_listed ? (
          <Listing
            token={token}
            tokenMarketData={tokenMarketData}
            isOwner={isOwner}
          />
        ) : (
          <>
            <BestOffer
              token={token}
              tokenMarketData={tokenMarketData}
              isOwner={isOwner}
            />
            {isOwner && (
              <>
                <CreateListing
                  token={token}
                  tokenMarketData={tokenMarketData}
                />
              </>
            )}
          </>
        )}
        <TokenOffers token={token} tokenMarketData={tokenMarketData} />
        <Activity params={params} />
      </div>
    </div>
  );
};

export default Asset;
