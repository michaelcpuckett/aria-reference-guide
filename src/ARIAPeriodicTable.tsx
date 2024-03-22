import {
  abstractAriaRolesByType,
  ariaRolesByAbstractRole,
  mappedAbstractAriaRolesToDescriptions,
  mappedAbstractAriaRolesToTitles,
  mappedAriaRolesToDisplayNames,
} from "../data";

import scripts from "./scripts";
import styles from "./styles";

export function ARIAPeriodicTable() {
  return (
    <html lang="en">
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>ARIA Reference Guide</title>
      <style
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
      <div hidden>
        <svg id="external-link-icon" viewBox="0 0 24 24">
          <path
            d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="container">
        <header className="header">
          <span className="page-heading">ARIA Reference Guide</span>
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
        <nav className="nav" id="menu">
          <div className="nav__inner-container">
            <ul className="nav__list">
              {Object.entries(abstractAriaRolesByType).map(
                ([, abstractRoles]) => {
                  return abstractRoles.map((abstractRole, index) => {
                    const abstractRoleDisplayName =
                      mappedAbstractAriaRolesToTitles[abstractRole] ||
                      abstractRole;
                    const abstractRoleDescription =
                      mappedAbstractAriaRolesToDescriptions[abstractRole] || "";

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
                                      href={`#${role}`}
                                      aria-label={role}
                                      aria-haspopup="dialog"
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
                  });
                }
              )}
            </ul>
          </div>
        </nav>
      </div>

      <main>
        <div aria-hidden="true" className="header">
          <span className="heading">ARIA Reference Guide</span>
        </div>
        <div className="dialog" id="about">
          <div className="dialog__content">
            <div className="dialog__header">
              <div className="dialog__header__info">
                <h1
                  className="dialog__heading"
                  id="dialog__heading--about"
                  tabIndex={-1}
                >
                  About
                </h1>
              </div>
            </div>
            <div className="aria-role__details">
              <p>
                <span role="term">ARIA</span>
                <span aria-hidden="true"> — </span>
                <span role="definition">
                  Accessible Rich Internet Applications
                </span>
                <span aria-hidden="true"> — </span>is a set of attributes that
                define ways to make web content more accessible to users of
                assistive technologies, such as screen readers and refreshable
                braille displays.
              </p>
              <p>
                This representation of ARIA roles is intended to be a reference
                for web developers and designers. The ARIA roles are grouped by
                abstract ARIA role. Each role is a link that will take you to a
                page with more information about the role.
              </p>
            </div>
          </div>
        </div>
      </main>

      <script
        dangerouslySetInnerHTML={{
          __html: scripts,
        }}
      ></script>
    </html>
  );
}
