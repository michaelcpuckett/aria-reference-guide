import React from "react";
import {
  ariaRolesWithPresentationalChildren,
  ariaRolesWithPhrasingDescendants,
  mappedAriaRolesToContentTypes,
} from "../data";

interface ARIARoleProps {
  role: string;
  abstractAriaRole: string;
  type: string;
  id: string;
  roleTitle: string;
}

export function ARIARole({
  role,
  abstractAriaRole,
  type,
  id,
  roleTitle,
}: ARIARoleProps) {
  return (
    <div
      role="listitem"
      aria-label={role}
      key={role}
      className={`
        aria-role
        aria-role--${type === "interactive" ? "interactive" : "non-interactive"}
        aria-role--abstract-role-${abstractAriaRole}
        ${
          ariaRolesWithPresentationalChildren.includes(role)
            ? "aria-role--only-presentational-children"
            : ""
        }
        ${
          ariaRolesWithPhrasingDescendants.includes(role)
            ? "aria-role--only-phrasing-descendants"
            : ""
        }
        ${(mappedAriaRolesToContentTypes[role] || [])
          .map((contentType) => `aria-role--content-type-${contentType}`)
          .join(" ")}
      `}
    >
      <expansion-button role="none" data-role={id}>
        <a
          href={`#${id}-dialog`}
          aria-haspopup="dialog"
          className="aria-role__summary"
          id={`aria-role__summary--${id}`}
          aria-expanded="false"
          aria-label={role}
          dangerouslySetInnerHTML={{
            __html: roleTitle,
          }}
        ></a>
      </expansion-button>
    </div>
  );
}
