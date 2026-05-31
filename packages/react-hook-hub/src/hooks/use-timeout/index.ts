import { useEffect, useRef } from "react";

/**
 * Run a callback after a delay. Pass `null` as delay to cancel.
 *
 * @param callback - Function to call when the delay elapses
 * @param delay - Delay in milliseconds, or null to disable
 */
export function useTimeout(callback: () => void, delay: number | null): void {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return;
    }

    const id = window.setTimeout(() => {
      savedCallback.current();
    }, delay);

    return () => window.clearTimeout(id);
  }, [delay]);
}
