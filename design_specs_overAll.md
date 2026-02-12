### Specifications for Unit Selection in Responsive Web Design

These specifications are designed for specs-driven development. Provide them directly to your coding agent as decision-making guidelines. The agent should evaluate each UI element or property against these rules in order of priority (from most specific to general). Always prioritize accessibility (e.g., WCAG guidelines for text scaling) and performance (e.g., avoid over-reliance on vw for frequent repaints).

The core principle: Use units that promote fluidity and responsiveness. Default to relative units (% or rem) for scalability; use absolute units (px) only for precision where scaling could break usability. For viewport-relative (vw/vh), always combine with limiting functions like `clamp()`, `min()`, or `max()` to prevent extremes on small/large screens.

#### 1. Typography Specifications
Typography must scale fluidly with screen size while maintaining readability (e.g., min 16px body text, headings not exceeding 5-6rem on large screens). Avoid pure vw for text to prevent illegibility on mobiles.

- **Body Text (paragraphs, labels):**
  - Use `rem` as primary unit (e.g., `font-size: 1rem;`). Root rem is set to 16px via `:root { font-size: 16px; }` or user preference.
  - If needs to scale slightly with viewport: Use `clamp(1rem, 2.5vw, 1.25rem)`.
  - Never use % (not relative to font context) or px (non-scalable with user zoom preferences).
  - Decision Rule: If the text is static and non-hero, stick to rem. For fluid scaling in responsive designs, apply clamp with vw.

- **Headings (H1-H6) and Display Text:**
  - Use `clamp()` with vw for fluid scaling: e.g., H1: `font-size: clamp(2.5rem, 6vw, 5rem);`.
  - Fallback to rem if no viewport scaling needed: e.g., `font-size: 2rem;`.
  - Avoid px unless for micro-adjustments (e.g., letter-spacing: 0.5px).
  - Decision Rule: Evaluate screen context—if heading spans full-width or is in a hero, use vw in clamp. For nested content (e.g., in cards), use rem relative to parent.

- **Line Height and Letter Spacing:**
  - Use unitless values (e.g., `line-height: 1.5;`) or rem (e.g., `1.5rem`).
  - Decision Rule: Always unitless for proportionality; rem if explicit scaling required.

- **Mobile Scaling Override:**
  - On media queries for <768px, enforce min sizes: e.g., `@media (max-width: 767px) { font-size: max(1rem, calc(3vw + 0.5rem)); }`.
  - Decision Rule: If text risks becoming too small (<14px equivalent), clamp with min vw.

#### 2. Full-Width Sections Specifications
Full-width sections (e.g., heroes, banners) should bleed to screen edges and adapt to viewport changes without horizontal scroll.

- **Width and Height:**
  - Use `100vw` for true full-width (ignores parent padding/margins): e.g., `width: 100vw;`.
  - Alternative for contained full-width: `width: 100%;` with negative margins if needed (e.g., `margin: 0 calc(-50vw + 50%);`).
  - For height: `100vh` or `100dvh` (dynamic for mobile browsers); clamp if variable: `height: clamp(50vh, 80vh, 100vh);`.
  - Avoid % (relative to parent, not viewport) or px (non-responsive).
  - Decision Rule: If section must touch screen edges regardless of container, use vw/vh. If nested in a max-width wrapper, use 100%.

- **Padding and Margins:**
  - Use `rem` or `clamp()` with vw: e.g., `padding: clamp(2rem, 5vw, 4rem);`.
  - Decision Rule: For internal spacing that grows with screen, use vw in clamp. For fixed gutters, use rem.

- **Backgrounds and Images:**
  - Use `100vw` for background-size if full-bleed.
  - Decision Rule: Always vw for viewport-spanning visuals.

- **Mobile Scaling Override:**
  - On <768px, reduce heights: e.g., `height: min(80vh, 600px);` to avoid overwhelming small screens.
  - Decision Rule: If content overflows or compresses, add min/max with px as fallback.

#### 3. Cards/Grids Specifications
Cards and grids should be flexible, using container-relative units for proportionality within layouts (e.g., Flexbox/Grid).

- **Container Width (Grid Wrapper):**
  - Use `min(100%, 1440px)` for max-width comfort on large screens.
  - Internal grid items: `width: 100%;` or fractional % (e.g., `width: 33.33%;` for 3-column).
  - Avoid vw (not relative to grid container) or px (breaks responsiveness).
  - Decision Rule: Always % for child items relative to parent grid. Use px only for min-width (e.g., `min-width: 300px;` per card).

- **Card Dimensions (Width/Height):**
  - Use % for width: e.g., in a 4-column grid, `width: 25%;`.
  - For height: `auto` or % if aspect ratio needed (e.g., `height: 100%;` in equal-height rows).
  - Padding/Margins: `rem` (e.g., `padding: 1.5rem;`) or clamp with vw for fluid spacing.
  - Decision Rule: If card is in a responsive grid, prioritize %. For fixed min sizes (e.g., to prevent collapse), add `min-width: 250px;`.

- **Grid Gaps:**
  - Use `rem` or `clamp(1rem, 2vw, 2rem);`.
  - Decision Rule: rem for consistent gaps; vw in clamp if gaps should scale with screen.

- **Mobile Scaling Override:**
  - Use media queries: e.g., `@media (max-width: 767px) { grid-template-columns: 1fr; }` (stack to 100%).
  - Decision Rule: Switch from % to 100% on mobile for full-width stacking; enforce min px for usability.

#### 4. Mobile Scaling Specifications (Cross-Cutting)
Mobile-first design: Start with base styles for <768px, then enhance for larger screens. Ensure no horizontal scroll; test on 320px-480px widths.

- **General Breakpoints:**
  - Mobile: max-width 767px
  - Tablet: 768px-1023px
  - Desktop: min-width 1024px
  - Decision Rule: Use media queries to override units—e.g., reduce vw scales on mobile.

- **Scaling Rules:**
  - For any property: If it risks being too small/large on mobile, wrap in `clamp(min px/rem, vw/%, max px/rem)`.
  - Typography: Min 1rem; use vw only in clamp.
  - Layouts: % for flexibility; px for mins/maxes (e.g., `max-width: 100%; min-width: 320px;`).
  - Full-Width/Viewport: vh/dvh for heights; vw with min(100vw, ...) to cap.
  - Decision Rule: Test for extremes—if element <10% readable on 320px or >200% on 4K, add limits. Prefer % for parent-child relations; vw for global scaling; px for invariants.

#### Overall Decision Flowchart for Agent
1. **Identify Context:** Is it relative to parent (use %)? Viewport (use vw with clamp)? Fixed (use px)?
2. **Check Scalability Need:** Does it need to grow/shrink with screen? → Add clamp/min/max.
3. **Apply Mobile Override:** Always include media query if unit could fail on small screens.
4. **Validate:** Ensure compliance with accessibility (e.g., text scales with zoom) and no reflow issues.

These specs should enable your agent to make consistent choices.