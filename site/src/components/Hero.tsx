import { useEffect, useState } from "react";
import { Flip } from "@gfazioli/react-flip";
import { CopyButton } from "./CopyButton";
import { EASING_VALUE } from "../hooks/useThemeConfig";
import { PRESETS } from "../presets";
import "./Hero.css";

export function Hero() {
  const [presetIdx, setPresetIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const flipId = setInterval(() => setFlipped((v) => !v), 2400);
    const presetId = setInterval(() => setPresetIdx((i) => (i + 1) % PRESETS.length), 7200);
    return () => {
      clearInterval(flipId);
      clearInterval(presetId);
    };
  }, []);

  const preset = PRESETS[presetIdx]!;

  return (
    <section className="hero" id="top">
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-inner">
        <span className="eyebrow">
          <span className="eyebrow-dot" /> v1.0 · React 18 &amp; 19
        </span>

        <h1>
          Two faces, <span className="gradient-text">one component</span>.
        </h1>

        <p className="hero-sub">
          A React component that wraps any two faces and animates a 3D rotation between them. Themeable via{" "}
          <code>perspective</code> / <code>duration</code> / <code>easing</code>, zero runtime dependencies.
        </p>

        <div className="hero-cta">
          <CopyButton text="npm install @gfazioli/react-flip" variant="primary">
            <span className="hero-cta-cmd">
              <span className="hero-cta-prompt">$</span> npm install @gfazioli/react-flip
            </span>
          </CopyButton>
          <a
            href="https://github.com/gfazioli/react-flip"
            className="btn btn-secondary"
            target="_blank"
            rel="noreferrer noopener"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.27-.01-1-.02-1.96-3.2.69-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.34.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.16 1.18a10.97 10.97 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.26 5.69.42.36.78 1.07.78 2.16 0 1.56-.01 2.81-.01 3.19 0 .31.21.67.8.55C20.21 21.39 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5z" />
            </svg>
            Star on GitHub
          </a>
        </div>

        <div className="hero-showcase" aria-hidden="true">
          <div className="hero-card-stage">
            <Flip
              flipped={flipped}
              perspective={`${preset.config.perspective}px`}
              duration={preset.config.duration}
              easing={EASING_VALUE[preset.config.easing]}
              direction={preset.config.direction}
              directionFlipIn={preset.config.directionFlipIn}
              directionFlipOut={preset.config.directionFlipOut}
            >
              {[
                <div className="hero-face hero-face-front" key="front">
                  <span className="hero-face-eyebrow">Product</span>
                  <h3 className="hero-face-title">Aurora Headphones</h3>
                  <p className="hero-face-meta">$249 · 24h battery · ANC</p>
                  <span className="hero-face-cta">Tap to flip →</span>
                </div>,
                <div className="hero-face hero-face-back" key="back">
                  <span className="hero-face-eyebrow">Specs</span>
                  <ul className="hero-face-list">
                    <li>40 mm dynamic drivers</li>
                    <li>Bluetooth 5.3 · multipoint</li>
                    <li>USB-C, 10 min = 6 h</li>
                    <li>Mic with adaptive ENC</li>
                  </ul>
                  <span className="hero-face-cta">← Tap to flip back</span>
                </div>,
              ]}
            </Flip>
          </div>
          <div className="hero-showcase-meta">
            <span className="hero-showcase-name">{preset.name}</span>
            <span className="hero-showcase-hint">cycling presets — see all below</span>
          </div>
        </div>
      </div>
    </section>
  );
}
