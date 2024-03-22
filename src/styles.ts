import { abstractAriaRolesByType } from "../data";

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

    @media (prefers-color-scheme: light) {
      outline: 4px dashed black;
    }
  }

  dialog a:focus-visible {
    outline-offset: 4px;
  }

  ul {
    @media screen {
      &.list {
        margin-top: .5rem;
        margin-bottom: .5rem;
      }

      &:where(:not(.list)) {
        list-style: none;
        padding: 0;
        margin: 0;
      }
    }
  }

  :where(a:any-link) {
    color: rgb(158, 158, 255);

    @media screen and (prefers-color-scheme: light) {
      color: blue;
    }
  }

  :where(a:visited) {
    color: rgb(288, 173, 240);

    @media screen and (prefers-color-scheme: light) {
      color: purple;
    }
  }

  :where(a:active) {
    color: rgb(255, 158, 158);

    @media screen and (prefers-color-scheme: light) {
      color: red;
    }
  }

  a {
    text-underline-offset: 4px;
    
    &:hover {
      text-decoration: none;
    }

    &:has(svg) {
      display: inline-flex;
      align-items: center;
      gap: .25rem;
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
    font-size: .9rem;
    letter-spacing: .1rem;
    text-transform: uppercase;
    font-weight: normal;

    @media screen {
      border-bottom: 1px solid var(--light-color);

      @media screen and (prefers-color-scheme: light) {
        border-color: var(--dark-color);
      }
    }
  }

  table a {
    @media screen {
      color: var(--light-color);

      @media screen and (prefers-color-scheme: light) {
        color: var(--dark-color);
      }
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
    @media screen {
      min-height: 100%;
      font: 18px system-ui, sans-serif;
      font: -apple-system-body;
      --header-background-color: #252525;
      --page-background-color: black;
      color-scheme: dark;
    }

    @media (max-width: 320px) {
      font-size: 16px;
      -webkit-hyphens: auto;
      hyphens: auto;
    }

    @media screen and (prefers-color-scheme: light) {
      --header-background-color: white;
      --page-background-color: white;
      color-scheme: light;
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
      overflow-y: scroll;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
      -webkit-text-size-adjust: 100%;
      -webkit-tap-highlight-color: transparent;
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
      grid-template-rows: 100dvh 1fr;
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
      pointer-events: none;
    }
  }

  .header {
    @media screen {
      grid-column: 1 / -1;
      grid-row: 1 / 2;
      display: flex;
      background-color: var(--header-background-color);
      place-content: center;
      padding: 1rem;
      pointer-events: auto;
      border-bottom: 2px solid transparent;

      @media (forced-colors: active) {
        border-bottom-color: currentColor;
      }

      @media (prefers-color-scheme: light) {
        border-bottom-color: currentColor;
      }
    }
  }

  menu-button,
  close-button,
  role-dialog {
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
    background-color: black;
    color: white;
    padding: .125rem .5rem;
    margin: 0;
    border: 0;
    height: 100%;
    border: 2px solid;
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
      background-color: #f5f5f5;
      color: black;
    }

    & span {
      display: block;
      width: 5ch;
    }

    &[aria-expanded="true"] {
      background-color: white;
      color: black;

      &:hover {
        background-color: #252525;
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

  .page-heading {
    @media screen {
      margin: 0;
      font-size: .9rem;
      letter-spacing: .1rem;
      text-transform: uppercase;
      text-align: center;
      line-height: 1.5;
    }
  }

  nav {
    @media screen {
      font-size: .9rem;
    }

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
      pointer-events: auto;

      &:after {
        content: "";
        background-image: linear-gradient(0deg, var(--page-background-color) 0%, transparent 1rem);
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

    & .header {
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
  }

  .dialog {
    @media screen {
      line-height: 1.5;
      border-radius: .5rem;
      background-color: var(--darkest-color);
      border: 2px solid var(--light-color);

      @media screen and (prefers-color-scheme: light) {
        background: var(--lightest-color);
        border-color: var(--dark-color);
      }
    }

    @media screen and (max-width: calc(48rem - 1px)) {
      padding: 1rem;
      grid-column: 2 / 3;
    }

    @media screen and (min-width: 48rem) {
      grid-column: 3 / 4;
      grid-row: 2 / 3;
      padding: 1rem;
    }

    @media screen and (min-width: 72rem) {
      grid-column: 6 / 7;
      padding: 2rem;
    }
  }

  #about {
    @media screen {
      --light-color: currentColor;
    }

    @media print {
      display: none;
    }
  }

  .dialog__header {
    display: flex;
    margin-bottom: 1rem;

    &:has(.dialog__close-button) {
      flex-direction: row-reverse;
      gap: 1rem;

      @media screen and (max-width: 320px) {
        flex-wrap: wrap;
      }
    }
  }

  .dialog__header__info {
    @media screen {
      flex: 1;
      display: grid;
      place-items: flex-start;
      column-gap: .5rem;
      row-gap: 1rem;
      margin-bottom: .5rem;
    }
  }

  .dialog__tags {
    @media screen {
      display: flex;
      gap: .5rem;
      flex-wrap: wrap;
      margin: 0;
    }
  }

  .dialog__tag {
    @media screen {
      background-color: var(--light-color);
      color: var(--dark-color);
      padding: .25rem .5rem;
      border-radius: .5rem;
      font-weight: bold;
      font-size: .8rem;
      white-space: nowrap;
      border: 2px solid transparent;

      @media screen and (prefers-color-scheme: light) {
        background-color: var(--dark-color);
        color: var(--lightest-color);
      }

      &:hover {
        background-color: var(--darkest-color);
        border-color: var(--light-color);
        color: var(--light-color);

        @media screen and (prefers-color-scheme: light) {
          background-color: var(--lightest-color);
          border-color: var(--dark-color);
          color: var(--dark-color);
        }
      }
    }
  }

  .dialog__heading {
    @media screen {
      margin: 0;
      font-weight: normal;
      font-size: 2.25rem;
      line-height: 1.25;

      @media screen and (max-width: 320px) {
        font-size: 1.75rem;
      }
    }
  }

  .dialog__close-button {
    margin: 0;
    padding: 0;
    border: 2px solid var(--light-color);
    cursor: pointer;
    font: inherit;
    line-height: 1.75;
    height: 1.75rem;
    width: 1.75rem;
    border-radius: 50%;
    display: flex;
    place-items: center;
    place-content: center;
    place-self: flex-start;
    aspect-ratio: 1;
    color: var(--dark-color);
    background-color: var(--light-color);

    @media screen and (prefers-color-scheme: light) {
      color: var(--light-color);
      background-color: var(--dark-color);
      border-color: var(--dark-color);
    }

    &:hover {
      color: var(--light-color);
      background: none;

      @media screen and (prefers-color-scheme: light) {
        color: var(--dark-color);
      }
    }

    & svg {
      stroke: currentColor;
      stroke-width: 2px;
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

  .dialog,
  .nav__list-item {
    --base-saturation: 100%;
    --lightest-color-lightness: 93.5%;
    --light-color-lightness: 85%;
    --dark-color-lightness: 15%;
    --darkest-color-lightness: 7.5%;
    --lightest-color: hsl(var(--base-hue), var(--base-saturation), var(--lightest-color-lightness));
    --light-color: hsl(var(--base-hue), var(--base-saturation), var(--light-color-lightness));
    --dark-color: hsl(var(--base-hue), var(--base-saturation), var(--dark-color-lightness));
    --darkest-color: hsl(var(--base-hue), var(--base-saturation), var(--darkest-color-lightness));
  }
  
  ${Object.values(abstractAriaRolesByType)
    .flat()
    .reverse()
    .map((abstractRole, index, { length }) => {
      return `
        .dialog--is-abstract-role-${abstractRole},
        .nav__list-item--${abstractRole} {
          --base-hue: ${(index / length) * 360}deg;
        }
      `;
    })
    .join("")}

  .nav__list-item {
    @media screen {
      display: block;
      color: white;
      background-color: var(--dark-color);
      border: 2px solid var(--light-color);
      border-radius: .5rem;

      @media (prefers-color-scheme: light) {
        color: black;
        background-color: var(--light-color);
        border-color: var(--dark-color);
      }

        &:has(.nav__list-item__summary:hover):has(.nav__list-item__details:not([open])) {
          background: var(--light-color);
          border-color: var(--darkest-color);

          @media (prefers-color-scheme: light) {
            background-color: var(--dark-color);
            border-color: var(--darkest-color);
          }

          & .nav__list-item__summary {
            color: black;

            @media (prefers-color-scheme: light) {
              color: white;
            }
          }
      }
    }
  }

  .nav__list-item__summary {
    @media screen {
      padding: 1rem;
      border-radius: .5rem;
      font-weight: bold;
    }
  }

  .nav__list-item__definition {
    @media screen {
      padding: 0 1rem 1rem;
      font-size: .85rem;
      margin: 0;
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
      font-weight: bold;
      background-color: var(--darkest-color);
      border: 2px solid var(--light-color);
      border-radius: .5rem;
      word-break: break-word;
      
      @media (prefers-color-scheme: light) {
        color: var(--darkest-color);
        background-color: var(--lightest-color);
        border-color: var(--dark-color);
      }

      &:hover {
        color: var(--darkest-color);
        background-color: var(--lightest-color);
        border-color: var(--light-color);

        @media (prefers-color-scheme: light) {
          color: var(--lightest-color);
          background-color: var(--dark-color);
          border-color: var(--darkest-color);
        }
      }
    }
  }
`;
