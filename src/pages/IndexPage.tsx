import { Overview } from "../components/Overview";
import { IconDefinitions } from "../components/Icons";
import { MenuButton } from "../components/MenuButton";
import { Navigation } from "../components/Navigation";

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
        <link rel="stylesheet" href="styles.css" />
      </head>
      <body>
        <IconDefinitions />
        <div className="container">
          <header className="page-header">
            <a href="#" className="page-heading">
              {pageTitle}
            </a>
          </header>
          <MenuButton />
          <Navigation />
        </div>
        <main>
          {/*
            The header is repeated here for layout purposes.
          */}
          <div hidden aria-hidden="true" className="page-header">
            <span className="page-heading">{pageTitle}</span>
          </div>
          <Overview />
        </main>
        <script src="scripts.js"></script>
      </body>
    </html>
  );
}
