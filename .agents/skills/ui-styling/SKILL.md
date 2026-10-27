---
name: ui-styling
description: Create beautiful, accessible user interfaces with shadcn/ui components, Tailwind CSS utility-first styling, and design token architectures. Use when building UI, implementing responsive layouts, managing themes, or styling complex forms.
---

# UI Styling Skill

Best practices for building clean, robust, and accessible frontend interfaces using Tailwind CSS and modern component patterns.

---

## 1. Core Principles
1. **Utility-First Styling**: Prioritize zero-runtime Tailwind utilities for both React Server Components and Client Components.
2. **Accessibility-First**: Ensure full keyboard navigation, proper ARIA attributes, and high contrast focus rings (`focus:outline-none focus:ring-2 focus:ring-brand-primary`).
3. **Mobile-First Responsive Design**: Write base styles for mobile (375px), then progressively enhance using `sm:`, `md:`, `lg:` breakpoints.
4. **Token-Driven Theming**: Never scatter arbitrary magic hex codes across components. Bind all colors to semantic CSS variables (`var(--brand-primary)`, `var(--brand-light)`, `var(--surface-ground)`).

---

## 2. Form & Input Patterns
- Always place labels above inputs with clear typography (`text-xs font-bold text-slate-800`).
- Provide immediate, contextual feedback for validation errors directly below the relevant field.
- Highlight active inputs with subtle background changes and prominent brand focus rings.
- Group related options using segmented pills or toggle chips rather than cumbersome dropdowns where choices are ≤ 4.

---

## 3. Cards & Surfaces
- Avoid heavy, dark borders or exaggerated drop shadows that clutter visual hierarchy.
- Prefer subtle, crisp borders (`border border-slate-200/80` or `border-slate-100`) with soft atmospheric shadows (`shadow-sm` or `shadow-md`).
- Ensure surface backgrounds create comfortable reading contrast:
  - Base canvas: Warm Ivory / Light Slate (`bg-[#FAF9F6]` or `bg-slate-50`)
  - Elevated cards: Pure White (`bg-white`)
  - Accent / Hero cards: Deep Brand Tone (`bg-brand-primary` / `bg-slate-900`) with high-contrast light text.
