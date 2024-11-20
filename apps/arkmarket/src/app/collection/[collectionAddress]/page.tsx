import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { env } from "~/env";
import getCollection from "~/lib/getCollection";
import CollectionBanner from "./components/collection-banner";
import CollectionHeader from "./components/collection-header";
import CollectionItems from "./components/collection-items";
import MobileCollectionHeader from "./components/mobile-collection-header";

interface GenerateMetadataProps {
  params: Promise<{ collectionAddress: string }>;
}

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const collectionAddress = (await params).collectionAddress;
  const collection = await getCollection({ collectionAddress });
  const platform =
    env.NEXT_PUBLIC_THEME === "unframed" ? "Unframed" : "Ark Market";
  const name = collection?.name ?? "Collection";

  return {
    title: `${name} | ${platform}`,
    openGraph: {
      images: [
        `https://ark-market-unframed.vercel.app/api/og/collection?collection_address=${collectionAddress}`,
      ],
    },
  };
}

interface CollectionPageProps {
  params: {
    collectionAddress: string;
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { collectionAddress } = params;
  const collection = await getCollection({ collectionAddress });

  if (!collection?.name) {
    return notFound();
  }

  return (
    <div className="flex min-h-[calc(100vh-var(--site-header-height))] flex-col">
      <CollectionBanner
        className="hidden md:block"
        collectionAddress={collectionAddress}
      />
      <CollectionHeader
        collectionAddress={collectionAddress}
        collection={collection}
      />
      <MobileCollectionHeader
        collectionAddress={collectionAddress}
        collection={collection}
      />
      <CollectionItems
        collectionAddress={collectionAddress}
        collectionTokenCount={collection.token_count}
      />
    </div>
  );
}
