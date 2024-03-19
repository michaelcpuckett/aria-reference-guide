import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { abstractAriaRolesByType, ariaRolesByCategory } from "../data";
import { ARIAPeriodicTable } from "./ARIAPeriodicTable";
import { ARIARoleDialog } from "./ARIARoleDialog";
import { CustomElement } from "./types";
import fs from "fs";
import path from "path";

const app = express();

app.get("/", (req, res) => {
  const htmlResult = `<!doctype html>
    ${ReactDOMServer.renderToString(<ARIAPeriodicTable />)}
  `;

  fs.writeFileSync(path.resolve("./public/", "index.html"), htmlResult, "utf8");

  res.send(htmlResult);
});

app.get("/role/:role.html", (req, res) => {
  const [abstractRole] =
    Object.entries(ariaRolesByCategory)
      .sort(([a], [b]) => (a > b ? 1 : -1))
      .find(([_, roles]) => roles.includes(req.params.role)) || [];

  if (!abstractRole) {
    return res.status(404).send("Role not found");
  }

  const mayBeInteractive =
    abstractAriaRolesByType.interactive.includes(abstractRole);

  const htmlResult = `<!doctype html>
    <html>
      <meta charSet="utf-8" />
      ${ReactDOMServer.renderToString(
        <ARIARoleDialog
          role={req.params.role}
          abstractAriaRole={abstractRole}
          id={req.params.role}
          mayBeInteractive={mayBeInteractive}
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

app.listen(10101, () => {
  console.log("Running on 10101");
});

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "menu-button": CustomElement;
    }
  }
}
