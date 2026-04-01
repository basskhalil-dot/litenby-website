

## Problem Analysis

The two "jump" issues stem from GSAP ScrollTrigger's pinning mechanics:

1. **Entry Jump**: The pin target is `canvasRef.current?.parentElement` — the inner `100vh` div. When ScrollTrigger pins this element, it injects a `pin-spacer` div that can cause a layout shift at the moment pinning engages. Since the wrapper is `150vh` and the pinned element is `100vh`, there's a 50vh mismatch that GSAP compensates for with spacing, causing the snap.

2. **Exit Jump**: When ScrollTrigger unpins (at `end: "bottom bottom"`), the pinned element snaps back to its natural position in the flow. The transition from "pinned/fixed" to "static" creates a visible cut before the next section.

## Fix

Restructure the pinning so the **wrapper itself is the pinned element**, and use explicit `end` calculation to control exactly how much scroll distance drives the animation. This eliminates the inner pin mismatch.

### Changes to `src/components/HeroScrollSequence.tsx`:

1. **Pin the wrapper directly** — set `trigger` and `pin` both to `wrapperRef.current`, with `start: "top top"` and `end: "+=50vh"` (the extra scroll distance beyond the 100vh viewport that drives the animation). This means: the section fills the screen, stays pinned for 50vh of scrolling (during which the 48 frames play), then naturally releases.

2. **Set wrapper height to `100vh`** instead of `150vh` — the wrapper is exactly one viewport tall. The pin's `end: "+=50vh"` adds the scroll runway without needing extra wrapper height.

3. **Remove `pin: canvasRef.current?.parentElement`** — pinning the parent of canvas was the root cause of the layout jump. Pin the wrapper instead.

4. **Keep `scrub: 1`** and all other settings unchanged.

### Updated ScrollTrigger config:
```text
trigger: wrapperRef.current
start: "top top"  
end: "+=50vh"       // 50vh of scroll drives the full animation
scrub: 1
pin: true           // pins the trigger element itself
pinSpacing: true    // (default) adds spacer so content below flows naturally
```

### Updated wrapper:
```text
height: 100vh  (was 150vh)
```

This ensures:
- Page loads with bottle filling viewport — no jump on first scroll
- Animation plays smoothly across 50vh of scroll distance
- When pin releases, the spacer seamlessly transitions to the next section with no cut

