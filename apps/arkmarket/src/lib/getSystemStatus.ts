import type { SystemStatus } from "~/types";
import { env } from "~/env";

export default async function getSystemStatus() {
  return await fetch(env.NEXT_PUBLIC_ORDERBOOK_API_URL)
    .then((response) => response.json())
    .then((data) => data as SystemStatus);
}
