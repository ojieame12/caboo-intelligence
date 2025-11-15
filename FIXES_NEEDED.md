# Urgent UI Fixes for Production

## 1. Image Overlap Issues

### Problem:
Text flows into WhatsApp mockup images on certain screen sizes.

### Solution:
Add max-widths to text containers to keep them constrained:

**Hero section:**
- Headline: `max-w-[600px] lg:max-w-[700px]`
- Subtext: `max-w-[500px] lg:max-w-[600px]`

**Features section ("Built for how you actually work"):**
- Container: `max-w-[700px]` on the text div
- Prevents text from flowing into mockup area

---

## 2. Font Loading Flash (FOUT)

### Problem:
Custom fonts load slowly, causing text to flash/jump when fonts swap in.

### Current State:
- `font-display: swap` is set (good)
- But fonts aren't preloaded

### Solution A: Preload Fonts (index.html)
```html
<link rel="preload" href="/src/fonts/TXlefX7W8sjgaFnFk9lqJhsRco.ttf" as="font" type="font/ttf" crossorigin>
<link rel="preload" href="/src/fonts/pxGroteskFont-normal-400-100.ttf" as="font" type="font/ttf" crossorigin>
```

### Solution B: Font Loading API
```css
/* Add to index.css */
body {
  opacity: 0;
  transition: opacity 0.3s;
}

body.fonts-loaded {
  opacity: 1;
}
```

Then in main.tsx, detect font load and add class.

---

## 3. Better Onload Animations

### Problem:
Content pops in abruptly, no smooth reveal.

### Solution:
**Add page-level fade-in wrapper:**

```css
/* Add to index.css */
@keyframes pageReveal {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

#root {
  animation: pageReveal 0.6s ease-out;
}
```

**Delay initial animations slightly:**
- Hero: Start at 0.2s (after page fades in)
- Sections: Start at 0.4s+

**Better initial states:**
- Set `opacity: 0` on animated elements by default
- Only animate-in when fonts loaded
- Smoother reveal sequence

---

## Priority Order:

1. **Image overlaps** (Critical - looks broken)
2. **Font loading** (High - affects perception)
3. **Animation polish** (Medium - nice to have)

---

**Apply these fixes in next deployment.**
