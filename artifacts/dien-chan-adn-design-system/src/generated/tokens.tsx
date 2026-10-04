/* GENERATED FROM tokens.json -- DO NOT EDIT. Run scripts/build-tokens.mjs. */
// Portable design tokens (colors as hex). Web consumes the theme via
// src/index.css; mobile (Expo) and any other platform import this object so the
// whole product shares one source of truth.
export const tokens = {
  "color": {
    "light": {
      "background": "#fdfbf7",
      "foreground": "#012c4e",
      "border": "#d9cbbd",
      "card": "#ffffff",
      "cardForeground": "#012c4e",
      "popover": "#ffffff",
      "popoverForeground": "#012c4e",
      "primary": "#cf5c78",
      "primaryForeground": "#fffaf2",
      "secondary": "#ede6d6",
      "secondaryForeground": "#012c4e",
      "muted": "#ede6d6",
      "mutedForeground": "#426178",
      "accent": "#ead292",
      "accentForeground": "#012c4e",
      "destructive": "#b44664",
      "destructiveForeground": "#fffaf2",
      "input": "#cdbda9",
      "ring": "#ead292",
      "chart1": "#cf5c78",
      "chart2": "#347aa8",
      "chart3": "#55b7b0",
      "chart4": "#ead292",
      "chart5": "#8d5bc4",
      "sidebar": "#012c4e",
      "sidebarForeground": "#ede6d6",
      "sidebarBorder": "#315872",
      "sidebarPrimary": "#cf5c78",
      "sidebarPrimaryForeground": "#fffaf2",
      "sidebarAccent": "#174b64",
      "sidebarAccentForeground": "#ead292",
      "sidebarRing": "#ead292"
    },
    "dark": {
      "background": "#012c4e",
      "foreground": "#fdfbf7",
      "border": "#315872",
      "card": "#073e5e",
      "cardForeground": "#fdfbf7",
      "popover": "#073e5e",
      "popoverForeground": "#fdfbf7",
      "primary": "#cf5c78",
      "primaryForeground": "#fffaf2",
      "secondary": "#ede6d6",
      "secondaryForeground": "#012c4e",
      "muted": "#174b64",
      "mutedForeground": "#c8d0cf",
      "accent": "#ead292",
      "accentForeground": "#012c4e",
      "destructive": "#b44664",
      "destructiveForeground": "#fffaf2",
      "input": "#315872",
      "ring": "#ead292",
      "chart1": "#cf5c78",
      "chart2": "#347aa8",
      "chart3": "#55b7b0",
      "chart4": "#ead292",
      "chart5": "#8d5bc4",
      "sidebar": "#012c4e",
      "sidebarForeground": "#ede6d6",
      "sidebarBorder": "#315872",
      "sidebarPrimary": "#cf5c78",
      "sidebarPrimaryForeground": "#fffaf2",
      "sidebarAccent": "#174b64",
      "sidebarAccentForeground": "#ead292",
      "sidebarRing": "#ead292"
    }
  },
  "fontFamily": {
    "sans": [
      "DM Sans",
      "sans-serif"
    ],
    "serif": [
      "Fraunces",
      "Georgia",
      "serif"
    ],
    "mono": [
      "Space Mono",
      "monospace"
    ]
  },
  "radius": "1rem",
  "spacing": "0.25rem"
} as const;

export type Tokens = typeof tokens;
export default tokens;
