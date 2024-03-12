import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { ARIAPeriodicTable } from "./ARIAPeriodicTable";
import { ARIAPeriodicTable2 } from "./ARIAPeriodicTable2";
import { abstractAriaRolesByType, ariaRolesByCategory } from "../data";
import { Dialog2 } from "./Dialog2";

const app = express();

app.get("/", (req, res) => {
  const htmlResult = `<!doctype html>
    ${ReactDOMServer.renderToString(<ARIAPeriodicTable />)}
  `;
  res.send(htmlResult);
});

app.get("/test", (req, res) => {
  const htmlResult = `<!doctype html>
    ${ReactDOMServer.renderToString(<ARIAPeriodicTable2 />)}
  `;
  res.send(htmlResult);
});

app.get("/role/:role", (req, res) => {
  const [abstractRole] =
    Object.entries(ariaRolesByCategory).find(([_, roles]) =>
      roles.includes(req.params.role)
    ) || [];

  if (!abstractRole) {
    return res.status(404).send("Role not found");
  }

  const mayBeInteractive =
    abstractAriaRolesByType.interactive.includes(abstractRole);

  const htmlResult = `<!doctype html>
    ${ReactDOMServer.renderToString(
      <Dialog2
        role={req.params.role}
        abstractAriaRole={abstractRole}
        id={req.params.role}
        mayBeInteractive={mayBeInteractive}
      />
    )}
  `;
  res.send(htmlResult);
});

app.listen(10101, () => {
  console.log("Running on 10101");
});

type CustomElement = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement> & {
    class?: string;
    tabindex?: string;
  },
  HTMLElement
>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "expansion-button": CustomElement;
      "close-dialog-button": CustomElement;
      "role-dialog": CustomElement;
      "abstract-aria-role": CustomElement;
    }
  }
}
