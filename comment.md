# Why Figma Designs Look Different in the Browser

When exporting or implementing designs from **Figma**, it’s common to see visual differences once the layout is rendered in a **real web browser**. This is expected—Figma is a design simulation tool, not a browser.

This README explains the main reasons for these differences.

---

## 1. Figma Is *Not* a Real Browser
Web browsers use complex rendering engines:

- **Chrome / Edge:** Blink  
- **Safari:** WebKit  
- **Firefox:** Gecko  

These engines interpret **HTML**, **CSS**, **JavaScript**, **media queries**, and **DOM** layout rules.

Figma uses its **own rendering engine**, which only *visually approximates* these behaviors.

---

## 2. Text Rendering Is Different
Browsers apply system-level text rendering:

- font hinting  
- kerning  
- subpixel anti-aliasing  
- OS-specific smoothing  

Figma renders text in a more uniform, cross-platform way.

This leads to differences in:

- letter spacing  
- line height  
- font weight  
- overall sharpness  

---

## 3. Figma Does Not Use Real CSS
Even though Figma’s properties look similar to CSS, they are **not** interpreted the same way.

Examples of differences:

- `line-height` is handled differently  
- real webfont weights may render differently  
- text wrapping is not driven by the DOM  
- spacing in Figma does not equal CSS box-model behavior  

---

## 4. Responsive Layout Is Only Simulated
Figma’s **Auto Layout** is inspired by CSS Flexbox/Grid, but not equivalent.

In a real browser:

- elements reflow differently  
- media queries change layout logic  
- margins/padding behave according to the box model  
- breakpoints respond to actual viewport rules  

Figma only mimics these behaviors visually.

---

## 5. Prototypes ≠ Real Interactions
Figma prototypes:

- don’t use HTML or the DOM  
- simulate animations  
- simulate hover/active states  
- don’t reflect JS behavior  

As a result, motion and interactivity won’t match the real web experience.

---

## 6. Colors May Look Different
Color rendering differs because:

- Figma uses mainly **sRGB**  
- browsers can use sRGB, Display-P3, etc.  
- blending and gamma correction differ  
- transparency behaves slightly differently  

---

## 7. Browser Rendering Depends on Device Scaling
Browsers factor in:

- device pixel ratio (DPR)  
- OS scaling (e.g., 125% Windows, Retina macOS)  
- subpixel positioning  

Figma renders everything pixel-perfect, independent of hardware.  
This can cause differences in sharpness, spacing, or alignment.

---

## Summary
Figma provides a **design approximation**, while browsers provide the **real technical rendering**.

**In short:**  
> Figma is a visual design tool. A browser is the execution environment.

Differences between them are normal and expected.

---

## Want to Improve Consistency?
- Use real webfonts during implementation  
- Match Figma line-height and letter-spacing to actual CSS values  
- Test responsive layout early in the browser  
- Avoid over-dependence on pixel-perfect Figma alignment  

Olaf
