import { parseAsStringLiteral } from "nuqs";

import type { TokenActivity, TokenActivityType } from "~/types";
import { env } from "~/env";
import { tokenActivityTypes } from "~/types";

export const tokenActivityFilterKey = "activityFilter";
export const TokenActivityFiltersParser =
  parseAsStringLiteral(tokenActivityTypes);

export interface TokenActivityApiResponse {
  data: TokenActivity[];
  count: number;
  next_page: number;
}

interface GetTokenActivityParams {
  activityFilter: TokenActivityType | null;
  contractAddress: string;
  page?: number;
  tokenId: string;
}

export default async function getTokenActivity({
  activityFilter,
  contractAddress,
  page,
  tokenId,
}: GetTokenActivityParams) {
  const queryParams = [`items_per_page=${30}`];

  if (page !== undefined) {
    queryParams.push(`page=${page}`);
  }

  if (activityFilter !== null) {
    queryParams.push(`types[]=${activityFilter}`);
  }

  const url = `${env.NEXT_PUBLIC_MARKETPLACE_API_URL}/tokens/${contractAddress}/0x534e5f4d41494e/${tokenId}/activity?${queryParams.join("&")}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch token activity");
  }

  const result = (await response.json()) as TokenActivityApiResponse;

  return result;
}
