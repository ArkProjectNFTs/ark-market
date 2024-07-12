import type { Token } from "~/types";
import Media from "~/components/media";

interface TokenMediaProps {
  token: Token;
}

export function TokenMedia({ token }: TokenMediaProps) {
  return (
    <Media
      src={token.metadata?.image_key ?? "/missing.jpg"}
      alt={token.token_id}
    />
  );
}

export default TokenMedia;
