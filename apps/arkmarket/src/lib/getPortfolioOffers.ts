import type { PortfolioOffers } from "~/types";
import { env } from "~/env";

const itemsPerPage = 10;

export const portfolioOffersTypeValues = ["made", "received"] as const;

export type PortfolioOffersTypeValues =
  (typeof portfolioOffersTypeValues)[number];

export interface PortfolioOffersApiResponse {
  count: number;
  data: PortfolioOffers[];
  next_page: number | null;
}

interface GetPortfolioOffersParams {
  page?: number;
  walletAddress: string;
  offerType: PortfolioOffersTypeValues;
}

export async function getPortfolioOffers({
  page,
  walletAddress,
  offerType,
}: GetPortfolioOffersParams) {
  const queryParams = [`items_per_page=${itemsPerPage}`, `type=${offerType}`];

  if (page !== undefined) {
    queryParams.push(`page=${page}`);
  }

  const url = `${env.NEXT_PUBLIC_MARKETPLACE_API_URL}/portfolio/${walletAddress}/offers?${queryParams.join("&")}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch portfolio offers");
  }

  const result = (await response.json()) as PortfolioOffersApiResponse;

  return result;
}
