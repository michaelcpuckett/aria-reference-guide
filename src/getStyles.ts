import fs from "fs";
import path from "path";

import colorsCss from "../styles/colors.css";

function getCssFile(filePath: string) {
  return fs.readFileSync(path.resolve(filePath), "utf8");
}

export default function getStyles() {
  const baseCss = getCssFile("./styles/base.css");
  const headerCss = getCssFile("./styles/header.css");
  const navCss = getCssFile("./styles/nav.css");
  const contentCss = getCssFile("./styles/content.css");

  return `
    ${baseCss}
    ${headerCss}
    ${navCss}
    ${contentCss}
    ${colorsCss}
  `;
}
