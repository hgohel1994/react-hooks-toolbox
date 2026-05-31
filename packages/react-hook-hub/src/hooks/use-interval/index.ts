import { useEffect, useRef } from "react";

/**
 * Run a callback on a fixed interval. Pass `null` as delay to pause.
 *
 * @param callback - Function to call on each tick
 * @param delay - Interval in milliseconds, or null to disable
 */
export function useInterval(callback: () => void, delay: number | null): void {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return;
    }

    const id = window.setInterval(() => {
      savedCallback.current();
    }, delay);

    return () => window.clearInterval(id);
  }, [delay]);
}
