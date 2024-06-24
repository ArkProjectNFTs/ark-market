import type { PricesResult } from "~/types";

export default async function getPrices() {
  return await fetch("/api/prices")
    .then((response) => response.json())
    .then((data) => data as PricesResult);
}
