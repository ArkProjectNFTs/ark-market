import { ImageResponse } from "next/og";

import { env } from "~/env";
import { getMediaSrc } from "~/lib/getCollectionTokens";
import getToken from "~/lib/getToken";

const IMAGE_GLOBAL_MARGIN = "50px";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const hasCollection = searchParams.has("collection_address");
    if (!hasCollection) {
      throw new Error("Missing collection_address param");
    }
    const hasTokenId = searchParams.has("token_id");
    if (!hasTokenId) {
      throw new Error("Missing token_id param");
    }
    const collectionAddress = searchParams.get("collection_address") ?? "";
    const tokenId = searchParams.get("token_id") ?? "";

    const token = await getToken({
      contractAddress: collectionAddress,
      tokenId,
    });

    const tokenMediaSrc =
      !token.metadata?.image.includes("data:image/") &&
      token.metadata !== undefined
        ? getMediaSrc(
            token.metadata.image,
            token.metadata.image_key,
            token.metadata.image_key_540_540,
            300,
            300,
          )
        : undefined;

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            position: "relative",
            color: "white",
            background: "black",
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          {tokenMediaSrc !== undefined && (
            <img
              src={tokenMediaSrc}
              style={{
                inset: "0",
                position: "absolute",
                height: "100%",
                width: "100%",
                objectFit: "cover",
                filter: "blur(36px)",
              }}
            />
          )}
          <div
            style={{
              background: "#000",
              opacity: "0.5",
              position: "absolute",
              height: "100%",
              width: "100%",
              inset: "0",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%",
            }}
          >
            {tokenMediaSrc !== undefined && (
              <img
                src={tokenMediaSrc}
                style={{
                  height: "548px",
                  width: "548px",
                  objectFit: "cover",
                  borderRadius: "20px",
                }}
              />
            )}
            <p style={{ fontSize: "80px", fontWeight: 500 }}>
              {token.metadata?.name ??
                `${token.collection_name} #${token.token_id}`}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              position: "absolute",
              top: "0",
              right: "0",
            }}
          >
            <Logo />
          </div>
        </div>
      ),
      {
        width: 1500,
        height: 844,
      },
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return new Response(e.message, { status: 500 });
  }
}

function Logo() {
  if (env.NEXT_PUBLIC_THEME !== "unframed") {
    return null;
  }
  return (
    <svg
      width="139"
      height="160"
      viewBox="0 0 139 160"
      fill="none"
      style={{
        marginRight: IMAGE_GLOBAL_MARGIN,
        marginTop: IMAGE_GLOBAL_MARGIN,
      }}
    >
      <path
        d="M18.6664 119.399V80.313H41.5165V104.366L18.6664 119.399ZM0.74707 57.5831V0.938889L41.5165 40.5057V69.0082L0.74707 57.5831ZM41.6367 18.4974H69.4177V40.5057H57.0305L41.6367 18.4974ZM92.1475 0.938889H138.569L97.7999 40.5057H82.5264L92.1475 0.938889ZM120.65 41.107V80.1927H97.7999V56.14L120.65 41.107ZM138.569 102.923V159.567L97.7999 120V91.4975L138.569 102.923ZM97.6797 142.008H69.8987V120H82.2859L97.6797 142.008ZM47.1689 159.567H0.74707L41.5165 120H56.79L47.1689 159.567Z"
        fill="white"
      />
    </svg>
  );
}
