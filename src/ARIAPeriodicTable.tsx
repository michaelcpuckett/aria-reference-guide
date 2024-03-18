import {
  abstractAriaRolesByType,
  ariaRolesByCategory,
  mappedAbstractAriaRolesToTitles,
  mappedAriaRolesToDisplayNames,
} from "../data";
import { Dialog } from "./Dialog";

import scripts from "./scripts";
import styles from "./styles";

export function ARIAPeriodicTable() {
  return (
    <html lang="en">
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Periodic Table of ARIA Roles</title>
      <style
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
      <div className="container">
        <header role="banner" className="header">
          <h1 className="heading" id="heading">
            Periodic Table of ARIA Roles
          </h1>
        </header>
        <menu-button>
          <button
            aria-expanded="false"
            aria-controls="menu"
            type="button"
            className="menu-button"
          >
            <svg
              data-show="off"
              data-icon="menu"
              viewBox="0 0 100 80"
              width="1rem"
              height="1rem"
              fill="none"
            >
              <rect fill="currentColor" width="100" height="16"></rect>
              <rect fill="currentColor" y="32" width="100" height="16"></rect>
              <rect fill="currentColor" y="64" width="100" height="16"></rect>
            </svg>
            <span data-show="off">Menu</span>
            <svg
              data-show="on"
              data-icon="close"
              width="1rem"
              height="1rem"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                fill="currentColor"
              />
            </svg>
            <span data-show="on">Close</span>
          </button>
        </menu-button>
        <nav role="navigation" className="nav">
          <div className="nav__inner-container">
            <ul className="nav__list" id="menu">
              {Object.entries(abstractAriaRolesByType).map(
                ([type, abstractRoles]) => {
                  return abstractRoles.map((abstractRole, index) => {
                    const abstractRoleDisplayName =
                      mappedAbstractAriaRolesToTitles[abstractRole] ||
                      abstractRole;

                    return (
                      <li
                        key={abstractRole}
                        className={`nav__list-item nav__list-item--${abstractRole}`}
                      >
                        <details
                          name="accordion"
                          className="nav__list-item__details"
                          open={index === 0}
                        >
                          <summary className="nav__list-item__summary">
                            {abstractRoleDisplayName}s
                          </summary>
                          <ul
                            aria-label={`${abstractRole} Roles`}
                            className="nav__list-item__sublist"
                          >
                            {ariaRolesByCategory[abstractRole].map((role) => {
                              const roleDisplayName =
                                mappedAriaRolesToDisplayNames[role] || role;

                              return (
                                <li
                                  key={role}
                                  className="nav__list-item__sublist-item"
                                >
                                  <a
                                    href={`#${role}`}
                                    aria-label={role}
                                    className="nav__list-item__sublist-item__link"
                                    dangerouslySetInnerHTML={{
                                      __html: roleDisplayName,
                                    }}
                                  />
                                </li>
                              );
                            })}
                          </ul>
                        </details>
                      </li>
                    );
                  });
                }
              )}
            </ul>
          </div>
        </nav>
      </div>

      <main>
        <header aria-hidden="true" className="header">
          <h1 className="heading">Periodic Table of ARIA Roles</h1>
        </header>
        <Dialog heading="About" classes="about-dialog" id="about">
          <>
            <p>
              ARIA, which stands for Accessible Rich Internet Applications, is a
              set of attributes that define ways to make web content and web
              applications (especially those developed with JavaScript) more
              accessible to people with disabilities.
            </p>
            <p>
              This periodic table is a visual representation of the ARIA roles
              and their relationships. It is intended to be a reference for web
              developers and designers to help them understand the relationships
              between different ARIA roles and their parent/child relationships.
              The table is divided into different sections based on the type of
              ARIA role, and each section is further divided into different ARIA
              roles.
            </p>
          </>
        </Dialog>
      </main>

      <script
        dangerouslySetInnerHTML={{
          __html: scripts,
        }}
      ></script>
    </html>
  );
}
