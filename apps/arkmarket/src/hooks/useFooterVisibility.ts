import { usePathname } from "next/navigation";

const HIDDEN_PATHS = ["/wallet", "/collection", "/token", "/collections"];

export default function useFooterVisibility() {
  const pathname = usePathname();

  return !HIDDEN_PATHS.some((path) => pathname.startsWith(path));
}
