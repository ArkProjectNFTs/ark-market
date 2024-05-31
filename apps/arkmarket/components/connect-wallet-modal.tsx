/* eslint-disable @next/next/no-img-element */
import type { Connector } from "@starknet-react/core";
import type { PropsWithChildren } from "react";
import { useState } from "react";
import { useConnect } from "@starknet-react/core";
import { Loader2 } from "lucide-react";

import { Button } from "@ark-market/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ark-market/ui/components/dialog";

const walletIdToName = new Map([
  ["argentX", "Argent X"],
  ["braavos", "Braavos"],
]);

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
          <div className="mx-auto mb-3 mt-3 size-20 rounded-full bg-secondary" />
          <DialogTitle className="mx-auto text-xl font-semibold">
            Connect to Unframed
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 flex flex-col gap-3.5">
          {connectors.map((connector) => {
            const isConnecting = pendingConnectorId === connector.id;

            return (
              <Button
                key={connector.id}
                onClick={() => connect(connector)}
                variant="secondary"
                className="relative"
              >
                <div className="absolute left-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-[0.375rem] bg-background">
                  <img
                    src={connector.icon.dark}
                    className="size-5"
                    alt={`${connector.name} icon`}
                  />
                </div>
                {walletIdToName.get(connector.id) ?? connector.name}
                {isConnecting && (
                  <Loader2
                    className="absolute right-2.5 top-3 animate-spin"
                    size={24}
                  />
                )}
              </Button>
            );
          })}
        </div>
        <p className="text-sm text-muted-foreground">
          By using “marketplace_name”, you agree to our Terms of Service and our
          Privacy Policy.
        </p>
      </DialogContent>
    </Dialog>
  );
}
