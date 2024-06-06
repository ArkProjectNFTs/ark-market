import type { PropsWithClassName } from "@/lib/utils";

export default function EthereumLogo({ className }: PropsWithClassName) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
    >
      <circle cx="16" cy="16" r="16" fill="white" />
      <path
        d="M15.9547 22.0532L9 17.9962L15.9539 27.6772L22.9135 17.9962L15.9523 22.0532H15.9547ZM16 5L9.08891 15.5L16 19.875L23 15.5037L16 5Z"
        fill="#64698C"
      />
      <path
        d="M9 17.9961L15.9547 22.0532L15.9539 27.6771L9 17.9961Z"
        fill="#8C93AF"
      />
      <path
        d="M16.0776 19.5857L9.12207 15.5249L15.9999 5L16.0776 19.5857Z"
        fill="#8C94AF"
      />
      <path
        d="M16.0776 19.5856L9.12207 15.5248L16.0776 12.4375L16.0776 19.5856Z"
        fill="#64688C"
      />
      <path
        d="M16.0006 19.875L22.9727 15.5248L16.0171 12.4375L16.0006 19.875Z"
        fill="#474A73"
      />
    </svg>
  );
}
