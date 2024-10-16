"use client";

import { useMemo } from 'react';
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import {
  cn,
  ellipsableStyles,
  focusableStyles,
  formatUnits,
} from "@ark-market/ui";
import { VerifiedIcon } from "@ark-market/ui/icons";

import Media from "~/components/media";
import getHomepageTrendingNow from "~/lib/getHomepageTrendingNow";
import TrendingNowCard from "./trending-now-card";

interface Collection {
  address: string;
  name: string;
  image: string;
  first_nft?: string;
  second_nft?: string;
  third_nft?: string;
}

interface CollectionImageProps {
  src?: string;
  alt: string;
}

const CollectionImage: React.FC<CollectionImageProps> = ({ src, alt }) => (
  src ? (
    <div className="w-full overflow-hidden rounded-sm">
      <Image
        height={150}
        width={150}
        className="aspect-square w-full transition-transform group-hover:scale-110"
        alt={alt}
        src={src}
      />
    </div>
  ) : (
    <div className="aspect-square w-full rounded-sm bg-secondary" />
  )
);

interface CollectionItemProps {
  collection: Collection;
}

const CollectionItem: React.FC<CollectionItemProps> = ({ collection }) => (
  <Link
    href={`/collection/${collection.address}`}
    className={cn(
      "group block rounded-lg bg-card p-5",
      focusableStyles,
    )}
  >
    <div className="grid grid-cols-2 gap-7 sm:grid-cols-3">
      <CollectionImage src={collection.second_nft} alt={collection.name} />
      <CollectionImage src={collection.first_nft} alt={collection.name} />
      <CollectionImage src={collection.third_nft} alt={collection.name} />
    </div>

    <div className="mt-6 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 overflow-hidden">
        <Image
          src={collection.image}
          height={64}
          width={64}
          alt={collection.name}
          className="flex-shrink-0 rounded-sm"
        />
        <div className="flex flex-col justify-between gap-2 overflow-hidden">
          <div className="flex items-center gap-2">
            <h4
              className={cn(
                "text-xl font-semibold",
                ellipsableStyles,
              )}
            >
              {collection.name}
            </h4>
            <VerifiedIcon className="flex-shrink-0 text-primary" />
          </div>

          <p className="font-medium sm:hidden">
            1.6 ETH{" "}
            <span className="font-bold text-green-500">
              + 0,02%
            </span>
          </p>
        </div>
      </div>
      <div className="hidden flex-shrink-0 flex-col items-end sm:flex">
        <p className="text-sm font-medium text-muted-foreground">
          Floor price
        </p>
        <p className="text-end font-medium">
          1.6 ETH{" "}
          <span className="font-bold text-green-500">
            + 0,02%
          </span>
        </p>
      </div>
    </div>
  </Link>
);

const TrendingNow: React.FC = () => {
  const trendingItems = useMemo(() => {
    if (homepageConfig.trendingNow.length === 0) {
      return null;
    }

    return homepageConfig.trendingNow.map((collection: Collection, index: number) => (
      <CarouselItem
        key={collection.address || index}
        className="basis-[calc(100%-3rem)] md:basis-1/2 lg:basis-1/2 xl:basis-1/3 2xl:basis-1/4"
      >
        <CollectionItem collection={collection} />
      </CarouselItem>
    ));
  }, []);

  if (!trendingItems) {
export default function TrendingNow() {
  const { data } = useQuery({
    queryKey: ["home-page-trending"],
    queryFn: () => getHomepageTrendingNow(),
    refetchInterval: 10_000,
  });

  if (data === undefined || data.data.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-3xl font-semibold">Trending now</h2>
      <Carousel
        className="mt-8"
        plugins={[WheelGesturesPlugin()]}
        opts={{ skipSnaps: true }}
      >
        <CarouselContent>
          {trendingItems}
        </CarouselContent>
      </Carousel>
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
        {data.data.map((collection, index) => {
          return (
            <React.Fragment key={index}>
              {index === 0 && (
                <div className="md:hidden">
                  <TrendingNowCard />
                </div>
              )}
              {index === 2 && (
                <div className="hidden md:block">
                  <TrendingNowCard />
                </div>
              )}
              <div>
                <Link
                  href={`/collection/${collection.collection_address}`}
                  className={cn(
                    "group block rounded-lg border border-border bg-card p-5 transition-transform hover:scale-[1.02]",
                    focusableStyles,
                  )}
                >
                  <div className="grid grid-cols-2 gap-7 sm:grid-cols-3">
                    <div className="w-full overflow-hidden rounded-sm">
                      <Media
                        height={150}
                        width={150}
                        className="aspect-square w-full object-contain transition-transform group-hover:scale-110"
                        alt={
                          collection.preview_nfts[0].metadata?.name ?? "Unknown"
                        }
                        src={collection.preview_nfts[0].metadata?.image}
                        mediaKey={
                          collection.preview_nfts[0].metadata?.image_key
                        }
                      />
                    </div>
                    <div className="w-full overflow-hidden rounded-sm">
                      <Media
                        height={150}
                        width={150}
                        className="aspect-square w-full object-contain transition-transform group-hover:scale-110"
                        alt={
                          collection.preview_nfts[1].metadata?.name ?? "Unknown"
                        }
                        src={collection.preview_nfts[1].metadata?.image}
                        mediaKey={
                          collection.preview_nfts[1].metadata?.image_key
                        }
                      />
                    </div>
                    <div className="hidden w-full overflow-hidden rounded-sm sm:block">
                      <Media
                        height={150}
                        width={150}
                        className="aspect-square w-full object-contain transition-transform group-hover:scale-110"
                        alt={
                          collection.preview_nfts[2].metadata?.name ?? "Unknown"
                        }
                        src={collection.preview_nfts[2].metadata?.image}
                        mediaKey={
                          collection.preview_nfts[2].metadata?.image_key
                        }
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <Media
                        src={collection.collection_image}
                        height={64}
                        width={64}
                        alt={collection.collection_name}
                        className="flex-shrink-0 rounded-sm"
                      />
                      <div className="flex flex-col justify-between gap-2 overflow-hidden">
                        <div className="flex items-center gap-2">
                          <h4
                            className={cn(
                              "text-xl font-semibold",
                              ellipsableStyles,
                            )}
                          >
                            {collection.collection_name}
                          </h4>
                          <VerifiedIcon className="mt-2 flex-shrink-0 text-primary" />
                        </div>

                        <p className="font-medium sm:hidden">
                          {formatUnits(collection.floor_price ?? 0, 18)} ETH{" "}
                          <span
                            className={cn(
                              "font-bold",
                              collection.floor_difference >= 0
                                ? "text-green-500"
                                : "text-red-500",
                            )}
                          >
                            {collection.floor_difference}%
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="hidden flex-shrink-0 flex-col items-end sm:flex">
                      <p className="text-sm font-semibold text-muted-foreground">
                        Floor price
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-end font-bold">
                          {formatUnits(collection.floor_price ?? 0, 18)} ETH
                        </p>
                        <p
                          className={cn(
                            "font-bold",
                            collection.floor_difference >= 0
                              ? "text-green-500"
                              : "text-red-500",
                          )}
                        >
                          {collection.floor_difference}%
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}

export default TrendingNow;