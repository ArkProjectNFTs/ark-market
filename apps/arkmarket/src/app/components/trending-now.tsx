"use client";

import { useMemo } from 'react';
import Image from "next/image";
import Link from "next/link";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

import { cn, ellipsableStyles, focusableStyles } from "@ark-market/ui";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@ark-market/ui/carousel";
import { VerifiedIcon } from "@ark-market/ui/icons";

import { homepageConfig } from "~/config/homepage";

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
    </section>
  );
}

export default TrendingNow;