# Fix Non-Working Adjust Sliders – ChitraCloud

We are building a React image editor.

Problem:
- Highlights, Shadows, White Point sliders do not affect image
- Because CSS does not support these filters directly

---

## Goal

Simulate these effects using supported CSS filters.

---

## Implementation

### 1. Update getAdjustmentFilters function

Modify it like this:

const getAdjustmentFilters = (adjustments) => {
  const {
    brightness = 0,
    contrast = 0,
    saturation = 0,
    exposure = 0,
    highlights = 0,
    shadows = 0,
    whitePoint = 0
  } = adjustments;

  let filters = [];

  // Basic
  filters.push(`brightness(${100 + brightness + exposure}%)`);
  filters.push(`contrast(${100 + contrast}%)`);
  filters.push(`saturate(${100 + saturation}%)`);

  // Simulate highlights (increase brightness + reduce contrast)
  if (highlights !== 0) {
    filters.push(`brightness(${100 + highlights}%)`);
    filters.push(`contrast(${100 - highlights * 0.5}%)`);
  }

  // Simulate shadows (increase contrast + brightness slightly)
  if (shadows !== 0) {
    filters.push(`contrast(${100 + shadows}%)`);
    filters.push(`brightness(${100 + shadows * 0.3}%)`);
  }

  // Simulate white point (brightness + slight saturation)
  if (whitePoint !== 0) {
    filters.push(`brightness(${100 + whitePoint}%)`);
    filters.push(`saturate(${100 + whitePoint * 0.2}%)`);
  }

  return filters.join(" ");
};

---

## Output

- Sliders should now affect image
- Not exact Photoshop-level, but visually noticeable
- Smooth real-time updates

Do not change UI.
Only improve filter logic.