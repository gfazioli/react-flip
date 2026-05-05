import { useEffect, useState } from "react";
import { Flip } from "@gfazioli/react-flip";
import {
  EASING_VALUE,
  useThemeConfig,
  type EasingKey,
  type FlipDirection,
  type FlipDirectionInOut,
  type ThemeConfig,
} from "../hooks/useThemeConfig";
import { CopyButton } from "./CopyButton";
import "./Builder.css";

const EASING_OPTIONS: { id: EasingKey; label: string }[] = [
  { id: "ease-in-out", label: "ease-in-out" },
  { id: "ease", label: "ease" },
  { id: "ease-in", label: "ease-in" },
  { id: "ease-out", label: "ease-out" },
  { id: "linear", label: "linear" },
  { id: "spring", label: "spring" },
];

const DIRECTION_OPTIONS: { id: FlipDirection; label: string }[] = [
  { id: "horizontal", label: "Horizontal" },
  { id: "vertical", label: "Vertical" },
];

const DIRECTION_IN_OUT_OPTIONS: { id: FlipDirectionInOut; label: string }[] = [
  { id: "negative", label: "Negative" },
  { id: "positive", label: "Positive" },
];

export function Builder() {
  const { config, patch, reset, shareUrl } = useThemeConfig();

  return (
    <section className="section builder" id="builder">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Live builder</span>
          <h2>
            Tune it. <span className="gradient-text">Copy it.</span> Ship it.
          </h2>
          <p>Every prop maps to a value or a CSS variable. Tweak the controls, share the URL, paste the snippet.</p>
        </div>

        <div className="builder-grid">
          <div className="builder-controls">
            <div className="builder-group">
              <h4>Animation</h4>
              <div className="builder-rows">
                <NumRow
                  label="Perspective"
                  min={200}
                  max={2400}
                  step={50}
                  value={config.perspective}
                  format={v => `${v}px`}
                  onChange={v => patch({ perspective: v })}
                />
                <NumRow
                  label="Duration"
                  min={1}
                  max={30}
                  step={1}
                  value={Math.round(config.duration * 10)}
                  format={v => `${(v / 10).toFixed(1)}s`}
                  onChange={v => patch({ duration: v / 10 })}
                />
              </div>
            </div>

            <PillRow
              title="Easing"
              options={EASING_OPTIONS}
              value={config.easing}
              onChange={v => patch({ easing: v })}
            />

            <PillRow
              title="Direction"
              options={DIRECTION_OPTIONS}
              value={config.direction}
              onChange={v => patch({ direction: v })}
            />

            <PillRow
              title="Flip in"
              options={DIRECTION_IN_OUT_OPTIONS}
              value={config.directionFlipIn}
              onChange={v => patch({ directionFlipIn: v })}
            />

            <PillRow
              title="Flip out"
              options={DIRECTION_IN_OUT_OPTIONS}
              value={config.directionFlipOut}
              onChange={v => patch({ directionFlipOut: v })}
            />

            <div className="builder-actions">
              <button type="button" className="btn btn-secondary" onClick={reset}>
                Reset
              </button>
              <CopyButton text={shareUrl} variant="secondary" label="Copy share URL">
                <span>Share URL</span>
              </CopyButton>
            </div>
          </div>

          <BuilderPreview config={config} />
        </div>
      </div>
    </section>
  );
}

function NumRow({
  label,
  min,
  max,
  step,
  value,
  format,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="builder-row builder-row-num">
      <span className="builder-row-label">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step ?? 1}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
      />
      <span className="builder-row-value">{format(value)}</span>
    </label>
  );
}

function PillRow<T extends string>({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="builder-group">
      <h4>{title}</h4>
      <div className="builder-rows">
        <div className="builder-row builder-row-pills">
          <div className="builder-pills" role="radiogroup" aria-label={title}>
            {options.map(opt => (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={value === opt.id}
                className={`builder-pill ${value === opt.id ? "active" : ""}`}
                onClick={() => onChange(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BuilderPreview({ config }: { config: ThemeConfig }) {
  const [tab, setTab] = useState<"jsx" | "css">("jsx");
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setFlipped(v => !v), Math.max(1500, config.duration * 1000 + 1200));
    return () => clearInterval(id);
  }, [config.duration]);

  return (
    <div className="builder-preview">
      <div className="builder-preview-stage">
        <div className="builder-card-stage">
          <Flip
            flipped={flipped}
            perspective={`${config.perspective}px`}
            duration={config.duration}
            easing={EASING_VALUE[config.easing]}
            direction={config.direction}
            directionFlipIn={config.directionFlipIn}
            directionFlipOut={config.directionFlipOut}
          >
            {[
              <div className="builder-face builder-face-front" key="front">
                <span>Front</span>
              </div>,
              <div className="builder-face builder-face-back" key="back">
                <span>Back</span>
              </div>,
            ]}
          </Flip>
        </div>
      </div>

      <div className="builder-code">
        <div className="builder-code-tabs" role="tablist">
          <button
            role="tab"
            aria-selected={tab === "jsx"}
            className={tab === "jsx" ? "active" : ""}
            onClick={() => setTab("jsx")}
          >
            JSX
          </button>
          <button
            role="tab"
            aria-selected={tab === "css"}
            className={tab === "css" ? "active" : ""}
            onClick={() => setTab("css")}
          >
            CSS
          </button>
          <span className="builder-code-spacer" />
          <CopyButton
            text={tab === "jsx" ? jsxSnippet(config) : cssSnippet(config)}
            variant="ghost"
            className="copy-btn-ghost"
            label="Copy snippet"
          >
            <span>Copy</span>
          </CopyButton>
        </div>
        <pre className="builder-code-block">
          <code>{tab === "jsx" ? jsxSnippet(config) : cssSnippet(config)}</code>
        </pre>
      </div>
    </div>
  );
}

function jsxSnippet(c: ThemeConfig): string {
  return `<Flip
  perspective="${c.perspective}px"
  duration={${c.duration}}
  easing=${JSON.stringify(EASING_VALUE[c.easing])}
  direction="${c.direction}"
  directionFlipIn="${c.directionFlipIn}"
  directionFlipOut="${c.directionFlipOut}"
>
  <Front />
  <Back />
</Flip>`;
}

function cssSnippet(c: ThemeConfig): string {
  return `.my-flip {
  --rfp-perspective: ${c.perspective}px;
  --rfp-duration: ${c.duration}s;
  --rfp-easing: ${EASING_VALUE[c.easing]};
}`;
}
