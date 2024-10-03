"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import type { CarouselApi } from "@ark-market/ui/carousel";
import { cn, formatNumber } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@ark-market/ui/carousel";
import { Ethereum } from "@ark-market/ui/icons";

import { homepageConfig } from "~/config/homepage";

// const AUTO_SLIDE_INTERVAL = 8_000;
const AUTO_SLIDE_INTERVAL = 8_000_000;

export default function MainCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedItem, setSelectedItem] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const intervalId = useRef<number | null>(null);
  const progressIntervalId = useRef<number | null>(null);

  const startProgress = () => {
    progressIntervalId.current = window.setInterval(() => {
      setProgressPercentage((prev) => (prev < 100 ? prev + 1 : 0));
    }, AUTO_SLIDE_INTERVAL / 100);
  };

  const startAutoSlide = () => {
    intervalId.current = window.setInterval(() => {
      const nextIndex = (selectedItem + 1) % homepageConfig.mainCarousel.length;
      api?.scrollTo(nextIndex);
      setProgressPercentage(0);
    }, AUTO_SLIDE_INTERVAL);
  };

  const stopAutoSlide = () => {
    if (intervalId.current) clearInterval(intervalId.current);
    if (progressIntervalId.current) clearInterval(progressIntervalId.current);
  };

  useEffect(() => {
    if (api) {
      startProgress();
      startAutoSlide();

      return () => {
        stopAutoSlide();
      };
    }
  }, [api, selectedItem]);

  useEffect(() => {
    if (api) {
      api.on("select", () => {
        setSelectedItem(api.selectedScrollSnap());
        setProgressPercentage(0);
      });
    }
  }, [api]);

  if (homepageConfig.mainCarousel.length === 0) {
    return null;
  }

  return (
    <div className="md:text-white">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {homepageConfig.mainCarousel.map((carouselItem, index) => {
            return (
              <CarouselItem className="basis-full" key={index}>
                <div className="relative flex h-full flex-col overflow-hidden rounded-t-[1.5rem]">
                  <div className="relative overflow-hidden rounded-[1.5rem]">
                    {carouselItem.nftSrc !== undefined && (
                      <div className="absolute inset-0 flex items-center justify-center pr-6 pt-6 md:hidden">
                        <NftCards nftSrc={carouselItem.nftSrc} />
                      </div>
                    )}
                    {carouselItem.bannerSrc !== undefined ? (
                      <Image
                        src={carouselItem.bannerSrc}
                        height={555}
                        width={1448}
                        alt={carouselItem.name}
                        className="h-[22.5rem] w-full rounded-[1.5rem] object-cover md:h-[35rem]"
                      />
                    ) : (
                      <Image
                        src={carouselItem.nftSrc}
                        height={555}
                        width={1448}
                        alt={carouselItem.name}
                        className="h-[22.5rem] w-full rounded-[1.5rem] object-cover blur-2xl md:h-[35rem]"
                      />
                    )}
                  </div>
                  <div className="mt-5 flex flex-1 items-center justify-between rounded-[1.5rem] md:absolute md:inset-0 md:mt-0 md:bg-[linear-gradient(0deg,_#fff_0%,_#ffffff00_40%)] dark:md:bg-[linear-gradient(0deg,_#000_0%,_#00000000_100%)]">
                    <div className="flex h-full flex-col justify-center gap-5 md:items-start md:gap-8 md:p-12">
                      <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-8">
                        <Image
                          src={carouselItem.collectionSrc}
                          height={120}
                          width={120}
                          alt={carouselItem.name}
                          className="size-16 rounded-lg border border-white"
                        />
                        <div className="flex flex-col gap-2 md:gap-8">
                          <h1 className="text-2xl font-extrabold sm:text-3xl md:text-5xl">
                            {carouselItem.name}
                          </h1>
                          <div className="font-numbers flex items-center text-base font-medium">
                            <p className="mr-1">
                              {formatNumber(carouselItem.itemsCount)}
                            </p>
                            <p className="mr-1 text-muted-foreground dark:text-muted-foreground md:text-white">
                              ITEMS
                            </p>{" "}
                            |{" "}
                            <p className="flex items-center justify-center text-[0.75rem]">
                              <Ethereum className="size-4" />
                            </p>
                            <p className="mr-1">{carouselItem.floorPrice}</p>
                            <p className="text-muted-foreground dark:text-muted-foreground md:text-white">
                              ETH
                            </p>
                          </div>
                        </div>
                      </div>
                      <p className="text-base md:max-w-lg md:text-xl">
                        {carouselItem.description}
                      </p>
                      <Button
                        size="xxl"
                        asChild
                        className="mt-auto flex-shrink-0"
                      >
                        <Link href={`/collection/${carouselItem.address}`}>
                          View collection
                        </Link>
                      </Button>
                    </div>
                    {carouselItem.nftSrc !== undefined && (
                      <div className="mx-auto hidden w-full justify-center lg:flex">
                        <NftCards nftSrc={carouselItem.nftSrc} />
                      </div>
                    )}
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="mt-8 flex justify-center gap-4 md:mt-0">
          {homepageConfig.mainCarousel.map((_, index) => {
            const isSelected = selectedItem === index;
            const progressWidth =
              isSelected && progressPercentage > 0
                ? `${progressPercentage}%`
                : "0%";

            return (
              <button
                className={cn(
                  "relative h-1.5 w-24 overflow-hidden rounded-full",
                  "bg-secondary",
                )}
                key={index}
                onClick={() => {
                  api?.scrollTo(index);
                  setProgressPercentage(0);
                  stopAutoSlide();
                  startProgress();
                  startAutoSlide();
                }}
              >
                <div
                  className="absolute bottom-0 left-0 top-0 bg-primary transition-[width]"
                  style={{ width: progressWidth }}
                ></div>
              </button>
            );
          })}
        </div>
      </Carousel>
    </div>
  );
}

interface NftCardsProps {
  nftSrc: string;
}

function NftCards({ nftSrc }: NftCardsProps) {
  return (
    <div className="relative max-h-full max-w-full">
      <Image
        src={nftSrc}
        height={800}
        width={800}
        alt=""
        className="relative z-30 aspect-square size-56 origin-bottom-left -rotate-6 rounded-[1.5rem] border border-white object-cover md:size-96"
      />
      <Image
        src={nftSrc}
        height={800}
        width={800}
        alt=""
        className="absolute inset-0 z-10 aspect-square size-56 origin-bottom-left -translate-y-10 translate-x-8 rotate-6 rounded-[1.5rem] border border-white object-cover opacity-25 md:size-96"
      />
      <Image
        src={nftSrc}
        height={800}
        width={800}
        alt=""
        className="absolute inset-0 z-20 aspect-square size-56 -translate-y-5 translate-x-4 rounded-[1.5rem] border border-white object-cover opacity-50 md:size-96"
      />
    </div>
  );
}
