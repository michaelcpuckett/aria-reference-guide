import { mappedAbstractAriaRolesToBackgroundColors } from "../data";

export default `
  * {
    box-sizing: border-box;
    align-items: start;
    vertical-align: initial;
  }

  :focus:not(:focus-visible) {
    outline: 0;
  }

  :focus-visible {
    outline: 4px dashed white;
    outline-offset: 1px;
  }

  :root {
    font-family: system-ui, sans-serif;

    @media screen {
      --header-background-color: #252525;
      --page-background-color: black;
      color-scheme: dark;
      min-height: 100%;
    }

    @media print {
      --header-background-color: Canvas;
      color-scheme: light;
    }
  }

  body {
    @media screen {
      margin: 0;
      overflow-y: scroll;
      background-color: var(--page-background-color);
      min-height: 100%;
    }
  }

  ul:where(:not(.list)) {
    @media screen {
      list-style: none;
      padding: 0;
      margin: 0;
    }
  }

  summary {
    @media screen {
      cursor: pointer;
      line-height: 1;
      font: inherit;
    }
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  tr {
    display: grid;
  }

  th {
    text-align: left;
    border-bottom: 2px solid var(--light-color);
    font-size: 1.25rem;
    font-weight: normal;
  }

  table a {
    color: var(--light-color);
  }

  td p {
    margin: .5rem 0;
  }

  tr:not(:first-child) th {
    margin-top: 1rem;
  }

  .visually-hidden {
    @media screen {
      border: 0;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
      white-space: nowrap;
    }
  }

  .container {
    @media screen and (max-width: calc(48rem - 1px)) {
      display: grid;
      grid-template-columns: 1rem 1fr 1rem;
      grid-template-rows: 3rem 3rem auto 0;
      row-gap: 1rem;
      height: 100%;
    }
  
    @media screen and (min-width: 48rem) {
      display: grid;
      grid-template-columns: 1rem 15rem 1fr 1rem;
      grid-template-rows: auto 1fr 0;
      column-gap: 1rem;
      row-gap: 1rem;
      position: relative;
      height: 100%;
      contain: content;
    }
  
    @media screen and (min-width: 86rem) {
      column-gap: 0;
      grid-template-columns: 1fr 1rem 1rem 15rem 1rem 64rem 1rem 1rem 1fr;
    }
  }

  header {
    @media screen {
      grid-column: 1 / -1;
      grid-row: 1 / 2;
      position: sticky;
      top: 0;
      z-index: 2;
      display: flex;
      background-color: var(--header-background-color);
      place-content: center;
      padding: 1rem;
    }
  }

  menu-button {
    display: contents;
  }

  .menu-button {
    cursor: pointer;
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    display: flex;
    place-content: center;
    place-items: center;
    gap: .75rem;
    font: inherit;
    font-size: 1.125rem;
    line-height: 1;
    background: none;
    padding: .125rem .5rem;
    margin: 0;
    border: 0;
    height: 100%;
    border: 2px solid white;
    border-radius: .5rem;

    &[aria-expanded="true"] {
      background-color: white;
      color: black;
    }

    &:not([aria-expanded="true"]) [data-show="on"] {
      display: none;
    }

    &[aria-expanded="true"] [data-show="off"] {
      display: none;
    }

    @media screen and (min-width: 48rem) {
      display: none;
    }
  }

  [data-icon="menu"] {
    height: 1.5rem;
    width: 1.5rem;
  }

  [data-icon="close"] {
    height: 2rem;
    width: 2rem;
    margin-right: -.5rem;
  }

  h1 {
    @media screen {
      margin: 0;
      font-size: 1rem;
      line-height: 1;
      font-weight: normal;
      letter-spacing: 0.1rem;
      text-transform: uppercase;
      text-align: center;
    }
  }

  nav {
    @media screen and (max-width: calc(48rem - 1px)) {
      grid-column: 2 / 3;
      grid-row: 3 / 4;
      width: calc(100% + 8px);
      left: -5px;
      top: -5px;
      position: relative;

      .container:has(.menu-button[aria-expanded="true"]) & {
        max-height: calc(100% - 1rem);
      }
    }

    @media screen and (min-width: 48rem) {
      position: sticky;
      max-height: calc(100vh - 5rem);
      top: calc(4rem - 5px);
      grid-column: 2 / 3;
      grid-row: 2 / 3;
      overflow: hidden;
      width: 100%;
      margin: -5px;
      width: calc(100% + 10px);
    }

    @media screen and (min-width: 86rem) {
      grid-column: 4 / 5;
    }
  }

  .nav__inner-container {
    @media screen and (min-width: 48rem) {
      width: calc(100% + var(--scrollbar-width, 1rem));
      overflow-y: scroll;
      height: calc(100vh - 5rem);
    }
  }

  dialog {
    position: static;
    min-height: 0;
    max-height: none;
    height: 100%;
    min-width: 0;
    max-width: none;
    width: 100%;
    border: 0;
    padding: 0;
    margin: 0;
    inset: auto;

    background-color: var(--darkest-color);
    border-radius: .5rem;
    border: 2px solid var(--light-color);
    padding: 1rem;

    @media screen and (max-width: calc(48rem - 1px)) {
      grid-column: 2 / 3;
      grid-row: 3 / 4;

      .container:has(.menu-button[aria-expanded="true"]) & {
        display: none;
      }
    }

    @media screen and (min-width: 48rem) {
      grid-column: 3 / 4;
      grid-row: 2 / 3;
    }

    @media screen and (min-width: 86rem) {
      grid-column: 6 / 7;
    }
  }

  .dialog__heading {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.75rem;
  }

  .nav__list {
    display: grid;
    row-gap: 1rem;

    @media screen and (max-width: calc(48rem - 1px)) {
      max-height: calc(100% - 5px);
      margin: 5px;

      .container:has(.menu-button:not([aria-expanded="true"])) & {
        display: none;
      }
    }

    @media screen and (min-width: 48rem) {
      margin: 5px;
    }
  }
  
  ${Object.entries(mappedAbstractAriaRolesToBackgroundColors)
    .map(([abstractRole], index, { length }) => {
      return `
        .dialog--is-abstract-role-${abstractRole},
        .nav__list-item--${abstractRole} {
          --base-color: ${(index / length) * 360}deg;
          --lightest-color: hsl(var(--base-color), 60%, 93.5%);
          --lighter-color: hsl(var(--base-color), 60%, 87.5%);
          --light-color: hsl(var(--base-color), 60%, 82%);
          --medium-color: hsla(var(--base-color), 60%, 50%, 0.25);
          --dark-color: hsl(var(--base-color), 60%, 18%);
          --darker-color: hsl(var(--base-color), 60%, 13.5%);
          --darkest-color: hsl(var(--base-color), 60%, 7.5%);
        }
      `;
    })
    .join("")}

  .nav__list-item {
    display: block;
    color: white;
    background-color: var(--dark-color);
    border: 2px solid var(--light-color);
    border-radius: .5rem;

    &:has(.nav__list-item__summary:hover):has(.nav__list-item__details:not([open])) {
      background: var(--light-color);
      border-color: var(--darkest-color);

      & .nav__list-item__summary {
        color: black;
      }
    }
  }

  .nav__list-item__summary {
    padding: 1rem;
    border-radius: .5rem;
  }

  .nav__list-item__sublist {
    display: grid;
    row-gap: .75rem;
    padding: 0 .75rem .75rem;
  }

  .nav__list-item__sublist-item__link {
    display: block;
    color: var(--lightest-color);
    padding: .75rem;
    background-color: var(--darkest-color);
    border: 2px solid var(--light-color);
    border-radius: .5rem;
    word-break: break-word;

    &:hover {
      color: var(--darkest-color);
      background-color: var(--lightest-color);
      border-color: var(--lightest-color);
    }
  }
`;
