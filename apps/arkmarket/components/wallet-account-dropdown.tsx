"use client";

import type { PropsWithChildren } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAccount, useDisconnect } from "@starknet-react/core";
import { useCopyToClipboard } from "usehooks-ts";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ark-market/ui/components/dropdown-menu";

export default function WalletAccountDropdown({ children }: PropsWithChildren) {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const [, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);

  function handleCopyAddress() {
    if (address === undefined) {
      return;
    }

    copy(address)
      .then(() => {
        setCopied(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="center">
        <DropdownMenuItem asChild>
          <Link href="/portfolio">Portfolio</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyAddress}>
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => disconnect()}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
