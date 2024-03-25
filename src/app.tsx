import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";
import beautify from "diffable-html";

import fs from "fs";
import path from "path";

import { ariaRolesByAbstractRole } from "../data";
import { IndexPage } from "./components/IndexPage";
import { Role } from "./components/Role";

import getScripts from "./getScripts";
import getStyles from "./getStyles";

const app = express();

/**
 * This route serves the Index page, with formatting preserved.
 *
 * The rendered HTML file is also saved to public/index.html.
 */
app.get("/", async (_, res) => {
  const scripts = (await getScripts()).replace(/\n/g, "\n      ");
  const styles = getStyles().replace(/\n/g, "\n      ");

  const headHtml = `
  <head>
    <meta charSet="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, viewport-fit=cover"
    />
    <title>ARIA Reference Guide</title>
    <meta
      name="description"
      content="This representation of ARIA roles contains links to each role that will take you to a page with more information about the role."
    />`;

  const bodyHtml = beautify(
    ReactDOMServer.renderToString(<IndexPage />)
  ).replace(/\n/g, "\n    ");

  const htmlResult = `<!doctype html>
  <html lang="en">${headHtml}
    <style>
      ${styles}
    </style>
  </head>
  <body>${bodyHtml}<script>
      ${scripts}
    </script>
  </body>
</html>`;

  fs.writeFileSync(path.resolve("./public/", "index.html"), htmlResult, "utf8");

  res.send(htmlResult);
});

/**
 * This route serves the Role pages.
 *
 * The rendered HTML files are also saved to public/role.
 */
app.get("/role/:role.html", (req, res) => {
  const [abstractRole] =
    Object.entries(ariaRolesByAbstractRole)
      .sort(([a], [b]) => (a > b ? 1 : -1))
      .find(([_, roles]) => roles.includes(req.params.role)) || [];

  if (!abstractRole) {
    return res.status(404).send("Role not found");
  }

  const htmlResult = `<!doctype html>
    <html>
      <meta charSet="utf-8" />
      ${ReactDOMServer.renderToString(
        <Role role={req.params.role} abstractAriaRole={abstractRole} />
      )}
    </html>
  `;

  fs.writeFileSync(
    path.resolve("./public/role/", `${req.params.role}.html`),
    htmlResult,
    "utf8"
  );
  res.send(htmlResult);
});

/**
 * This route fetches all the pages, which builds the static site.
 */
app.get("/build", (req, res) => {
  const allAriaRoles = Object.values(ariaRolesByAbstractRole).flat();

  const promises = allAriaRoles.map((role) => {
    return fetch(`http://localhost:10101/role/${role}.html`);
  });

  Promise.all([fetch("http://localhost:10101"), ...promises]).then(() => {
    res.send("done");
  });
});

app.listen(10101, () => {
  console.log("Running on 10101");
});
