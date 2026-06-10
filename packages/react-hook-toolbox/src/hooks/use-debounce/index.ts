import { useEffect, useState } from "react";

/**
 * Returns a debounced version of the provided value.
 *
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 500)
 */
export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
