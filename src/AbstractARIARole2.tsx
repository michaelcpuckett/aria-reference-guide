import React from "react";
import { Dialog } from "./Dialog";
import { ARIARole2 } from "./ARIARole2";
import {
  ariaRolesWithPresentationalChildren,
  ariaRolesWithPhrasingDescendants,
  mappedAriaRolesToDisplayNames,
} from "../data";

interface AbstractARIARoleProps {
  abstractAriaRole: string;
  abstractTitle: string;
  description: string;
  ariaRoles: string[];
  type: string;
}

export function AbstractARIARole2({
  abstractAriaRole,
  abstractTitle,
  description,
  ariaRoles,
  type,
}: AbstractARIARoleProps) {
  return (
    <div
      role="listitem"
      aria-labelledby={`aria-abstract-role--${abstractAriaRole}`}
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
        {abstractTitle + " Roles"}
      </h3>
      <p className="periodic-table__abstract-area__description">
        {description}
      </p>
      {ariaRoles.some((role) =>
        ariaRolesWithPhrasingDescendants.includes(role)
      ) && (
        <p className="periodic-table__abstract-area__description">
          Shaded cells indicate descendants of the role should be text or
          phrasing content.
        </p>
      )}
      {abstractAriaRole !== "structure" &&
        ariaRoles.some((role) =>
          ariaRolesWithPresentationalChildren.includes(role)
        ) && (
          <p className="periodic-table__abstract-area__description">
            Shaded cells indicate descendants of the role are made to be
            presentational.
          </p>
        )}
      <div
        role="list"
        aria-labelledby={`aria-abstract-role--${abstractAriaRole}`}
        className="periodic-table__subgrid periodic-table__role-area"
      >
        {ariaRoles.map((role) => {
          const roleTitle: string = mappedAriaRolesToDisplayNames[role] || role;
          const mayBeInteractive = roleTitle.endsWith("*");
          const id = `${role}${mayBeInteractive ? `-${type}` : ""}`;

          return (
            <details key={id}>
              <ARIARole2
                role={role}
                abstractAriaRole={abstractAriaRole}
                type={type}
                id={id}
                roleTitle={roleTitle}
              />
              <Dialog
                role={role}
                id={id}
                mayBeInteractive={mayBeInteractive}
                abstractAriaRole={abstractAriaRole}
              ></Dialog>
            </details>
          );
        })}
      </div>
    </div>
  );
}
