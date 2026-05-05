import "./Features.css";

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    title: "Two faces, one prop",
    body: (
      <>
        Drop any two children inside <code>&lt;Flip&gt;</code> — the first is the front, the second is the back. Use{" "}
        <code>&lt;Flip.Target&gt;</code> to wire any element as a click trigger, or control it externally with{" "}
        <code>flipped</code>.
      </>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Tunable animation",
    body: (
      <>
        <code>perspective</code>, <code>duration</code>, <code>easing</code>, <code>direction</code>, plus separate{" "}
        <code>directionFlipIn</code> / <code>directionFlipOut</code> for one-way coin-flip rotations.
      </>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 2 7l10 5 10-5-10-5Z" />
        <path d="m2 17 10 5 10-5" />
        <path d="m2 12 10 5 10-5" />
      </svg>
    ),
    title: "Themeable via CSS variables",
    body: (
      <>
        Every prop is mirrored as a <code>--rfp-*</code> custom property — override on any selector, even per{" "}
        <code>:has()</code> or media query, without touching JS.
      </>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
      </svg>
    ),
    title: "Tiny and tree-shakeable",
    body: (
      <>
        ~2 KB ESM gzipped, dual ESM + CJS, full <code>.d.ts</code>. Zero runtime dependencies — only React as a peer.
      </>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-4" />
        <path d="M15 3h6v6" />
        <path d="M21 3 9 15" />
      </svg>
    ),
    title: "Controlled or uncontrolled",
    body: (
      <>
        Pass <code>flipped</code> for full external control with React state, or just <code>defaultFlipped</code> +{" "}
        <code>onChange</code> for a hands-off boundary.
      </>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "TypeScript-first",
    body: (
      <>
        Strongly typed props and exports, <code>forwardRef</code> returns the underlying <code>HTMLDivElement</code>.
        Plays nice with React 18 &amp; 19 and SSR.
      </>
    ),
  },
];

export function Features() {
  return (
    <section className="section features" id="features">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">What's in the box</span>
          <h2>
            One small surface, <span className="gradient-text">no surprises</span>.
          </h2>
          <p>One component, one optional sub-component for triggers. Standard React idioms. Standard CSS.</p>
        </div>
        <div className="features-grid">
          {FEATURES.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
