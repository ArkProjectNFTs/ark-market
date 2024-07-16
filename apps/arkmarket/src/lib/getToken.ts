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
  const url = `${env.NEXT_PUBLIC_MARKETPLACE_API_URL}/tokens/${contractAddress}/0x534e5f4d41494e/${tokenId}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.log("Failed to fetch token");
    return null;
  }

  const { data } = (await response.json()) as TokenApiResponse;

  return data;
}
