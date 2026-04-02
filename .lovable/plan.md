

## Diagnosis: Why the Bottle Jumps

The root cause is the **navbar**. It's set to `position: sticky` (line 20 of LitenbyNavbar.tsx), which means it **takes up space in the document flow** (~60px). The HeroScrollSequence wrapper starts *below* the navbar, not at the top of the viewport. When you scroll, the wrapper reaches viewport top and the CSS sticky canvas snaps into position — that's the visible jump.

The bottle is never truly "at the top" on page load. It's offset by the navbar height.

```text
Current layout (causes jump):

┌──────────────────────┐  ← viewport top
│  Navbar (sticky, ~60px flow space)
├──────────────────────┤
│  HeroScrollSequence  │  ← starts 60px below viewport top
│  (170vh wrapper)     │     sticky canvas engages late = JUMP
└──────────────────────┘
```

## Fix

Two changes:

### 1. Navbar: `sticky` → `fixed` (LitenbyNavbar.tsx)

Change the navbar from `sticky` to `fixed` positioning. This removes it from document flow so the hero section starts at the true top of the viewport. The bottle is visible and centered the instant the page loads — no offset, no jump.

Line 20: change `sticky` to `fixed` in the className.

### 2. HeroScrollSequence: add `overflow: clip` (HeroScrollSequence.tsx)

Add `overflow: "clip"` to the wrapper div so the section boundary is clean and the sticky element doesn't peek outside the wrapper bounds during the handoff to the next section.

Line 136: add `overflow: "clip"` to the wrapper style.

```text
Fixed layout (no jump):

┌──────────────────────┐  ← viewport top
│  Navbar (fixed, overlays, no flow space)
│  HeroScrollSequence  │  ← starts at viewport top
│  (170vh wrapper)     │     sticky canvas is already in position = SMOOTH
└──────────────────────┘
```

No other files change. The ScrollTrigger config stays as-is — it's correct with `scrub: true`, `start: "top top"`, `end: "bottom bottom"`, no pin.

