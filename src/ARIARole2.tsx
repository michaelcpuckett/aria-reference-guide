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

export function ARIARole2({
  role,
  abstractAriaRole,
  type,
  id,
  roleTitle,
}: ARIARoleProps) {
  return (
    <summary
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
      aria-haspopup="dialog"
      id={`aria-role__summary--${id}`}
      aria-expanded="false"
      aria-label={role}
      dangerouslySetInnerHTML={{
        __html: roleTitle,
      }}
    ></summary>
  );
}
