import { FileSignature } from "@ark-market/ui/icons";

import type { WalletToken } from "~/queries/getWalletData";
import type { CollectionToken, Token } from "~/types";
import Media from "~/components/media";
import usePrices from "~/hooks/usePrices";

interface ToastRejectedTransactionContentProps {
  price: bigint;
  token: Token | CollectionToken | WalletToken;
  formattedPrice: string;
}

export default function ToastRejectedTransactionContent({
  token,
  price,
  formattedPrice,
}: ToastRejectedTransactionContentProps) {
  const { convertInUsd } = usePrices();
  const priceInUsd = convertInUsd({ amount: price });

  return (
    <div className="mt-5 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Media
            src={token.metadata?.animation_url ?? token.metadata?.image}
            alt={
              token.metadata?.name ??
              `${token.collection_name} #${token.token_id}`
            }
            mediaKey={token.metadata?.image_key}
            height={84}
            width={84}
            className="size-10 rounded-xs object-contain"
          />
          <p className="font-medium">
            {token.metadata?.name ??
              `${token.collection_name} #${token.token_id}`}
          </p>
        </div>
        <div className="text-end">
          <p className="font-medium">{formattedPrice} ETH</p>
          <p className="text-xs font-medium">${priceInUsd}</p>
        </div>
      </div>
      <div className="flex h-10 w-full items-center rounded-xs bg-slate-600 px-4 text-white opacity-50">
        <FileSignature className="size-4" />
        <p className="w-full text-center text-sm">
          You didn't sign the transaction in your wallet
        </p>
      </div>
    </div>
  );
}
