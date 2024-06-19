import Link from "next/link";
import { HelpCircle, Power, Wallet } from "lucide-react";

import EthereumLogo from "@ark-market/ui/components/icons/ethereum-logo";
import { ThemeTabs } from "@ark-market/ui/components/theme";

import CopyButton from "./copy-button";
import ExternalLink from "./external-link";
import ProfilePicture from "./profile-picture";

export default function WalletAccountContent() {
  if (address === undefined) {
    return;
  }
  return (
    <>
      <div className="flex h-12 items-center gap-4">
        <ProfilePicture address={address} className="size-12 rounded-md" />

        <div className="flex h-full flex-col justify-between">
          <p
            className={cn(
              "text-xl font-semibold",
              starkProfile?.name === undefined && "my-auto",
            )}
          >
            {starkProfile?.name ?? shortenedAddress}
          </p>
          {starkProfile?.name !== undefined && (
            <div className="text- flex items-center gap-2">
              {connector !== undefined && (
                <div className="flex size-5 items-center justify-center rounded-full bg-white">
                  <img
                    src={connector.icon.dark}
                    alt={`${connector.name}`}
                    className="size-3 rounded-full"
                  />
                </div>
              )}
              <p className="text-sm">{shortenedAddress}</p>
              <CopyButton textToCopy={address} />
            </div>
          )}
        </div>
      </div>

      <div className="my-5 flex flex-col gap-2">
        <Link
          href={`/wallet/${address}`}
          className={popoverItemCommonClassName}
          onClick={closePopover}
          prefetch
        >
          <User size={24} />
          <p className="font-bold">My items</p>
        </Link>
        {isWebWallet && (
          <ExternalLink
            className={popoverItemCommonClassName}
            href="https://web.argent.xyz"
            onClick={closePopover}
          >
            <Wallet size={24} />
            <p className="font-bold">Web Wallet</p>
          </ExternalLink>
        )}
        <Link
          href="/"
          className={popoverItemCommonClassName}
          onClick={closePopover}
        >
          <Settings size={24} />
          <p className="font-bold">Account settings</p>
        </Link>
        <Link
          href="/"
          className={popoverItemCommonClassName}
          onClick={closePopover}
        >
          <HelpCircle size={24} />
          <p className="font-bold">Support</p>
        </Link>
        <button
          className={cn(popoverItemCommonClassName)}
          onClick={() => disconnect()}
        >
          <Power size={24} />
          <p className="font-bold">Log out</p>
        </button>
      </div>

      <div className="flex h-16 items-center justify-between rounded-t-lg bg-card p-4">
        <div className="flex items-center gap-2.5">
          <EthereumLogo />
          <span className="font-bold">ETH</span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <p className="text-sm font-medium">{roundedEthBalance}</p>
          <p className="text-xs text-secondary-foreground">0.00$</p>
        </div>
      </div>
      <div className="mt-0.5 flex h-16 items-center justify-between rounded-b-lg bg-card p-4">
        <div className="flex items-center gap-2.5">
          <StarknetLogo />
          <span className="font-bold">STRK</span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <p className="text-sm font-medium">{roundedStrkBalance}</p>
          <p className="text-xs text-secondary-foreground">0.00$</p>
        </div>
      </div>

      <ThemeTabs className="mt-5" />
    </>
  );
}
