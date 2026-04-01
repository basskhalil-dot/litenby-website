

## Fix Entry & Exit Jumps in HeroScrollSequence

### Changes to `src/components/HeroScrollSequence.tsx`

**1. ScrollTrigger config (lines 108-115)** — two additions:
- Change `end` from `"+=50vh"` to `"+=70vh"`
- Add `anticipatePin: 1` to prevent the initial snap

```typescript
scrollTrigger: {
  trigger: wrapperRef.current,
  start: "top top",
  end: "+=70vh",
  scrub: 1,
  pin: true,
  pinSpacing: true,
  anticipatePin: 1,
},
```

**2. No other changes needed** — the wrapper is already `100vh`, `wrapperRef.current` is already the pin target, and `pinSpacing: true` ensures no gap before the next section.

