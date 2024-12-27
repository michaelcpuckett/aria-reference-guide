import { mappedAriaRolesToDisplayNames } from "../../data";

export function Navigation({ role }: { role?: string }) {
  return (
    <nav className="nav">
      <h2>All Roles</h2>
      <ul className="nav__list nav__list--role">
        {Object.keys(mappedAriaRolesToDisplayNames)
          .sort()
          .map((ariaRole) => {
            const roleDisplayName =
              mappedAriaRolesToDisplayNames[ariaRole] || ariaRole;
            const roleDisplayHtml = { __html: roleDisplayName };
            const roleUrl = `/role/${ariaRole}.html`;

            return (
              <li
                key={ariaRole}
                className="nav__list-item nav__list-item--role"
              >
                <a
                  aria-label={ariaRole}
                  className="nav__list-item__link"
                  href={roleUrl}
                  aria-current={ariaRole === role ? "page" : undefined}
                >
                  <span
                    aria-hidden="true"
                    dangerouslySetInnerHTML={roleDisplayHtml}
                  ></span>
                </a>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
