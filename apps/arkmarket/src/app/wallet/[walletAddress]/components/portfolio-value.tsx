"use client";

import { parseEther } from "viem";

import { formatUnits } from "@ark-market/ui";
import { Skeleton } from "@ark-market/ui/skeleton";

import usePortfolioStats from "~/hooks/usePortfolioStats";
import usePrices from "~/hooks/usePrices";

interface PortfolioValueProps {
  address: string;
}

export default function PortfolioValue({ address }: PortfolioValueProps) {
  const { data } = usePortfolioStats({ address });
  const { convertInUsd, isLoading } = usePrices();

  const totalValue = formatUnits(data.total_value, 18);

  const totalValueInUsd = convertInUsd({
    amount: parseEther(totalValue),
  });

  return (
    <div className="flex h-16 min-w-64 items-center rounded-lg bg-card px-3.5">
      <div className="flex w-full flex-col gap-1">
        <div className="text-sm leading-none text-secondary-foreground">
          Portfolio value
        </div>
        <div className="flex items-end justify-between gap-5">
          <div className="text-md flex gap-1 text-lg font-semibold leading-none">
            {totalValue} <div className="text-secondary-foreground">ETH</div>
          </div>
          {isLoading ? (
            <Skeleton className="h-4 w-20" />
          ) : (
            <div className="leading-none text-muted-foreground">
              ${totalValueInUsd}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
