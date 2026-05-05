import { useState } from "react";
import { Flip } from "@gfazioli/react-flip";
import "./Examples.css";

export function Examples() {
  return (
    <section className="section examples">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">In context</span>
          <h2>
            Looks like a <span className="gradient-text">real product</span>.
          </h2>
          <p>The same component, dropped into three real-world patterns: product card, settings flip, and auth.</p>
        </div>

        <div className="examples-grid">
          <ProductCard />
          <SettingsFlip />
          <AuthFlip />
        </div>
      </div>
    </section>
  );
}

function ProductCard() {
  return (
    <article className="example-tile" aria-labelledby="ex-product-title">
      <header>
        <h3 id="ex-product-title">Product card</h3>
        <p>Click anywhere on the card to reveal specs. Wire the click via Flip.Target.</p>
      </header>
      <div className="example-stage example-stage-product">
        <Flip>
          {[
            <article className="ex-product ex-product-front" key="front">
              <Flip.Target>
                <button type="button" className="ex-product-trigger" aria-label="Show specs">
                  <span className="ex-product-eyebrow">Headphones</span>
                  <h4>Aurora ANC</h4>
                  <p>$249 · 24h battery · over-ear</p>
                  <span className="ex-product-cta">Specs →</span>
                </button>
              </Flip.Target>
            </article>,
            <article className="ex-product ex-product-back" key="back">
              <Flip.Target>
                <button type="button" className="ex-product-trigger" aria-label="Hide specs">
                  <span className="ex-product-eyebrow">Specs</span>
                  <ul>
                    <li>40 mm dynamic drivers</li>
                    <li>Bluetooth 5.3 · multipoint</li>
                    <li>USB-C, 10 min = 6 h</li>
                  </ul>
                  <span className="ex-product-cta">← Back</span>
                </button>
              </Flip.Target>
            </article>,
          ]}
        </Flip>
      </div>
    </article>
  );
}

function SettingsFlip() {
  const [flipped, setFlipped] = useState(false);
  return (
    <article className="example-tile" aria-labelledby="ex-settings-title">
      <header>
        <h3 id="ex-settings-title">Settings flip</h3>
        <p>External React state controls the flip. Useful for modal-like inline editing.</p>
      </header>
      <div className="example-stage">
        <Flip flipped={flipped}>
          {[
            <section className="ex-settings ex-settings-front" key="front">
              <header>
                <h4>General</h4>
                <button type="button" className="ex-link" onClick={() => setFlipped(true)}>
                  Edit notifications →
                </button>
              </header>
              <dl>
                <dt>Theme</dt>
                <dd>System</dd>
                <dt>Language</dt>
                <dd>English (US)</dd>
                <dt>Time zone</dt>
                <dd>Europe/Rome</dd>
              </dl>
            </section>,
            <section className="ex-settings ex-settings-back" key="back">
              <header>
                <h4>Notifications</h4>
                <button type="button" className="ex-link" onClick={() => setFlipped(false)}>
                  ← Done
                </button>
              </header>
              <ul className="ex-toggle-list">
                <li>
                  <span>Email digest</span>
                  <span className="ex-pill ex-pill-on">on</span>
                </li>
                <li>
                  <span>Push alerts</span>
                  <span className="ex-pill">off</span>
                </li>
                <li>
                  <span>Mentions only</span>
                  <span className="ex-pill ex-pill-on">on</span>
                </li>
              </ul>
            </section>,
          ]}
        </Flip>
      </div>
    </article>
  );
}

function AuthFlip() {
  const [flipped, setFlipped] = useState(false);
  return (
    <article className="example-tile" aria-labelledby="ex-auth-title">
      <header>
        <h3 id="ex-auth-title">Sign in / Sign up</h3>
        <p>Vertical flip between two forms. No wasted space, no modal.</p>
      </header>
      <div className="example-stage">
        <Flip flipped={flipped} direction="vertical" duration={0.6}>
          {[
            <form
              className="ex-auth ex-auth-front"
              key="signin"
              onSubmit={e => {
                e.preventDefault();
              }}
            >
              <h4>Sign in</h4>
              <label>
                Email
                <input type="email" placeholder="you@example.com" />
              </label>
              <label>
                Password
                <input type="password" placeholder="••••••••" />
              </label>
              <button type="submit" className="ex-auth-submit">
                Sign in
              </button>
              <button type="button" className="ex-link ex-auth-link" onClick={() => setFlipped(true)}>
                No account? Sign up
              </button>
            </form>,
            <form
              className="ex-auth ex-auth-back"
              key="signup"
              onSubmit={e => {
                e.preventDefault();
              }}
            >
              <h4>Sign up</h4>
              <label>
                Name
                <input type="text" placeholder="Ada Lovelace" />
              </label>
              <label>
                Email
                <input type="email" placeholder="you@example.com" />
              </label>
              <label>
                Password
                <input type="password" placeholder="At least 8 characters" />
              </label>
              <button type="submit" className="ex-auth-submit">
                Create account
              </button>
              <button type="button" className="ex-link ex-auth-link" onClick={() => setFlipped(false)}>
                Already have an account? Sign in
              </button>
            </form>,
          ]}
        </Flip>
      </div>
    </article>
  );
}
