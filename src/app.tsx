import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import {
  abstractAriaRolesByType,
  allowedAriaRolesByHtmlElement,
  ariaRolesByCategory,
  ariaRolesWithOnlyPhrasingDescendants,
  ariaToHtmlMapping,
  mappedAbstractAriaRolesToDescriptions,
  mappedAbstractAriaRolesToTitles,
  mappedAriaRolesToContentTypes,
  mappedAriaRolesToDescriptions,
  mappedAriaRolesToDisplayNames,
} from "../data";

import styles from "./styles";
import scripts from './scripts';

const app = express();

function ARIAPeriodicTable() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
      <main>
        <h1 id="h1-title" className="page-title">Periodic Table of ARIA Roles</h1>
          <span id="list-title" hidden>
            ARIA Roles by Type
          </span>
          <ul className="periodic-table__root" aria-labelledby="list-title">
            {Object.entries(abstractAriaRolesByType).map(
              ([type, abstractAriaRoles]) => {
                return (
                  <li
                    aria-labelledby={`periodic-table__type--${type}`}
                    className="periodic-table__subgrid periodic-table__subgrid-area"
                    key={type}
                  >
                    <h2
                      className="periodic-table__subgrid-area-heading"
                      id={`periodic-table__type--${type}`}
                    >
                      {type}
                    </h2>
                    <ul
                      className="periodic-table__subgrid periodic-table__subgrid-row"
                      aria-labelledby={`periodic-table__type--${type}`}
                    >
                      {abstractAriaRoles.map((abstractAriaRole) => {
                        const ariaRoles = (
                          ariaRolesByCategory[abstractAriaRole] || []
                        ).sort((a?: string, b?: string) =>
                          a?.localeCompare(b || "")
                        );
                        const title =
                          mappedAbstractAriaRolesToTitles[abstractAriaRole];
                        const description =
                          mappedAbstractAriaRolesToDescriptions[abstractAriaRole];

                        return (
                          <li
                            role="none"
                            key={abstractAriaRole}
                            className="periodic-table__subgrid periodic-table__subgrid-row"
                          >
                            <h3
                              id={`aria-abstract-role--${abstractAriaRole}`}
                              className="periodic-table__subgrid-heading"
                            >
                              {title}
                            </h3>
                            <ul
                              className="periodic-table__subgrid periodic-table__subgrid-row"
                              aria-labelledby={`aria-abstract-role--${abstractAriaRole}`}
                            >
                              {ariaRoles
                                .sort((a, b) => {
                                  const isAPhrasing = (
                                    mappedAriaRolesToContentTypes[a] || []
                                  ).includes("phrasing");
                                  const isBPhrasing = (
                                    mappedAriaRolesToContentTypes[b] || []
                                  ).includes("phrasing");
                                  const isAPhrasingDescedantsOnly =
                                    ariaRolesWithOnlyPhrasingDescendants.includes(
                                      a
                                    );
                                  const isBPhrasingDescedantsOnly =
                                    ariaRolesWithOnlyPhrasingDescendants.includes(
                                      b
                                    );

                                  if (isAPhrasing && !isBPhrasing) {
                                    return 1;
                                  }

                                  if (!isAPhrasing && isBPhrasing) {
                                    return -1;
                                  }

                                  if (
                                    isAPhrasingDescedantsOnly &&
                                    !isBPhrasingDescedantsOnly
                                  ) {
                                    return 1;
                                  }

                                  if (
                                    !isAPhrasingDescedantsOnly &&
                                    isBPhrasingDescedantsOnly
                                  ) {
                                    return -1;
                                  }

                                  return a.localeCompare(b);
                                })
                                .map((role) => {
                                  const displayName =
                                    mappedAriaRolesToDisplayNames[role] || role;

                                  return (
                                    <li
                                      aria-label={role}
                                      className={`
                                  aria-role
                                  aria-role--${
                                    type === "interactive"
                                      ? "interactive"
                                      : "non-interactive"
                                  }
                                  aria-role--abstract-role-${abstractAriaRole}
                                  ${
                                    ariaRolesWithOnlyPhrasingDescendants.includes(
                                      role
                                    )
                                      ? "aria-role--only-phrasing-descendants"
                                      : ""
                                  }
                                  ${(mappedAriaRolesToContentTypes[role] || [])
                                    .map(
                                      (contentType) =>
                                        `aria-role--content-type-${contentType}`
                                    )
                                    .join(" ")}
                                `}
                                      key={role}
                                    >
                                      <expansion-button role="none">
                                        <button
                                          type="button"
                                          aria-haspopup="dialog"
                                          className="aria-role__summary"
                                          aria-label={role}
                                          dangerouslySetInnerHTML={{
                                            __html: displayName,
                                          }}
                                        ></button>
                                      </expansion-button>
                                      <dialog className="aria-role__dialog">
                                        <close-dialog-button>
                                          <button type="button">Close</button>
                                        </close-dialog-button>
                                        <div className="aria-role__details">
                                          <h1>{role}</h1>
                                          <table className="aria-role__table">
                                            <tr className="aria-role__row">
                                              <th
                                                className="aria-role__column-header"
                                                scope="col"
                                              >
                                                Description
                                              </th>
                                              <td className="aria-role__cell">
                                                {mappedAriaRolesToDescriptions[
                                                  role
                                                ] || "--"}
                                              </td>
                                            </tr>

                                            <tr className="aria-role__row">
                                              <th
                                                className="aria-role__column-header"
                                                scope="col"
                                              >
                                                Category Description
                                              </th>
                                              <td className="aria-role__cell">
                                                <p>{description}</p>
                                              </td>
                                            </tr>

                                            <tr className="aria-role__row">
                                              <th
                                                className="aria-role__column-header"
                                                scope="col"
                                              >
                                                HTML Elements with Implicit ARIA
                                                Role
                                              </th>
                                              <td className="aria-role__cell">
                                                <ul>
                                                  {(
                                                    ariaToHtmlMapping[role] || []
                                                  ).map((htmlElement) => (
                                                    <li key={htmlElement}>
                                                      {htmlElement}
                                                    </li>
                                                  ))}
                                                </ul>
                                              </td>
                                            </tr>

                                            <tr className="aria-role__row">
                                              <th
                                                className="aria-role__column-header"
                                                scope="col"
                                              >
                                                Allowed HTML Elements
                                              </th>
                                              <td className="aria-role__cell">
                                                <details>
                                                  <summary>
                                                    See Allowed HTML Elements
                                                  </summary>
                                                  <ul>
                                                    {Object.entries(
                                                      allowedAriaRolesByHtmlElement
                                                    )
                                                      .filter(
                                                        ([_, roles]) =>
                                                          roles.includes(role) ||
                                                          roles.includes("*")
                                                      )
                                                      .map(([tagName, roles]) => (
                                                        <li
                                                          className={
                                                            roles.includes("*")
                                                              ? ""
                                                              : "is-strong"
                                                          }
                                                          key={tagName}
                                                        >
                                                          {tagName}
                                                        </li>
                                                      ))}
                                                  </ul>
                                                </details>
                                              </td>
                                            </tr>
                                          </table>
                                        </div>
                                      </dialog>
                                    </li>
                                  );
                                })}
                            </ul>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              }
            )}
          </ul>
      </main>

      <script
        dangerouslySetInnerHTML={{
          __html: scripts,
        }}
      ></script>
    </>
  );
}

app.get("/", (req, res) => {
  const htmlResult = `<!doctype html><meta name="viewport" content="width=device-width, initial-scale=1" />${ReactDOMServer.renderToString(
    <ARIAPeriodicTable />
  )}`;
  res.send(htmlResult);
});

app.listen(10101, () => {
  console.log("Running on 10101");
});

type CustomElement = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement> & {
    class?: string;
    tabindex?: string;
  },
  HTMLElement
>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "expansion-button": CustomElement;
      "close-dialog-button": CustomElement;
    }
  }
}
