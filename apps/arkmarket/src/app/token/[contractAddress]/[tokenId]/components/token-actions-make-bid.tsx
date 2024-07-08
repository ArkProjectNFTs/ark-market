"use client";

import { useEffect, useState } from "react";
import { useConfig, useCreateOffer } from "@ark-project/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAccount } from "@starknet-react/core";
import { LoaderCircle, Tag } from "lucide-react";
import { useForm } from "react-hook-form";
import { formatEther, parseEther } from "viem";
import * as z from "zod";

import { areAddressesEqual } from "@ark-market/ui";
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
import TokenMedia from "~/app/assets/[contract_address]/[token_id]/components/token-media";
import { env } from "~/env";

interface TokenActionsMakeBidProps {
  token: Token;
  tokenMarketData: TokenMarketData;
}

export default function TokenActionsMakeBid({
  token,
  tokenMarketData,
}: TokenActionsMakeBidProps) {
  const [isOpen, setIsOpen] = useState(false);
  const config = useConfig();
  const { account, address } = useAccount();
  const { response, createOffer, status } = useCreateOffer();
  const isOwner = address && areAddressesEqual(token.owner, address);
  const formSchema = z.object({
    startAmount: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startAmount: formatEther(BigInt(tokenMarketData.start_amount)),
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
      tokenAddress: token.contract_address,
      tokenId: BigInt(token.token_id),
      startAmount: parseEther(values.startAmount),
    };

    await createOffer({
      starknetAccount: account,
      ...processedValues,
    });
  }

  if (!account || isOwner) {
    return;
  }

  const isDisabled = form.formState.isSubmitting || status === "loading";
  const price = formatEther(BigInt(tokenMarketData.start_amount));
  const reservePrice = formatEther(BigInt(tokenMarketData.end_amount));

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="relative w-full" variant="secondary" size="xxl">
          <Tag size={24} className="absolute left-4" />
          Make an offer
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Place a bid</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-4">
          <div className="w-16 overflow-hidden rounded">
            <TokenMedia token={token} />
          </div>
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
