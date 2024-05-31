"use client";

import type { PropsWithChildren } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  useAccount,
  useBalance,
  useDisconnect,
  useStarkProfile,
} from "@starknet-react/core";
import { Copy, HelpCircle, Power, Settings, User, Wallet } from "lucide-react";
import { useCopyToClipboard } from "usehooks-ts";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ark-market/ui/components/popover";
import { cn, focusableStyles } from "@ark-market/ui/lib/utils";

const STRK_CONTRACT_ADDRESS =
  "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d";

export default function WalletAccountPopover({ children }: PropsWithChildren) {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: starkProfile } = useStarkProfile({
    address,
  });

  const { data: ethBalance } = useBalance({ address });
  const roundedEthBalance =
    ethBalance !== undefined
      ? parseFloat(ethBalance.formatted).toFixed(4)
      : undefined;

  const { data: strkBalance } = useBalance({
    address,
    token: STRK_CONTRACT_ADDRESS,
  });
  const roundedStrkBalance =
    strkBalance !== undefined
      ? parseFloat(strkBalance.formatted).toFixed(4)
      : undefined;

  const [, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);

  const shortenedAddress = useMemo(() => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

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
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent side="bottom" align="end" className="mt-3 w-80">
        <div className="flex h-14 items-center gap-4">
          {starkProfile?.name ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="size-12 rounded-md"
              alt="Starknet Id profile"
              height={48}
              width={48}
              src={starkProfile?.profilePicture}
            />
          ) : (
            <div className="size-12 rounded-md bg-secondary" />
          )}
          <div className="flex h-full flex-col justify-between">
            <p className="text-xl font-semibold">
              {starkProfile?.name ?? shortenedAddress}
            </p>
            <div className="text- flex items-center gap-2">
              {/* TODO @YohanTz: Wallet logo */}
              <p className="text-sm">{shortenedAddress}</p>
              <button onClick={handleCopyAddress} className={focusableStyles}>
                <Copy size={16} className="text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>

        <div className="my-5 flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <User size={24} />
            <p className="font-bold">My items</p>
          </div>
          <div className="flex items-center gap-2">
            <Wallet size={24} />
            <p className="font-bold">Web Wallet</p>
          </div>
          <div className="flex items-center gap-2">
            <Settings size={24} />
            <p className="font-bold">Account settings</p>
          </div>
          <div className="flex items-center gap-2">
            <HelpCircle size={24} />
            <p className="font-bold">Support</p>
          </div>
          <button
            className={cn("flex items-center gap-2", focusableStyles)}
            onClick={() => disconnect()}
          >
            <Power size={24} />
            <p className="font-bold">Log out</p>
          </button>
        </div>

        {/* TODO @YohanTz: Change slate-900 by semantic colors when defined */}
        <div className="flex h-16 items-center justify-between rounded-t-lg bg-slate-900 p-4">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-full bg-secondary" />
            <span className="font-bold">ETH</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <p className="text-sm font-medium">{roundedEthBalance}</p>
            <p className="text-xs text-muted">0.00$</p>
          </div>
        </div>
        <div className="mt-0.5 flex h-16 items-center justify-between rounded-b-lg bg-slate-900 p-4">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-full bg-secondary" />
            <span className="font-bold">STRK</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <p className="text-sm font-medium">{roundedStrkBalance}</p>
            <p className="text-xs text-muted">0.00$</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
