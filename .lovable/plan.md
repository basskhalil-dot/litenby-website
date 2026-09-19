# Replace desktop bottle with baked-in sliding sequence

## Changes
- Validate and convert all 51 supplied desktop JPEG frames to crisp, optimized WebP files.
- Replace only the desktop V2 test sequence; keep the approved mobile sequence unchanged.
- Remove the code-generated desktop horizontal offset so the bottle follows the position baked into each new frame without doubling its travel.
- Preserve the current frame-to-scroll mapping, text behavior, sizing, and all other homepage settings.

## Validation
- Compare the first, middle, and final frames to confirm the bottle moves from center to right inside the images.
- Check the desktop preview at the start, middle, near-end, and end of the scroll for smooth synchronized rotation and travel.
- Confirm all 51 desktop frames load and the preview builds successfully.
