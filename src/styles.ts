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

  @supports (grid-template-columns: subgrid) {
    @media screen {
        body {
          margin: 0;
          background: var(--page-background-color);
        }

        body:has(.dialog--aria-role:target) {
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
          background-color: #1a1a1a;
        }

        main {
          display: grid;
          grid-template-columns: subgrid;
          place-content: space-between;
          grid-column: 1 / -1;
          padding-bottom: 1rem;
        }

        .dialog--aria-role:target {
          display: grid;
          grid-column: 1 / -1;
        }
        
        @media screen and (max-width: 1169px) {
          body {
            display: grid;
            grid-column: 1 / -1;
            grid-row: 1 / 2;
            position: static;
            height: auto;
            margin: auto;
            grid-template-columns: subgrid;
          }
        }

        @media screen and (min-width: 1170px) {
          .container {
            place-content: stretch;
            max-width: 113rem;
            margin: 0 auto;
            padding: 0 3rem;
            grid-template-columns: repeat(auto-fill, minmax(.25rem, 0fr));
          }

          body:has(.dialog:target) {
            & .container {
              grid-template-columns: repeat(auto-fill, minmax(.25rem, 0fr)) 26rem;
            }

            & main {
              grid-column: 1 / -2;
            }

            & .dialog:target {
              display: grid;
              grid-column: -2 / -1;
            }
          }
        }

        .periodic-table__root {
          display: grid;
          list-style: none;
          grid-template-columns: subgrid;
          grid-column: 1 / -1;
          row-gap: 1rem;
          padding: 1rem 0;
        }

        .periodic-table__subgrid {
          grid-column: 1 / -1;
          row-gap: 1rem;
          display: grid;
          grid-template-columns: subgrid;
        }

        .page-header {
          margin: 0 auto;
          max-width: 113rem;
          width: 100%;
          grid-column: 1 / -1;
          padding: 1rem 3rem;
          position: sticky;
          top: -.51px;
          background-color: var(--page-background-color);
          border-bottom: 1px solid hsl(0, 0%, 10%);
          z-index: 1;
        }

        .periodic-table__heading {
          word-break: break-word;
          font-size: 1rem;
          font-weight: normal;
          line-height: 1;
          color: white;
          letter-spacing: 0.1rem;
          text-transform: uppercase;
          margin: 0;

          @media screen and (min-width: 600px) {
            text-align: center;
          }
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

              .dialog--abstract-role-${role} {
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

        .dialog {
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
          background: white;
          --hsl-color: hsl(var(--color), 60%, 87.5%);
          --hsl-alt-color: hsl(var(--color), 60%, 22.5%);
          --hsl-dark-color: hsl(var(--color), 60%, 18.5%);
          --hsl-light-color: hsl(var(--color), 60%, 80%);

          &:focus-visible { 
            outline: 0;
          }
        }

        .dialog__content {
          display: grid;
          align-content: flex-start;
          position: relative;
          padding: 1rem;
          background: white;
          color: black;
          color-scheme: light;
          grid-column: 1 / -1;
        }

        .dialog__content--aria-role {
          background-color: var(--hsl-color);

          .dialog--only-presentational-children &,
          .dialog--only-phrasing-descendants & {
            background-image: repeating-linear-gradient(
              45deg,
              var(--hsl-color),
              var(--hsl-color) 10px,
              var(--hsl-light-color) 10px,
              var(--hsl-light-color) 20px
            );
          }
        }

        .dialog__content > [tabindex="-1"]:focus-visible {
          outline: 0;
        }

        .dialog__content:has(> [tabindex="-1"]:focus-visible) {
          outline: 2px solid white;
          outline-offset: 2px;
        }

        @media screen and (min-width: 1170px) {
          .dialog {
            margin-left: 2rem;
            position: sticky;
            top: calc(3rem + 2px);
            margin-top: calc(-100dvh + 3rem);
            max-height: calc(100vh - 3rem);
            height: 100%;
            width: 100%;
          }

          .dialog__content {
            padding-left: 1rem;
            padding-right: 1rem;
          }

          .dialog__content {
            overflow: auto;
            overflow-x: hidden;
            grid-column: 1 / -1;
            height: 100%;
            border-left: 2px solid var(--alt-color);
            border-right: 2px solid var(--alt-color);
          }
        }

        .aria-role__table {
          margin: 0;
          list-style: none;
          display: grid;
          place-content: center;
          place-items: stretch;
          grid-auto-columns: 100%;
          margin-top: 1rem;
          border-radius: 8px;
          overflow: hidden;
        }

        .aria-role__dfn {
          margin: 0;
          padding: 0;
          text-align: center;
          display: block;
        }

        .aria-role__cell {
          background-color: hsl(var(--color), 60%, 97.5%);

          & dfn + [role="definition"] {
            display: block;
            margin-top: 1rem;
          }

          & p {
            margin: 0;

            + p {
              margin-top: 1rem;
            }
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

        .aria-role__table {
          border-collapse: collapse;
          border: 1px solid hsl(var(--color), 60%, 22.5%);
        }

        :is(.aria-role__cell, .aria-role__row-header) {
          text-align: left;
        }

        .aria-role__cell {
          padding: 1rem;
        }

        .aria-role__row-header {
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
          font-size: 1.5rem;
          grid-column: 2 / -2;
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

        .dialog__heading {
          margin: 0;
          align-self: center;
          width: 100%;
          word-break: break-word;
          font-size: 1.5rem;
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
          width: 2rem;
          height: 2rem;
          aspect-ratio: 1;
          font-family: Helvetica, Arial, sans-serif;
          font-size: 1rem;
          text-decoration: none;
          background-color: hsl(var(--color), 60%, 97.5%);

          &:focus-visible {
            outline-offset: 2px;
            outline: 2px solid black;
          }
        }

        .periodic-table__abstract-area {
          border: 2px solid hsl(var(--color), 60%, 50%);
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
      .container:has(.dialog--aria-role:target) main {
        display: none !important;
      }
    }
  }

  @media print {
    .container:has(.dialog--aria-role:target) main {
      display: none !important;
    }

    close-dialog-button {
      display: none !important;
    }

    .dialog--aria-role:target {
      display: contents;
    }

    .aria-role__row-header {
      font-weight: bold;
    }
  }
`;
