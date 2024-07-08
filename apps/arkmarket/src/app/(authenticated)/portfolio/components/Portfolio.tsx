"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAccount } from "@starknet-react/core";

import { ScrollArea } from "@ark-market/ui/scroll-area";

import type { OwnersTokensApiResponse, Token } from "~/types";
import Media from "~/components/media";
import { env } from "~/env";

const Portfolio: React.FC = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const { address } = useAccount();

  useEffect(() => {
    if (!address) {
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${env.NEXT_PUBLIC_NFT_API_URL}/v1/owners/${address}/tokens`,
          {
            headers: {
              "x-api-key": env.NEXT_PUBLIC_NFT_API_KEY,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch portfolio tokens");
        }

        const { result } = (await response.json()) as OwnersTokensApiResponse;

        setTokens(result);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData();
  }, [address]);

  return (
    <ScrollArea className="pr-4">
      <div className="grid grid-cols-6 gap-4">
        {tokens.map((token, index) => (
          <Link
            href={`/token/${token.contract_address}/${token.token_id}`}
            key={index}
          >
            <div className="cursor-pointer rounded-md border p-2 hover:border-slate-400 hover:shadow-md">
              <div className="flex flex-col space-y-2">
                <div className="overflow-hidden rounded-md">
                  {token.metadata?.normalized.image ? (
                    <Media
                      src={token.metadata.normalized.image}
                      alt={token.token_id || "Token Image"}
                    />
                  ) : (
                    <Media
                      src="/missing.jpg"
                      alt={token.token_id || "Token Image"}
                    />
                  )}
                </div>
                <div className="space-y-1 text-sm">
                  <h3 className="font-medium leading-none">
                    {token.metadata?.normalized
                      ? token.metadata.normalized.name
                      : token.token_id}
                  </h3>
                  <p className="overflow-hidden text-ellipsis text-xs text-muted-foreground">
                    {token.contract_address}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
};

export default Portfolio;
