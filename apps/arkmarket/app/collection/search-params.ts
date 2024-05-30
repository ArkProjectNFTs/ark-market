import { createSearchParamsCache, parseAsStringLiteral } from "nuqs/server";

export const collectionSortDirectionKey = "direction";
export const collectionSortDirectionsValues = ["asc", "desc"] as const;
export const collectionSortDirectionsParser = parseAsStringLiteral(
  collectionSortDirectionsValues,
).withDefault("asc");
export type CollectionSortDirection =
  (typeof collectionSortDirectionsValues)[number];

export const collectionSortByKey = "sort";
export const collectionSortByValues = ["price"] as const;
export const collectionSortByParser = parseAsStringLiteral(
  collectionSortByValues,
).withDefault("price");
export type CollectionSortBy = (typeof collectionSortByValues)[number];

export const collectionPageSearchParamsCache = createSearchParamsCache({
  [collectionSortDirectionKey]: collectionSortDirectionsParser,
  [collectionSortByKey]: collectionSortByParser,
});
