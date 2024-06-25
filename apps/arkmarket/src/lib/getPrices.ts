import type { PricesResult } from "~/types";

export default async function getPrices() {
  const response = await fetch("/api/prices");
  const data = (await response.json()) as PricesResult;

  return data;
}
