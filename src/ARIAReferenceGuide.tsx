import fs from "fs";
import path from "path";

import { About } from "./About";
import { IconDefinitions } from "./Icons";
import { MenuButton } from "./MenuButton";
import { Navigation } from "./Navigation";
import colorsCss from "./colors.css";

export function ARIAReferenceGuide() {
  const scripts = fs.readFileSync(path.resolve("./src/scripts.js"), "utf8");
  const styles = `${fs.readFileSync(
    path.resolve("./src/styles.css"),
    "utf8"
  )} ${colorsCss}`;
  const pageTitle = "ARIA Reference Guide";

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>ARIA Reference Guide</title>
        <meta
          name="description"
          content="This representation of ARIA roles contains links to each role that will take you to a page with more information about the role."
        />
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
