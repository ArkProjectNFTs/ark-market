import type { SystemStatus } from "~/types";
import { env } from "~/env";

export default async function getSystemStatus() {
  const response = await fetch(env.NEXT_PUBLIC_ORDERBOOK_API_URL);
  const data = (await response.json()) as SystemStatus;

  return data;
}
