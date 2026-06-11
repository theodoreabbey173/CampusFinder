---
name: campusfinder-design
description: Use this skill to generate well-branded interfaces and assets for CampusFinder (a University of Ghana lost & found app), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick reference
- **Brand:** CampusFinder — lost & found for University of Ghana students. Warm, community-minded, trustworthy.
- **Colors:** Deep Blue `#1E40AF` (primary) · Indigo `#1E5080` · Teal `#14B8A6` (secondary / **Found**) · Orange `#FA8565` (accent / **Lost**). Full scales + semantic aliases in `tokens/colors.css`.
- **Type:** Plus Jakarta Sans (display/brand) + Manrope (body) + JetBrains Mono (codes). See `tokens/typography.css`.
- **Status convention:** Lost = orange, Found = teal — everywhere (badges, stripes, filters, stats).
- **Logo:** `assets/logo-horizontal.png`, `assets/logo-mark.png`. Reverse on dark with `filter: brightness(0) invert(1)`.
- **Components:** link `styles.css`, load `_ds_bundle.js`, then `const { Button, Badge, ItemCard, … } = window.CampusFinderDesignSystem_84dfef`.
- **Reference UI:** `ui_kits/mobile/` is a full interactive recreation of the app — copy its patterns.

## Files
- `readme.md` — full design guide (audit, content + visual foundations, iconography, accessibility).
- `styles.css` + `tokens/` — global tokens.
- `guidelines/*.card.html` — foundation specimen cards.
- `components/<group>/` — reusable React primitives (`.jsx` + `.d.ts` + `.prompt.md`).
- `ui_kits/mobile/` — interactive mobile app UI kit.
- `assets/` — logo PNGs.
