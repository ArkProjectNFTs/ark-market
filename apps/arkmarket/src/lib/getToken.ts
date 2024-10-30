import type { Token } from "~/types";
import { env } from "~/env";

export interface TokenApiResponse {
  data: Token;
}

interface GetCollectionTokenProps {
  contractAddress: string;
  tokenId: string;
}

export default async function getToken({
  contractAddress,
  tokenId,
}: GetCollectionTokenProps) {
  const url = `${env.NEXT_PUBLIC_MARKETPLACE_API_URL}/tokens/${contractAddress}/0x00000000000000000000000000000000000000000000000000534e5f4d41494e/${tokenId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch token");
  }

  const { data } = (await response.json()) as TokenApiResponse;

  return data;
}
