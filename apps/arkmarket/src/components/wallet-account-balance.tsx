import { Ethereum2, Starknet2 } from "@ark-market/ui/icons";

import { ETH, STRK } from "~/constants/tokens";
import useBalance from "~/hooks/useBalance";
import usePrices from "~/hooks/usePrices";

interface WalletAccountBalanceProps {
  address: string;
}

export default function WalletAccountBalance({
  address,
}: WalletAccountBalanceProps) {
  const { convertInUsd } = usePrices();
  const { data: ethBalance } = useBalance({ address, token: ETH });
  const { data: strkBalance } = useBalance({ address, token: STRK });

  const ethBalanceInUsd = convertInUsd({
    amount: ethBalance?.value,
    token: "ethereum",
  });
  const strkBalanceInUsd = convertInUsd({
    amount: strkBalance?.value,
    token: "starknet",
  });

  if (!address) {
    return null;
  }

  return (
    <>
      <div className="flex h-16 items-center justify-between rounded-t-lg bg-card p-4">
        <div className="flex items-center gap-2.5">
          <Ethereum2 />
          <span className="font-bold">ETH</span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <p className="text-sm font-medium">{ethBalance?.rounded}</p>
          <p className="text-xs text-secondary-foreground">
            ${ethBalanceInUsd}
          </p>
        </div>
      </div>
      <div className="mt-0.5 flex h-16 items-center justify-between rounded-b-lg bg-card p-4">
        <div className="flex items-center gap-2.5">
          <Starknet2 />
          <span className="font-bold">STRK</span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <p className="text-sm font-medium">{strkBalance?.rounded}</p>
          <p className="text-xs text-secondary-foreground">
            ${strkBalanceInUsd}
          </p>
        </div>
      </div>
    </>
  );
}
