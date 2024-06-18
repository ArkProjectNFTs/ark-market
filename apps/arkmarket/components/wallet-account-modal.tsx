import type { PropsWithChildren } from "react";

import { Dialog } from "@ark-market/ui/components/dialog";

export default function WalletAccountModal({ children }: PropsWithChildren) {
  return <Dialog>{children}</Dialog>;
}
