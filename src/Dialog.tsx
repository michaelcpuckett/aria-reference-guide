import React from "react";
import {
  allowedAriaRolesByHtmlElement,
  ariaRolesWithPresentationalChildren,
  ariaRolesWithPhrasingDescendants,
  ariaToHtmlMapping,
  links,
  mappedAriaRolesToContentTypes,
  mappedAriaRolesToContextRoles,
  mappedAriaRolesToDescriptions,
  mappedAriaRolesToNotes,
  mappedContentTypesToTitles,
  mappedAriaRolesToAllowedDescendants,
  mappedAbstractAriaRolesToTitles,
  ariaRolesByCategory,
  mappedAriaRolesToDisplayNames,
} from "../data";

interface DialogProps {
  role: string;
  abstractAriaRole: string;
  id: string;
  mayBeInteractive: boolean;
}

export function Dialog({
  role,
  abstractAriaRole,
  mayBeInteractive,
  id,
}: DialogProps) {
  const roleTitle = mappedAriaRolesToDisplayNames[role] || role;
  const abstractTitle = mappedAbstractAriaRolesToTitles[abstractAriaRole];

  let abstractRoleCategory = abstractTitle;

  if (mayBeInteractive) {
    abstractRoleCategory = [];

    for (const [key, value] of Object.entries(ariaRolesByCategory)) {
      if (value.includes(role)) {
        abstractRoleCategory.push(mappedAbstractAriaRolesToTitles[key]);
      }
    }

    abstractRoleCategory = abstractRoleCategory
      .sort()
      .map((category) => `${category}*`)
      .join(", ");
  }

  const allowedContent = mappedAriaRolesToAllowedDescendants[role] || "N/A";

  return (
    <role-dialog>
      <dialog
        key={role}
        data-role={id}
        className={`
        dialog
        dialog--aria-role
        dialog--aria-role-${role}
        dialog--abstract-role-${abstractAriaRole}${
          ariaRolesWithPresentationalChildren.includes(role)
            ? " dialog--only-phrasing-descendants"
            : ""
        }${
          ariaRolesWithPhrasingDescendants.includes(role)
            ? " dialog--only-presentational-children"
            : ""
        }`}
        id={`${id}-dialog`}
        aria-labelledby={`dialog__heading--${id}`}
      >
        <div className="dialog__content dialog__content--aria-role">
          <close-dialog-button>
            <a href={`#aria-role__summary--${id}`} aria-label="Close Dialog">
              &times;
            </a>
          </close-dialog-button>
          <div
            role="region"
            aria-label="Scrollable Dialog Content"
            tabIndex={-1}
          >
            <h2
              className="dialog__heading dialog__heading--aria-role"
              id={`dialog__heading--${id}`}
              aria-label={`The ${role} role`}
              dangerouslySetInnerHTML={{
                __html: `The ${roleTitle} role`,
              }}
            ></h2>
            <div className="aria-role__details">
              <div
                role="table"
                aria-labelledby={`dialog__heading--${id}`}
                className="aria-role__table"
              >
                <div role="row" className="aria-role__row">
                  <div className="aria-role__row-header" role="rowheader">
                    Description
                  </div>
                  <div role="cell" className="aria-role__cell">
                    <p>{mappedAriaRolesToDescriptions[role] || "--"}</p>
                  </div>
                </div>

                <div role="row" className="aria-role__row">
                  <div className="aria-role__row-header" role="rowheader">
                    Abstract Role
                  </div>
                  <div role="cell" className="aria-role__cell">
                    {mayBeInteractive ? (
                      <>
                        <p>{abstractRoleCategory}</p>
                        <p>
                          *May be interactive or non-interactive depending on
                          the context: {mappedAriaRolesToNotes[role] || ""}
                        </p>
                      </>
                    ) : (
                      <p>{abstractRoleCategory}</p>
                    )}
                  </div>
                </div>

                <div role="row" className="aria-role__row">
                  <div className="aria-role__row-header" role="rowheader">
                    Allowed Content
                  </div>
                  <div role="cell" className="aria-role__cell">
                    <p>{allowedContent}</p>

                    {ariaRolesWithPresentationalChildren.includes(role) && (
                      <p>
                        Browsers automatically apply the presentation role to
                        all descendant elements.{" "}
                        <em>
                          The semantics of any descendant elements are not
                          conveyed to assistive technologies.
                        </em>
                      </p>
                    )}
                  </div>
                </div>

                <div role="row" className="aria-role__row">
                  <div className="aria-role__row-header" role="rowheader">
                    Content Category
                  </div>
                  <div role="cell" className="aria-role__cell">
                    <ul className="list">
                      {(mappedAriaRolesToContentTypes[role] || []).map(
                        (contentType) => (
                          <li key={contentType}>
                            {mappedContentTypesToTitles[contentType]}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>

                {mappedAriaRolesToContextRoles[role] && (
                  <div role="row" className="aria-role__row">
                    <div className="aria-role__row-header" role="rowheader">
                      Required Context Roles
                    </div>
                    <div role="cell" className="aria-role__cell">
                      <ul className="list">
                        {mappedAriaRolesToContextRoles[role].map(
                          (contextRole) => (
                            <li key={contextRole}>{contextRole}</li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                )}
                <div role="row" className="aria-role__row">
                  <div className="aria-role__row-header" role="rowheader">
                    HTML Elements with Implicit ARIA Role
                  </div>
                  <div role="cell" className="aria-role__cell">
                    <ul className="list">
                      {(ariaToHtmlMapping[role] || ["(None)"])
                        .sort()
                        .map((htmlElement) => (
                          <li key={htmlElement}>{htmlElement}</li>
                        ))}
                    </ul>
                  </div>
                </div>

                <div role="row" className="aria-role__row">
                  <div className="aria-role__row-header" role="rowheader">
                    Allowed HTML Elements
                  </div>
                  <div role="cell" className="aria-role__cell">
                    <ul className="list">
                      {Array.from(
                        new Set(
                          Object.entries(allowedAriaRolesByHtmlElement)
                            .filter(([_, roles]) => roles.includes(role))
                            .map(([tagName]) => tagName)
                            .concat(ariaToHtmlMapping[role] || [])
                        )
                      ).map((tagName) => (
                        <li key={tagName}>
                          {tagName}
                          {(ariaToHtmlMapping[role] || []).includes(tagName)
                            ? " (role attribute unnecessary)"
                            : ""}
                        </li>
                      ))}
                      <li key="any">{`<div>, <span>, <p>, other elements that can receive any role`}</li>
                    </ul>
                  </div>
                </div>
                <div role="row" className="aria-role__row">
                  <div className="aria-role__row-header" role="rowheader">
                    Specification Links
                  </div>
                  <div role="cell" className="aria-role__cell">
                    <ul className="list">
                      {Object.entries(links).map(([name, link]) => (
                        <li key={link}>
                          <a href={link + role} target="_blank">
                            {name}
                          </a>
                        </li>
                      ))}
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
}
