# CampusFinder Design System

A complete, enterprise-grade design system for **CampusFinder** — a lost & found
mobile platform built for students at the **University of Ghana, Legon**. Students
report lost items, browse found items, and chat securely to reunite belongings
with their owners.

This system was reverse-engineered from the live product and re-skinned to an
investor-ready standard: real brand colors and logo, a typographic hierarchy,
spacing/elevation tokens, a library of reusable React components, and a fully
interactive mobile UI kit.

---

## Sources

Everything here was derived from materials supplied by the user. The reader may
not have access, but they are recorded for provenance and deeper exploration:

- **Brand sheet:** `uploads/Gemini_Generated_Image_kihi7ikihi7ikihi.png` — official
  CampusFinder logo lockups, color variations, and palette (Deep Blue `#1E40AF`,
  Indigo `#1E5080`, Teal `#14B8A6`, Orange `#FA8565`).
- **Source code:** GitHub — **`theodoreabbey173/CampusFinder`**
  (`https://github.com/theodoreabbey173/CampusFinder`, branch `master`). A React
  Native / Expo app (Firebase auth + Firestore). Screens analyzed:
  `SignUpScreen`, `LoginScreen`, `VerificationScreen`, `WelcomeScreen`,
  `ListScreen`, `DetailsScreen`, `ReportItemScreen`, `ChatScreen`, `InboxScreen`,
  `ConfirmationScreen`. **Explore this repo further** to build higher-fidelity
  designs against the real data model and flows.

---

## Audit — the original UI (Phase 1)

The shipped app is functional but not yet enterprise-ready:

- **Generic palette.** A stock Material blue (`#2196F3`) with `#4CAF50` green and
  `#FF5722` red — none of which are the actual CampusFinder brand colors. The pin
  logo and its blue→teal gradient never appear in-app.
- **Inconsistent surfaces.** Mixed grays (`#F4F7FB`, `#f5f5f5`, `#1a1a2e`), ad-hoc
  shadows, and varying radii (8 / 12 / 14 / 20 / 22) with no shared scale.
- **Emoji-only iconography** (📍🕒👤💬🔒) used as primary UI affordances.
- **Weak hierarchy.** Default system fonts, default React Navigation headers with
  blue "back" text, and dense, evenly-weighted text.
- **Thin states.** Loading is a bare spinner; empty states exist but are
  visually plain.

## Strategy — the redesign (Phase 2)

- **Lead with the brand.** Deep Blue primary, the pin logo, and the blue→teal
  gradient on heros and splash surfaces.
- **Encode meaning in color.** **Lost = Orange**, **Found = Teal** — consistent
  across badges, accent stripes, filters, and stats.
- **One token spine.** A single color / type / spacing / radius / elevation scale
  drives every component.
- **Trust cues.** A dark "ink" secure-chat treatment and explicit safety notes
  reinforce the privacy promise that is central to the product.
- **Preserve all functionality.** Every original screen, feature, and flow remains;
  only the presentation layer changes.

---

## Content fundamentals

How CampusFinder writes copy:

- **Voice:** warm, encouraging, and community-minded — it's a student helping a
  student. Headlines are direct and benefit-led: *"Reunite lost items with their
  owners,"* *"Welcome to CampusFinder!"*, *"Find what's lost."*
