import { ImageResponse } from "next/og";

import { formatNumber, formatUnits } from "@ark-market/ui";

import CustomFonts from "~/components/custom-fonts";
import { env } from "~/env";
import getCollection from "~/lib/getCollection";
import { getCollectionTokens, getMediaSrc } from "~/lib/getCollectionTokens";

const IMAGE_GLOBAL_MARGIN = "50px";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const hasCollection = searchParams.has("collection_address");
    if (!hasCollection) {
      throw new Error("Missing collection address");
    }
    const collectionAddress = searchParams.get("collection_address") ?? "";

    const collection = await getCollection({ collectionAddress });

    if (collection === null) {
      throw new Error("Failed to fetch collection data");
    }
    const collectionTokens = await getCollectionTokens({ collectionAddress });

    if (collectionTokens.data.length === 0) {
      throw new Error("Failed to fetch collection tokens data");
    }
    const token = collectionTokens.data[0];
    const tokenMediaSrc =
      !token?.metadata?.image.includes("data:image/") &&
      token?.metadata !== undefined
        ? getMediaSrc(
            token.metadata.image,
            token.metadata.image_key,
            undefined,
            300,
            300,
          )
        : collection.image;

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
          <CustomFonts />
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
              height: "100%",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {collection.image !== undefined && (
                  <img
                    src={collection.image}
                    style={{
                      marginLeft: IMAGE_GLOBAL_MARGIN,
                      marginTop: IMAGE_GLOBAL_MARGIN,
                      borderRadius: "20px",
                      height: "250px",
                      width: "250px",
                    }}
                  />
                )}
                <p
                  style={{
                    fontWeight: 600,
                    fontSize: "135px",
                    marginLeft: IMAGE_GLOBAL_MARGIN,
                  }}
                >
                  {collection.name}
                </p>
              </div>
              <Logo />
            </div>
            <CollectionData
              ownerCount={collection.owner_count}
              tokenCount={collection.token_count}
              floor={collection.floor ?? "0"}
              totalVolume={collection.total_volume}
            />
          </div>
        </div>
      ),
      {
        width: 1500,
        height: 844,
      },
    );
  } catch {
    return new Response("Failed to generate og collection image", {
      status: 500,
    });
  }
}

function Divider() {
  return <div style={{ height: "100%", borderLeft: "1px solid white" }} />;
}

interface CollectionDataProps {
  tokenCount: number;
  ownerCount: number;
  floor: string;
  totalVolume: number;
}

function CollectionData({
  ownerCount,
  tokenCount,
  floor,
  totalVolume,
}: CollectionDataProps) {
  return (
    <div
      style={{
        padding: IMAGE_GLOBAL_MARGIN,
        display: "flex",
        alignItems: "center",
        gap: "50px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p style={{ fontSize: "40px" }}>Floor</p>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <EtherLogo />
          <p style={{ fontSize: "80px" }}>{formatUnits(floor, 18)}</p>
        </div>
      </div>
      <Divider />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p style={{ fontSize: "40px" }}>Total volume</p>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <EtherLogo />
          <p style={{ fontSize: "80px" }}>{formatNumber(totalVolume)}</p>
        </div>
      </div>
      <Divider />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p style={{ fontSize: "40px" }}>Items</p>
        <p style={{ fontSize: "80px" }}>{formatNumber(tokenCount)}</p>
      </div>
      <Divider />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p style={{ fontSize: "40px" }}>Owners</p>
        <p style={{ fontSize: "80px", fontFamily: "nitti" }}>
          {formatNumber(ownerCount)}
        </p>
      </div>
    </div>
  );
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

function EtherLogo() {
  return (
    <svg width="64" height="64" viewBox="0 0 54 54" fill="none">
      <path
        d="M10.7918 38.5504L14.3738 34.9684L27.3241 48.4147V53.3192H25.1198L10.7918 38.5504ZM7.48535 27.9698L27.3241 0.416016V9.06789L12.941 29.0168V24.8838L27.3241 30.9456V36.2359L7.48535 27.9698ZM27.3241 53.3192V48.4147L40.2743 34.9684L43.8563 38.5504L29.5284 53.3192H27.3241ZM27.3241 30.9456L41.7071 24.8838V29.0168L27.3241 9.06789V0.416016L47.1628 27.9698L27.3241 36.2359V30.9456Z"
        fill="white"
      />
    </svg>
  );
}
