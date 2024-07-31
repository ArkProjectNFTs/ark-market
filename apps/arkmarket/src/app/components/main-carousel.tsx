"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import type { CarouselApi } from "@ark-market/ui/carousel";
import { cn } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@ark-market/ui/carousel";
import EthereumLogo2 from "@ark-market/ui/icons/ethereum-logo-2";

import { homepageConfig } from "~/config/homepage";

const AUTO_SLIDE_INTERVAL = 8_000;

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
    <div className="sm:text-white">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {homepageConfig.mainCarousel.map((carouselItem, index) => {
            return (
              <CarouselItem
                className="basis-full"
                key={index}
                onMouseEnter={stopAutoSlide}
                onMouseLeave={() => {
                  setProgressPercentage(0);
                  startProgress();
                  startAutoSlide();
                }}
              >
                <div className="relative h-[35rem] overflow-hidden rounded-[1.5rem]">
                  <Image
                    src={carouselItem.bannerSrc}
                    height={555}
                    width={1448}
                    alt={carouselItem.name}
                    className="h-full w-full object-cover"
                  />
                  <div
                    className="absolute inset-0 flex flex-col items-start justify-center gap-8 p-12"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 54.6%, rgba(0, 0, 0, 0.80) 107.55%)",
                    }}
                  >
                    <Image
                      src={carouselItem.collectionSrc}
                      height={120}
                      width={120}
                      alt={carouselItem.name}
                      className="size-16 rounded-lg"
                    />
                    <h1 className="text-5xl font-extrabold">
                      {carouselItem.name}
                    </h1>
                    <div className="flex items-center text-sm font-semibold">
                      <p className="mr-1">{carouselItem.itemsCount}</p>
                      <p className="mr-1 text-muted-foreground">ITEMS</p> |{" "}
                      <EthereumLogo2 className="size-4" />
                      <p className="mr-1">{carouselItem.floorPrice}</p>
                      <p className="text-muted-foreground">ETH</p>
                    </div>
                    <p className="max-w-lg text-xl">
                      {carouselItem.description}
                    </p>
                    <Button size="xxl" asChild className="flex-shrink-0">
                      <Link href={`/collection/${carouselItem.address}`}>
                        View collection
                      </Link>
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="mt-8 flex justify-center gap-4">
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
                  "bg-card",
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
                  className="absolute bottom-0 left-0 top-0 bg-accent transition-[width]"
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
