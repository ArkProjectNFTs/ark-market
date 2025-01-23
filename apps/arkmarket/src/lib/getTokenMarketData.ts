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
    `${env.NEXT_PUBLIC_MARKETPLACE_API_URL}/tokens/${contractAddress}/${tokenId}/marketdata`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch tokenMarketData");
  }

  const { data } = (await response.json()) as TokenMarketDataApiResponse;

  return data;
}
