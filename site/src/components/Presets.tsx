import { useEffect, useState } from "react";
import { Flip } from "@gfazioli/react-flip";
import { EASING_VALUE, useThemeConfig } from "../hooks/useThemeConfig";
import { PRESETS } from "../presets";
import "./Presets.css";

export function Presets() {
  const { setConfig } = useThemeConfig();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setTick(t => t + 1), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="section presets" id="presets">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Preset gallery</span>
          <h2>
            Or start from a <span className="gradient-text">preset</span>.
          </h2>
          <p>Click any card to load it into the builder above. Then tweak, copy, ship.</p>
        </div>

        <div className="presets-grid">
          {PRESETS.map((preset, i) => {
            const flipped = (tick + i) % 2 === 1;
            return (
              <button
                key={preset.id}
                type="button"
                className="preset-card"
                onClick={() => {
                  setConfig(preset.config);
                  document.querySelector("#builder")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                aria-label={`Load ${preset.name} preset`}
              >
                <div className="preset-stage">
                  <div className="preset-card-flip">
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
                        <div className="preset-face preset-face-front" key="f">
                          <span>A</span>
                        </div>,
                        <div className="preset-face preset-face-back" key="b">
                          <span>B</span>
                        </div>,
                      ]}
                    </Flip>
                  </div>
                </div>
                <div className="preset-meta">
                  <h3>{preset.name}</h3>
                  <p>{preset.description}</p>
                </div>
                <span className="preset-arrow" aria-hidden="true">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
