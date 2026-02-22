import express from "express";
import ReactDOMServer from "react-dom/server";

import fs from "fs";
import path from "path";

import { ariaRolesByAbstractRole } from "../data";
import { IndexPage } from "./pages/IndexPage";
import { RolePage } from "./pages/RolePage";

import getStyles from "./getStyles";

const app = express();

function writePublicFile(filePath: string, content: string) {
  const resolvedPath = path.resolve(filePath);

  fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });
  fs.writeFileSync(resolvedPath, content, "utf8");
}

/**
 * This route serves the Index page, with formatting preserved.
 *
 * The rendered HTML file is also saved to public/index.html.
 */
app.get("/", async (_, res) => {
  const bodyHtml = ReactDOMServer.renderToString(<IndexPage />);
  const htmlResult = "<!doctype html>" + bodyHtml;

  writePublicFile("./public/index.html", htmlResult);

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
    ${ReactDOMServer.renderToString(
      <RolePage role={req.params.role} abstractAriaRole={abstractRole} />
    )}
  `;

  writePublicFile(`./public/role/${req.params.role}.html`, htmlResult);

  res.send(htmlResult);
});

app.get("/styles.css", async (req, res) => {
  const cssResult = await getStyles();

  writePublicFile("./public/styles.css", cssResult);

  res.setHeader("Content-Type", "text/css");
  res.send(cssResult);
});

/**
 * This route fetches all the pages, which builds the static site.
 */
app.get("/build", (req, res) => {
  const allAriaRoles = Object.values(ariaRolesByAbstractRole).flat();

  const fetchPromises = allAriaRoles.map((role) => {
    return fetch(`http://localhost:10101/role/${role}.html`);
  });

  Promise.all([
    fetch("http://localhost:10101"),
    fetch("http://localhost:10101/styles.css"),
    ...fetchPromises,
  ]).then(() => {
    res.send("done");
  });
});

app.listen(10101, () => {
  console.log("Running on 10101");
});
