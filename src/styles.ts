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
    font-size: 18px;
    --page-background-color: #252525;

    @media print {
      color-scheme: light;
    }
  }

  dialog:target {
    display: grid;
  }

  @supports (grid-template-columns: subgrid) {
    @media screen {
        body {
          margin: 0;
          background: var(--page-background-color);
        }

        .container {
          display: grid;
          padding: 0 3rem;
          gap: 1rem;
          grid-template-columns: repeat(auto-fill, minmax(.25rem, 0fr));
          place-content: center;
        }

        main {
          display: grid;
          grid-template-columns: subgrid;
          place-content: space-between;
          grid-column: 1 / -1;
        }

        @media screen and (min-width: 1170px) {
          .container {
            place-content: stretch;
            max-width: 1840px;
            margin: 0 auto;
          }

          .container:has(.aria-role__dialog:target) {
            grid-template-columns: repeat(auto-fill, minmax(.25rem, 0fr)) minmax(33.333%, 1fr);
          }

          .container:has(.aria-role__dialog:target) main {
            grid-column: 1 / -2;
          }

          :is(.aria-role__dialog:target) {
            grid-column: -2 / -1;
          }
        }

        .periodic-table__root {
          display: grid;
          list-style: none;
          grid-template-columns: subgrid;
          grid-column: 1 / -1;
        }

        .periodic-table__type-area__heading {
          color: white;
          grid-column: 1 / -1;
          margin: 0;
          padding: 1rem 0 0;
          font-size: 1.5rem;
          font-weight: normal;
          text-align: center;
        }

        .periodic-table__subgrid {
          grid-column: 1 / -1;
          row-gap: 1rem;
          display: grid;
          grid-template-columns: subgrid;
        }

        .page-title {
          text-align: center;
          font-size: 1.667rem;
          margin: 0;
          color: white;
          letter-spacing: 0.1rem;
          text-transform: uppercase;
          margin-bottom: 0;
          grid-column: 1 / -1;
          word-break: break-word;
          
          padding: 2rem 0 1rem;
          position: sticky;
          top: -.51px;
          background-color: var(--page-background-color);
          border-bottom: 1px solid;
        }

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
          min-height: 5rem;
          border-radius: .5rem;
          grid-column: span 5;
          --hsl-color: hsl(var(--color), 60%, 87.5%);
          --hsl-alt-color: hsl(var(--color), 60%, 22.5%);
          background-color: var(--hsl-alt-color);
          border: 2px solid var(--hsl-color);
          color: white;

          &:hover {
            background-color: var(--hsl-color);
            color: black;
          }
        }

        ${Object.entries(mappedAbstractAriaRolesToBackgroundColors)
          .map(([role], index, { length }) => {
            return `
              .periodic-table__abstract-area--${role} {
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
          padding: 1rem;
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
          padding: .5rem;

          &:focus-visible {
            outline: 4px solid var(--hsl-color);
            outline-offset: 4px;
          }
        }

        .aria-role__row {
          display: grid;
        }

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
          grid-template-columns: subgrid;
          grid-row: 1 / -1;

          &:focus-visible { 
            outline: 0;
          }
        }

        .aria-role__dialog-content {
          display: grid;
          align-content: flex-start;
          position: relative;
          padding: 1rem;
          background: white;
          color: black;
          color-scheme: light;
        }

        .aria-role__dialog-content {
          /*background-color: hsl(0deg, 0%, 87.5%);*/
          background-color: hsl(var(--color), 60%, 87.5%);
        }

        .aria-role__dialog-content > [tabindex="-1"]:focus-visible {
          outline: 0;
        }

        .aria-role__dialog-content:has(> [tabindex="-1"]:focus-visible) {
          outline: 2px solid white;
          outline-offset: 2px;
        }

        @media screen and (min-width: 1170px) {
          .aria-role__dialog {
            margin-left: 2rem;
            position: sticky;
            top: 1rem;
            margin-top: calc(-100dvh + 2em);
            max-height: calc(100dvh - 2em);
            height: 100%;
            width: 100%;
          }

          .aria-role__dialog-content {
            overflow: auto;
            grid-column: 1 / -1;
            height: 100%;
            border-radius: 1rem;
            border: 2px solid hsl(var(--color), 60%, 22.5%);
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
          margin-top: 1rem;
        }

        .aria-role__dfn {
          margin: 0;
          padding: 0;
          text-align: center;
          display: block;
        }

        .aria-role__cell {
          background-color: hsl(var(--color), 60%, 97.5%);

          & p {
            margin: 0;
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

        .aria-role__dialog .aria-role__table {
          border-collapse: collapse;
          border: 1px solid hsl(var(--color), 60%, 22.5%);
        }

        .aria-role__dialog :is(.aria-role__cell, .aria-role__row-header) {
          text-align: left;
        }

        .aria-role__dialog .aria-role__cell {
          padding: 1rem .5rem;
        }

        .aria-role__dialog .aria-role__row-header {
          padding: .5rem;
          background: hsl(var(--color), 60%, 22.5%);
          color: white;
        }

        .periodic-table__abstract-area__heading {
          color: white;
          height: 100%;
          display: flex;
          place-items: center;
          margin: 0;
          grid-column: 2 / -2;
          font-style: italic;
          font-weight: normal;
        }

        .periodic-table__abstract-area__description {
          grid-column: 2 / -2;
          margin-top: 0;
          margin-bottom: .5rem;
          color: white;
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
          font-size: 1.75rem;
        }

        close-dialog-button {
          display: contents;
        }

        close-dialog-button a {
          flex: 0 0 auto;
          background: none;
          border: 2px solid;
          font: inherit;
          color: hsl(var(--color), 60%, 22.5%);
          border-radius: 50%;
          align-self: center;
          justify-self: flex-end;
          font-weight: bold;
          line-height: 1;
          padding: .5rem .667rem .667rem;
          text-decoration: none;
          background-color: hsl(var(--color), 60%, 97.5%);

          &:focus-visible {
            outline-offset: 2px;
            outline: 2px solid black;
          }
        }

        .periodic-table__abstract-area {
          border: 1px solid hsl(var(--color), 60%, 50%);
          background-color: hsla(var(--color), 60%, 50%, .06125);
          border-radius: 8px;
          padding: 2rem 0;
        }

        .periodic-table__role-area {
          grid-column: 2 / -2;
        }
      }
  }

  @supports not (grid-template-columns: subgrid) {
    @media screen {
      .container:has(.aria-role__dialog:target) main,
      body:has(.aria-role__dialog:target) footer {
        display: none !important;
      }
    }
  }

  @media print {
    .container:has(.aria-role__dialog:target) main,
    body:has(.aria-role__dialog:target) footer {
      display: none !important;
    }

    close-dialog-button {
      display: none !important;
    }

    .aria-role__dialog:target {
      display: contents;
    }

    .aria-role__row-header {
      font-weight: bold;
    }
  }
`;
