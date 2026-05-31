import { RefObject, useEffect, useRef } from "react";

type Target = Window | Document | HTMLElement | null | undefined;
type EventMap = WindowEventMap & DocumentEventMap & HTMLElementEventMap;

/**
 * Attach an event listener that stays in sync with the latest handler.
 *
 * @param eventName - Event name to listen for
 * @param handler - Event handler callback
 * @param element - Target element, ref, or window (default: window)
 * @param options - addEventListener options
 */
export function useEventListener<K extends keyof EventMap>(
  eventName: K,
  handler: (event: EventMap[K]) => void,
  element: Target | RefObject<HTMLElement | null> = window,
  options?: boolean | AddEventListenerOptions,
): void {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const target: Target =
      element && "current" in element ? element.current : element;

    if (!target?.addEventListener) {
      return;
    }

    const listener = (event: Event) => {
      savedHandler.current(event as EventMap[K]);
    };

    target.addEventListener(eventName, listener, options);
    return () => target.removeEventListener(eventName, listener, options);
  }, [eventName, element, options]);
}

export default useEventListener;
