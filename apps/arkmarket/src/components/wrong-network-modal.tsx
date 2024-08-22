"use client";

import type { PropsWithChildren } from "react";
import { useState } from "react";

import { Button } from "@ark-market/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ark-market/ui/dialog";
import { Typography } from "@ark-market/ui/typography";

export default function WrongNetworkModal({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={openModal}>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-[26.25rem] justify-items-center">
        <DialogHeader>
          <div className="mx-auto mb-3 mt-3 size-20 rounded-full bg-secondary" />
          <DialogTitle className="mx-auto">
            <Typography variant="h4">Switch network</Typography>
          </DialogTitle>
        </DialogHeader>
        <p className="text-center">
          It seems your are connected to the test network (Sepolia). Please, to
          use the marketplace you need to switch to mainnet in your Starknet
          wallet. Thank you!
        </p>
        <Button className="inline-block" onClick={closeModal} size="xl">
          Ok, got it!
        </Button>
      </DialogContent>
    </Dialog>
  );
}
