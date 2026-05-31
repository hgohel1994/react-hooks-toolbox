import { useEffect, useState } from "react";

function getInitialMatch(query: string, defaultValue = false): boolean {
  if (typeof window === "undefined") {
    return defaultValue;
  }
  return window.matchMedia(query).matches;
}

/**
 * Returns whether a CSS media query currently matches.
 *
 * @param query - CSS media query string, e.g. `(min-width: 768px)`
 * @param defaultValue - Value used during SSR (default: false)
 */
export function useMediaQuery(query: string, defaultValue = false): boolean {
  const [matches, setMatches] = useState(() =>
    getInitialMatch(query, defaultValue),
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}

export default useMediaQuery;
