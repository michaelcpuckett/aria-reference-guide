import React from "react";
import { Dialog } from "./Dialog";
import { ARIARole } from "./ARIARole";
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
  dialogElements: JSX.Element[];
}

export function AbstractARIARole({
  abstractAriaRole,
  abstractTitle,
  description,
  ariaRoles,
  type,
  dialogElements,
}: AbstractARIARoleProps) {
  return (
    <abstract-aria-role>
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
          tabIndex={0}
          id={`aria-abstract-role--${abstractAriaRole}`}
          className="periodic-table__abstract-area__heading"
        >
          {abstractTitle}s
        </h3>
        <details name="accordion">
          <summary
            tabIndex={-1}
            className="visually-hidden periodic-table__abstract-area__summary"
          >
            View {abstractTitle} Roles
          </summary>
          {/*
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
      */}
          <div
            role="list"
            aria-labelledby={`aria-abstract-role--${abstractAriaRole}`}
            className="periodic-table__subgrid periodic-table__role-area"
          >
            {ariaRoles.map((role) => {
              const roleTitle: string =
                mappedAriaRolesToDisplayNames[role] || role;
              const mayBeInteractive = roleTitle.endsWith("*");
              const id = `${role}${mayBeInteractive ? `-${type}` : ""}`;

              dialogElements.push(
                <Dialog
                  key={id}
                  role={role}
                  id={id}
                  mayBeInteractive={mayBeInteractive}
                  abstractAriaRole={abstractAriaRole}
                ></Dialog>
              );

              return (
                <ARIARole
                  key={id}
                  role={role}
                  abstractAriaRole={abstractAriaRole}
                  type={type}
                  id={id}
                  roleTitle={roleTitle}
                />
              );
            })}
          </div>
        </details>
      </div>
    </abstract-aria-role>
  );
}
