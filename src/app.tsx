import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";

import fs from "fs";
import path from "path";

import { ariaRolesByAbstractRole } from "../data";
import { IndexPage } from "./components/IndexPage";
import { Role } from "./components/Role";

import getScripts from "./getScripts";
import getStyles from "./getStyles";

const app = express();

app.get("/", async (req, res) => {
  const scripts = await getScripts();
  const styles = getStyles();

  const htmlResult = `<!doctype html>
    ${ReactDOMServer.renderToString(
      <IndexPage scripts={scripts} styles={styles} />
    )}
  `;

  fs.writeFileSync(path.resolve("./public/", "index.html"), htmlResult, "utf8");

  res.send(htmlResult);
});

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
