"use client";

import { useEffect, useState } from "react";
import { useConfig, useCreateOffer } from "@ark-project/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAccount } from "@starknet-react/core";
import { LoaderCircle, Tag } from "lucide-react";
import { useForm } from "react-hook-form";
import { formatEther, parseEther } from "viem";
import * as z from "zod";

import { cn } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ark-market/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@ark-market/ui/form";
import { Input } from "@ark-market/ui/input";

import type { Token, TokenMarketData } from "~/types";
import Media from "~/components/media";
import { env } from "~/env";
import useConnectWallet from "~/hooks/useConnectWallet";

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

  useEffect(() => {
    form.reset();
  }, [form, isOpen]);

  useEffect(() => {
    if (response) {
      setIsOpen(false);
    }
  }, [response]);

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
  console.log(token);

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
          <DialogTitle>Place a bid</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-4">
          <Media
            className="size-16 rounded-lg"
            src={token.metadata?.animation_url ?? token.metadata?.image}
            mediaKey={
              token.metadata?.animation_key ?? token.metadata?.image_key
            }
            alt={token.token_id}
          />
          <div className="">
            <div className="font-bold">Duo #{token.token_id}</div>
            <div className="text-muted-foreground">Everai</div>
          </div>
          <div className="grow" />
          <div className="">
            <div className="text-right font-bold">{price} ETH</div>
            <div className="text-right text-muted-foreground">
              Reserve {reservePrice} ETH
            </div>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <FormField
              control={form.control}
              name="startAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" placeholder="Price" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isDisabled} size="xl">
              {status === "loading" ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Place a bid"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
