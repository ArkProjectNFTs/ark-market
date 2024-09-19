import type { PortfolioStats } from "~/types";
import { env } from "~/env";

export interface PortfolioStatsApiResponse {
  data: PortfolioStats;
}

interface GetPortfolioStatsParams {
  address: string;
}

export default async function getPortfolioStats({
  address,
}: GetPortfolioStatsParams) {
  const response = await fetch(
    `${env.NEXT_PUBLIC_MARKETPLACE_API_URL}/portfolio/${address}/stats`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch portfolio stats data");
  }

  const { data } = (await response.json()) as PortfolioStatsApiResponse;

  return data;
}
