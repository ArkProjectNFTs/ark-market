import { notFound } from "next/navigation";

import Collection from "./components/collection";
import {
  getCollectionInfos,
  getCollectionTokens,
} from "./queries/getCollectionData";
import { collectionPageSearchParamsCache } from "./search-params";

interface CollectionPageProps {
  params: {
    collectionAddress: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function CollectionPage({
  params,
  searchParams,
}: CollectionPageProps) {
  const { collectionAddress } = params;
  // const { direction, sort } =
  //   collectionPageSearchParamsCache.parse(searchParams);
  // const collectionInfosInitialData = await getCollectionInfos({
  //   collectionAddress,
  // });

  // const collectionTokensInitialData = await getCollectionTokens({
  //   collectionAddress,
  //   sortDirection: direction,
  //   sortBy: sort,
  // });

  // if (!collectionTokensInitialData.data.length) {
  //   // TODO @YohanTz: Handle case when a collection contract is deployed but no tokens in it
  //   notFound();
  // }

  return (
    <Collection
      collectionAddress={collectionAddress}
      // collectionInfosInitialData={collectionInfosInitialData}
      // collectionTokensInitialData={collectionTokensInitialData}
    />
  );
}
