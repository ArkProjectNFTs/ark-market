import type { MouseEvent } from "react";
import type { AccountInterface } from "starknet";
import { useEffect, useState } from "react";

import { useConnectWalletStore } from "~/app/stores/connect-wallet";

interface UseConnectWalletParams {
  account?: AccountInterface;
  onConnect: () => void;
}

export default function useConnectWallet({
  account,
  onConnect,
}: UseConnectWalletParams) {
  const { setIsOpen } = useConnectWalletStore();
  const [isConnecting, setIsConnecting] = useState(false);

  const ensureConnect = (e: MouseEvent<HTMLElement>) => {
    if (!account) {
      e.preventDefault();
      setIsOpen(true);
      setIsConnecting(true);
    }
  };

  useEffect(() => {
    if (account && isConnecting) {
      onConnect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return {
    ensureConnect,
    isConnecting,
  };
}
