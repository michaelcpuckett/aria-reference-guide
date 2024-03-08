import { AbstractARIARole } from "./AbstractARIARole";
import {
  abstractAriaRolesByType,
  ariaRolesByCategory,
  mappedAbstractAriaRolesToDescriptions,
  mappedAbstractAriaRolesToTitles,
} from "../data";

import scripts from "./scripts";
import styles from "./styles";

export function ARIAPeriodicTable() {
  const dialogElements: JSX.Element[] = [];

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
      <header role="banner" className="page-header">
        <h1
          className="periodic-table__heading"
          id="h1-title"
          aria-label="Periodic Table of ARIA Roles"
        >
          Periodic&nbsp;Table&nbsp;of&nbsp;
          <wbr />
          ARIA&nbsp;Roles
        </h1>
      </header>
      <div className="container">
        <main>
          <span id="list-title" hidden>
            ARIA Roles by Abstract Role
          </span>
          <div
            role="list"
            className="periodic-table__root"
            aria-labelledby="list-title"
          >
            {Object.entries(abstractAriaRolesByType).map(
              ([type, abstractAriaRoles]) => {
                return abstractAriaRoles.map((abstractAriaRole) => {
                  const ariaRoles = ariaRolesByCategory[abstractAriaRole] || [];

                  const description =
                    mappedAbstractAriaRolesToDescriptions[abstractAriaRole];
                  const abstractTitle =
                    mappedAbstractAriaRolesToTitles[abstractAriaRole];

                  return (
                    <AbstractARIARole
                      key={abstractAriaRole}
                      abstractAriaRole={abstractAriaRole}
                      abstractTitle={abstractTitle}
                      description={description}
                      type={type}
                      ariaRoles={ariaRoles}
                      dialogElements={dialogElements}
                    />
                  );
                });
              }
            )}
          </div>
        </main>

        <dialog
          className="dialog dialog--about"
          id="about"
          aria-labelledby="dialog__heading--about"
        >
          <div className="dialog__content dialog__content--about">
            <div
              role="region"
              aria-label="Scrollable Dialog Content"
              tabIndex={-1}
            >
              <h2
                className="dialog__heading dialog__heading--about"
                id="dialog__heading--about"
              >
                About
              </h2>
              <p>
                ARIA, which stands for Accessible Rich Internet Applications, is
                a set of attributes that define ways to make web content and web
                applications (especially those developed with JavaScript) more
                accessible to people with disabilities.
              </p>
              <p>
                This periodic table is a visual representation of the ARIA roles
                and their relationships. It is intended to be a reference for
                web developers and designers to help them understand the
                relationships between different ARIA roles and their
                parent/child relationships. The table is divided into different
                sections based on the type of ARIA role, and each section is
                further divided into different ARIA roles.
              </p>
            </div>
          </div>
        </dialog>

        {dialogElements}
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: scripts,
        }}
      ></script>
    </html>
  );
}
