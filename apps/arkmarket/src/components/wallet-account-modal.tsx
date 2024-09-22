"use client";

import type { PropsWithChildren } from "react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@ark-market/ui/dialog";

import WalletAccountContent from "./wallet-account-content";

export default function WalletAccountModal({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={openModal}>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="sr-only">Account</DialogTitle>
        <WalletAccountContent onClose={closeModal} />
      </DialogContent>
    </Dialog>
  );
}
