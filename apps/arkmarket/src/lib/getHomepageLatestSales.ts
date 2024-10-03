import type { LatestSales } from "~/types";
import { env } from "~/env";

export interface LatestSalesApiResponse {
  data: LatestSales[];
}

export default async function getHomepageLatestSales() {
  const url = `${env.NEXT_PUBLIC_MARKETPLACE_API_URL}/last-sales`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch latest sales");
  }

  const result = (await response.json()) as LatestSalesApiResponse;

  return result;
}
