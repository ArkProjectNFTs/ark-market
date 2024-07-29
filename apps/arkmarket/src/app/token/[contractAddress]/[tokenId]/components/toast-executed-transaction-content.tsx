import Media from "~/components/media";
import { Token } from "~/types";

interface ToastExecutedTransactionContentProps {
  token: Token;
  formattedPrice: string;
}

export default function ToastExecutedTransactionContent({
  token,
  formattedPrice,
}: ToastExecutedTransactionContentProps) {
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
          <p className="text-xs font-medium">$---</p>
        </div>
      </div>
    </div>
  );
}
