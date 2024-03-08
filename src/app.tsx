import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { ARIAPeriodicTable } from "./ARIAPeriodicTable";

const app = express();

app.get("/", (req, res) => {
  const htmlResult = `<!doctype html>
    ${ReactDOMServer.renderToString(<ARIAPeriodicTable />)}
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
    }
  }
}
