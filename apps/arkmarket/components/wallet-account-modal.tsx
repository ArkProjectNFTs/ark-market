"use client";

import type { PropsWithChildren } from "react";
import { useMemo } from "react";
import Image from "next/image";
import {
  useAccount,
  useBalance,
  useDisconnect,
  useStarkName,
} from "@starknet-react/core";

import { Button } from "@ark-market/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@ark-market/ui/components/dialog";

export default function WalletAccountModal({ children }: PropsWithChildren) {
  const { address } = useAccount();
  const { data: starkName } = useStarkName({ address });
  const { disconnect } = useDisconnect();
  const { data } = useBalance({ address });
  const roundedBalance =
    data !== undefined ? parseFloat(data.formatted).toFixed(4) : undefined;

  const shortenedAddress = useMemo(() => {
    if (!address) return "";
    return `${address.slice(0, 7)}...${address.slice(-5)}`;
  }, [address]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <div className="flex flex-col gap-4">
          <Image
            className="mx-auto aspect-square"
            src="/01.png"
            width={68}
            height={68}
            alt="avatar"
          />
          <div className="text-center">
            <p className="text-lg font-semibold">
              {starkName ?? shortenedAddress}
            </p>
            {roundedBalance !== undefined && (
              <p className="text-sm text-muted-foreground">
                {roundedBalance} ETH
              </p>
            )}
          </div>
          <Button onClick={() => disconnect()}>Disconnect</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
