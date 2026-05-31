# react-hooks-toolbox

This monorepo uses [Changesets](https://github.com/changesets/changesets) for versioning and publishing.

## Adding a changeset

When you make a user-facing change, run:

```bash
npm run changeset
```

Follow the prompts to select packages and bump type (patch/minor/major).

## Release flow

1. Merge PRs with changeset files into `main`
2. The Release GitHub Action opens a "Version Packages" PR
3. Merge that PR to bump versions and update changelogs
4. The action publishes all packages to npm automatically

## Manual release (local)

```bash
npm run version-packages   # apply changesets locally
npm run release            # build + publish to npm
```

Requires `NPM_TOKEN` with publish access to `@react-hooks-toolbox` and `react-hooks-toolbox`.
