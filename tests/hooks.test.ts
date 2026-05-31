import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useDebounce } from "../packages/use-debounce/src/index";
import { useToggle } from "../packages/use-toggle/src/index";
import { usePrevious } from "../packages/use-previous/src/index";
import { useCounter } from "../packages/use-counter/src/index";
import { useIsMounted } from "../packages/use-is-mounted/src/index";
import { useOnMount } from "../packages/use-on-mount/src/index";
import { useFetch } from "../packages/use-fetch/src/index";

describe("useDebounce", () => {
  it("returns the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("hello", 300));
    expect(result.current).toBe("hello");
  });

  it("debounces value updates", () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: "a" } },
    );

    rerender({ value: "ab" });
    expect(result.current).toBe("a");

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe("ab");
    vi.useRealTimers();
  });
});

describe("useToggle", () => {
  it("toggles boolean state", () => {
    const { result } = renderHook(() => useToggle(false));

    expect(result.current.value).toBe(false);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.value).toBe(true);

    act(() => {
      result.current.setFalse();
    });

    expect(result.current.value).toBe(false);
  });
});

describe("usePrevious", () => {
  it("returns the previous value after updates", () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      { initialProps: { value: 1 } },
    );

    expect(result.current).toBeUndefined();

    rerender({ value: 2 });
    expect(result.current).toBe(1);

    rerender({ value: 3 });
    expect(result.current).toBe(2);
  });
});

describe("useCounter", () => {
  it("increments, decrements, and resets", () => {
    const { result } = renderHook(() => useCounter(0, { min: 0, max: 5 }));

    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);

    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment(10);
    });
    expect(result.current.count).toBe(5);

    act(() => {
      result.current.reset();
    });
    expect(result.current.count).toBe(0);
  });
});

describe("useIsMounted", () => {
  it("returns true while mounted", () => {
    const { result, unmount } = renderHook(() => useIsMounted());

    expect(result.current()).toBe(true);
    unmount();
  });
});

describe("useOnMount", () => {
  it("runs the effect once on mount", () => {
    const effect = vi.fn();

    renderHook(() => useOnMount(effect));

    expect(effect).toHaveBeenCalledTimes(1);
  });
});

describe("useFetch", () => {
  it("fetches data successfully", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ name: "Alice" }),
      }),
    );

    const { result } = renderHook(() => useFetch<{ name: string }>("/api/user"));

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual({ name: "Alice" });
    expect(result.current.error).toBeUndefined();

    vi.unstubAllGlobals();
  });

  it("skips fetch when url is null", () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const { result } = renderHook(() => useFetch(null));

    expect(fetchMock).not.toHaveBeenCalled();
    expect(result.current.loading).toBe(false);

    vi.unstubAllGlobals();
  });
});
