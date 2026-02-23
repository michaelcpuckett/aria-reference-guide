import type { ReactNode } from "react";
import {
  allowedAriaRolesByHtmlElement,
  ariaRolesByAbstractRole,
  ariaRolesWithPresentationalChildren,
  ariaToHtmlMapping,
  htmlElementsToContentCategories,
  htmlElementsToDisplayNames,
  links,
  mappedAbstractAriaRolesToDescriptions,
  mappedAbstractAriaRolesToTitles,
  mappedAbstractAriaRolesToUrls,
  mappedAriaRolesToAdditionalDescriptions,
  mappedAriaRolesToAllowedDescendants,
  mappedAriaRolesToContentCategories,
  mappedAriaRolesToContextRoles,
  mappedAriaRolesToDescriptions,
  mappedAriaRolesToDisplayNames,
  mappedContentTypesToDescriptions,
  mappedContentTypesToTitles,
  mappedContentTypesToUrls,
} from "../../data";
import { ExternalLinkIcon, IconDefinitions } from "../components/Icons";
import { MenuVisibilitySwitch } from "../components/MenuVisibilitySwitch";
import { Navigation } from "../components/Navigation";

interface Tag {
  tagName: string;
  url: string;
  raw: string;
}

interface RolePageProps {
  role: string;
  abstractAriaRole: string;
}

function RoleSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="flex w-full flex-col gap-3 rounded-xl border border-[var(--panel-border)] bg-[var(--panel-bg)] p-4 text-sm hyphens-auto shadow-[var(--panel-shadow)] backdrop-blur-[8px]">
      <h2
        className="m-0 text-xs uppercase tracking-[2px] text-[var(--subhead-ink)] first:mt-0"
        id={id}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function DetailList({ children }: { children: ReactNode }) {
  return <ul className="m-0 flex list-none flex-col gap-3 p-0">{children}</ul>;
}

function BulletList({ children }: { children: ReactNode }) {
  return <ul className="m-0 list-disc space-y-2 ps-5">{children}</ul>;
}

