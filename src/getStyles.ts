import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import fs from "fs";
import path from "path";
import postcss from "postcss";
import tailwindcss from "tailwindcss";

function getCssFile(filePath: string) {
  return fs.readFileSync(path.resolve(filePath), "utf8");
}

export default async function getStyles() {
  const authoredStyles = getCssFile("./styles/tailwind.css");

  const cssResult = await postcss([
    tailwindcss("./tailwind.config.cjs"),
    autoprefixer,
    cssnano({
      preset: "default",
    }),
  ])
    .process(authoredStyles, { from: "styles.css", to: "styles.css" })
    .then((result: postcss.Result) => {
      return result.css;
    });

  return cssResult;
}
