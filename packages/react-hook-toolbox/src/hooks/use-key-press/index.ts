import { useEffect, useRef } from "react";

export interface UseKeyPressOptions {
  /** Require Ctrl (Windows/Linux) or Cmd (Mac) */
  ctrlOrMeta?: boolean;
  /** Require Shift key */
  shift?: boolean;
  /** Require Alt key */
  alt?: boolean;
  /** Whether the listener is active (default: true) */
  enabled?: boolean;
  /** Prevent default browser behavior when matched (default: false) */
  preventDefault?: boolean;
}

function matchesModifiers(
  event: KeyboardEvent,
  options: UseKeyPressOptions,
): boolean {
  const ctrlOrMeta = options.ctrlOrMeta ?? false;
  const shift = options.shift ?? false;
  const alt = options.alt ?? false;

  const hasCtrlOrMeta = event.ctrlKey || event.metaKey;

  if (ctrlOrMeta && !hasCtrlOrMeta) return false;
  if (!ctrlOrMeta && hasCtrlOrMeta) return false;
  if (shift && !event.shiftKey) return false;
  if (!shift && event.shiftKey) return false;
  if (alt && !event.altKey) return false;
  if (!alt && event.altKey) return false;

  return true;
}

/**
 * Listen for a specific key press with optional modifier keys.
 *
 * @param targetKey - Key to listen for (case-insensitive), e.g. `"Escape"` or `"k"`
 * @param handler - Callback when the key combination is pressed
 * @param options - Modifier and behavior options
 */
export function useKeyPress(
  targetKey: string,
  handler: (event: KeyboardEvent) => void,
  options: UseKeyPressOptions = {},
): void {
  const { enabled = true, preventDefault = false } = options;
  const savedHandler = useRef(handler);
  const savedOptions = useRef(options);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    savedOptions.current = options;
  }, [options]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const listener = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== targetKey.toLowerCase()) {
        return;
      }

      if (!matchesModifiers(event, savedOptions.current)) {
        return;
      }

      if (preventDefault) {
        event.preventDefault();
      }

      savedHandler.current(event);
    };

    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [targetKey, enabled, preventDefault]);
}
