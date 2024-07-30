import type { PortfolioCollection } from "~/types";
import { env } from "~/env";

const itemsPerPage = 50;

export interface PortfolioCollectionsApiResponse {
  data: PortfolioCollection[];
  next_page?: number;
  collection_count: number;
  token_count: number;
}

interface GetPortfolioCollectionsParams {
  page?: number;
  walletAddress: string;
}

export async function getWalletCollections({
  page,
  walletAddress,
}: GetPortfolioCollectionsParams) {
  const queryParams = [`items_per_page=${itemsPerPage}`];

  if (page !== undefined) {
    queryParams.push(`page=${page}`);
  }

  const url = `${env.NEXT_PUBLIC_MARKETPLACE_API_URL}/portfolio/${walletAddress}/collections?${queryParams.join("&")}`;

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
      collection_count: 0,
      token_count: 0,
    };
  }

  const result = (await response.json()) as PortfolioCollectionsApiResponse;

  return result;
}
