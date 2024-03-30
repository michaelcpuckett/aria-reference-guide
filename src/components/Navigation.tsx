import {
  abstractAriaRolesByType,
  ariaRolesByAbstractRole,
  mappedAbstractAriaRolesToDescriptions,
  mappedAbstractAriaRolesToTitles,
  mappedAriaRolesToDisplayNames,
} from "../../data";

export function Navigation({ role }: { role?: string }) {
  return (
    <nav className="nav" id="menu">
      <div className="nav__inner-container">
        <ul className="nav__list">
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
                  <details
                    className="nav__list-item__details"
                    open={
                      !!role &&
                      ariaRolesByAbstractRole[abstractRole].includes(role)
                    }
                  >
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
                                dangerouslySetInnerHTML={{
                                  __html: `<span aria-hidden="true">${roleDisplayName}</span>`,
                                }}
                              />
                            </li>
                          );
                        })}
                    </ul>
                  </details>
                </li>
              );
            })}
        </ul>
      </div>
    </nav>
  );
}
