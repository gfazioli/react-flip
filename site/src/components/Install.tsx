import { useState } from "react";
import { CopyButton } from "./CopyButton";
import "./Install.css";

const TABS = [
  { id: "npm", label: "npm", cmd: "npm install @gfazioli/react-flip" },
  { id: "pnpm", label: "pnpm", cmd: "pnpm add @gfazioli/react-flip" },
  { id: "yarn", label: "yarn", cmd: "yarn add @gfazioli/react-flip" },
] as const;

const USAGE = `import { Flip } from "@gfazioli/react-flip";
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
}`;

export function Install() {
  const [active, setActive] = useState<(typeof TABS)[number]["id"]>("npm");
  const cmd = TABS.find(t => t.id === active)!.cmd;

  return (
    <section className="section install" id="install">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Get started</span>
          <h2>
            Two lines to install. <span className="gradient-text">Three to use.</span>
          </h2>
          <p>Requires React 18 or newer. Import the stylesheet once at the top of your app.</p>
        </div>

        <div className="install-grid">
          <div className="install-card">
            <div className="install-tabs" role="tablist">
              {TABS.map(t => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={active === t.id}
                  className={active === t.id ? "active" : ""}
                  onClick={() => setActive(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="install-cmd">
              <pre>
                <code>
                  <span className="install-prompt">$</span> {cmd}
                </code>
              </pre>
              <CopyButton text={cmd} variant="ghost" className="copy-btn-ghost" />
            </div>
          </div>

          <div className="install-card">
            <div className="install-tabs">
              <span className="install-tab-static">Card.tsx</span>
              <span className="install-spacer" />
              <CopyButton text={USAGE} variant="ghost" className="copy-btn-ghost" />
            </div>
            <pre className="install-usage">
              <code>{USAGE}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
