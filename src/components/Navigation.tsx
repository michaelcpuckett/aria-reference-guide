import {
  abstractAriaRolesByType,
  ariaRolesByAbstractRole,
  mappedAbstractAriaRolesToDescriptions,
  mappedAbstractAriaRolesToTitles,
  mappedAriaRolesToDisplayNames,
} from "../../data";

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

      <h2>By Ancestor</h2>
      <ul className="nav__list nav__list--abstractRole">
        {Object.values(abstractAriaRolesByType)
          .flat()
          .sort()
          .map((abstractRole, index) => {
            const abstractRoleDisplayName =
              mappedAbstractAriaRolesToTitles[abstractRole] || abstractRole;
            const abstractRoleDescription =
              mappedAbstractAriaRolesToDescriptions[abstractRole] || "";

            return (
              <li
                key={abstractRole}
                className={`nav__list-item nav__list-item--${abstractRole}`}
              >
                <details className="nav__list-item__details">
                  <summary className="nav__list-item__summary">
                    {`${abstractRoleDisplayName}s`}
                  </summary>
                  <p className="nav__list-item__definition">
                    {abstractRoleDescription}
                  </p>
                  <ul
                    aria-label={`${abstractRole} Roles`}
                    className="nav__list-item__sublist"
                  >
                    {ariaRolesByAbstractRole[abstractRole]
                      .sort()
                      .map((role) => {
                        const roleDisplayName =
                          mappedAriaRolesToDisplayNames[role] || role;

                        return (
                          <li
                            key={role}
                            className="nav__list-item__sublist-item"
                          >
                            <a
                              href={`/role/${role}.html`}
                              aria-label={role}
                              className="nav__list-item__sublist-item__link"
                            >
                              <span
                                aria-hidden="true"
                                dangerouslySetInnerHTML={{
                                  __html: roleDisplayName,
                                }}
                              ></span>
                            </a>
                          </li>
                        );
                      })}
                  </ul>
                </details>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
