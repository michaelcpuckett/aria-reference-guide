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
  }

  :root {
    font-family: system-ui, sans-serif;
    font-size: 16px;

    @media screen {
      --background-color: #252525;
      color-scheme: dark;
    }

    @media print {
      --background-color: Canvas;
      color-scheme: light;
    }
  }

  body {
    @media screen {
      margin: 0;
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
    @media screen and (max-width: 767px) {
      display: grid;
      grid-template-columns: 1rem 1fr 1rem;
      grid-template-rows: auto calc(3rem + 8px) 1rem 1fr;
      height: 100%;
  
      &:has(.nav__details[open]) {
        & nav {
          grid-row: 2 / 5;
          z-index: 1;
        }
  
        & dialog {
          height: 0;
          overflow: hidden;
        }
      }
    }
  
    @media screen and (min-width: 768px) {
      display: grid;
      grid-template-columns: 1rem 15rem 0 1fr 1rem;
      grid-template-rows: auto 1fr 0;
      column-gap: 1rem;
      row-gap: 1rem;
      position: relative;
      height: 100%;
      contain: content;
    }
  
    @media screen and (min-width: 1138px) {
      column-gap: 0;
      grid-template-columns: 1fr 1rem 1rem 15rem 2rem 49.4rem 1rem 1rem 1fr;
    }
  }

  header {
    @media screen {
      grid-column: 1 / -1;
      grid-row: 1 / 2;
      position: sticky;
      top: 0;
      z-index: 1;
    }
  }

  h1 {
    @media screen {
      margin: 0;
      padding: 1rem;
      background-color: var(--background-color);
      font-size: 1rem;
      line-height: 1;
      font-weight: normal;
      letter-spacing: 0.1rem;
      text-transform: uppercase;
      text-align: center;
    }
  }

  nav {
    @media screen and (max-width: 767px) {
      grid-template-columns: subgrid;
      grid-column: 1 / -1;
      overflow: auto;
      position: sticky;
      top: 3rem;
      background-color: black;
    }

    @media screen and (min-width: 768px) {
      position: sticky;
      top: 4rem;
      height: calc(100vh - 5rem);
      grid-column: 2 / 3;
      grid-row: 2 / 3;
      overflow: auto;
      padding-top: 2px;
    }

    @media screen and (min-width: 1138px) {
      grid-column: 4 / 5;
    }
  }

  .nav__details {
    display: flex;
    width: calc(100% - 8px);
    margin: auto;
    grid-column: 2 / 3;

    @media screen and (min-width: 768px) {
      display: contents;
    }
  }

  .nav__summary {
    border-radius: .5rem;
    display: flex;
    place-items: center;
    height: 3rem;
    line-height: 1;
    padding: 0 1rem;
    margin-top: 4px;
    background-color: white;
    color: black;

    @media screen and (min-width: 768px) {
      display: none;
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

    @media screen and (max-width: 767px) {
      grid-column: 2 / 3;
      grid-row: 4 / 5;
    }

    @media screen and (min-width: 768px) {
      grid-column: 4 / 5;
      grid-row: 2 / 3;
    }

    @media screen and (min-width: 1138px) {
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

    @media screen and (max-width: 767px) {
      margin: 1rem 0;
    }
  }
  
  ${Object.entries(mappedAbstractAriaRolesToBackgroundColors)
    .map(([abstractRole], index, { length }) => {
      return `
        .dialog--is-abstract-role-${abstractRole},
        .nav__list-item--${abstractRole} {
          --base-color: ${(index / length) * 360}deg;
          --lightest-color: hsla(var(--base-color), 60%, 93.5%, .875);
          --lighter-color: hsl(var(--base-color), 60%, 87.5%);
          --light-color: hsl(var(--base-color), 60%, 82%);
          --medium-color: hsla(var(--base-color), 60%, 50%, 0.25);
          --dark-color: hsl(var(--base-color), 60%, 18%);
          --darker-color: hsl(var(--base-color), 60%, 13.5%);
          --darkest-color: hsla(var(--base-color), 60%, 7.5%, .875);
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
    margin: 0 2px;

    &:has(.nav__list-item__summary:hover):has(.nav__list-item__details:not([open])) {
      background: var(--light-color);
      border-color: transparent;

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
