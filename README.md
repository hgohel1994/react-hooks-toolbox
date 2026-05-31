# react-hooks-toolbox

A collection of useful, tree-shakeable React custom hooks. Install the full toolbox or pick only the hooks you need.

## Installation

### Install all hooks

```bash
npm install react-hooks-toolbox
```

### Install a specific hook

Each hook is published as its own package under the `@react-hooks-toolbox` scope:

```bash
npm install @react-hooks-toolbox/use-debounce
npm install @react-hooks-toolbox/use-local-storage
npm install @react-hooks-toolbox/use-media-query
# ... and so on
```

## Usage

### Full package

```tsx
import {
  useDebounce,
  useLocalStorage,
  useMediaQuery,
  useToggle,
} from "react-hooks-toolbox";

function Search() {
  const [query, setQuery] = useLocalStorage("search", "");
  const debouncedQuery = useDebounce(query, 300);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { value: isOpen, toggle } = useToggle();

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <p>Debounced: {debouncedQuery}</p>
      <p>{isMobile ? "Mobile" : "Desktop"}</p>
      <button onClick={toggle}>{isOpen ? "Close" : "Open"}</button>
    </div>
  );
}
```

### Individual hook

```tsx
import { useDebounce } from "@react-hooks-toolbox/use-debounce";

function SearchInput({ value }: { value: string }) {
  const debounced = useDebounce(value, 500);
  // ...
}
```

## Available hooks

| Hook | Package | Description |
|------|---------|-------------|
| `useDebounce` | `@react-hooks-toolbox/use-debounce` | Debounce a value |
| `useLocalStorage` | `@react-hooks-toolbox/use-local-storage` | Persist state in localStorage |
| `useMediaQuery` | `@react-hooks-toolbox/use-media-query` | Subscribe to CSS media queries |
| `useClickOutside` | `@react-hooks-toolbox/use-click-outside` | Detect clicks outside an element |
| `useToggle` | `@react-hooks-toolbox/use-toggle` | Boolean state with helpers |
| `usePrevious` | `@react-hooks-toolbox/use-previous` | Track the previous value |
| `useWindowSize` | `@react-hooks-toolbox/use-window-size` | Track window dimensions |
| `useCopyToClipboard` | `@react-hooks-toolbox/use-copy-to-clipboard` | Copy text with feedback |
| `useIntersectionObserver` | `@react-hooks-toolbox/use-intersection-observer` | Observe element visibility |
| `useEventListener` | `@react-hooks-toolbox/use-event-listener` | Safe DOM event listeners |
| `useCounter` | `@react-hooks-toolbox/use-counter` | Counter with increment/decrement/reset |
| `useInterval` | `@react-hooks-toolbox/use-interval` | Declarative setInterval |
| `useTimeout` | `@react-hooks-toolbox/use-timeout` | Declarative setTimeout |
| `useHover` | `@react-hooks-toolbox/use-hover` | Track element hover state |
| `useOnlineStatus` | `@react-hooks-toolbox/use-online-status` | Browser online/offline status |
| `useDocumentTitle` | `@react-hooks-toolbox/use-document-title` | Set and restore page title |
| `useIsMounted` | `@react-hooks-toolbox/use-is-mounted` | Check if component is mounted |
| `useAsync` | `@react-hooks-toolbox/use-async` | Async loading/data/error state |
| `useKeyPress` | `@react-hooks-toolbox/use-key-press` | Keyboard shortcuts with modifiers |
| `useFetch` | `@react-hooks-toolbox/use-fetch` | Fetch data with loading/error state |
| `useOnMount` | `@react-hooks-toolbox/use-on-mount` | Run an effect once on mount |

## Requirements

- React 18+
- TypeScript types included

## Development

```bash
npm install
npm run build
npm test
npm run typecheck
```

## Versioning & publishing

This repo uses [Changesets](https://github.com/changesets/changesets). All packages are versioned together.

### Add a changeset (after making changes)

```bash
npm run changeset
```

### CI

GitHub Actions runs on every push/PR to `main`:

- Typecheck
- Tests
- Build

### Release to npm

1. Add a changeset for your changes and merge to `main`
2. The Release workflow opens a **Version Packages** PR
3. Merge that PR — packages are published automatically

**Setup required (one time):**

- Add `NPM_TOKEN` secret in GitHub repo settings (npm access token with publish rights)
- Create the `@react-hooks-toolbox` npm organization/scope

### Manual publish

```bash
npm run version-packages   # bump versions from changesets
npm run release            # build + publish all packages
```

## License

MIT
