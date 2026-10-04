---
name: Iterative visual refinement
description: The preferred approach for landing-page design updates and visual cleanup.
---

For landing-page visual refinements, preserve the existing brand language while making precise, incremental changes based on the user's screenshots and feedback. Prioritize clean composition, clear hierarchy, and responsive balance over adding decorative elements.

**Why:** The user explicitly confirmed that this screenshot-guided, detail-by-detail approach matched their intent.

**How to apply:** When a visual issue is reported, identify the exact element, make the smallest focused change, verify it at relevant viewports, and avoid reintroducing removed decoration in later iterations.

For below-the-fold visual checks, verify the changed cards are actually visible in the captured image.

**Why:** Ordinary hash anchors in this SPA have returned screenshots of the Hero instead of the target section. Chromium text fragments successfully reached the requested content.

**How to apply:** If a hash screenshot misses its target, use a URL-encoded distinctive phrase with `/#:~:text=…`. Expect browser text highlighting; it is not an application style. Do not treat a Hero-only screenshot as verification of a lower section.