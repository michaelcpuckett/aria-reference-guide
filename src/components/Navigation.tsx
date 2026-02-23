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
      <h2 className="m-0 mb-3 text-xs font-bold uppercase tracking-[1px] text-[var(--subhead-ink)]">
        All Roles
      </h2>
      <ul className="grid list-none gap-y-2 m-0 p-0">
        {navigationItems.map(
          ({ ariaRole, roleDisplayHtml, roleUrl, isCurrentPage }) => (
            <li key={ariaRole} className="block rounded-lg">
              <a
                aria-label={ariaRole}
                className="block break-words rounded-xl border border-[var(--panel-border)] bg-[var(--panel-bg)] p-3 text-[0.8em] font-bold text-[var(--title-ink)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)] transition-all duration-200 hover:underline aria-[current=page]:bg-[var(--title-ink)] aria-[current=page]:text-[var(--panel-bg)]"
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
