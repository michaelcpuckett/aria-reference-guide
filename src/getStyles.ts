import fs from "fs";
import path from "path";

import colorsCss from "../styles/colors.css";

export default function getStyles() {
  const baseCss = fs.readFileSync(path.resolve("./styles/base.css"), "utf8");

  return `${baseCss}
${colorsCss}`;
}
