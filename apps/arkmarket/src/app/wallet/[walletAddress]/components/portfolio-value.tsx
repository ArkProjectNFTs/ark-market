import EthereumLogo2 from "@ark-market/ui/icons/ethereum-logo-2";

import { ETH } from "~/constants/tokens";
import useBalance from "~/hooks/useBalance";
import usePrices from "~/hooks/usePrices";

export default function PortfolioValue() {
  const { convertInUsd, isLoading: isLoadingPrices } = usePrices();
  const { data: ethBalance, isLoading: isLoadingBalance } = useBalance({
    token: ETH,
  });
  const ethBalanceInUsd = convertInUsd({ amount: ethBalance.value });

  if (isLoadingPrices || isLoadingBalance) {
    return null;
  }

  return (
    <div className="flex rounded-lg bg-card px-2.5 py-2">
      <div className="flex items-center gap-1">
        <div className="flex flex-col">
          <p className="text-sm text-secondary-foreground">Portfolio value</p>
          <p className="text-md flex items-center space-x-1.5 font-semibold">
            <EthereumLogo2 />
            <div className="text-xl">
              {ethBalance.rounded}{" "}
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
