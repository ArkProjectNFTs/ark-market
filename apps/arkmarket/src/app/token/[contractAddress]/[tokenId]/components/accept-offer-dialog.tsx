"use client";

import type { PropsWithChildren } from "react";
import { parseEther } from "viem";

import { cn, ellipsableStyles } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@ark-market/ui/dialog";
import { LoaderCircle, Tag, VerifiedIcon } from "@ark-market/ui/icons";
import { Separator } from "@ark-market/ui/separator";

import type { TokenMetadata } from "~/types";
import Media from "~/components/media";
import usePrices from "~/hooks/usePrices";

interface AcceptOfferDialogProps {
  onConfirm: () => Promise<void>;
  formattedAmount: string;
  isLoading: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  floorDifference: bigint;
  tokenMetadata?: TokenMetadata;
  collectionName: string;
}

export default function AcceptOfferDialog({
  onConfirm,
  children,
  formattedAmount,
  isLoading,
  floorDifference,
  isOpen,
  setIsOpen,
  collectionName,
  tokenMetadata,
}: PropsWithChildren<AcceptOfferDialogProps>) {
  const { convertInUsd } = usePrices();

  const ethAmountInUsd = convertInUsd({
    amount: parseEther(formattedAmount),
  });

  const isHigherOfferThanFloor = floorDifference >= 0n;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle className="sr-only">Accept offer</DialogTitle>
        <div className="flex h-full flex-col justify-between">
          <div className="flex flex-col gap-6">
            <div className="mt-5 flex flex-col items-center gap-4">
              <div className="hidden size-20 place-items-center rounded-full bg-secondary sm:grid">
                <Tag className="!size-8 !text-3xl" />
              </div>
              <h2 className="text-center text-xl font-semibold">
                Approve sale
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <Media
                alt={tokenMetadata?.name ?? "Empty"}
                className="aspect-square size-16 flex-shrink-0 rounded-xl object-contain"
                height={192}
                mediaKey={tokenMetadata?.image_key}
                src={tokenMetadata?.image}
                width={192}
              />
              <div>
                <p
                  className={cn(
                    "w-full text-xl font-semibold",
                    ellipsableStyles,
                  )}
                >
                  {tokenMetadata?.name}
                </p>
                <div className="flex w-full items-center gap-2">
                  <p
                    className={cn(
                      "text-lg font-semibold text-muted-foreground",
                      ellipsableStyles,
                    )}
                  >
                    {collectionName}
                  </p>

                  <VerifiedIcon className="size-4 flex-shrink-0 text-primary sm:size-6" />
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xl font-semibold">
                <p>Price</p>
                <p>{formattedAmount} ETH</p>
              </div>
              <div className="flex flex-col items-end justify-end">
                <p className="text-sm font-medium text-muted-foreground">
                  ${ethAmountInUsd}
                </p>
                <p
                  className={cn(
                    "text-sm font-medium text-red-500",
                    isHigherOfferThanFloor ? "text-green-500" : "text-red-500",
                  )}
                >
                  {floorDifference.toString()}%{" "}
                  {isHigherOfferThanFloor ? "higher" : "lower"} than floor price
                </p>
              </div>
            </div>
            <Separator />

            <div className="text-xl font-semibold">
              <div className="flex items-center justify-between">
                <p>Earning details</p>
                <p>--- ETH</p>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm font-medium text-muted-foreground">
                <p>Arkmarket fees 2%</p>
                <p>-- ETH</p>
              </div>
              <div className="mt-0.5 flex items-center justify-between text-sm font-medium text-muted-foreground">
                <p>Creator royalties 2%</p>
                <p>-- ETH</p>
              </div>
            </div>
          </div>
          <div className="mt-6 justify-center sm:flex">
            <Button
              size="xl"
              onClick={onConfirm}
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading && <LoaderCircle className="mr-2 animate-spin" />}
              <p>Accept offer</p>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
