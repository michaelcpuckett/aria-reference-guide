import { mappedAriaRolesToDisplayNames } from "../../data";

export function Navigation({ role }: { role?: string }) {
  const sortedAriaRoles = Object.keys(mappedAriaRolesToDisplayNames).sort();
  const navigationItems = sortedAriaRoles.map((ariaRole) => {
    const roleDisplayName = mappedAriaRolesToDisplayNames[ariaRole] || ariaRole;

    return {
      ariaRole,
      roleDisplayHtml: { __html: roleDisplayName },
      roleUrl: `/role/${ariaRole}.html`,
      isCurrentPage: ariaRole === role,
    };
  });

  return (
    <nav className="max-[720px]:text-center">
      <h2 className="m-0 mb-3 text-xs font-bold uppercase tracking-[1px] opacity-70">
        All Roles
      </h2>
      <ul className="grid list-none gap-y-2 m-0 p-0">
        {navigationItems.map(
          ({ ariaRole, roleDisplayHtml, roleUrl, isCurrentPage }) => (
            <li key={ariaRole} className="block rounded-lg">
              <a
                aria-label={ariaRole}
                className="nav-role-link"
                href={roleUrl}
                aria-current={isCurrentPage ? "page" : undefined}
              >
                <span
                  aria-hidden="true"
                  dangerouslySetInnerHTML={roleDisplayHtml}
                ></span>
              </a>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}
