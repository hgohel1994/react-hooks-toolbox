import { useCallback, useEffect, useRef } from "react";

/**
 * Returns a stable function that checks whether the component is still mounted.
 * Useful for avoiding state updates after async operations complete.
 */
export function useIsMounted(): () => boolean {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return useCallback(() => isMounted.current, []);
}
