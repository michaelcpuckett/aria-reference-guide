import fs from "fs";
import path from "path";

const filterJsFiles = (file: string) => file.endsWith(".js");

export default async function getScripts() {
  const utilityFiles = fs
    .readdirSync(path.resolve("./scripts/utilities"))
    .filter(filterJsFiles);

  const componentFiles = fs
    .readdirSync(path.resolve("./scripts/components"))
    .filter(filterJsFiles);

  const getJsFiles = async (files: string[], filePath: string) => {
    return files
      .map((file) => `${fs.readFileSync(path.resolve(filePath, file))}`)
      .join("");
  };

  const utilityJs = await getJsFiles(utilityFiles, "./scripts/utilities");
  const componentJs = await getJsFiles(componentFiles, "./scripts/components");

  return `${utilityJs}${componentJs}`;
}
