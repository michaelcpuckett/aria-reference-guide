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
        <link rel="stylesheet" href="/styles.css" />
        <link rel="manifest" href="/manifest.json" />
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
          <main>
            <Overview />
          </main>
        </div>
        <script src="/scripts.js"></script>
      </body>
    </html>
  );
}
