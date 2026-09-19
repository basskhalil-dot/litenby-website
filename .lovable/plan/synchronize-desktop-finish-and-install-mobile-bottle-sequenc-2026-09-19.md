# Synchronize desktop finish and install mobile bottle sequence

## Changes
- Remap desktop scroll progress across frame indices 0–50 so frame 50 appears only at the exact end position, eliminating the final apparent slide after the bottle animation finishes.
- Extract the 51 square mobile frames from the supplied archive, validate dimensions and numbering, and convert them to crisp WebP files using the same optimized settings as desktop.
- Replace only the mobile test sequence and update its frame count to 51.
- Preserve the mastered mobile behavior: bottle remains centered throughout, uses the square canvas, and does not move horizontally.

## Validation
- Confirm all 51 desktop and mobile frames load without errors.
- Check desktop start, middle, and final scroll positions for synchronized frame and horizontal position.
- Check mobile start, middle, and final positions at phone width for centered, uncropped rendering and stable scroll behavior.
- Confirm the preview builds successfully. The published website will remain unchanged.
