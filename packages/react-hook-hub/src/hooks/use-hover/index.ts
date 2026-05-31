import { RefObject, useEffect, useState } from "react";

/**
 * Returns whether the referenced element is currently hovered.
 *
 * @param ref - Ref to the target element
 */
export function useHover<T extends HTMLElement>(
  ref: RefObject<T | null>,
): boolean {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const onEnter = () => setIsHovered(true);
    const onLeave = () => setIsHovered(false);

    element.addEventListener("mouseenter", onEnter);
    element.addEventListener("mouseleave", onLeave);

    return () => {
      element.removeEventListener("mouseenter", onEnter);
      element.removeEventListener("mouseleave", onLeave);
    };
  }, [ref]);

  return isHovered;
}
