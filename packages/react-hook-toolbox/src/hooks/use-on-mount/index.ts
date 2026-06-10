import { useEffect } from "react";

/**
 * Runs an effect once when the component mounts. Supports cleanup functions.
 *
 * @param effect - Function to run on mount; may return a cleanup function
 */
export function useOnMount(effect: () => void | (() => void)): void {
  useEffect(() => effect(), []);
}
