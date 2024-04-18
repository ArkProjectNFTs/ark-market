"use client";

import React from "react";
import { useAccount } from "@starknet-react/core";
import { Web3 } from "web3";

import { TableCell, TableHead } from "@ark-market/ui/components/table";
import { areAddressesEqual, truncateString } from "@ark-market/ui/lib/utils";

import type { Token, TokenMarketData } from "~/types/schema";

interface AssetInfosProps {
  token: Token;
  tokenMarketData?: TokenMarketData;
}

const AssetInfos: React.FC<AssetInfosProps> = ({ token, tokenMarketData }) => {
  const { address } = useAccount();
  const owner =
    address && areAddressesEqual(token.owner, address)
      ? "You"
      : truncateString(token.owner, 8);
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
              {tokenMarketData?.start_amount
                ? `${Web3.utils.fromWei(
                    tokenMarketData.start_amount,
                    "ether",
                  )}  ETH`
                : "-"}
            </TableCell>
            <TableCell>
              {" "}
              {tokenMarketData?.last_price
                ? `${Web3.utils.fromWei(
                    tokenMarketData.last_price,
                    "ether",
                  )}  ETH`
                : "-"}
            </TableCell>
            <TableCell>
              {tokenMarketData?.top_bid?.amount
                ? `${Web3.utils.fromWei(
                    tokenMarketData?.top_bid?.amount,
                    "ether",
                  )}  ETH`
                : "-"}
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
