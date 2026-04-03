

## Assessment: Simultaneous Lateral Movement + Frame Scrub

### Question 1: Can X-axis movement be added to the existing ScrollTrigger?

**Yes, trivially.** The existing GSAP timeline already scrubs `obj.frame` from 0→47. You can add a second `.to()` on the same timeline targeting the canvas container's `x` property (e.g., from `0` to `25vw`). Both animations share the same ScrollTrigger and progress — no second trigger needed. The lateral slide and frame rotation happen in perfect sync, driven by the same scroll position.

```text
tl.to(obj, { frame: 47, onUpdate: drawFrame })    // existing
  .to(containerEl, { x: "25vw" }, 0);              // simultaneous (position 0 = same start)
```

### Question 2: Risk level of modifying HeroScrollSequence vs HeroGeometric only

| Approach | Risk |
|---|---|
| Modify only HeroGeometric (previous plan) | **Low** — isolated, no scroll logic touched |
| Add X-axis tween inside HeroScrollSequence | **Medium** — you're adding to the same timeline that controls the canvas. If the container shifts, the canvas resize listener and drawFrame centering math still work (they use `getBoundingClientRect`). But the sticky positioning + lateral movement interaction needs careful testing: `position: sticky` + `transform: translateX()` is valid CSS but can behave unexpectedly on some mobile browsers. |

Main risks of the simultaneous approach:
- **Sticky + transform**: Some older browsers treat `transform` on a sticky element as creating a new containing block, which can break the sticky behavior. Mitigation: apply the `x` tween to the inner container (the `maxWidth: 600px` div), not the sticky div itself.
- **Canvas resize**: The canvas uses `getBoundingClientRect()` on resize. If the container is mid-transform, the rect is still correct — `getBoundingClientRect` accounts for transforms. Low risk.
- **Mobile**: The lateral movement needs to be reduced or disabled on small screens (bottle would go off-screen). Needs a responsive check.

### Question 3: The crossfade middle ground

Yes — the canvas stays centered throughout all 48 frames. At the end of the scroll range, a static `<img>` of the final frame (already positioned on the right) fades in while the canvas simultaneously fades out. This creates the illusion of the bottle sliding right without ever moving the canvas.

**Pros**: Zero risk to scroll/sticky logic. Canvas is untouched. The transition is purely a CSS opacity crossfade between two elements.
**Cons**: It's not truly continuous motion — it's a dissolve. On slow scrolls, a perceptive user might notice the bottle isn't physically traveling. The "wow factor" is lower.

### Question 4: Best visual result vs lowest risk

| Approach | Visual Quality | Risk | Recommendation |
|---|---|---|---|
| A. GSAP X-tween on inner container | ★★★★★ — true continuous motion | Medium | **Best result** |
| B. Crossfade canvas → static image | ★★★☆☆ — dissolve trick | Low | Safe fallback |
| C. Only modify HeroGeometric (no motion) | ★★★★☆ — clean split, no travel | Low | Previous plan |

**Recommendation**: **Approach A** — add the X-axis tween to the inner container (not the sticky div). Apply it to the same timeline at position `0` so it's synchronized. On mobile (`< 768px`), keep the bottle centered (no lateral movement) and stack the layout vertically. This gives the premium editorial feel with genuine continuous motion, and the risk is manageable because the tween targets a child of the sticky element, not the sticky element itself.

If during implementation the sticky+transform interaction causes issues on any browser, falling back to Approach B (crossfade) is a 10-minute swap.

