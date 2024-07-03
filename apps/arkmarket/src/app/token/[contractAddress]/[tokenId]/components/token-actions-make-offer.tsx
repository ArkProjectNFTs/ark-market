"use client";

import { useEffect, useState } from "react";
import { useConfig, useCreateOffer } from "@ark-project/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useAccount } from "@starknet-react/core";
import { BadgeCheck, Tag } from "lucide-react";
import { useForm } from "react-hook-form";
import { parseEther } from "viem";
import * as z from "zod";

import { areAddressesEqual } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@ark-market/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ark-market/ui/form";
import { NumericalInput } from "@ark-market/ui/numerical-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ark-market/ui/select";
import { toast } from "@ark-market/ui/toast";

import type { Token, TokenMarketData } from "~/types";
import TokenMedia from "~/app/assets/[contract_address]/[token_id]/components/token-media";
import { env } from "~/env";
import formatAmount from "~/lib/formatAmount";

const formSchema = z.object({
  startAmount: z.string(),
  duration: z.string(),
});

interface CreateOfferProps {
  token: Token;
  tokenMarketData?: TokenMarketData;
}

export default function TokenActionsMakeOffer({
  token,
  // tokenMarketData,
}: CreateOfferProps) {
  const [isOpen, setIsOpen] = useState(false);
  const config = useConfig();
  const { account, address } = useAccount();
  const { response, createOffer, status } = useCreateOffer();
  const isOwner = address && areAddressesEqual(token.owner, address);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startAmount: "",
      duration: "1",
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
    if (!account) {
      return;
    }

    const processedValues = {
      brokerId: env.NEXT_PUBLIC_BROKER_ID,
      currencyAddress: config?.starknetCurrencyContract,
      tokenAddress: token.contract_address,
      tokenId: BigInt(token.token_id),
      startAmount: parseEther(values.startAmount),
    };

    await createOffer({
      starknetAccount: account,
      ...processedValues,
    });

    toast.success("Your offer is successfully sent!");
  }

  if (!account || isOwner) {
    return;
  }

  const isDisabled = form.formState.isSubmitting || status === "loading";
  const startAmount = form.watch("startAmount");
  const formattedStartAmount = formatAmount(startAmount);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="relative w-full lg:max-w-[50%]"
          size="xxl"
          variant="secondary"
        >
          <Tag size={24} className="absolute left-4" />
          Make offer
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="items-center"></DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="text-center text-xl font-semibold">Make an offer</div>
          <div className="flex items-center space-x-4">
            <div className="size-24 overflow-hidden rounded-xl">
              <TokenMedia token={token} />
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-xl font-semibold">Duo #{token.token_id}</div>
              <div className="flex items-center gap-2">
                <div className="text-lg font-semibold text-muted-foreground">
                  Everai
                </div>
                <BadgeCheck className="size-4 text-muted-foreground" />
              </div>
            </div>
            <div className="grow" />
            <div className="order-4 flex max-w-[40%] flex-[0_0_auto] flex-col justify-center self-stretch overflow-hidden text-right">
              <div className="text-xl font-semibold">
                {formattedStartAmount} ETH
              </div>
              <div className="text-right text-lg font-semibold text-muted-foreground">
                $---
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
                    <FormLabel>Set price</FormLabel>
                    <FormControl>
                      <NumericalInput
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <div className="mx-2 text-lg font-semibold text-muted-foreground">
                      $---
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between">
                      <FormLabel>Offer expiration</FormLabel>
                      {/* <div className="text-sm">Expires {expiredAt}</div> */}
                    </div>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="">
                          <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="3">3 hours</SelectItem>
                        <SelectItem value="6">6 hours</SelectItem>
                        <SelectItem value="24">1 day</SelectItem>
                        <SelectItem value="72">3 days</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isDisabled}
                className="mx-auto w-fit px-10"
                size="xl"
              >
                {status === "loading" ? (
                  <ReloadIcon className="animate-spin" />
                ) : (
                  "Make offer"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
