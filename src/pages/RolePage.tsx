import { raw } from "express";
import {
  allowedAriaRolesByHtmlElement,
  ariaRolesByAbstractRole,
  ariaRolesWithPresentationalChildren,
  ariaToHtmlMapping,
  htmlElementsToDisplayNames,
  links,
  mappedAbstractAriaRolesToTitles,
  mappedAbstractAriaRolesToUrls,
  mappedAriaRolesToAllowedDescendants,
  mappedAriaRolesToContentCategories,
  mappedAriaRolesToContextRoles,
  mappedAriaRolesToDescriptions,
  mappedAriaRolesToDisplayNames,
  mappedAriaRolesToNotes,
  mappedContentTypesToTitles,
  mappedContentTypesToUrls,
} from "../../data";
import { ExternalLinkIcon, IconDefinitions } from "../components/Icons";
import { MenuButton } from "../components/MenuButton";
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

export function RolePage({ role, abstractAriaRole }: RolePageProps) {
  const roleTitle = mappedAriaRolesToDisplayNames[role] || role;
  const pageTitle = "ARIA Reference Guide";

  const abstractAriaRoleTags = Object.entries(ariaRolesByAbstractRole)
    .filter(([, value]) => value.includes(role))
    .map(([key]) => key)
    .sort()
    .map((key) => ({
      tagName: mappedAbstractAriaRolesToTitles[key] || key,
      url: mappedAbstractAriaRolesToUrls[key] || "",
      raw: key,
    }));

  const contentCategories = mappedAriaRolesToContentCategories[role] || [];

  const filteredContentCategories = contentCategories.filter(
    (contentCategory: string) =>
      ["flow", "phrasing", "interactive"].includes(contentCategory)
  );

  if (
    filteredContentCategories.includes("flow") &&
    filteredContentCategories.includes("phrasing")
  ) {
    // All `phrasing` roles are also `flow` roles
    filteredContentCategories.splice(
      filteredContentCategories.indexOf("flow"),
      1
    );
  }

  const contentCategoryTags: Tag[] = filteredContentCategories
    .sort()
    .map((contentCategory: string) => ({
      tagName: mappedContentTypesToTitles[contentCategory] || contentCategory,
      url: mappedContentTypesToUrls[contentCategory] || "",
      raw: contentCategory,
    }));

  const contextTags: Tag[] = mappedAriaRolesToContextRoles[role]
    ? [
        {
          tagName: "Required Context",
          url: "https://www.w3.org/TR/wai-aria-1.2/#scope",
          raw: "required-context",
        },
      ]
    : [];

  const otherTags = [...contentCategoryTags, ...contextTags];

  const hasTags = abstractAriaRoleTags.length || otherTags.length;

  const mayBeInteractive = abstractAriaRoleTags.length > 1;

  const allowedContent = mappedAriaRolesToAllowedDescendants[role] || "N/A";

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <title>{`The ${role} role - ${pageTitle}`}</title>
        <meta
          name="description"
          content={mappedAriaRolesToDescriptions[role]}
        />
        <link rel="stylesheet" href="/styles.css" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <IconDefinitions />
        <div className="container">
          <header className="page-header">
            <a href="/" className="page-heading">
              {pageTitle}
            </a>
          </header>
          <MenuButton />
          <Navigation role={role} />
          <main>
            <div
              className={`content content--is-aria-role-${role} content--abstract-role-${abstractAriaRole}`}
            >
              <div className="content__header">
                <div className="content__header__info">
                  <div className="content__heading__container">
                    <h1
                      className="content__heading"
                      id={role}
                      aria-label={`The ${role} role`}
                      tabIndex={-1}
                      dangerouslySetInnerHTML={{
                        __html: `<span aria-hidden="true">The ${roleTitle} role</span>`,
                      }}
                    ></h1>
                  </div>
                  <div className="content__links">
                    {Object.entries(links).map(([name, link]) => (
                      <a key={link} href={link + role} target="_blank">
                        {name}
                        <ExternalLinkIcon />
                      </a>
                    ))}
                  </div>
                  {hasTags ? (
                    <p className="content__tags">
                      {abstractAriaRoleTags.map(({ tagName, url, raw }) => (
                        <a
                          key={tagName}
                          href={url}
                          target="_blank"
                          className={`
                            content__tag
                            content__tag--abstract-aria-role--${raw}
                          `}
                        >
                          {tagName}
                          <ExternalLinkIcon />
                        </a>
                      ))}
                      {otherTags.map(({ tagName, url }) => (
                        <a
                          key={tagName}
                          href={url}
                          target="_blank"
                          className="content__tag"
                        >
                          {tagName}
                          <ExternalLinkIcon />
                        </a>
                      ))}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="content__details">
                <h2 className="aria-role__subheading">Description</h2>
                <p>{mappedAriaRolesToDescriptions[role] || "--"}</p>

                {mayBeInteractive ? (
                  <>
                    <h2 className="aria-role__subheading">Note</h2>
                    <p>
                      *May be interactive or non-interactive depending on the
                      context: {mappedAriaRolesToNotes[role] || ""}
                    </p>
                  </>
                ) : null}

                <h2 className="aria-role__subheading">Allowed Content</h2>
                <p>{allowedContent}</p>

                {ariaRolesWithPresentationalChildren.includes(role) && (
                  <p>
                    Browsers automatically apply the presentation role to all
                    descendant elements.{" "}
                    <em>
                      The semantics of any descendant elements are not conveyed
                      to assistive technologies.
                    </em>
                  </p>
                )}

                {mappedAriaRolesToContextRoles[role] && (
                  <>
                    <h2 className="aria-role__subheading">
                      Required Context Roles
                    </h2>
                    <ul className="list">
                      {mappedAriaRolesToContextRoles[role].map(
                        (contextRole: string) => (
                          <li key={contextRole}>{contextRole}</li>
                        )
                      )}
                    </ul>
                  </>
                )}

                <h2 className="aria-role__subheading">
                  HTML Elements with Implicit ARIA Role
                </h2>
                {(ariaToHtmlMapping[role] || []).length ? (
                  <ul className="list">
                    {ariaToHtmlMapping[role]
                      .sort()
                      .map((elementName: string) => (
                        <li key={elementName}>
                          <code>
                            {htmlElementsToDisplayNames[elementName] ||
                              elementName}
                          </code>
                        </li>
                      ))}
                  </ul>
                ) : (
                  <p>(None)</p>
                )}

                <h2 className="aria-role__subheading">Allowed HTML Elements</h2>
                <ul className="list">
                  {Array.from(
                    new Set(
                      Object.entries(allowedAriaRolesByHtmlElement)
                        .filter(([_, roles]) => roles.includes(role))
                        .map(([elementName]) => elementName)
                        .concat(ariaToHtmlMapping[role] || [])
                    )
                  ).map((elementName) => (
                    <li key={elementName}>
                      <code>
                        {htmlElementsToDisplayNames[elementName] || elementName}
                      </code>
                      {(ariaToHtmlMapping[role] || []).includes(elementName)
                        ? " (role attribute unnecessary)"
                        : ""}
                    </li>
                  ))}
                  <li key="any">
                    <code>div</code>, <code>span</code>, <code>p</code>, other
                    elements that can receive any role
                  </li>
                </ul>
              </div>
            </div>
          </main>
        </div>
        <script src="/scripts.js"></script>
      </body>
    </html>
  );
}
