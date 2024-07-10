import type { Token } from "~/types";
import Media from "~/components/media";

export function TokenMedia({ token }: { token: Token }) {
  return (
    <Media
      src={
        token.metadata?.normalized.image
          ? token.metadata.normalized.image
          : "/missing.jpg"
      }
      alt={token.token_id || "Token Image"}
    />
  );
}

export default TokenMedia;
