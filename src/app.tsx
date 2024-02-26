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
  mappedAriaRolesToContextRoles,
  mappedAriaRolesToDescriptions,
  mappedAriaRolesToDisplayNames,
  mappedAriaRolesToNotes,
  mappedAriaTypesToTitles,
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
        <div
          role="list"
          className="periodic-table__root"
          aria-labelledby="list-title"
        >
          {Object.entries(abstractAriaRolesByType).map(
            ([type, abstractAriaRoles]) => {
              return (
                <div
                  role="listitem"
                  aria-labelledby={`periodic-table__type--${type}`}
                  className={`periodic-table__subgrid periodic-table__subgrid-area periodic-table__subgrid-area--${type}`}
                  key={type}
                >
                  <h2
                    className="periodic-table__subgrid-area-heading"
                    id={`periodic-table__type--${type}`}
                  >
                    {mappedAriaTypesToTitles[type] + " Roles"}
                  </h2>
                  <div className="periodic-table__subgrid periodic-table__subgrid-row">
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
                          <div
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
                            <div
                              role="list"
                              aria-labelledby={`aria-abstract-role--${abstractAriaRole}`}
                              className="periodic-table__subgrid periodic-table__subgrid-row"
                            >
                              {roles.map((role) => {
                                const displayName =
                                  mappedAriaRolesToDisplayNames[role] || role;

                                const roleTitle =
                                  mappedAriaRolesToDisplayNames[role] || role;
                                const abstractTitle =
                                  mappedAbstractAriaRolesToTitles[
                                    abstractAriaRole
                                  ];

                                let contentCategory = abstractTitle;

                                const mayBeInteractive =
                                  roleTitle.endsWith("*");
                                if (mayBeInteractive) {
                                  contentCategory = [];

                                  for (const [key, value] of Object.entries(
                                    ariaRolesByCategory
                                  )) {
                                    if (value.includes(role)) {
                                      contentCategory.push(
                                        mappedAbstractAriaRolesToTitles[key]
                                      );
                                    }
                                  }

                                  contentCategory = contentCategory
                                    .sort()
                                    .map((category) => `${category}*`)
                                    .join(", ");
                                }

                                dialogElements.push(
                                  <dialog
                                    className={`aria-role__dialog aria-role__dialog--abstract-role-${abstractAriaRole}`}
                                    id={role}
                                    aria-labelledby={`aria-role__dialog-heading--${role}`}
                                    key={role}
                                  >
                                    <div className="aria-role__dialog-content">
                                      <close-dialog-button>
                                        <a
                                          href={`#aria-role__summary--${role}`}
                                          aria-label="Close Dialog"
                                        >
                                          &times;
                                        </a>
                                      </close-dialog-button>
                                      <div
                                        role="region"
                                        aria-label="Scrollable Dialog Content"
                                        tabIndex={-1}
                                      >
                                        <h1
                                          className="aria-role__dialog-heading"
                                          id={`aria-role__dialog-heading--${role}`}
                                          aria-label={`The ${role} role`}
                                          dangerouslySetInnerHTML={{
                                            __html: `The <code>${roleTitle}</code> role`,
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
                                                <p>{contentCategory}</p>
                                              </td>
                                            </tr>

                                            {mayBeInteractive && (
                                              <tr className="aria-role__row">
                                                <th
                                                  className="aria-role__column-header"
                                                  scope="col"
                                                >
                                                  *Note
                                                </th>
                                                <td className="aria-role__cell">
                                                  May be interactive or
                                                  non-interactive depending on
                                                  the context:{" "}
                                                  {mappedAriaRolesToNotes[
                                                    role
                                                  ] || ""}
                                                </td>
                                              </tr>
                                            )}

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

                                            {mappedAriaRolesToContextRoles[
                                              role
                                            ] && (
                                              <tr className="aria-role__row">
                                                <th
                                                  className="aria-role__column-header"
                                                  scope="col"
                                                >
                                                  Required Context Roles
                                                </th>
                                                <td className="aria-role__cell">
                                                  {mappedAriaRolesToContextRoles[
                                                    role
                                                  ].join(", ")}
                                                </td>
                                              </tr>
                                            )}

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
                                      <a
                                        href={`#${role}`}
                                        aria-haspopup="dialog"
                                        className="aria-role__summary"
                                        id={`aria-role__summary--${role}`}
                                        aria-expanded="false"
                                        aria-label={role}
                                        dangerouslySetInnerHTML={{
                                          __html: displayName,
                                        }}
                                      ></a>
                                    </expansion-button>
                                  </li>
                                );
                              })}
                            </div>
                          </div>
                        );
                      });
                    })}
                  </div>
                </div>
              );
            }
          )}
        </div>
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