- **Person:** speaks to the user as **"you"** and acts as **"we"** for the
  platform ("We sent a 4-digit code…", "We'll notify you when someone reaches
  out"). Community framing uses **"others"** / **"classmates."**
- **Casing:** **Sentence case** for body, helper text, and most buttons. Screen
  titles and section labels use Title Case ("Lost & Found", "Report an Item",
  "Contact Information"). The wordmark is always **CampusFinder** — one word, camel-cased,
  Blue "Campus" + Teal "Finder."
- **Tone of safety:** privacy and security are stated plainly and reassuringly,
  never alarmingly: *"For privacy and security, all communication happens through
  our secure chat system."*
- **Length:** short. Labels are 1–3 words; helper text is one sentence; item
  descriptions are first-person and concrete ("I lost this item and would really
  appreciate…").
- **Emoji:** used sparingly as **inline meta markers** (📍 location, 🕒 time,
  👤 reporter, 🔒 secure, 🎓 class) and for friendly state accents (📭 empty,
  ✅ success). Never decorative in long-form copy. In the redesign these remain as
  lightweight markers but are paired with stronger typographic hierarchy.
- **Microcopy patterns:** placeholders give examples ("e.g. Blue Backpack, iPhone,
  Textbook"); confirmations are celebratory but brief; lists of guidance use short
  imperative bullets ("Be as specific as possible.").

---

## Visual foundations

- **Color vibe.** Cool, trustworthy, and modern — anchored by Deep Blue and a
  fresh Teal, warmed by a single Orange accent. Neutrals are a **cool slate**
  (slightly blue-tinted grays) so they sit harmoniously with the brand blues.
- **The brand gradient** (`--gradient-brand`, blue→teal at 135°) is lifted
  directly from the logo pin. It appears on auth/welcome heros and the app splash,
  not on body content.
- **Typography.** **Plus Jakarta Sans** (Extrabold/Bold) for the brand wordmark,
  headings, and screen titles — geometric, confident, enterprise-grade.
  **Manrope** for body, labels, and UI text — clean and highly legible.
  **JetBrains Mono** for codes and numeric tokens (e.g. the verification digits).
  *(Substituted from Google Fonts — see "Type substitution" below.)*
- **Spacing.** 4px base grid; screen side-gutter 20px; 12px between stacked cards;
  16px inside cards.
- **Corner radii.** Soft but not pill-everything: cards `14px`, inputs/buttons
  `12px`, small chips `8px`, full pills for filters/badges/CTAs-that-float, and
  `22–28px` on hero panels and the device frame.
- **Cards.** White surface, `1px` subtle cool-gray border, soft shadow
  (`--shadow-sm`), 14px radius. Status items add a **4px left accent stripe**
  (orange = lost, teal = found) — carried over from the original list design.
- **Elevation.** A 5-step shadow scale plus two **branded glows**
  (`--shadow-primary` blue, `--shadow-accent` orange) reserved for primary/floating
  CTAs. Shadows are low-opacity and tinted with the ink color, never pure black.
- **Backgrounds.** App pages use a near-white cool gray (`--surface-page`); marketing
  / preview surfaces use soft radial brand washes. No heavy textures, no noise.
- **Borders.** Hairline `1px` cool-gray on cards and dividers; `1.5px` on inputs;
  inputs gain a `2px` brand border + `3px` focus ring when active.
- **Transparency & blur.** Used lightly — a frosted (`backdrop-filter: blur`)
  logo tile on the gradient hero, and a translucent overlay scrim token
  (`--surface-overlay`) for modals.
- **Imagery.** Real photographs of items, cool-to-neutral in tone, shown in
  rounded `12px` containers. The secure-chat banner uses the dark **ink** tone
  with teal text to signal privacy.
- **Motion.** Purposeful and quick. Buttons brighten on hover and scale to `0.97`
  on press; cards lift `2px` with a deeper shadow on hover. Standard easing
  `cubic-bezier(0.4,0,0.2,1)` at 120–320ms; a gentle spring is available for
  playful accents. No infinite/looping decoration.
- **Hover / press states.** Hover = brightness `+6%` (solid) or tint fill
  (outline/ghost); press = subtle scale-down; cards = translateY lift.

---

## Iconography

- The original app uses **emoji as its entire icon set** — no icon font, SVG
  sprite, or image icons exist in the codebase. Emoji double as inline meta
  markers (📍 🕒 👤 🔒 🎓 💬 📦) and as state illustrations (📭 🔎 ✅ ⚠️).
- This system **keeps the emoji markers** (they're part of the established product
  voice and are universally legible) but recommends pairing them with stronger
  typography rather than relying on them as primary affordances.
- **For production / web work that needs a true icon set,** substitute
  **[Lucide](https://lucide.dev)** (CDN: `https://unpkg.com/lucide@latest`) — a
  clean, consistent 1.5–2px stroke set that matches the geometric brand feel.
  *Flagged substitution:* no original icon assets were available to copy, so Lucide
  is a recommended match, not the brand's own set.
- **Brand assets** (the pin logo) live in `assets/` as PNG — see below.

---

## Assets

Cropped from the supplied brand sheet (light-gray background baked in; suitable
for light surfaces — reverse the mark with `filter: brightness(0) invert(1)` on
dark/brand backgrounds, as the UI kit does):

- `assets/logo-horizontal.png` — primary horizontal lockup (mark + wordmark).
- `assets/logo-mark.png` — icon-only pin mark (app icon, avatars, compact headers).

---

## Index / manifest

**Root**
- `styles.css` — global entry point (imports only). Consumers link this.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`.
- `assets/` — logo PNGs.
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand).
- `components/` — reusable React primitives (below).
- `ui_kits/mobile/` — interactive mobile app recreation.
- `SKILL.md` — Agent-Skill entry point.

**Components** (`window.CampusFinderDesignSystem_84dfef`)
- `components/core/` — **Button, Badge, Avatar, Card**
- `components/forms/` — **Input, SearchBar**
- `components/navigation/` — **SegmentedTabs**
- `components/product/` — **ItemCard, StatBanner, ChatBubble, EmptyState**

**UI kit**
- `ui_kits/mobile/` — `index.html` (interactive) + `frame.jsx`, `screens-auth.jsx`,
  `screens-browse.jsx`, `screens-chat.jsx`, `app.jsx`. See its `README.md`.

---

## Type substitution — action needed

No original font files were supplied. We substituted close Google Fonts matches:
**Plus Jakarta Sans** (display/brand) and **Manrope** (body), with **JetBrains
Mono** for codes. These load via `tokens/fonts.css` from the Google Fonts CDN, so
the design-system compiler reports **0 bundled `@font-face` rules** — this is
expected and the fonts still render online. **If CampusFinder has official brand
fonts, please share the files** so we can self-host them and update the tokens.

## Accessibility

- Color pairings target **WCAG AA** for text: ink/body text on white, white on
  Deep Blue / Teal / Orange solids. Status colors are reinforced with **icons and
  labels** (dot + text), never color alone.
- Inputs show a visible `3px` focus ring; touch targets are ≥ 44px (buttons,
  filters, the floating Report action).
