# Styles

This directory contains the single authored stylesheet used in the project:

- `styles/tailwind.css`

The project uses Tailwind CSS with `@layer` and `@apply` for base and utility-driven styles.

The stylesheet may still include a small number of plain CSS declarations when there is no direct Tailwind utility equivalent.

It also uses newer CSS features, including:

- subgrid
- native CSS nesting
- custom properties

## Special considerations

- This page is designed to be zoomed in and out without breaking the layout. The layout is designed to be fluid and responsive, and should work on any screen size.

- rem units are used for most measurements, including media queries, so that the layout scales with the user's text size preference.

- On iOS, the font size should scale with the user's text size preference.

- The colors are designed to be accessible, and the contrast should be at least 4.5:1 for all text.

- Dark mode and light mode are supported.