export function RolePage({ role, abstractAriaRole }: RolePageProps) {
  const roleTitle = mappedAriaRolesToDisplayNames[role] || role;
  const pageTitle = "ARIA Reference Guide";
  const pageHeading = `The ${role} role`;
  const pageHeadingHtml = {
    __html: `<span aria-hidden="true">The ${roleTitle} role</span>`,
  };
  const pageDocumentTitle = `${pageHeading} - ${pageTitle}`;
  const roleDescription = mappedAriaRolesToDescriptions[role] || "--";
  const roleAdditionalDescription =
    mappedAriaRolesToAdditionalDescriptions[role] || null;
  const hasRoleAdditionalDescription = !!roleAdditionalDescription;
  const roleMetaDescription = roleDescription === "--" ? "" : roleDescription;
  const roleWildcard = "*";
  const semanticContentCategories = ["flow", "phrasing", "interactive"];
  const normalizeSemanticCategories = (categories: string[]) => {
    const filtered = categories.filter((category: string) =>
      semanticContentCategories.includes(category),
    );

    // Phrasing is a subset of flow; prefer the more specific bucket.
    if (filtered.includes("phrasing") && filtered.includes("flow")) {
      return filtered.filter((category) => category !== "flow");
    }

    return filtered;
  };

  const abstractAriaRoleTags = Object.entries(ariaRolesByAbstractRole)
    .filter(([, value]) => value.includes(role))
    .map(([key]) => key)
    .sort()
    .map((key) => ({
      tagName: mappedAbstractAriaRolesToTitles[key] || key,
      url: mappedAbstractAriaRolesToUrls[key] || "",
      raw: key,
    }));
  const hasAbstractAriaRoleTags = abstractAriaRoleTags.length > 0;
  const showAbstractAriaRoleContextNote = abstractAriaRoleTags.length > 1;

  const contentCategories = mappedAriaRolesToContentCategories[role] || [];
  const filteredContentCategories =
    normalizeSemanticCategories(contentCategories);

  const contentCategoryTags: Tag[] = filteredContentCategories
    .sort()
    .map((contentCategory: string) => ({
      tagName: mappedContentTypesToTitles[contentCategory] || contentCategory,
      url: mappedContentTypesToUrls[contentCategory] || "",
      raw: contentCategory,
    }));
  const hasContentCategoryTags = contentCategoryTags.length > 0;

  const allowedDescendantRule = mappedAriaRolesToAllowedDescendants[role] || {
    category: "specific",
    note: "N/A",
  };
  const allowedDescendantTitle =
    allowedDescendantRule.category === "specific"
      ? "Specific Guidance"
      : `${mappedContentTypesToTitles[allowedDescendantRule.category]} Children Allowed`;
  const allowedDescendantNote = allowedDescendantRule.note || null;
  const roleCategories = normalizeSemanticCategories(
    mappedAriaRolesToContentCategories[role] || [],
  );
  const nativeRoleElements: string[] = Array.from(
    new Set((ariaToHtmlMapping[role] || []) as string[]),
  );
  const explicitRoleElements: string[] = Object.entries(
    allowedAriaRolesByHtmlElement,
  )
    .filter(([, roles]) => roles.includes(role))
    .map(([elementName]) => elementName);
  const explicitUsageElements: string[] = Array.from(
    new Set<string>(nativeRoleElements.concat(explicitRoleElements)),
  ).sort((a, b) => {
    const aNative = nativeRoleElements.includes(a);
    const bNative = nativeRoleElements.includes(b);

    if (aNative && !bNative) {
      return -1;
    }

    if (!aNative && bNative) {
      return 1;
    }

    return a.localeCompare(b);
  });
  const explicitUsageElementSet = new Set(explicitUsageElements);
  const wildcardUsageElements: string[] = Object.entries(
    allowedAriaRolesByHtmlElement,
  )
    .filter(([elementName, roles]) => {
      if (!roles.includes(roleWildcard)) {
        return false;
      }

      if (explicitUsageElementSet.has(elementName)) {
        return false;
      }

      const knownElementCategories =
        htmlElementsToContentCategories[elementName];

      // If category metadata is unavailable, keep prior behavior.
      if (!roleCategories.length || knownElementCategories === undefined) {
        return true;
      }

      const elementCategories = normalizeSemanticCategories(
        knownElementCategories,
      );

      return roleCategories.some((category: string) =>
        elementCategories.includes(category),
      );
    })
    .map(([elementName]) => elementName)
    .sort((a, b) => a.localeCompare(b));
  const explicitUsageItems = explicitUsageElements.map((elementName) => {
    const elementDisplayName =
      htmlElementsToDisplayNames[elementName] || elementName;
    const explicitRoleLabel = nativeRoleElements.includes(elementName)
      ? ""
      : `[role=${role}]`;

    return {
      key: elementName,
      label: (
        <>
          {elementDisplayName}
          {explicitRoleLabel}
        </>
      ),
    };
  });
  const wildcardUsageItems = wildcardUsageElements.map((elementName) => {
    const elementDisplayName =
      htmlElementsToDisplayNames[elementName] || elementName;

    return {
      key: elementName,
      label: (
        <>
          {elementDisplayName}
          {`[role=${role}]`}
        </>
      ),
    };
  });
  const hasExplicitUsageItems = explicitUsageItems.length > 0;
  const hasWildcardUsageItems = wildcardUsageItems.length > 0;
  const contextRoles = mappedAriaRolesToContextRoles[role] || [];
  const hasContextRoles = contextRoles.length > 0;
  const hasPresentationalChildren =
    ariaRolesWithPresentationalChildren.includes(role);
  const roleLinks = Object.entries(links).map(([name, link]) => ({
    name,
    href: link + role,
  }));

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <title>{pageDocumentTitle}</title>
        <meta name="description" content={roleMetaDescription} />
        <link rel="stylesheet" href="/styles.css" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="h-full overflow-hidden">
        <IconDefinitions />
        <div className="flex h-full min-h-0 flex-col print:contents max-[720px]:[&:has(#menu-visibility-switch:not(:checked))_#nav]:hidden max-[720px]:[&:has(#menu-visibility-switch:checked)_main]:hidden">
          <header
            role="banner"
            className="relative grid border-b border-white/20 bg-[linear-gradient(120deg,var(--app-header-start),var(--app-header-end))] p-4 pt-[calc(1rem+env(safe-area-inset-top))] pl-[calc(1rem+env(safe-area-inset-left))] pr-[calc(1rem+env(safe-area-inset-right))] text-white touch-none max-[720px]:grid-cols-[minmax(0,1fr)_auto] max-[720px]:items-center max-[720px]:gap-4 print:hidden"
          >
            <a
              href="/"
              className="m-0 self-center font-bold uppercase leading-tight tracking-[0.22rem] text-white [text-shadow:0_1px_0_rgba(0,0,0,0.45)] min-[721px]:text-center focus-visible:outline-4 focus-visible:outline-dashed"
            >
              {pageTitle}
            </a>
            <MenuVisibilitySwitch />
          </header>
          <div className="flex min-h-0 flex-1 flex-col min-[721px]:flex-row">
            <div
              className="min-h-0 overflow-y-auto border-r border-black/10 bg-[var(--panel-bg)] p-4 pl-[calc(1rem+env(safe-area-inset-left))] backdrop-blur-[10px] min-[721px]:w-[280px] min-[721px]:shrink-0 dark:border-white/10 print:hidden"
              id="nav"
            >
              <Navigation role={role} />
            </div>
            <main className="min-h-0 overflow-y-auto p-4 pr-[calc(1rem+env(safe-area-inset-right))] text-lg min-[721px]:min-w-0 min-[721px]:flex-1 min-[721px]:p-12 min-[721px]:pr-[calc(3rem+env(safe-area-inset-right))] print:[&_a]:font-bold print:[&_a]:no-underline print:[&_a]:text-inherit">
              <div
                className="w-full min-[721px]:mx-auto min-[721px]:max-w-[860px] [&_a:focus-visible]:outline-offset-4"
                data-role={role}
                data-abstract-role={abstractAriaRole}
              >
                <div className="mb-4 flex">
                  <div className="mb-2 flex flex-1 flex-col items-start gap-2">
                    <div className="flex flex-col gap-4">
                      <h1
                        className="m-0 text-4xl leading-tight tracking-[-0.1rem] text-[var(--title-ink)] max-[320px]:text-[1.75rem]"
                        id={role}
                        aria-label={pageHeading}
                        tabIndex={-1}
                        dangerouslySetInnerHTML={pageHeadingHtml}
                      ></h1>
                    </div>
                    <div className="flex flex-wrap gap-3 print:hidden">
                      {roleLinks.map(({ name, href }) => (
                        <a
                          className="inline-flex items-center gap-1 rounded-md border border-[var(--panel-border)] bg-[var(--panel-bg)] px-3 py-1 text-sm font-bold no-underline transition-colors duration-200 hover:bg-[linear-gradient(120deg,rgba(248,150,97,0.22)_0%,var(--accent-soft)_100%)]"
                          key={href}
                          href={href}
                          target="_blank"
                        >
                          {name}
                          <ExternalLinkIcon />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="my-2 flex flex-col gap-4">
                    <RoleSection id="h2--semantics" title="Semantics">
                      <p className="block text-[1.25em] font-bold leading-tight">
                        {roleDescription}
                      </p>
                      {hasRoleAdditionalDescription && (
                        <details className="text-[0.875em]">
                          <summary>
                            Additional info from the ARIA specification
                          </summary>
                          <div className="pl-8 mt-2 [&_p]:my-3 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0">
                            {roleAdditionalDescription}
                          </div>
                        </details>
                      )}
                    </RoleSection>
                    {hasAbstractAriaRoleTags && (
                      <RoleSection
                        id="h2--abstract-roles"
                        title="Abstract Role"
                      >
                        <DetailList>
                          {abstractAriaRoleTags.map(({ tagName, raw }) => (
                            <li
                              className="flex items-start gap-2"
                              key={"abstract-role-" + raw}
                            >
                              <svg
                                className="h-8 w-8 flex-none"
                                fill="none"
                                aria-hidden="true"
                                viewBox="0 0 542 542"
                              >
                                <use href={`#icon--${raw}`}></use>
                              </svg>
                              <p className="m-0 min-w-0 flex-1">
                                <dfn className="block text-[1.25em] font-bold leading-tight not-italic">
                                  {tagName}
                                </dfn>
                                <span className="block text-[0.875em]">
                                  {mappedAbstractAriaRolesToDescriptions[raw]}
                                </span>
                              </p>
                            </li>
                          ))}
                        </DetailList>
                        {showAbstractAriaRoleContextNote && (
                          <p>
                            May be an interactive Widget or non-interactive
                            Structure, depending on the context.
                          </p>
                        )}
                      </RoleSection>
                    )}
                    {hasContentCategoryTags && (
                      <RoleSection
                        id="h2--content-categories"
                        title="Content Categories"
                      >
                        <DetailList>
                          {contentCategoryTags.map(({ tagName, raw }) => (
                            <li
                              className="flex items-start gap-2"
                              key={"content-category-" + raw}
                            >
                              <svg
                                className="h-8 w-8 flex-none"
                                fill="none"
                                aria-hidden="true"
                                viewBox="0 0 542 542"
                              >
                                <use href={`#icon--${raw}`}></use>
                              </svg>
                              <p className="m-0 min-w-0 flex-1">
                                <dfn className="block text-[1.25em] font-bold leading-tight not-italic">
                                  {tagName} Content
                                </dfn>
                                <span className="block text-[0.875em]">
                                  {mappedContentTypesToDescriptions[raw]}
                                </span>
                              </p>
                            </li>
                          ))}
                        </DetailList>
                      </RoleSection>
                    )}
                    {!hasContentCategoryTags && (
                      <RoleSection
                        id="h2--content-category"
                        title="Content Category"
                      >
                        <div className="flex items-center gap-2">
                          <svg
                            className="h-8 w-8 flex-none"
                            fill="none"
                            aria-hidden="true"
                            viewBox="0 0 542 542"
                          >
                            <use href="#icon--parent"></use>
                          </svg>
                          <p className="m-0 text-[1.25em] font-bold leading-tight">
                            Only Used with Specific Parent Roles
                          </p>
                        </div>
                        <p>
                          This role must be a direct descendant of one of the
                          following roles:
                        </p>
                        {hasContextRoles && (
                          <BulletList>
                            {contextRoles.map((contextRole: string) => (
                              <li key={contextRole}>
                                <code>{contextRole}</code>
                              </li>
                            ))}
                          </BulletList>
                        )}
                      </RoleSection>
                    )}
                    <RoleSection
                      id="h2--allowed-descendants"
                      title="Allowed Descendants"
                    >
                      <div className="flex items-center gap-2">
                        <svg
                          className="h-8 w-8 flex-none"
                          fill="none"
                          aria-hidden="true"
                          viewBox="0 0 542 542"
                        >
                          <use href="#icon--children"></use>
                        </svg>
                        <p className="m-0 text-[1.25em] font-bold leading-tight">
                          {allowedDescendantTitle}
                        </p>
                      </div>
                      {allowedDescendantNote && <p>{allowedDescendantNote}</p>}
                    </RoleSection>
                    {hasPresentationalChildren && (
                      <RoleSection
                        id="h2--presentational-children"
                        title="Note"
                      >
                        <div className="flex items-center gap-2">
                          <svg
                            className="h-8 w-8 flex-none"
                            fill="none"
                            aria-hidden="true"
                            viewBox="0 0 542 542"
                          >
                            <use href="#icon--warning"></use>
                          </svg>
                          <p className="m-0 text-[1.25em] font-bold leading-tight">
                            Children Become Presentational
                          </p>
                        </div>
                        <p className="pl-10 text-[0.875em]">
                          Browsers automatically apply the{" "}
                          <code>presentation</code> role to all descendant
                          elements, so their semantics are not conveyed to
                          assistive technologies.
                        </p>
                      </RoleSection>
                    )}
                    <RoleSection id="h2--usage" title="Usage">
                      <div className="flex items-center gap-2">
                        <svg
                          className="h-8 w-8 flex-none"
                          fill="none"
                          aria-hidden="true"
                          viewBox="0 0 542 542"
                        >
                          <use href="#icon--html"></use>
                        </svg>
                        <p className="m-0 text-[1.25em] font-bold leading-tight">
                          Allowed HTML elements
                        </p>
                      </div>
                      <h3 className="my-[0.25em] text-[0.9em] font-bold leading-tight">
                        Explicitly allowed
                      </h3>
                      <BulletList>
                        {explicitUsageItems.map(({ key, label }) => (
                          <li key={key}>
                            <code>{label}</code>
                          </li>
                        ))}
                        {!hasExplicitUsageItems && (
                          <li key="explicit-none">None</li>
                        )}
                      </BulletList>
                      <h3 className="my-[0.25em] text-[0.9em] font-bold leading-tight">
                        Elements that can have any role
                      </h3>
                      <BulletList>
                        {wildcardUsageItems.map(({ key, label }) => (
                          <li key={key}>
                            <code>{label}</code>
                          </li>
                        ))}
                        {!hasWildcardUsageItems && (
                          <li key="wildcard-none">None</li>
                        )}
                      </BulletList>
                    </RoleSection>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
