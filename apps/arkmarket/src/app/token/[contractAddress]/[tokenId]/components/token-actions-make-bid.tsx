"use client";

import { useEffect, useState } from "react";
import { useConfig, useCreateOffer } from "@ark-project/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAccount } from "@starknet-react/core";
import { LoaderCircle, Tag } from "lucide-react";
import { useForm } from "react-hook-form";
import { formatEther, parseEther } from "viem";
import * as z from "zod";

import { cn, ellipsableStyles } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ark-market/ui/dialog";
import EthInput from "@ark-market/ui/eth-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@ark-market/ui/form";
import EthereumLogo2 from "@ark-market/ui/icons/ethereum-logo-2";
import VerifiedIcon from "@ark-market/ui/icons/verified-icon";
import { useToast } from "@ark-market/ui/use-toast";

import type { Token, TokenMarketData } from "~/types";
import Media from "~/components/media";
import { env } from "~/env";
import useConnectWallet from "~/hooks/useConnectWallet";
import ToastExecutedTransactionContent from "./toast-executed-transaction-content";
import ToastRejectedTransactionContent from "./toast-rejected-transaction-content";

interface TokenActionsMakeBidProps {
  token: Token;
  tokenMarketData: TokenMarketData;
  small?: boolean;
}

export default function TokenActionsMakeBid({
  token,
  tokenMarketData,
  small,
}: TokenActionsMakeBidProps) {
  const [isOpen, setIsOpen] = useState(false);
  const config = useConfig();
  const { account } = useAccount();
  const { response, createOffer, status } = useCreateOffer();
  const formSchema = z.object({
    startAmount: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startAmount: formatEther(
        BigInt(tokenMarketData.listing.start_amount ?? 0),
      ),
    },
  });
  const { ensureConnect } = useConnectWallet({
    account,
    onConnect: () => {
      setIsOpen(true);
    },
  });
  const { toast } = useToast();

  useEffect(() => {
    form.reset();
  }, [form, isOpen]);

  useEffect(() => {
    if (response) {
      setIsOpen(false);
    }
  }, [response]);

  const startAmount = form.watch("startAmount");

  useEffect(() => {
    if (status === "error") {
      setIsOpen(false);
      toast({
        variant: "canceled",
        title: "Your bid could not be submitted",
        additionalContent: (
          <ToastRejectedTransactionContent
            token={token}
            price={BigInt(tokenMarketData.listing.start_amount ?? 0)}
            formattedPrice={startAmount}
          />
        ),
      });
    } else if (status === "success") {
      toast({
        variant: "success",
        title: "Your bid has been sucessfullly sent!",
        additionalContent: (
          <ToastExecutedTransactionContent
            token={token}
            price={BigInt(tokenMarketData.listing.start_amount ?? 0)}
            formattedPrice={startAmount}
          />
        ),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!account || !config) {
      return;
    }

    const tokenIdNumber = parseInt(token.token_id, 10);

    if (isNaN(tokenIdNumber)) {
      console.error("Invalid token ID");
      return;
    }

    const processedValues = {
      brokerId: env.NEXT_PUBLIC_BROKER_ID,
      currencyAddress: config.starknetCurrencyContract,
      tokenAddress: token.collection_address,
      tokenId: BigInt(token.token_id),
      startAmount: parseEther(values.startAmount),
    };

    await createOffer({
      starknetAccount: account,
      ...processedValues,
    });
  }

  const isDisabled = form.formState.isSubmitting || status === "loading";
  const price = formatEther(BigInt(tokenMarketData.listing.start_amount ?? 0));
  const reservePrice = formatEther(
    BigInt(tokenMarketData.listing.end_amount ?? 0),
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn(small ?? "relative w-full lg:max-w-[50%]")}
          variant="secondary"
          size={small ? "xl" : "xxl"}
          onClick={ensureConnect}
        >
          <Tag
            size={small ? 20 : 24}
            className={cn("left-4", small ? "" : "absolute")}
          />
          Make a bid
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sr-only">Place a bid</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="mx-auto size-20 rounded-full bg-secondary" />
          <div className="text-center text-xl font-semibold">Place a bid</div>

          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <Media
                src={token.metadata?.image}
                mediaKey={token.metadata?.image_key}
                alt={token.metadata?.name ?? "Empty"}
                className={cn(
                  "aspect-square size-16 w-full flex-shrink-0 overflow-hidden rounded-xl object-contain transition-transform group-hover:scale-110",
                )}
                height={192}
                width={192}
              />

              <div className="flex flex-col items-start justify-between overflow-hidden">
                <div
                  className={cn(
                    "w-full text-xl font-semibold",
                    ellipsableStyles,
                  )}
                >
                  {token.metadata?.name ?? `#${token.token_id}`}
                </div>
                <div className="flex w-full items-center gap-1 sm:gap-2">
                  <p
                    className={cn(
                      "text-sm font-semibold text-muted-foreground sm:text-lg",
                      ellipsableStyles,
                    )}
                  >
                    {token.collection_name || "Unknown"}
                  </p>
                  <VerifiedIcon className="size-4 flex-shrink-0 text-background sm:size-6" />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <div className="flex whitespace-nowrap text-lg font-semibold sm:text-xl">
                <EthereumLogo2 className="size-6" />
                {price} ETH
              </div>
              <div className="overflow-hidden text-clip text-right text-sm font-semibold text-muted-foreground">
                Reserve {reservePrice} ETH
              </div>
            </div>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <FormField
                control={form.control}
                name="startAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <EthInput
                        autoComplete="off"
                        placeholder="Price"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isDisabled}
                size="xl"
                className="mx-auto w-full px-10 lg:w-auto"
              >
                {status === "loading" ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Place a bid"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
