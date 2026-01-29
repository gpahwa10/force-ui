# Typography System

A comprehensive, robust typography system built with **Tailwind CSS v4**, **shadcn/ui**, and the **Inter** font family.

## Overview

This typography system provides a consistent, scalable foundation for all text styles across your application. It leverages:

- **Inter Sans** (400, 500) for body text and UI elements
- **Inter Display** (500, 600) for headings and display text
- CSS custom properties for maintainability
- Tailwind CSS v4 utility classes
- A flexible Typography React component

## Font Families

### Inter Sans
Used for body text, labels, captions, and general UI elements.
- **Weights:** 400 (Regular), 500 (Medium)
- **Usage:** `font-sans` or `font-family: var(--font-sans)`

### Inter Display
Used for headings and large display text.
- **Weights:** 500 (Medium), 600 (SemiBold)
- **Usage:** `font-display` or `font-family: var(--font-display)`

## Typography Scale

### Display Styles
Large, attention-grabbing text for hero sections and marketing content.

| Class | Size | Usage |
|-------|------|-------|
| `text-display-2xl` | 72px / 4.5rem | Hero headlines |
| `text-display-xl` | 60px / 3.75rem | Large hero headlines |
| `text-display-lg` | 48px / 3rem | Section heroes |
| `text-display-md` | 36px / 2.25rem | Marketing headers |
| `text-display-sm` | 30px / 1.875rem | Sub-headers |

### Headings
Semantic heading styles for content hierarchy.

| Element | Class | Size | Usage |
|---------|-------|------|-------|
| `<h1>` | `text-h1` | 48px / 3rem | Page title |
| `<h2>` | `text-h2` | 36px / 2.25rem | Section title |
| `<h3>` | `text-h3` | 30px / 1.875rem | Sub-section title |
| `<h4>` | `text-h4` | 24px / 1.5rem | Card title |
| `<h5>` | `text-h5` | 20px / 1.25rem | Small heading |
| `<h6>` | `text-h6` | 18px / 1.125rem | Smallest heading |

### Body Text
Standard text for content and paragraphs.

| Class | Size | Usage |
|-------|------|-------|
| `text-lead` | 20px / 1.25rem | Lead paragraphs, introductions |
| `text-body-lg` | 18px / 1.125rem | Emphasized body text |
| `text-body` | 16px / 1rem | Default body text |
| `text-body-sm` | 14px / 0.875rem | Secondary body text |
| `text-body-xs` | 12px / 0.75rem | Fine print |

### Labels & Captions
UI text for forms, metadata, and supplementary content.

| Class | Size | Weight | Usage |
|-------|------|--------|-------|
| `text-label` | 14px / 0.875rem | Medium | Form labels |
| `text-label-sm` | 12px / 0.75rem | Medium | Small form labels |
| `text-caption` | 14px / 0.875rem | Regular | Image captions, help text |
| `text-caption-sm` | 12px / 0.75rem | Regular | Small captions |
| `text-overline` | 12px / 0.75rem | Medium | Overline text (uppercase) |

### Code Text
Monospace text for code snippets.

| Class | Size | Usage |
|-------|------|-------|
| `text-code` | 14px / 0.875rem | Inline code |
| `text-code-sm` | 12px / 0.75rem | Small code snippets |

## Font Weights

| Class | Weight | Usage |
|-------|--------|-------|
| `font-regular` | 400 | Regular text |
| `font-medium` | 500 | Emphasis, labels |
| `font-semibold` | 600 | Strong emphasis, headings |
| `font-bold` | 700 | Maximum emphasis |

## Usage Methods

### 1. Semantic HTML Elements
HTML elements receive automatic styling:

```tsx
<h1>Automatically styled heading</h1>
<p>Automatically styled paragraph</p>
<code>Automatically styled code</code>
```

### 2. Utility Classes
Apply typography styles to any element:

```tsx
<div className="text-h1">Styled as H1</div>
<span className="text-body-lg">Large body text</span>
<p className="text-caption">Caption text</p>
<div className="font-display text-4xl font-semibold">Custom combination</div>
```

### 3. Typography Component
Use the flexible Typography component:

```tsx
import { Typography } from "@/components/ui/typography";

// Basic usage
<Typography variant="h1">Heading Text</Typography>

// With custom element
<Typography variant="body" as="div">Body text as div</Typography>

// With additional classes
<Typography variant="display-lg" className="text-primary">
  Colored display text
</Typography>

// All variants available
<Typography variant="display-2xl">...</Typography>
<Typography variant="h1">...</Typography>
<Typography variant="body">...</Typography>
<Typography variant="caption">...</Typography>
<Typography variant="label">...</Typography>
<Typography variant="lead">...</Typography>
<Typography variant="overline">...</Typography>
<Typography variant="code">...</Typography>
```

