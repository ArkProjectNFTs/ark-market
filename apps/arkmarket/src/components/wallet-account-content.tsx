import Link from "next/link";
import {
  useAccount,
  useDisconnect,
  useStarkProfile,
} from "@starknet-react/core";

import { cn, focusableStyles, shortAddress } from "@ark-market/ui";
import { HelpCircle, Power, User, Wallet } from "@ark-market/ui/icons";
import { ThemeTabs } from "@ark-market/ui/theme";

import CopyButton from "./copy-button";
import ExternalLink from "./external-link";
import ProfilePicture from "./profile-picture";
import WalletAccountBalance from "./wallet-account-balance";

const itemCommonClassName = cn(
  "flex items-center gap-2 rounded-xs px-1.5 py-2 transition-colors hover:bg-card",
  focusableStyles,
);

interface WalletAccountContentProps {
  onClose: () => void;
}

export default function WalletAccountContent({
  onClose,
}: WalletAccountContentProps) {
  const { address, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: starkProfile } = useStarkProfile({ address });
  const isWebWallet = connector?.id === "argentWebWallet";
  const shortenedAddress = shortAddress(address ?? "0x");
  const nameOrShortAddress = starkProfile?.name ?? shortenedAddress;

  if (!address) {
    return null;
  }

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="mt-10 sm:mt-0">
        <div className="flex h-12 items-center gap-4">
          <ProfilePicture address={address} className="size-12 rounded-md" />
          <div className="flex h-full flex-col justify-between">
            <p
              className={cn(
                "text-xl font-semibold",
                starkProfile?.name === undefined && "my-auto",
              )}
            >
              {nameOrShortAddress}
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
        <div className="my-11 flex flex-col gap-2 sm:my-5">
          <Link
            href={`/wallet/${address}`}
            className={itemCommonClassName}
            onClick={onClose}
            prefetch
          >
            <User size={24} />
            <p className="font-bold">Profile</p>
          </Link>
          {isWebWallet && (
            <ExternalLink
              className={itemCommonClassName}
              href="https://web.argent.xyz"
              onClick={onClose}
            >
              <Wallet size={24} />
              <p className="font-bold">Web Wallet</p>
            </ExternalLink>
          )}
          <Link href="/" className={itemCommonClassName} onClick={onClose}>
            <HelpCircle size={24} />
            <p className="font-bold">Support</p>
          </Link>
          <button
            className={cn(itemCommonClassName)}
            onClick={() => disconnect()}
          >
            <Power size={24} />
            <p className="font-bold">Log out</p>
          </button>
        </div>
        <WalletAccountBalance address={address} />
      </div>
      <ThemeTabs className="mt-5" />
    </div>
  );
}
