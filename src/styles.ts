import { mappedAbstractAriaRolesToBackgroundColors } from "../data";

export default `
* {
  box-sizing: border-box;
}

:focus:not(:focus-visible) {
  outline: 0;
}

:root {
  font-family: system-ui, sans-serif;
  color-scheme: dark;
  font-size: 17px;

  @media print {
    color-scheme: light;
  }
}

body {
  margin: 0;
  background: #252525;
  display: grid;
  padding: 0 1em;
  column-gap: .5em;
  grid-template-columns: repeat(auto-fit, minmax(0px, 6em));
  place-content: center;

  @media print {
    background: white;
  }
}

main {
  padding: 1em 0;
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;
  place-content: space-between;
}

@media screen and (min-width: 960px) {
  body {
    place-content: stretch;
  }

  body:has(:is(.aria-role__dialog:target, .aria-role__dialog[open])) main {
    grid-column: 1 / -5;
  }

  :is(.aria-role__dialog[open], .aria-role__dialog:target) {
    grid-column: -5 / span 5;
  }
}

@media print {
  body:has(:is(.aria-role__dialog:target, .aria-role__dialog[open])) main {
    display: none !important;
  }

  close-dialog-button {
    display: none !important;
  }
}

.periodic-table__root {
  display: grid;
  list-style: none;
  grid-template-columns: subgrid;
  grid-column: 1 / -1;
}

.periodic-table__subgrid {
  display: grid;
  grid-template-columns: subgrid;
}

.periodic-table__subgrid-area {
  grid-column: 1 / -1;
  row-gap: .5em;
}

.periodic-table__subgrid-area .periodic-table__subgrid-area-heading {
  color: white;
  grid-column: 1 / -1;
  margin: 0;
  padding: 1em 0 .1em;
  font-size: 1.5em;
  font-weight: normal;
  border-bottom: 2px solid;

  @media print {
    color: black;
  }
}

.periodic-table__subgrid-area:nth-child(2)
  .periodic-table__subgrid-area-heading {
  padding-top: 2em;
}

.periodic-table__subgrid-row {
  display: contents;
}

.page-title {
  text-align: center;
  font-size: 1.5em;
  color: white;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 0;
  grid-column: 1 / -1;
  word-break: break-word;

  @media print {
    color: black;
  }
}

/*
.periodic-table__subgrid-area--interactive .aria-role__summary {
  color: black;
}
*/

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.aria-role {
  display: grid;
  width: 100%;
  word-break: break-word;
  height: 100%;
  min-height: 6em;
  border-radius: 8px;
  --hsl-color: hsl(var(--color), 80%, 87.5%);
  --hsl-alt-color: hsl(var(--color), 80%, 22.5%);
  background-color: var(--hsl-alt-color);
  border: 2px solid var(--hsl-color);
  color: white;

  &:hover {
    background-color: var(--hsl-color);
    color: black;
  }

  @media print {
    color: black;
    break-inside: avoid;
    border-color: var(--hsl-alt-color);
  }
}

@media screen and (min-width: 960px) {
  .aria-role {
    min-height: 6em;
  }
}

${Object.entries(mappedAbstractAriaRolesToBackgroundColors)
  .map(([role], index, { length }) => {
    return `
    .aria-role--abstract-role-${role} {
      --color: ${(index / length) * 360}deg;
    }

    .aria-role__dialog--abstract-role-${role} {
      --color: ${(index / length) * 360}deg;
    }
  `;
  })
  .join("")}
  
.aria-role__summary {
  display: grid;
  height: 100%;
  width: 100%;
  align-content: center;
  place-self: center;
  padding: 1em;
  cursor: pointer;
  font: inherit;
  background: none;
  border: 0;
  margin: auto;
  color: inherit;
  font-weight: 600;
  text-decoration-color: var(--hsl-color);
  justify-content: center;
  text-align: center;
  padding: .5em;

  &:focus-visible {
    outline: 4px solid white;
    outline-offset: 2px;
  }
}

.aria-role__row {
  display: grid;
}

/*
.aria-role--interactive .aria-role__summary {
  color: white;
}

.aria-role--non-interactive .aria-role__summary {
  color: black;
}

.aria-role--content-type-phrasing {
  background-color: rgb(160, 175, 255);
  color: black;
}

.aria-role--content-type-phrasing:is(.aria-role--abstract-role-widget, .aria-role--abstract-role-composite) {
  background-color: #05401e;
  color: white;
}
*/

/*
.aria-role--interactive.aria-role--only-phrasing-descendants:not(.aria-role--content-type-phrasing) {
  background-image: linear-gradient(45deg, #05401e 50%, transparent 50%);
}

.aria-role--non-interactive.aria-role--only-phrasing-descendants:not(.aria-role--content-type-phrasing) {
  background-image: linear-gradient(45deg, rgb(160, 175, 255) 50%, transparent 50%);
}
*/

.aria-role__dialog {
  position: fixed;
  min-height: 0;
  max-height: none;
  height: 100%;
  min-width: 0;
  max-width: none;
  width: 100%;
  top: 0;
  left: 0;
  border: 0;
  padding: 0;
  background: none;
  overscroll-behavior: none;
  overflow: auto;

  &:focus-visible { 
    outline: 0;
  }
}

.aria-role__dialog-content {
  display: grid;
  align-content: flex-start;
  position: relative;
  padding: 1em;
  background: white;
  color: black;
  color-scheme: light;
}

.aria-role__dialog-content {
  /*background-color: hsl(0deg, 0%, 87.5%);*/
  background-color: hsl(var(--color), 80%, 87.5%);
}

.aria-role__dialog-content > [tabindex="-1"]:focus-visible {
  outline: 0;
}

.aria-role__dialog-content:has(> [tabindex="-1"]:focus-visible) {
  outline: 2px solid white;
  outline-offset: 2px;
}

@media screen and (min-width: 960px) {
  .aria-role__dialog {
    position: static;
    padding: 0 0 0 2em;
  }

  .aria-role__dialog-content {
    position: fixed;
    top: 1em;
    height: 100%;
    max-height: calc(100dvh - 2em);
    overflow: auto;
    margin-right: 1em;
    border-radius: 8px;
    transition: max-height 0.125s ease-in-out;
    border: 2px solid hsl(var(--color), 80%, 22.5%);
  }
}


.aria-role__dialog[open] {
  display: grid;
}

.aria-role__table {
  margin: 0;
  list-style: none;
  display: grid;
  place-content: center;
  place-items: stretch;
  grid-auto-columns: 100%;
  margin-top: 1em;
}

.aria-role__dfn {
  margin: 0;
  padding: 0;
  text-align: center;
  display: block;
}

.aria-role__cell {
  background-color: hsl(var(--color), 80%, 97.5%);

  @media print {
    color: black;
  }
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.is-strong {
  font-weight: bold;
}

dialog table {
  border-collapse: collapse;
  border: 1px solid hsl(var(--color), 80%, 22.5%);

  @media print {
    border-color: black;
  }
}

dialog :is(td, th) {
  padding: 8px;
  text-align: left;
}

dialog th {
  background: hsl(var(--color), 80%, 22.5%);
  color: white;
  
  @media print {
    background: none;
    color: black;
  }
}

dialog table p {
  margin: 0;
}

.periodic-table__subgrid-heading {
  color: white;
  height: 100%;
  display: flex;
  place-items: center;
  margin: 0;
  padding: .5em 0;
  grid-column: 1 / -1;
  font-style: italic;
  font-weight: normal;

  @media print {
    color: black;
  }
}

.list {
  list-style: disc;
  list-style-position: inside;
}

.aria-role__dialog-heading {
  margin: 0;
  align-self: center;
  width: 100%;
  word-break: break-word;
  font-size: 1.75em;
}

close-dialog-button {
  display: contents;
}

close-dialog-button a {
  flex: 0 0 auto;
  background: none;
  border: 2px solid;
  font: inherit;
  color: hsl(var(--color), 80%, 22.5%);
  border-radius: 50%;
  align-self: center;
  justify-self: flex-end;
  font-weight: bold;
  line-height: 1;
  padding: .5em .667em .667em;
  text-decoration: none;
  background-color: hsl(var(--color), 80%, 97.5%);

  &:focus-visible {
    outline-offset: 2px;
    outline: 2px solid black;
  }
}

role-dialog {
  display: contents;
}

dialog:target {
  display: grid;
}
`;
