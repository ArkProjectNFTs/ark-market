import type { Token } from "~/types";
import Media from "~/components/media";

interface TokenMediaProps {
  token: Token;
}

export function TokenMedia({ token }: TokenMediaProps) {
  return (
    <Media
      src={token.metadata?.animation_url ?? token.metadata?.image_key}
      mediaKey={token.metadata?.animation_key ?? token.metadata?.image_key}
      alt={token.token_id}
    />
  );
}

export default TokenMedia;
