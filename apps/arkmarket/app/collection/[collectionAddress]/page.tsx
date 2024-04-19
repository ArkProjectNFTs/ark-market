import Collection from "./components/collection";
import { fetchTokensMarketdata } from "./queries/fetchTokensMarketdata";
import { fetchTokensMetadata } from "./queries/fetchTokensMetadata";

interface CollectionPageProps {
  params: {
    collectionAddress: string;
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { collectionAddress } = params;

  const initialCollectionData: unknown =
    await fetchTokensMetadata(collectionAddress);
  const initialCollectionMarketData: unknown =
    await fetchTokensMarketdata(collectionAddress);

  return (
    <main className="container py-16">
      <Collection
        initialCollectionData={initialCollectionData}
        initialCollectionMarketData={initialCollectionMarketData}
        collectionAddress={collectionAddress}
      />
    </main>
  );
}
