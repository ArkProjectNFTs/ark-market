"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAccount } from "@starknet-react/core";

import { ScrollArea } from "@ark-market/ui/components/scroll-area";

import Media from "~/components/media";
import { env } from "~/env";

const Portfolio: React.FC = () => {
  const [tokens, setTokens] = useState([]);
  const { address } = useAccount();
  useEffect(() => {
    const fetchData = async () => {
      if (!address) {
        return;
      }
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
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setTokens(data.result);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [address]);

  return (
    <ScrollArea className="-mr-4 h-[700px] pr-4">
      <div className="grid h-[700px] grid-cols-6 gap-4">
        {tokens.map((token: any, index) => (
          <Link
            href={`/assets/${token.contract_address}/${token.token_id}`}
            key={index}
          >
            <div className="cursor-pointer rounded-md border p-2 hover:border-slate-400 hover:shadow-md">
              <div className="flex flex-col space-y-2">
                <div className="overflow-hidden rounded-md">
                  {token.metadata?.normalized?.image ? (
                    <Media
                      url={token.metadata.normalized.image}
                      name={token.token_id || "Token Image"}
                    />
                  ) : (
                    <Media
                      url="/missing.jpg"
                      name={token.token_id || "Token Image"}
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
