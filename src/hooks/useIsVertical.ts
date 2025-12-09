import { useState, useEffect } from "react";

/**
 * Hook to detect if the screen is in vertical (portrait) aspect ratio.
 * Returns true if height > width, false otherwise.
 */
export function useIsVertical(): boolean {
  const [isVertical, setIsVertical] = useState(
    () => window.innerHeight > window.innerWidth
  );

  useEffect(() => {
    const handleResize = () => {
      setIsVertical(window.innerHeight > window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return isVertical;
}
