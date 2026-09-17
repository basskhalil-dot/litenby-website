# Replace all six blog images

## What will change
- Convert `Blog_1.jpg` through `Blog_6.jpg` to optimized WebP files while preserving their 1920×823 banner proportions.
- Store the optimized images as project media and map each one to the matching article in the supplied order.
- Use the same image for each article’s 16:9 thumbnail and 21:9 reading-page banner. Thumbnails will crop from the center while banners retain the supplied wide composition.
- Keep all blog text, typography, spacing, colors, and animations unchanged.

## Verification
- Check all six thumbnails on the blog page.
- Open all six articles and confirm the correct banner loads.
- Review desktop and mobile layouts for broken crops or missing images.
- Confirm the preview remains healthy after the update.

## Technical details
- Encode with WebP at a high-quality, size-efficient setting.
- Replace external placeholder image links with local project asset pointers.
- Add lazy loading and asynchronous decoding to archive thumbnails only; article banners remain immediately available.
