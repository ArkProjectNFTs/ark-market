import type { PropsWithChildren } from "react";

import AuthSwitcher from "~/components/auth-switcher";

export default function AuthenticatedLayout({ children }: PropsWithChildren) {
  return <AuthSwitcher>{children}</AuthSwitcher>;
}
