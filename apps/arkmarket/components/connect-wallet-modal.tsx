import type { Connector } from "@starknet-react/core";
import type { PropsWithChildren } from "react";
import { useState } from "react";
import { useConnect } from "@starknet-react/core";

import { Button } from "@ark-market/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ark-market/ui/components/dialog";
import WalletIcon from "@ark-market/ui/components/icons/wallet-icon";

export default function ConnectWalletModal({ children }: PropsWithChildren) {
  const { connectors, connectAsync } = useConnect();

  const [pendingConnectorId, setPendingConnectorId] = useState<
    string | undefined
  >(undefined);

  async function connect(connector: Connector) {
    setPendingConnectorId(connector.id);
    try {
      await connectAsync({ connector });
    } catch (error) {
      console.error(error);
    }
    setPendingConnectorId(undefined);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Connect a wallet</DialogTitle>
          <DialogDescription>
            You need a Starknet wallet to start using Ark Market.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex flex-col gap-2">
          {connectors.map((connector) => {
            const isConnecting = pendingConnectorId === connector.id;

            return (
              <Button key={connector.id} onClick={() => connect(connector)}>
                {isConnecting ? "Loading..." : connector.name}
              </Button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
