import type { TokenMarketData } from "~/types";
import { env } from "~/env";

export interface TokenMarketDataApiResponse {
  data: TokenMarketData;
}

interface GetTokenMarketParams {
  contractAddress: string;
  tokenId: string;
}

export default async function getTokenMarketData({
  contractAddress,
  tokenId,
}: GetTokenMarketParams) {
  const response = await fetch(
    `${env.NEXT_PUBLIC_MARKETPLACE_API_URL}/tokens/${contractAddress}/0x534e5f4d41494e/${tokenId}/marketdata`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    console.log("Failed to fetch data");
    return null;
  }

  const { data } = (await response.json()) as TokenMarketDataApiResponse;

  return data;
}
