import { useQuery } from "@tanstack/react-query";

import getSystemStatus from "~/lib/getSystemStatus"


const REFETCH_INTERVAL = 15_000;

export default function useSystemStatus() {
  const result = useQuery({
    queryKey: ["systemStatus"],
    queryFn: getSystemStatus,
    refetchInterval: REFETCH_INTERVAL,
    initialData: { status: "ok" },
  });

  return result;
}
