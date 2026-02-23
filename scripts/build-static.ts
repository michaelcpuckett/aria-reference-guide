import fs from "fs";
import path from "path";
import { createElement } from "react";
import ReactDOMServer from "react-dom/server";

import { ariaRolesByAbstractRole } from "../data";
import getScripts from "../src/getScripts";
import getStyles from "../src/getStyles";
import { IndexPage } from "../src/pages/IndexPage";
import { RolePage } from "../src/pages/RolePage";

function writePublicFile(filePath: string, content: string) {
  const resolvedPath = path.resolve(filePath);

  fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });
  fs.writeFileSync(resolvedPath, content, "utf8");
}

function buildIndexPage() {
  const bodyHtml = ReactDOMServer.renderToString(createElement(IndexPage));
  writePublicFile("./public/index.html", "<!doctype html>" + bodyHtml);
}

function buildRolePages() {
  const roleToAbstractRole = Object.entries(ariaRolesByAbstractRole).reduce(
    (acc, [abstractRole, roles]) => {
      roles.forEach((role) => {
        acc[role] = abstractRole;
      });

      return acc;
    },
    {} as Record<string, string>,
  );

  Object.entries(roleToAbstractRole).forEach(([role, abstractAriaRole]) => {
    const bodyHtml = ReactDOMServer.renderToString(
      createElement(RolePage, { role, abstractAriaRole }),
    );

    writePublicFile(`./public/role/${role}.html`, "<!doctype html>" + bodyHtml);
  });
}

async function buildStyles() {
  const css = await getStyles();
  writePublicFile("./public/styles.css", css);
}

async function buildScripts() {
  const js = await getScripts();
  writePublicFile("./public/scripts.js", js);
}

async function buildStaticSite() {
  buildIndexPage();
  buildRolePages();
  await Promise.all([buildStyles(), buildScripts()]);
}

buildStaticSite();
