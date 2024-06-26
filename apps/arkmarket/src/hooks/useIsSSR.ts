import { useEffect, useState } from "react";

export default function useIsSSR() {
  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(false);
  }, []);

  return isSSR;
}
