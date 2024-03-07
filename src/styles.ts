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

  dfn {
    display: block;
  }

  @supports (grid-template-columns: subgrid) {
    @media screen {
        body {
          margin: 0;
          background: var(--page-background-color);
        }

        body:has(.aria-role__dialog:target) {
          overflow: hidden;
        
          @media screen and (min-width: 1170px) {
            overflow: auto;
          }
        }

        .container {
          display: grid;
          padding: 0 1rem;
          gap: 1rem;
          grid-template-columns: repeat(auto-fill, minmax(.25rem, 0fr));
          place-content: center;
        }

        main {
          display: grid;
          grid-template-columns: subgrid;
          place-content: space-between;
          grid-column: 1 / -1;
          padding-bottom: 1rem;
        }

        @media screen and (min-width: 1170px) {
          .container {
            place-content: stretch;
            max-width: 113rem;
            margin: 0 auto;
            padding: 0 3rem;
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
          z-index: 1;
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
          grid-column: 1 / -1;
          --hsl-color: hsl(var(--color), 60%, 87.5%);
          --hsl-alt-color: hsl(var(--color), 60%, 22.5%);
          --hsl-dark-color: hsl(var(--color), 60%, 18.5%);
          --hsl-light-color: hsl(var(--color), 60%, 80%);
          background-color: var(--hsl-dark-color);
          border: 2px solid var(--hsl-color);
          color: white;

          @media screen and (min-width: 600px) {
            grid-column: span 5;
          }
          
          &.aria-role--only-presentational-children,
          &.aria-role--only-phrasing-descendants {
            background-image: repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              var(--hsl-alt-color) 10px,
              var(--hsl-alt-color) 20px
            );
          }

          &:hover {
            background-color: var(--hsl-color);
            color: black;

            &.aria-role--only-presentational-children,
            &.aria-role--only-phrasing-descendants {
              background-image: repeating-linear-gradient(
                45deg,
                var(--hsl-color),
                var(--hsl-color) 10px,
                var(--hsl-light-color) 10px,
                var(--hsl-light-color) 20px
              );
            }
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
          grid-template-columns: subgrid;
          grid-row: 1 / -1;
          overflow: auto;
          will-change: transform;
          z-index: 2;
          --hsl-color: hsl(var(--color), 60%, 87.5%);
          --hsl-alt-color: hsl(var(--color), 60%, 22.5%);
          --hsl-dark-color: hsl(var(--color), 60%, 18.5%);
          --hsl-light-color: hsl(var(--color), 60%, 80%);

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
          background-color: var(--hsl-color);

          .aria-role__dialog--only-presentational-children &,
          .aria-role__dialog--only-phrasing-descendants & {
            background-image: repeating-linear-gradient(
              45deg,
              var(--hsl-color),
              var(--hsl-color) 10px,
              var(--hsl-light-color) 10px,
              var(--hsl-light-color) 20px
            );
          }
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
            top: 0;
            margin-top: -100dvh;
            max-height: 100vh;
            height: 100%;
            width: 100%;
          }

          .aria-role__dialog-content {
            overflow: auto;
            overflow-x: hidden;
            grid-column: 1 / -1;
            height: 100%;
            border-left: 2px solid var(--alt-color);
            border-right: 2px solid var(--alt-color);
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
          padding: 1rem;
        }

        .aria-role__dialog .aria-role__row-header {
          padding: .5rem 1rem;
          background: hsl(var(--color), 60%, 22.5%);
          color: white;
        }

        .periodic-table__abstract-area__heading {
          color: white;
          height: 100%;
          display: flex;
          place-items: center;
          margin: 0;
          font-size: 1.333rem;
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
          justify-self: flex-end;
          display: flex;
          place-content: center;
          place-items: center;
          font-weight: bold;
          width: 3rem;
          height: 3rem;
          aspect-ratio: 1;
          font-family: Helvetica, Arial, sans-serif;
          font-size: 1.5rem;
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
          border-radius: 1rem;
          padding: 2rem 0;
        }

        .periodic-table__role-area {
          grid-column: 2 / -2;
        }
      }
  }

  @supports not (grid-template-columns: subgrid) {
    @media screen {
      .container:has(.aria-role__dialog:target) main {
        display: none !important;
      }
    }
  }

  @media print {
    .container:has(.aria-role__dialog:target) main {
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
