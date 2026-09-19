# Refine “The Journey” section

## Goal
Rework the existing homepage journey section to match the supplied visual reference while preserving the bottle experience, Three Labs section, and all other homepage content.

## Desktop
- Remove all horizontal, vertical, and icon-divider lines from the section.
- Use a clean black canvas with the same constrained width and spacing rhythm as neighboring homepage sections.
- Default state: show **the journey** in Brand Orange with the five white line icons placed closer to the title in one balanced row.
- Keep the default state free of the **COVERING** pre-title and supporting description.
- When an icon is hovered or keyboard-focused:
  - turn that icon Brand Orange;
  - change the main title to its stage name in white;
  - reveal **COVERING** above the title in Brand Orange;
  - fade in the matching Brand Orange description below it;
  - keep the other icons white and avoid decorative dimming, boxes, or lines.
- Return smoothly to the default **the journey** state when the pointer or focus leaves the controls.

## Journey copy
- **idea:** share your vision and goals
- **brand:** design your identity and labels
- **pack:** choose from our real packaging containers
- **sample:** see and approve your physical product
- **launch:** start your marketing and launch plan

## Mobile
- Show **the journey** in white as the section title.
- Remove **COVERING** entirely.
- Stack all five stages vertically in one column, with each stage presented as:
  1. Brand Orange icon
  2. White lowercase stage title
  3. Brand Orange description
- Use no hover-dependent behavior, borders, dividers, cards, or decorative effects.
- Keep generous but controlled spacing so all five stages read as one continuous journey.

## Validation
- Check desktop default, hover, pointer-leave, and keyboard-focus states.
- Check the single-column mobile layout at the current 393px viewport and a wider phone size.
- Confirm no clipping, overlap, horizontal scrolling, runtime errors, or build errors.
