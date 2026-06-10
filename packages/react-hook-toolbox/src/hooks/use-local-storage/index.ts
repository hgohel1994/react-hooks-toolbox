import { useCallback, useEffect, useState } from "react";

type SetValue<T> = T | ((prev: T) => T);

function readStoredValue<T>(key: string, initialValue: T): T {
  if (typeof window === "undefined") {
    return initialValue;
  }

  try {
    const item = window.localStorage.getItem(key);
    return item != null ? (JSON.parse(item) as T) : initialValue;
  } catch {
    return initialValue;
  }
}

/**
 * Sync state with localStorage. Supports functional updates like useState.
 *
 * @param key - localStorage key
 * @param initialValue - Value used when key is missing or on SSR
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: SetValue<T>) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() =>
    readStoredValue(key, initialValue),
  );

  const setValue = useCallback(
    (value: SetValue<T>) => {
      setStoredValue((prev) => {
        const nextValue =
          typeof value === "function"
            ? (value as (prev: T) => T)(prev)
            : value;

        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(nextValue));
        }

        return nextValue;
      });
    },
    [key],
  );

  const removeValue = useCallback(() => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key);
    }
    setStoredValue(initialValue);
  }, [initialValue, key]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === key && event.newValue != null) {
        try {
          setStoredValue(JSON.parse(event.newValue) as T);
        } catch {
          // Ignore invalid JSON from other tabs
        }
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [key]);

  return [storedValue, setValue, removeValue];
}

export default useLocalStorage;
