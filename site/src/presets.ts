import { DEFAULT_CONFIG, type ThemeConfig } from "./hooks/useThemeConfig";

export interface Preset {
  id: string;
  name: string;
  description: string;
  config: ThemeConfig;
}

export const PRESETS: Preset[] = [
  {
    id: "classic",
    name: "Classic Card",
    description: "Calm horizontal flip — the right default for product cards and progressive disclosure.",
    config: DEFAULT_CONFIG,
  },
  {
    id: "fast-vertical",
    name: "Fast vertical",
    description: "Snappy 0.4s vertical flip. Great for compact toggles and inline state changes.",
    config: {
      ...DEFAULT_CONFIG,
      duration: 0.4,
      direction: "vertical",
    },
  },
  {
    id: "slow-dramatic",
    name: "Slow & dramatic",
    description: "1.6s linear flip with deep perspective. Hero showpieces and key reveals.",
    config: {
      ...DEFAULT_CONFIG,
      duration: 1.6,
      easing: "linear",
      perspective: 1600,
    },
  },
  {
    id: "coin-flip",
    name: "Coin flip",
    description: "Continuous one-way rotation — both flip-in and flip-out spin in the same direction.",
    config: {
      ...DEFAULT_CONFIG,
      duration: 1,
      direction: "horizontal",
      directionFlipIn: "negative",
      directionFlipOut: "negative",
    },
  },
  {
    id: "subtle",
    name: "Subtle UI",
    description: "Tight 0.3s ease-out flip with shallow perspective. For inline UI state, not showpieces.",
    config: {
      ...DEFAULT_CONFIG,
      duration: 0.3,
      easing: "ease-out",
      perspective: 600,
    },
  },
  {
    id: "spring",
    name: "Spring",
    description: "Overshooting cubic-bezier easing for a tactile, springy feel.",
    config: {
      ...DEFAULT_CONFIG,
      duration: 0.7,
      easing: "spring",
    },
  },
];
