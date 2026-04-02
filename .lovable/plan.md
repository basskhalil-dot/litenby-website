

## Fix: Entry Jump in Bottle Scroll Sequence

### Root Cause

GSAP's `pin: true` is the problem. When ScrollTrigger activates, it rips the wrapper out of normal document flow (`position: static` → `position: fixed`) and injects a spacer div. This layout reflow is the visible "snap." No amount of `anticipatePin` fully eliminates it because the browser must repaint the layout shift.

### Solution: Remove Pinning Entirely

Instead of asking GSAP to pin the element (which always causes a reflow), we make the section naturally tall (170vh) and position the canvas as a sticky element inside it. The canvas stays visually fixed while the user scrolls through the tall section — no GSAP pin, no spacer injection, no jump.

GSAP is only used to scrub the frame index based on scroll progress through the section. No `pin`, no `pinSpacing`, no `anticipatePin`.

### Changes to `src/components/HeroScrollSequence.tsx`

**Layout structure:**
```text
<div ref={wrapperRef} style={{ height: "170vh" }}>        ← tall scrollable runway
  <div style={{ position: "sticky", top: 0, height: "100vh" }}>  ← sticks to viewport naturally
    <canvas ... />
  </div>
</div>
```

**ScrollTrigger config (no pin):**
```typescript
scrollTrigger: {
  trigger: wrapperRef.current,
  start: "top top",
  end: "bottom bottom",   // scrub across the full 170vh height
  scrub: true,             // immediate 1:1 response, no lag
}
```

- `scrub: true` instead of `scrub: 1` — removes the 1-second smoothing delay that makes the first scroll feel laggy
- `end: "bottom bottom"` — the animation plays across the natural 70vh of extra scroll distance (170vh wrapper minus 100vh viewport = 70vh runway)
- No `pin`, `pinSpacing`, or `anticipatePin` — eliminating the source of the jump entirely

**Why this works:**
- CSS `position: sticky` keeps the canvas viewport-fixed without any JavaScript layout changes
- No DOM manipulation on first scroll = no reflow = no jump
- The 70vh of extra wrapper height provides the same scroll runway as before
- When the wrapper scrolls past, the sticky element naturally releases — seamless transition to the next section

### No other files change.

