import { mappedAbstractAriaRolesToBackgroundColors } from "../data";

export default `
* {
  box-sizing: border-box;
}

:root {
  font-family: system-ui, sans-serif;
  font-size: 18px;
  color-scheme: dark; 
}

body {
  margin: 0;
  background: black;
  display: grid;
}

@media screen and (min-width: 1024px) {
  body {
    grid-template-columns: minmax(0, 1fr) 28em;
  }

  main {
    grid-column: 1 / span 2;
    padding: 1em 0;
  }

  body:has(dialog[open]) main {
    grid-column: 1 / 2;
  }

  dialog[open] {
    grid-column: 2 / 3;
  }
}

.periodic-table__root {
  display: grid;
  list-style: none;
  gap: 8px;
  grid-template-columns: 100%;
  padding: 0 1em;
}

@media screen and (min-width: 1024px) {
  .periodic-table__root {
    grid-template-columns: repeat(auto-fit, minmax(6em, 0fr));
    width: 100%;
  }
}

.periodic-table__subgrid {
  display: grid;
  grid-template-columns: subgrid;
  font-size: 1em;
  gap: 4px;
}

.periodic-table__subgrid-area {
  grid-column: 1 / -1;
}

.periodic-table__subgrid-area .periodic-table__subgrid-area-heading {
  color: white;
  grid-column: 1 / -1;
  margin: 0;
  padding: 1em 0 .1em;
  font-size: 1.5em;
  font-weight: normal;
  border-bottom: 2px solid white;
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
}

@media screen and (min-width: 1024px) {
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

    .aria-role__dialog--abstract-role-${role} .aria-role__dialog-content {
      --color: ${(index / length) * 360}deg;
    }
  `;
  })
  .join("")}
  
.aria-role__summary {
  text-align: center;
  display: grid;
  height: 100%;
  width: 100%;
  place-content: center;
  place-self: center;
  padding: 1em;
  cursor: pointer;
  font: inherit;
  background: none;
  border: 0;
  margin: auto;
  color: inherit;
  font-weight: 600;

  &:focus {
    outline: 4px solid white;
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
  min-width: 0;
  max-width: none;
  border: 0;
  overscroll-behavior: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 0;

  &:focus { 
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

.aria-role__dialog-content > [tabindex="-1"]:focus {
  outline: 0;
}

.aria-role__dialog-content:has(> [tabindex="-1"]:focus) {
  outline: 2px solid white;
  outline-offset: 2px;
}

@media screen and (min-width: 1024px) {
  .aria-role__dialog {
    position: static;
  }

  .aria-role__dialog-content {
    position: fixed;
    top: 1em;
    height: 100%;
    max-height: calc(100dvh - 2em);
    overflow: auto;
    border: 2px solid white;
    margin-right: 1em;
    border-radius: 8px;
    transition: max-height 0.125s ease-in-out;
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

.aria-role__column-header,
.aria-role__cell {
  background-color: white;
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
  border-left: 1px solid;
  border-top: 1px solid;
}

dialog :is(td, th) {
  padding: 8px;
  border-right: 1px solid;
  border-bottom: 1px solid;
  text-align: left;
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
}

close-dialog-button {
  display: contents;
}

close-dialog-button button {
  flex: 0 0 auto;
  background: none;
  border: 2px solid blue;
  font: inherit;
  color: blue;
  border-radius: 50%;
  align-self: center;
  justify-self: flex-end;
  font-weight: bold;
  line-height: 1;
  padding: .5em .667em .667em;

  &:focus {
    outline-offset: 2px;
    outline: 2px solid black;
  }
}
`;
