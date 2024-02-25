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

import scripts from "./scripts";
import styles from "./styles";

const app = express();

function ARIAPeriodicTable() {
  const dialogElements: React.ReactNode[] = [];

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
      <main>
        <h1 id="h1-title" className="page-title">
          Periodic Table of ARIA Roles
        </h1>
        <span id="list-title" hidden>
          ARIA Roles by Type
        </span>
        <ul className="periodic-table__root" aria-labelledby="list-title">
          {Object.entries(abstractAriaRolesByType).map(
            ([type, abstractAriaRoles]) => {
              return (
                <li
                  aria-labelledby={`periodic-table__type--${type}`}
                  className={`periodic-table__subgrid periodic-table__subgrid-area periodic-table__subgrid-area--${type}`}
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
                      const ariaRoles =
                        ariaRolesByCategory[abstractAriaRole] || [];
                      const rolesWithOnlyPhrasingDescendants = ariaRoles
                        .filter((role) =>
                          ariaRolesWithOnlyPhrasingDescendants.includes(role)
                        )
                        .sort((a?: string, b?: string) =>
                          a?.localeCompare(b || "")
                        );
                      const rolesWithoutOnlyPhrasingDescendants = ariaRoles
                        .filter(
                          (role) =>
                            !ariaRolesWithOnlyPhrasingDescendants.includes(role)
                        )
                        .sort((a?: string, b?: string) =>
                          a?.localeCompare(b || "")
                        );

                      return [
                        ["", rolesWithoutOnlyPhrasingDescendants],
                        [
                          " (Phrasing Descendants Only)",
                          rolesWithOnlyPhrasingDescendants,
                        ],
                      ].map(([name, roles]) => {
                        const title =
                          mappedAbstractAriaRolesToTitles[abstractAriaRole] +
                          " Roles";
                        const description =
                          mappedAbstractAriaRolesToDescriptions[
                            abstractAriaRole
                          ];

                        if (!roles.length) {
                          return null;
                        }

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
                              {name}
                            </h3>
                            <ul
                              className="periodic-table__subgrid periodic-table__subgrid-row"
                              aria-labelledby={`aria-abstract-role--${abstractAriaRole}`}
                            >
                              {roles.map((role) => {
                                const displayName =
                                  mappedAriaRolesToDisplayNames[role] || role;

                                dialogElements.push(
                                  <dialog
                                    className="aria-role__dialog"
                                    id={`dialog-for-${role}`}
                                    key={role}
                                  >
                                    <div className="aria-role__dialog-content">
                                      <close-dialog-button>
                                        <button
                                          type="button"
                                          aria-label="Close Dialog"
                                        >
                                          &times;
                                        </button>
                                      </close-dialog-button>
                                      <div
                                        role="region"
                                        aria-label="Scrollable Dialog Content"
                                        tabIndex={-1}
                                      >
                                        <h1
                                          className="aria-role__dialog-heading"
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              mappedAriaRolesToDisplayNames[
                                                role
                                              ] || role,
                                          }}
                                        ></h1>
                                        <div className="aria-role__details">
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
                                                Content Category
                                              </th>
                                              <td className="aria-role__cell">
                                                <p>
                                                  {
                                                    mappedAbstractAriaRolesToTitles[
                                                      abstractAriaRole
                                                    ]
                                                  }
                                                </p>
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
                                                    ariaToHtmlMapping[role] || [
                                                      "--",
                                                    ]
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
                                                <ul className="list">
                                                  {Array.from(
                                                    new Set(
                                                      Object.entries(
                                                        allowedAriaRolesByHtmlElement
                                                      )
                                                        .filter(([_, roles]) =>
                                                          roles.includes(role)
                                                        )
                                                        .map(
                                                          ([tagName]) => tagName
                                                        )
                                                        .concat(
                                                          ariaToHtmlMapping[
                                                            role
                                                          ] || []
                                                        )
                                                    )
                                                  ).map((tagName) => (
                                                    <li
                                                      className="is-strong"
                                                      key={tagName}
                                                    >
                                                      {tagName}
                                                    </li>
                                                  ))}
                                                  <li key="any">{`<div>, <span>, <p>, other elements that can receive any role`}</li>
                                                </ul>
                                              </td>
                                            </tr>
                                          </table>
                                        </div>
                                      </div>
                                    </div>
                                  </dialog>
                                );

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
                                        ${(
                                          mappedAriaRolesToContentTypes[role] ||
                                          []
                                        )
                                          .map(
                                            (contentType) =>
                                              `aria-role--content-type-${contentType}`
                                          )
                                          .join(" ")}
                                      `}
                                    key={role}
                                  >
                                    <expansion-button
                                      role="none"
                                      data-role={role}
                                    >
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
                                  </li>
                                );
                              })}
                            </ul>
                          </li>
                        );
                      });
                    })}
                  </ul>
                </li>
              );
            }
          )}
        </ul>
      </main>

      {dialogElements}

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
