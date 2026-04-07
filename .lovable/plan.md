

## Diagnosis

**Can the scale tween be added to the existing timeline?**
Yes. The `innerRef` container already has `willChange: "transform"` and receives the lateral `x` tween at position `0`. Adding `scale: 1.3` to the same `.to()` call (or a parallel one at position `0`) means GSAP composes both transforms on the same element in sync. No second ScrollTrigger needed.

**Will the bottle overflow or clip at 1.3x scale?**
No. The parent container (`absolute inset-0 ... overflow-hidden`) clips anything beyond its bounds. Since `innerRef` is `max-h-[70vh]` on desktop inside a `100vh` sticky frame, a 1.3x scale means the rendered size reaches ~91vh — still within the `inset-0` container. The `overflow-hidden` on both the parent and the sticky frame act as safety nets. On mobile (`max-h-[45vh]`), 1.3x = ~58.5vh — well within the upper half.

**Will the hero text be affected?**
No. The text lives in a separate absolutely-positioned `div` (`textRef`). The scale transform only targets `innerRef`. These are sibling elements — scaling one does not affect the other.

**Risk level: Very low.** One property added to an existing tween target. No layout, DOM structure, or animation logic changes.

## Implementation

**File:** `src/components/HeroScrollSequence.tsx`

**Change 1 — Desktop scale (line ~162-166):**
Add `scale: 1.3` to the existing `innerRef` tween so both lateral movement and scale are synchronized:

```typescript
tl.to(
  innerRef.current,
  { x: "18vw", scale: 1.3, ease: "power1.inOut" },
  0
);
```

**Change 2 — Mobile scale (new tween after line ~187):**
Add a separate scale-only tween for mobile (no lateral movement):

```typescript
if (innerRef.current) {
  tl.to(
    innerRef.current,
    { scale: 1.3, ease: "power1.inOut" },
    0
  );
}
```

Two lines of meaningful change total. The GSAP timeline structure, frame scrubbing, and text positioning remain untouched.

