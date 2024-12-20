"use client";

import { useEffect, useState } from "react";
import { useConfig, useCreateOffer } from "@ark-project/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAccount } from "@starknet-react/core";
import moment from "moment";
import { useForm } from "react-hook-form";
import { formatEther, parseEther } from "viem";
import * as z from "zod";

import { cn } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import { DateTimePicker } from "@ark-market/ui/date-time-picker";
import {
  Dialog,
  DialogContent,
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
  FormMessage,
} from "@ark-market/ui/form";
import { ActivityOffer, LoaderCircle, NoOffer } from "@ark-market/ui/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ark-market/ui/select";
import { useToast } from "@ark-market/ui/use-toast";

import type { Token, TokenMarketData } from "~/types";
import durations from "~/constants/durations";
import { ETH } from "~/constants/tokens";
import { env } from "~/env";
import useBalance from "~/hooks/useBalance";
import useConnectWallet from "~/hooks/useConnectWallet";
import formatAmount from "~/lib/formatAmount";
import ToastExecutedTransactionContent from "./toast-executed-transaction-content";
import ToastRejectedTransactionContent from "./toast-rejected-transaction-content";
import TokenActionsTokenOverview from "./token-actions-token-overview";

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
  const { account, address, isConnected } = useAccount();
  const [isOpen, setIsOpen] = useState(false);
  const config = useConfig();
  const { createOffer, status } = useCreateOffer();
  const { toast } = useToast();
  const { data: ethBalance } = useBalance({ address, token: ETH });
  const { ensureConnect } = useConnectWallet({
    account,
    onConnect: () => {
      setIsOpen(true);
    },
  });

  const formSchema = z.object({
    startAmount: z
      .string()
      .refine(
        (val) => {
          const num = parseFloat(val);
          return !isNaN(num) && num > 0.00001;
        },
        {
          message: "Must be a valid amount and greater than 0.00001",
        },
      )
      .refine(
        (val) => {
          const num = parseEther(val);

          return ethBalance && ethBalance.value >= num;
        },
        {
          message: "You don't have enough funds in your wallet",
        },
      ),
    duration: z.string(),
    endDateTime: z.date().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "all",
    resolver: zodResolver(formSchema),
    defaultValues: {
      startAmount: formatEther(BigInt(tokenMarketData.listing.start_amount)),
      duration: "168",
      endDateTime: undefined,
    },
  });

  useEffect(() => {
    form.reset();
  }, [form, isOpen]);

  useEffect(() => {
    if (status === "error") {
      setIsOpen(false);
      toast({
        variant: "canceled",
        title: "Your bid could not be submitted",
        additionalContent: (
          <ToastRejectedTransactionContent
            price={BigInt(tokenMarketData.listing.start_amount)}
            formattedPrice={startAmount}
            collectionName={token.collection_name}
            tokenId={token.token_id}
            tokenMetadata={token.metadata}
          />
        ),
      });
    } else if (status === "success") {
      setIsOpen(false);
      toast({
        variant: "success",
        title: "Your bid has been sucessfullly sent",
        additionalContent: (
          <ToastExecutedTransactionContent
            price={BigInt(tokenMarketData.listing.start_amount)}
            formattedPrice={startAmount}
            collectionName={token.collection_name}
            tokenId={token.token_id}
            tokenMetadata={token.metadata}
          />
        ),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!account) {
      return;
    }

    const now = moment();
    const endDate = values.endDateTime
      ? moment(values.endDateTime).isBefore(now)
        ? now.add(2, "minutes").unix()
        : moment(values.endDateTime).unix()
      : now.add(values.duration, "hours").unix();

    const processedValues = {
      brokerId: env.NEXT_PUBLIC_BROKER_ID,
      currencyAddress: config?.starknetCurrencyContract,
      tokenAddress: token.collection_address,
      tokenId: BigInt(token.token_id),
      startAmount: parseEther(values.startAmount),
      endDate,
    };

    await createOffer({
      starknetAccount: account,
      ...processedValues,
    });
  }

  const isLoading = status === "loading";
  const isDisabled = !form.formState.isValid || isLoading;
  const startAmount = form.watch("startAmount");
  const formattedStartAmount = formatAmount(startAmount);
  const price = formatEther(BigInt(tokenMarketData.listing.start_amount));
  const reservePrice = formatEther(
    BigInt(tokenMarketData.listing.end_amount ?? 0),
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn(small ?? "relative w-full lg:max-w-[50%]")}
          size={small ? "xl" : "xxl"}
          variant="secondary"
          disabled={!isConnected}
          onClick={ensureConnect}
        >
          <ActivityOffer />
          Place a bid
        </Button>
      </DialogTrigger>
      <DialogTitle className="hidden">Place a bid</DialogTitle>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex flex-col gap-6">
          <div className="mx-auto flex flex-col items-center justify-center rounded-full text-2xl">
            <NoOffer />
            <div className="text-center text-xl font-semibold">Place a bid</div>
          </div>
          <TokenActionsTokenOverview token={token} amount={startAmount} small />
          <div className="">
            <div className="flex justify-between">
              <div className="text-sm text-gray-500">Starting price</div>
              <div className="text-sm text-gray-500">{price} ETH</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm text-gray-500">Reserve price</div>
              <div className="text-sm text-gray-500">{reservePrice} ETH</div>
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
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Set Price</FormLabel>
                    <FormControl>
                      <EthInput
                        value={field.value}
                        onChange={field.onChange}
                        status={
                          formattedStartAmount !== "-" &&
                          fieldState.error?.message
                            ? "error"
                            : "default"
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field: durationField }) => (
                  <FormField
                    control={form.control}
                    name="endDateTime"
                    render={({ field: endDateTimeField }) => {
                      return (
                        <FormItem>
                          <FormLabel className="text-lg">
                            Offer expiration
                          </FormLabel>
                          <div className="grid grid-cols-[1fr_2fr] gap-4">
                            <Select
                              onValueChange={(value) => {
                                if (value.length === 0) {
                                  return;
                                }
                                durationField.onChange(value);
                                endDateTimeField.onChange(undefined);
                              }}
                              value={
                                durationField.value === "custom"
                                  ? undefined
                                  : durationField.value
                              }
                            >
                              <FormControl>
                                <SelectTrigger className="">
                                  <SelectValue placeholder="Custom">
                                    {durationField.value === "custom"
                                      ? "Custom"
                                      : durations[durationField.value]}
                                  </SelectValue>
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1">1 hour</SelectItem>
                                <SelectItem value="3">3 hours</SelectItem>
                                <SelectItem value="6">6 hours</SelectItem>
                                <SelectItem value="24">1 day</SelectItem>
                                <SelectItem value="72">3 days</SelectItem>
                                <SelectItem value="168">7 days</SelectItem>
                                <SelectItem value="719">1 month</SelectItem>
                                <SelectItem value="custom">Custom</SelectItem>
                              </SelectContent>
                            </Select>
                            <DateTimePicker
                              hourCycle={12}
                              value={
                                durationField.value === "custom"
                                  ? endDateTimeField.value
                                  : moment()
                                      .add(form.getValues("duration"), "hours")
                                      .toDate()
                              }
                              onChange={(value) => {
                                endDateTimeField.onChange(value);
                                durationField.onChange("custom");
                              }}
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                )}
              />
              <Button
                type="submit"
                disabled={isDisabled}
                className="mx-auto w-full px-10 lg:w-auto"
                size="xl"
              >
                {isLoading && <LoaderCircle className="mr-2 animate-spin" />}
                Place bid
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
