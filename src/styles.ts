import { mappedAbstractAriaRolesToBackgroundColors } from "../data";

export default `
* {
  box-sizing: border-box;
}

:root {
  font-family: sans-serif;
  font-size: 16px;
}

body {
  background: black;
}

.periodic-table__root {
  display: grid;
  place-content: center;
  list-style: none;
  padding: 0;
  gap: 8px;
  grid-template-columns: 100%;
}

@media (min-width: 600px) {
  .periodic-table__root {
    grid-template-columns: repeat(auto-fill, minmax(6em, 1fr));
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
  background: #353535;
  color: white;
  grid-column: 1 / -1;
  margin: 0;
  padding: 1em;
  font-size: 1.333em;
}

.periodic-table__subgrid-row {
  display: contents;
}

.page-title {
  text-align: center;
  font-size: 1.5em;
  color: white;
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
}

@media (min-width: 600px) {
  .aria-role {
    aspect-ratio: 1;
  }
}

${Object.entries(mappedAbstractAriaRolesToBackgroundColors)
  .map(([role, color]) => {
    return `
    .aria-role--abstract-role-${role} {
      border: 2px solid ${color};
      color: white;

      &:hover {
        background-color: ${color};
        color: black;
      }
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
  text-decoration: underline;
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
  min-height: 0;
  max-height: none;
  min-width: 0;
  max-width: none;
  border: 0;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  place-content: center;
  place-items: center;
}

.aria-role__dialog[open] {
  display: grid;
}

.aria-role__table {
  margin: 0;
  list-style: none;
  padding: 8px;
  display: grid;
  place-content: center;
  place-items: center;
  grid-auto-columns: 1fr;
}

.aria-role__dfn {
  margin: 0;
  padding: 0;
  text-align: center;
  display: block;
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
}

dialog :is(td, th) {
  padding: 8px;
  border: 1px solid black;
}

.periodic-table__subgrid-heading {
  color: white;
  height: 100%;
  display: flex;
  place-items: center;
  margin: 0;
  padding: .5em 0;
  grid-column: 1 / -1;
}
`;
