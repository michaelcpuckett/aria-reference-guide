import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";
import fs from "fs";
import path from "path";

import { ariaRolesByAbstractRole } from "../data";
import { ARIAReferenceGuide } from "./ARIAReferenceGuide";
import { ARIARoleDialog } from "./ARIARoleDialog";
import { CustomElement } from "./types";

const app = express();

app.get("/", (req, res) => {
  const htmlResult = `<!doctype html>
    ${ReactDOMServer.renderToString(<ARIAReferenceGuide />)}
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
        <ARIARoleDialog
          role={req.params.role}
          abstractAriaRole={abstractRole}
          id={req.params.role}
        />
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

  Promise.all(promises).then(() => {
    res.send("done");
  });
});

app.listen(10101, () => {
  console.log("Running on 10101");
});
