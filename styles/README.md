# Styles

This directory contains all the stylesheets used in the project. The styles are written in pure CSS, but include newer features, including:

- subgrid
- native CSS nesting
- custom properties

## Special considerations

- This page is designed to be zoomed in and out without breaking the layout. The layout is designed to be fluid and responsive, and should work on any screen size.

- rem units are used for most measurements, including media queries, so that the layout scales with the user's text size preference.

- On iOS, the font size should scale with the user's text size preference.

- The colors are designed to be accessible, and the contrast should be at least 4.5:1 for all text.

- Dark mode and light mode are supported. The user's preference is detected using the `prefers-color-scheme` media query.
