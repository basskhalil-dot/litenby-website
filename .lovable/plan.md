# Add “The Journey” to the homepage

## Goal
Add a new interactive section directly below the bottle experience and above “the three labs.” It should explain the product journey as **Idea → Brand → Pack → Sample → Launch** while feeling native to Litenby, not like a pasted third-party component.

## Desktop design
- Full-width black section with the same constrained content width and spacing rhythm as the homepage.
- Left side: orange uppercase pre-title **COVERING** and a large lowercase title that defaults to **the journey**.
- Right side: five precise line icons arranged in one structured row/grid.
- Hovering or keyboard-focusing an icon changes the large title to **idea**, **brand**, **pack**, **sample**, or **launch**.
- Active icon uses Brand Orange; inactive icons stay white, while non-active icons dim slightly during interaction.
- Use a restrained crossfade/short vertical shift for the changing word. No glow, rounded cards, shadows, or decorative effects.
- Use Lucide line icons already installed: Lightbulb, Fingerprint, Package, FlaskConical, and Rocket. No new dependency is needed.

## Mobile fallback
- No hover-dependent behavior.
- Show the section heading first, followed by a static two-column icon grid with each title always visible beneath its icon; center the fifth item on the final row.
- Keep tap targets and spacing comfortable without changing the existing bottle or three-labs layouts.

## Implementation
- Create a focused `JourneySection` component using the existing fonts, semantic colors, and Framer Motion already in the project.
- Insert it between `HeroScrollPin` and `ThreeLabsSection` on the homepage.
- Keep the bottle animation, copy, and every other page untouched.
- Add the task to the existing roadmap and mark it complete only after visual verification.

## Validation
- Check desktop hover and keyboard focus for all five stages.
- Check that the default heading returns to **the journey** when no stage is active.
- Check desktop positioning at the current viewport and mobile layouts at common phone widths.
- Confirm no overlap, clipping, horizontal scrolling, runtime errors, or build errors.
