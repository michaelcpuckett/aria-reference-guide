import { About } from "./About";
import { ExternalLinkIcon, IconDefinitions } from "./Icons";
import { MenuButton } from "./MenuButton";
import { Navigation } from "./Navigation";

import scripts from "./scripts";
import styles from "./styles";

export function ARIAReferenceGuide() {
  const pageTitle = "ARIA Reference Guide";

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>ARIA Reference Guide</title>
        <style
          dangerouslySetInnerHTML={{
            __html: styles,
          }}
        />
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
          <div aria-hidden="true" className="page-header">
            <span className="page-heading">{pageTitle}</span>
          </div>
          <About />
        </main>

        <script
          dangerouslySetInnerHTML={{
            __html: scripts,
          }}
        ></script>
      </body>
    </html>
  );
}
