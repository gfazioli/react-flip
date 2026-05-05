# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`@gfazioli/react-flip` — a single-component React library that wraps any two faces and animates a 3D rotation between them. Published to npm as a scoped package. Built on the same toolchain pattern as the sibling projects `react-toggle-component` and `react-amiga-guru-meditation`.

## Stack

- **Language**: TypeScript 5 (`strict`, `verbatimModuleSyntax`, `target: ES2020`)
- **Build**: `tsup` → dual ESM + CJS + `.d.ts`, plus a single `index.css` from CSS Modules
- **Lint/format**: ESLint 9 flat config (typescript-eslint, react, react-hooks, jsx-a11y) + Prettier 3
- **Tests**: vitest + jsdom + @testing-library/react + @testing-library/user-event
- **Docs site**: custom Vite + React landing page in `site/` (single page)
- **Package manager**: pnpm 9
- **Release**: Changesets (CI workflow opens "Version Packages" PR; merging it publishes to npm)

## Commands

```bash
pnpm dev          # tsup --watch (rebuild on change)
pnpm build        # tsup — produces dist/index.{js,cjs,d.ts,css}
pnpm typecheck    # tsc --noEmit
pnpm lint         # eslint .
pnpm test         # vitest run (one-off)
pnpm test:watch   # vitest (watch)
pnpm site:dev     # vite dev — landing site at localhost:5173/react-flip/
pnpm site:build   # vite build → site-dist/ (deployed to GH Pages by CI)
pnpm site:preview # serve a built site-dist/ locally
pnpm changeset    # add a changeset (run before each PR that changes published behavior)
```

`prepublishOnly` runs typecheck + lint + test + build, so `pnpm publish` will not ship a broken artifact.

## Architecture

The public API is one component (with one sub-component) plus its types:

```ts
import { Flip, type FlipProps, type FlipBaseProps, type FlipDirection, type FlipIn, type FlipOut } from "@gfazioli/react-flip";
```

`src/Flip.tsx` accepts exactly two children — the first is the front face, the second is the back. The component computes a continuously increasing `rotateValue` (multiples of 180°) so that successive flips animate as a real rotation rather than snapping back through the same arc; this is what enables `directionFlipIn`/`directionFlipOut` to express coin-flip-style continuous rotation.

`src/FlipTarget/FlipTarget.tsx` is a tiny wrapper that clones its single child element, forwards `onClick` (preserving any user-provided handler), and exposes a `data-flipped` attribute. It exists so consumers can wire any element inside either face as a click trigger without lifting state.

### Controlled vs uncontrolled

Standard React convention via the local `useUncontrolled` helper: passing `flipped` makes it controlled; otherwise `defaultFlipped` is used as the initial uncontrolled state.

### Theming pipeline

`Flip.tsx` writes three inline CSS variables on the root element from the corresponding props:

| Variable | Prop |
|---|---|
| `--rfp-perspective` | `perspective` |
| `--rfp-duration` | `duration` (seconds, suffixed with `s`) |
| `--rfp-easing` | `easing` |

`Flip.module.css` consumes them with defaults inlined inside `var()`, never declared on `.root` directly — declaring them on `.root` would block inheritance from any wrapping ancestor that sets `--rfp-*` vars (which would silently break consumer theming via CSS-only):

```css
.flipContainer { transition: transform var(--rfp-duration, 0.8s) var(--rfp-easing, ease-in-out); }
```

`direction`, `directionFlipIn`, `directionFlipOut` are not exposed as CSS variables — they drive the rotation math directly in `Flip.tsx` because the back face must be pre-rotated by the inverse axis.

### Stylesheet shipping

CSS Modules are extracted by tsup/esbuild into `dist/index.css` and exposed via the package export `@gfazioli/react-flip/styles.css`. Consumers import it once. `sideEffects: ["**/*.css"]` keeps it tree-shake-safe.

### Accessibility

`prefers-reduced-motion: reduce` disables the transition entirely (no flip animation, but the visual state still toggles). `Flip.Target` does not touch ARIA — wrap your trigger in a real `<button>` so the consumer's existing semantics are preserved.

## Layout

- `src/` — library source (`Flip.tsx`, `Flip.module.css`, `Flip.context.ts`, `Flip.errors.ts`, `index.ts`, `FlipTarget/`, `utils/`)
- `tests/` — vitest specs
- `site/` — single-page Vite + React documentation site. Imports `Flip` from the package itself via Vite alias `@gfazioli/react-flip → ../src/index.ts`. Sections: Hero, Features, **live theme Builder** with URL-persisted config (`?t=base64`), Preset gallery, Examples (product card / settings flip / auth flip), Install. Floating capsule nav with IntersectionObserver-driven active link. SEO: `<title>`, `<meta description>`, Open Graph + Twitter Card with `og-default.png` (1200×630), `<link rel="canonical">`, plus `site/public/sitemap.xml` and `robots.txt`.
- `.changeset/` — pending release notes
- `.github/workflows/` — `ci.yml` (typecheck/lint/test/build/site-build), `deploy-docs.yml` (site → GH Pages on push to main), `release.yml` (Changesets publish)
- `dist/`, `site-dist/`, `coverage/` — build/test outputs, **gitignored**

## Conventions

- TS strict; `verbatimModuleSyntax` requires `import type` for type-only imports.
- `pnpm test` uses `classNameStrategy: "non-scoped"` so CSS-Module classnames are stable in jsdom; tests typically rely on roles or attributes rather than class names.
- The first v1 release was bumped manually (CHANGELOG written by hand). Subsequent releases go through Changesets — add a changeset for any user-facing change.
