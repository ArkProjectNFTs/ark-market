"use client";

import { useMemo } from "react";
import Image from "next/image";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useStarkName,
} from "@starknet-react/core";

import { Button } from "@ark-market/ui/components/button";

function ConnectWallet() {
  const { connectors, connect } = useConnect();
  return (
    <div className="inline-flex flex-row gap-2">
      {connectors.map((connector) => {
        return (
          <Button key={connector.id} onClick={() => connect({ connector })}>
            {connector.name}
          </Button>
        );
      })}
    </div>
  );
}

export function UserNav() {
  const { address } = useAccount();
  const { data: starkName } = useStarkName({ address });
  const { disconnect } = useDisconnect();

  const shortenedAddress = useMemo(() => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  if (address === undefined) {
    return <ConnectWallet />;
  }

  return (
    <div className="flex items-center space-x-3">
      <span className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full">
        <Image
          className="aspect-square h-full w-full"
          src="/01.png"
          width={36}
          height={36}
          alt="avatar"
        />
      </span>
      <div>
        <p className="text-sm text-muted-foreground">
          {starkName ?? shortenedAddress}
        </p>
      </div>
      <Button onClick={() => disconnect()}>Disconnect</Button>
    </div>
  );
}
