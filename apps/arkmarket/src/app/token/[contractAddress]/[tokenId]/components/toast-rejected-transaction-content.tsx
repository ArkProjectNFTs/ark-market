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
    <div className="mt-5 flex flex-col gap-2">
      <div className="font-numbers flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Media
            src={tokenMetadata?.animation_url ?? tokenMetadata?.image}
            alt={tokenMetadata?.name ?? `${collectionName} #${tokenId}`}
            mediaKey={tokenMetadata?.image_key}
            height={84}
            width={84}
            className="size-10 rounded-xs object-contain"
          />
          <p className="text-base font-medium">
            {tokenMetadata?.name ?? `${collectionName} #${tokenId}`}
          </p>
        </div>
        <div className="text-end">
          <p className="text-base font-medium">{formattedPrice} ETH</p>
          <p className="text-xs font-medium text-muted-foreground">
            ${priceInUsd}
          </p>
        </div>
      </div>
      <p className="text-sm font-medium text-[#EF4444]">
        You didn't sign the transaction in your wallet
      </p>
    </div>
  );
}
