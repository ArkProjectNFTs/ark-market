import type { Token } from "~/types";
import Media from "~/components/media";

interface TokenMediaProps {
  token: Token;
  tokenId: string;
}

export function TokenMedia({ token, tokenId }: TokenMediaProps) {
  return (
    <Media src={token.metadata?.image_key ?? "/missing.jpg"} alt={tokenId} />
  );
}

export default TokenMedia;
