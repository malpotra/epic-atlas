---
name: neo-brutalist-ui
description: Design rules for Epic Atlas. Use when adding or changing any component, style, colour, layout, animation or SVG artwork in this repo.
---

# Neo-brutalist UI

All tokens and shared classes are in `app/globals.css`. Reuse them rather than adding one-off values.

## Look

- **Borders:** solid black, `--border` (4px) on cards and buttons. No rounded corners.
- **Shadows:** hard offset with no blur: `--shadow-sm`, `--shadow`, `--shadow-lg`. Never use a soft shadow or gradient.
- **Colour:** flat fills on `--paper`. Each epic owns one accent: `--odyssey`, `--iliad`, `--ramayana`, `--mahabharata`.
- **Type:** `font-display` (Archivo Black) in uppercase for headings, `font-sans` (Space Grotesk) for reading text, `font-mono` (Space Mono) for labels and data.

## Components

- Use `.brut-card` for panels and `.brut-btn` for anything clickable.
- A pressed button moves into its shadow: offset plus shadow always total 6px. `aria-pressed="true"` shows the pressed state, so use that for selected states.
- Inside `[data-epic]`, `--accent` and `bg-accent` follow the active epic. Don't hardcode an epic colour in shared components.

## Artwork

- Everything is original inline SVG in `components/art/`. Don't add stock images, or copy from films, TV series, comics or games.
- Use chunky geometric shapes with thick ink strokes, and colours from the tokens (`var(--ink)`).
- Maps use the shared 1000 x 700 viewBox.

## Requirements

- **Contrast:** text on any accent is `--ink`. White text only goes on `--ink`.
- **Keyboard:** every control is reachable and has a visible focus state. SVG controls need `role="button"`, `tabIndex`, an `aria-label` and Enter/Space handling, as in `components/JourneyMap.tsx`.
- **Motion:** decorative animation is CSS only. The `prefers-reduced-motion` block in `globals.css` turns it off globally, and JS-driven scrolling must check it too.
- **Mobile:** check at 375px wide. There must be no horizontal page scroll, including from hard shadows. Only the timeline strip scrolls sideways.

## Page structure

The app is one page, `app/page.tsx`. Don't add page routes.
