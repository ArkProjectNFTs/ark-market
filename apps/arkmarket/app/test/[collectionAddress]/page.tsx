import { siteHeaderRemHeight } from "~/components/site-header";
import CollectionBanner from "./components/collection-banner";
import CollectionFooter from "./components/collection-footer";
import CollectionHeader from "./components/collection-header";
import TokensGridWithFilters from "./components/tokens-grid-with-filters";

interface CollectionPageProps {
  params: {
    collectionAddress: string;
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { collectionAddress } = params;

  return (
    <main>
      <CollectionBanner />

      <div
        className="sticky z-10 flex flex-col bg-background"
        style={{ top: `${siteHeaderRemHeight}rem` }}
      >
        <CollectionHeader />
      </div>

      <TokensGridWithFilters />
      <CollectionFooter className="sticky bottom-0" />
    </main>
  );
}
