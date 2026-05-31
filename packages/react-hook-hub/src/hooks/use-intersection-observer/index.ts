import { RefObject, useEffect, useState } from "react";

export interface UseIntersectionObserverOptions
  extends IntersectionObserverInit {
  enabled?: boolean;
}

export interface UseIntersectionObserverReturn {
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
}

/**
 * Observe when an element enters or leaves the viewport.
 *
 * @param ref - Ref to the element to observe
 * @param options - IntersectionObserver options plus `enabled` flag
 */
export function useIntersectionObserver<T extends Element>(
  ref: RefObject<T | null>,
  options: UseIntersectionObserverOptions = {},
): UseIntersectionObserverReturn {
  const { enabled = true, ...observerOptions } = options;
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  const { root, rootMargin, threshold } = observerOptions;

  useEffect(() => {
    const element = ref.current;
    if (!enabled || !element) {
      return;
    }

    const observer = new IntersectionObserver(([nextEntry]) => {
      setEntry(nextEntry);
    }, { root, rootMargin, threshold });

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, enabled, root, rootMargin, threshold]);

  return {
    isIntersecting: entry?.isIntersecting ?? false,
    entry,
  };
}

export default useIntersectionObserver;
