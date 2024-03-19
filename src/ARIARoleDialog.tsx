import {
  allowedAriaRolesByHtmlElement,
  ariaRolesByCategory,
  ariaRolesWithPresentationalChildren,
  ariaToHtmlMapping,
  links,
  mappedAbstractAriaRolesToTitles,
  mappedAriaRolesToAllowedDescendants,
  mappedAriaRolesToContentTypes,
  mappedAriaRolesToContextRoles,
  mappedAriaRolesToDescriptions,
  mappedAriaRolesToDisplayNames,
  mappedAriaRolesToNotes,
  mappedContentTypesToTitles,
} from "../data";
import { Dialog } from "./Dialog";
import { CustomElement } from "./types";

interface ARIARoleDialogProps {
  role: string;
  abstractAriaRole: string;
  id: string;
  mayBeInteractive: boolean;
}

export function ARIARoleDialog({
  role,
  abstractAriaRole,
  mayBeInteractive,
  id,
}: ARIARoleDialogProps) {
  const roleTitle = mappedAriaRolesToDisplayNames[role] || role;

  const abstractRoleCategory = Object.entries(ariaRolesByCategory)
    .filter(([, value]) => value.includes(role))
    .map(([key]) => key)
    .sort();

  const allowedContent = mappedAriaRolesToAllowedDescendants[role] || "N/A";

  return (
    <role-dialog>
      <Dialog
        headingLabel={`The ${role} role`}
        heading={`The ${roleTitle} role`}
        eyebrows={abstractRoleCategory}
        classes={`dialog--is-aria-role-${role} dialog--is-abstract-role-${abstractAriaRole}`}
        id={id}
        hasCloseButton
      >
        <table
          aria-labelledby={`dialog__heading--${id}`}
          className="aria-role__table"
        >
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
                    The semantics of any descendant elements are not conveyed to
                    assistive technologies.
                  </em>
                </p>
              )}
            </td>
          </tr>

          <tr className="aria-role__row">
            <th scope="row">Content Category</th>
            <td className="aria-role__cell">
              <ul className="list">
                {mappedAriaRolesToContentTypes[role].map((contentType) => (
                  <li key={contentType}>
                    {mappedContentTypesToTitles[contentType] || "N/A"}
                  </li>
                ))}
              </ul>
            </td>
          </tr>

          {mappedAriaRolesToContextRoles[role] && (
            <tr className="aria-role__row">
              <th scope="row">Required Context Roles</th>
              <td className="aria-role__cell">
                <ul className="list">
                  {mappedAriaRolesToContextRoles[role].map((contextRole) => (
                    <li key={contextRole}>{contextRole}</li>
                  ))}
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
          <tr className="aria-role__row">
            <th scope="row">Specification Links</th>
            <td className="aria-role__cell">
              <ul className="list">
                {Object.entries(links).map(([name, link]) => (
                  <li key={link}>
                    <a href={link + role} target="_blank">
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        </table>
      </Dialog>
    </role-dialog>
  );
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "role-dialog": CustomElement;
    }
  }
}
