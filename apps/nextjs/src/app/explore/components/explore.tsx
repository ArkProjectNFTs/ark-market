"use client";

import React from "react";
import { useQuery } from "react-query";

import { fetchCollection } from "../queries/fetchCollection";
import { fetchCollectionMarket } from "../queries/fetchCollectionMarket";
import { mergeTokenData } from "../utils";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function Explore() {
  const {
    data: collectionData,
    error: collectionDataError,
    isLoading: collectionDataIsLoading,
  }: any = useQuery("tokens", fetchCollection);

  const {
    data: collectionMarketData,
    error: collectionMarketError,
    isLoading: collectionMarketIsLoading,
  }: any = useQuery("collectionMarket", fetchCollectionMarket);

  if (collectionDataIsLoading || collectionMarketIsLoading) {
    return <div>Loading...</div>;
  }

  if (collectionDataError || collectionMarketError) {
    return (
      <div>
        Error missing data:{" "}
        {collectionDataError
          ? collectionDataError.message
          : collectionMarketError}
      </div>
    );
  }

  const tokenWithMarketData = mergeTokenData(
    collectionData.result,
    collectionMarketData,
  );
  return <DataTable data={tokenWithMarketData} columns={columns} />;
}
