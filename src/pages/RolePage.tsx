import {
  allowedAriaRolesByHtmlElement,
  ariaRolesByAbstractRole,
  ariaRolesWithPresentationalChildren,
  ariaToHtmlMapping,
  htmlElementsToDisplayNames,
  links,
  mappedAbstractAriaRolesToDescriptions,
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
import { mappedContentTypesToDescriptions } from "../../data/mappedContentTypesToDescriptions";
import { ExternalLinkIcon, IconDefinitions } from "../components/Icons";
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

  const allowedContent = mappedAriaRolesToAllowedDescendants[role] || ["N/A"];

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
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
        <div className="root">
          <header role="banner" className="top">
            <a href="/" className="page-heading">
              {pageTitle}
            </a>
            <menu-visibility-switch>
              <label className="switch" id="menu-visibility-switch-label">
                <span className="visually-hidden">Toggle Menu</span>
                <input
                  id="menu-visibility-switch"
                  type="checkbox"
                  className="visually-hidden"
                  role="switch"
                />
                <svg
                  data-if-unchecked
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6H20M4 12H20M4 18H20"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <svg
                  aria-hidden="true"
                  data-if-checked
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                    fill="#0F1729"
                  />
                </svg>
              </label>
            </menu-visibility-switch>
          </header>
          <div className="middle">
            <div className="menu">
              <Navigation role={role} />
            </div>
            <main className="main">
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
                  </div>
                </div>
                <div className="content__details">
                  <h2 className="aria-role__subheading">Description</h2>
                  <p>{mappedAriaRolesToDescriptions[role] || "--"}</p>

                  {mayBeInteractive ? (
                    <>
                      <h2 className="aria-role__subheading">Note</h2>
                      <p>
                        May be interactive or non-interactive depending on the
                        context: {mappedAriaRolesToNotes[role] || ""}
                      </p>
                    </>
                  ) : null}

                  <h2 className="aria-role__subheading">
                    Abstract Ancestor Roles
                  </h2>
                  <ul className="list">
                    {abstractAriaRoleTags.map(({ tagName, url, raw }) => (
                      <li key={tagName}>
                        <b>{tagName}</b> -{" "}
                        {mappedAbstractAriaRolesToDescriptions[raw]}
                      </li>
                    ))}
                  </ul>

                  <h2 className="aria-role__subheading">Content Categories</h2>
                  <ul className="list">
                    {contentCategoryTags.map(({ tagName, raw, url }) => (
                      <li key={tagName}>
                        <b>{tagName}</b> -{" "}
                        {mappedContentTypesToDescriptions[raw]}
                      </li>
                    ))}
                    {!contentCategoryTags.length && (
                      <li key="none">
                        Can only be used when a descendant of specific elements.
                      </li>
                    )}
                  </ul>

                  <h2 className="aria-role__subheading">Allowed Content</h2>
                  <ul className="list">
                    {ariaRolesWithPresentationalChildren.includes(role) && (
                      <li>
                        Browsers automatically apply the{" "}
                        <strong>presentation</strong> role to all descendant
                        elements, so the semantics of any descendant elements
                        are not conveyed to assistive technologies.
                      </li>
                    )}
                    {allowedContent.map((item) => {
                      const isArray = Array.isArray(item);

                      if (isArray) {
                        const [type, description] = item;

                        return (
                          <li key={description}>
                            {type !== "specific" ? (
                              <>
                                <b>{mappedContentTypesToTitles[type]}</b> -{" "}
                              </>
                            ) : null}
                            {description}
                          </li>
                        );
                      }

                      return (
                        <li key={item}>
                          <b>{mappedContentTypesToTitles[item]}</b>
                        </li>
                      );
                    })}
                  </ul>

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

                  <h2 className="aria-role__subheading">
                    Allowed HTML Elements
                  </h2>
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
                          {htmlElementsToDisplayNames[elementName] ||
                            elementName}
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
        </div>
        <script src="/scripts.js"></script>
      </body>
    </html>
  );
}
