# Mantine Flip Component

<img width="2752" height="1536" alt="Mantine Flip" src="https://github.com/user-attachments/assets/81a00eee-c1f2-40f1-8ad4-4357619cf855" />

<div align="center">

  [![NPM version](https://img.shields.io/npm/v/%40gfazioli%2Freact-flip?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/react-flip)
  [![NPM Downloads](https://img.shields.io/npm/dm/%40gfazioli%2Freact-flip?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/react-flip)
  [![NPM Downloads](https://img.shields.io/npm/dy/%40gfazioli%2Freact-flip?style=for-the-badge&label=%20&color=f90)](https://www.npmjs.com/package/@gfazioli/react-flip)
  ![NPM License](https://img.shields.io/npm/l/%40gfazioli%2Freact-flip?style=for-the-badge)

---

[<kbd> <br/> ❤️ If this component has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)  

</div>

## Overview

[React Flip](https://gfazioli.github.io/react-flip/) is a two-face container that animates between a front and a back view, ideal for compact UIs that need progressive disclosure (e.g., editing panels, settings, sign-in/sign-up toggles, or profile details). It supports both uncontrolled usage with Flip.Target to wire any element as a click trigger, and controlled usage via flipped/defaultFlipped using React state for full synchronization with your app logic. The component enforces exactly two children, accepts size constraints (w/h), and offers transition customization such as vertical flipping and distinct rotation directions for flip-in and flip-out. Styling hooks (classNames/Styles API) let you target inner parts for design refinement, while examples demonstrate practical patterns like credit-card editing, modal-like settings panes, and multi-target triggers within a single face.

> [!note]
>
> → [Demo and Documentation](https://gfazioli.github.io/react-flip/)

## Installation

```sh
npm install @gfazioli/react-flip
```
or 

```sh
yarn add @gfazioli/react-flip
```

After installation import package styles at the root of your application:

```tsx
import '@gfazioli/react-flip/styles.css';
```

## Usage

```tsx
import { Flip } from '@gfazioli/react-flip';

function Demo() {
  return (
    <Flip duration={2} directionFlipIn="positive" style={{ width: 200, height: 200 }}>
      <div style={{ backgroundColor: 'blue', color: 'white', height: '100%' }}>
        First
        <Flip.Target>
          <button type="button">Flip</button>
        </Flip.Target>
      </div>
      <div style={{ backgroundColor: 'red', color: 'white', height: '100%' }}>
        Second
        <Flip.Target>
          <button type="button">Back</button>
        </Flip.Target>
      </div>
    </Flip>
  );
}
```

As you can see, the `Flip` component wraps two children, which are the two views that you want to flip between.
The `Flip.Target` component is used to define the trigger for the flip animation. It can be any component, such as a button, or a link, or even a div.

## Sponsor

<div align="center">

[<kbd> <br/> ❤️ If this component has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)

</div>

Your support helps me:

- Keep the project actively maintained with timely bug fixes and security updates	
- Add new features, improve performance, and refine the developer experience	
- Expand test coverage and documentation for smoother adoption	
- Ensure long‑term sustainability without relying on ad hoc free time	
- Prioritize community requests and roadmap items that matter most

Open source thrives when those who benefit can give back—even a small monthly contribution makes a real difference. Sponsorships help cover maintenance time, infrastructure, and the countless invisible tasks that keep a project healthy.

Your help truly matters.

💚 [Become a sponsor](https://github.com/sponsors/gfazioli?o=esc) today and help me keep this project reliable, up‑to‑date, and growing for everyone.

---

https://github.com/user-attachments/assets/cc968450-9d8c-4b16-be58-a6766597742e

---
  
[![Star History Chart](https://api.star-history.com/svg?repos=gfazioli/react-flip&type=Timeline)](https://www.star-history.com/#gfazioli/react-flip&Timeline)

