---
name: awesome-ux
description: UX heuristics review, visual craft rules, cognitive load optimization, and product design frameworks. Use when evaluating user flows, auditing interfaces for usability frictions, reducing user cognitive overload, and elevating aesthetic craft.
---

# Awesome UX & Craft Guidelines

A collection of proven UX and product design frameworks for evaluating and crafting exceptional user experiences.

---

## 1. 12 Visual Craft Rules
1. **No random gradients**: Only use purposeful, atmospheric gradients that enhance lighting or focus; avoid harsh, mismatched multi-color fades.
2. **No arbitrary glow effects**: Avoid excessive neon drop shadows on text or cards.
3. **No `transition: all`**: Always specify animated properties explicitly (`transition-colors`, `transition-transform`, `transition-opacity`) to avoid unwanted reflows.
4. **No placeholder text as labels**: Placeholders disappear on input; always maintain a persistent, visible label.
5. **No dead ends**: Every screen, state, empty state, and modal must offer an obvious next step or exit pathway.
6. **No unconstrained containers**: Keep reading widths for body text within 45–75 characters (max ~600px).
7. **No generic emojis as icons**: Use precise SVG vector icons (Lucide React) for all core actions.
8. **Consistent icon weights and sizing**: Match icon bounding boxes (16px, 20px, 24px) and stroke widths across views.
9. **Optical alignment**: Account for visual weight—play icons, arrows, and badges often need a 1px–2px optical adjustment.
10. **State completeness**: Always design and handle 4 states: Default, Hover/Focus, Loading/Disabled, Error/Empty.
11. **Clear affordances**: Clickable items must look clickable (elevated surface, distinct text color, cursor pointer, subtle active scale).
12. **Respect user control**: Never trap a user in an un-dismissible popup; provide clear Cancel and Close (`✕`) buttons.

---

## 2. Cognitive Load Reduction
- **Chunking**: Break long, intimidating forms into bite-sized progressive disclosure steps (e.g., search apartment → analyze stats → adjust commission → pledge).
- **Recognition over Recall**: Display recent searches, pre-filled phone numbers, and previously viewed complexes so users do not have to re-enter data.
- **Immediate Value Upfront**: Show estimated brokerage savings and real transaction numbers *before* asking for sensitive data or login.
