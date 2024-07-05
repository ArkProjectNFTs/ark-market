import Image from "next/image";
import Link from "next/link";

import { cn, ellipsableStyles, focusableStyles } from "@ark-market/ui";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@ark-market/ui/carousel";
import VerifiedIcon from "@ark-market/ui/icons/verified-icon";

import { homepageConfig } from "~/config/homepage";

export default function TrendingNow() {
  if (homepageConfig.trendingNow.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-3xl font-semibold">Trending now</h2>
      <Carousel className="mt-8">
        <CarouselContent>
          {homepageConfig.trendingNow.map((collection, index) => {
            return (
              <CarouselItem
                key={index}
                className="basis-[calc(100%-4rem)] md:basis-1/2 lg:basis-1/2 xl:basis-1/3 2xl:basis-1/4"
              >
                <Link
                  href={`/collection/${collection.address}`}
                  className={cn(
                    "block rounded-lg bg-card p-5",
                    focusableStyles,
                  )}
                >
                  <div className="grid grid-cols-2 gap-7 sm:grid-cols-3">
                    {collection.second_nft ? (
                      <Image
                        height={150}
                        width={150}
                        className="w-full rounded-sm"
                        alt={collection.name}
                        src={collection.second_nft}
                      />
                    ) : (
                      <div className="aspect-square w-full rounded-sm bg-secondary" />
                    )}
                    {collection.first_nft ? (
                      <Image
                        height={150}
                        width={150}
                        className="w-full rounded-sm"
                        alt={collection.name}
                        src={collection.first_nft}
                      />
                    ) : (
                      <div className="aspect-square w-full rounded-sm bg-secondary" />
                    )}
                    {collection.third_nft ? (
                      <Image
                        height={150}
                        width={150}
                        className="w-full rounded-sm sm:block"
                        alt={collection.name}
                        src={collection.third_nft}
                      />
                    ) : (
                      <div className="hidden aspect-square w-full rounded-sm bg-secondary sm:block" />
                    )}
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
                          <VerifiedIcon className="flex-shrink-0 text-background" />
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
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
