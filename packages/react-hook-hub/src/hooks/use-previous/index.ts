import { useRef } from "react";

/**
 * Returns the previous value from the last render.
 *
 * @param value - Current value to track
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<{ value: T; previous: T | undefined } | undefined>(
    undefined,
  );

  if (!ref.current) {
    ref.current = { value, previous: undefined };
  } else if (ref.current.value !== value) {
    ref.current.previous = ref.current.value;
    ref.current.value = value;
  }

  return ref.current.previous;
}

export default usePrevious;
