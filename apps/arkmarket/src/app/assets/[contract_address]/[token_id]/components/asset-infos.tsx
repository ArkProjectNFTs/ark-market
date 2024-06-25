"use client";

import * as React from "react";
import { useAccount } from "@starknet-react/core";
import { formatEther } from "viem";

import { areAddressesEqual, shortAddress } from "@ark-market/ui";
import { TableCell, TableHead } from "@ark-market/ui/table";

import type { Token, TokenMarketData } from "~/types";

interface AssetInfosProps {
  token: Token;
  tokenMarketData?: TokenMarketData;
}

const AssetInfos: React.FC<AssetInfosProps> = ({ token, tokenMarketData }) => {
  const { address } = useAccount();
  const owner =
    address && areAddressesEqual(token.owner, address)
      ? "You"
      : shortAddress(token.owner);

  return (
    <div className="rounded-md border p-3">
      <table className="w-full table-auto">
        <thead>
          <tr className="text-sm uppercase">
            <TableHead className="w-[120px]">Price</TableHead>
            <TableHead>Last Sale</TableHead>
            <TableHead>Top Bid</TableHead>
            <TableHead>Collection Floor</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead className="text-right">ID</TableHead>
          </tr>
        </thead>
        <tbody>
          <tr className="text-sm">
            <TableCell className="font-medium">
              {tokenMarketData?.start_amount ? (
                <div className="flex items-center space-x-2">
                  {formatEther(BigInt(tokenMarketData.start_amount))}
                  {" ETH"}
                </div>
              ) : (
                "-"
              )}
            </TableCell>
            <TableCell>
              {tokenMarketData?.last_price ? (
                <div className="flex items-center space-x-2">
                  {formatEther(BigInt(tokenMarketData.last_price))}
                  {" ETH"}
                </div>
              ) : (
                "-"
              )}
            </TableCell>
            <TableCell>
              {tokenMarketData?.top_bid.amount ? (
                <div className="flex items-center space-x-2">
                  {formatEther(BigInt(tokenMarketData.top_bid.amount))}
                  {" ETH"}
                </div>
              ) : (
                "-"
              )}
            </TableCell>
            <TableCell>-</TableCell>
            <TableCell>{owner}</TableCell>
            <TableCell className="text-right">{token.token_id}</TableCell>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AssetInfos;
