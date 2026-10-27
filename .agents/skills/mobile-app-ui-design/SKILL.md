---
name: mobile-app-ui-design
description: Design high-quality mobile app UI/UX screens, flows, and components following top-tier app benchmarks (Airbnb, Duolingo, Spotify, HeyDealer). Use when building mobile-first screens, app navigation, bottom sheets, mobile forms, or refining mobile viewports (375px–414px).
---

# Mobile App UI/UX Design

Proven guidelines for building fluid, intuitive, production-grade mobile app experiences.

---

## 1. Core Mobile Design Rules

### 60 / 30 / 10 Color Rule
- **60% Neutral Base**: Warm Ivory (`#FAF9F6`), Light Slate (`#F8FAFC`), or Pure White card surfaces.
- **30% Structural Contrast**: Charcoal / Deep Slate (`#0F172A`, `#1E293B`) for headings and primary content.
- **10% Brand Accent**: Forest Emerald (`#047857`) for primary CTAs, active indicators, and trust badges.
- *Tip*: Use the brand accent at 5%–10% opacity (`bg-brand-light`) for secondary pill backgrounds and subtle container highlights.

### 8-Point Grid Spacing System
- Spacing values must follow multiples of 4px / 8px: `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`.
- **Relationship spacing**: Related text elements (title + subtitle) should be 4px–8px apart; distinct cards or sections should be 16px–24px apart.

### Thumb-Zone Ergonomics
- Position primary call-to-actions (CTAs) within the bottom 1/3 of the screen for natural one-handed thumb reach.
- Fixed bottom actions must have a safe bottom margin (`pb-8` or `pb-[env(safe-area-inset-bottom)]`) to clear phone navigation bars.

### Typography Limits
- Maximum **2 font weights** per card (e.g., Bold for titles, Medium for body/metadata).
- Large numbers, prices, and countdown timers should use monospace styling (`font-mono font-black`) to prevent layout jumping as digits change.

---

## 2. 375px Mobile Viewport Invariants
- **No horizontal overflow**: Container max-width constrained to `max-w-[480px] mx-auto` with `overflow-x-hidden`.
- **Text Wrapping Defense**:
  - Apply `word-break: keep-all; overflow-wrap: break-word;` globally for Korean text.
  - Apply `whitespace-nowrap flex-shrink-0 no-wrap` on action buttons, chips, and metadata tags so they never wrap vertically.
- **Touch Target Minimum**: Buttons and interactive controls must measure at least 44×44px in clickable area.
