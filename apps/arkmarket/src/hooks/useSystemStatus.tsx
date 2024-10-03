import { useQuery, keepPreviousData } from "@tanstack/react-query";

import getSystemStatus from "~/lib/getSystemStatus"

interface useSystemStatusProps {}

const REFETCH_INTERVAL = 15_000;

export default function useSystemStatus({}: useSystemStatusProps) {
  const result = useQuery({
    queryKey: ["systemStatus"],
    queryFn: getSystemStatus,
    refetchInterval: REFETCH_INTERVAL,
    initialData: { status: "ok" },
  });

  return result;
}
