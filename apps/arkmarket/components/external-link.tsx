import type { AnchorHTMLAttributes, PropsWithChildren } from "react";

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export default function ExternalLink(props: PropsWithChildren<AnchorProps>) {
  return (
    <a {...props} rel="noreferrer" target="_blank">
      {props.children}
    </a>
  );
}
