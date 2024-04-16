import { QueryClient, useQueryClient } from "react-query";

import Explore from "./explore/components/explore";
import { fetchCollection } from "./explore/queries/fetchCollection";
import { fetchCollectionMarket } from "./explore/queries/fetchCollectionMarket";

export default async function HomePage() {
  const initialCollectionData = await fetchCollection();
  const initialCollectionMarketData = await fetchCollectionMarket();

  return (
    <main className="container py-16">
      <Explore />
    </main>
  );
}
