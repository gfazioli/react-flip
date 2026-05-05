<div align="center">

<img src="./assets/logo.svg" alt="" width="240" />

# @gfazioli/react-flip

**Two faces, one component. A 3D-rotation flip for React.**

[![npm version](https://img.shields.io/npm/v/@gfazioli/react-flip?style=flat-square&color=8b5cf6)](https://www.npmjs.com/package/@gfazioli/react-flip)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@gfazioli/react-flip?style=flat-square&label=gzip&color=8b5cf6)](https://bundlephobia.com/package/@gfazioli/react-flip)
[![types](https://img.shields.io/npm/types/@gfazioli/react-flip?style=flat-square&color=8b5cf6)](https://www.npmjs.com/package/@gfazioli/react-flip)
[![downloads](https://img.shields.io/npm/dm/@gfazioli/react-flip?style=flat-square&color=8b5cf6)](https://www.npmjs.com/package/@gfazioli/react-flip)
[![license](https://img.shields.io/npm/l/@gfazioli/react-flip?style=flat-square&color=8b5cf6)](./LICENSE)

[**Live playground →**](https://gfazioli.github.io/react-flip/) ・
[**Changelog**](./CHANGELOG.md)

</div>

<br/>

> Wrap any two faces and animate a 3D rotation between them. Themeable via CSS variables, controlled or uncontrolled, zero runtime dependencies, ~2 KB gzipped.

- 🃏 **Two faces, one prop** — drop any two children inside `<Flip>`. Use `<Flip.Target>` to wire any element as a click trigger.
- 🎛️ **Tunable** — `perspective`, `duration`, `easing`, `direction`, plus separate `directionFlipIn` / `directionFlipOut` for one-way coin-flip rotations.
- 🎨 **Themeable via CSS variables** — every prop is mirrored as a `--rfp-*` custom property; override on any selector.
- 📦 **Zero runtime dependencies** — only React as a peer dependency.
- 🪶 **Tiny** — ~2 KB ESM gzipped, tree-shakeable, dual ESM + CJS.
- ⌨️ **TypeScript-first** — full type declarations included.
- ♿ **Reduced-motion aware** — respects `prefers-reduced-motion`.

## Install

```bash
npm install @gfazioli/react-flip
# or
pnpm add @gfazioli/react-flip
# or
yarn add @gfazioli/react-flip
```

Requires React 18 or newer.

## Usage

```tsx
import { Flip } from "@gfazioli/react-flip";
import "@gfazioli/react-flip/styles.css";

export function Card() {
  return (
    <Flip>
      <FrontFace />
      <BackFace>
        <Flip.Target>
          <button type="button">Done</button>
        </Flip.Target>
      </BackFace>
    </Flip>
  );
}
```

The stylesheet must be imported once in your app (root layout, entry file, or wherever you prefer). The component expects **exactly two children** — the first is the front, the second is the back.

### Controlled

```tsx
const [open, setOpen] = useState(false);

<Flip flipped={open} onChange={setOpen}>
  <Front />
  <Back />
</Flip>;
```

### Uncontrolled with Flip.Target

`Flip.Target` clones its single child element and wires `onClick` to toggle the flip — preserving any existing `onClick` you passed.

```tsx
<Flip defaultFlipped={false} onChange={(next) => console.log("flipped:", next)}>
  <article>
    <h2>Front</h2>
    <Flip.Target>
      <button type="button">Show specs</button>
    </Flip.Target>
  </article>
  <article>
    <h2>Back</h2>
    <Flip.Target>
      <button type="button">Back</button>
    </Flip.Target>
  </article>
</Flip>
```

### Vertical flip

```tsx
<Flip direction="vertical">
  <Front />
  <Back />
</Flip>
```

### Coin flip (one-way rotation)

By default the component reverses the rotation direction when flipping back. Set `directionFlipIn` and `directionFlipOut` to the same value to keep spinning the same way:

```tsx
<Flip directionFlipIn="negative" directionFlipOut="negative">
  <Front />
  <Back />
</Flip>
```

## Theming

Three properties are mirrored as CSS custom properties on the root element. Override them on any selector to theme one boundary, a section, or the whole app:

```css
.my-card {
  --rfp-perspective: 1400px;
  --rfp-duration: 1.2s;
  --rfp-easing: cubic-bezier(0.5, -0.25, 0.5, 1.4);
}
```

| Variable | Default | Equivalent prop |
|---|---|---|
| `--rfp-perspective` | `1000px` | `perspective` |
| `--rfp-duration` | `0.8s` | `duration` (number, in seconds) |
| `--rfp-easing` | `ease-in-out` | `easing` |

`direction` and the `directionFlipIn`/`directionFlipOut` pair are **not** exposed as CSS variables — they drive the rotation math directly because the back face must be pre-rotated on the inverse axis.

## Props

### `<Flip>`

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `[ReactNode, ReactNode]` | — | Exactly two children. First is front, second is back. |
| `flipped` | `boolean` | — | Controlled flipped state. |
| `defaultFlipped` | `boolean` | `false` | Uncontrolled initial state. |
| `onChange` | `(flipped: boolean) => void` | — | Fires with the new boolean value on each flip. |
| `onBack` | `() => void` | — | Fires when the back face becomes visible. |
| `onFront` | `() => void` | — | Fires when the front face becomes visible. |
| `perspective` | `string` | `"1000px"` | CSS perspective for the 3D rotation. |
| `duration` | `number` | `0.8` | Animation duration, in **seconds**. |
| `easing` | `CSS transitionTimingFunction` | `"ease-in-out"` | Easing function. |
| `direction` | `"horizontal" \| "vertical"` | `"horizontal"` | Rotation axis (Y for horizontal, X for vertical). |
| `directionFlipIn` | `"positive" \| "negative"` | `"negative"` | Rotation sign when showing the back. |
| `directionFlipOut` | `"positive" \| "negative"` | `"positive"` | Rotation sign when showing the front. |
| `className`, `style` | — | — | Applied to the root wrapper. |

`forwardRef` returns the underlying `HTMLDivElement`.

### `<Flip.Target>`

| Prop | Type | Description |
|---|---|---|
| `children` | `ReactElement` | A single React element. Strings, numbers, fragments, and arrays are not supported. |

The clone receives a `data-flipped` attribute mirroring the current state (useful for CSS styling), and an `onClick` that toggles the flip while preserving the original handler.

## License

MIT — © Giovambattista Fazioli

## Sponsor

If this project saves you time, consider [sponsoring on GitHub](https://github.com/sponsors/gfazioli) — it directly supports continued maintenance and new releases.

<p align="center">
  <a href="https://github.com/sponsors/gfazioli">
    <img src="https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86" alt="Sponsor on GitHub" />
  </a>
</p>
