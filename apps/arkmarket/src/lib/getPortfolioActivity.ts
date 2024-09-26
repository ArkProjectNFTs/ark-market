import type { ActivityType, PortfolioActivity } from "~/types";
import { env } from "~/env";

const itemsPerPage = 10;

export interface PortfolioActivityApiResponse {
  count: number;
  data: PortfolioActivity[];
  next_page: number;
}

interface GetPortfolioActivityParams {
  page?: number;
  walletAddress: string;
  activityFilters: ActivityType[];
}

export async function getPortfolioActivity({
  page,
  walletAddress,
  activityFilters,
}: GetPortfolioActivityParams) {
  const queryParams = [`items_per_page=${itemsPerPage}`];

  if (page !== undefined) {
    queryParams.push(`page=${page}`);
  }

  if (activityFilters.length > 0) {
    activityFilters.map((filter) => {
      queryParams.push(`types[]=${filter}`);
    });
  }

  const url = `${env.NEXT_PUBLIC_MARKETPLACE_API_URL}/portfolio/${walletAddress}/activity?${queryParams.join("&")}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch portfolio activity");
  }

  const result = (await response.json()) as PortfolioActivityApiResponse;

  return result;
}
