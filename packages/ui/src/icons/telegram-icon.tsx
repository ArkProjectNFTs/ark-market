import type { PropsWithClassName } from "..";

export default function TelegramIcon({ className }: PropsWithClassName) {
  return (
    <svg
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      className={className}
    >
      <path
        d="M15.953 1.24303L13.5497 12.5992C13.3662 13.4064 12.8892 13.5899 12.2104 13.223L8.54123 10.5078L6.70662 12.214C6.62022 12.3268 6.50922 12.4186 6.38206 12.4821C6.25491 12.5457 6.11494 12.5795 5.97278 12.5809L6.22963 8.91167L13.0177 2.76575C13.3295 2.50891 13.0177 2.36214 12.5774 2.61898L4.24825 7.8476L0.579049 6.71014C-0.20983 6.47165 -0.228177 5.92127 0.744162 5.55435L14.889 0.0505369C15.5861 -0.151269 16.1732 0.252342 15.953 1.24303Z"
        fill="currentColor"
      />
    </svg>
  );
}
