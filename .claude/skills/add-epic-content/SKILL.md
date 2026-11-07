---
name: add-epic-content
description: Add or edit epics and episodes in Epic Atlas. Use when changing story text, map stops or characters, or adding a new epic such as the Aeneid or Gilgamesh.
---

# Epic content

The schema is in `content/types.ts`, and each epic has a file in `content/epics/`.

## Editing an episode

An episode has `id`, `title`, `place`, `x`, `y`, `summary` and `characters`. Array order is story order, and the route is drawn in that order.

- **Summary:** 2-3 sentences of about 30-45 words, so the card doesn't resize much between stops.
- **Wording:** write in your own words. Don't paste from translations, which may be under copyright.
- **Accuracy:** follow the traditional version of the story. Where versions differ, choose the widely known one and avoid stating disputed details as fact.
- **Respect:** the Ramayana and Mahabharata are living religious texts. Describe beliefs as beliefs, for example "many Hindus link Diwali to this homecoming".
- **Places:** where the location is legendary or disputed, say so in the epic's `mapCaption`.

## Placing a stop

`x` and `y` are in the shared 1000 x 700 viewBox. Keep stops at least 40 units apart, and nudge them apart if a real location is too close to another. The maps are stylised, so legibility comes first.

## Adding an epic

1. Add its id to `EpicId` in `content/types.ts`.
2. Create `content/epics/<id>.ts` and add it to the array in `content/index.ts`.
3. Add a backdrop component to `components/art/MapBackdrop.tsx` and register it in `BACKDROPS`.
4. Add `--<id>` and a `[data-epic="<id>"]` rule in `app/globals.css`, expose it under `@theme inline`, and add it to `BACKGROUND` in `components/EpicSwitcher.tsx`.
5. Update the footer sources in `app/page.tsx`, and the hero headline if it says "Four epics".

## Check your work

Run `npm test`. It checks for unique ids, stops on the map, spacing, and that summaries and characters are present. Then look at the map in a browser, because the tests can't tell whether a stop sits sensibly on the artwork.
