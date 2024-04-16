import Explore from "./components/explore";
import { fetchCollection } from "./queries/fetchCollection";
import { fetchCollectionMarket } from "./queries/fetchCollectionMarket";

interface ExplorePageProps {
  params: {
    collectionAddress: string;
  };
}

export default async function ExplorePage({ params }: ExplorePageProps) {
  const { collectionAddress } = params;

  const initialCollectionData: unknown =
    await fetchCollection(collectionAddress);
  const initialCollectionMarketData: unknown =
    await fetchCollectionMarket(collectionAddress);

  return (
    <main className="container py-16">
      <Explore
        initialCollectionData={initialCollectionData}
        initialCollectionMarketData={initialCollectionMarketData}
        collectionAddress={collectionAddress}
      />
    </main>
  );
}
