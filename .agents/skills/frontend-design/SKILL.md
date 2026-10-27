---
name: frontend-design
description: Guidance for distinctive, intentional visual design when building new UI or reshaping an existing one. Helps with aesthetic direction, typography pairing, spatial composition, and making opinionated choices that don't read as templated AI defaults.
---

# Frontend Design (Official Anthropic Guideline)

Approach this as the design lead at a top design studio known for giving every product a distinct visual identity that is never mistaken for generic AI output. The client has rejected cliché or templated designs and expects deliberate, opinionated choices about palette, typography, and layout tailored specifically to the project brief.

---

## 1. Ground Designs in the Subject Matter
- Identify the exact industry, target demographic, vernacular, and core user goals before laying down code.
- A fintech/proptech asset-matching app (like Bokbi) requires **uncompromising trust, mathematical clarity, transparency, and high contrast**—very different from a social media app or developer tool.
- Real content and domain-accurate terminology must be used throughout; avoid generic placeholder copy.

---

## 2. Core Design Principles

### Hero & First Impressions
- The hero is the first thing viewers see. Open with the most characteristic, high-value element in the subject's world.
- For Bokbi: A prominent, frictionless search input (e.g. apartment nameplate style) + live transaction pulse ticker.
- Avoid generic tropes: big number + tiny label + purple gradient is the standard AI default—avoid it unless justified.

### Typography & Character
- Typography carries the personality of the page.
- Limit to **one or two distinct font families** (e.g., Toss Product Sans / Pretendard for clean Korean fintech).
- Use intentional font weights, letter spacing, and line heights (`line-height: 1.5` to `1.6` for Korean body text).
- Avoid common AI tells:
  - Do NOT arbitrarily accent a single random word in a headline with color/italics.
  - Do NOT overuse ALL CAPS on labels.
  - Do NOT clutter interfaces with redundant typographic labels above every single card.

### Visual Structure as Information
- Outlines, dividers, badges, and numbering must encode functional meaning, not just decorative fluff.
- Only use numbered sequence steps (`01`, `02`, `03`) if the user flow actually represents a chronological sequence.
- Maintain high contrast and clear visual hierarchy: primary content, secondary metadata, tertiary caption.

### Motion & Spatial Composition
- Use non-user-triggered motion sparingly and deliberately (e.g., one smooth hero sequence or ticker).
- Avoid animating every single card on hover or adding fade-and-slide-up on every paragraph.
- Motion that answers a user's action (opening, expanding, confirming) should clearly communicate state change.
