import { IconDefinitions } from "../components/Icons";
import { Navigation } from "../components/Navigation";
import { Overview } from "../components/Overview";
import { CustomElement } from "../types";

export function IndexPage() {
  const pageTitle = "ARIA Reference Guide";

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="This representation of ARIA roles contains links to each role that will take you to a page with more information about the role."
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="stylesheet" href="/styles.css" />
        <script src="/scripts.js"></script>
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
              <Navigation />
            </div>
            <main className="main">
              <Overview />
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "menu-visibility-switch": CustomElement;
    }
  }
}
