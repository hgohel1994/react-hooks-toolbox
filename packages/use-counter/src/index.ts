import { useCallback, useState } from "react";

export interface UseCounterOptions {
  min?: number;
  max?: number;
}

export interface UseCounterReturn {
  count: number;
  increment: (step?: number) => void;
  decrement: (step?: number) => void;
  reset: () => void;
  set: (value: number) => void;
}

function clamp(value: number, min?: number, max?: number): number {
  if (min != null && value < min) return min;
  if (max != null && value > max) return max;
  return value;
}

/**
 * Manage a numeric counter with increment, decrement, reset, and optional bounds.
 */
export function useCounter(
  initialValue = 0,
  options: UseCounterOptions = {},
): UseCounterReturn {
  const { min, max } = options;
  const [count, setCount] = useState(() => clamp(initialValue, min, max));

  const increment = useCallback(
    (step = 1) => {
      setCount((prev) => clamp(prev + step, min, max));
    },
    [min, max],
  );

  const decrement = useCallback(
    (step = 1) => {
      setCount((prev) => clamp(prev - step, min, max));
    },
    [min, max],
  );

  const reset = useCallback(() => {
    setCount(clamp(initialValue, min, max));
  }, [initialValue, min, max]);

  const set = useCallback(
    (value: number) => {
      setCount(clamp(value, min, max));
    },
    [min, max],
  );

  return { count, increment, decrement, reset, set };
}
