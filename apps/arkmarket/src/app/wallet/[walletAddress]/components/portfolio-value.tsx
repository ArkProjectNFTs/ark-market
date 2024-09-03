import { Ethereum } from "@ark-market/ui/icons";

import { ETH } from "~/constants/tokens";
import useBalance from "~/hooks/useBalance";
import usePrices from "~/hooks/usePrices";

interface PortfolioValueProps {
  address?: string;
}

export default function PortfolioValue({ address }: PortfolioValueProps) {
  const { data: ethBalance, isPending } = useBalance({ address, token: ETH });
  const { convertInUsd, isLoading: isLoadingPrices } = usePrices();
  const ethBalanceInUsd = convertInUsd({ amount: ethBalance?.value });

  if (isLoadingPrices || isPending) {
    return null;
  }

  return (
    <div className="flex rounded-lg bg-card px-2.5 py-2">
      <div className="flex items-center gap-1">
        <div className="flex flex-col">
          <p className="text-sm text-secondary-foreground">Portfolio value</p>
          <p className="text-md flex items-center space-x-1.5 font-semibold">
            <Ethereum />
            <div className="text-xl">
              {ethBalance?.rounded}{" "}
              <span className="text-secondary-foreground">ETH</span>
            </div>
          </p>
        </div>
      </div>

      <div className="ml-10 hidden items-end sm:flex">
        <span className="text-muted-foreground">${ethBalanceInUsd}</span>
      </div>
    </div>
  );
}