## CSS Variables

All typography values are available as CSS custom properties:

### Font Sizes
```css
var(--font-size-xs)     /* 12px */
var(--font-size-sm)     /* 14px */
var(--font-size-base)   /* 16px */
var(--font-size-lg)     /* 18px */
var(--font-size-xl)     /* 20px */
var(--font-size-2xl)    /* 24px */
var(--font-size-3xl)    /* 30px */
var(--font-size-4xl)    /* 36px */
var(--font-size-5xl)    /* 48px */
var(--font-size-6xl)    /* 60px */
var(--font-size-7xl)    /* 72px */
```

### Line Heights
```css
var(--line-height-none)     /* 1 */
var(--line-height-tight)    /* 1.25 */
var(--line-height-snug)     /* 1.375 */
var(--line-height-normal)   /* 1.5 */
var(--line-height-relaxed)  /* 1.625 */
var(--line-height-loose)    /* 2 */
```

### Letter Spacing
```css
var(--letter-spacing-tighter)  /* -0.05em */
var(--letter-spacing-tight)    /* -0.025em */
var(--letter-spacing-normal)   /* 0em */
var(--letter-spacing-wide)     /* 0.025em */
var(--letter-spacing-wider)    /* 0.05em */
var(--letter-spacing-widest)   /* 0.1em */
```

### Font Weights
```css
var(--font-weight-normal)    /* 400 */
var(--font-weight-medium)    /* 500 */
var(--font-weight-semibold)  /* 600 */
var(--font-weight-bold)      /* 700 */
```

## Best Practices

### 1. Use Semantic HTML
Always use semantic HTML elements when possible:
```tsx
// Good
<h1 className="text-primary">Page Title</h1>

// Avoid
<div className="text-h1 text-primary">Page Title</div>
```

### 2. Maintain Hierarchy
Keep a clear visual hierarchy in your content:
```tsx
<article>
  <h1>Main Title</h1>
  <p className="text-lead">Introduction paragraph</p>
  <h2>Section Title</h2>
  <p>Regular content</p>
  <h3>Subsection Title</h3>
  <p>More content</p>
</article>
```

### 3. Use Display Styles Sparingly
Display styles are designed for hero sections and marketing content:
```tsx
<section className="hero">
  <Typography variant="display-lg">
    Welcome to Our Platform
  </Typography>
  <Typography variant="lead">
    Build something amazing today
  </Typography>
</section>
```

### 4. Combine with Color Utilities
Typography works seamlessly with Tailwind color utilities:
```tsx
<Typography variant="h2" className="text-primary">
  Colored Heading
</Typography>
<Typography variant="body" className="text-muted-foreground">
  Muted body text
</Typography>
```

### 5. Responsive Typography
Use Tailwind's responsive prefixes for adaptive text sizes:
```tsx
<Typography
  variant="h1"
  className="text-3xl md:text-4xl lg:text-5xl"
>
  Responsive Heading
</Typography>
```

## Live Documentation

Visit `/typography` in your application to see all typography styles in action with live examples and usage code.

## Implementation Details

### Location of Files
- **CSS Variables & Utilities:** `src/app/globals.css`
- **Typography Component:** `src/components/ui/typography.tsx`
- **Font Configuration:** `src/app/layout.tsx`
- **Live Documentation:** `src/app/typography/page.tsx`

### Customization
To customize the typography system, edit the CSS variables in `globals.css`:

```css
@theme inline {
  --font-size-base: 1rem;  /* Change base font size */
  --line-height-normal: 1.5;  /* Adjust line height */
  /* ... other variables */
}
```

## Dark Mode Support

All typography styles automatically adapt to dark mode through your theme configuration. The text colors use CSS variables that change based on the theme:

```tsx
// Automatically adapts to dark mode
<Typography variant="body">
  This text will use the appropriate foreground color
</Typography>
```

## Accessibility

- All heading levels maintain proper semantic hierarchy
- Line heights are optimized for readability
- Color contrast meets WCAG guidelines when using theme colors
- Font sizes are relative (rem-based) for user preference support

---

**Note:** This typography system is designed to work seamlessly with shadcn/ui components and Tailwind CSS v4. All styles are fully customizable through CSS variables and Tailwind configuration.
