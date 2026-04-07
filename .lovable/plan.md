

# Homepage Experience Assessment

## Current State Summary

The homepage flows: **Hero scroll sequence** (cinematic bottle + text) → **Three Labs** (3-card grid) → **Packaging Lab** (product grid) → **Collabs** (image gallery) → **About** (text + CTA) → **Footer**. Every section uses the same Framer Motion `whileInView` fade-up pattern with identical timing (`duration: 0.4, ease: [0.16, 1, 0.3, 1]`). No section-to-section transitions exist. No parallax. No stagger.

---

## Assessment by Area

### 1. Section Transitions (Biggest Gap)

**Problem:** Every section hard-cuts into the next. There is zero visual bridging between sections. The hero sticky container ends and the Three Labs section just... starts. Same between every other section. Premium sites use gradients, overlapping layers, or parallax to create depth between zones.

**Specific opportunities:**
- A subtle gradient fade or soft vignette between the hero sticky frame and Three Labs would create a seamless handoff.
- Parallax on the Three Labs card images (slight upward drift at a different scroll rate than text) would add depth without complexity.
- The Collabs section already uses `bg-black` against the `bg-background` (also black) sections, so there is literally no visual distinction between them. A subtle top border, spacing change, or background texture shift would help.

### 2. Scroll-Triggered Animations (Uniform and Flat)

**Problem:** Every section uses the exact same animation: `opacity: 0 → 1, y: 20-30 → 0` with `duration: 0.4`. No stagger between child elements. The entire grid appears as one block. This reads as "we added animation" rather than "this was choreographed."

**What premium sites do differently:**
- **Staggered reveals**: Cards in Three Labs and Packaging should cascade (e.g., 100ms apart) rather than appearing simultaneously.
- **Varied motion**: Headers could fade up while cards scale in from 0.95. Mix motion types per element role.
- **Progressive disclosure**: In the About section, the 7 elements all use `custom={1-7}` with 50ms stagger, but `amount: 0.1` triggers them almost simultaneously. A higher threshold or scroll-linked opacity would feel more intentional.

### 3. Typography Hierarchy and Spacing

**Generally strong.** The font pairing (Plus Jakarta Sans headings / Urbanist body), lowercase convention, and size scale are consistent. Two issues:

- **Section pre-titles** ("Process", "Containers", "Project", "Story") are visually identical across every section. Varying weight or adding a subtle decorative element (a small line, a number) would create progression and wayfinding.
- **The About section** blends its informational copy and CTA into one undifferentiated block. The CTA headline ("let's build what you've been imagining") uses `text-highlight` which helps, but there is no spatial or visual break between the about copy and the CTA. A divider, extra spacing, or background shift would separate the two intents.

### 4. Micro-Interactions (Mostly Absent)

**Current state:** Hover scale on cards (1.02-1.05), image swap on packaging cards, gradient overlay on collabs. That is the full inventory.

**Missing polish:**
- **Buttons**: The primary button has a good fill→outline hover transition, but there is no press/active state. Adding `active:scale-[0.97]` would give tactile feedback.
- **Cards in Three Labs**: The hover zoom on the image is nice but the card itself has no border or shadow change on hover. A subtle border color shift (transparent → primary/20%) would add dimension.
- **Navigation links**: No underline animation or active indicator beyond color. The `story-link` utility class exists in the CSS but is not used on the navbar.
- **Back to Top button**: Functional but could use a subtle bounce or pulse on first appearance.
- **Cursor**: No custom cursor or pointer feedback on interactive gallery items (Collabs cards have `cursor-default` despite being visually interactive).

### 5. Spacing Rhythm

**Mostly consistent** at `py-20 lg:py-28` / `padding: 100px 0`. Two inconsistencies:
- CollabsSection uses inline `style={{ padding: "100px 0" }}` instead of Tailwind classes, which is a maintenance smell but not a visual issue.
- The gap between the hero sticky end and Three Labs depends on wrapper height (`h-[200vh]`), which creates an awkward "scroll through nothing" moment at the very bottom of the hero animation where the sticky releases. This dead scroll zone makes the transition feel unfinished.

---

## Prioritized Recommendations

### Tier 1 — Highest Impact

| # | Change | Impact | Risk | Effort |
|---|--------|--------|------|--------|
| 1 | **Stagger card reveals** in Three Labs, Packaging, and Collabs grids (100-150ms per card using Framer Motion `staggerChildren`) | Transforms the feel from "animated" to "choreographed" | Very low — CSS/motion config only | Quick win |
| 2 | **Add a gradient bridge** between the hero sticky container and Three Labs (a 200px gradient overlay from background → transparent at the top of Three Labs, or a pseudo-element on the hero wrapper) | Eliminates the hard cut after the cinematic intro | Low | Quick win |

### Tier 2 — Strong Polish

| # | Change | Impact | Risk | Effort |
|---|--------|--------|------|--------|
| 3 | **Parallax on Three Labs images** — images translate upward at 80% scroll speed vs their container using a simple `useScroll` + `useTransform` from Framer Motion | Adds physical depth, makes the section feel layered | Low — contained to one component | Medium |
| 4 | **Button active states** — add `active:scale-[0.97]` and `transition-transform` to the button variants globally | Tactile feedback on every CTA across the site | Zero risk | Quick win |
| 5 | **Visual separator between About copy and CTA block** — add `mt-20` or a thin `border-t border-border/30` before the CTA headline | Clarifies intent hierarchy | Zero risk | Quick win |

### Tier 3 — Refinement

| # | Change | Impact | Risk | Effort |
|---|--------|--------|------|--------|
| 6 | **Varied animation types per element role** — headers fade up, grids scale in from 0.97, CTAs slide in | Breaks the monotony of identical animations | Low | Medium |
| 7 | **Navbar link underline animation** — apply the existing `story-link` utility or a custom underline sweep | Adds polish to the most visible persistent UI | Zero risk | Quick win |
| 8 | **Collabs cursor fix** — change `cursor-default` to `cursor-pointer` or add a custom hover state if they are meant to be interactive | Fixes a UX signal mismatch | Zero risk | Quick win |

---

## The Single Biggest Impact Change

**Staggered card reveals (#1).** Right now every grid on the page — Three Labs, Packaging, Collabs — appears as a single opacity block. Adding `staggerChildren: 0.1` to the parent motion config and moving individual card animations to children would immediately make the page feel choreographed and intentional. It requires changing ~10 lines across 3 components, carries zero risk to the scroll animation, and is the single cheapest change with the most visible upgrade in perceived quality.

---

## Risk Notes

- The hero scroll sequence (GSAP timeline, frame scrubbing, lateral movement) should not be touched for any of these changes. All recommendations target sections below the hero or global UI elements.
- Parallax (#3) is the only medium-effort item and should be tested on mobile to ensure it degrades gracefully (disable on `<768px`).
- All other items are CSS/Tailwind/Framer Motion config changes with no structural risk.

