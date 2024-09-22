import { FileSignature } from "@ark-market/ui/icons";

import type { TokenMetadata } from "~/types";
import Media from "~/components/media";
import usePrices from "~/hooks/usePrices";

interface ToastRejectedTransactionContentProps {
  collectionName: string;
  formattedPrice: string;
  price: bigint;
  tokenId: string;
  tokenMetadata?: TokenMetadata;
}

export default function ToastRejectedTransactionContent({
  collectionName,
  formattedPrice,
  price,
  tokenId,
  tokenMetadata,
}: ToastRejectedTransactionContentProps) {
  const { convertInUsd } = usePrices();
  const priceInUsd = convertInUsd({ amount: price });

  return (
    <div className="mt-5 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Media
            src={tokenMetadata?.animation_url ?? tokenMetadata?.image}
            alt={tokenMetadata?.name ?? `${collectionName} #${tokenId}`}
            mediaKey={tokenMetadata?.image_key}
            height={84}
            width={84}
            className="size-10 rounded-xs object-contain"
          />
          <p className="font-medium">
            {tokenMetadata?.name ?? `${collectionName} #${tokenId}`}
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
