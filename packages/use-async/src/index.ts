import { useCallback, useEffect, useRef, useState } from "react";

export interface UseAsyncOptions {
  /** Run the async function immediately on mount (default: true) */
  immediate?: boolean;
}

export interface UseAsyncReturn<T> {
  data: T | undefined;
  error: Error | undefined;
  loading: boolean;
  execute: () => Promise<T | undefined>;
  reset: () => void;
}

/**
 * Manage loading, data, and error state for an async function.
 *
 * @param asyncFn - Async function to execute
 * @param options - Configuration options
 */
export function useAsync<T>(
  asyncFn: () => Promise<T>,
  options: UseAsyncOptions = {},
): UseAsyncReturn<T> {
  const { immediate = true } = options;
  const asyncFnRef = useRef(asyncFn);

  useEffect(() => {
    asyncFnRef.current = asyncFn;
  }, [asyncFn]);

  const [state, setState] = useState<{
    data: T | undefined;
    error: Error | undefined;
    loading: boolean;
  }>({
    data: undefined,
    error: undefined,
    loading: immediate,
  });

  const execute = useCallback(async (): Promise<T | undefined> => {
    setState((prev) => ({ ...prev, loading: true, error: undefined }));

    try {
      const data = await asyncFnRef.current();
      setState({ data, error: undefined, loading: false });
      return data;
    } catch (error) {
      const nextError =
        error instanceof Error ? error : new Error(String(error));
      setState({ data: undefined, error: nextError, loading: false });
      return undefined;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: undefined, error: undefined, loading: false });
  }, []);

  useEffect(() => {
    if (immediate) {
      void execute();
    }
  }, [execute, immediate]);

  return { ...state, execute, reset };
}
