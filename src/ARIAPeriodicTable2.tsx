import { AbstractARIARole2 } from "./AbstractARIARole2";
import {
  abstractAriaRolesByType,
  ariaRolesByCategory,
  mappedAbstractAriaRolesToTitles,
  mappedAriaRolesToDisplayNames,
} from "../data";

import scripts from "./scripts2";
import styles from "./styles2";

export function ARIAPeriodicTable2() {
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
      <main className="container">
        <header role="banner" className="header">
          <h1 className="heading" id="heading">
            Periodic Table of ARIA Roles
          </h1>
        </header>
        <nav role="navigation" className="nav">
          <div className="nav__inner-container">
            <details className="nav__details" open>
              <summary className="nav__summary">
                ARIA Roles by Abstract Role
              </summary>
              <ul className="nav__list">
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
            </details>
          </div>
        </nav>

        <dialog aria-modal="false" aria-labelledby="dialog__heading--about">
          <h2
            className="dialog__heading dialog__heading--about"
            id="dialog__heading--about"
          >
            About
          </h2>
          <p>
            ARIA, which stands for Accessible Rich Internet Applications, is a
            set of attributes that define ways to make web content and web
            applications (especially those developed with JavaScript) more
            accessible to people with disabilities.
          </p>
          <p>
            This periodic table is a visual representation of the ARIA roles and
            their relationships. It is intended to be a reference for web
            developers and designers to help them understand the relationships
            between different ARIA roles and their parent/child relationships.
            The table is divided into different sections based on the type of
            ARIA role, and each section is further divided into different ARIA
            roles.
          </p>
        </dialog>
      </main>

      <script
        dangerouslySetInnerHTML={{
          __html: scripts,
        }}
      ></script>
    </html>
  );
}
