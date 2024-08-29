import type { PropsWithClassName } from "..";
import { Icon } from "./icon";

export default function StarknetLogo({ className }: PropsWithClassName) {
  return (
    <Icon className={className} icon="Y"/>
  );
}
