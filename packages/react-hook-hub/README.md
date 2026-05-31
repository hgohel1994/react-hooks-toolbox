# react-hook-hub

A collection of useful, tree-shakeable React custom hooks in **one npm package**. Install once, import everything or only the hooks you need.

## Installation

```bash
npm install react-hook-hub
```

## Usage

### Import all hooks

```tsx
import {
  useDebounce,
  useLocalStorage,
  useMediaQuery,
  useToggle,
} from "react-hook-hub";
```

### Import only one hook (tree-shakeable)

Bundlers will only include the hook you import:

```tsx
import { useDebounce } from "react-hook-hub/use-debounce";
import { useFetch } from "react-hook-hub/use-fetch";
import { useToggle } from "react-hook-hub/use-toggle";
```

## Available hooks

| Hook | Subpath import |
|------|----------------|
| `useDebounce` | `react-hook-hub/use-debounce` |
| `useLocalStorage` | `react-hook-hub/use-local-storage` |
| `useMediaQuery` | `react-hook-hub/use-media-query` |
| `useClickOutside` | `react-hook-hub/use-click-outside` |
| `useToggle` | `react-hook-hub/use-toggle` |
| `usePrevious` | `react-hook-hub/use-previous` |
| `useWindowSize` | `react-hook-hub/use-window-size` |
| `useCopyToClipboard` | `react-hook-hub/use-copy-to-clipboard` |
| `useIntersectionObserver` | `react-hook-hub/use-intersection-observer` |
| `useEventListener` | `react-hook-hub/use-event-listener` |
| `useCounter` | `react-hook-hub/use-counter` |
| `useInterval` | `react-hook-hub/use-interval` |
| `useTimeout` | `react-hook-hub/use-timeout` |
| `useHover` | `react-hook-hub/use-hover` |
| `useOnlineStatus` | `react-hook-hub/use-online-status` |
| `useDocumentTitle` | `react-hook-hub/use-document-title` |
| `useIsMounted` | `react-hook-hub/use-is-mounted` |
| `useAsync` | `react-hook-hub/use-async` |
| `useKeyPress` | `react-hook-hub/use-key-press` |
| `useFetch` | `react-hook-hub/use-fetch` |
| `useOnMount` | `react-hook-hub/use-on-mount` |

## Requirements

- React 18+
- TypeScript types included

## License

MIT
