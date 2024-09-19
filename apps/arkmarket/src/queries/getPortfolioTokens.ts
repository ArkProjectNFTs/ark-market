import type { PortfolioToken } from "~/types";
import { env } from "~/env";

const itemsPerPage = 50;

export interface PorfolioTokensApiResponse {
  data: PortfolioToken[];
  next_page?: number;
  token_count: number;
}

interface GetPortfolioTokensParams {
  page?: number;
  walletAddress: string;
  collectionAddress?: string;
}

export async function getPortfolioTokens({
  page,
  walletAddress,
  collectionAddress,
}: GetPortfolioTokensParams) {
  const queryParams = [`items_per_page=${itemsPerPage}`];

  if (page !== undefined) {
    queryParams.push(`page=${page}`);
  }

  if (collectionAddress) {
    queryParams.push(`collection=${collectionAddress}`);
  }

  const url = `${env.NEXT_PUBLIC_MARKETPLACE_API_URL}/portfolio/${walletAddress}?${queryParams.join("&")}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.error(url, response.status);

    return {
      data: [],
      next_page: null,
      token_count: 0,
    };
  }

  const result = (await response.json()) as PorfolioTokensApiResponse;

  return result;
}
