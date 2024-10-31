import type { TokenOffer } from "~/types";
import { env } from "~/env";

export interface TokenOffersApiResponse {
  count: number;
  data: TokenOffer[];
  next_page: number;
}

interface GetTokenOffersParams {
  contractAddress: string;
  page?: number;
  tokenId: string;
}

export async function getTokenOffers({
  contractAddress,
  page,
  tokenId,
}: GetTokenOffersParams) {
  const queryParams = [`items_per_page=${10}`];

  if (page !== undefined) {
    queryParams.push(`page=${page}`);
  }

  const url = `${env.NEXT_PUBLIC_MARKETPLACE_API_URL}/tokens/${contractAddress}/0x534e5f4d41494e/${tokenId}/offers?${queryParams.join("&")}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch token offers");
  }

  const result = (await response.json()) as TokenOffersApiResponse;

  return result;
}
