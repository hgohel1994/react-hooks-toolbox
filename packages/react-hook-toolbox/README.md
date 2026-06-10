# react-hook-toolbox

A collection of useful, tree-shakeable React custom hooks in **one npm package**. Install once — import only the hooks you use.

## Installation

```bash
npm install react-hook-toolbox
```

You only need **one install**. Pick individual hooks via import paths — no separate packages required.

## Usage

### Import one hook (recommended)

Your bundler includes only the hooks you import:

```tsx
import { useDebounce } from "react-hook-toolbox/use-debounce";
import { useToggle } from "react-hook-toolbox/use-toggle";
```

### Import from the main entry

```tsx
import { useDebounce, useToggle } from "react-hook-toolbox";
```

## Available hooks

| Hook | Import path |
|------|-------------|
| `useAsync` | `react-hook-toolbox/use-async` |
| `useClickOutside` | `react-hook-toolbox/use-click-outside` |
| `useCopyToClipboard` | `react-hook-toolbox/use-copy-to-clipboard` |
| `useCounter` | `react-hook-toolbox/use-counter` |
| `useDebounce` | `react-hook-toolbox/use-debounce` |
| `useDocumentTitle` | `react-hook-toolbox/use-document-title` |
| `useEventListener` | `react-hook-toolbox/use-event-listener` |
| `useFetch` | `react-hook-toolbox/use-fetch` |
| `useHover` | `react-hook-toolbox/use-hover` |
| `useIntersectionObserver` | `react-hook-toolbox/use-intersection-observer` |
| `useInterval` | `react-hook-toolbox/use-interval` |
| `useIsMounted` | `react-hook-toolbox/use-is-mounted` |
| `useKeyPress` | `react-hook-toolbox/use-key-press` |
| `useLocalStorage` | `react-hook-toolbox/use-local-storage` |
| `useMediaQuery` | `react-hook-toolbox/use-media-query` |
| `useOnMount` | `react-hook-toolbox/use-on-mount` |
| `useOnlineStatus` | `react-hook-toolbox/use-online-status` |
| `usePrevious` | `react-hook-toolbox/use-previous` |
| `useTimeout` | `react-hook-toolbox/use-timeout` |
| `useToggle` | `react-hook-toolbox/use-toggle` |
| `useWindowSize` | `react-hook-toolbox/use-window-size` |

## Requirements

- React 18+
- TypeScript types included
