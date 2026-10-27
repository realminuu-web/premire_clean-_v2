---
name: baseline-ui
description: Quickly deslop UI code by fixing spacing, hierarchy, typography, and small layout issues. Use when the interface needs a fast cleanup, audit, or polish pass against strict UI constraints.
---

# Baseline UI (Engineering Constraints)

Enforces an opinionated, production-grade UI baseline to eradicate AI-generated interface slop.

---

## 1. Stack & Utilities
- **MUST** use Tailwind CSS standard utilities unless custom design tokens already exist.
- **MUST** use `framer-motion` / `motion/react` when JavaScript animation is required.
- **MUST** use `cn()` utility (`clsx` + `tailwind-merge`) for conditional and dynamic class handling.

---

## 2. Components & Primitives
- **MUST** use accessible component primitives for anything with keyboard or focus behavior (Radix UI, Base UI, Headless UI).
- **MUST** add an `aria-label` to any icon-only button.
- **NEVER** rebuild keyboard navigation or focus trapping manually from scratch when proven primitives exist.
- **MUST** use an `AlertDialog` or explicit confirmation step for destructive or irreversible actions.

---

## 3. Layout & Mobile Constraints
- **NEVER** use `h-screen` on mobile; use `h-dvh` or `min-h-[100dvh]` to account for dynamic browser URL bars and home indicators.
- **MUST** respect safe-area insets (`pt-[env(safe-area-inset-top)]`, `pb-[env(safe-area-inset-bottom)]`).
- **MUST** enforce `word-break: keep-all; overflow-wrap: break-word;` on all CJK (Korean) text to prevent mid-word syllable breaks.
- **MUST** apply `whitespace-nowrap flex-shrink-0` to all action buttons, chips, and status badges.
- **SHOULD** use structural skeletons rather than jarring blank spinners for loading states.

---

## 4. Typography & Spacing
- Maintain a strict 4px/8px modular spacing scale (`gap-1`, `gap-2`, `gap-3`, `gap-4`, `gap-6`).
- Group related items with tighter spacing (4px–8px); separate unrelated semantic sections with larger spacing (16px–24px).
- Body text must never be smaller than 12px; key interactive numbers and monetary amounts should use tabular numbers or monospace font styling (`font-mono`).
