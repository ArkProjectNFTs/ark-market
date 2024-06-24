"use client";

import * as React from "react";
import { useAccount } from "@starknet-react/core";

import Authentication from "./authentication";

function AuthSwitcher(props: React.PropsWithChildren) {
  const { account } = useAccount();
  if (account === undefined) return <Authentication />;

  const { children } = props;
  return <div>{children}</div>;
}

export default AuthSwitcher;
