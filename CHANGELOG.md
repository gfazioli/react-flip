# Changelog

All notable changes to this project will be documented in this file.

This project follows [Semantic Versioning](https://semver.org/). Releases are managed with [Changesets](https://github.com/changesets/changesets); entries in this file after v1.0.0 are generated automatically.

## 1.0.0

First public release of `@gfazioli/react-flip` — a standalone React port of the Mantine [`@gfazioli/mantine-flip`](https://www.npmjs.com/package/@gfazioli/mantine-flip) component, with no Mantine peer dependency.

### Highlights

- **Compound API** — `<Flip>` with two children (front, back) plus `<Flip.Target>` to wire any element as a click trigger.
- **Controlled or uncontrolled** — `flipped` for full external state, `defaultFlipped` + `onChange` for hands-off.
- **Tunable animation** — `perspective`, `duration`, `easing`, `direction`, plus separate `directionFlipIn` / `directionFlipOut` for one-way coin-flip rotations.
- **Themeable via CSS variables** — every prop is mirrored as a `--rfp-*` custom property; override on any selector without touching JS.
- **Accessibility** — respects `prefers-reduced-motion`.
- **Tiny** — ~2 KB ESM gzipped, dual ESM + CJS, full `.d.ts`. Zero runtime dependencies — only React as a peer.
- **TypeScript-first** — full type declarations, `forwardRef` on the underlying `HTMLDivElement`.

### Differences from `@gfazioli/mantine-flip`

- Drops `@mantine/core` peer dependency entirely.
- CSS shipped as a static stylesheet (`@gfazioli/react-flip/styles.css`); no runtime style injection.
- No Mantine factory/styles API — use plain `className` / `style` / CSS variables.
