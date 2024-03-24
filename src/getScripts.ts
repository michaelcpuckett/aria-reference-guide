import fs from "fs";
import path from "path";

import { minify } from "terser";

const filterJsFiles = (file: string) => file.endsWith(".js");

export default async function getScripts() {
  const utilities = fs
    .readdirSync(path.resolve("./scripts/utilities"))
    .filter(filterJsFiles);

  const components = fs
    .readdirSync(path.resolve("./scripts/components"))
    .filter(filterJsFiles);

  return await minify(`
    ${utilities
      .map(
        (utility) =>
          `${fs.readFileSync(path.resolve("./scripts/utilities/" + utility))}`
      )
      .join("")}
    ${components
      .map(
        (component) =>
          `${fs.readFileSync(
            path.resolve("./scripts/components/" + component)
          )}`
      )
      .join("")}
  `).then((result) => result.code);
}
