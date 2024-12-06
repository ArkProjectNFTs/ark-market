"use client";

import { memo, useEffect, useState } from "react";
import { useConfig, useCreateOffer } from "@ark-project/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAccount } from "@starknet-react/core";
import moment from "moment";
import { useForm } from "react-hook-form";
import { parseEther } from "viem";
import * as z from "zod";

import { cn } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import { DateTimePicker } from "@ark-market/ui/date-time-picker";
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

import type { Token } from "~/types";
import durations from "~/constants/durations";
import { ETH } from "~/constants/tokens";
import { env } from "~/env";
import useBalance from "~/hooks/useBalance";
import useConnectWallet from "~/hooks/useConnectWallet";
import formatAmount from "~/lib/formatAmount";
import ToastExecutedTransactionContent from "./toast-executed-transaction-content";
import ToastRejectedTransactionContent from "./toast-rejected-transaction-content";
import TokenActionsTokenOverview from "./token-actions-token-overview";

interface TokenActionsMakeOfferProps {
  token: Token;
  small?: boolean;
}

function TokenActionsMakeOffer({ token, small }: TokenActionsMakeOfferProps) {
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

  const form = useForm({
    mode: "all",
    resolver: zodResolver(formSchema),
    defaultValues: {
      startAmount: "",
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
        title: "Offer canceled",
        additionalContent: (
          <ToastRejectedTransactionContent
            price={parseEther(startAmount)}
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
        title: "Your offer is successfully sent",
        additionalContent: (
          <ToastExecutedTransactionContent
            price={parseEther(startAmount)}
            formattedPrice={startAmount}
            collectionName={token.collection_name}
            tokenId={token.token_id}
            tokenMetadata={token.metadata}
          />
        ),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, toast]);

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
          Make offer
        </Button>
      </DialogTrigger>
      <DialogTitle className="hidden">Make an offer</DialogTitle>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader className="items-center"></DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="mx-auto flex flex-col items-center justify-center rounded-full text-2xl">
            <NoOffer />
            <div className="text-center text-xl font-semibold">
              Make an offer
            </div>
          </div>
          <TokenActionsTokenOverview token={token} amount={startAmount} small />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <FormField
                control={form.control}
                name="startAmount"
                render={({ field, fieldState }) => {
                  return (
                    <FormItem>
                      <FormLabel>Set price</FormLabel>
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
                  );
                }}
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
                                <SelectItem value="718">1 month</SelectItem>
                                <SelectItem value="custom">Custom</SelectItem>
                              </SelectContent>
                            </Select>
                            <DateTimePicker
                              // disabled={(date) =>
                              //   date >= new Date() &&
                              //   date < moment().add(29, "days").toDate()
                              // }
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
                Make offer
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default memo(TokenActionsMakeOffer);
