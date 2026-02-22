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
      <h2 className="m-0 mb-3 text-xs font-bold uppercase tracking-[1px] opacity-60">
        All Roles
      </h2>
      <ul className="grid list-none gap-y-2 m-0 p-0">
        {navigationItems.map(
          ({ ariaRole, roleDisplayHtml, roleUrl, isCurrentPage }) => (
            <li key={ariaRole} className="block rounded-lg">
              <a
                aria-label={ariaRole}
                className="block rounded-lg border border-current bg-white p-3 font-bold text-black hover:bg-black hover:text-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black break-words aria-[current=page]:bg-black aria-[current=page]:text-white dark:aria-[current=page]:bg-white dark:aria-[current=page]:text-black"
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
