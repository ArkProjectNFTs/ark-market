import type { PropsWithChildren } from "react";
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

export default function ConnectWalletModal({ children }: PropsWithChildren) {
  const { connectors, connect } = useConnect();

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
            return (
              <Button key={connector.id} onClick={() => connect({ connector })}>
                {connector.name}
              </Button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
