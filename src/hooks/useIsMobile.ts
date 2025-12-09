import { useEffect, useState } from "react";
import MobileDetect from "mobile-detect";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const md = new MobileDetect(window.navigator.userAgent);
    setIsMobile(Boolean(md.mobile()));
  }, []);

  return isMobile;
}
