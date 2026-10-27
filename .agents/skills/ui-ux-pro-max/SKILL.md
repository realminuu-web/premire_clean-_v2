---
name: ui-ux-pro-max
description: UI/UX design intelligence for web, mobile, and desktop. Use when designing, building, reviewing, or fixing interfaces, including pages, components, design systems, accessibility, interaction, responsive layout, typography, color, charts, and stack-specific UI implementation.
---

# UI/UX Pro Max - Design Intelligence

Design intelligence and reasoning rules across styles, product palettes, font pairings, UX guidelines, curated icons, and technology stacks.

---

## When to Apply
Use this Skill when the task involves **UI structure, visual design decisions, interaction patterns, or user experience quality control**:
- Designing new pages or workflows.
- Creating/refactoring UI components.
- Selecting color, typography, spacing, or layout systems.
- Reviewing UI for UX, accessibility, and visual consistency.
- Implementing navigation, animation, and responsive behavior.
- Improving perceived quality, trust, and usability.

---

## Rule Categories by Priority (1 → 10)

| Priority | Category | Impact | Key Checks (Must Have) | Anti-Patterns (Avoid) |
|---|---|---|---|---|
| **1** | **Accessibility** | CRITICAL | Contrast 4.5:1 minimum, Alt text, Keyboard navigation, Aria-labels | Removing focus rings, Icon-only buttons without labels |
| **2** | **Touch & Interaction** | CRITICAL | Min touch target 44×44px, 8px+ spacing, Immediate loading feedback | Reliance on hover only, Instant state changes without feedback |
| **3** | **Performance** | HIGH | WebP/AVIF, Lazy loading, Reserve space (CLS < 0.1) | Layout thrashing, Unbounded re-renders, Heavy scroll handlers |
| **4** | **Style Selection** | HIGH | Match product type (Fintech/Proptech: Clean, Trustworthy), SVG icons | Mixing flat & skeuomorphic randomly, Using emojis as icons |
| **5** | **Layout & Responsive** | HIGH | Mobile-first breakpoints, No horizontal scroll, Safe areas | Fixed container widths on mobile, Disabled pinch-to-zoom |
| **6** | **Typography & Color** | MEDIUM | Base 16px body, Line-height 1.5, Semantic CSS tokens | Body text < 12px, Gray-on-gray unreadable contrast, Raw hex codes |
| **7** | **Animation** | MEDIUM | Context-aware timing (150-300ms), Respect `prefers-reduced-motion` | Animating width/height/margin directly (causes layout recalculation) |
| **8** | **Forms & Feedback** | MEDIUM | Visible labels, Inline error messages, Progressive disclosure | Placeholder-only inputs, Hiding errors off-screen |
| **9** | **Navigation Patterns** | HIGH | Predictable back behavior, Bottom nav ≤ 5 items, Clear active states | Overloaded navbars, Trapping users in un-cancelable modals |
| **10** | **Charts & Data** | LOW | Legends, Tooltips, High-contrast data points, Scannable metrics | Color-alone data coding, Dense unreadable tick marks |

---

## Pre-Delivery Checklist
- [ ] No emojis used as functional icons (use SVG: Lucide React / Heroicons).
- [ ] `cursor-pointer` applied on all interactive elements.
- [ ] Light mode text contrast meets 4.5:1 minimum against background.
- [ ] Focus states visible for keyboard accessibility.
- [ ] `prefers-reduced-motion` respected in CSS / framer-motion.
- [ ] Korean and English text chips and badges reflow with `word-break: keep-all; whitespace-nowrap;`.
- [ ] Tested across standard mobile viewports: 375px (iPhone SE), 390px (iPhone 14/15), 412px (Galaxy).
