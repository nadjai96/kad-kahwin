```markdown
# Design System Strategy: The Digital Heirloom

## 1. Overview & Creative North Star
The creative North Star for this design system is **"The Royal Archive."** 

We are not building a standard event website; we are crafting a digital artifact that carries the weight and prestige of a physical, letterpressed invitation. The goal is to move away from "app-like" interfaces and toward a **High-End Editorial** experience. We achieve this through the tension between the traditional authority of Deep Navy (`primary`) and the airy modernism of Crisp White (`surface`). 

By utilizing intentional asymmetry—such as oversized Noto Serif headlines that break the grid and vast amounts of whitespace—we create a layout that feels curated rather than generated. This design system treats the screen as a canvas of fine stationery, where depth is defined by tonal layering rather than structural lines.

## 2. Colors & Atmospheric Depth
The palette is rooted in a "Deep Sea and Paper" philosophy. The primary interaction comes from the contrast between the ink-like Navy and the textured White.

*   **Primary (#00113a):** Used for the most critical brand elements and primary actions. It represents the "Ink."
*   **Surface Hierarchy & Nesting:** To create a "stacked stationery" effect, we use surface tiers. Never use a flat white background for everything.
    *   **Surface (#f8f9fa):** Your main "tabletop."
    *   **Surface-Container-Lowest (#ffffff):** Your "invitation card" floating on the surface.
    *   **Surface-Container-Low (#f3f4f5):** Used for subtle depth in secondary sections.
*   **The "No-Line" Rule:** Under no circumstances should a 1px solid border be used to separate sections. Boundaries must be defined by color shifts. If a section needs to end, transition from `surface` to `surface-container-low`. 
*   **The "Glass & Gradient" Rule:** For floating navigation or modal overlays, use **Glassmorphism**. Combine `surface` with a 70% opacity and a `backdrop-blur` of 12px. This prevents the UI from feeling heavy and maintains the "Minimalist Royal" aesthetic.
*   **Signature Textures:** Incorporate subtle botanical patterns using `primary-container` (#002366) at 5% opacity behind main headers to evoke the feeling of a watermark on luxury paper.

## 3. Typography: The Editorial Voice
Typography is the cornerstone of this system. The contrast between the Serif and Sans-Serif reflects the marriage of tradition and modern life.

*   **Display-LG (Noto Serif, 3.5rem):** Use for names and hero statements. These should be tracked slightly tighter (-2%) to feel like a bespoke masthead.
*   **Headline-MD (Noto Serif, 1.75rem):** Reserved for section titles (e.g., "The Ceremony," "Our Story").
*   **Body-LG (Manrope, 1rem):** The workhorse for all guest information. Manrope’s clean geometry provides a necessary modern counterpoint to the Serif’s ornate nature.
*   **Label-MD (Manrope, 0.75rem, All Caps, Letter Spacing 0.1rem):** Used for metadata, dates, or small tags. This adds a "cataloged" or "archival" feel to the details.

## 4. Elevation & Depth
In this design system, "Elevation" is a psychological feeling of quality, not just a CSS property.

*   **The Layering Principle:** Avoid traditional shadows. Instead, stack `surface-container-lowest` elements on top of `surface-container-high` backgrounds. This creates a "Natural Lift."
*   **Ambient Shadows:** If a card must float (like a "Save the Date" modal), use an ambient shadow: `box-shadow: 0 20px 40px rgba(0, 17, 58, 0.04)`. Note the use of the `primary` navy color in the shadow instead of pure black to keep the palette cohesive.
*   **The "Ghost Border" Fallback:** If accessibility requires a border, use `outline-variant` (#c5c6d2) at 20% opacity. It should be felt, not seen.
*   **Corner Treatment:** We use `ROUND_FOUR` (`0.25rem`) for all containers. This is "subtle roundness"—just enough to take the sharp edge off the digital screen, but not enough to lose the architectural "Royal" precision.

## 5. Components

### Buttons
*   **Primary:** Background `primary` (#00113a), text `on-primary` (#ffffff). No border. `ROUND_FOUR`.
*   **Secondary (The Editorial Button):** No background. Text `primary`. A "Ghost Border" (20% opacity `outline-variant`) that becomes 100% opaque on hover.
*   **Tertiary:** Purely typographic. `label-md` style with a subtle botanical icon prefix.

### Cards & RSVP Units
*   **The Invitation Card:** Use `surface-container-lowest` (#ffffff). Forbid the use of divider lines. Separate the "Event Time" from "Location" using a `32px` vertical spacer or a subtle background shift to `surface-container-low`.
*   **Input Fields:** Use "Material Minimalist" style. Only a bottom border using `outline` (#757682). When focused, the border transitions to `primary` (#00113a). Labels should stay in `label-md` Manrope.

### Lists & Information Grids
*   **Registry/Itinerary Lists:** Do not use dividers. Use a staggered layout where the date is in a large `display-sm` serif on the left, and the details are in `body-md` on the right, creating a timeline through whitespace.

### Interaction Elements
*   **Checkboxes/Radios:** Use `primary` for the selected state. The "Check" or "Dot" should be `on-primary`. Avoid standard browser blue.
*   **Tooltips:** Dark Navy (`primary`) with `on-primary` text. Very small `ROUND_FOUR` radius.

## 6. Do's and Don'ts

### Do:
*   **DO** use extreme whitespace (80px+ between sections) to signify luxury.
*   **DO** let imagery (photography) overlap between two background colors to break the "boxed" feel.
*   **DO** use "Negative Space" as a design element. If a page feels crowded, remove a decorative element rather than shrinking text.

### Don't:
*   **DON'T** use 1px solid borders for separation. It breaks the "Heirloom" stationery feel.
*   **DON'T** use vibrant, saturated accent colors (like bright red or yellow) for errors. Use the muted `error` (#ba1a1a) to maintain the sophisticated atmosphere.
*   **DON'T** use standard "drop shadows" with 0,0,0 black. Always tint shadows with the `primary` Navy.
*   **DON'T** center-align everything. Use intentional left-alignment for body text and asymmetrical placement for display text to create an editorial layout.```