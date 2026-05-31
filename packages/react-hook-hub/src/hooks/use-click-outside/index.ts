import { RefObject, useEffect } from "react";

type Handler = (event: MouseEvent | TouchEvent) => void;

/**
 * Calls handler when a click/touch occurs outside the referenced element.
 *
 * @param ref - Ref to the target element
 * @param handler - Callback invoked on outside click
 * @param enabled - Whether the listener is active (default: true)
 */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: Handler,
  enabled = true,
): void {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const listener = (event: MouseEvent | TouchEvent) => {
      const element = ref.current;
      if (!element || element.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, enabled]);
}

export default useClickOutside;
