# react-hook-hub

A collection of useful, tree-shakeable React custom hooks in **one npm package**. Install once — import only the hooks you use.

## Installation

```bash
npm install react-hook-hub
```

You only need **one install**. Pick individual hooks via import paths — no separate packages required.

## Usage

### Import one hook (recommended)

Your bundler includes only the hooks you import:

```tsx
import { useDebounce } from "react-hook-hub/use-debounce";
import { useToggle } from "react-hook-hub/use-toggle";
```

### Import from the main entry

```tsx
import { useDebounce, useToggle } from "react-hook-hub";
```

## Available hooks

| Hook | Import path |
|------|-------------|
| `useAsync` | `react-hook-hub/use-async` |
| `useClickOutside` | `react-hook-hub/use-click-outside` |
| `useCopyToClipboard` | `react-hook-hub/use-copy-to-clipboard` |
| `useCounter` | `react-hook-hub/use-counter` |
| `useDebounce` | `react-hook-hub/use-debounce` |
| `useDocumentTitle` | `react-hook-hub/use-document-title` |
| `useEventListener` | `react-hook-hub/use-event-listener` |
| `useFetch` | `react-hook-hub/use-fetch` |
| `useHover` | `react-hook-hub/use-hover` |
| `useIntersectionObserver` | `react-hook-hub/use-intersection-observer` |
| `useInterval` | `react-hook-hub/use-interval` |
| `useIsMounted` | `react-hook-hub/use-is-mounted` |
| `useKeyPress` | `react-hook-hub/use-key-press` |
| `useLocalStorage` | `react-hook-hub/use-local-storage` |
| `useMediaQuery` | `react-hook-hub/use-media-query` |
| `useOnMount` | `react-hook-hub/use-on-mount` |
| `useOnlineStatus` | `react-hook-hub/use-online-status` |
| `usePrevious` | `react-hook-hub/use-previous` |
| `useTimeout` | `react-hook-hub/use-timeout` |
| `useToggle` | `react-hook-hub/use-toggle` |
| `useWindowSize` | `react-hook-hub/use-window-size` |

## Requirements

- React 18+
- TypeScript types included
