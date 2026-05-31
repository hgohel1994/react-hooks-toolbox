import { useCallback, useEffect, useRef, useState } from "react";

export interface UseFetchOptions extends Omit<RequestInit, "body"> {
  /** Fetch immediately when url is set (default: true) */
  immediate?: boolean;
  /** Parse response as JSON (default: true) */
  parseJson?: boolean;
}

export interface UseFetchReturn<T> {
  data: T | undefined;
  error: Error | undefined;
  loading: boolean;
  refetch: () => Promise<T | undefined>;
  abort: () => void;
}

/**
 * Fetch data from a URL with loading, error, and refetch support.
 * Pass `null` as url to skip fetching.
 */
export function useFetch<T = unknown>(
  url: string | null,
  options: UseFetchOptions = {},
): UseFetchReturn<T> {
  const { immediate = true, parseJson = true, ...requestInit } = options;
  const requestInitRef = useRef(requestInit);

  useEffect(() => {
    requestInitRef.current = requestInit;
  }, [requestInit]);

  const [state, setState] = useState<{
    data: T | undefined;
    error: Error | undefined;
    loading: boolean;
  }>({
    data: undefined,
    error: undefined,
    loading: immediate && url != null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const abort = useCallback(() => {
    abortControllerRef.current?.abort();
  }, []);

  const refetch = useCallback(async (): Promise<T | undefined> => {
    if (url == null) {
      setState({ data: undefined, error: undefined, loading: false });
      return undefined;
    }

    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setState((prev) => ({ ...prev, loading: true, error: undefined }));

    try {
      const response = await fetch(url, {
        ...requestInitRef.current,
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = parseJson
        ? ((await response.json()) as T)
        : ((await response.text()) as T);

      setState({ data, error: undefined, loading: false });
      return data;
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return undefined;
      }

      const nextError =
        error instanceof Error ? error : new Error(String(error));
      setState({ data: undefined, error: nextError, loading: false });
      return undefined;
    }
  }, [url, parseJson]);

  useEffect(() => {
    if (immediate && url != null) {
      void refetch();
    }

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [url, immediate, refetch]);

  return { ...state, refetch, abort };
}
