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

  dialog a:focus-visible {
    outline-offset: 4px;
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
    font-size: 1.25rem;
    font-weight: normal;

    @media screen {
      border-bottom: 1px solid var(--light-color);
    }
  }

  table a {
    @media screen {
      color: var(--light-color);
    }
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

  :root {
    font-family: system-ui, sans-serif;

    @media screen {
      --header-background-color: #252525;
      --page-background-color: black;
      color-scheme: dark;
      min-height: 100%;
      font-size: 18px;
      line-height: 1;
    }

    @media print {
      color-scheme: light;
    }
  }

  body {
    @media screen {
      margin: 0;
      background-color: var(--page-background-color);
      min-height: 100%;
    }

    @media screen and (max-width: calc(48rem - 1px)) {
      display: grid;
      row-gap: 1rem;
      grid-template-columns: 1rem 1fr 1rem;
    }

    @media screen and (min-width: 48rem) {
      display: grid;
      grid-template-columns: 1rem 15rem 1fr 1rem;
      grid-template-rows: 100vh 1fr;
      column-gap: 1rem;
    }

    @media screen and (min-width: 72rem) {
      column-gap: 0;
      grid-template-columns: 1fr 1rem 1rem 15rem 1rem 43rem 1rem 1rem 1fr;
    }
  }

  .container {
    @media screen and (max-width: calc(48rem - 1px)) {
      display: grid;
      grid-template-columns: subgrid;
      grid-column: 1 / -1;
      row-gap: 1rem;
      grid-auto-flow: column;

      body:has(.menu-button[aria-expanded="true"]) & {
        grid-template-rows: auto auto 1fr 0;
      }
    }

    @media screen and (min-width: 48rem) {
      display: grid;
      grid-column: 1 / -1;
      grid-row: 1 / 2;
      grid-template-columns: subgrid;
      grid-template-rows: auto 1fr 0;
      height: 100%;
      row-gap: 1rem;
      position: sticky;
      top: 0;
      z-index: 1;
    }
  }

  header {
    @media screen {
      grid-column: 1 / -1;
      grid-row: 1 / 2;
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
    border: 1px solid white;
    border-radius: .5rem;
    padding: 1rem;

    @media screen and (max-width: calc(48rem - 1px)) {
      grid-column: 2 / 3;
    }

    @media screen and (min-width: 48rem) {
      grid-column: 2 / 3;
      grid-row: 2 / 3;
    }

    @media print {
      display: none;
    }

    &:hover {
      background-color: var(--header-background-color);
      color: white;
    }

    & span {
      display: block;
      width: 5ch;
    }

    &[aria-expanded="true"] {
      background-color: white;
      color: black;

      &:hover {
        background-color: var(--header-background-color);
        color: white;
      }
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
    width: 1.25rem;
  }

  [data-icon="close"] {
    width: 1.25rem;
    transform: scale(1.75);
  }

  h1 {
    @media screen {
      margin: 0;
      font-size: 1rem;
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
      max-height: calc(100% - 1rem);

      body:has(.menu-button[aria-expanded="false"]) & {
        display: none;
      }
    }

    @media screen and (min-width: 48rem) {
      height: calc(100% + 5px);
      grid-column: 2 / 3;
      grid-row: 2 / 3;
      overflow: hidden;
      margin: -5px;
      width: calc(100% + 10px);
      position: relative;

      &:after {
        content: "";
        background-image: linear-gradient(0deg, black 0%, transparent 1rem);
        z-index: 1;
        position: absolute;
        inset: 0;
        pointer-events: none;
      }
    }

    @media screen and (min-width: 72rem) {
      grid-column: 4 / 5;
    }

    @media print {
      body:not(:has(#about)) & {
        display: none;
      }
    }
  }

  .nav__inner-container {
    @media screen and (min-width: 48rem) {
      width: calc(100% + var(--scrollbar-width, 1rem));
      overflow-y: scroll;
      height: calc(100% + 5px);
    }
  }

  main {
    @media screen and (max-width: calc(48rem - 1px)) {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: subgrid;
      grid-template-rows: 1fr 0;
      row-gap: 1rem;

      body:has(.menu-button[aria-expanded="true"]) & {
        display: none;
      }
    }

    @media screen and (min-width: 48rem) {
      grid-column: 1 / -1;
      grid-row: 1 / -1;
      display: grid;
      grid-template-columns: subgrid;
      grid-template-rows: auto 1fr 0;
      row-gap: 1rem;
    }

    @media screen and (min-width: 72rem) {
      grid-column: 6 / 7;
    }

    & header {
      @media screen and (max-width: calc(48rem - 1px)) {
        display: none;
      }

      @media screen and (min-width: 48rem) {
        visibility: hidden;
      }

      @media print {
        display: none;
      }
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

    @media screen {
      line-height: 1.5;
      background-color: var(--darkest-color);
      border-radius: .5rem;
      border: 1px solid var(--light-color);
    }

    @media screen and (max-width: calc(48rem - 1px)) {
      padding: 1rem;
      grid-column: 2 / 3;
    }

    @media screen and (min-width: 48rem) {
      grid-column: 3 / 4;
      grid-row: 2 / 3;
      padding: 2rem;
    }

    @media screen and (min-width: 72rem) {
      grid-column: 6 / 7;
    }

    @media print {
      &:is(#about) {
        display: none;
      }
    }
  }

  .dialog__heading {
    @media screen {
      margin-top: 0;
      margin-bottom: 1rem;
      font-size: 1.75rem;
    }
  }

  .nav__list {
    @media screen {
      display: grid;
      row-gap: 1rem;
    }

    @media screen and (max-width: calc(48rem - 1px)) {
      max-height: calc(100% - 5px);
      margin: 5px 5px 0 5px;

      body:has(.menu-button:not([aria-expanded="true"])) & {
        display: none;
      }
    }

    @media screen and (min-width: 48rem) {
      margin: 5px;
      padding-bottom: 1rem;
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
    @media screen {
      display: block;
      color: white;
      background-color: var(--dark-color);
      border: 1px solid var(--light-color);
      border-radius: .5rem;

      &:has(.nav__list-item__summary:hover):has(.nav__list-item__details:not([open])) {
        background: var(--light-color);
        border-color: var(--darkest-color);

        & .nav__list-item__summary {
          color: black;
        }
      }
    }
  }

  .nav__list-item__summary {
    @media screen {
      padding: 1rem;
      border-radius: .5rem;
    }
  }

  .nav__list-item__sublist {
    @media screen {
      display: grid;
      row-gap: .75rem;
      padding: 0 .75rem .75rem;
    }
  }

  .nav__list-item__sublist-item__link {
    @media screen {
      display: block;
      color: var(--lightest-color);
      padding: .75rem;
      background-color: var(--darkest-color);
      border: 1px solid var(--light-color);
      border-radius: .5rem;
      word-break: break-word;

      &:hover {
        color: var(--darkest-color);
        background-color: var(--lightest-color);
        border-color: var(--lightest-color);
      }
    }
  }
`;
