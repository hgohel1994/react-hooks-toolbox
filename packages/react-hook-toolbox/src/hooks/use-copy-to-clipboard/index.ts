import { useCallback, useState } from "react";

export interface UseCopyToClipboardReturn {
  copied: boolean;
  copy: (text: string) => Promise<boolean>;
  reset: () => void;
}

/**
 * Copy text to the clipboard with copied state feedback.
 *
 * @param resetDelay - Milliseconds before copied resets (default: 2000)
 */
export function useCopyToClipboard(
  resetDelay = 2000,
): UseCopyToClipboardReturn {
  const [copied, setCopied] = useState(false);

  const reset = useCallback(() => {
    setCopied(false);
  }, []);

  const copy = useCallback(
    async (text: string) => {
      if (typeof navigator === "undefined" || !navigator.clipboard) {
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);

        if (resetDelay > 0) {
          window.setTimeout(() => {
            setCopied(false);
          }, resetDelay);
        }

        return true;
      } catch {
        setCopied(false);
        return false;
      }
    },
    [resetDelay],
  );

  return { copied, copy, reset };
}

export default useCopyToClipboard;
