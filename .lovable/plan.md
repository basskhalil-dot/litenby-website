

## Global Homepage Refinement

### 1. Rename "Brand" → "Branding" Across the Site

**Files:** `LitenbyNavbar.tsx`, `Footer.tsx`, `ThreeLabsSection.tsx`

- Navbar & Footer: Change `label: 'brand'` to `label: 'branding'` (the `href: '/brand'` stays the same — it's a route, not display text)
- ThreeLabsSection: Change the first lab's `title` from `"Brand"` to `"Branding"`

### 2. Color System Audit

The CSS variables are already unified — `--primary`, `--accent`, `--highlight`, `--ring` all resolve to `39 100% 50%` (Brand Orange). No rogue hex values or secondary yellows found in the homepage components. The `shadow-[…rgba(255,165,0,…)]` in `HeroGeometric.tsx` ElegantShape uses the same orange. **No changes needed** — the color system is already a single primary yellow.

### 3. "Explore Packaging" Button Hover → White

**File:** `HeroGeometric.tsx` (line 167)

Currently the outline button hovers to `hover:bg-primary hover:text-primary-foreground`. Change to:
```
hover:bg-white hover:text-black hover:border-white
```

This distinguishes it from "Start Your Brand" which hovers to transparent/orange-border.

### 4. Vertical Rhythm & Spacing

**Mobile gap fix (Bottle → Hero text):** The `HeroScrollSequence` wrapper is `170vh` and `HeroGeometric` is `min-h-screen`. On mobile, the combined height creates excessive whitespace. Changes:

- **`HeroScrollSequence.tsx`**: No changes to sticky/scroll logic. Only reduce wrapper height on mobile: change `style={{ height: "170vh" }}` to a responsive approach using a className `h-[150vh] md:h-[170vh]` (shorter runway on mobile = tighter feel).
- **`HeroGeometric.tsx`**: Change `min-h-screen` to `min-h-[80vh] lg:min-h-screen` so the hero text section is tighter on mobile.

**Global section spacing normalization:**
- `ThreeLabsSection`: `py-16 lg:py-24` → `py-20 lg:py-28` (bump to ~80-112px)
- `PackagingLabSection`: `py-16 lg:py-24` → `py-20 lg:py-28`
- `CollabsSection`: already `padding: 100px 0` — keep as is
- `AboutSection`: already `paddingTop/Bottom: 100` — keep as is

All sections will land in the 80–112px range, consistent flow.

### 5. Professional Preloader

**New file:** `src/components/Preloader.tsx`

A full-screen black overlay (`z-[9999]`) with a centered horizontal loading bar in primary yellow. Logic:

- In `HeroScrollSequence`, expose a callback/state when the first 10 frames are loaded (separate counter from full load)
- Create a `Preloader` component that:
  - Renders a full-screen black div with a centered thin progress bar
  - Accepts a `progress` value (0–100) and an `onComplete` callback
  - Once progress hits 100, fades out over 600ms then unmounts
- In `Index.tsx`, manage preloader state:
  - `HeroScrollSequence` reports when 10/10 early frames are loaded
  - `Promise.all` with font-loading check (`document.fonts.ready`)
  - Once both resolve, trigger preloader fade-out

**Changes to `HeroScrollSequence.tsx`:**
- Add `onEarlyLoad?: () => void` prop
- Track first 10 frames loaded separately; call `onEarlyLoad` when count reaches 10
- Remove the "Loading…" text fallback entirely
- Keep canvas hidden until `ready` (full load) — the preloader covers this period

**Changes to `Index.tsx`:**
- Add `Preloader` component with state management
- Pass `onEarlyLoad` to `HeroScrollSequence`
- Combine with `document.fonts.ready` in Promise.all
- Fade preloader out when both conditions met

**Preloader visual:** A minimal centered progress bar (2px height, max-width 120px) that fills from left to right as frames load, matching the Litenby brand.

### Files Modified

| File | Changes |
|---|---|
| `src/components/LitenbyNavbar.tsx` | "brand" → "branding" label |
| `src/components/Footer.tsx` | "brand" → "branding" label |
| `src/components/ThreeLabsSection.tsx` | "Brand" → "Branding" title, spacing |
| `src/components/HeroGeometric.tsx` | Button hover to white, reduce min-h on mobile |
| `src/components/HeroScrollSequence.tsx` | Remove "Loading…", add `onEarlyLoad` prop, responsive height |
| `src/components/PackagingLabSection.tsx` | Spacing normalization |
| `src/components/Preloader.tsx` | New — full-screen preloader overlay |
| `src/pages/Index.tsx` | Integrate preloader, pass callbacks |

No changes to sticky/scroll/GSAP logic in `HeroScrollSequence`.

