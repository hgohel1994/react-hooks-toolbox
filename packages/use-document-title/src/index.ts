import { useEffect, useRef } from "react";

/**
 * Sets `document.title` and restores the previous title on unmount.
 *
 * @param title - The page title to set
 */
export function useDocumentTitle(title: string): void {
  const previousTitle = useRef<string | null>(null);

  useEffect(() => {
    previousTitle.current = document.title;
    document.title = title;

    return () => {
      if (previousTitle.current != null) {
        document.title = previousTitle.current;
      }
    };
  }, [title]);
}
