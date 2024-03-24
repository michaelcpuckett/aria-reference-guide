import {
  allowedAriaRolesByHtmlElement,
  ariaRolesByAbstractRole,
  ariaRolesWithPresentationalChildren,
  ariaToHtmlMapping,
  links,
  mappedAbstractAriaRolesToTitles,
  mappedAbstractAriaRolesToUrls,
  mappedAriaRolesToAllowedDescendants,
  mappedAriaRolesToContentCategories,
  mappedAriaRolesToContextRoles,
  mappedAriaRolesToDescriptions,
  mappedAriaRolesToDisplayNames,
  mappedAriaRolesToNotes,
  mappedContentTypesToTitles,
  mappedContentTypesToUrls,
} from "../../data";
import { ExternalLinkIcon } from "./Icons";
import { CustomElement } from "../types";

interface DialogProps {
  role: string;
  abstractAriaRole: string;
}

export function Dialog({ role, abstractAriaRole }: DialogProps) {
  const roleTitle = mappedAriaRolesToDisplayNames[role] || role;

  const abstractRoleTags = Object.entries(ariaRolesByAbstractRole)
    .filter(([, value]) => value.includes(role))
    .map(([key]) => key)
    .sort()
    .map((key) => [
      mappedAbstractAriaRolesToTitles[key] || key,
      mappedAbstractAriaRolesToUrls[key] || "",
    ]);

  const contentCategories = mappedAriaRolesToContentCategories[role] || [];

  const filteredContentCategories = contentCategories.filter(
    (contentCategory: string) =>
      ["flow", "phrasing", "interactive"].includes(contentCategory)
  );

  if (
    filteredContentCategories.includes("flow") &&
    filteredContentCategories.includes("phrasing")
  ) {
    // All `phrasing` roles are also `flow` roles
    filteredContentCategories.splice(
      filteredContentCategories.indexOf("flow"),
      1
    );
  }

  const contentCategoryTags = filteredContentCategories
    .sort()
    .map((contentCategory: string) => [
      mappedContentTypesToTitles[contentCategory] || contentCategory,
      mappedContentTypesToUrls[contentCategory] || "",
    ]);

  const contextTags = mappedAriaRolesToContextRoles[role]
    ? [["Required Context", "https://www.w3.org/TR/wai-aria-1.2/#scope"]]
    : [];

  const tags = [...abstractRoleTags, ...contentCategoryTags, ...contextTags];

  const mayBeInteractive = abstractRoleTags.length > 1;

  const allowedContent = mappedAriaRolesToAllowedDescendants[role] || "N/A";

  return (
    <role-dialog>
      <dialog
        open
        className={`dialog dialog--is-aria-role-${role} dialog--is-abstract-role-${abstractAriaRole}`}
        aria-modal="false"
        aria-labelledby={`dialog__heading--${role}`}
        id={role}
      >
        <div className="dialog__content">
          <div className="dialog__header">
            <close-button>
              <button
                type="button"
                className="dialog__close-button"
                aria-label="Close dialog"
              >
                <svg fill="none" width="1rem" height="1rem">
                  <use href="#close-icon"></use>
                </svg>
              </button>
            </close-button>
            <div className="dialog__header__info">
              <div className="dialog__heading__container">
                <h1
                  className="dialog__heading"
                  id={`dialog__heading--${role}`}
                  aria-label={`The ${role} role`}
                  tabIndex={-1}
                  dangerouslySetInnerHTML={{
                    __html: `<span aria-hidden="true">The ${roleTitle} role</span>`,
                  }}
                ></h1>
              </div>
              <div className="dialog__links">
                {Object.entries(links).map(([name, link]) => (
                  <a key={link} href={link + role} target="_blank">
                    {name}
                    <ExternalLinkIcon />
                  </a>
                ))}
              </div>
              {tags ? (
                <p className="dialog__tags">
                  {tags.map(([tagName, url]) => (
                    <a
                      key={tagName}
                      href={url}
                      target="_blank"
                      className="dialog__tag"
                    >
                      {tagName}
                      <ExternalLinkIcon />
                    </a>
                  ))}
                </p>
              ) : null}
            </div>
          </div>
          <div className="aria-role__details">
            <table aria-label="Role Details" className="aria-role__table">
              <tr className="aria-role__row">
                <th scope="row">Description</th>
                <td className="aria-role__cell">
                  <p>{mappedAriaRolesToDescriptions[role] || "--"}</p>
                </td>
              </tr>

              {mayBeInteractive ? (
                <tr className="aria-role__row">
                  <th scope="row">Note</th>
                  <td className="aria-role__cell">
                    <p>
                      *May be interactive or non-interactive depending on the
                      context: {mappedAriaRolesToNotes[role] || ""}
                    </p>
                  </td>
                </tr>
              ) : null}

              <tr className="aria-role__row">
                <th scope="row">Allowed Content</th>
                <td className="aria-role__cell">
                  <p>{allowedContent}</p>

                  {ariaRolesWithPresentationalChildren.includes(role) && (
                    <p>
                      Browsers automatically apply the presentation role to all
                      descendant elements.{" "}
                      <em>
                        The semantics of any descendant elements are not
                        conveyed to assistive technologies.
                      </em>
                    </p>
                  )}
                </td>
              </tr>

              {mappedAriaRolesToContextRoles[role] && (
                <tr className="aria-role__row">
                  <th scope="row">Required Context Roles</th>
                  <td className="aria-role__cell">
                    <ul className="list">
                      {mappedAriaRolesToContextRoles[role].map(
                        (contextRole) => (
                          <li key={contextRole}>{contextRole}</li>
                        )
                      )}
                    </ul>
                  </td>
                </tr>
              )}
              <tr className="aria-role__row">
                <th scope="row">HTML Elements with Implicit ARIA Role</th>
                <td className="aria-role__cell">
                  <ul className="list">
                    {(ariaToHtmlMapping[role] || ["(None)"])
                      .sort()
                      .map((htmlElement) => (
                        <li key={htmlElement}>{htmlElement}</li>
                      ))}
                  </ul>
                </td>
              </tr>

              <tr className="aria-role__row">
                <th scope="row">Allowed HTML Elements</th>
                <td className="aria-role__cell">
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
                </td>
              </tr>
            </table>
          </div>
        </div>
      </dialog>
    </role-dialog>
  );
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "role-dialog": CustomElement;
      "close-button": CustomElement;
    }
  }
}
