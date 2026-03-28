

# Fix Hero Bottle Sequence: Switch to GitHub Raw URLs

## Problem
The current jsDelivr CDN URLs return 404 errors, preventing the 48-frame bottle animation from loading.

## Solution
Change the image source from jsDelivr to GitHub Raw content URLs, which serve files directly without CORS restrictions for public repos.

## Single File Change: `src/components/HeroScrollSequence.tsx`

### 1. Update the URL pattern (line 8-11)

Replace the jsDelivr CDN URL with:

```
https://raw.githubusercontent.com/basskhalil-dot/litenby-website/main/public/hero-sequence/Bottle_${String(i).padStart(5, "0")}.jpg
```

This generates URLs like:
- `https://raw.githubusercontent.com/basskhalil-dot/litenby-website/main/public/hero-sequence/Bottle_00000.jpg`
- `https://raw.githubusercontent.com/basskhalil-dot/litenby-website/main/public/hero-sequence/Bottle_00047.jpg`

### 2. Add `crossOrigin` attribute (line 36)

Set `img.crossOrigin = "anonymous"` on each `Image()` object before assigning `src`. This ensures the canvas can draw cross-origin images without tainting.

### 3. Everything else stays the same

The existing implementation already covers all other requirements:
- **Canvas with contain-fit**: `drawFrame()` calculates scale using `Math.min(cw/iw, ch/ih)` -- no cropping, bottom reflection fully visible
- **1:1 aspect ratio container**: `aspectRatio: "1 / 1"` with `maxHeight: 70vh`
- **Pre-loading with offscreen decode**: All 48 frames decoded via offscreen canvas before `setReady(true)`
- **GSAP pin**: 300vh section with `scrub: 1.5`
- **Error logging**: `console.error` already logs the exact failing URL with a ❌ prefix

## Technical Note
`raw.githubusercontent.com` serves files with proper content-type headers and allows CORS for public repositories. If the repo is public and the files are committed, this will resolve the 404s immediately.

