import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import {
  abstractAriaRolesByType,
  allowedAriaRolesByHtmlElement,
  ariaRolesByCategory,
  ariaRolesWithPresentationalChildren,
  ariaToHtmlMapping,
  links,
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
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
      <div className="container">
        <main>
          <h1
            id="h1-title"
            className="page-title"
            aria-label="Periodic Table of ARIA Roles"
          >
            Periodic&nbsp;Table&nbsp;of&nbsp;
            <wbr />
            ARIA&nbsp;Roles
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
                    key={type}
                    aria-labelledby={`periodic-table__type--${type}`}
                    className={`
                      periodic-table__type-area
                      periodic-table__type-area--${type}
                      periodic-table__subgrid
                    `}
                  >
                    <h2
                      className="periodic-table__type-area__heading"
                      id={`periodic-table__type--${type}`}
                    >
                      {mappedAriaTypesToTitles[type] + " Roles"}
                    </h2>
                    {abstractAriaRoles.map((abstractAriaRole) => {
                      const ariaRoles =
                        ariaRolesByCategory[abstractAriaRole] || [];
                      const rolesWithPresentationalChildren = ariaRoles
                        .filter((role) =>
                          ariaRolesWithPresentationalChildren.includes(role)
                        )
                        .sort((a?: string, b?: string) =>
                          a?.localeCompare(b || "")
                        );
                      const rolesWithoutPresentationalChildren = ariaRoles
                        .filter(
                          (role) =>
                            !ariaRolesWithPresentationalChildren.includes(role)
                        )
                        .sort((a?: string, b?: string) =>
                          a?.localeCompare(b || "")
                        );

                      return [
                        ["", rolesWithoutPresentationalChildren],
                        [
                          " with Presentational Children",
                          rolesWithPresentationalChildren,
                        ],
                      ].map(([name, roles], index) => {
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
                            className={`
                                periodic-table__subgrid
                                periodic-table__abstract-area
                                periodic-table__abstract-area--${abstractAriaRole}
                              `}
                          >
                            <h3
                              id={`aria-abstract-role--${abstractAriaRole}`}
                              className="periodic-table__abstract-area__heading"
                            >
                              {title}
                              {name}
                            </h3>
                            {index === 0 ? (
                              <p className="periodic-table__abstract-area__description">
                                {description}
                              </p>
                            ) : (
                              <p className="periodic-table__abstract-area__description">
                                The children of these roles are presentational
                                and do not have semantic value.
                              </p>
                            )}
                            <div
                              role="list"
                              aria-labelledby={`aria-abstract-role--${abstractAriaRole}`}
                              className="periodic-table__subgrid periodic-table__role-area"
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
                                const id = `${role}${
                                  mayBeInteractive ? `-${type}` : ""
                                }`;

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
                                  <role-dialog data-role={id} key={role}>
                                    <dialog
                                      className={`aria-role__dialog aria-role__dialog--abstract-role-${abstractAriaRole}`}
                                      id={`${id}-dialog`}
                                      aria-labelledby={`aria-role__dialog-heading--${id}`}
                                    >
                                      <div className="aria-role__dialog-content">
                                        <close-dialog-button>
                                          <a
                                            href={`#aria-role__summary--${id}`}
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
                                            id={`aria-role__dialog-heading--${id}`}
                                            aria-label={`The ${role} role`}
                                            dangerouslySetInnerHTML={{
                                              __html: `The <code>${roleTitle}</code> role`,
                                            }}
                                          ></h1>
                                          <div className="aria-role__details">
                                            <div
                                              role="table"
                                              aria-labelledby={`aria-role__dialog-heading--${id}`}
                                              className="aria-role__table"
                                            >
                                              <div
                                                role="row"
                                                className="aria-role__row"
                                              >
                                                <div
                                                  className="aria-role__row-header"
                                                  role="rowheader"
                                                >
                                                  Description
                                                </div>
                                                <div
                                                  role="cell"
                                                  className="aria-role__cell"
                                                >
                                                  {mappedAriaRolesToDescriptions[
                                                    role
                                                  ] || "--"}
                                                </div>
                                              </div>

                                              <div
                                                role="row"
                                                className="aria-role__row"
                                              >
                                                <div
                                                  className="aria-role__row-header"
                                                  role="rowheader"
                                                >
                                                  Content Category
                                                </div>
                                                <div
                                                  role="cell"
                                                  className="aria-role__cell"
                                                >
                                                  {contentCategory}
                                                </div>
                                              </div>

                                              {mayBeInteractive && (
                                                <div
                                                  role="row"
                                                  className="aria-role__row"
                                                >
                                                  <div
                                                    className="aria-role__row-header"
                                                    role="rowheader"
                                                  >
                                                    *Note
                                                  </div>
                                                  <div
                                                    role="cell"
                                                    className="aria-role__cell"
                                                  >
                                                    May be interactive or
                                                    non-interactive depending on
                                                    the context:{" "}
                                                    {mappedAriaRolesToNotes[
                                                      role
                                                    ] || ""}
                                                  </div>
                                                </div>
                                              )}

                                              <div
                                                role="row"
                                                className="aria-role__row"
                                              >
                                                <div
                                                  className="aria-role__row-header"
                                                  role="rowheader"
                                                >
                                                  Category Description
                                                </div>
                                                <div
                                                  role="cell"
                                                  className="aria-role__cell"
                                                >
                                                  {description}
                                                </div>
                                              </div>

                                              {mappedAriaRolesToContextRoles[
                                                role
                                              ] && (
                                                <div
                                                  role="row"
                                                  className="aria-role__row"
                                                >
                                                  <div
                                                    className="aria-role__row-header"
                                                    role="rowheader"
                                                  >
                                                    Required Context Roles
                                                  </div>
                                                  <div
                                                    role="cell"
                                                    className="aria-role__cell"
                                                  >
                                                    <ul className="list">
                                                      {mappedAriaRolesToContextRoles[
                                                        role
                                                      ].map((contextRole) => (
                                                        <li key={contextRole}>
                                                          {contextRole}
                                                        </li>
                                                      ))}
                                                    </ul>
                                                  </div>
                                                </div>
                                              )}

                                              <div
                                                role="row"
                                                className="aria-role__row"
                                              >
                                                <div
                                                  className="aria-role__row-header"
                                                  role="rowheader"
                                                >
                                                  HTML Elements with Implicit
                                                  ARIA Role
                                                </div>
                                                <div
                                                  role="cell"
                                                  className="aria-role__cell"
                                                >
                                                  <ul className="list">
                                                    {(
                                                      ariaToHtmlMapping[
                                                        role
                                                      ] || ["(None)"]
                                                    )
                                                      .sort()
                                                      .map((htmlElement) => (
                                                        <li key={htmlElement}>
                                                          {htmlElement}
                                                        </li>
                                                      ))}
                                                  </ul>
                                                </div>
                                              </div>

                                              <div
                                                role="row"
                                                className="aria-role__row"
                                              >
                                                <div
                                                  className="aria-role__row-header"
                                                  role="rowheader"
                                                >
                                                  Allowed HTML Elements
                                                </div>
                                                <div
                                                  role="cell"
                                                  className="aria-role__cell"
                                                >
                                                  <ul className="list">
                                                    {Array.from(
                                                      new Set(
                                                        Object.entries(
                                                          allowedAriaRolesByHtmlElement
                                                        )
                                                          .filter(
                                                            ([_, roles]) =>
                                                              roles.includes(
                                                                role
                                                              )
                                                          )
                                                          .map(
                                                            ([tagName]) =>
                                                              tagName
                                                          )
                                                          .concat(
                                                            ariaToHtmlMapping[
                                                              role
                                                            ] || []
                                                          )
                                                      )
                                                    ).map((tagName) => (
                                                      <li key={tagName}>
                                                        {tagName}
                                                        {(
                                                          ariaToHtmlMapping[
                                                            role
                                                          ] || []
                                                        ).includes(tagName)
                                                          ? "(Role attribute unnecessary)"
                                                          : ""}
                                                      </li>
                                                    ))}
                                                    <li key="any">{`<div>, <span>, <p>, other elements that can receive any role`}</li>
                                                  </ul>
                                                </div>
                                              </div>
                                              <div
                                                role="row"
                                                className="aria-role__row"
                                              >
                                                <div
                                                  className="aria-role__row-header"
                                                  role="rowheader"
                                                >
                                                  Specification Links
                                                </div>
                                                <div
                                                  role="cell"
                                                  className="aria-role__cell"
                                                >
                                                  <ul className="list">
                                                    {Object.entries(links).map(
                                                      ([name, link]) => (
                                                        <li key={link}>
                                                          <a
                                                            href={link + role}
                                                            target="_blank"
                                                          >
                                                            {name}
                                                          </a>
                                                        </li>
                                                      )
                                                    )}
                                                  </ul>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </dialog>
                                  </role-dialog>
                                );

                                return (
                                  <div
                                    role="listitem"
                                    aria-label={role}
                                    key={role}
                                    className={`
                                        aria-role
                                        aria-role--${
                                          type === "interactive"
                                            ? "interactive"
                                            : "non-interactive"
                                        }
                                        aria-role--abstract-role-${abstractAriaRole}
                                        ${
                                          ariaRolesWithPresentationalChildren.includes(
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
                                  >
                                    <expansion-button
                                      role="none"
                                      data-role={id}
                                    >
                                      <a
                                        href={`#${id}-dialog`}
                                        aria-haspopup="dialog"
                                        className="aria-role__summary"
                                        id={`aria-role__summary--${id}`}
                                        aria-expanded="false"
                                        aria-label={role}
                                        dangerouslySetInnerHTML={{
                                          __html: displayName,
                                        }}
                                      ></a>
                                    </expansion-button>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      });
                    })}
                  </div>
                );
              }
            )}
          </div>
        </main>
        {dialogElements}
      </div>

      <footer>Test</footer>

      <script
        dangerouslySetInnerHTML={{
          __html: scripts,
        }}
      ></script>
    </html>
  );
}

app.get("/", (req, res) => {
  const htmlResult = `<!doctype html>
    ${ReactDOMServer.renderToString(<ARIAPeriodicTable />)}
  `;
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
      "role-dialog": CustomElement;
      "close-dialog-button": CustomElement;
    }
  }
}
